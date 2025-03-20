import { DashboardHeader } from "../../components/dashboard-header"
import { DashboardSidebar } from "../../components/dashboard-sidebar"
import { ApplicationTracker } from "../../components/application-tracker"
import { JobCard } from "../../components/job-card"
import { UpcomingInterviews } from "../../components/upcoming-interviews"
import { SkillDevelopment } from "../../components/skill-development"
import { JobDeadlines } from "../../components/job-deadlines"
import { currentUser, getInProgressJobs, getRecommendedJobs } from "@/data/dummy-data"

export default function Dashboard() {
  // Get data from our dummy data helpers
  const userName = currentUser.username.split(" ")[0]
  const inProgressJobs = getInProgressJobs()
  const recommendedJobs = getRecommendedJobs()

  // Data for new widgets
  const upcomingInterviews = [
    {
      id: 1,
      company: "Local Bookstore",
      position: "Sales Associate",
      date: "Mar 15, 2025",
      time: "3:30 PM",
    },
    {
      id: 2,
      company: "City Recreation",
      position: "Summer Program Assistant",
      date: "Mar 18, 2025",
      time: "10:00 AM",
    },
  ]

  const skillsToImprove = [
    { id: 1, name: "Customer Service", progress: 65, relevantJobs: 12 },
    { id: 2, name: "Microsoft Office", progress: 40, relevantJobs: 8 },
    { id: 3, name: "Communication", progress: 75, relevantJobs: 15 },
  ]

  const applicationDeadlines = [
    {
      id: 1,
      company: "Local Cafe",
      position: "Barista",
      dueDate: "Mar 12, 2025",
      daysLeft: 2,
    },
    {
      id: 2,
      company: "Community Center",
      position: "Youth Mentor",
      dueDate: "Mar 20, 2025",
      daysLeft: 10,
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Welcome, {userName}</h1>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-lg font-medium text-gray-700">In Progress</h2>
                {inProgressJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {inProgressJobs.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                    <p className="text-gray-500">You don't have any applications in progress.</p>
                  </div>
                )}
              </div>

              <div>
                <h2 className="mb-4 text-lg font-medium text-gray-700">For You</h2>
                {recommendedJobs.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {recommendedJobs.map((job) => (
                      <JobCard key={job._id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                    <p className="text-gray-500">
                      Complete your profile preferences to see personalized job recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <ApplicationTracker />
              <UpcomingInterviews interviews={upcomingInterviews} />
              <JobDeadlines deadlines={applicationDeadlines} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

