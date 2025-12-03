"use client"

import * as React from "react"
import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  School,
  MapPin,
  X,
  FileText,
  Award,
  Calendar,
  Users,
  GraduationCap,
  Settings,
  ChevronRight,
  Star,
  AlertTriangle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
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

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  college: string
  field: string
  location: string
  verificationStatus: "verified" | "pending" | "rejected"
  kaizenScore: number
  joinDate: string
  coursesEnrolled: number
  resumeUrl?: string
  phone?: string
  bio?: string
  assignments?: Assignment[]
  certifications?: Certification[]
}

interface Assignment {
  id: string
  week: number
  title: string
  status: "pending" | "approved" | "rejected"
  score: number
  submittedAt: string
  filename: string
  comments?: string
}

interface Certification {
  id: string
  name: string
  issuedAt: string
  score: number
  certificateUrl?: string
}

const mockAssignments: Assignment[] = [
  { id: "A001", week: 1, title: "JavaScript Fundamentals", status: "approved", score: 85, submittedAt: "2024-01-20", filename: "week1-submission.pdf" },
  { id: "A002", week: 2, title: "React Basics", status: "pending", score: 0, submittedAt: "2024-01-27", filename: "week2-submission.pdf" },
  { id: "A003", week: 3, title: "Node.js API", status: "rejected", score: 45, submittedAt: "2024-02-03", filename: "week3-submission.pdf", comments: "Incomplete implementation" },
  { id: "A004", week: 4, title: "Full Stack Project", status: "pending", score: 0, submittedAt: "2024-02-10", filename: "week4-submission.pdf" }
]

const mockStudents: Student[] = [
  {
    id: "STU001234",
    name: "John Smith",
    email: "john.smith@mit.edu",
    avatar: "/avatars/01.png",
    college: "MIT",
    field: "Computer Science",
    location: "Boston, MA",
    verificationStatus: "verified",
    kaizenScore: 87,
    joinDate: "2024-01-15",
    coursesEnrolled: 3,
    resumeUrl: "/resumes/john-smith.pdf",
    phone: "+1 (555) 123-4567",
    bio: "Computer Science student passionate about AI and machine learning.",
    assignments: mockAssignments,
    certifications: [{ id: "C001", name: "JavaScript Mastery", issuedAt: "2024-01-25", score: 85, certificateUrl: "/certificates/john-js.pdf" }]
  },
  {
    id: "STU001235",
    name: "Sarah Johnson",
    email: "sarah.j@stanford.edu",
    college: "Stanford University",
    field: "Data Science",
    location: "Palo Alto, CA",
    verificationStatus: "pending",
    kaizenScore: 92,
    joinDate: "2024-01-18",
    coursesEnrolled: 2
  },
  {
    id: "STU001236",
    name: "Michael Chen",
    email: "m.chen@berkeley.edu",
    college: "UC Berkeley",
    field: "Software Engineering",
    location: "Berkeley, CA",
    verificationStatus: "verified",
    kaizenScore: 78,
    joinDate: "2024-01-20",
    coursesEnrolled: 4
  },
  {
    id: "STU001237",
    name: "Emily Davis",
    email: "emily.d@harvard.edu",
    college: "Harvard University",
    field: "Computer Science",
    location: "Cambridge, MA",
    verificationStatus: "rejected",
    kaizenScore: 65,
    joinDate: "2024-01-22",
    coursesEnrolled: 1
  },
  {
    id: "STU001238",
    name: "David Wilson",
    email: "d.wilson@cmu.edu",
    college: "Carnegie Mellon",
    field: "Machine Learning",
    location: "Pittsburgh, PA",
    verificationStatus: "pending",
    kaizenScore: 95,
    joinDate: "2024-01-25",
    coursesEnrolled: 5
  }
]

export default function StudentsPage() {
  const [students, setStudents] = useState(mockStudents)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [collegeFilter, setCollegeFilter] = useState<string[]>([])
  const [kaizenRange, setKaizenRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showProfilePanel, setShowProfilePanel] = useState(false)
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [activeTab, setActiveTab] = useState("info")

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.college.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || student.verificationStatus === statusFilter
    const matchesCollege = collegeFilter.length === 0 || collegeFilter.includes(student.college)
    const matchesKaizen = student.kaizenScore >= kaizenRange[0] && student.kaizenScore <= kaizenRange[1]
    
    return matchesSearch && matchesStatus && matchesCollege && matchesKaizen
  })

  const colleges = Array.from(new Set(students.map(s => s.college)))

  const handleVerifyStudent = (student: Student) => {
    setSelectedStudent(student)
    setShowVerifyDialog(true)
  }

  const handleRejectStudent = (student: Student) => {
    setSelectedStudent(student)
    setShowRejectDialog(true)
  }

  const confirmVerification = () => {
    if (selectedStudent) {
      setStudents(prev => prev.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, verificationStatus: "verified" as const }
          : s
      ))
      setShowVerifyDialog(false)
      // Show toast notification
    }
  }

  const confirmRejection = () => {
    if (selectedStudent && rejectionReason.trim()) {
      setStudents(prev => prev.map(s => 
        s.id === selectedStudent.id 
          ? { ...s, verificationStatus: "rejected" as const }
          : s
      ))
      setShowRejectDialog(false)
      setRejectionReason("")
      // Show toast notification
    }
  }

  const openStudentProfile = (student: Student) => {
    setSelectedStudent(student)
    setShowProfilePanel(true)
  }

  const downloadResume = (student: Student) => {
    if (student.resumeUrl) {
      // Simulate download
      console.log('Downloading resume for:', student.name)
      // Show toast: "Resume downloaded"
    }
  }

  const resetFilters = () => {
    setStatusFilter("all")
    setCollegeFilter([])
    setKaizenRange([0, 100])
    setSearchTerm("")
  }

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id))
    }
  }

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen -m-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-white/90 mt-1">
            Manage student profiles, verification status, and Kaizen progress
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-white text-[#034078] hover:bg-gray-100 border-white">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>Add Student</Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, email, or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {(collegeFilter.length > 0 || kaizenRange[0] > 0 || kaizenRange[1] < 100) && (
                <span className="ml-1 h-2 w-2 bg-blue-500 rounded-full" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Students</SheetTitle>
              <SheetDescription>
                Apply filters to narrow down the student list
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6">
              {/* Verification Status */}
              <div className="space-y-2">
                <Label>Verification Status</Label>
                <div className="space-y-2">
                  {["all", "verified", "pending", "rejected"].map(status => (
                    <div key={status} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={status}
                        name="status"
                        checked={statusFilter === status}
                        onChange={() => setStatusFilter(status)}
                        className="text-blue-600"
                      />
                      <label htmlFor={status} className="text-sm capitalize">
                        {status === "all" ? "All Status" : status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* College Filter */}
              <div className="space-y-2">
                <Label>Colleges</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {colleges.map(college => (
                    <div key={college} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={college}
                        checked={collegeFilter.includes(college)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCollegeFilter(prev => [...prev, college])
                          } else {
                            setCollegeFilter(prev => prev.filter(c => c !== college))
                          }
                        }}
                        className="text-blue-600"
                      />
                      <label htmlFor={college} className="text-sm">
                        {college}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kaizen Score Range */}
              <div className="space-y-2">
                <Label>Kaizen Score Range</Label>
                <div className="px-2">
                  <Slider
                    value={kaizenRange}
                    onValueChange={setKaizenRange}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{kaizenRange[0]}</span>
                    <span>{kaizenRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <Button variant="outline" onClick={resetFilters} className="w-full">
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bulk Actions */}
      {selectedStudents.length > 0 && (
        <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedStudents.length} student(s) selected
          </span>
          <Button size="sm" variant="outline">
            Verify Selected
          </Button>
          <Button size="sm" variant="outline">
            Send Email
          </Button>
          <Button size="sm" variant="destructive">
            Delete Selected
          </Button>
        </div>
      )}

      {/* Students Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedStudents.length === filteredStudents.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kaizen Score</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => handleSelectStudent(student.id)}
                  />
                </TableCell>
                <TableCell>
                  <div 
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1 rounded"
                    onClick={() => openStudentProfile(student)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-blue-600 hover:text-blue-800">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm">{student.email}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {student.location}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex items-center space-x-1">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{student.college}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{student.field}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(student.verificationStatus)}
                        {getStatusBadge(student.verificationStatus)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {student.verificationStatus === "verified" 
                        ? "Verified on January 20, 2024"
                        : student.verificationStatus === "pending"
                        ? "Verification pending review"
                        : "Verification rejected"}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{student.kaizenScore}/100</div>
                        <Progress value={student.kaizenScore} className="w-16 h-2" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Exact score: {student.kaizenScore}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <div className="text-sm font-medium">{student.coursesEnrolled}</div>
                    <div className="text-xs text-muted-foreground">enrolled</div>
                  </div>
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
                      <DropdownMenuItem onClick={() => openStudentProfile(student)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      {student.resumeUrl && (
                        <DropdownMenuItem onClick={() => downloadResume(student)}>
                          <FileText className="mr-2 h-4 w-4" />
                          Download Resume
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {student.verificationStatus !== "verified" && (
                        <DropdownMenuItem onClick={() => handleVerifyStudent(student)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Verify Student
                        </DropdownMenuItem>
                      )}
                      {student.verificationStatus !== "rejected" && (
                        <DropdownMenuItem onClick={() => handleRejectStudent(student)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Verification
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Student
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {students.length} students
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Student Profile Panel */}
      <Sheet open={showProfilePanel} onOpenChange={setShowProfilePanel}>
        <SheetContent className="w-[600px] sm:w-[540px]">
          {selectedStudent && (
            <>
              <SheetHeader>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                    <AvatarFallback>
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedStudent.name}</SheetTitle>
                    <SheetDescription>{selectedStudent.email}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="certification">Certification</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Student ID</Label>
                          <p className="text-sm text-muted-foreground">{selectedStudent.id}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Join Date</Label>
                          <p className="text-sm text-muted-foreground">{selectedStudent.joinDate}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Phone</Label>
                          <p className="text-sm text-muted-foreground">{selectedStudent.phone || 'Not provided'}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Location</Label>
                          <p className="text-sm text-muted-foreground">{selectedStudent.location}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Bio</Label>
                        <p className="text-sm text-muted-foreground">{selectedStudent.bio || 'No bio provided'}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Institution</Label>
                          <p className="text-sm text-muted-foreground">{selectedStudent.college}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Field of Study</Label>
                          <p className="text-sm text-muted-foreground">{selectedStudent.field}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Kaizen Score</Label>
                          <div className="flex items-center space-x-2">
                            <Progress value={selectedStudent.kaizenScore} className="flex-1" />
                            <span className="text-sm font-medium">{selectedStudent.kaizenScore}/100</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Courses Enrolled</Label>
                          <p className="text-sm text-muted-foreground">{selectedStudent.coursesEnrolled} courses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                  {selectedStudent.assignments && selectedStudent.assignments.length > 0 ? (
                    <div className="space-y-3">
                      {selectedStudent.assignments.map((assignment) => (
                        <Card key={assignment.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">Week {assignment.week}</span>
                                  <Badge variant={assignment.status === 'approved' ? 'default' : assignment.status === 'pending' ? 'secondary' : 'destructive'}>
                                    {assignment.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{assignment.title}</p>
                                <p className="text-xs text-muted-foreground">Submitted: {assignment.submittedAt}</p>
                              </div>
                              <div className="text-right space-y-1">
                                <div className="text-lg font-bold">{assignment.score}/100</div>
                                <Button size="sm" variant="outline">
                                  <FileText className="h-3 w-3 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                            {assignment.comments && (
                              <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                <strong>Comments:</strong> {assignment.comments}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No assignments submitted yet
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="certification" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Certification Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedStudent.certifications && selectedStudent.certifications.length > 0 ? (
                        <div className="space-y-3">
                          {selectedStudent.certifications.map((cert) => (
                            <div key={cert.id} className="flex items-center justify-between p-3 border rounded">
                              <div className="space-y-1">
                                <div className="font-medium">{cert.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Issued: {cert.issuedAt} • Score: {cert.score}/100
                                </div>
                              </div>
                              <Button size="sm">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No certifications issued yet
                          <div className="mt-4">
                            <Button disabled={selectedStudent.kaizenScore < 75}>
                              <Award className="h-4 w-4 mr-2" />
                              Issue Certificate
                            </Button>
                            {selectedStudent.kaizenScore < 75 && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Score must be ≥75 to issue certificate
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Verification Confirmation Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to verify {selectedStudent?.name}? This action will grant them full access to platform features.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmVerification}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Verification</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedStudent?.name}&apos;s verification.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason for rejection</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
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
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}