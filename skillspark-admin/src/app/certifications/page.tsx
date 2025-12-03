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
  Award,
  Star,
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Send,
  Mail,
  Printer,
  ExternalLink,
  Share,
  Zap,
  TrendingUp,
  Users,
  BarChart3,
  Info,
  Plus,
  Crown
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface KaizenCertification {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  studentAvatar?: string
  certificationLevel: "bronze" | "silver" | "gold" | "platinum"
  specialization: string
  issuedDate: string
  expiryDate: string
  status: "pending" | "issued" | "revoked" | "expired"
  kaizenScore: number
  completedCourses: number
  totalCourses: number
  assignmentAverage: number
  certificateNumber: string
  issueReason?: string
  revokeReason?: string
  verificationCode: string
  downloadCount: number
  lastDownloaded?: string
  isPubliclyVerifiable: boolean
  mentorApproval?: {
    mentorName: string
    approvedAt: string
    comments?: string
  }
  achievements?: string[]
  skillsValidated?: string[]
}

const mockCertifications: KaizenCertification[] = [
  {
    id: "CERT001",
    studentId: "STU001234",
    studentName: "John Smith",
    studentEmail: "john.smith@mit.edu",
    studentAvatar: "/avatars/01.png",
    certificationLevel: "gold",
    specialization: "Full Stack Development",
    issuedDate: "2024-01-25",
    expiryDate: "2025-01-25",
    status: "issued",
    kaizenScore: 92,
    completedCourses: 5,
    totalCourses: 5,
    assignmentAverage: 88,
    certificateNumber: "KZ-FST-2024-001234",
    verificationCode: "VRF-891234",
    downloadCount: 3,
    lastDownloaded: "2024-01-30",
    isPubliclyVerifiable: true,
    mentorApproval: {
      mentorName: "Dr. Sarah Wilson",
      approvedAt: "2024-01-24",
      comments: "Exceptional performance across all modules"
    },
    achievements: ["Top 10% Performer", "Perfect Attendance", "Peer Mentor"],
    skillsValidated: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"]
  },
  {
    id: "CERT002",
    studentId: "STU001235",
    studentName: "Sarah Johnson",
    studentEmail: "sarah.j@stanford.edu",
    studentAvatar: "/avatars/02.png",
    certificationLevel: "silver",
    specialization: "Data Science",
    issuedDate: "2024-01-20",
    expiryDate: "2025-01-20",
    status: "issued",
    kaizenScore: 85,
    completedCourses: 4,
    totalCourses: 4,
    assignmentAverage: 82,
    certificateNumber: "KZ-DS-2024-001235",
    verificationCode: "VRF-785642",
    downloadCount: 2,
    lastDownloaded: "2024-01-22",
    isPubliclyVerifiable: true,
    skillsValidated: ["Python", "Machine Learning", "SQL", "Statistics", "Pandas"]
  },
  {
    id: "CERT003",
    studentId: "STU001236",
    studentName: "Michael Chen",
    studentEmail: "m.chen@berkeley.edu",
    studentAvatar: "/avatars/03.png",
    certificationLevel: "bronze",
    specialization: "Frontend Development",
    issuedDate: "2024-01-15",
    expiryDate: "2025-01-15",
    status: "issued",
    kaizenScore: 78,
    completedCourses: 3,
    totalCourses: 3,
    assignmentAverage: 75,
    certificateNumber: "KZ-FE-2024-001236",
    verificationCode: "VRF-234567",
    downloadCount: 1,
    lastDownloaded: "2024-01-16",
    isPubliclyVerifiable: true,
    skillsValidated: ["JavaScript", "React", "CSS", "HTML", "Git"]
  },
  {
    id: "CERT004",
    studentId: "STU001237",
    studentName: "Emily Davis",
    studentEmail: "emily.d@harvard.edu",
    studentAvatar: "/avatars/04.png",
    certificationLevel: "platinum",
    specialization: "AI & Machine Learning",
    issuedDate: "2024-02-01",
    expiryDate: "2025-02-01",
    status: "pending",
    kaizenScore: 96,
    completedCourses: 6,
    totalCourses: 6,
    assignmentAverage: 94,
    certificateNumber: "KZ-AI-2024-001237",
    verificationCode: "VRF-961234",
    downloadCount: 0,
    isPubliclyVerifiable: true,
    achievements: ["Highest Scorer", "Research Project Winner", "Community Leader"],
    skillsValidated: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "NLP", "Computer Vision"]
  },
  {
    id: "CERT005",
    studentId: "STU001238",
    studentName: "David Wilson",
    studentEmail: "d.wilson@cmu.edu",
    studentAvatar: "/avatars/05.png",
    certificationLevel: "gold",
    specialization: "DevOps Engineering",
    issuedDate: "2024-01-18",
    expiryDate: "2025-01-18",
    status: "revoked",
    kaizenScore: 89,
    completedCourses: 4,
    totalCourses: 5,
    assignmentAverage: 85,
    certificateNumber: "KZ-DO-2024-001238",
    verificationCode: "VRF-789012",
    revokeReason: "Academic misconduct discovered in final project",
    downloadCount: 2,
    isPubliclyVerifiable: false,
    skillsValidated: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"]
  }
]

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState(mockCertifications)
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [specializationFilter, setSpecializationFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCertification, setSelectedCertification] = useState<KaizenCertification | null>(null)
  const [showCertificatePanel, setShowCertificatePanel] = useState(false)
  const [showIssueDialog, setShowIssueDialog] = useState(false)
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false)
  const [showBulkIssueDialog, setShowBulkIssueDialog] = useState(false)
  const [revokeReason, setRevokeReason] = useState("")
  const [issueReason, setIssueReason] = useState("")

  const getFilteredCertifications = (tab: string) => {
    return certifications.filter(cert => {
      const matchesSearch = cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || cert.status === statusFilter
      const matchesLevel = levelFilter === "all" || cert.certificationLevel === levelFilter
      const matchesSpecialization = specializationFilter === "all" || cert.specialization === specializationFilter
      const matchesTab = tab === "all" || cert.status === tab
      
      return matchesSearch && matchesStatus && matchesLevel && matchesSpecialization && matchesTab
    })
  }

  const filteredCertifications = getFilteredCertifications(activeTab)

  const handleSelectAll = () => {
    if (selectedCertifications.length === filteredCertifications.length) {
      setSelectedCertifications([])
    } else {
      setSelectedCertifications(filteredCertifications.map(c => c.id))
    }
  }

  const handleSelectCertification = (certId: string) => {
    setSelectedCertifications(prev =>
      prev.includes(certId)
        ? prev.filter(id => id !== certId)
        : [...prev, certId]
    )
  }

  const handleViewCertificate = (certification: KaizenCertification) => {
    setSelectedCertification(certification)
    setShowCertificatePanel(true)
  }

  const handleIssueCertificate = (certification: KaizenCertification) => {
    setSelectedCertification(certification)
    setShowIssueDialog(true)
  }

  const handleRevokeCertificate = (certification: KaizenCertification) => {
    setSelectedCertification(certification)
    setShowRevokeDialog(true)
  }

  const handleRegenerateCertificate = (certification: KaizenCertification) => {
    setSelectedCertification(certification)
    setShowRegenerateDialog(true)
  }

  const confirmIssuance = () => {
    if (selectedCertification && issueReason.trim()) {
      setCertifications(prev => prev.map(c => 
        c.id === selectedCertification.id 
          ? { 
              ...c, 
              status: "issued" as const,
              issuedDate: new Date().toISOString().split('T')[0],
              issueReason: issueReason
            }
          : c
      ))
      setShowIssueDialog(false)
      setIssueReason("")
      // Show toast: "Certificate issued successfully"
    }
  }

  const confirmRevocation = () => {
    if (selectedCertification && revokeReason.trim()) {
      setCertifications(prev => prev.map(c => 
        c.id === selectedCertification.id 
          ? { 
              ...c, 
              status: "revoked" as const,
              revokeReason: revokeReason,
              isPubliclyVerifiable: false
            }
          : c
      ))
      setShowRevokeDialog(false)
      setRevokeReason("")
      // Show toast: "Certificate revoked"
    }
  }

  const confirmRegeneration = () => {
    if (selectedCertification) {
      setCertifications(prev => prev.map(c => 
        c.id === selectedCertification.id 
          ? { 
              ...c, 
              verificationCode: "VRF-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
              downloadCount: 0,
              lastDownloaded: undefined
            }
          : c
      ))
      setShowRegenerateDialog(false)
      // Show toast: "Certificate regenerated with new verification code"
    }
  }

  const downloadCertificate = (certification: KaizenCertification) => {
    // Simulate download
    setCertifications(prev => prev.map(c => 
      c.id === certification.id 
        ? { 
            ...c, 
            downloadCount: c.downloadCount + 1,
            lastDownloaded: new Date().toISOString().split('T')[0]
          }
        : c
    ))
    console.log('Downloading certificate for:', certification.studentName)
    // Show toast: "Certificate downloaded"
  }

  const sendCertificateEmail = (certification: KaizenCertification) => {
    console.log('Sending certificate email to:', certification.studentEmail)
    // Show toast: "Certificate sent via email"
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "bronze":
        return <Badge className="bg-amber-100 text-amber-800">Bronze</Badge>
      case "silver":
        return <Badge className="bg-gray-100 text-gray-800">Silver</Badge>
      case "gold":
        return <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>
      case "platinum":
        return <Badge className="bg-purple-100 text-purple-800">Platinum</Badge>
      default:
        return null
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "bronze":
        return <Award className="h-4 w-4 text-amber-600" />
      case "silver":
        return <Award className="h-4 w-4 text-gray-600" />
      case "gold":
        return <Award className="h-4 w-4 text-yellow-600" />
      case "platinum":
        return <Crown className="h-4 w-4 text-purple-600" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>
      case "issued":
        return <Badge className="bg-green-100 text-green-800">Issued</Badge>
      case "revoked":
        return <Badge className="bg-red-100 text-red-800">Revoked</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "issued":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "revoked":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const pendingCount = certifications.filter(c => c.status === "pending").length
  const issuedCount = certifications.filter(c => c.status === "issued").length
  const revokedCount = certifications.filter(c => c.status === "revoked").length
  const expiredCount = certifications.filter(c => c.status === "expired").length

  const specializations = Array.from(new Set(certifications.map(c => c.specialization)))

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            Kaizen Certifications
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 ml-2 text-white/80" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-gray-900">
                <div className="max-w-xs space-y-1">
                  <p className="font-medium">Digital Certification System</p>
                  <p className="text-xs">Manage student Kaizen certifications and skill validation</p>
                  <p className="text-xs text-gray-600">Certificates verify completed learning paths</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="text-white/90">
            Issue, manage, and track Kaizen skill certifications for students
          </p>
        </div>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="bg-white text-blue-700 hover:bg-gray-100 border-white">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download certification analytics report</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                disabled={selectedCertifications.length === 0}
                onClick={() => setShowBulkIssueDialog(true)}
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                <Award className="mr-2 h-4 w-4" />
                Bulk Issue ({selectedCertifications.length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Issue certificates for selected pending applications</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Certifications</CardTitle>
            <Award className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{certifications.length}</div>
            <p className="text-xs text-white/80">All time issued</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Active Certificates</CardTitle>
            <CheckCircle className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{issuedCount}</div>
            <p className="text-xs text-white/80">Currently valid</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Pending Approval</CardTitle>
            <Clock className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{pendingCount}</div>
            <p className="text-xs text-white/80">Awaiting review</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-500 to-purple-600 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Success Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {Math.round((issuedCount / (certifications.length - pendingCount)) * 100)}%
            </div>
            <p className="text-xs text-white/80">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-blue-800/90 backdrop-blur-sm p-1 h-auto border-2 border-white/30">
          <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <Award className="h-4 w-4" />
              <span>All ({certifications.length})</span>
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
          <TabsTrigger value="issued" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <CheckCircle className="h-4 w-4" />
              <span>Issued ({issuedCount})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="revoked" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-700 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <XCircle className="h-4 w-4" />
              <span>Revoked ({revokedCount})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="expired" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-gray-700 data-[state=active]:text-white">
            <div className="flex items-center gap-2 py-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Expired ({expiredCount})</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Filters and Search */}
          <Card className="bg-blue-800/70 backdrop-blur-sm border-2 border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by student name, email, certificate number, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[150px] bg-white border-2 border-gray-300 text-gray-900">
                    <Award className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
                <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                  <SelectTrigger className="w-[200px] bg-white border-2 border-gray-300 text-gray-900">
                    <Star className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] bg-white border-2 border-gray-300 text-gray-900">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="issued">Issued</SelectItem>
                    <SelectItem value="revoked">Revoked</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedCertifications.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">
                      {selectedCertifications.length} certification(s) selected
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0" onClick={() => setShowBulkIssueDialog(true)}>
                      <Award className="mr-1 h-3 w-3" />
                      Bulk Issue
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      <Mail className="mr-1 h-3 w-3" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certifications Table */}
          <Card className="bg-blue-800/70 backdrop-blur-sm border-2 border-white/30 shadow-lg">
            <div className="rounded-md">
            <Table>
              <TableHeader className="bg-blue-700/40">
                <TableRow className="border-b-2 border-white/30 hover:bg-transparent">
                  <TableHead className="w-12 text-white">
                    <Checkbox
                      checked={selectedCertifications.length === filteredCertifications.length && filteredCertifications.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="border-white"
                    />
                  </TableHead>
                  <TableHead className="text-white font-semibold">Student</TableHead>
                  <TableHead className="text-white font-semibold">Certification</TableHead>
                  <TableHead className="text-white font-semibold">Level</TableHead>
                  <TableHead className="text-white font-semibold">Kaizen Score</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                  <TableHead className="text-white font-semibold">Issued Date</TableHead>
                  <TableHead className="text-white font-semibold">Downloads</TableHead>
                  <TableHead className="text-white font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertifications.map((certification) => (
                  <TableRow 
                    key={certification.id}
                    className="transition-colors hover:bg-blue-700/40 bg-blue-800/30 text-white border-b border-white/20"
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedCertifications.includes(certification.id)}
                        onCheckedChange={() => handleSelectCertification(certification.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={certification.studentAvatar} alt={certification.studentName} />
                          <AvatarFallback>
                            {certification.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{certification.studentName}</div>
                          <div className="text-sm text-blue-200">{certification.studentEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div 
                        className="cursor-pointer hover:bg-blue-700/30 p-1 rounded"
                        onClick={() => handleViewCertificate(certification)}
                      >
                        <div className="font-medium text-white hover:text-blue-200">
                          {certification.specialization}
                        </div>
                        <div className="text-sm text-blue-200">
                          {certification.certificateNumber}
                        </div>
                        <div className="text-xs text-blue-300">
                          Verification: {certification.verificationCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            {getLevelIcon(certification.certificationLevel)}
                            {getLevelBadge(certification.certificationLevel)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {certification.certificationLevel === "bronze" && "75-79% Kaizen Score"}
                            {certification.certificationLevel === "silver" && "80-89% Kaizen Score"}
                            {certification.certificationLevel === "gold" && "90-95% Kaizen Score"}
                            {certification.certificationLevel === "platinum" && "96%+ Kaizen Score"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-white">{certification.kaizenScore}/100</div>
                            <Progress value={certification.kaizenScore} className="w-16 h-2" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p>Courses: {certification.completedCourses}/{certification.totalCourses}</p>
                            <p>Assignment Avg: {certification.assignmentAverage}%</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(certification.status)}
                            {getStatusBadge(certification.status)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {certification.status === "issued" && certification.isPubliclyVerifiable && (
                            <p>Publicly verifiable certificate</p>
                          )}
                          {certification.status === "revoked" && certification.revokeReason && (
                            <p>Revoked: {certification.revokeReason}</p>
                          )}
                          {certification.mentorApproval && (
                            <p>Approved by {certification.mentorApproval.mentorName}</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-white">
                        {certification.status === "issued" 
                          ? new Date(certification.issuedDate).toLocaleDateString()
                          : certification.status === "pending"
                          ? "Pending"
                          : "—"
                        }
                      </div>
                      {certification.status === "issued" && (
                        <div className="text-xs text-blue-200">
                          Expires: {new Date(certification.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="text-sm font-medium text-white">{certification.downloadCount}</div>
                        {certification.lastDownloaded && (
                          <div className="text-xs text-blue-200">
                            Last: {new Date(certification.lastDownloaded).toLocaleDateString()}
                          </div>
                        )}
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
                          <DropdownMenuItem onClick={() => handleViewCertificate(certification)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Certificate
                          </DropdownMenuItem>
                          {certification.status === "issued" && (
                            <>
                              <DropdownMenuItem onClick={() => downloadCertificate(certification)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => sendCertificateEmail(certification)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email Student
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          {certification.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleIssueCertificate(certification)}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Issue Certificate
                            </DropdownMenuItem>
                          )}
                          {certification.status === "issued" && (
                            <>
                              <DropdownMenuItem onClick={() => handleRegenerateCertificate(certification)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Regenerate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRevokeCertificate(certification)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Revoke Certificate
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Record
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
          <Card className="bg-blue-800/70 backdrop-blur-sm border-2 border-white/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white">
                  Showing <span className="font-semibold text-white">{filteredCertifications.length}</span> of <span className="font-semibold text-white">{certifications.length}</span> certifications
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled className="bg-blue-700/60 border-2 border-white/30 text-white/50">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-700/60 border-2 border-white/30 text-white hover:bg-blue-600/60">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Certificate Preview Panel */}
      <Sheet open={showCertificatePanel} onOpenChange={setShowCertificatePanel}>
        <SheetContent className="w-[800px] sm:w-[540px]">
          {selectedCertification && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="flex items-center space-x-2">
                      <span>{selectedCertification.specialization} Certification</span>
                      {getLevelIcon(selectedCertification.certificationLevel)}
                    </SheetTitle>
                    <SheetDescription>{selectedCertification.studentName}</SheetDescription>
                  </div>
                  {getStatusBadge(selectedCertification.status)}
                </div>
              </SheetHeader>

              <div className="space-y-6 py-6">
                {/* Certificate Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certificate Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          {getLevelIcon(selectedCertification.certificationLevel)}
                        </div>
                        <h3 className="text-xl font-bold">Kaizen Certification</h3>
                        <p className="text-lg">{selectedCertification.specialization}</p>
                        <p className="text-base">Awarded to</p>
                        <p className="text-2xl font-bold text-blue-600">{selectedCertification.studentName}</p>
                        <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
                          <div>Score: {selectedCertification.kaizenScore}/100</div>
                          <div>Level: {selectedCertification.certificationLevel.toUpperCase()}</div>
                        </div>
                        <p className="text-sm">Certificate #{selectedCertification.certificateNumber}</p>
                        <p className="text-xs text-muted-foreground">Verification Code: {selectedCertification.verificationCode}</p>
                      </div>
                    </div>
                    <div className="flex justify-center space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Printer className="h-3 w-3 mr-1" />
                        Print Preview
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => downloadCertificate(selectedCertification)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Student Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Kaizen Score</Label>
                        <div className="flex items-center space-x-2">
                          <Progress value={selectedCertification.kaizenScore} className="flex-1" />
                          <span className="text-sm font-medium">{selectedCertification.kaizenScore}/100</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Course Completion</Label>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={(selectedCertification.completedCourses / selectedCertification.totalCourses) * 100} 
                            className="flex-1" 
                          />
                          <span className="text-sm font-medium">
                            {selectedCertification.completedCourses}/{selectedCertification.totalCourses}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Assignment Average</Label>
                        <div className="flex items-center space-x-2">
                          <Progress value={selectedCertification.assignmentAverage} className="flex-1" />
                          <span className="text-sm font-medium">{selectedCertification.assignmentAverage}%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Download Count</Label>
                        <p className="text-sm text-muted-foreground">{selectedCertification.downloadCount} times</p>
                      </div>
                    </div>

                    {selectedCertification.skillsValidated && (
                      <div>
                        <Label className="text-sm font-medium">Skills Validated</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedCertification.skillsValidated.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCertification.achievements && (
                      <div>
                        <Label className="text-sm font-medium">Achievements</Label>
                        <div className="space-y-1 mt-1">
                          {selectedCertification.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Mentor Approval */}
                {selectedCertification.mentorApproval && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mentor Approval</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Approved by:</span>
                          <span className="text-sm">{selectedCertification.mentorApproval.mentorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Date:</span>
                          <span className="text-sm">{selectedCertification.mentorApproval.approvedAt}</span>
                        </div>
                        {selectedCertification.mentorApproval.comments && (
                          <div>
                            <span className="text-sm font-medium">Comments:</span>
                            <p className="text-sm text-muted-foreground mt-1">
                              {selectedCertification.mentorApproval.comments}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {selectedCertification.status === "pending" && (
                    <Button onClick={() => handleIssueCertificate(selectedCertification)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Issue Certificate
                    </Button>
                  )}
                  {selectedCertification.status === "issued" && (
                    <>
                      <Button variant="outline" onClick={() => downloadCertificate(selectedCertification)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" onClick={() => sendCertificateEmail(selectedCertification)}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email Student
                      </Button>
                      <Button variant="outline" onClick={() => handleRegenerateCertificate(selectedCertification)}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button variant="destructive" onClick={() => handleRevokeCertificate(selectedCertification)}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Revoke
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Issue Certificate Dialog */}
      <Dialog open={showIssueDialog} onOpenChange={setShowIssueDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Issue Certificate</DialogTitle>
            <DialogDescription>
              Confirm issuing the {selectedCertification?.specialization} certification to {selectedCertification?.studentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="issueReason">Reason for issuance (optional)</Label>
              <Textarea
                id="issueReason"
                placeholder="Enter any notes about this certification issuance..."
                value={issueReason}
                onChange={(e) => setIssueReason(e.target.value)}
                rows={3}
              />
            </div>
            {selectedCertification && (
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="text-sm space-y-1">
                  <div className="font-medium">Certification Details:</div>
                  <div>Level: {selectedCertification.certificationLevel.toUpperCase()}</div>
                  <div>Kaizen Score: {selectedCertification.kaizenScore}/100</div>
                  <div>Courses Completed: {selectedCertification.completedCourses}/{selectedCertification.totalCourses}</div>
                  <div>Assignment Average: {selectedCertification.assignmentAverage}%</div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowIssueDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmIssuance}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Issue Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Certificate Dialog */}
      <Dialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Revoke Certificate</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke {selectedCertification?.studentName}&apos;s certification? This action will invalidate their certificate and make it non-verifiable.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="revokeReason">Reason for revocation *</Label>
              <Textarea
                id="revokeReason"
                placeholder="Enter the reason for revoking this certificate..."
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                rows={3}
                required
              />
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Impact Warning</span>
              </div>
              <ul className="text-sm text-red-700 mt-2 space-y-1">
                <li>• Certificate will be marked as revoked</li>
                <li>• Public verification will fail</li>
                <li>• Student will be notified via email</li>
                <li>• This action can be reversed later</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRevokeDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmRevocation}
              disabled={!revokeReason.trim()}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Revoke Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Regenerate Certificate Dialog */}
      <Dialog open={showRegenerateDialog} onOpenChange={setShowRegenerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Regenerate Certificate</DialogTitle>
            <DialogDescription>
              This will generate a new verification code for {selectedCertification?.studentName}&apos;s certificate and reset the download count.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Important</span>
            </div>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Old verification code will become invalid</li>
              <li>• New certificate will have updated timestamp</li>
              <li>• Download count will reset to 0</li>
              <li>• Student will receive new certificate via email</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegenerateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRegeneration}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Issue Dialog */}
      <Dialog open={showBulkIssueDialog} onOpenChange={setShowBulkIssueDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Issue Certificates</DialogTitle>
            <DialogDescription>
              Issue certificates for {selectedCertifications.length} selected applications. Only pending certifications will be processed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <div className="text-sm space-y-1">
                <div className="font-medium">Selected Certifications:</div>
                {selectedCertifications.slice(0, 5).map(certId => {
                  const cert = certifications.find(c => c.id === certId)
                  return cert ? (
                    <div key={certId} className="text-muted-foreground">
                      • {cert.studentName} - {cert.specialization}
                    </div>
                  ) : null
                })}
                {selectedCertifications.length > 5 && (
                  <div className="text-muted-foreground">
                    • And {selectedCertifications.length - 5} more...
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkIssueDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Bulk issue logic here
              setShowBulkIssueDialog(false)
              setSelectedCertifications([])
            }}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Issue All Certificates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}