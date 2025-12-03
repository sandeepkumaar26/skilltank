"use client"

import * as React from "react"
import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Briefcase,
  DollarSign,
  Award,
  BookOpen,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  RefreshCw,
  Eye,
  Settings,
  Share,
  FileSpreadsheet,
  TrendingDown as TrendDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MapPin,
  GraduationCap,
  Star,
  Timer,
  Calendar as CalendarIcon
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KPICard } from "@/components/ui/kpi-card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Comprehensive analytics data structures
interface MetricData {
  period: string
  value: number
  change?: number
  changeType?: "increase" | "decrease" | "neutral"
}

interface ChartData {
  label: string
  value: number
  percentage?: number
  color?: string
  trend?: "up" | "down" | "stable"
}

interface RevenueBreakdown {
  source: string
  amount: number
  percentage: number
  growth: number
}

interface CourseAnalytics {
  id: string
  name: string
  enrolled: number
  completed: number
  dropped: number
  avgScore: number
  revenue: number
  satisfaction: number
  instructor: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  completionRate: number
  engagementScore: number
}

// Enhanced mock data for comprehensive analytics
const analyticsData = {
  overview: {
    totalStudents: 12547,
    totalCompanies: 387,
    totalRevenue: 1547892,
    totalCourses: 45,
    avgCompletionRate: 78.3,
    avgSatisfactionScore: 4.7,
    totalPlacements: 1089,
    growthRate: 12.5
  },
  
  userGrowth: [
    { period: "Jan 2024", students: 8420, companies: 245, verified: 7156, active: 6834 },
    { period: "Feb 2024", students: 9180, companies: 267, verified: 7892, active: 7456 },
    { period: "Mar 2024", students: 9890, companies: 289, verified: 8567, active: 8123 },
    { period: "Apr 2024", students: 10650, companies: 315, verified: 9234, active: 8789 },
    { period: "May 2024", students: 11420, companies: 342, verified: 9987, active: 9456 },
    { period: "Jun 2024", students: 12547, companies: 387, verified: 10891, active: 10234 }
  ],

  revenueBreakdown: [
    { source: "Course Enrollments", amount: 892450, percentage: 57.6, growth: 15.3 },
    { source: "Certification Fees", amount: 234580, percentage: 15.2, growth: 8.7 },
    { source: "Premium Subscriptions", amount: 198320, percentage: 12.8, growth: 22.1 },
    { source: "Corporate Training", amount: 156780, percentage: 10.1, growth: 31.5 },
    { source: "Job Placement Fees", amount: 65762, percentage: 4.3, growth: 19.8 }
  ],

  monthlyRevenue: [
    { month: "Jan", amount: 198420, target: 180000, courseFees: 125000, certFees: 35000, premiums: 28420, corporate: 10000 },
    { month: "Feb", amount: 234580, target: 220000, courseFees: 148000, certFees: 42000, premiums: 32580, corporate: 12000 },
    { month: "Mar", amount: 267890, target: 250000, courseFees: 165000, certFees: 48000, premiums: 38890, corporate: 16000 },
    { month: "Apr", amount: 289450, target: 275000, courseFees: 178000, certFees: 52000, premiums: 41450, corporate: 18000 },
    { month: "May", amount: 312670, target: 300000, courseFees: 192000, certFees: 58000, premiums: 44670, corporate: 18000 },
    { month: "Jun", amount: 344882, target: 325000, courseFees: 210000, certFees: 65000, premiums: 47882, corporate: 22000 }
  ],

  courseAnalytics: [
    {
      id: "CS001",
      name: "Advanced JavaScript & React",
      enrolled: 1245,
      completed: 987,
      dropped: 156,
      avgScore: 87.3,
      revenue: 186750,
      satisfaction: 4.8,
      instructor: "Sarah Wilson",
      category: "Frontend",
      difficulty: "intermediate" as const,
      completionRate: 79.3,
      engagementScore: 92
    },
    {
      id: "CS002", 
      name: "Python Data Science Bootcamp",
      enrolled: 1089,
      completed: 823,
      dropped: 134,
      avgScore: 83.7,
      revenue: 163350,
      satisfaction: 4.6,
      instructor: "Dr. Michael Chen",
      category: "Data Science",
      difficulty: "advanced" as const,
      completionRate: 75.6,
      engagementScore: 89
    },
    {
      id: "CS003",
      name: "Full-Stack Web Development",
      enrolled: 987,
      completed: 756,
      dropped: 98,
      avgScore: 85.2,
      revenue: 148050,
      satisfaction: 4.7,
      instructor: "Emily Rodriguez",
      category: "Full-Stack",
      difficulty: "intermediate" as const,
      completionRate: 76.6,
      engagementScore: 88
    },
    {
      id: "CS004",
      name: "Machine Learning Fundamentals",
      enrolled: 743,
      completed: 534,
      dropped: 87,
      avgScore: 81.9,
      revenue: 111450,
      satisfaction: 4.5,
      instructor: "Prof. David Kim",
      category: "AI/ML",
      difficulty: "advanced" as const,
      completionRate: 71.9,
      engagementScore: 86
    },
    {
      id: "CS005",
      name: "Mobile App Development",
      enrolled: 623,
      completed: 445,
      dropped: 76,
      avgScore: 84.1,
      revenue: 93450,
      satisfaction: 4.4,
      instructor: "Alex Thompson",
      category: "Mobile",
      difficulty: "intermediate" as const,
      completionRate: 71.4,
      engagementScore: 84
    }
  ],

  geographicData: [
    { state: "California", students: 2847, companies: 156, revenue: 426850, growth: 18.3 },
    { state: "New York", students: 1923, companies: 98, revenue: 288450, growth: 14.7 },
    { state: "Texas", students: 1567, companies: 76, revenue: 235050, growth: 22.1 },
    { state: "Florida", students: 1234, companies: 67, revenue: 185100, growth: 16.8 },
    { state: "Washington", students: 1089, companies: 54, revenue: 163350, growth: 19.5 },
    { state: "Illinois", students: 892, companies: 43, revenue: 133800, growth: 12.3 },
    { state: "Massachusetts", students: 756, companies: 38, revenue: 113400, growth: 15.9 },
    { state: "Others", students: 2239, companies: 91, revenue: 335850, growth: 13.7 }
  ],

  performanceMetrics: {
    studentEngagement: { current: 87.3, target: 85, trend: "up" },
    courseCompletion: { current: 78.3, target: 75, trend: "up" },
    jobPlacement: { current: 84.7, target: 80, trend: "up" },
    instructorRating: { current: 4.7, target: 4.5, trend: "up" },
    platformUptime: { current: 99.8, target: 99.5, trend: "stable" },
    supportResponse: { current: 2.1, target: 2.0, trend: "down" } // hours
  },

  demographics: {
    ageGroups: [
      { range: "18-24", count: 4218, percentage: 33.6 },
      { range: "25-30", count: 3764, percentage: 30.0 },
      { range: "31-35", count: 2509, percentage: 20.0 },
      { range: "36-40", count: 1254, percentage: 10.0 },
      { range: "40+", count: 802, percentage: 6.4 }
    ],
    education: [
      { level: "Bachelor's", count: 6273, percentage: 50.0 },
      { level: "Master's", count: 3764, percentage: 30.0 },
      { level: "High School", count: 1505, percentage: 12.0 },
      { level: "PhD", count: 627, percentage: 5.0 },
      { level: "Associate", count: 378, percentage: 3.0 }
    ],
    experience: [
      { level: "Beginner (0-1 years)", count: 5019, percentage: 40.0 },
      { level: "Intermediate (2-4 years)", count: 3764, percentage: 30.0 },
      { level: "Advanced (5-7 years)", count: 2509, percentage: 20.0 },
      { level: "Expert (8+ years)", count: 1255, percentage: 10.0 }
    ]
  },

  trends: {
    weeklyActivity: [
      { day: "Mon", active: 8234, assignments: 1245, completions: 287 },
      { day: "Tue", active: 9123, assignments: 1567, completions: 334 },
      { day: "Wed", active: 9567, assignments: 1789, completions: 389 },
      { day: "Thu", active: 8934, assignments: 1634, completions: 356 },
      { day: "Fri", active: 7845, assignments: 1345, completions: 298 },
      { day: "Sat", active: 6234, assignments: 987, completions: 234 },
      { day: "Sun", active: 5678, assignments: 756, completions: 198 }
    ],
    topSkills: [
      { skill: "JavaScript", mentions: 3247, growth: 18.5 },
      { skill: "Python", mentions: 2934, growth: 22.1 },
      { skill: "React", mentions: 2456, growth: 15.7 },
      { skill: "SQL", mentions: 2123, growth: 12.3 },
      { skill: "Node.js", mentions: 1876, growth: 16.8 },
      { skill: "Machine Learning", mentions: 1567, growth: 28.9 },
      { skill: "AWS", mentions: 1345, growth: 24.2 },
      { skill: "TypeScript", mentions: 1234, growth: 31.5 }
    ]
  }
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<CourseAnalytics | null>(null)

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-600" />
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-600" />
      case "stable":
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      case "stable":
        return "text-gray-600"
    }
  }

  const getDifficultyBadge = (difficulty: "beginner" | "intermediate" | "advanced") => {
    switch (difficulty) {
      case "beginner":
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>
      case "intermediate":
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>
      case "advanced":
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const exportReport = (format: "pdf" | "excel" | "csv") => {
    // Simulate export
    console.log(`Exporting analytics report as ${format}`)
    setShowExportDialog(false)
    // Show toast: "Report exported successfully"
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen -m-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            Analytics
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 ml-2 text-white/80" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs space-y-1">
                  <p className="font-medium">Analytics Dashboard</p>
                  <p className="text-xs">Comprehensive platform insights and performance metrics</p>
                  <p className="text-xs text-muted-foreground">
                    Data refreshed every 15 minutes • Last update: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="text-muted-foreground flex items-center">
            Real-time platform analytics and business intelligence
            <span className="ml-2 flex items-center text-xs">
              <span className={`w-2 h-2 rounded-full mr-1 ${autoRefresh ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              {autoRefresh ? 'Live' : 'Paused'}
            </span>
          </p>
        </div>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                {autoRefresh ? 'Pause' : 'Resume'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{autoRefresh ? 'Pause' : 'Resume'} automatic data refresh</p>
            </TooltipContent>
          </Tooltip>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={() => setShowFiltersPanel(true)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Advanced filtering options</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={() => setShowExportDialog(true)}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export analytics report</p>
            </TooltipContent>
          </Tooltip>
          
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <KPICard
                title="Total Revenue"
                value={formatCurrency(analyticsData.overview.totalRevenue)}
                change={{ value: 23.4, type: "increase", period: "MTD" }}
                icon={<DollarSign className="h-4 w-4" />}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Monthly Revenue Growth</p>
              <p className="text-xs">Target: $1.8M • Actual: $1.55M</p>
              <p className="text-xs text-green-600">↑ 23.4% vs last month</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <KPICard
                title="Active Students"
                value={analyticsData.overview.totalStudents.toLocaleString()}
                change={{ value: 12.5, type: "increase", period: "MTD" }}
                icon={<Users className="h-4 w-4" />}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Student Growth Rate</p>
              <p className="text-xs">Verified: {(analyticsData.overview.totalStudents * 0.87).toLocaleString()}</p>
              <p className="text-xs text-green-600">↑ 12.5% monthly growth</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <KPICard
                title="Course Completion"
                value={`${analyticsData.overview.avgCompletionRate}%`}
                change={{ value: 5.3, type: "increase", period: "MTD" }}
                icon={<Award className="h-4 w-4" />}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Completion Rate Trend</p>
              <p className="text-xs">Industry avg: 65% • SkillSpark: 78.3%</p>
              <p className="text-xs text-green-600">↑ 13.3% above industry</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <KPICard
                title="Job Placements"
                value={`${analyticsData.performanceMetrics.jobPlacement.current}%`}
                change={{ value: 8.2, type: "increase", period: "MTD" }}
                icon={<Briefcase className="h-4 w-4" />}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-medium">Placement Success Rate</p>
              <p className="text-xs">Total placed: {analyticsData.overview.totalPlacements}</p>
              <p className="text-xs text-green-600">↑ 8.2% improvement</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Growth & Performance Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* User Growth Chart */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-5 w-5 text-blue-600" />
                  <span>User Growth Trends</span>
                </CardTitle>
                <CardDescription>
                  Monthly growth in student and company registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.userGrowth.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.period}</span>
                        <div className="flex space-x-4 text-xs">
                          <div className="text-right">
                            <div className="font-medium text-blue-600">{data.students.toLocaleString()}</div>
                            <div className="text-muted-foreground">Students</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-green-600">{data.companies}</div>
                            <div className="text-muted-foreground">Companies</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-purple-600">{data.verified.toLocaleString()}</div>
                            <div className="text-muted-foreground">Verified</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Progress value={(data.students / 15000) * 100} className="h-2" />
                        <Progress value={(data.companies / 500) * 100} className="h-2" />
                        <Progress value={(data.verified / data.students) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Performance Overview</span>
                </CardTitle>
                <CardDescription>
                  Key performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(analyticsData.performanceMetrics).map(([key, metric]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend as "up" | "down" | "stable")}
                        <span className={`text-sm font-medium ${getTrendColor(metric.trend as "up" | "down" | "stable")}`}>
                          {key === "supportResponse" ? `${metric.current}h` : `${metric.current}%`}
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={key === "supportResponse" ? 100 - (metric.current / 5 * 100) : metric.current} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Target: {key === "supportResponse" ? `${metric.target}h` : `${metric.target}%`}</span>
                      <span className={metric.current >= metric.target ? "text-green-600" : "text-orange-600"}>
                        {metric.current >= metric.target ? "✓ Met" : "△ Below"}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Weekly Activity & Top Skills */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  <span>Weekly Activity Patterns</span>
                </CardTitle>
                <CardDescription>
                  Daily platform engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.trends.weeklyActivity.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{day.day}</span>
                        <div className="flex space-x-4 text-xs">
                          <span className="text-blue-600 font-medium">{day.active.toLocaleString()}</span>
                          <span className="text-green-600 font-medium">{day.assignments}</span>
                          <span className="text-purple-600 font-medium">{day.completions}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="bg-blue-100 h-2 rounded" style={{ width: `${(day.active / 10000) * 100}%` }}></div>
                        <div className="bg-green-100 h-2 rounded" style={{ width: `${(day.assignments / 2000) * 100}%` }}></div>
                        <div className="bg-purple-100 h-2 rounded" style={{ width: `${(day.completions / 400) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex justify-between">
                      <span>📊 Active Users</span>
                      <span>📝 Assignments</span>
                      <span>✅ Completions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Trending Skills</span>
                </CardTitle>
                <CardDescription>
                  Most in-demand skills and growth rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.trends.topSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                          <span className="text-sm font-medium">{skill.skill}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{skill.mentions.toLocaleString()}</span>
                          <Badge 
                            variant="outline"
                            className={`text-xs ${skill.growth > 20 ? 'text-green-600' : skill.growth > 10 ? 'text-blue-600' : 'text-gray-600'}`}
                          >
                            +{skill.growth}%
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={(skill.mentions / 3500) * 100} 
                        className="h-1"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Demographics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Age Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analyticsData.demographics.ageGroups.map((group, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{group.range}</span>
                      <span className="text-sm text-muted-foreground">{group.percentage}%</span>
                    </div>
                    <Progress value={group.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">{group.count.toLocaleString()} students</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Education Level</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analyticsData.demographics.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{edu.level}</span>
                      <span className="text-sm text-muted-foreground">{edu.percentage}%</span>
                    </div>
                    <Progress value={edu.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">{edu.count.toLocaleString()} students</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Experience Level</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analyticsData.demographics.experience.map((exp, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{exp.level}</span>
                      <span className="text-sm text-muted-foreground">{exp.percentage}%</span>
                    </div>
                    <Progress value={exp.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">{exp.count.toLocaleString()} students</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Course Performance Analytics</span>
              </CardTitle>
              <CardDescription>
                Detailed course metrics including enrollment, completion, and revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Avg Score</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.courseAnalytics.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{course.name}</div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>{course.instructor}</span>
                            <span>•</span>
                            {getDifficultyBadge(course.difficulty)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{course.enrolled.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">
                            {course.dropped} dropped
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{course.completionRate}%</div>
                          <Progress value={course.completionRate} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="font-medium">{course.avgScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(course.revenue)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{course.satisfaction}</span>
                          <span className="text-xs text-muted-foreground">/5</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedCourse(course)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Revenue Sources</span>
                </CardTitle>
                <CardDescription>
                  Revenue breakdown by source with growth rates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.revenueBreakdown.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.source}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{formatCurrency(source.amount)}</span>
                        <Badge 
                          variant="outline"
                          className="text-xs text-green-600"
                        >
                          +{source.growth}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {source.percentage}% of total revenue
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Monthly Revenue Trend</span>
                </CardTitle>
                <CardDescription>
                  Monthly revenue vs targets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.monthlyRevenue.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{month.month}</span>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-muted-foreground">Target: {formatCurrency(month.target)}</span>
                        <span className={`font-medium ${month.amount >= month.target ? 'text-green-600' : 'text-orange-600'}`}>
                          {formatCurrency(month.amount)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={(month.amount / month.target) * 100} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.round((month.amount / month.target) * 100)}% of target</span>
                        <span className={month.amount >= month.target ? 'text-green-600' : 'text-orange-600'}>
                          {month.amount >= month.target ? '+' : ''}{formatCurrency(month.amount - month.target)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Geographic Distribution</span>
              </CardTitle>
              <CardDescription>
                User distribution and revenue by state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Companies</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Growth Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.geographicData.map((location, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{location.state}</TableCell>
                      <TableCell>{location.students.toLocaleString()}</TableCell>
                      <TableCell>{location.companies}</TableCell>
                      <TableCell>{formatCurrency(location.revenue)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={`${location.growth > 20 ? 'text-green-600' : location.growth > 15 ? 'text-blue-600' : 'text-gray-600'}`}
                        >
                          +{location.growth}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Platform Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Platform Health</span>
                </CardTitle>
                <CardDescription>
                  System performance and reliability metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">System Uptime</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">99.8%</span>
                      </div>
                    </div>
                    <Progress value={99.8} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Response Time</span>
                      <span className="text-sm font-medium">124ms</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Error Rate</span>
                      <span className="text-sm font-medium text-green-600">0.02%</span>
                    </div>
                    <Progress value={99.98} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Quality Metrics</span>
                </CardTitle>
                <CardDescription>
                  Content and service quality indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Content Quality Score</span>
                      <span className="text-sm font-medium">4.7/5</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Instructor Rating</span>
                      <span className="text-sm font-medium">4.6/5</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Support Satisfaction</span>
                      <span className="text-sm font-medium">4.5/5</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Filters Panel */}
      <Sheet open={showFiltersPanel} onOpenChange={setShowFiltersPanel}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Advanced Filters</SheetTitle>
            <SheetDescription>
              Customize your analytics view with advanced filtering options
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Metrics Focus</Label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Metrics</SelectItem>
                    <SelectItem value="revenue">Revenue Focus</SelectItem>
                    <SelectItem value="growth">Growth Focus</SelectItem>
                    <SelectItem value="performance">Performance Focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Auto Refresh</Label>
                  <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically refresh data every 15 minutes
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button className="w-full">Apply Filters</Button>
              <Button variant="outline" className="w-full">Reset to Default</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Analytics Report</DialogTitle>
            <DialogDescription>
              Choose the format and data range for your analytics export
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Export Format</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" onClick={() => exportReport("pdf")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" onClick={() => exportReport("excel")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline" onClick={() => exportReport("csv")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Include Sections</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="overview" defaultChecked />
                  <label htmlFor="overview" className="text-sm">Overview & KPIs</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="revenue" defaultChecked />
                  <label htmlFor="revenue" className="text-sm">Revenue Analytics</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="courses" defaultChecked />
                  <label htmlFor="courses" className="text-sm">Course Performance</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="geographic" />
                  <label htmlFor="geographic" className="text-sm">Geographic Data</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => exportReport("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Details Modal */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedCourse.name}</DialogTitle>
              <DialogDescription>
                Detailed course analytics and performance metrics
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Instructor</Label>
                  <p className="text-sm font-medium">{selectedCourse.instructor}</p>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <p className="text-sm font-medium">{selectedCourse.category}</p>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  {getDifficultyBadge(selectedCourse.difficulty)}
                </div>
                <div className="space-y-2">
                  <Label>Engagement Score</Label>
                  <p className="text-sm font-medium">{selectedCourse.engagementScore}/100</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-blue-600">{selectedCourse.enrolled.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Enrolled</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-green-600">{selectedCourse.completed.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-red-600">{selectedCourse.dropped}</div>
                  <div className="text-xs text-muted-foreground">Dropped</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Completion Rate</Label>
                <Progress value={selectedCourse.completionRate} className="h-3" />
                <div className="text-sm text-muted-foreground">{selectedCourse.completionRate}% completion rate</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                View Full Details
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}