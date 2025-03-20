"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { AdminHeader } from "../../../../../components/admin/admin-header"
import { AdminSidebar } from "../../../../../components/admin/admin-sidebar"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Textarea } from "../../../../../components/ui/textarea"
import { getPostingById } from "@/data/dummy-data"
import { Badge } from "../../../../../components/ui/badge"
import { ArrowLeft, CalendarIcon, CheckCircle, Clock, DollarSign, Globe, MapPin, Tag, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function PostingReviewPage() {
  const params = useParams()
  const router = useRouter()
  const postingId = params.id as string
  const posting = getPostingById(postingId)

  const [feedbackNote, setFeedbackNote] = useState("")

  if (!posting) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activeView="review-queue" setActiveView={() => {}} />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium">Posting Not Found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    The job posting you're looking for doesn't exist or has been removed.
                  </p>
                  <Button className="mt-4" onClick={() => router.push("/portal/admin/review-queue")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Review Queue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  const formatSalary = (salary?: typeof posting.salary) => {
    if (!salary) return "Not specified"

    if (salary.amount) {
      return `$${salary.amount.toFixed(2)}/${salary.period === "hourly" ? "hr" : "yr"}`
    }

    if (salary.min && salary.max) {
      return `$${salary.min.toFixed(2)} - $${salary.max.toFixed(2)}/${salary.period === "hourly" ? "hr" : "yr"}`
    }

    if (salary.min) {
      return `From $${salary.min.toFixed(2)}/${salary.period === "hourly" ? "hr" : "yr"}`
    }

    return "Not specified"
  }

  const handleApprove = () => {
    // In a real app, this would call an API to update the posting status
    alert(`Posting "${posting.title}" has been approved!`)
    router.push("/portal/admin/review-queue")
  }

  const handleReject = () => {
    if (!feedbackNote.trim()) {
      alert("Please provide a reason for rejection")
      return
    }

    // In a real app, this would call an API to update the posting status with the rejection reason
    alert(`Posting "${posting.title}" has been rejected with reason: ${feedbackNote}`)
    router.push("/portal/admin/review-queue")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeView="review-queue" setActiveView={() => {}} />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6 flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/portal/admin/review-queue")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Queue
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">Review Job Posting</h1>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{posting.title}</CardTitle>
                  <CardDescription className="text-base font-medium text-foreground">{posting.company}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key details */}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Location</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{posting.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Job Type</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">{posting.type}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Salary</span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{formatSalary(posting.salary)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">Deadline</span>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(posting.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {posting.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="capitalize">
                          <Tag className="mr-1 h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Description</h3>
                    <div className="rounded-md bg-muted/50 p-4 text-sm">
                      <p className="whitespace-pre-line">{posting.description}</p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Requirements</h3>
                    <ul className="list-inside list-disc space-y-1 rounded-md bg-muted/50 p-4 text-sm">
                      {posting.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Company info */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Company Information</h3>
                    <div className="rounded-md bg-muted/50 p-4 text-sm">
                      <p className="mb-2">
                        <strong>Contact:</strong> {posting.contactEmail}
                      </p>
                      {posting.companyWebsite && (
                        <p className="flex items-center">
                          <Globe className="mr-1 h-4 w-4" />
                          <a
                            href={posting.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hocus:underline"
                          >
                            {posting.companyWebsite}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Posted date */}
                  <div className="text-xs text-muted-foreground">
                    Posted {formatDistanceToNow(new Date(posting.createdAt), { addSuffix: true })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Review Decision</CardTitle>
                  <CardDescription>Approve or reject this job posting.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-sm font-medium">Feedback Notes</h3>
                    <Textarea
                      placeholder="Enter feedback or reason for rejection..."
                      value={feedbackNote}
                      onChange={(e) => setFeedbackNote(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Notes are required for rejection and will be sent to the employer.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleApprove}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Posting
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={handleReject}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject Posting
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

