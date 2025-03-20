"use client"

import { BarChart3, Calendar, FileText, Plus, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { dummyPostings, dummyApplications } from "@/data/dummy-data"
import { RecentApplicationsTable } from "./recent-applications-table"
import { UpcomingInterviewsTable } from "./upcoming-interviews-table"

interface EmployerDashboardProps {
  onCreatePosting: () => void
}

export function EmployerDashboard({ onCreatePosting }: EmployerDashboardProps) {
  // Filter postings by status
  const activePostings = dummyPostings.filter((posting) => posting.status === "approved")
  const pendingPostings = dummyPostings.filter((posting) => posting.status === "pending")

  // Get recent applications (last 5)
  const recentApplications = [...dummyApplications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Mock data for upcoming interviews
  const upcomingInterviews = [
    {
      id: "int1",
      applicantName: "John Smith",
      position: "Retail Assistant",
      date: "2025-03-20T14:00:00",
      status: "confirmed",
    },
    {
      id: "int2",
      applicantName: "Emily Johnson",
      position: "Cafe Staff",
      date: "2025-03-21T10:30:00",
      status: "pending",
    },
    {
      id: "int3",
      applicantName: "Michael Brown",
      position: "Library Helper",
      date: "2025-03-22T15:00:00",
      status: "confirmed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Employer Dashboard</h1>
        <Button onClick={onCreatePosting}>
          <Plus className="mr-2 h-4 w-4" />
          Create Job Posting
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Postings</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePostings.length}</div>
            <p className="text-xs text-muted-foreground">{pendingPostings.length} pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              {dummyApplications.filter((app) => app.status === "pending").length} awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingInterviews.length}</div>
            <p className="text-xs text-muted-foreground">
              Next: {new Date(upcomingInterviews[0].date).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (dummyApplications.filter((app) => app.status === "accepted").length / dummyApplications.length) * 100,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {dummyApplications.filter((app) => app.status === "accepted").length} accepted applicants
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Review the most recent applications to your job postings.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentApplicationsTable applications={recentApplications} />
        </CardContent>
      </Card>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>Your scheduled interviews for the next 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <UpcomingInterviewsTable interviews={upcomingInterviews} />
        </CardContent>
      </Card>
    </div>
  )
}

