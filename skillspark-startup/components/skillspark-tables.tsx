"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react"

const internshipsData = [
  {
    id: 1,
    title: "Software Engineering Intern",
    applicants: 45,
    status: "Active",
    type: "Remote",
  },
  {
    id: 2,
    title: "Data Science Intern",
    applicants: 32,
    status: "Active",
    type: "Hybrid",
  },
  {
    id: 3,
    title: "Product Management Intern",
    applicants: 28,
    status: "Closed",
    type: "On-site",
  },
  {
    id: 4,
    title: "Marketing Intern",
    applicants: 56,
    status: "Active",
    type: "Remote",
  },
  {
    id: 5,
    title: "UI/UX Design Intern",
    applicants: 67,
    status: "Active",
    type: "Hybrid",
  },
]

// coursesData removed

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
    case "Published":
      return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>
    case "Closed":
    case "Draft":
      return <Badge variant="secondary" className="bg-gray-100 text-gray-600">{status}</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getTypeBadge(type: string) {
  const colorMap = {
    "Remote": "bg-blue-100 text-blue-800 border-blue-200",
    "Hybrid": "bg-purple-100 text-purple-800 border-purple-200", 
    "On-site": "bg-orange-100 text-orange-800 border-orange-200",
  }
  
  return (
    <Badge className={colorMap[type as keyof typeof colorMap] || "bg-gray-100 text-gray-600"}>
      {type}
    </Badge>
  )
}

export function SkillSparkTables() {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 xl:grid-cols-2">
      {/* Internships Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Internships</CardTitle>
              <CardDescription className="text-gray-600">Manage your internship postings</CardDescription>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-700 font-medium">Title</TableHead>
                <TableHead className="text-gray-700 font-medium">Applicants</TableHead>
                <TableHead className="text-gray-700 font-medium">Status</TableHead>
                <TableHead className="text-gray-700 font-medium">Type</TableHead>
                <TableHead className="text-gray-700 font-medium text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internshipsData.map((internship) => (
                <TableRow key={internship.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{internship.title}</TableCell>
                  <TableCell className="text-gray-600">{internship.applicants}</TableCell>
                  <TableCell>{getStatusBadge(internship.status)}</TableCell>
                  <TableCell>{getTypeBadge(internship.type)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <IconEye className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <IconEdit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <IconTrash className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Courses Table removed */}
    </div>
  )
}