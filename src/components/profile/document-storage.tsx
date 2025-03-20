"use client"

import type React from "react"

import { useState } from "react"
// @ts-ignore
import type { User } from "@/types"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
//import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Download, Trash2, FileImage, FileArchive, File } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "../ui/badge"

interface DocumentStorageProps {
  user: User
}

// Mock document types
const documentTypes = ["Cover Letter", "Certificate", "Reference Letter", "Transcript", "Portfolio", "Other"]

// Mock documents
const mockDocuments = [
  {
    id: "doc1",
    name: "Cover Letter - Retail",
    type: "Cover Letter",
    file: "cover_letter_retail.pdf",
    size: "45 KB",
    uploadedAt: new Date("2025-02-10"),
  },
  {
    id: "doc2",
    name: "High School Transcript",
    type: "Transcript",
    file: "transcript_2024.pdf",
    size: "320 KB",
    uploadedAt: new Date("2025-01-15"),
  },
  {
    id: "doc3",
    name: "Reference Letter - Mr. Johnson",
    type: "Reference Letter",
    file: "reference_johnson.pdf",
    size: "78 KB",
    uploadedAt: new Date("2025-02-05"),
  },
]

export function DocumentStorage({ user }: DocumentStorageProps) {
  const [documents, setDocuments] = useState(mockDocuments)
  const [activeTab, setActiveTab] = useState("all")
  const [documentName, setDocumentName] = useState("")
  const [documentType, setDocumentType] = useState(documentTypes[0])

  const filteredDocuments = activeTab === "all" ? documents : documents.filter((doc) => doc.type === activeTab)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!documentName.trim()) {
      /*toast({
        title: "Document name required",
        description: "Please enter a name for your document.",
        variant: "destructive",
      })*/
     alert("Document name required");
      return
    }

    // In a real app, this would upload the file to a server
    // For now, we'll just simulate adding it to the list
    const newDocument = {
      id: `doc${documents.length + 1}`,
      name: documentName,
      type: documentType,
      file: file.name,
      size: `${Math.round(file.size / 1024)} KB`,
      uploadedAt: new Date(),
    }

    setDocuments((prev) => [...prev, newDocument])

    /*toast({
      title: "Document uploaded",
      description: "Your document has been uploaded successfully.",
    })*/
   alert("Document uploaded sucessfully");

    // Reset the form
    setDocumentName("")
    e.target.value = ""
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))

    /*toast({
      title: "Document deleted",
      description: "Your document has been deleted.",
    })*/
   alert("Document deleted successfully");
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "Cover Letter":
      case "Reference Letter":
      case "Transcript":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Certificate":
        return <FileImage className="h-5 w-5 text-green-500" />
      case "Portfolio":
        return <FileArchive className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>Upload additional documents for your job applications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="documentName">Document Name</Label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="e.g. Cover Letter - Retail"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {documentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-6">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Drag and drop your document here</p>
                <p className="text-xs text-muted-foreground">or click to browse files (max 5MB)</p>
              </div>
              <Input
                type="file"
                className="hidden"
                id="document-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
              <Label
                htmlFor="document-upload"
                className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Select File
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Documents</CardTitle>
          <CardDescription>Manage your uploaded documents for job applications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex w-full overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              {documentTypes.map((type) => (
                <TabsTrigger key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              {filteredDocuments.length > 0 ? (
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md bg-gray-100 p-2">{getDocumentIcon(doc.type)}</div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                            <span>{doc.file}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>Uploaded {formatDistanceToNow(doc.uploadedAt, { addSuffix: true })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteDocument(doc.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No documents found</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "all"
                      ? "Upload documents to get started with your job applications."
                      : `You haven't uploaded any ${activeTab} documents yet.`}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

