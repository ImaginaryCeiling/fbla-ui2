export interface CompanyInfo {
  companyName: string
  website?: string
  description?: string
}

export interface ProfileSettings {
  preferredLocation?: string
  jobPreferences?: string[] // List of tags used to craft FYP
  notificationsEnabled: boolean
}

export interface User {
  _id: string
  username: string
  email: string
  roles: string[]
  submittedPostings: string[]
  bookmarkedPostings: string[]
  applications: string[]
  companyInfo?: CompanyInfo
  profileSettings: ProfileSettings
}

export interface Posting {
  _id: string
  title: string
  company: string
  companyWebsite?: string
  description: string
  requirements: string[] // List of bullet points in order
  location: string
  type: "internship" | "full-time"
  tags: string[]
  status: "pending" | "approved" | "rejected"
  applications: string[]
  author: string
  deadline: Date
  contactEmail: string // Email of author by default
  salary?: {
    amount?: number // Single amount
    min?: number // OR range
    max?: number // OR range
    period: "hourly" | "yearly"
  }
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  _id: string
  applicant: string
  posting: string
  status: "pending" | "reviewed" | "accepted" | "rejected"
  resume: string // URL to stored resume
  coverLetter: string | null
  additionalFiles: string[] // URLs to additional documents
  notes: string | null // Internal notes from employer
  reviewedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

