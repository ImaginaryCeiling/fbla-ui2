import { getApplicationsByStatus } from "@/data/dummy-data"

export function ApplicationTracker() {
  const accepted = getApplicationsByStatus("accepted")
  const submitted = getApplicationsByStatus("pending")
  const rejected = getApplicationsByStatus("rejected")

  const stats = {
    accepted: accepted.length,
    submitted: submitted.length,
    rejected: rejected.length,
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-gray-800">Application Tracker</h2>
      <div className="space-y-3">
        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">{stats.accepted} Accepted</span>
        </div>
        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-gray-600">{stats.submitted} Submitted</span>
        </div>
        <div className="flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600">{stats.rejected} Rejected</span>
        </div>
      </div>
    </div>
  )
}

