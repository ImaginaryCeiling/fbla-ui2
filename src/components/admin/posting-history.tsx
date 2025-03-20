"use client"

import { useState } from "react"
import { dummyPostings } from "@/data/dummy-data"
// @ts-ignore
import type { Posting } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Input } from "../ui/input"
import { Eye, Search } from "lucide-react"
import { Badge } from "../ui/badge"
import { formatDistanceToNow } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function PostingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [timeFilter, setTimeFilter] = useState("all")
  
  // Filter function for postings
  const filterPostings = (status: Posting["status"]) => {
    let filtered = dummyPostings.filter(posting => posting.status === status)
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(posting => 
        posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        posting.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        posting.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date()
      const timeFilterMap = {
        "today": 1,
        "week": 7,
        "month": 30,
        "quarter": 90
      }
      
      const days = timeFilterMap[timeFilter as keyof typeof timeFilterMap] || 0
      if (days > 0) {
        const cutoffDate = new Date(now.setDate(now.getDate() - days))
        filtered = filtered.filter(posting => new Date(posting.updatedAt) >= cutoffDate)
      }
    }
    
    return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }
  
  const approvedPostings = filterPostings("approved")
  const rejectedPostings = filterPostings("rejected")
  
  const getStatusBadge = (status: Posting["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Posting History</h1>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search postings..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="quarter">Past 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="approved">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="approved">
            Approved ({approvedPostings.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedPostings.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="approved" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Job Postings</CardTitle>
              <CardDescription>
                These job postings have been approved and are visible to students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Job Title</th>
                      <th className="pb-3 font-medium">Company</th>
                      <th className="pb-3 font-medium">Approved</th>
                      <th className="pb-3 font-medium">Applications</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedPostings.length > 0 ? (
                      approvedPostings.map((posting) => (
                        <tr key={posting._id} className="border-b">
                          <td className="py-3">
                            <div className="font-medium">{posting.title}</div>
                            <div className="text-xs text-gray-500">{posting.type}</div>
                          </td>
                          <td className="py-3">
                            <div>{posting.company}</div>
                            <div className="text-xs text-gray-500">{posting.location}</div>
                          </td>
                          <td className="py-3">
                            {formatDistanceToNow(new Date(posting.updatedAt), { addSuffix: true })}
                          </td>
                          <td className="py-3">{posting.applications.length}</td>
                          <td className="py-3">{getStatusBadge(posting.status)}</td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-gray-500">
                          No approved postings found.
                        </td>
                      </tr>
                    )}
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
              <CardDescription>
                These job postings have been rejected and are not visible to students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Job Title</th>
                      <th className="pb-3 font-medium">Company</th>
                      <th className="pb-3 font-medium">Rejected</th>
                      <th className="pb-3 font-medium">Reason</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedPostings.length > 0 ? (
                      rejectedPostings.map((posting) => (
                        <tr key={posting._id} className="border-b">
                          <td className="py-3">
                            <div className="font-medium">{posting.title}</div>
                            <div className="text-xs text-gray-500">{posting.type}</div>
                          </td>
                          <td className="py-3">
                            <div>{posting.company}</div>
                            <div className="text-xs text-gray-500">{posting.location}</div>
                          </td>
                          <td className="py-3">
                            {formatDistanceToNow(new Date(posting.updatedAt), { addSuffix: true })}
                          </td>
                          <td className="py-3">
                            <div className="max-w-xs truncate">
                              {posting.notes || "No reason provided"}
                            </div>
                          </td>
                          <td className="py-3">{getStatusBadge(posting.status)}</td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-gray-500">
                          No rejected postings found.
                        </td>
                      </tr>
                    )}
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