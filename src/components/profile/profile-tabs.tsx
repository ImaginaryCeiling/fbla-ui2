"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { PersonalInfoForm } from "./personal-info-form"
import { ResumeManager } from "./resume-manager"
import { JobPreferences } from "./job-preferences"
import { DocumentStorage } from "./document-storage"
// @ts-ignore
import type { User } from "@/types"
import { FileText, Settings, UserIcon, Briefcase } from "lucide-react"

interface ProfileTabsProps {
  user: User
}

export function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("personal-info")

  return (
    <Tabs defaultValue="personal-info" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal-info" className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Personal Info</span>
        </TabsTrigger>
        <TabsTrigger value="resume" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Resume</span>
        </TabsTrigger>
        <TabsTrigger value="preferences" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Preferences</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          <span className="hidden sm:inline">Documents</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal-info">
        <PersonalInfoForm user={user} />
      </TabsContent>

      <TabsContent value="resume">
        <ResumeManager user={user} />
      </TabsContent>

      <TabsContent value="preferences">
        <JobPreferences user={user} />
      </TabsContent>

      <TabsContent value="documents">
        <DocumentStorage user={user} />
      </TabsContent>
    </Tabs>
  )
}

