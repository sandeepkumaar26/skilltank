"use client"

import * as React from "react"
import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Check,
  X,
  Clock,
  MoreHorizontal,
  FileText,
  User,
  Calendar,
  Star,
  AlertTriangle,
  MessageSquare,
  CheckCircle,
  XCircle,
  Upload,
  Trash2,
  BookOpen,
  GraduationCap,
  Timer,
  Award,
  Info
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Assignment {
  id: string
  studentId: string
  studentName: string
  studentAvatar?: string
  studentEmail: string
  week: number
  title: string
  course: string
  submittedAt: string
  deadline: string
  status: "pending" | "under_review" | "graded" | "rejected" | "late"
  priority: "high" | "medium" | "low"
  score?: number
  maxScore: number
  submissionType: "document" | "code" | "presentation" | "video"
  fileUrl?: string
  fileName?: string
  fileSize?: string
  description?: string
  rubric?: string[]
  feedback?: string
  gradedAt?: string
  gradedBy?: string
  isLate?: boolean
  daysLate?: number
  reviewStartedAt?: string
  reviewStartedBy?: string
}

const mockAssignments: Assignment[] = [
  {
    id: "ASG001234",
    studentId: "STU001234",
    studentName: "John Smith",
    studentAvatar: "/avatars/01.png",
    studentEmail: "john.smith@mit.edu",
    week: 2,
    title: "Data Structures Implementation",
    course: "Advanced Programming",
    submittedAt: "2 hours ago",
    deadline: "2024-02-15",
    status: "pending",
    priority: "high",
    maxScore: 100,
    submissionType: "code",
    fileName: "assignment-2-john-smith.zip",
    fileSize: "2.4 MB",
    description: "Implementation of Binary Search Tree with insertion, deletion, and traversal methods.",
    rubric: ["Code Quality (25%)", "Algorithm Efficiency (25%)", "Documentation (25%)", "Test Cases (25%)"],
    isLate: false
  },
  {
    id: "ASG001235",
    studentId: "STU001235",
    studentName: "Sarah Johnson",
    studentAvatar: "/avatars/02.png",
    studentEmail: "sarah.j@stanford.edu",
    week: 1,
    title: "Algorithm Analysis Report",
    course: "Computer Science Fundamentals",
    submittedAt: "1 day ago",
    deadline: "2024-02-10",
    status: "under_review",
    priority: "medium",
    maxScore: 100,
    submissionType: "document",
    fileName: "algorithm-analysis-sarah.pdf",
    fileSize: "1.8 MB",
    description: "Comparative analysis of sorting algorithms with time complexity evaluation.",
    rubric: ["Analysis Depth (30%)", "Writing Quality (25%)", "Visual Aids (25%)", "Conclusions (20%)"],
    reviewStartedAt: "6 hours ago",
    reviewStartedBy: "Dr. Sarah Wilson",
    isLate: false
  },
  {
    id: "ASG001236",
    studentId: "STU001236",
    studentName: "Michael Chen",
    studentAvatar: "/avatars/03.png",
    studentEmail: "m.chen@berkeley.edu",
    week: 3,
    title: "Machine Learning Model",
    course: "AI & ML Specialization",
    submittedAt: "3 hours ago",
    deadline: "2024-02-20",
    status: "graded",
    priority: "low",
    score: 87,
    maxScore: 100,
    submissionType: "code",
    fileName: "ml-model-michael.ipynb",
    fileSize: "5.2 MB",
    description: "Neural network implementation for image classification using TensorFlow.",
    rubric: ["Model Architecture (30%)", "Training Process (25%)", "Evaluation Metrics (25%)", "Documentation (20%)"],
    feedback: "Excellent implementation with well-documented code. The model architecture shows good understanding of neural networks. Minor improvements needed in hyperparameter tuning documentation.",
    gradedAt: "1 hour ago",
    gradedBy: "Prof. Michael Chen",
    isLate: false
  },
  {
    id: "ASG001237",
    studentId: "STU001237",
    studentName: "Emily Davis",
    studentAvatar: "/avatars/04.png",
    studentEmail: "emily.d@harvard.edu",
    week: 2,
    title: "System Architecture Presentation",
    course: "Software Engineering",
    submittedAt: "5 hours ago",
    deadline: "2024-02-12",
    status: "pending",
    priority: "high",
    maxScore: 100,
    submissionType: "presentation",
    fileName: "system-architecture-emily.pptx",
    fileSize: "12.7 MB",
    description: "Microservices architecture design for e-commerce platform with scalability considerations.",
    rubric: ["Architecture Design (35%)", "Presentation Quality (25%)", "Technical Depth (25%)", "Q&A Handling (15%)"],
    isLate: true,
    daysLate: 2
  },
  {
    id: "ASG001238",
    studentId: "STU001238",
    studentName: "David Wilson",
    studentAvatar: "/avatars/05.png",
    studentEmail: "d.wilson@cmu.edu",
    week: 4,
    title: "Database Design Project",
    course: "Backend Development",
    submittedAt: "6 hours ago",
    deadline: "2024-02-25",
    status: "rejected",
    priority: "medium",
    maxScore: 100,
    submissionType: "document",
    fileName: "database-design-david.sql",
    fileSize: "890 KB",
    description: "Relational database schema design for inventory management system.",
    rubric: ["Schema Design (30%)", "Normalization (25%)", "Query Optimization (25%)", "Documentation (20%)"],
    feedback: "The submission lacks proper normalization and has several schema design flaws. Please review the requirements and resubmit with proper foreign key relationships.",
    gradedAt: "2 hours ago",
    gradedBy: "Dr. Alex Rodriguez",
    isLate: false
  },
  {
    id: "ASG001239",
    studentId: "STU001239",
    studentName: "Lisa Park",
    studentAvatar: "/avatars/06.png",
    studentEmail: "lisa.p@princeton.edu",
    week: 1,
    title: "Web Development Fundamentals",
    course: "Frontend Development",
    submittedAt: "30 minutes ago",
    deadline: "2024-02-08",
    status: "pending",
    priority: "medium",
    maxScore: 100,
    submissionType: "code",
    fileName: "web-project-lisa.zip",
    fileSize: "3.1 MB",
    description: "Responsive website implementation using HTML5, CSS3, and vanilla JavaScript.",
    rubric: ["Responsive Design (25%)", "Code Quality (25%)", "Functionality (25%)", "Accessibility (25%)"],
    isLate: false
  }
]

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState(mockAssignments)
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [weekFilter, setWeekFilter] = useState<string>("all")
  const [courseFilter, setCourseFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [showReviewPanel, setShowReviewPanel] = useState(false)
  const [showGradeDialog, setShowGradeDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showBulkGradeDialog, setShowBulkGradeDialog] = useState(false)
  const [gradeScore, setGradeScore] = useState([0])
  const [gradeFeedback, setGradeFeedback] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")

  const getFilteredAssignments = (tab: string) => {
    return assignments.filter(assignment => {
      const matchesSearch = assignment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || assignment.status === statusFilter
      const matchesWeek = weekFilter === "all" || assignment.week.toString() === weekFilter
      const matchesCourse = courseFilter === "all" || assignment.course === courseFilter
      const matchesTab = tab === "all" || assignment.status === tab
      
      return matchesSearch && matchesStatus && matchesWeek && matchesCourse && matchesTab
    })
  }

  const filteredAssignments = getFilteredAssignments(activeTab)

  const handleSelectAll = () => {
    if (selectedAssignments.length === filteredAssignments.length) {
      setSelectedAssignments([])
    } else {
      setSelectedAssignments(filteredAssignments.map(a => a.id))
    }
  }

  const handleSelectAssignment = (assignmentId: string) => {
    setSelectedAssignments(prev =>
      prev.includes(assignmentId)
        ? prev.filter(id => id !== assignmentId)
        : [...prev, assignmentId]
    )
  }

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setShowReviewPanel(true)
  }

  const handleStartReview = (assignment: Assignment) => {
    setAssignments(prev => prev.map(a => 
      a.id === assignment.id 
        ? { ...a, status: "under_review" as const, reviewStartedAt: "Just now", reviewStartedBy: "Current Admin" }
        : a
    ))
    setSelectedAssignment({...assignment, status: "under_review", reviewStartedAt: "Just now", reviewStartedBy: "Current Admin"})
    // Show toast: "Review started"
  }

  const handleGradeAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setGradeScore([assignment.score || 0])
    setGradeFeedback(assignment.feedback || "")
    setShowGradeDialog(true)
  }

  const handleRejectAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    setRejectionReason(assignment.feedback || "")
    setShowRejectDialog(true)
  }

  const confirmGrade = () => {
    if (selectedAssignment) {
      setAssignments(prev => prev.map(a => 
        a.id === selectedAssignment.id 
          ? { 
              ...a, 
              status: "graded" as const, 
              score: gradeScore[0], 
              feedback: gradeFeedback,
              gradedAt: "Just now",
              gradedBy: "Current Admin"
            }
          : a
      ))
      setShowGradeDialog(false)
      setGradeScore([0])
      setGradeFeedback("")
      // Show toast: "Assignment graded successfully"
    }
  }

  const confirmRejection = () => {
    if (selectedAssignment && rejectionReason.trim()) {
      setAssignments(prev => prev.map(a => 
        a.id === selectedAssignment.id 
          ? { 
              ...a, 
              status: "rejected" as const, 
              feedback: rejectionReason,
              gradedAt: "Just now",
              gradedBy: "Current Admin"
            }
          : a
      ))
      setShowRejectDialog(false)
      setRejectionReason("")
      // Show toast: "Assignment rejected"
    }
  }

  const downloadSubmission = (assignment: Assignment) => {
    // Simulate download
    console.log('Downloading submission for:', assignment.fileName)
    // Show toast: "Download started"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "under_review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      case "graded":
        return <Badge className="bg-green-100 text-green-800">Graded</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "late":
        return <Badge className="bg-orange-100 text-orange-800">Late</Badge>
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  const getSubmissionIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "code":
        return <BookOpen className="h-4 w-4 text-green-600" />
      case "presentation":
        return <Eye className="h-4 w-4 text-purple-600" />
      case "video":
        return <Upload className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "under_review":
        return <Eye className="h-4 w-4 text-blue-600" />
      case "graded":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "late":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return null
    }
  }

  const pendingCount = assignments.filter(a => a.status === "pending").length
  const underReviewCount = assignments.filter(a => a.status === "under_review").length
  const gradedCount = assignments.filter(a => a.status === "graded").length
  const rejectedCount = assignments.filter(a => a.status === "rejected").length

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            Assignments
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 ml-2 text-white/80" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-gray-900">
                <div className="max-w-xs space-y-1">
                  <p className="font-medium">Assignment Review System</p>
                  <p className="text-xs">Review student submissions across all Kaizen courses</p>
                  <p className="text-xs text-gray-600">Grading affects student certification eligibility</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="text-white/90">
            Review and grade Kaizen certification assignments with detailed rubrics
          </p>
        </div>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="bg-white text-blue-700 hover:bg-gray-100 border-white">
                <Download className="mr-2 h-4 w-4" />
                Export Grades
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download grade report as Excel file</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                disabled={selectedAssignments.length === 0}
                onClick={() => setShowBulkGradeDialog(true)}
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                <Award className="mr-2 h-4 w-4" />
                Bulk Grade ({selectedAssignments.length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Grade multiple assignments at once</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{pendingCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              Awaiting your review
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Under Review
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{underReviewCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              Currently being reviewed
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Graded
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{gradedCount}</div>
            <p className="text-xs text-gray-600 mt-1">
              Average: {Math.round(assignments.filter(a => a.score).reduce((acc, a) => acc + (a.score || 0), 0) / gradedCount || 0)}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Late Submissions
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{assignments.filter(a => a.isLate).length}</div>
            <p className="text-xs text-gray-600 mt-1">
              Require attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Week Selector Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white/90 backdrop-blur-sm p-1 h-auto">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <FileText className="h-4 w-4" />
              <span>All ({assignments.length})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <Clock className="h-4 w-4" />
              <span>Pending ({pendingCount})</span>
            </div>
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="under_review" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <Eye className="h-4 w-4" />
              <span>Review ({underReviewCount})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="graded" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <CheckCircle className="h-4 w-4" />
              <span>Graded ({gradedCount})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-700 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <XCircle className="h-4 w-4" />
              <span>Rejected ({rejectedCount})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="late" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Late ({assignments.filter(a => a.isLate).length})</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Filters and Search */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by student name, assignment title, course, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-200"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] bg-white border-gray-200">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="graded">Graded</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={weekFilter} onValueChange={setWeekFilter}>
                  <SelectTrigger className="w-[120px] bg-white border-gray-200">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Weeks</SelectItem>
                    <SelectItem value="1">Week 1</SelectItem>
                    <SelectItem value="2">Week 2</SelectItem>
                    <SelectItem value="3">Week 3</SelectItem>
                    <SelectItem value="4">Week 4</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-[200px] bg-white border-gray-200">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="Advanced Programming">Advanced Programming</SelectItem>
                    <SelectItem value="AI & ML Specialization">AI & ML Specialization</SelectItem>
                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                    <SelectItem value="Backend Development">Backend Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedAssignments.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">
                      {selectedAssignments.length} assignment(s) selected
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={() => setShowBulkGradeDialog(true)}>
                      <Award className="mr-1 h-3 w-3" />
                      Bulk Grade
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      Feedback
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Assignments Table */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-lg">
            <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedAssignments.length === filteredAssignments.length && filteredAssignments.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment) => (
                  <TableRow 
                    key={assignment.id} 
                    className={`transition-colors hover:bg-blue-50/50 ${assignment.isLate ? "bg-orange-50/50" : "bg-white/50"}`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedAssignments.includes(assignment.id)}
                        onCheckedChange={() => handleSelectAssignment(assignment.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={assignment.studentAvatar} alt={assignment.studentName} />
                          <AvatarFallback>
                            {assignment.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{assignment.studentName}</div>
                          <div className="text-sm text-muted-foreground">{assignment.studentEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div 
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                        onClick={() => handleViewAssignment(assignment)}
                      >
                        {getSubmissionIcon(assignment.submissionType)}
                        <div>
                          <div className="font-medium text-blue-600 hover:text-blue-800">
                            Week {assignment.week}: {assignment.title}
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <span>{assignment.fileName}</span>
                            <span>•</span>
                            <span>{assignment.fileSize}</span>
                            {assignment.isLate && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-orange-600 text-xs">
                                  {assignment.daysLate} days late
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{assignment.course}</div>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <Timer className="h-3 w-3" />
                            <span>{assignment.submittedAt}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Deadline: {assignment.deadline}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(assignment.status)}
                            {getStatusBadge(assignment.status)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {assignment.status === "under_review" && assignment.reviewStartedBy && (
                            <p>Review started by {assignment.reviewStartedBy}</p>
                          )}
                          {assignment.status === "graded" && assignment.gradedBy && (
                            <p>Graded by {assignment.gradedBy}</p>
                          )}
                          {assignment.status === "rejected" && assignment.gradedBy && (
                            <p>Rejected by {assignment.gradedBy}</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(assignment.priority)}
                    </TableCell>
                    <TableCell>
                      {assignment.score !== undefined ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-center">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="font-medium">{assignment.score}/{assignment.maxScore}</span>
                              </div>
                              <Progress 
                                value={(assignment.score / assignment.maxScore) * 100} 
                                className="w-16 h-2 mt-1"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Percentage: {Math.round((assignment.score / assignment.maxScore) * 100)}%</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          Not graded
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewAssignment(assignment)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Assignment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => downloadSubmission(assignment)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Submission
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {assignment.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleStartReview(assignment)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Start Review
                            </DropdownMenuItem>
                          )}
                          {(assignment.status === "pending" || assignment.status === "under_review") && (
                            <DropdownMenuItem onClick={() => handleGradeAssignment(assignment)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Grade Assignment
                            </DropdownMenuItem>
                          )}
                          {assignment.status === "graded" && (
                            <DropdownMenuItem onClick={() => handleGradeAssignment(assignment)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Grade
                            </DropdownMenuItem>
                          )}
                          {assignment.status !== "rejected" && (
                            <DropdownMenuItem onClick={() => handleRejectAssignment(assignment)}>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Assignment
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Assignment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </Card>

          {/* Pagination */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200/50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredAssignments.length}</span> of <span className="font-semibold text-gray-900">{assignments.length}</span> assignments
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled className="bg-white">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assignment Review Panel */}
      <Sheet open={showReviewPanel} onOpenChange={setShowReviewPanel}>
        <SheetContent className="w-[800px] sm:w-[540px]">
          {selectedAssignment && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="flex items-center space-x-2">
                      <span>Week {selectedAssignment.week}: {selectedAssignment.title}</span>
                      {selectedAssignment.isLate && (
                        <Badge variant="outline" className="text-orange-600">
                          {selectedAssignment.daysLate} days late
                        </Badge>
                      )}
                    </SheetTitle>
                    <SheetDescription>{selectedAssignment.course}</SheetDescription>
                  </div>
                  {getStatusBadge(selectedAssignment.status)}
                </div>
              </SheetHeader>

              <div className="space-y-6 py-6">
                {/* Student Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedAssignment.studentAvatar} alt={selectedAssignment.studentName} />
                        <AvatarFallback>
                          {selectedAssignment.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedAssignment.studentName}</div>
                        <div className="text-sm text-muted-foreground">{selectedAssignment.studentEmail}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Assignment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Assignment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Submission Type</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          {getSubmissionIcon(selectedAssignment.submissionType)}
                          <span className="text-sm text-muted-foreground capitalize">{selectedAssignment.submissionType}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">File</Label>
                        <p className="text-sm text-muted-foreground">{selectedAssignment.fileName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">File Size</Label>
                        <p className="text-sm text-muted-foreground">{selectedAssignment.fileSize}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Submitted</Label>
                        <p className="text-sm text-muted-foreground">{selectedAssignment.submittedAt}</p>
                      </div>
                    </div>

                    {selectedAssignment.description && (
                      <div>
                        <Label className="text-sm font-medium">Description</Label>
                        <p className="text-sm text-muted-foreground mt-1">{selectedAssignment.description}</p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadSubmission(selectedAssignment)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Grading Rubric */}
                {selectedAssignment.rubric && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Grading Rubric</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedAssignment.rubric.map((criteria, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{criteria}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">Not scored</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Current Score/Feedback */}
                {selectedAssignment.status === "graded" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Grade: {selectedAssignment.score}/{selectedAssignment.maxScore}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Progress 
                          value={(selectedAssignment.score! / selectedAssignment.maxScore) * 100} 
                          className="w-full"
                        />
                        {selectedAssignment.feedback && (
                          <div>
                            <Label className="text-sm font-medium">Feedback</Label>
                            <p className="text-sm text-muted-foreground mt-1">{selectedAssignment.feedback}</p>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          Graded by {selectedAssignment.gradedBy} • {selectedAssignment.gradedAt}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Review Actions */}
                <div className="flex space-x-2">
                  {selectedAssignment.status === "pending" && (
                    <Button onClick={() => handleStartReview(selectedAssignment)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Start Review
                    </Button>
                  )}
                  {(selectedAssignment.status === "pending" || selectedAssignment.status === "under_review") && (
                    <Button onClick={() => handleGradeAssignment(selectedAssignment)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Grade Assignment
                    </Button>
                  )}
                  {selectedAssignment.status !== "rejected" && (
                    <Button variant="destructive" onClick={() => handleRejectAssignment(selectedAssignment)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Grade Assignment Dialog */}
      <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Grade Assignment</DialogTitle>
            <DialogDescription>
              Provide a score and feedback for {selectedAssignment?.studentName}&apos;s submission
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Score: {gradeScore[0]}/{selectedAssignment?.maxScore}</Label>
              <Slider
                value={gradeScore}
                onValueChange={setGradeScore}
                min={0}
                max={selectedAssignment?.maxScore || 100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{selectedAssignment?.maxScore}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Provide detailed feedback on the submission..."
                value={gradeFeedback}
                onChange={(e) => setGradeFeedback(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGradeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmGrade}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Assignment Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Assignment</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedAssignment?.studentName}&apos;s submission. This will be shared with the student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejectionReason">Reason for rejection</Label>
              <Textarea
                id="rejectionReason"
                placeholder="Explain why this assignment is being rejected and what needs to be improved..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmRejection}
              disabled={!rejectionReason.trim()}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Grade Dialog */}
      <Dialog open={showBulkGradeDialog} onOpenChange={setShowBulkGradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Grade Assignments</DialogTitle>
            <DialogDescription>
              Apply the same grade and feedback to {selectedAssignments.length} selected assignments
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Bulk Grading Warning</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                This will apply the same grade to all selected assignments. Individual review is recommended for accuracy.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Score: {gradeScore[0]}/100</Label>
              <Slider
                value={gradeScore}
                onValueChange={setGradeScore}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bulkFeedback">General Feedback</Label>
              <Textarea
                id="bulkFeedback"
                placeholder="Provide general feedback for all selected assignments..."
                value={gradeFeedback}
                onChange={(e) => setGradeFeedback(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkGradeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Bulk grade logic would go here
              setShowBulkGradeDialog(false)
              setSelectedAssignments([])
              // Show toast: "Bulk grading completed"
            }}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Grade All Selected
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}