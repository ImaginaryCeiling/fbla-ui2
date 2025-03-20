import { AlertTriangle, CheckCircle, Clock, FileText, ThumbsDown, Users, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { dummyPostings } from "@/data/dummy-data"
import { Button } from "../ui/button"
import { PendingPostingsTable } from "./pending-postings-table"

export function AdminDashboard() {
  // Filter postings by status
  const pendingPostings = dummyPostings.filter((posting) => posting.status === "pending")
  const approvedPostings = dummyPostings.filter((posting) => posting.status === "approved")
  const rejectedPostings = dummyPostings.filter((posting) => posting.status === "rejected")

  // Calculate approval rate
  const totalReviewed = approvedPostings.length + rejectedPostings.length
  const approvalRate = totalReviewed > 0 ? Math.round((approvedPostings.length / totalReviewed) * 100) : 0

  // Get the 5 most recent pending postings
  const recentPendingPostings = [...pendingPostings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Postings</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPostings.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved Postings</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedPostings.length}</div>
            <p className="text-xs text-muted-foreground">Live on the platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected Postings</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedPostings.length}</div>
            <p className="text-xs text-muted-foreground">Not approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <ThumbsDown className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate}%</div>
            <p className="text-xs text-muted-foreground">Of reviewed postings</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-xs">
                <span className="font-medium text-green-500">+5</span> new this week
              </div>
              <div className="text-xs">
                <span className="font-medium">35</span> students
              </div>
              <div className="text-xs">
                <span className="font-medium">7</span> employers
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-xs">
                <span className="font-medium text-amber-500">2</span> flagged postings
              </div>
              <div className="text-xs">
                <span className="font-medium text-green-500">0</span> reported users
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Postings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pending Review</CardTitle>
            <CardDescription>Recent job postings awaiting approval.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <FileText className="mr-2 h-4 w-4" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <PendingPostingsTable postings={recentPendingPostings} />
          <div className="mt-4 flex justify-center sm:hidden">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

