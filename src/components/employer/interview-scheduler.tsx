"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Calendar } from "../ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus } from "lucide-react"
import { Badge } from "../ui/badge"
import { format } from "date-fns"

export function InterviewScheduler() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlot, setTimeSlot] = useState<string | undefined>()

  // Mock data for interviews
  const interviews = [
    {
      id: "int1",
      applicantName: "John Smith",
      position: "Retail Assistant",
      date: new Date("2025-03-20T14:00:00"),
      status: "confirmed",
    },
    {
      id: "int2",
      applicantName: "Emily Johnson",
      position: "Cafe Staff",
      date: new Date("2025-03-21T10:30:00"),
      status: "pending",
    },
    {
      id: "int3",
      applicantName: "Michael Brown",
      position: "Library Helper",
      date: new Date("2025-03-22T15:00:00"),
      status: "confirmed",
    },
    {
      id: "int4",
      applicantName: "Sarah Wilson",
      position: "Dog Walker",
      date: new Date("2025-03-25T11:00:00"),
      status: "confirmed",
    },
  ]

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9
    const minute = (i % 2) * 30
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour > 12 ? hour - 12 : hour
    return `${hour12}:${minute === 0 ? "00" : minute} ${ampm}`
  })

  // Filter interviews for the selected date
  const interviewsForSelectedDate = date
    ? interviews.filter((interview) => interview.date.toDateString() === date.toDateString())
    : []

  const getStatusBadge = (status: string) => {
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
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Interview Scheduler</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view or schedule interviews.</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{date ? format(date, "MMMM d, yyyy") : "Select a Date"}</CardTitle>
            <CardDescription>
              {interviewsForSelectedDate.length
                ? `${interviewsForSelectedDate.length} interviews scheduled`
                : "No interviews scheduled for this date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {date && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Time Slot
                  </Button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Scheduled Interviews</h3>
                  {interviewsForSelectedDate.length > 0 ? (
                    <div className="space-y-2">
                      {interviewsForSelectedDate.map((interview) => (
                        <div
                          key={interview.id}
                          className="flex items-center justify-between rounded-md border border-gray-200 p-3"
                        >
                          <div>
                            <div className="font-medium">{interview.applicantName}</div>
                            <div className="text-sm text-gray-500">{interview.position}</div>
                            <div className="text-xs text-gray-500">{format(interview.date, "h:mm a")}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(interview.status)}
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md border border-dashed border-gray-300 p-6 text-center">
                      <p className="text-sm text-gray-500">No interviews scheduled for this date.</p>
                      <Button variant="outline" className="mt-2">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Interview
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
          <CardDescription>All scheduled interviews for the next 30 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Applicant</th>
                  <th className="pb-3 font-medium">Position</th>
                  <th className="pb-3 font-medium">Date & Time</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview) => (
                  <tr key={interview.id} className="border-b">
                    <td className="py-3">
                      <div className="font-medium">{interview.applicantName}</div>
                    </td>
                    <td className="py-3">{interview.position}</td>
                    <td className="py-3">{format(interview.date, "MMM d, yyyy 'at' h:mm a")}</td>
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
        </CardContent>
      </Card>
    </div>
  )
}

