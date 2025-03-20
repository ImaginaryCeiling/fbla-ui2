"use client"

import type React from "react"

import { useState } from "react"
// @ts-ignore
import type { User } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Textarea } from "../ui/textarea"
//import { toast } from "@/hooks/use-toast"
import { FileText, Upload, Eye, Download, Clock, Plus, Trash2 } from "lucide-react"
import { Badge } from "../ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ResumeManagerProps {
  user: User
}

// Mock resume data
const mockResumes = [
  {
    id: "resume1",
    name: "General Resume",
    file: "general_resume.pdf",
    updatedAt: new Date("2025-02-15"),
    isDefault: true,
  },
  {
    id: "resume2",
    name: "Retail Resume",
    file: "retail_resume.pdf",
    updatedAt: new Date("2025-01-20"),
    isDefault: false,
  },
]

// Mock work experience data
const mockWorkExperience = [
  {
    id: "exp1",
    title: "Cashier",
    company: "Local Grocery Store",
    location: "Burlington, VT",
    startDate: "June 2024",
    endDate: "Present",
    description: "Operated cash register, provided customer service, and maintained a clean work environment.",
  },
]

// Mock skills data
const mockSkills = ["Customer Service", "Cash Handling", "Microsoft Office", "Communication", "Time Management"]

export function ResumeManager({ user }: ResumeManagerProps) {
  const [activeTab, setActiveTab] = useState("upload")
  const [resumes, setResumes] = useState(mockResumes)
  const [workExperience, setWorkExperience] = useState(mockWorkExperience)
  const [skills, setSkills] = useState(mockSkills)
  const [newSkill, setNewSkill] = useState("")

  // New work experience form state
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewExperience((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!newExperience.title || !newExperience.company || !newExperience.startDate) {
      window.alert("Please fill in all required fields.")
      return
    }

    // Add new experience
    setWorkExperience((prev) => [
      {
        id: `exp${prev.length + 1}`,
        ...newExperience,
      },
      ...prev,
    ])

    // Reset form
    setNewExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    })

    window.alert("Your work experience has been added to your resume.")
  }

  const handleDeleteExperience = (id: string) => {
    setWorkExperience((prev) => prev.filter((exp) => exp.id !== id))

    window.alert("The work experience has been removed from your resume.")
  }

  const handleAddSkill = () => {
    if (!newSkill.trim()) return

    if (skills.includes(newSkill.trim())) {
      window.alert("This skill is already in your list.")
      return
    }

    setSkills((prev) => [...prev, newSkill.trim()])
    setNewSkill("")
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, this would upload the file to a server
    // For now, we'll just simulate adding it to the list
    const newResume = {
      id: `resume${resumes.length + 1}`,
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      file: file.name,
      updatedAt: new Date(),
      isDefault: resumes.length === 0, // Make default if it's the first resume
    }

    setResumes((prev) => [...prev, newResume])

    window.alert("Your resume has been uploaded successfully.")

    // Reset the file input
    e.target.value = ""
  }

  const handleSetDefaultResume = (id: string) => {
    setResumes((prev) =>
      prev.map((resume) => ({
        ...resume,
        isDefault: resume.id === id,
      })),
    )

    window.alert("Your default resume has been updated.")
  }

  const handleDeleteResume = (id: string) => {
    const resumeToDelete = resumes.find((r) => r.id === id)

    // Don't allow deleting the default resume
    if (resumeToDelete?.isDefault) {
      window.alert("Please set another resume as default first.")
      return
    }

    setResumes((prev) => prev.filter((resume) => resume.id !== id))

    window.alert("Your resume has been deleted.")
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </TabsTrigger>
          <TabsTrigger value="builder">
            <FileText className="mr-2 h-4 w-4" />
            Resume Builder
          </TabsTrigger>
          <TabsTrigger value="manage">
            <Eye className="mr-2 h-4 w-4" />
            Manage Resumes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Resume</CardTitle>
              <CardDescription>
                Upload your resume to use for job applications. Supported formats: PDF, DOCX, DOC.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Drag and drop your resume here</p>
                    <p className="text-xs text-muted-foreground">or click to browse files (max 5MB)</p>
                  </div>
                  <Input
                    type="file"
                    className="hidden"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Label
                    htmlFor="resume-upload"
                    className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Select File
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder">
          <div className="space-y-6">
            {/* Work Experience Section */}
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your work experience to your resume. This will be used to autofill job applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add new experience form */}
                <form onSubmit={handleAddExperience} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">
                        Job Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={newExperience.title}
                        onChange={handleExperienceChange}
                        placeholder="e.g. Cashier"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">
                        Company <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={newExperience.company}
                        onChange={handleExperienceChange}
                        placeholder="e.g. Local Store"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newExperience.location}
                      onChange={handleExperienceChange}
                      placeholder="e.g. Burlington, VT"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        value={newExperience.startDate}
                        onChange={handleExperienceChange}
                        placeholder="e.g. June 2024"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        value={newExperience.endDate}
                        onChange={handleExperienceChange}
                        placeholder="e.g. Present"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newExperience.description}
                      onChange={handleExperienceChange}
                      placeholder="Describe your responsibilities and achievements..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </form>

                {/* List of existing experiences */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Your Work Experience</h3>

                  {workExperience.length > 0 ? (
                    <div className="space-y-4">
                      {workExperience.map((exp) => (
                        <div key={exp.id} className="rounded-lg border p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{exp.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {exp.company} {exp.location ? `• ${exp.location}` : ""}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {exp.startDate} - {exp.endDate || "Present"}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteExperience(exp.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                          {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No work experience added yet. Add your first job above.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add skills that showcase your abilities to potential employers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddSkill}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </Badge>
                  ))}

                  {skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">No skills added yet. Add your first skill above.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Resume</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage Resumes</CardTitle>
              <CardDescription>View, download, and manage your uploaded resumes.</CardDescription>
            </CardHeader>
            <CardContent>
              {resumes.length > 0 ? (
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{resume.name}</h4>
                            {resume.isDefault && (
                              <Badge variant="outline" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{resume.file}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Updated {formatDistanceToNow(resume.updatedAt, { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        {!resume.isDefault && (
                          <Button variant="outline" size="sm" onClick={() => handleSetDefaultResume(resume.id)}>
                            Set as Default
                          </Button>
                        )}
                        {!resume.isDefault && (
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteResume(resume.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No resumes uploaded</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a resume to get started with your job applications.
                  </p>
                  <Button className="mt-4" onClick={() => setActiveTab("upload")}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Resume
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

