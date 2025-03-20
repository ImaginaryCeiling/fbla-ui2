"use client"

import { BarChart3, BriefcaseIcon, Calendar, FileText, Users } from "lucide-react"
import Link from "next/link"

type ActiveView = "dashboard" | "postings" | "applicants" | "interviews" | "create-posting"

interface EmployerSidebarProps {
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void
}

export function EmployerSidebar({ activeView, setActiveView }: EmployerSidebarProps) {
  const navItems = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Dashboard",
      view: "dashboard" as ActiveView,
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Job Postings",
      view: "postings" as ActiveView,
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Applicants",
      view: "applicants" as ActiveView,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Interviews",
      view: "interviews" as ActiveView,
    },
  ]

  return (
    <aside className="hidden w-16 flex-col border-r border-gray-200 bg-white md:flex lg:w-64">
      <div className="flex h-16 items-center justify-center border-b px-4">
        <h2 className="hidden text-lg font-bold lg:block">Employer Portal</h2>
        <BriefcaseIcon className="h-6 w-6 text-blue-500 lg:hidden" />
      </div>
      <nav className="flex flex-1 flex-col p-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.view

            return (
              <li key={item.view}>
                <button
                  onClick={() => setActiveView(item.view)}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-gray-700 hocus:bg-gray-100",
                    isActive && "bg-gray-100 font-medium text-blue-600",
                  )}
                >
                  <span className={cn("mr-3 text-gray-500", isActive && "text-blue-600")}>{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="border-t border-gray-200 p-2">
        <Link href="/portal" className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 hocus:bg-gray-100">
          <span className="mr-3 text-gray-500">
            <BriefcaseIcon className="h-5 w-5" />
          </span>
          <span className="hidden lg:inline">Student Portal</span>
        </Link>
      </div>
    </aside>
  )
}

// Helper function to conditionally join class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

