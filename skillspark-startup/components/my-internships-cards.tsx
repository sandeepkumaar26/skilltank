"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { 
  Bookmark, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowRight,
  Users,
  Calendar,
  Clock,
  TrendingUp
} from "lucide-react"

interface Internship {
  id: string
  title: string
  type: "Remote" | "In-office" | "Hybrid"
  applicants: number
  status: "Under Review" | "Approved" | "Rejected" | "Draft"
  deadline: string
  profileViews: number
  shortlisted: number
  assignmentSubmissions?: number
  stipend?: string
  duration: string
}

const mockInternships: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    type: "Remote",
    applicants: 45,
    status: "Approved",
    deadline: "15 Aug 2025",
    profileViews: 120,
    shortlisted: 8,
    assignmentSubmissions: 35,
    stipend: "₹15,000/month",
    duration: "12 weeks"
  },
  {
    id: "2", 
    title: "Marketing Intern",
    type: "In-office",
    applicants: 20,
    status: "Under Review",
    deadline: "10 Sep 2025",
    profileViews: 65,
    shortlisted: 5,
    stipend: "Unpaid",
    duration: "8 weeks"
  },
  {
    id: "3",
    title: "Data Science Intern",
    type: "Hybrid",
    applicants: 33,
    status: "Approved",
    deadline: "20 Aug 2025",
    profileViews: 89,
    shortlisted: 12,
    assignmentSubmissions: 28,
    stipend: "₹20,000/month",
    duration: "16 weeks"
  },
  {
    id: "4",
    title: "UI/UX Design Intern",
    type: "Remote",
    applicants: 0,
    status: "Draft",
    deadline: "25 Sep 2025",
    profileViews: 0,
    shortlisted: 0,
    stipend: "₹12,000/month",
    duration: "10 weeks"
  }
]

export function MyInternshipsCards() {
  const [internships, setInternships] = useState<Internship[]>(mockInternships)
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null)
  const [bookmarkedInternships, setBookmarkedInternships] = useState<Set<string>>(new Set())

  const getStatusColor = (status: Internship["status"]) => {
    const colors = {
      "Approved": "#22c55e",
      "Under Review": "#f59e0b", 
      "Rejected": "#ef4444",
      "Draft": "#6b7280"
    }
    return colors[status] || "#6b7280"
  }

  const getTypeIcon = (type: Internship["type"]) => {
    const icons = {
      "Remote": "🌐",
      "In-office": "🏢", 
      "Hybrid": "🔄"
    }
    return icons[type]
  }

  const calculateConversionRate = (internship: Internship) => {
    if (internship.applicants === 0) return 0
    return Math.round((internship.shortlisted / internship.applicants) * 100)
  }

  const calculateViewConversionRate = (internship: Internship) => {
    if (internship.profileViews === 0) return 0
    return Math.round((internship.applicants / internship.profileViews) * 100)
  }

  const getCompanyName = (internshipId: string) => {
    const companies = {
      "1": "TechCorp",
      "2": "InnovateLabs", 
      "3": "DataSystems",
      "4": "DesignStudio"
    }
    return companies[internshipId as keyof typeof companies] || "TechCorp"
  }

  const formatStipend = (stipend: string | undefined) => {
    if (!stipend || stipend === "Unpaid") return "Unpaid"
    // Convert monthly stipend to hourly rate for display
    if (stipend.includes("month")) {
      const amount = stipend.match(/\d+/)?.[0]
      if (amount) {
        const hourly = Math.round(parseInt(amount) / 160) // Assuming 160 hours per month
        return `₹${hourly}/hr`
      }
    }
    return stipend
  }

  const toggleBookmark = (internshipId: string) => {
    setBookmarkedInternships(prev => {
      const newSet = new Set(prev)
      if (newSet.has(internshipId)) {
        newSet.delete(internshipId)
      } else {
        newSet.add(internshipId)
      }
      return newSet
    })
  }

  const handleDelete = (id: string) => {
    setInternships(prev => prev.filter(internship => internship.id !== id))
  }


  return (
    <div className="space-y-4">
      {internships.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No internships posted yet.</p>
          <p className="text-sm text-muted-foreground">Create your first internship posting to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="relative bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer"
            >
              {/* Header: Price and Bookmark */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-semibold text-gray-900">
                  {formatStipend(internship.stipend)}
                </span>
                <button
                  onClick={() => toggleBookmark(internship.id)}
                  className="p-1 hover:bg-gray-50 rounded transition-colors"
                >
                  <Bookmark 
                    className={cn(
                      "w-4 h-4 transition-colors",
                      bookmarkedInternships.has(internship.id) 
                        ? "fill-gray-900 text-gray-900" 
                        : "text-gray-400 hover:text-gray-600"
                    )}
                  />
                </button>
              </div>

              {/* Title */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-1">
                  {internship.title}
                </h3>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Dots separator */}
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              {/* Company Info and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">
                      {getCompanyName(internship.id).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-900">
                      {getCompanyName(internship.id)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {internship.type} • {internship.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(internship.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* View Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="px-4 py-1 rounded-full text-xs font-medium hover:bg-gray-50"
                        style={{ backgroundColor: 'white', color: 'black', borderColor: '#d1d5db', border: '1px solid' }}
                        onClick={() => setSelectedInternship(internship)}
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{selectedInternship?.title}</DialogTitle>
                        <DialogDescription>
                          Internship details and metrics
                        </DialogDescription>
                      </DialogHeader>
                      {selectedInternship && (
                        <div className="space-y-4">
                          {/* Status and Basic Info */}
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Status</span>
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                selectedInternship.status === "Approved" && "bg-green-100 text-green-800",
                                selectedInternship.status === "Under Review" && "bg-yellow-100 text-yellow-800",
                                selectedInternship.status === "Rejected" && "bg-red-100 text-red-800",
                                selectedInternship.status === "Draft" && "bg-gray-100 text-gray-800"
                              )}>
                                {selectedInternship.status}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Applications</span>
                              <span className="font-semibold">{selectedInternship.applicants}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Profile Views</span>
                              <span className="font-semibold">{selectedInternship.profileViews}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Deadline</span>
                              <span className="font-semibold">{selectedInternship.deadline}</span>
                            </div>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-blue-50 rounded-lg text-center">
                              <div className="text-lg font-bold text-blue-600">{selectedInternship.shortlisted}</div>
                              <div className="text-xs text-blue-600/70">Shortlisted</div>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg text-center">
                              <div className="text-lg font-bold text-green-600">
                                {selectedInternship.applicants > 0 
                                  ? Math.round((selectedInternship.shortlisted / selectedInternship.applicants) * 100)
                                  : 0}%
                              </div>
                              <div className="text-xs text-green-600/70">Conversion</div>
                            </div>
                          </div>

                          {selectedInternship.assignmentSubmissions && (
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-purple-600">Assignment Submissions</span>
                                <span className="font-semibold text-purple-600">{selectedInternship.assignmentSubmissions}</span>
                              </div>
                            </div>
                          )}

                          <Button 
                            className="w-full hover:bg-gray-50"
                            style={{ backgroundColor: 'white', color: 'black', borderColor: '#d1d5db', border: '1px solid' }}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            View All Applicants
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}