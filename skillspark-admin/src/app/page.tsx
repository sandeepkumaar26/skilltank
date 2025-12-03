import { Users, Building2, Briefcase, BookOpen, Award, DollarSign, TrendingUp, Activity, Info, RefreshCw, AlertCircle } from "lucide-react"
import { KPICard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { VisitorsChart } from "@/components/visitors-chart"

export default function Dashboard() {
  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            Dashboard
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 ml-2 text-white/80" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#034078]">
                <div className="max-w-xs space-y-1">
                  <p className="font-medium">Real-time Overview</p>
                  <p className="text-xs">Data refreshed every 5 minutes</p>
                  <p className="text-xs text-gray-600">Last update: {new Date().toLocaleTimeString()}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="text-white/90 flex items-center mt-1">
            Welcome to SkillSpark Kaizen Admin Panel
            <span className="ml-2 flex items-center text-xs text-green-300">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-1 block animate-pulse"></span>
              System Operational
            </span>
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-white text-[#034078] hover:bg-gray-100 border-white">
            Export Report
          </Button>
          <Button className="bg-white text-[#034078] hover:bg-gray-100">
            View Analytics
          </Button>
        </div>
      </div>

      {/* Visitors Chart */}
      <VisitorsChart />

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Students"
          value={12547}
          change={{ value: 12, type: "increase", period: "MTD" }}
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Verified Students"
          value={8932}
          change={{ value: 8, type: "increase", period: "MTD" }}
          icon={<Badge className="h-4 w-4" />}
        />
        <KPICard
          title="Total Companies"
          value={387}
          change={{ value: 3, type: "increase", period: "MTD" }}
          icon={<Building2 className="h-4 w-4" />}
        />
        <KPICard
          title="Verified Companies"
          value={294}
          change={{ value: 15, type: "increase", period: "MTD" }}
          icon={<Building2 className="h-4 w-4" />}
        />
        <KPICard
          title="Internships Posted"
          value={1245}
          change={{ value: 7, type: "increase", period: "MTD" }}
          icon={<Briefcase className="h-4 w-4" />}
        />
        <KPICard
          title="Active Courses"
          value={127}
          change={{ value: 4, type: "increase", period: "MTD" }}
          icon={<BookOpen className="h-4 w-4" />}
        />
        <KPICard
          title="Assignments Pending"
          value={89}
          change={{ value: 0, type: "neutral", period: "Same" }}
          icon={<Activity className="h-4 w-4" />}
        />
        <KPICard
          title="Revenue Generated"
          value="$127,340"
          change={{ value: 23, type: "increase", period: "MTD" }}
          icon={<DollarSign className="h-4 w-4" />}
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4 border-blue-200/50 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Latest updates from your platform
                </CardDescription>
              </div>
              <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-100">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 bg-white/80 backdrop-blur-sm p-6">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-900">New student verification request</p>
                <p className="text-xs text-gray-600">John Smith from MIT</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200">Pending</Badge>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-900">Company registration</p>
                <p className="text-xs text-gray-600">TechCorp Inc.</p>
                <p className="text-xs text-gray-400">15 minutes ago</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">Review</Badge>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-900">Assignment submission</p>
                <p className="text-xs text-gray-600">Week 3 - Data Structures</p>
                <p className="text-xs text-gray-400">1 hour ago</p>
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200">Grade</Badge>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-900">Payment received</p>
                <p className="text-xs text-gray-600">Course enrollment - $299</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">Completed</Badge>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center animate-pulse">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-900">Internship application</p>
                <p className="text-xs text-gray-600">Software Engineer at Google</p>
                <p className="text-xs text-gray-400">3 hours ago</p>
              </div>
              <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200 animate-pulse">Urgent</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="col-span-3 space-y-4">
          <Card className="border-blue-200/50 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-gray-200 pb-3">
              <CardTitle className="text-gray-900 flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-600 text-xs">
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 bg-white/80 backdrop-blur-sm p-4">
              <div className="grid grid-cols-2 gap-2">
                <button className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 p-3 text-left transition-all hover:shadow-lg hover:scale-105">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <Users className="h-5 w-5 text-white" />
                      <Badge className="bg-white/20 text-white border-0 text-xs">12</Badge>
                    </div>
                    <p className="text-xs font-semibold text-white">Verify Students</p>
                  </div>
                </button>
                
                <button className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-3 text-left transition-all hover:shadow-lg hover:scale-105">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <Building2 className="h-5 w-5 text-white" />
                      <Badge className="bg-white/20 text-white border-0 text-xs">5</Badge>
                    </div>
                    <p className="text-xs font-semibold text-white">Review Companies</p>
                  </div>
                </button>
                
                <button className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 p-3 text-left transition-all hover:shadow-lg hover:scale-105">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <Activity className="h-5 w-5 text-white" />
                      <Badge className="bg-white/20 text-white border-0 text-xs">89</Badge>
                    </div>
                    <p className="text-xs font-semibold text-white">Grade Assignments</p>
                  </div>
                </button>
                
                <button className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 p-3 text-left transition-all hover:shadow-lg hover:scale-105">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <Award className="h-5 w-5 text-white" />
                      <Badge className="bg-white/20 text-white border-0 text-xs">23</Badge>
                    </div>
                    <p className="text-xs font-semibold text-white">Issue Certificates</p>
                  </div>
                </button>
              </div>
              
              <button className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-700 to-indigo-900 p-3 text-left transition-all hover:shadow-lg hover:scale-105">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-white" />
                    <p className="text-xs font-semibold text-white">View Full Analytics</p>
                  </div>
                  <svg className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </CardContent>
          </Card>

          {/* Pending Tasks Summary */}
          <Card className="border-blue-200/50 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-gray-200 pb-3">
              <CardTitle className="text-gray-900 flex items-center gap-2 text-base">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Pending Tasks
              </CardTitle>
              <CardDescription className="text-gray-600 text-xs">
                Tasks requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white/80 backdrop-blur-sm p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-700">Student Verifications</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">12</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <span className="text-xs text-gray-700">Company Reviews</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600">5</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span className="text-xs text-gray-700">Assignments to Grade</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-700">89</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <span className="text-xs text-gray-700">Certificates Pending</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-700">23</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Status */}
      <Card className="border-[#034078]/20 shadow-lg">
        <CardHeader className="bg-[#034078]/5">
          <CardTitle className="flex items-center text-[#034078]">
            System Status
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="h-4 w-4 ml-2 text-[#034078]" />
              </TooltipTrigger>
              <TooltipContent className="bg-white text-[#034078]">
                <div className="space-y-1">
                  <p className="font-medium">Monitoring Information</p>
                  <p className="text-xs">Real-time system health metrics</p>
                  <p className="text-xs">Automated alerts for anomalies</p>
                  <p className="text-xs text-gray-600">Refreshed every 30 seconds</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
          <CardDescription className="text-[#034078]/70">
            Platform health and performance metrics - All systems operational
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white space-y-6">
          {/* Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-3 p-4 rounded-lg bg-[#034078]/5 hover:bg-[#034078]/10 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#034078]">API Response Time</span>
                <Badge className="bg-[#034078] text-white">Normal</Badge>
              </div>
              <div className="text-2xl font-bold text-[#034078]">124ms</div>
              <p className="text-xs text-gray-600">Average response time</p>
              {/* Mini bar graph */}
              <div className="space-y-1">
                <div className="flex justify-between items-end h-12 gap-1">
                  <div className="bg-[#034078] w-full rounded-t" style={{ height: '40%' }}></div>
                  <div className="bg-[#034078] w-full rounded-t" style={{ height: '60%' }}></div>
                  <div className="bg-[#034078] w-full rounded-t" style={{ height: '45%' }}></div>
                  <div className="bg-[#034078] w-full rounded-t" style={{ height: '70%' }}></div>
                  <div className="bg-[#034078] w-full rounded-t" style={{ height: '55%' }}></div>
                  <div className="bg-[#034078] w-full rounded-t" style={{ height: '50%' }}></div>
                  <div className="bg-[#034078]/80 w-full rounded-t" style={{ height: '35%' }}></div>
                </div>
                <p className="text-xs text-gray-500 text-center">Last 7 hours</p>
              </div>
            </div>
            
            <div className="space-y-3 p-4 rounded-lg bg-[#034078]/5 hover:bg-[#034078]/10 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#034078]">System Uptime</span>
                <Badge className="bg-[#034078] text-white">Healthy</Badge>
              </div>
              <div className="text-2xl font-bold text-[#034078]">99.9%</div>
              <p className="text-xs text-gray-600">Last 30 days</p>
              {/* Progress ring */}
              <div className="flex items-center justify-center">
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#034078"
                      strokeOpacity="0.1"
                      strokeWidth="6"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke="#034078"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.999)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#034078]">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 p-4 rounded-lg bg-[#034078]/5 hover:bg-[#034078]/10 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#034078]">Active Users</span>
                <Badge className="bg-[#034078] text-white">Online</Badge>
              </div>
              <div className="text-2xl font-bold text-[#034078]">1,247</div>
              <p className="text-xs text-gray-600">Currently active</p>
              {/* Line graph */}
              <div className="space-y-1">
                <div className="relative h-12">
                  <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="userGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#034078', stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: '#034078', stopOpacity: 0 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0,30 L 15,25 L 30,28 L 45,20 L 60,22 L 75,18 L 90,15 L 100,12"
                      stroke="#034078"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M 0,30 L 15,25 L 30,28 L 45,20 L 60,22 L 75,18 L 90,15 L 100,12 L 100,50 L 0,50 Z"
                      fill="url(#userGradient)"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 text-center">24-hour trend</p>
              </div>
            </div>
            
            <div className="space-y-3 p-4 rounded-lg bg-[#034078]/5 hover:bg-[#034078]/10 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#034078]">Server Load</span>
                <Badge className="bg-[#034078] text-white">Moderate</Badge>
              </div>
              <div className="text-2xl font-bold text-[#034078]">67%</div>
              <p className="text-xs text-gray-600">CPU utilization</p>
              {/* Gauge visualization */}
              <div className="space-y-2">
                <div className="relative h-2 bg-[#034078]/10 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#034078] to-[#034078]/70 rounded-full transition-all duration-500"
                    style={{ width: '67%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Performance Graphs */}
          <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-[#034078]/10">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#034078]">Memory Usage Trend</h4>
                <Badge className="bg-[#034078]/10 text-[#034078]">4.2 GB / 8 GB</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-end justify-between h-24 gap-2">
                  {[45, 52, 48, 55, 50, 58, 53, 60, 56, 62, 58, 52].map((height, i) => (
                    <div key={i} className="flex-1 relative group">
                      <div 
                        className="bg-[#034078] rounded-t hover:bg-[#034078]/80 transition-colors cursor-pointer"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-[#034078] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {height}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>12 hrs ago</span>
                  <span>Now</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#034078]">Request Rate (req/sec)</h4>
                <Badge className="bg-[#034078]/10 text-[#034078]">~892 req/s</Badge>
              </div>
              <div className="relative h-24">
                <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="requestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#034078', stopOpacity: 0.4 }} />
                      <stop offset="100%" style={{ stopColor: '#034078', stopOpacity: 0.05 }} />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <line x1="0" y1="25" x2="200" y2="25" stroke="#034078" strokeOpacity="0.1" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#034078" strokeOpacity="0.1" strokeWidth="0.5" />
                  <line x1="0" y1="75" x2="200" y2="75" stroke="#034078" strokeOpacity="0.1" strokeWidth="0.5" />
                  
                  {/* Area fill */}
                  <path
                    d="M 0,60 Q 20,55 40,50 T 80,45 Q 100,40 120,42 T 160,38 Q 180,35 200,32 L 200,100 L 0,100 Z"
                    fill="url(#requestGradient)"
                  />
                  {/* Line */}
                  <path
                    d="M 0,60 Q 20,55 40,50 T 80,45 Q 100,40 120,42 T 160,38 Q 180,35 200,32"
                    stroke="#034078"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Data points */}
                  <circle cx="0" cy="60" r="2" fill="#034078" />
                  <circle cx="40" cy="50" r="2" fill="#034078" />
                  <circle cx="80" cy="45" r="2" fill="#034078" />
                  <circle cx="120" cy="42" r="2" fill="#034078" />
                  <circle cx="160" cy="38" r="2" fill="#034078" />
                  <circle cx="200" cy="32" r="2" fill="#034078" />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>30 min ago</span>
                <span>Now</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
