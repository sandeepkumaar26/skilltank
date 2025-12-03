"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"

// API Response Time Data
const apiResponseData = [
  { time: "6h ago", ms: 140 },
  { time: "5h ago", ms: 180 },
  { time: "4h ago", ms: 155 },
  { time: "3h ago", ms: 210 },
  { time: "2h ago", ms: 165 },
  { time: "1h ago", ms: 150 },
  { time: "Now", ms: 124 },
]

const apiChartConfig = {
  ms: {
    label: "Response Time (ms)",
    color: "#6b7280",
  },
}

// Active Users Data
const activeUsersData = [
  { time: "00:00", users: 850 },
  { time: "04:00", users: 720 },
  { time: "08:00", users: 980 },
  { time: "12:00", users: 1150 },
  { time: "16:00", users: 1280 },
  { time: "20:00", users: 1100 },
  { time: "Now", users: 1247 },
]

const usersChartConfig = {
  users: {
    label: "Active Users",
    color: "#6b7280",
  },
}

// Memory Usage Data
const memoryData = [
  { time: "12h", usage: 45 },
  { time: "11h", usage: 52 },
  { time: "10h", usage: 48 },
  { time: "9h", usage: 55 },
  { time: "8h", usage: 50 },
  { time: "7h", usage: 58 },
  { time: "6h", usage: 53 },
  { time: "5h", usage: 60 },
  { time: "4h", usage: 56 },
  { time: "3h", usage: 62 },
  { time: "2h", usage: 58 },
  { time: "Now", usage: 52 },
]

const memoryChartConfig = {
  usage: {
    label: "Memory %",
    color: "#6b7280",
  },
}

// Request Rate Data
const requestRateData = [
  { time: "30m", rate: 750 },
  { time: "25m", rate: 820 },
  { time: "20m", rate: 780 },
  { time: "15m", rate: 850 },
  { time: "10m", rate: 880 },
  { time: "5m", rate: 920 },
  { time: "Now", rate: 892 },
]

const requestChartConfig = {
  rate: {
    label: "Requests/sec",
    color: "#6b7280",
  },
}

export function ApiResponseChart() {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">API Response Time</span>
        <Badge className="bg-gray-700 text-white">Normal</Badge>
      </div>
      <div className="text-2xl font-bold text-gray-800">124ms</div>
      <p className="text-xs text-gray-600">Average response time</p>
      <ChartContainer config={apiChartConfig} className="h-[80px] w-full">
        <BarChart data={apiResponseData}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="ms" fill="var(--color-ms)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
      <p className="text-xs text-gray-500 text-center">Last 7 hours</p>
    </div>
  )
}

export function UptimeChart() {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">System Uptime</span>
        <Badge className="bg-gray-700 text-white">Healthy</Badge>
      </div>
      <div className="text-2xl font-bold text-gray-800">99.9%</div>
      <p className="text-xs text-gray-600">Last 30 days</p>
      <div className="flex items-center justify-center">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#e5e7eb"
              strokeOpacity="1"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="#6b7280"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 35}`}
              strokeDashoffset={`${2 * Math.PI * 35 * (1 - 0.999)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-800">99.9%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ActiveUsersChart() {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">Active Users</span>
        <Badge className="bg-gray-700 text-white">Online</Badge>
      </div>
      <div className="text-2xl font-bold text-gray-800">1,247</div>
      <p className="text-xs text-gray-600">Currently active</p>
      <ChartContainer config={usersChartConfig} className="h-[80px] w-full">
        <LineChart data={activeUsersData}>
          <defs>
            <linearGradient id="userFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="var(--color-users)" 
            strokeWidth={2}
            fill="url(#userFill)"
            fillOpacity={1}
          />
        </LineChart>
      </ChartContainer>
      <p className="text-xs text-gray-500 text-center">24-hour trend</p>
    </div>
  )
}

export function ServerLoadChart() {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-800">Server Load</span>
        <Badge className="bg-gray-700 text-white">Moderate</Badge>
      </div>
      <div className="text-2xl font-bold text-gray-800">67%</div>
      <p className="text-xs text-gray-600">CPU utilization</p>
      <div className="space-y-2">
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-600 to-gray-500 rounded-full transition-all duration-500"
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
  )
}

export function MemoryUsageChart() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800">Memory Usage Trend</h4>
        <Badge className="bg-gray-100 text-gray-700">4.2 GB / 8 GB</Badge>
      </div>
      <ChartContainer config={memoryChartConfig} className="h-[120px] w-full">
        <BarChart data={memoryData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="time" 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
          />
          <Bar dataKey="usage" fill="var(--color-usage)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export function RequestRateChart() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800">Request Rate (req/sec)</h4>
        <Badge className="bg-gray-100 text-gray-700">~892 req/s</Badge>
      </div>
      <ChartContainer config={requestChartConfig} className="h-[120px] w-full">
        <LineChart data={requestRateData}>
          <defs>
            <linearGradient id="requestFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-rate)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--color-rate)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="time" 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            cursor={{ strokeDasharray: '3 3' }}
          />
          <Line 
            type="natural" 
            dataKey="rate" 
            stroke="var(--color-rate)" 
            strokeWidth={2.5}
            fill="url(#requestFill)"
            fillOpacity={1}
            dot={{ fill: 'var(--color-rate)', r: 3 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
