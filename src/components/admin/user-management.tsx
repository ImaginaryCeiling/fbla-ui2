"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Search, Shield, User, UserCog } from "lucide-react"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

// Mock user data
const mockUsers = [
  {
    id: "user1",
    username: "student1",
    email: "student1@school.edu",
    role: "student",
    status: "active",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "user2",
    username: "student2",
    email: "student2@school.edu",
    role: "student",
    status: "active",
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "user3",
    username: "employer1",
    email: "employer1@company.com",
    role: "employer",
    status: "active",
    createdAt: new Date("2025-01-10"),
  },
  {
    id: "user4",
    username: "employer2",
    email: "employer2@business.com",
    role: "employer",
    status: "active",
    createdAt: new Date("2025-01-25"),
  },
  {
    id: "user5",
    username: "admin1",
    email: "admin1@school.edu",
    role: "admin",
    status: "active",
    createdAt: new Date("2024-12-01"),
  },
]

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter users by role and search term
  const filterUsers = (role: string) => {
    return mockUsers
      .filter((user) => user.role === role)
      .filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
  }

  const students = filterUsers("student")
  const employers = filterUsers("employer")
  const admins = filterUsers("admin")

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>
      case "employer":
        return <Badge className="bg-blue-100 text-blue-800">Employer</Badge>
      case "student":
      default:
        return <Badge className="bg-green-100 text-green-800">Student</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <Button>
          <UserCog className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search users by name or email..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="students">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
          <TabsTrigger value="employers">Employers ({employers.length})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({admins.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Users</CardTitle>
              <CardDescription>Manage student accounts and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Username</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{user.username}</span>
                          </div>
                        </td>
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">{getRoleBadge(user.role)}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="capitalize">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              Suspend
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Employer Users</CardTitle>
              <CardDescription>Manage employer accounts and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Username</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employers.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span>{user.username}</span>
                          </div>
                        </td>
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">{getRoleBadge(user.role)}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="capitalize">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              Suspend
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage administrator accounts and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">Username</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((user) => (
                      <tr key={user.id} className="border-b">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-purple-500" />
                            <span>{user.username}</span>
                          </div>
                        </td>
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">{getRoleBadge(user.role)}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="capitalize">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                              Suspend
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

