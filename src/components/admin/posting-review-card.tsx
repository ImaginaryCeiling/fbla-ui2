"use client"

import { useState } from "react"
import type { Posting } from "@/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "../ui/badge"
import { CheckCircle, ChevronDown, ChevronUp, MapPin, Tag, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

interface PostingReviewCardProps {
  posting: Posting
}

export function PostingReviewCard({ posting }: PostingReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

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

  const handleApprove = () => {
    // In a real app, this would call an API to update the posting status
    alert(`Posting "${posting.title}" has been approved!`)
  }

  const handleReject = () => {
    // In a real app, this would call an API to update the posting status with the rejection reason
    alert(`Posting "${posting.title}" has been rejected with reason: ${rejectionReason}`)
    setShowRejectDialog(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="text-lg">{posting.title}</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              <span className="sr-only">{expanded ? "Collapse" : "Expand"}</span>
            </Button>
          </div>
          <div className="flex flex-col text-sm text-gray-500">
            <div>{posting.company}</div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {posting.location}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          {expanded ? (
            <div className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-medium">Description</h4>
                <p className="text-sm">{posting.description}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium">Requirements</h4>
                <ul className="list-inside list-disc text-sm">
                  {posting.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium">Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Type:</span> {posting.type}
                  </div>
                  <div>
                    <span className="font-medium">Salary:</span> {formatSalary(posting.salary)}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {posting.contactEmail}
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span> {new Date(posting.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {posting.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 capitalize">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="line-clamp-2 text-sm">{posting.description}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 pt-2">
          <div className="flex w-full items-center justify-between text-xs text-gray-500">
            <span>Submitted {formatDistanceToNow(new Date(posting.createdAt), { addSuffix: true })}</span>
            <span>ID: {posting._id}</span>
          </div>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="flex-1 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={handleApprove}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowRejectDialog(true)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Job Posting</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this job posting. This feedback will be sent to the employer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="text-sm">
              <span className="font-medium">Job Title:</span> {posting.title}
            </div>
            <div className="text-sm">
              <span className="font-medium">Company:</span> {posting.company}
            </div>

            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
              Reject Posting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

