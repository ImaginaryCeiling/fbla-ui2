import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Catamount Careers</h3>
            <p className="text-sm text-gray-600">
              Connecting students with opportunities that match their skills and schedule.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portal" className="text-sm text-gray-600 hover:text-blue-600">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/portal/jobs" className="text-sm text-gray-600 hover:text-blue-600">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/portal/profile" className="text-sm text-gray-600 hover:text-blue-600">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-blue-600">
                  Career Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portal/employer" className="text-sm text-gray-600 hover:text-blue-600">
                  Employer Portal
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-sm text-gray-600 hover:text-blue-600">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">For Administration</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/portal/admin" className="text-sm text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">© 2025 Catamount Careers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

