"use client"

import { useState } from "react"
import { AdminHeader } from "../../../components/admin/admin-header"
import { AdminSidebar } from "../../../components/admin/admin-sidebar"
import { AdminDashboard } from "../../../components/admin/admin-dashboard"
import { PostingReviewQueue } from "../../../components/admin/posting-review-queue"
import { PostingHistory } from "../../../components/admin/posting-history"
import { UserManagement } from "../../../components/admin/user-management"

type ActiveView = "dashboard" | "review-queue" | "history" | "users"

export default function AdminPortalPage() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")

  // Function to render the active view component
  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <AdminDashboard />
      case "review-queue":
        return <PostingReviewQueue />
      case "history":
        return <PostingHistory />
      case "users":
        return <UserManagement />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">{renderActiveView()}</main>
      </div>
    </div>
  )
}

