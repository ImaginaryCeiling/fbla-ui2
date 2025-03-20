"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "../../lib/utils"
import { Badge } from "../ui/badge"

interface JobPostingFormProps {
  onCancel: () => void
}

export function JobPostingForm({ onCancel }: JobPostingFormProps) {
  const [requirements, setRequirements] = useState<string[]>([
    "Must be at least 16 years old",
    "Available to work weekends",
  ])
  const [newRequirement, setNewRequirement] = useState("")

  const [tags, setTags] = useState<string[]>(["retail", "customer service"])
  const [newTag, setNewTag] = useState("")

  const [date, setDate] = useState<Date>()

  const [salaryType, setSalaryType] = useState<"fixed" | "range">("fixed")
  const [salaryPeriod, setSalaryPeriod] = useState<"hourly" | "yearly">("hourly")

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the data to the server
    alert("Job posting submitted for review!")
    onCancel()
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Create Job Posting</h1>
        <p className="mt-2 text-gray-600">
          Fill out the form below to create a new job posting for high school students.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Provide information about the position you're offering.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input id="title" placeholder="e.g. Retail Assistant" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input id="company" placeholder="e.g. Local Store" required />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input id="location" placeholder="e.g. Burlington, VT" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">
                  Job Type <span className="text-red-500">*</span>
                </Label>
                <Select required defaultValue="part-time">
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input id="website" placeholder="e.g. https://company.com" type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input id="email" placeholder="e.g. hiring@company.com" type="email" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Job Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the job responsibilities and what the student can expect..."
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label>
                Requirements <span className="text-red-500">*</span>
              </Label>
              <div className="rounded-md border border-input bg-background p-4">
                <ul className="mb-2 list-inside list-disc space-y-1">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-center justify-between gap-2 text-sm">
                      <span>{req}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeRequirement(index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a requirement..."
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    className="text-sm"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>
                Tags <span className="text-red-500">*</span>
              </Label>
              <div className="rounded-md border border-input bg-background p-4">
                <div className="mb-2 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 capitalize">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g. retail, customer service)..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="text-sm"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="space-y-4">
              <Label>Salary Information</Label>
              <RadioGroup
                defaultValue="fixed"
                className="flex flex-col space-y-3"
                onValueChange={(v) => setSalaryType(v as "fixed" | "range")}
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="fixed" id="fixed" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="fixed" className="font-normal">
                      Fixed Amount
                    </Label>
                    {salaryType === "fixed" && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm">$</span>
                        <Input type="number" placeholder="Amount" className="w-24" min="0" step="0.01" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="range" id="range" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="range" className="font-normal">
                      Salary Range
                    </Label>
                    {salaryType === "range" && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm">$</span>
                        <Input type="number" placeholder="Min" className="w-24" min="0" step="0.01" />
                        <span className="text-sm">to</span>
                        <span className="text-sm">$</span>
                        <Input type="number" placeholder="Max" className="w-24" min="0" step="0.01" />
                      </div>
                    )}
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-4">
                <Label htmlFor="period">Payment Period</Label>
                <Select defaultValue="hourly" onValueChange={(v) => setSalaryPeriod(v as "hourly" | "yearly")}>
                  <SelectTrigger id="period" className="w-40">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Per Hour</SelectItem>
                    <SelectItem value="yearly">Per Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">
                Application Deadline <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit Job Posting</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

