"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { DashboardHeader } from "../../../../../components/dashboard-header"
import { DashboardSidebar } from "../../../../../components/dashboard-sidebar"
import { ApplicationForm } from "../../../../../components/application/application-form"
import { ApplicationSuccess } from "../../../../../components/application/application-success"
import { getPostingById, currentUser } from "@/data/dummy-data"
import type { Posting } from "@/types"
import { Button } from "../../../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "../../../../../components/ui/skeleton"

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const [posting, setPosting] = useState<Posting | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmitSuccess = () => {
    setIsSubmitted(true)
    // In a real app, we would scroll to top here
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <Button variant="outline" size="sm" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job
          </Button>

          {isLoading ? (
            <ApplicationSkeleton />
          ) : posting ? (
            isSubmitted ? (
              <ApplicationSuccess posting={posting} />
            ) : (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-semibold text-gray-800">Apply for {posting.title}</h1>
                  <p className="mt-1 text-gray-600">
                    at {posting.company} • {posting.location}
                  </p>
                </div>

                <ApplicationForm posting={posting} user={currentUser} onSubmitSuccess={handleSubmitSuccess} />
              </>
            )
          ) : (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <h2 className="text-lg font-medium text-red-800">Job Not Found</h2>
              <p className="mt-2 text-red-600">The job posting you're looking for doesn't exist or has been removed.</p>
              <Button className="mt-4" onClick={() => router.push("/portal/jobs")}>
                Browse Jobs
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function ApplicationSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <Skeleton className="h-10 w-32" />
    </div>
  )
}

