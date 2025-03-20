"use client"

import type React from "react"

import { useState } from "react"
import type { Posting, User } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { Separator } from "../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "@/hooks/use-toast"
import { FileText, Upload, Plus, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

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

// Mock documents
const mockDocuments = [
  {
    id: "doc1",
    name: "Cover Letter - Retail",
    type: "Cover Letter",
    file: "cover_letter_retail.pdf",
    size: "45 KB",
    uploadedAt: new Date("2025-02-10"),
  },
  {
    id: "doc2",
    name: "High School Transcript",
    type: "Transcript",
    file: "transcript_2024.pdf",
    size: "320 KB",
    uploadedAt: new Date("2025-01-15"),
  },
  {
    id: "doc3",
    name: "Reference Letter - Mr. Johnson",
    type: "Reference Letter",
    file: "reference_johnson.pdf",
    size: "78 KB",
    uploadedAt: new Date("2025-02-05"),
  },
]

// Mock work experience
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

interface ApplicationFormProps {
  posting: Posting
  user: User
  onSubmitSuccess: () => void
}

export function ApplicationForm({ posting, user, onSubmitSuccess }: ApplicationFormProps) {
  const [useProfileInfo, setUseProfileInfo] = useState(true)
  const [resumes, setResumes] = useState(mockResumes)
  const [documents, setDocuments] = useState(mockDocuments)
  const [workExperience, setWorkExperience] = useState(mockWorkExperience)
  const [selectedResumeId, setSelectedResumeId] = useState(resumes.find((r) => r.isDefault)?.id || "")
  const [coverLetterTab, setCoverLetterTab] = useState<"upload" | "write" | "select">("select")
  const [selectedCoverLetterId, setSelectedCoverLetterId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: user.username.split(" ")[0] || "",
    lastName: user.username.split(" ")[1] || "",
    email: user.email,
    phone: "555-123-4567", // Mock data
    coverLetterText: "",
    additionalInfo: "",
    availability: "immediately",
    willingToRelocate: false,
    selectedDocuments: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const toggleDocumentSelection = (docId: string) => {
    setFormData((prev) => {
      if (prev.selectedDocuments.includes(docId)) {
        return {
          ...prev,
          selectedDocuments: prev.selectedDocuments.filter((id) => id !== docId),
        }
      } else {
        return {
          ...prev,
          selectedDocuments: [...prev.selectedDocuments, docId],
        }
      }
    })
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, this would upload the file to a server
    // For now, we'll just simulate adding it to the list
    const newResume = {
      id: `resume${resumes.length + 1}`,
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      file: file.name,
      updatedAt: new Date(),
      isDefault: false,
    }

    const updatedResumes = [...resumes, newResume]
    setResumes(updatedResumes)
    setSelectedResumeId(newResume.id)

    toast({
      title: "Resume uploaded",
      description: "Your resume has been uploaded and selected for this application.",
    })

    // Reset the file input
    e.target.value = ""
  }

  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, this would upload the file to a server
    // For now, we'll just simulate adding it to the list
    const newCoverLetter = {
      id: `doc${documents.length + 1}`,
      name: `Cover Letter - ${posting.title}`,
      type: "Cover Letter",
      file: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      uploadedAt: new Date(),
    }

    const updatedDocuments = [...documents, newCoverLetter]
    setDocuments(updatedDocuments)
    setSelectedCoverLetterId(newCoverLetter.id)

    toast({
      title: "Cover letter uploaded",
      description: "Your cover letter has been uploaded and selected for this application.",
    })

    // Reset the file input
    e.target.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!selectedResumeId) {
      toast({
        title: "Resume required",
        description: "Please select or upload a resume for your application.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // In a real app, this would submit the application to the server
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      })

      onSubmitSuccess()
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Info Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="useProfileInfo" className="text-base">
                Use My Profile Information
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically fill in your personal information from your profile.
              </p>
            </div>
            <Switch
              id="useProfileInfo"
              checked={useProfileInfo}
              onCheckedChange={(checked) => setUseProfileInfo(checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your contact information for this application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={useProfileInfo}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={useProfileInfo}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={useProfileInfo}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={useProfileInfo}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume */}
      <Card>
        <CardHeader>
          <CardTitle>Resume</CardTitle>
          <CardDescription>Select a resume or upload a new one for this application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumes.length > 0 && (
            <div className="space-y-4">
              <Label>Select from your resumes</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                      selectedResumeId === resume.id ? "border-primary bg-primary/5" : ""
                    }`}
                    onClick={() => setSelectedResumeId(resume.id)}
                  >
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{resume.name}</h4>
                        {resume.isDefault && (
                          <Badge variant="outline" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{resume.file}</p>
                    </div>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                      {selectedResumeId === resume.id && <div className="h-3 w-3 rounded-full bg-primary"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-4" />

          <div className="space-y-2">
            <Label>Upload a new resume</Label>
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Drag and drop your resume here</p>
                  <p className="text-xs text-muted-foreground">or click to browse files (PDF, DOCX, DOC)</p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
                <Label
                  htmlFor="resume-upload"
                  className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Select File
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cover Letter */}
      <Card>
        <CardHeader>
          <CardTitle>Cover Letter (Optional)</CardTitle>
          <CardDescription>Include a cover letter with your application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs value={coverLetterTab} onValueChange={(value) => setCoverLetterTab(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="select">Select Existing</TabsTrigger>
              <TabsTrigger value="write">Write New</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="select" className="space-y-4 pt-4">
              {documents.filter((doc) => doc.type === "Cover Letter").length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {documents
                    .filter((doc) => doc.type === "Cover Letter")
                    .map((doc) => (
                      <div
                        key={doc.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                          selectedCoverLetterId === doc.id ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setSelectedCoverLetterId(doc.id)}
                      >
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-xs text-muted-foreground">{doc.file}</p>
                        </div>
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                          {selectedCoverLetterId === doc.id && <div className="h-3 w-3 rounded-full bg-primary"></div>}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                  <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <h3 className="text-sm font-medium">No cover letters found</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    You don't have any saved cover letters. Write a new one or upload a file.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="write" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="coverLetterText">Write your cover letter</Label>
                <Textarea
                  id="coverLetterText"
                  name="coverLetterText"
                  value={formData.coverLetterText}
                  onChange={handleChange}
                  placeholder="Dear Hiring Manager,

I am writing to express my interest in the [Job Title] position at [Company Name]..."
                  className="min-h-[300px]"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Customize your cover letter to highlight your relevant skills and experience for this specific
                  position.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4 pt-4">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Drag and drop your cover letter here</p>
                    <p className="text-xs text-muted-foreground">or click to browse files (PDF, DOCX, DOC)</p>
                  </div>
                  <Input
                    type="file"
                    className="hidden"
                    id="cover-letter-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCoverLetterUpload}
                  />
                  <Label
                    htmlFor="cover-letter-upload"
                    className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Select File
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>Provide additional details for your application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Work Experience */}
          {useProfileInfo && workExperience.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Work Experience</h3>
                <Badge variant="outline">From Profile</Badge>
              </div>

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
                    </div>
                    {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Documents */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Documents (Optional)</h3>

            {documents.filter((doc) => doc.type !== "Cover Letter").length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {documents
                  .filter((doc) => doc.type !== "Cover Letter")
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50 ${
                        formData.selectedDocuments.includes(doc.id) ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => toggleDocumentSelection(doc.id)}
                    >
                      <div className="rounded-md bg-primary/10 p-2">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                          <span>{doc.file}</span>
                        </div>
                      </div>
                      <div className="flex h-5 w-5 items-center justify-center rounded border border-primary">
                        {formData.selectedDocuments.includes(doc.id) && <div className="h-3 w-3 bg-primary"></div>}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                <h3 className="text-sm font-medium">No additional documents</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  You don't have any additional documents saved in your profile.
                </p>
              </div>
            )}

            <Button type="button" variant="outline" className="mt-2" onClick={() => {}}>
              <Plus className="mr-2 h-4 w-4" />
              Upload New Document
            </Button>
          </div>

          {/* Additional Questions */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Questions</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="availability">When can you start?</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => handleSelectChange("availability", value)}
                >
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="one_week">Within 1 week</SelectItem>
                    <SelectItem value="two_weeks">Within 2 weeks</SelectItem>
                    <SelectItem value="one_month">Within 1 month</SelectItem>
                    <SelectItem value="other">Other (specify in notes)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="willingToRelocate">Are you willing to relocate?</Label>
                  <p className="text-xs text-muted-foreground">This job is located in {posting.location}</p>
                </div>
                <Switch
                  id="willingToRelocate"
                  checked={formData.willingToRelocate}
                  onCheckedChange={(checked) => handleSwitchChange("willingToRelocate", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Notes (Optional)</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Include any additional information you'd like the employer to know..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Review */}
      <Card>
        <CardHeader>
          <CardTitle>Review Your Application</CardTitle>
          <CardDescription>Please review your application before submitting.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Application Review</AlertTitle>
            <AlertDescription>
              Make sure all required information is complete and accurate. Once submitted, you won't be able to edit
              your application.
            </AlertDescription>
          </Alert>

          <div className="mt-4 space-y-2">
            <p className="text-sm">
              <span className="font-medium">Resume:</span>{" "}
              {selectedResumeId ? resumes.find((r) => r.id === selectedResumeId)?.name || "Selected" : "Not selected"}
            </p>

            <p className="text-sm">
              <span className="font-medium">Cover Letter:</span>{" "}
              {selectedCoverLetterId
                ? documents.find((d) => d.id === selectedCoverLetterId)?.name || "Selected"
                : formData.coverLetterText
                  ? "Written cover letter"
                  : "Not included"}
            </p>

            <p className="text-sm">
              <span className="font-medium">Additional Documents:</span>{" "}
              {formData.selectedDocuments.length > 0 ? `${formData.selectedDocuments.length} selected` : "None"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

