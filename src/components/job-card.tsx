"use client"

import type React from "react"

import { BriefcaseIcon, MapPin } from "lucide-react"
import type { Posting } from "@/types"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

interface JobCardProps {
  job: Posting
}

export function JobCard({ job }: JobCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()

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

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/portal/jobs/${job._id}/apply`)
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/portal/jobs/${job._id}`)
  }

  return (
    <div className="flex h-auto flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hocus:shadow-md">
      <div>
        <h3 className="font-medium text-gray-800">{job.title}</h3>
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <BriefcaseIcon className="mr-1 h-4 w-4" />
          {job.company}
        </div>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <MapPin className="mr-1 h-3 w-3" />
          {job.location}
        </div>
        <div className="mt-2 text-xs text-gray-500">{formatSalary(job.salary)}</div>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={handleViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  )
}

