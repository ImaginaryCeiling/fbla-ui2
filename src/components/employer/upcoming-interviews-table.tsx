import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { format } from "date-fns"

interface Interview {
  id: string
  applicantName: string
  position: string
  date: string
  status: "confirmed" | "pending" | "cancelled"
}

interface UpcomingInterviewsTableProps {
  interviews: Interview[]
}

export function UpcomingInterviewsTable({ interviews }: UpcomingInterviewsTableProps) {
  const getStatusBadge = (status: Interview["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
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
            <th className="pb-3 font-medium">Date & Time</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <tr key={interview.id} className="border-b">
              <td className="py-3">
                <div className="font-medium">{interview.applicantName}</div>
              </td>
              <td className="py-3">{interview.position}</td>
              <td className="py-3">{format(new Date(interview.date), "MMM d, yyyy 'at' h:mm a")}</td>
              <td className="py-3">{getStatusBadge(interview.status)}</td>
              <td className="py-3">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  {interview.status !== "cancelled" && (
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      Cancel
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

