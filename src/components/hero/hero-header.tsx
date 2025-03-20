import Link from "next/link"
import { Button } from "../ui/button"

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">Catamount Careers</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/portal">
            <Button variant="outline" className="hidden sm:inline-flex">
              Student Portal
            </Button>
          </Link>
          <Link href="/portal/employer">
            <Button className="bg-blue-600 hover:bg-blue-700">For Employers</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

