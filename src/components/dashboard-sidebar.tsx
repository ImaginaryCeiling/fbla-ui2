"use client"

import { BarChart3, BookOpen, BriefcaseIcon, Building, Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isEmployerPage = pathname?.includes("/employer")

  const navItems = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Dashboard",
      href: "/portal",
    },
    {
      icon: <Search className="h-5 w-5" />,
      label: "Find Jobs",
      href: "/portal/search",
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      href: "/portal/profile",
    },
  ]

  return (
    <aside className="hidden w-16 flex-col border-r border-gray-200 bg-white md:flex lg:w-64">
      <div className="flex h-16 items-center justify-center border-b px-4">
        <h2 className="hidden text-lg font-bold lg:block">JobStart</h2>
        <BriefcaseIcon className="h-6 w-6 text-blue-500 lg:hidden" />
      </div>
      <nav className="flex flex-1 flex-col p-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href === "/portal/employer" && isEmployerPage)

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-gray-700 hocus:bg-gray-100",
                    isActive && "bg-gray-100 font-medium text-blue-600",
                  )}
                >
                  <span className={cn("mr-3 text-gray-500", isActive && "text-blue-600")}>{item.icon}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

// Helper function to conditionally join class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

