"use client"

import { useState } from "react"
// @ts-ignore
import type { User } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
//import { toast } from "@/hooks/use-toast"
import { Badge } from "../ui/badge"
import { Plus, Tag, X } from "lucide-react"
import { Separator } from "../ui/separator"

interface JobPreferencesProps {
  user: User
}

// Mock job types
const jobTypes = ["Part-time", "Full-time", "Internship", "Seasonal", "Temporary"]

// Mock industries
const industries = [
  "Retail",
  "Food Service",
  "Customer Service",
  "Office/Clerical",
  "Education",
  "Healthcare",
  "Technology",
  "Arts & Entertainment",
  "Sports & Recreation",
  "Childcare",
]

export function JobPreferences({ user }: JobPreferencesProps) {
  const [preferences, setPreferences] = useState({
    jobTypes: ["Part-time", "Seasonal"],
    industries: user.profileSettings.jobPreferences || [],
    location: user.profileSettings.preferredLocation || "",
    maxDistance: 15,
    minSalary: 15,
    notificationsEnabled: user.profileSettings.notificationsEnabled,
    newJobAlerts: true,
    applicationUpdates: true,
  })

  const [newIndustry, setNewIndustry] = useState("")

  const handleJobTypeToggle = (type: string) => {
    setPreferences((prev) => {
      if (prev.jobTypes.includes(type)) {
        return { ...prev, jobTypes: prev.jobTypes.filter((t) => t !== type) }
      } else {
        return { ...prev, jobTypes: [...prev.jobTypes, type] }
      }
    })
  }

  const handleAddIndustry = () => {
    if (!newIndustry) return

    if (preferences.industries.includes(newIndustry)) {
      /*toast({
        title: "Industry already added",
        description: "This industry is already in your preferences.",
        variant: "destructive",
      })*/
     alert("Industry already added");
      return
    }

    setPreferences((prev) => ({
      ...prev,
      industries: [...prev.industries, newIndustry],
    }))

    setNewIndustry("")
  }

  const handleRemoveIndustry = (industry: string) => {
    setPreferences((prev) => ({
      ...prev,
      industries: prev.industries.filter((i: string) => i !== industry),
    }))
  }

  const handleSavePreferences = () => {
    // In a real app, this would save the preferences to the server
    /*toast({
      title: "Preferences saved",
      description: "Your job preferences have been updated successfully.",
    })*/
   alert("Preferences saved");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Preferences</CardTitle>
        <CardDescription>Set your job preferences to help us find the best matches for you.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Types */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Job Types</h3>
          <p className="text-sm text-muted-foreground">Select the types of jobs you're interested in.</p>

          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <Badge
                key={type}
                variant={preferences.jobTypes.includes(type) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleJobTypeToggle(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Industries */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Industries</h3>
          <p className="text-sm text-muted-foreground">Select the industries you're interested in working in.</p>

          <div className="flex gap-2">
            <Select value={newIndustry} onValueChange={setNewIndustry}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industries
                  .filter((industry) => !preferences.industries.includes(industry))
                  .map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button onClick={handleAddIndustry}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {preferences.industries.map((industry: string) => (
              <Badge key={industry} variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {industry}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleRemoveIndustry(industry)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </Badge>
            ))}

            {preferences.industries.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No industries selected. Add at least one industry to help us find relevant jobs.
              </p>
            )}
          </div>
        </div>

        <Separator />

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Location</h3>

          <div className="space-y-2">
            <Label htmlFor="location">Preferred Location</Label>
            <Input
              id="location"
              value={preferences.location}
              onChange={(e) => setPreferences((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="e.g. Burlington, VT"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxDistance">Maximum Distance</Label>
              <span className="text-sm text-muted-foreground">{preferences.maxDistance} miles</span>
            </div>
            <Slider
              id="maxDistance"
              min={5}
              max={50}
              step={5}
              value={[preferences.maxDistance]}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, maxDistance: value[0] }))}
            />
          </div>
        </div>

        <Separator />

        {/* Salary */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Salary</h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="minSalary">Minimum Hourly Rate</Label>
              <span className="text-sm text-muted-foreground">${preferences.minSalary.toFixed(2)}/hr</span>
            </div>
            <Slider
              id="minSalary"
              min={7.25}
              max={25}
              step={0.25}
              value={[preferences.minSalary]}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, minSalary: value[0] }))}
            />
          </div>
        </div>

        <Separator />

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notifications</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about new jobs and application updates.
                </p>
              </div>
              <Switch
                id="notifications"
                checked={preferences.notificationsEnabled}
                onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, notificationsEnabled: checked }))}
              />
            </div>

            {preferences.notificationsEnabled && (
              <>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newJobAlerts">New Job Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new jobs matching your preferences are posted.
                    </p>
                  </div>
                  <Switch
                    id="newJobAlerts"
                    checked={preferences.newJobAlerts}
                    onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, newJobAlerts: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="applicationUpdates">Application Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when there are updates to your job applications.
                    </p>
                  </div>
                  <Switch
                    id="applicationUpdates"
                    checked={preferences.applicationUpdates}
                    onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, applicationUpdates: checked }))}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSavePreferences}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

