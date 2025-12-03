"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { TrendingUp, Users, Building2, Briefcase, BookOpen } from "lucide-react"

// Sample data - replace with real data from your API
const studentsData = [
  { date: "Nov 10", enrollments: 2800, verified: 1900 },
  { date: "Nov 11", enrollments: 3200, verified: 2100 },
  { date: "Nov 12", enrollments: 3600, verified: 2400 },
  { date: "Nov 13", enrollments: 3900, verified: 2600 },
  { date: "Nov 14", enrollments: 4300, verified: 2900 },
  { date: "Nov 15", enrollments: 4700, verified: 3200 },
  { date: "Nov 16", enrollments: 5100, verified: 3500 },
  { date: "Nov 17", enrollments: 5500, verified: 3800 },
]

const companiesData = [
  { date: "Nov 10", registered: 320, verified: 240 },
  { date: "Nov 11", registered: 335, verified: 250 },
  { date: "Nov 12", registered: 348, verified: 258 },
  { date: "Nov 13", registered: 360, verified: 268 },
  { date: "Nov 14", registered: 372, verified: 276 },
  { date: "Nov 15", registered: 380, verified: 282 },
  { date: "Nov 16", registered: 387, verified: 288 },
  { date: "Nov 17", registered: 395, verified: 294 },
]

const internshipsData = [
  { date: "Nov 10", posted: 980 },
  { date: "Nov 11", posted: 1020 },
  { date: "Nov 12", posted: 1050 },
  { date: "Nov 13", posted: 1100 },
  { date: "Nov 14", posted: 1150 },
  { date: "Nov 15", posted: 1180 },
  { date: "Nov 16", posted: 1220 },
  { date: "Nov 17", posted: 1245 },
]

const coursesData = [
  { date: "Nov 10", active: 105 },
  { date: "Nov 11", active: 108 },
  { date: "Nov 12", active: 112 },
  { date: "Nov 13", active: 115 },
  { date: "Nov 14", active: 118 },
  { date: "Nov 15", active: 121 },
  { date: "Nov 16", active: 124 },
  { date: "Nov 17", active: 127 },
]

type ChartType = "students" | "companies" | "internships" | "courses"

const chartConfigs = {
  students: {
    enrollments: { label: "Enrollments", color: "#6b7280" },
    verified: { label: "Verified", color: "#9ca3af" },
  },
  companies: {
    registered: { label: "Registered", color: "#6b7280" },
    verified: { label: "Verified", color: "#9ca3af" },
  },
  internships: {
    posted: { label: "Posted", color: "#6b7280" },
  },
  courses: {
    active: { label: "Active Courses", color: "#6b7280" },
  },
}

export function VisitorsChart() {
  const [activeChart, setActiveChart] = useState<ChartType>("students")

  const getChartData = () => {
    switch (activeChart) {
      case "students": return studentsData
      case "companies": return companiesData
      case "internships": return internshipsData
      case "courses": return coursesData
    }
  }

  const getChartInfo = () => {
    const data = getChartData()
    switch (activeChart) {
      case "students":
        return {
          title: "Students Overview",
          description: "Total enrollments and verified students over time",
          icon: <Users className="h-5 w-5" />,
          current: data[data.length - 1].enrollments,
          label: "Total Enrollments",
        }
      case "companies":
        return {
          title: "Companies Overview",
          description: "Registered and verified companies over time",
          icon: <Building2 className="h-5 w-5" />,
          current: data[data.length - 1].registered,
          label: "Total Companies",
        }
      case "internships":
        return {
          title: "Internships Overview",
          description: "Number of internships posted over time",
          icon: <Briefcase className="h-5 w-5" />,
          current: data[data.length - 1].posted,
          label: "Total Posted",
        }
      case "courses":
        return {
          title: "Courses Overview",
          description: "Active courses on the platform",
          icon: <BookOpen className="h-5 w-5" />,
          current: data[data.length - 1].active,
          label: "Active Courses",
        }
    }
  }

  const data = getChartData()
  const info = getChartInfo()

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-50 text-gray-700 rounded-lg border border-gray-200">
              {info.icon}
            </div>
            <div>
              <CardTitle className="text-gray-800">{info.title}</CardTitle>
              <CardDescription className="text-gray-500">{info.description}</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800">{info.current.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{info.label}</div>
          </div>
        </div>
        
        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 p-2 bg-gray-100/50 rounded-full border border-gray-200/50">
          <Button
            variant={activeChart === "students" ? "default" : "ghost"}
            onClick={() => setActiveChart("students")}
            className={`rounded-full transition-all ${activeChart === "students" ? "bg-white text-gray-700 shadow-sm hover:bg-white border border-gray-200" : "text-gray-600 hover:bg-white/60 hover:text-gray-700"}`}
          >
            <Users className="h-4 w-4 mr-2" />
            STUDENTS
          </Button>
          <Button
            variant={activeChart === "companies" ? "default" : "ghost"}
            onClick={() => setActiveChart("companies")}
            className={`rounded-full transition-all ${activeChart === "companies" ? "bg-white text-gray-700 shadow-sm hover:bg-white border border-gray-200" : "text-gray-600 hover:bg-white/60 hover:text-gray-700"}`}
          >
            <Building2 className="h-4 w-4 mr-2" />
            COMPANIES
          </Button>
          <Button
            variant={activeChart === "internships" ? "default" : "ghost"}
            onClick={() => setActiveChart("internships")}
            className={`rounded-full transition-all ${activeChart === "internships" ? "bg-white text-gray-700 shadow-sm hover:bg-white border border-gray-200" : "text-gray-600 hover:bg-white/60 hover:text-gray-700"}`}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            INTERNSHIPS
          </Button>
          <Button
            variant={activeChart === "courses" ? "default" : "ghost"}
            onClick={() => setActiveChart("courses")}
            className={`rounded-full transition-all ${activeChart === "courses" ? "bg-white text-gray-700 shadow-sm hover:bg-white border border-gray-200" : "text-gray-600 hover:bg-white/60 hover:text-gray-700"}`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            COURSES
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="bg-white pt-6">
        <ChartContainer config={chartConfigs[activeChart]} className="h-[350px] w-full">
          {(activeChart === "students" || activeChart === "companies") ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fill1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="fill2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9ca3af" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.5} />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => value.slice(4)}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <ChartTooltip 
                cursor={{ strokeDasharray: '3 3', stroke: '#d1d5db' }}
                content={<ChartTooltipContent />}
              />
              {activeChart === "students" ? (
                <>
                  <Area 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="#6b7280" 
                    strokeWidth={2}
                    fill="url(#fill1)" 
                    fillOpacity={1}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="verified" 
                    stroke="#9ca3af" 
                    strokeWidth={2}
                    fill="url(#fill2)" 
                    fillOpacity={1}
                  />
                </>
              ) : (
                <>
                  <Area 
                    type="monotone" 
                    dataKey="registered" 
                    stroke="#6b7280" 
                    strokeWidth={2}
                    fill="url(#fill1)" 
                    fillOpacity={1}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="verified" 
                    stroke="#9ca3af" 
                    strokeWidth={2}
                    fill="url(#fill2)" 
                    fillOpacity={1}
                  />
                </>
              )}
            </AreaChart>
          ) : activeChart === "internships" ? (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.5} />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => value.slice(4)}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="posted" fill="#6b7280" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="courseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b7280" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6b7280" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.5} />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => value.slice(4)}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <ChartTooltip 
                cursor={{ strokeDasharray: '3 3', stroke: '#d1d5db' }}
                content={<ChartTooltipContent />}
              />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#6b7280" 
                strokeWidth={2.5}
                dot={{ fill: '#6b7280', r: 4 }}
                activeDot={{ r: 6, fill: '#4b5563' }}
              />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
