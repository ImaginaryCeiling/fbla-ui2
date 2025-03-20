"use client"

import { useState } from "react"
import { dummyApplications, getPostingById } from "@/data/dummy-data"
import type { Application } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Input } from "../ui/input"
import { Calendar, Download, FileText, Search, ThumbsDown, ThumbsUp } from "lucide-react"
import { Badge } from "../ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function ApplicantsManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobFilter, setJobFilter] = useState("all")

  // Get unique job postings from applications
  const uniquePostings = Array.from(new Set(dummyApplications.map((app) => app.posting))).map((postingId) => {
    const posting = getPostingById(postingId)
    return {
      id: postingId,
      title: posting?.title || "Unknown Position",
    }
  })

  // Filter applications by status, job, and search term
  const filterApplications = (status: Application["status"]) => {
    return dummyApplications
      .filter((app) => app.status === status)
      .filter((app) => jobFilter === "all" || app.posting === jobFilter)
      .filter((app) => {
        const posting = getPostingById(app.posting)
        if (!posting) return false

        return (
          posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app._id.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
  }

  const pendingApplications = filterApplications("pending")
  const reviewedApplications = filterApplications("reviewed")
  const acceptedApplications = filterApplications("accepted")
  const rejectedApplications = filterApplications("rejected")

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "reviewed":
        return <Badge className="bg-blue-100 text-blue-800">Reviewed</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Applicants</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search applicants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {uniquePostings.map((posting) => (
              <SelectItem key={posting.id} value={posting.id}>
                {posting.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed ({reviewedApplications.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedApplications.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>These applications are waiting for your review.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Applicant</th>
                      <th className="pb-3 font-medium">Position</th>
                      <th className="pb-3 font-medium">Applied</th>
                      <th className="pb-3 font-medium">Documents</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApplications.map((application) => {
                      const posting = getPostingById(application.posting)

                      return (
                        <tr key={application._id} className="border-b">
                          <td className="py-3">
                            <div className="font-medium">Applicant {application._id.slice(-2)}</div>
                            <div className="text-xs text-gray-500">{application.applicant}</div>
                          </td>
                          <td className="py-3">{posting ? posting.title : "Unknown Position"}</td>
                          <td className="py-3">
                            {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Resume</span>
                              </Button>
                              {application.coverLetter && (
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Cover Letter</span>
                                </Button>
                              )}
                              {application.additionalFiles.length > 0 && (
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Additional Files</span>
                                </Button>
                              )}
                            </div>
                          </td>
                          <td className="py-3">{getStatusBadge(application.status)}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-green-600">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="sr-only">Accept</span>
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600">
                                <ThumbsDown className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Calendar className="h-4 w-4" />
                                <span className="sr-only">Schedule Interview</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar tables for other tabs (reviewed, accepted, rejected) */}
        <TabsContent value="reviewed" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reviewed Applications</CardTitle>
              <CardDescription>These applications have been reviewed but not yet accepted or rejected.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Applicant</th>
                      <th className="pb-3 font-medium">Position</th>
                      <th className="pb-3 font-medium">Applied</th>
                      <th className="pb-3 font-medium">Reviewed</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewedApplications.map((application) => {
                      const posting = getPostingById(application.posting)

                      return (
                        <tr key={application._id} className="border-b">
                          <td className="py-3">
                            <div className="font-medium">Applicant {application._id.slice(-2)}</div>
                            <div className="text-xs text-gray-500">{application.applicant}</div>
                          </td>
                          <td className="py-3">{posting ? posting.title : "Unknown Position"}</td>
                          <td className="py-3">
                            {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
                          </td>
                          <td className="py-3">
                            {application.reviewedAt
                              ? formatDistanceToNow(new Date(application.reviewedAt), { addSuffix: true })
                              : "N/A"}
                          </td>
                          <td className="py-3">{getStatusBadge(application.status)}</td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-green-600">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="sr-only">Accept</span>
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600">
                                <ThumbsDown className="h-4 w-4" />
                                <span className="sr-only">Reject</span>
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Calendar className="h-4 w-4" />
                                <span className="sr-only">Schedule Interview</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accepted" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Accepted Applications</CardTitle>
              <CardDescription>These applicants have been accepted for the position.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Applicant</th>
                      <th className="pb-3 font-medium">Position</th>
                      <th className="pb-3 font-medium">Applied</th>
                      <th className="pb-3 font-medium">Accepted</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedApplications.map((application) => {
                      const posting = getPostingById(application.posting)

                      return (
                        <tr key={application._id} className="border-b">
                          <td className="py-3">
                            <div className="font-medium">Applicant {application._id.slice(-2)}</div>
                            <div className="text-xs text-gray-500">{application.applicant}</div>
                          </td>
                          <td className="py-3">{posting ? posting.title : "Unknown Position"}</td>
                          <td className="py-3">
                            {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
                          </td>
                          <td className="py-3">
                            {application.reviewedAt
                              ? formatDistanceToNow(new Date(application.reviewedAt), { addSuffix: true })
                              : "N/A"}
                          </td>
                          <td className="py-3">{getStatusBadge(application.status)}</td>
                          <td className="py-3">
                            <Button variant="outline" size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Onboarding
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
              <CardDescription>These applications have been rejected.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Applicant</th>
                      <th className="pb-3 font-medium">Position</th>
                      <th className="pb-3 font-medium">Applied</th>
                      <th className="pb-3 font-medium">Rejected</th>
                      <th className="pb-3 font-medium">Reason</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedApplications.map((application) => {
                      const posting = getPostingById(application.posting)

                      return (
                        <tr key={application._id} className="border-b">
                          <td className="py-3">
                            <div className="font-medium">Applicant {application._id.slice(-2)}</div>
                            <div className="text-xs text-gray-500">{application.applicant}</div>
                          </td>
                          <td className="py-3">{posting ? posting.title : "Unknown Position"}</td>
                          <td className="py-3">
                            {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
                          </td>
                          <td className="py-3">
                            {application.reviewedAt
                              ? formatDistanceToNow(new Date(application.reviewedAt), { addSuffix: true })
                              : "N/A"}
                          </td>
                          <td className="py-3">{application.notes || "No reason provided"}</td>
                          <td className="py-3">{getStatusBadge(application.status)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

