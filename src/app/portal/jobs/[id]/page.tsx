"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { DashboardHeader } from "../../../../components/dashboard-header"
import { DashboardSidebar } from "../../../../components/dashboard-sidebar"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Badge } from "../../../../components/ui/badge"
import { Skeleton } from "../../../../components/ui/skeleton"
import { getPostingById } from "@/data/dummy-data"
import type { Posting } from "@/types"
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  BriefcaseIcon,
  CalendarIcon,
  Clock,
  DollarSign,
  Globe,
  MapPin,
  Tag,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [posting, setPosting] = useState<Posting | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    const jobId = params.id as string
    const fetchedPosting = getPostingById(jobId)

    // Simulate loading
    const timer = setTimeout(() => {
      setPosting(fetchedPosting || null)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  const formatSalary = (salary?: Posting["salary"]) => {
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

  const handleApply = () => {
    if (posting) {
      router.push(`/portal/jobs/${posting._id}/apply`)
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // In a real app, this would update the user's bookmarks in the database
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <JobDetailSkeleton />
          </main>
        </div>
      </div>
    )
  }

  if (!posting) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <h2 className="text-lg font-medium text-red-800">Job Not Found</h2>
              <p className="mt-2 text-red-600">The job posting you're looking for doesn't exist or has been removed.</p>
              <Button className="mt-4" onClick={() => router.push("/portal/jobs")}>
                Browse Jobs
              </Button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const daysToDeadline = Math.ceil(
    (new Date(posting.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <Button variant="outline" size="sm" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{posting.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-foreground">
                        {posting.company}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleBookmark}
                      className={isBookmarked ? "text-yellow-500" : ""}
                    >
                      {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                      <span className="sr-only">{isBookmarked ? "Remove Bookmark" : "Bookmark Job"}</span>
                    </Button>
                  </div>
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
                        <span className={daysToDeadline <= 3 ? "text-red-500 font-medium" : ""}>
                          {daysToDeadline <= 0
                            ? "Expired"
                            : `${daysToDeadline} ${daysToDeadline === 1 ? "day" : "days"} left`}
                        </span>
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

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Apply Now</CardTitle>
                  <CardDescription>Submit your application for this position.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="h-5 w-5 text-blue-500" />
                      <h3 className="font-medium text-blue-700">Quick Apply</h3>
                    </div>
                    <p className="mt-1 text-sm text-blue-600">
                      Use your profile information to quickly apply for this position.
                    </p>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleApply} disabled={daysToDeadline <= 0}>
                    {daysToDeadline <= 0 ? "Application Closed" : "Apply Now"}
                  </Button>

                  {daysToDeadline <= 3 && daysToDeadline > 0 && (
                    <p className="text-center text-sm text-red-500">Hurry! Application deadline is approaching.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Similar Jobs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Retail Assistant</h3>
                    <p className="text-sm text-muted-foreground">Local Store</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Burlington, VT</span>
                      <Badge variant="outline">Part-time</Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Customer Service Rep</h3>
                    <p className="text-sm text-muted-foreground">City Market</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">South Burlington, VT</span>
                      <Badge variant="outline">Part-time</Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Stock Clerk</h3>
                    <p className="text-sm text-muted-foreground">Grocery Outlet</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Essex, VT</span>
                      <Badge variant="outline">Part-time</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function JobDetailSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-24 rounded-full" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-32 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-32 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-28" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-md" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

