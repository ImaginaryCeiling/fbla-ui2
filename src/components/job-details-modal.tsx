"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog"
import { Button } from "./ui/button"
import type { Posting } from "@/types"
import { CalendarIcon, Clock, DollarSign, Globe, MapPin, Tag } from "lucide-react"
import { Badge } from "./ui/badge"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"

interface JobDetailsModalProps {
  posting: Posting | null
  isOpen: boolean
  onClose: () => void
}

export function JobDetailsModal({ posting, isOpen, onClose }: JobDetailsModalProps) {
  const router = useRouter()

  if (!posting) return null

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

    if (salary.max) {
      return `Up to $${salary.max.toFixed(2)}/${salary.period === "hourly" ? "hr" : "yr"}`
    }

    return "Not specified"
  }

  const daysToDeadline = Math.ceil(
    (new Date(posting.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  const handleApply = () => {
    onClose()
    router.push(`/portal/jobs/${posting._id}/apply`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{posting.title}</DialogTitle>
          <DialogDescription className="text-base font-medium text-foreground">{posting.company}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
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
                  {daysToDeadline <= 0 ? "Expired" : `${daysToDeadline} ${daysToDeadline === 1 ? "day" : "days"} left`}
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
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleApply} disabled={daysToDeadline <= 0}>
            {daysToDeadline <= 0 ? "Application Closed" : "Apply Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

