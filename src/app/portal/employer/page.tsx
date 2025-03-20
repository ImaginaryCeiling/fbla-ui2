"use client"

import { useState } from "react"
import { EmployerHeader } from "../../../components/employer/employer-header"
import { EmployerSidebar } from "../../../components/employer/employer-sidebar"
import { EmployerDashboard } from "../../../components/employer/employer-dashboard"
import { JobPostingsManager } from "../../../components/employer/job-postings-manager"
import { ApplicantsManager } from "../../../components/employer/applicants-manager"
import { InterviewScheduler } from "../../../components/employer/interview-scheduler"
import { JobPostingForm } from "../../../components/employer/job-posting-form"

type ActiveView = "dashboard" | "postings" | "applicants" | "interviews" | "create-posting"

export default function EmployerPortalPage() {
  const [activeView, setActiveView] = useState<ActiveView>("dashboard")

  // Function to render the active view component
  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <EmployerDashboard onCreatePosting={() => setActiveView("create-posting")} />
      case "postings":
        return <JobPostingsManager onCreatePosting={() => setActiveView("create-posting")} />
      case "applicants":
        return <ApplicantsManager />
      case "interviews":
        return <InterviewScheduler />
      case "create-posting":
        return <JobPostingForm onCancel={() => setActiveView("postings")} />
      default:
        return <EmployerDashboard onCreatePosting={() => setActiveView("create-posting")} />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <EmployerSidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1">
        <EmployerHeader />
        <main className="p-6">{renderActiveView()}</main>
      </div>
    </div>
  )
}

