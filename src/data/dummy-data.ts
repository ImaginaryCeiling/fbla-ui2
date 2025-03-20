import type { User, Posting, Application } from "@/types"

// Create a current user
export const currentUser: User = {
  _id: "user1",
  username: "FirstName LastName",
  email: "student@school.edu",
  roles: ["user"],
  submittedPostings: [],
  bookmarkedPostings: ["posting3", "posting5"],
  applications: ["app1", "app2", "app3", "app4", "app5", "app6", "app7"],
  profileSettings: {
    preferredLocation: "Burlington, VT",
    jobPreferences: ["retail", "food service", "customer service", "education"],
    notificationsEnabled: true,
  },
}

// Create dummy postings
export const dummyPostings: Posting[] = [
  {
    _id: "posting1",
    title: "Retail Assistant",
    company: "Local Store",
    companyWebsite: "https://localstore.com",
    description:
      "Join our team at Local Store! We're looking for enthusiastic high school students to work part-time as retail assistants. You'll help customers find products, manage inventory, and operate the cash register.",
    requirements: [
      "Must be at least 16 years old",
      "Available to work weekends",
      "Good communication skills",
      "Basic math skills",
    ],
    location: "Burlington, VT",
    type: "part-time",
    tags: ["retail", "customer service", "entry-level"],
    status: "approved",
    applications: ["app1"],
    author: "employer1",
    deadline: new Date("2025-04-15"),
    contactEmail: "hiring@localstore.com",
    salary: {
      amount: 15,
      period: "hourly",
    },
    createdAt: new Date("2025-02-15"),
    updatedAt: new Date("2025-02-15"),
  } as Posting,
  {
    _id: "posting2",
    title: "Cafe Staff",
    company: "Coffee House",
    companyWebsite: "https://coffeehouse.com",
    description:
      "Coffee House is seeking friendly and reliable high school students to join our team. You'll prepare beverages, serve customers, and maintain a clean work environment.",
    requirements: [
      "Must be at least 16 years old",
      "Able to work in a fast-paced environment",
      "Good customer service skills",
      "Food handler's permit (or willing to obtain)",
    ],
    location: "South Burlington, VT",
    type: "part-time",
    tags: ["food service", "customer service", "entry-level"],
    status: "approved",
    applications: ["app2"],
    author: "employer2",
    deadline: new Date("2025-04-10"),
    contactEmail: "jobs@coffeehouse.com",
    salary: {
      amount: 16,
      period: "hourly",
    },
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  } as Posting,
  {
    _id: "posting3",
    title: "Library Helper",
    company: "City Library",
    companyWebsite: "https://citylibrary.org",
    description:
      "The City Library is looking for responsible high school students to assist with shelving books, helping patrons, and supporting library programs.",
    requirements: [
      "Must be at least 15 years old",
      "Attention to detail",
      "Basic computer skills",
      "Interest in books and reading",
    ],
    location: "Burlington, VT",
    type: "part-time",
    tags: ["library", "customer service", "entry-level"],
    status: "approved",
    applications: ["app3"],
    author: "employer3",
    deadline: new Date("2025-04-20"),
    contactEmail: "library@citylib.org",
    salary: {
      amount: 14.5,
      period: "hourly",
    },
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-02-20"),
  } as Posting,
  {
    _id: "posting4",
    title: "Summer Camp Counselor",
    company: "Camp Sunshine",
    companyWebsite: "https://campsunshine.org",
    description:
      "Camp Sunshine is hiring energetic high school students to serve as counselors for our summer youth programs. You'll lead activities, ensure safety, and create a fun environment for campers.",
    requirements: [
      "Must be at least 16 years old",
      "Experience working with children preferred",
      "CPR certification (or willing to obtain)",
      "Available for the full summer season",
    ],
    location: "Shelburne, VT",
    type: "seasonal",
    tags: ["summer", "childcare", "outdoor"],
    status: "approved",
    applications: ["app4"],
    author: "employer4",
    deadline: new Date("2025-05-01"),
    contactEmail: "staff@campsunshine.org",
    salary: {
      amount: 17,
      period: "hourly",
    },
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
  } as Posting,
  {
    _id: "posting5",
    title: "Dog Walker",
    company: "Pet Services",
    companyWebsite: "https://petservices.com",
    description:
      "Pet Services is looking for responsible high school students to walk dogs in the local area. Flexible hours and a love for animals required!",
    requirements: [
      "Must be at least 15 years old",
      "Comfortable with different dog breeds",
      "Reliable transportation",
      "Available weekdays after school",
    ],
    location: "Essex, VT",
    type: "part-time",
    tags: ["animals", "outdoor", "flexible"],
    status: "approved",
    applications: ["app5"],
    author: "employer5",
    deadline: new Date("2025-04-25"),
    contactEmail: "jobs@petservices.com",
    salary: {
      amount: 16.5,
      period: "hourly",
    },
    createdAt: new Date("2025-02-25"),
    updatedAt: new Date("2025-02-25"),
  } as Posting,
  {
    _id: "posting6",
    title: "Tutor",
    company: "Learning Center",
    companyWebsite: "https://learningcenter.edu",
    description:
      "The Learning Center is seeking high-achieving high school students to tutor younger students in math, science, and language arts.",
    requirements: [
      "Must be at least 16 years old",
      "Strong academic record (3.5+ GPA)",
      "Patience and good communication skills",
      "Experience in tutoring preferred",
    ],
    location: "Burlington, VT",
    type: "part-time",
    tags: ["education", "flexible", "academic"],
    status: "approved",
    applications: ["app6"],
    author: "employer6",
    deadline: new Date("2025-04-30"),
    contactEmail: "tutoring@learningcenter.edu",
    salary: {
      amount: 18,
      period: "hourly",
    },
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
  } as Posting,
  {
    _id: "posting7",
    title: "Grocery Store Clerk",
    company: "Fresh Market",
    companyWebsite: "https://freshmarket.com",
    description:
      "Fresh Market is hiring high school students for part-time positions. Duties include cashiering, stocking shelves, and assisting customers.",
    requirements: [
      "Must be at least 16 years old",
      "Ability to lift up to 25 pounds",
      "Basic math skills",
      "Available to work evenings and weekends",
    ],
    location: "Williston, VT",
    type: "part-time",
    tags: ["retail", "customer service", "entry-level"],
    status: "approved",
    applications: ["app7"],
    author: "employer7",
    deadline: new Date("2025-04-15"),
    contactEmail: "careers@freshmarket.com",
    salary: {
      min: 15,
      max: 17,
      period: "hourly",
    },
    createdAt: new Date("2025-02-15"),
    updatedAt: new Date("2025-02-15"),
  } as Posting,
]

// Create dummy applications
export const dummyApplications: Application[] = [
  {
    _id: "app1",
    applicant: "user1",
    posting: "posting1",
    status: "accepted",
    resume: "https://example.com/resume1.pdf",
    coverLetter: "I am excited to apply for this position...",
    additionalFiles: [],
    notes: "Great candidate, hired for summer position",
    reviewedAt: new Date("2025-03-01"),
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-03-01"),
  },
  {
    _id: "app2",
    applicant: "user1",
    posting: "posting2",
    status: "accepted",
    resume: "https://example.com/resume1.pdf",
    coverLetter: null,
    additionalFiles: [],
    notes: "Good interview, offered position",
    reviewedAt: new Date("2025-02-25"),
    createdAt: new Date("2025-02-15"),
    updatedAt: new Date("2025-02-25"),
  },
  {
    _id: "app3",
    applicant: "user1",
    posting: "posting3",
    status: "rejected",
    resume: "https://example.com/resume1.pdf",
    coverLetter: "I love books and would be a great fit...",
    additionalFiles: [],
    notes: "Not available for required hours",
    reviewedAt: new Date("2025-03-05"),
    createdAt: new Date("2025-02-25"),
    updatedAt: new Date("2025-03-05"),
  },
  {
    _id: "app4",
    applicant: "user1",
    posting: "posting4",
    status: "rejected",
    resume: "https://example.com/resume1.pdf",
    coverLetter: null,
    additionalFiles: [],
    notes: "Lacks required experience with children",
    reviewedAt: new Date("2025-03-10"),
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-10"),
  },
  {
    _id: "app5",
    applicant: "user1",
    posting: "posting5",
    status: "pending",
    resume: "https://example.com/resume1.pdf",
    coverLetter: "I have experience with dogs and reliable transportation...",
    additionalFiles: ["https://example.com/reference.pdf"],
    notes: null,
    reviewedAt: null,
    createdAt: new Date("2025-03-10"),
    updatedAt: new Date("2025-03-10"),
  },
  {
    _id: "app6",
    applicant: "user1",
    posting: "posting6",
    status: "pending",
    resume: "https://example.com/resume1.pdf",
    coverLetter: "I maintain a 3.9 GPA and have tutored before...",
    additionalFiles: ["https://example.com/transcript.pdf"],
    notes: null,
    reviewedAt: null,
    createdAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-03-15"),
  },
  {
    _id: "app7",
    applicant: "user1",
    posting: "posting7",
    status: "pending",
    resume: "https://example.com/resume1.pdf",
    coverLetter: null,
    additionalFiles: [],
    notes: null,
    reviewedAt: null,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
  },
]

// Helper function to get applications by status
export const getApplicationsByStatus = (status: Application["status"]): Application[] => {
  return dummyApplications.filter((app) => app.status === status)
}

// Helper function to get posting by ID
export const getPostingById = (id: string): Posting | undefined => {
  return dummyPostings.find((posting) => posting._id === id)
}

// Helper function to get application by ID
export const getApplicationById = (id: string): Application | undefined => {
  return dummyApplications.find((app) => app._id === id)
}

// Helper function to get postings by IDs
export const getPostingsByIds = (ids: string[]): Posting[] => {
  return dummyPostings.filter((posting) => ids.includes(posting._id))
}

// Helper function to get applications by posting IDs
export const getApplicationsByPostingIds = (ids: string[]): Application[] => {
  return dummyApplications.filter((app) => ids.includes(app.posting))
}

// Get in-progress applications (pending)
export const getInProgressApplications = (): Application[] => {
  return getApplicationsByStatus("pending")
}

// Get in-progress job postings
export const getInProgressJobs = (): Posting[] => {
  const pendingApps = getInProgressApplications()
  const postingIds = pendingApps.map((app) => app.posting)
  return getPostingsByIds(postingIds)
}

// Get recommended jobs (approved postings that match user preferences)
export const getRecommendedJobs = (): Posting[] => {
  const preferences = currentUser.profileSettings.jobPreferences || []
  const location = currentUser.profileSettings.preferredLocation

  // Filter for approved postings that match user preferences
  let recommendedJobs = dummyPostings.filter((posting) => {
    // Check if user has already applied
    const hasApplied = dummyApplications.some((app) => app.posting === posting._id && app.applicant === currentUser._id)

    if (hasApplied) return false

    // Check if posting matches user preferences
    const matchesTags = posting.tags.some((tag) => preferences.includes(tag))
    const matchesLocation = !location || posting.location.includes(location)

    return posting.status === "approved" && (matchesTags || matchesLocation)
  })

  // If no matches found based on preferences, return some default recommendations
  if (recommendedJobs.length === 0) {
    recommendedJobs = dummyPostings
      .filter((posting) => posting.status === "approved")
      .filter((posting) => {
        // Filter out jobs the user has already applied to
        return !dummyApplications.some((app) => app.posting === posting._id && app.applicant === currentUser._id)
      })
      .slice(0, 3) // Limit to 3 recommendations
  }

  return recommendedJobs
}

