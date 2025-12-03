"use client"

import { useState } from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { 
  Users,
  Briefcase,
  UserCheck,
  Star,
  DollarSign,
  Calendar,
  Eye,
  Edit,
  X,
  Plus,
  Clock,
  TrendingUp,
  Target,
  Lightbulb,
  Phone,
  Search,
  Mail,
  UserPlus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data
const dashboardMetrics = {
  totalApplications: 245,
  internshipsPosted: 6,
  // coursesCreated removed
  hiresMade: 4,
  premiumStudentsViewed: 67,
  totalRevenue: 12000
}

const activeInternships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    postedOn: "15/01/2024",
    applications: 45,
    status: "Active",
    views: 234,
    type: "internship"
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    postedOn: "12/01/2024",
    applications: 32,
    status: "Active",
    views: 189,
    type: "internship"
  },
  {
    id: "3",
    title: "Backend Developer Intern",
    postedOn: "08/01/2024",
    applications: 28,
    status: "Closed",
    views: 156,
    type: "internship"
  }
]

// activeCourses removed

const actionSuggestions = [
  {
    id: "1",
    type: "warning",
    icon: Calendar,
    message: "You haven't posted in 2 weeks. Post a new internship?",
    action: "Post Internship"
  },
  {
    id: "2",
    type: "success",
      icon: TrendingUp,
      message: "Your last internship post is trending. Consider posting a follow-up.",
      action: "Post Internship"
  },
  {
    id: "3",
    type: "info",
    icon: Target,
    message: "30 students viewed your last post but didn't apply. Improve title?",
    action: "Edit Post"
  }
]

const upcomingInterviews = [
  {
    id: "1",
    studentName: "Arjun Sharma",
    interviewDate: "2024-01-25",
    interviewTime: "10:00 AM",
    internship: "Frontend Developer",
    status: "Scheduled"
  },
  {
    id: "2",
    studentName: "Priya Patel",
    interviewDate: "2024-01-25",
    interviewTime: "2:00 PM",
    internship: "UI/UX Designer",
    status: "Scheduled"
  },
  {
    id: "3",
    studentName: "Rahul Kumar",
    interviewDate: "2024-01-26",
    interviewTime: "11:00 AM",
    internship: "Backend Developer",
    status: "Pending"
  }
]

const recentApplications = [
  {
    id: "1",
    studentName: "Sneha Reddy",
    appliedFor: "Frontend Developer Intern",
    timeAgo: "2 minutes ago",
    avatar: "/avatars/sneha.jpg"
  },
  {
    id: "2",
    studentName: "Vikram Singh",
    appliedFor: "React Masterclass",
    timeAgo: "15 minutes ago",
    avatar: "/avatars/vikram.jpg"
  },
  {
    id: "3",
    studentName: "Ananya Gupta",
    appliedFor: "UI/UX Design Intern",
    timeAgo: "1 hour ago",
    avatar: "/avatars/ananya.jpg"
  },
  {
    id: "4",
    studentName: "Karthik Nair",
    appliedFor: "Python for Beginners",
    timeAgo: "2 hours ago",
    avatar: "/avatars/karthik.jpg"
  },
  {
    id: "5",
    studentName: "Meera Joshi",
    appliedFor: "Backend Developer Intern",
    timeAgo: "3 hours ago",
    avatar: "/avatars/meera.jpg"
  }
]

const weeklyData = [
  { day: "Mon", applications: 12 },
  { day: "Tue", applications: 19 },
  { day: "Wed", applications: 15 },
  { day: "Thu", applications: 22 },
  { day: "Fri", applications: 18 },
  { day: "Sat", applications: 8 },
  { day: "Sun", applications: 5 }
]

const topPremiumStudents = [
  { name: "Arjun S.", score: 94, domain: "Web Dev" },
  { name: "Priya P.", score: 92, domain: "UI/UX" },
  { name: "Rahul K.", score: 89, domain: "ML" }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("internships")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800"
      case "closed": return "bg-red-100 text-red-800"
      case "draft": return "bg-yellow-100 text-yellow-800"
      case "scheduled": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case "warning": return "border-yellow-200 bg-yellow-50"
      case "success": return "border-green-200 bg-green-50"
      case "info": return "border-blue-200 bg-blue-50"
      default: return "border-gray-200 bg-gray-50"
    }
  }

  const getSuggestionIconColor = (type: string) => {
    switch (type) {
      case "warning": return "text-yellow-600"
      case "success": return "text-green-600"
      case "info": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your internships.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-white border-gray-300 text-black hover:bg-gray-50">
            <Plus className="h-4 w-4 mr-2" />
            Post Internship
          </Button>
          {/* Create Course removed */}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalApplications}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Internships Posted</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.internshipsPosted}</div>
            <p className="text-xs text-muted-foreground">2 active, 4 closed</p>
          </CardContent>
        </Card>
        
        {/* Courses Created card removed */}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hires Made</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.hiresMade}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Students</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.premiumStudentsViewed}</div>
            <p className="text-xs text-muted-foreground">Viewed this week</p>
          </CardContent>
        </Card>
        
        {/* Course Revenue card removed */}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Postings */}
          <Card>
            <CardHeader>
              <CardTitle>Active Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="internships" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Internships
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="internships" className="space-y-4">
                  {activeInternships.map((internship) => (
                    <div key={internship.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{internship.title}</h3>
                        <Badge className={getStatusColor(internship.status)}>
                          {internship.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {internship.postedOn}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {internship.applications} applications
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {internship.views} views
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {internship.status === "Active" && (
                          <Button size="sm" variant="outline">
                            <X className="h-3 w-3 mr-1" />
                            Close
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                {/* Courses tab removed */}
              </Tabs>
            </CardContent>
          </Card>

          {/* Action Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Action Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {actionSuggestions.map((suggestion) => {
                const IconComponent = suggestion.icon
                return (
                  <div 
                    key={suggestion.id} 
                    className={`border rounded-lg p-4 ${getSuggestionColor(suggestion.type)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`h-5 w-5 ${getSuggestionIconColor(suggestion.type)}`} />
                        <span className="text-sm">{suggestion.message}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.studentName}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(interview.interviewDate).toLocaleDateString()}</div>
                          <div className="text-muted-foreground">{interview.interviewTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>{interview.internship}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={application.avatar} />
                      <AvatarFallback>
                        {application.studentName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{application.studentName}</div>
                      <div className="text-xs text-muted-foreground">{application.appliedFor}</div>
                      <div className="text-xs text-muted-foreground">{application.timeAgo}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Search className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <UserPlus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>



          {/* Top Premium Students */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Premium Students
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPremiumStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-sm font-medium text-yellow-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{student.name}</div>
                      <div className="text-xs text-muted-foreground">{student.domain}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">{student.score}%</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-white border border-gray-300 text-black hover:bg-gray-50" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Post New Internship
              </Button>
              {/* Create New Course quick action removed */}
              <Button className="w-full justify-start" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                View Hiring
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}