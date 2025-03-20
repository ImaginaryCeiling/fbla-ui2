import { DashboardHeader } from "../../../components/dashboard-header"
import { DashboardSidebar } from "../../../components/dashboard-sidebar"
import { ProfileTabs } from "../../../components/profile/profile-tabs"
import { currentUser } from "@/data/dummy-data"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
            <p className="mt-1 text-gray-600">Manage your personal information, resume, and job preferences</p>
          </div>

          <ProfileTabs user={currentUser} />
        </main>
      </div>
    </div>
  )
}

