"use client"

import type React from "react"

import { useState } from "react"
// @ts-ignore
import type { User } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
//import { toast } from "@/hooks/use-toast"

interface PersonalInfoFormProps {
  user: User
}

// Mock data for education levels
const educationLevels = [
  "High School (In Progress)",
  "High School (Completed)",
  "Some College",
  "Associate's Degree",
  "Bachelor's Degree",
  "Other",
]

export function PersonalInfoForm({ user }: PersonalInfoFormProps) {
  // We'll create a more comprehensive user profile that extends the basic User type
  const [formData, setFormData] = useState({
    firstName: user.username.split(" ")[0] || "",
    lastName: user.username.split(" ")[1] || "",
    email: user.email,
    phone: "555-123-4567", // Mock data
    address: "123 Main St", // Mock data
    city: "Burlington", // Mock data
    state: "VT", // Mock data
    zipCode: "05401", // Mock data
    bio: "I'm a high school student interested in part-time work to gain experience and save for college.", // Mock data
    educationLevel: "High School (In Progress)", // Mock data
    school: "Burlington High School", // Mock data
    graduationYear: "2026", // Mock data
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the data to the server
    /*toast({
      title: "Profile updated",
      description: "Your personal information has been saved successfully.",
    })*/
   alert("Profile updated");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details. This information will be used to autofill job applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address</h3>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">About Me</h3>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell employers a bit about yourself..."
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                This will be shown on your profile and may be included in your applications.
              </p>
            </div>
          </div>

          <Separator />

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Education</h3>

            <div className="space-y-2">
              <Label htmlFor="educationLevel">Education Level</Label>
              <Select
                value={formData.educationLevel}
                onValueChange={(value) => handleSelectChange("educationLevel", value)}
              >
                <SelectTrigger id="educationLevel">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="school">School Name</Label>
                <Input id="school" name="school" value={formData.school} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

