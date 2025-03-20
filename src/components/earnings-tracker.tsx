import { DollarSign, TrendingUp } from "lucide-react"

interface EarningsData {
  currentMonth: number
  lastMonth: number
  totalEarned: number
  hoursWorked: number
}

interface EarningsTrackerProps {
  earnings: EarningsData
}

export function EarningsTracker({ earnings }: EarningsTrackerProps) {
  const percentChange = earnings.lastMonth
    ? Math.round(((earnings.currentMonth - earnings.lastMonth) / earnings.lastMonth) * 100)
    : 0

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-gray-800">Earnings Tracker</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md bg-gray-50 p-3">
          <div className="text-xs text-gray-500">This Month</div>
          <div className="mt-1 flex items-center">
            <DollarSign className="h-4 w-4 text-gray-700" />
            <span className="text-lg font-semibold text-gray-800">{earnings.currentMonth}</span>
            {percentChange !== 0 && (
              <span
                className={`ml-2 flex items-center text-xs ${percentChange > 0 ? "text-green-500" : "text-red-500"}`}
              >
                <TrendingUp className={`mr-1 h-3 w-3 ${percentChange < 0 ? "rotate-180" : ""}`} />
                {percentChange > 0 ? "+" : ""}
                {percentChange}%
              </span>
            )}
          </div>
        </div>
        <div className="rounded-md bg-gray-50 p-3">
          <div className="text-xs text-gray-500">Total Earned</div>
          <div className="mt-1 flex items-center">
            <DollarSign className="h-4 w-4 text-gray-700" />
            <span className="text-lg font-semibold text-gray-800">{earnings.totalEarned}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 text-center text-xs text-gray-500">{earnings.hoursWorked} hours worked</div>
    </div>
  )
}

