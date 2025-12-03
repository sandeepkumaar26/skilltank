import { IconTrendingUp, IconBriefcase, IconUsers, IconUserCheck } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription className="text-gray-600">Total Internships Posted</CardDescription>
            <IconBriefcase className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 tabular-nums">
            124
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <IconTrendingUp className="h-3 w-3" />
              +8 this month
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-700">
            Active postings performing well
          </div>
          <div className="text-gray-500">
            22 new applications today
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription className="text-gray-600">Total Applicants</CardDescription>
            <IconUsers className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 tabular-nums">
            2,847
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <IconTrendingUp className="h-3 w-3" />
              +15% this week
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-700">
            Strong candidate pipeline
          </div>
          <div className="text-gray-500">
            Average 23 applications per posting
          </div>
        </CardFooter>
      </Card>
      
      {/* Courses Created card removed */}
      
      <Card className="@container/card bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription className="text-gray-600">Total Enrollments</CardDescription>
            <IconUserCheck className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 tabular-nums">
            1,456
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-200">
              <IconTrendingUp className="h-3 w-3" />
              +12% this month
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-gray-700">
            Growing student base
          </div>
          <div className="text-gray-500">Top candidates engaging weekly</div>
        </CardFooter>
      </Card>
    </div>
  )
}
