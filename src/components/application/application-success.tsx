import type { Posting } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ApplicationSuccessProps {
  posting: Posting
}

export function ApplicationSuccess({ posting }: ApplicationSuccessProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border-green-100">
        <CardHeader className="pb-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-700">Application Submitted!</CardTitle>
          <CardDescription className="text-base">
            Your application for <span className="font-medium">{posting.title}</span> at{" "}
            <span className="font-medium">{posting.company}</span> has been submitted successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-6 text-center">
          <p className="text-sm text-gray-600">
            The employer will review your application and contact you if they're interested in moving forward.
          </p>

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-sm font-medium">What happens next?</h3>
            <ol className="space-y-2 text-left text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  1
                </span>
                <span>The employer will review your application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  2
                </span>
                <span>You'll receive a notification if they're interested</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                  3
                </span>
                <span>You may be contacted for an interview</span>
              </li>
            </ol>
          </div>

          <p className="text-sm text-gray-600">
            You can track the status of your application in the "Applications" section of your dashboard.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/portal/applications">View My Applications</Link>
          </Button>
          <Button asChild>
            <Link href="/portal/jobs">
              Browse More Jobs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

