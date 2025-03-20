"use client"

import { useState } from "react"
import { dummyPostings } from "@/data/dummy-data"
import type { Posting } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Input } from "../ui/input"
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { Badge } from "../ui/badge"
import { formatDistanceToNow } from "date-fns"
import { JobDetailsModal } from "../job-details-modal"

interface JobPostingsManagerProps {
  onCreatePosting: () => void
}

export function JobPostingsManager({ onCreatePosting }: JobPostingsManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Filter postings by status and search term
  const filterPostings = (status: Posting["status"]) => {
    return dummyPostings
      .filter((posting) => posting.status === status)
      .filter(
        (posting) =>
          posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          posting.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          posting.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const activePostings = filterPostings("approved")
  const pendingPostings = filterPostings("pending")
  const rejectedPostings = filterPostings("rejected")

  const getStatusBadge = (status: Posting["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  const viewPostingDetails = (posting: Posting) => {
    setSelectedPosting(posting)
    setShowDetailsModal(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Job Postings</h1>
        <Button onClick={onCreatePosting}>
          <Plus className="mr-2 h-4 w-4" />
          Create Job Posting
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search job postings..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activePostings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingPostings.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedPostings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>These job postings are live and visible to applicants.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Job Title</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Posted</th>
                      <th className="pb-3 font-medium">Applications</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePostings.map((posting) => (
                      <tr key={posting._id} className="border-b">
                        <td className="py-3">
                          <div className="font-medium">{posting.title}</div>
                          <div className="text-xs text-gray-500">{posting.company}</div>
                        </td>
                        <td className="py-3">{posting.location}</td>
                        <td className="py-3">
                          {formatDistanceToNow(new Date(posting.createdAt), { addSuffix: true })}
                        </td>
                        <td className="py-3">{posting.applications.length}</td>
                        <td className="py-3">{getStatusBadge(posting.status)}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => viewPostingDetails(posting)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Job Postings</CardTitle>
              <CardDescription>These job postings are awaiting approval.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Job Title</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Submitted</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPostings.map((posting) => (
                      <tr key={posting._id} className="border-b">
                        <td className="py-3">
                          <div className="font-medium">{posting.title}</div>
                          <div className="text-xs text-gray-500">{posting.company}</div>
                        </td>
                        <td className="py-3">{posting.location}</td>
                        <td className="py-3">
                          {formatDistanceToNow(new Date(posting.createdAt), { addSuffix: true })}
                        </td>
                        <td className="py-3">{getStatusBadge(posting.status)}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => viewPostingDetails(posting)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Job Postings</CardTitle>
              <CardDescription>These job postings have been rejected.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Job Title</th>
                      <th className="pb-3 font-medium">Location</th>
                      <th className="pb-3 font-medium">Submitted</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedPostings.map((posting) => (
                      <tr key={posting._id} className="border-b">
                        <td className="py-3">
                          <div className="font-medium">{posting.title}</div>
                          <div className="text-xs text-gray-500">{posting.company}</div>
                        </td>
                        <td className="py-3">{posting.location}</td>
                        <td className="py-3">
                          {formatDistanceToNow(new Date(posting.createdAt), { addSuffix: true })}
                        </td>
                        <td className="py-3">{getStatusBadge(posting.status)}</td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => viewPostingDetails(posting)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Job Details Modal */}
      {selectedPosting && (
        <JobDetailsModal
          posting={selectedPosting}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  )
}

