import type { Application } from "@/types"
import { getPostingById } from "@/data/dummy-data"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { formatDistanceToNow } from "date-fns"

interface RecentApplicationsTableProps {
  applications: Application[]
}

export function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-800">Accepted</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "reviewed":
        return <Badge className="bg-blue-100 text-blue-800">Reviewed</Badge>
      case "pending":
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-3 font-medium">Applicant</th>
            <th className="pb-3 font-medium">Position</th>
            <th className="pb-3 font-medium">Applied</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => {
            const posting = getPostingById(application.posting)

            return (
              <tr key={application._id} className="border-b">
                <td className="py-3">
                  <div className="font-medium">Applicant {application._id.slice(-2)}</div>
                  <div className="text-xs text-gray-500">{application.resume.split("/").pop()}</div>
                </td>
                <td className="py-3">{posting ? posting.title : "Unknown Position"}</td>
                <td className="py-3">{formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}</td>
                <td className="py-3">{getStatusBadge(application.status)}</td>
                <td className="py-3">
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

