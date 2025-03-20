import { Clock } from "lucide-react"

interface Deadline {
  id: number
  company: string
  position: string
  dueDate: string
  daysLeft: number
}

interface JobDeadlinesProps {
  deadlines: Deadline[]
}

export function JobDeadlines({ deadlines }: JobDeadlinesProps) {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-gray-800">Application Deadlines</h2>
      {deadlines.length > 0 ? (
        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className="flex items-center justify-between rounded-md border-l-4 border-l-blue-500 bg-gray-50 p-3"
            >
              <div>
                <div className="font-medium text-gray-800">{deadline.position}</div>
                <div className="text-sm text-gray-600">{deadline.company}</div>
              </div>
              <div className={`flex flex-col items-end ${deadline.daysLeft <= 2 ? "text-red-500" : "text-gray-500"}`}>
                <div className="flex items-center text-xs">
                  <Clock className="mr-1 h-3 w-3" />
                  {deadline.daysLeft} {deadline.daysLeft === 1 ? "day" : "days"}
                </div>
                <div className="text-xs">{deadline.dueDate}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No upcoming deadlines.</p>
      )}
    </div>
  )
}

