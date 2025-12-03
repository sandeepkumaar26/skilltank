"use client"

import * as React from "react"
import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Plus,
  ChevronDown,
  MoreVertical,
  Briefcase,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Eye,
  Edit,
  Trash2,
  RefreshCw
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KPICard } from "@/components/ui/kpi-card"

interface JobPosting {
  id: string
  title: string
  company: string
  type: string
  typeColor: string
  typeTextColor: string
  location: string
  salary: string
  applicants: string
  status: string
  statusColor: string
  statusTextColor: string
  deadline: string
  skills: string[]
}

const jobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Software Engineer Intern",
    company: "TechCorp Inc.",
    type: "Internship",
    typeColor: "#63cce1",
    typeTextColor: "#0a4561",
    location: "San Francisco",
    salary: "30000",
    applicants: "45",
    status: "Pending Review",
    statusColor: "#dfe163",
    statusTextColor: "#686714",
    deadline: "21-11-2025",
    skills: ["React", "Javascript", "Node.js"],
  },
  {
    id: "2",
    title: "Fullstack developer intern",
    company: "StartupX",
    type: "Fulltime",
    typeColor: "#31d74a",
    typeTextColor: "#416317",
    location: "New York",
    salary: "45000",
    applicants: "50",
    status: "Approved",
    statusColor: "#74e163",
    statusTextColor: "#114e23",
    deadline: "27-11-2025",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: "Innovate Lab",
    type: "Part Time",
    typeColor: "#ccd731",
    typeTextColor: "#594f07",
    location: "Chicago",
    salary: "50000",
    applicants: "60",
    status: "Rejected",
    statusColor: "#e16363",
    statusTextColor: "#6d0707",
    deadline: "19-11-2025",
    skills: ["SQL", "Python", "AI/ML"],
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [headerSearchTerm, setHeaderSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  // Filter jobs based on search and filters
  const filteredJobs = jobPostings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesType =
      typeFilter === "all" ||
      job.type.toLowerCase() === typeFilter.toLowerCase()

    const matchesStatus =
      statusFilter === "all" ||
      job.status.toLowerCase().includes(statusFilter.toLowerCase())

    return matchesSearch && matchesType && matchesStatus
  })

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(filteredJobs.map((job) => job.id))
    }
    setSelectAll(!selectAll)
  }

  // Handle individual job selection
  const handleSelectJob = (jobId: string) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId))
    } else {
      setSelectedJobs([...selectedJobs, jobId])
    }
  }

  // Handle export
  const handleExport = () => {
    console.log("Exporting jobs:", selectedJobs.length > 0 ? selectedJobs : "all")
    alert(
      `Exporting ${selectedJobs.length > 0 ? selectedJobs.length : filteredJobs.length} job(s)`
    )
  }

  // Handle post new job
  const handlePostNewJob = () => {
    console.log("Opening post new job form")
    alert("Post New Job form would open here")
  }

  // Handle refresh
  const handleRefresh = () => {
    console.log("Refreshing job listings")
    alert("Refreshing job listings...")
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen -m-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs & Internships</h1>
          <p className="text-white/90 mt-1">
            Manage job postings and internship opportunities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-white text-[#034078] hover:bg-gray-100 border-white" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Jobs
          </Button>
          <Button className="bg-white text-[#034078] hover:bg-gray-100" onClick={handlePostNewJob}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Jobs Posted"
          value={jobPostings.length}
          change={{ value: 12, type: "increase", period: "MTD" }}
          icon={<Briefcase className="h-4 w-4" />}
        />
        <KPICard
          title="Total Applicants"
          value={jobPostings.reduce((sum, job) => sum + parseInt(job.applicants), 0)}
          change={{ value: 8, type: "increase", period: "MTD" }}
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Pending Review"
          value={jobPostings.filter(job => job.status.includes("Pending")).length}
          change={{ value: 0, type: "neutral", period: "Same" }}
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Approved Jobs"
          value={jobPostings.filter(job => job.status === "Approved").length}
          change={{ value: 15, type: "increase", period: "MTD" }}
          icon={<CheckCircle className="h-4 w-4" />}
        />
      </div>

      {/* Filters */}
      <Card className="border-2 border-white shadow-lg bg-[#112351]/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search jobs by title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-900"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-900"
            >
              <option value="all">All Types</option>
              <option value="internship">Internship</option>
              <option value="fulltime">Full-time</option>
              <option value="part time">Part-time</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-900"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button variant="outline" className="border-2 border-white bg-white text-gray-900 hover:bg-gray-100">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <Card className="border-2 border-white shadow-lg bg-[#112351]/90 backdrop-blur-sm">
        <CardHeader className="bg-[#112351]/95 backdrop-blur-sm border-b-2 border-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Job Listings</CardTitle>
              <CardDescription className="text-white/80">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-2 border-white bg-white text-gray-900 hover:bg-gray-100"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 bg-[#112351]/95 backdrop-blur-sm p-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-lg bg-blue-900/40 border-2 border-white hover:shadow-xl hover:bg-blue-900/60 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Building2 className="h-4 w-4" />
                          <span>{job.company}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} className="bg-indigo-600 text-white border-2 border-indigo-400 hover:bg-indigo-700 hover:scale-105 transition-all font-semibold">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <DollarSign className="h-4 w-4" />
                        <span>${job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <Users className="h-4 w-4" />
                        <span>{job.applicants} applicants</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="h-4 w-4" />
                        <span>{job.deadline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex gap-2">
                      <Badge 
                        className="text-xs font-semibold border-2"
                        style={{ 
                          backgroundColor: job.typeColor,
                          color: '#ffffff',
                          borderColor: job.typeColor
                        }}
                      >
                        {job.type}
                      </Badge>
                      <Badge 
                        className="text-xs font-semibold border-2"
                        style={{ 
                          backgroundColor: job.statusColor,
                          color: '#ffffff',
                          borderColor: job.statusColor
                        }}
                      >
                        {job.status}
                      </Badge>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 border-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 border-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 border-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-white/50 mx-auto mb-4" />
              <p className="text-white text-lg">No jobs found matching your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}