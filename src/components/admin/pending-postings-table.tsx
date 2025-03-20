import type { Posting } from "@/types"
import { Button } from "../ui/button"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle, Eye, XCircle } from "lucide-react"
import Link from "next/link"

interface PendingPostingsTableProps {
  postings: Posting[]
}

export function PendingPostingsTable({ postings }: PendingPostingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-3 font-medium">Job Title</th>
            <th className="pb-3 font-medium">Company</th>
            <th className="pb-3 font-medium">Submitted</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {postings.length > 0 ? (
            postings.map((posting) => (
              <tr key={posting._id} className="border-b">
                <td className="py-3">
                  <div className="font-medium">{posting.title}</div>
                  <div className="text-xs text-gray-500">{posting.type}</div>
                </td>
                <td className="py-3">
                  <div>{posting.company}</div>
                  <div className="text-xs text-gray-500">{posting.location}</div>
                </td>
                <td className="py-3">{formatDistanceToNow(new Date(posting.createdAt), { addSuffix: true })}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link href={`/portal/admin/review/${posting._id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-green-600 hover:text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span className="sr-only">Approve</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                      <XCircle className="h-4 w-4" />
                      <span className="sr-only">Reject</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500">
                No pending postings to review.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

