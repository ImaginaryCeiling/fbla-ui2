"use client"

import { useState } from "react"
import { dummyPostings } from "@/data/dummy-data"
import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { PostingReviewCard } from "./posting-review-card"

export function PostingReviewQueue() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  // Get all pending postings
  const pendingPostings = dummyPostings
    .filter((posting) => posting.status === "pending")
    .filter(
      (posting) =>
        posting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        posting.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        posting.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortBy === "newest" ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Review Queue</h1>
        <div className="text-sm text-gray-500">
          {pendingPostings.length} {pendingPostings.length === 1 ? "posting" : "postings"} awaiting review
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search postings..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as "newest" | "oldest")}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {pendingPostings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {pendingPostings.map((posting) => (
            <PostingReviewCard key={posting._id} posting={posting} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium">No postings to review</h3>
              <p className="mt-1 text-sm text-gray-500">
                All job postings have been reviewed. Check back later for new submissions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

