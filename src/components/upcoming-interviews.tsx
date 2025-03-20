import { Calendar } from "lucide-react"

interface Interview {
  id: number
  company: string
  position: string
  date: string
  time: string
}

interface UpcomingInterviewsProps {
  interviews: Interview[]
}

export function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-gray-800">Upcoming Interviews</h2>
      {interviews.length > 0 ? (
        <div className="space-y-3">
          {interviews.map((interview) => (
            <div key={interview.id} className="rounded-md border border-gray-100 bg-gray-50 p-3">
              <div className="font-medium text-gray-800">{interview.position}</div>
              <div className="text-sm text-gray-600">{interview.company}</div>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Calendar className="mr-1 h-3 w-3" />
                {interview.date} at {interview.time}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No upcoming interviews scheduled.</p>
      )}
    </div>
  )
}

