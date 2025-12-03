  "use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, MessageCircle, Download, ExternalLink, Award, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Student = {
  id: string
  name: string
  email: string
  college: string
  avatar?: string
  kaizenScore: number
  skills: string[]
  domain: string
  location: string
  availability: string
  isPremium: boolean
  resumeUrl: string
  portfolioUrl?: string
  githubUrl?: string
  linkedinUrl?: string
  createdAt: string
  rating: number
  institutionTier: string
  aiMatchScore: number
}

const data: Student[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    email: "arjun.sharma@iitd.ac.in",
    college: "IIT Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    kaizenScore: 87,
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    domain: "Web Development",
    location: "Delhi",
    availability: "Immediately",
    isPremium: true,
    resumeUrl: "/resumes/arjun-sharma.pdf",
    portfolioUrl: "https://arjun-dev.com",
    githubUrl: "https://github.com/arjunsharma",
    linkedinUrl: "https://linkedin.com/in/arjunsharma",
    createdAt: "2024-01-15T10:00:00Z",
    rating: 4.8,
    institutionTier: "Tier 1",
    aiMatchScore: 92
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@nitsurat.ac.in",
    college: "NIT Surat",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=100&h=100&fit=crop&crop=face",
    kaizenScore: 92,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
    domain: "UI/UX Design",
    location: "Mumbai",
    availability: "1 week",
    isPremium: true,
    resumeUrl: "/resumes/priya-patel.pdf",
    portfolioUrl: "https://priya-designs.com",
    linkedinUrl: "https://linkedin.com/in/priyapatel",
    createdAt: "2024-01-12T14:30:00Z",
    rating: 4.9,
    institutionTier: "Tier 1",
    aiMatchScore: 88
  },
  {
    id: "3",
    name: "Rahul Kumar",
    email: "rahul.kumar@bitspilani.ac.in",
    college: "BITS Pilani",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    kaizenScore: 89,
    skills: ["Python", "TensorFlow", "PyTorch", "Data Analysis", "MLOps"],
    domain: "Machine Learning",
    location: "Bangalore",
    availability: "2 weeks",
    isPremium: true,
    resumeUrl: "/resumes/rahul-kumar.pdf",
    githubUrl: "https://github.com/rahulkumar",
    linkedinUrl: "https://linkedin.com/in/rahulkumar",
    createdAt: "2024-01-10T09:15:00Z",
    rating: 4.7,
    institutionTier: "Tier 1",
    aiMatchScore: 85
  },
  {
    id: "4",
    name: "Sneha Reddy",
    email: "sneha.reddy@iiith.ac.in",
    college: "IIIT Hyderabad",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    kaizenScore: 94,
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    domain: "Mobile Development",
    location: "Hyderabad",
    availability: "Immediately",
    isPremium: true,
    resumeUrl: "/resumes/sneha-reddy.pdf",
    githubUrl: "https://github.com/snehareddy",
    linkedinUrl: "https://linkedin.com/in/snehareddy",
    createdAt: "2024-01-08T16:45:00Z",
    rating: 4.9,
    institutionTier: "Tier 1",
    aiMatchScore: 94
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram.singh@iitb.ac.in",
    college: "IIT Bombay",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    kaizenScore: 88,
    skills: ["Node.js", "Express", "MongoDB", "AWS", "Docker"],
    domain: "Backend Development",
    location: "Mumbai",
    availability: "1 month",
    isPremium: true,
    resumeUrl: "/resumes/vikram-singh.pdf",
    githubUrl: "https://github.com/vikramsingh",
    linkedinUrl: "https://linkedin.com/in/vikramsingh",
    createdAt: "2024-01-05T11:20:00Z",
    rating: 4.6,
    institutionTier: "Tier 1",
    aiMatchScore: 79
  },
  {
    id: "6",
    name: "Ananya Gupta",
    email: "ananya.gupta@nittrichy.ac.in",
    college: "NIT Trichy",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    kaizenScore: 91,
    skills: ["Pandas", "NumPy", "Scikit-learn", "Tableau", "SQL"],
    domain: "Data Science",
    location: "Chennai",
    availability: "2 weeks",
    isPremium: true,
    resumeUrl: "/resumes/ananya-gupta.pdf",
    portfolioUrl: "https://ananya-data.com",
    linkedinUrl: "https://linkedin.com/in/ananyagupta",
    createdAt: "2024-01-03T08:00:00Z",
    rating: 4.8,
    institutionTier: "Tier 1",
    aiMatchScore: 87
  }
]

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getScoreBadge = (score: number) => {
  if (score >= 90) {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent ({score}%)</Badge>
  } else if (score >= 80) {
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Good ({score}%)</Badge>
  } else {
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Average ({score}%)</Badge>
  }
}

const getDomainBadge = (domain: string) => {
  const colors = {
    "Web Development": "bg-purple-100 text-purple-800 border-purple-200",
    "UI/UX Design": "bg-pink-100 text-pink-800 border-pink-200",
    "Machine Learning": "bg-orange-100 text-orange-800 border-orange-200",
    "Mobile Development": "bg-blue-100 text-blue-800 border-blue-200",
    "Backend Development": "bg-gray-100 text-gray-800 border-gray-200",
    "Data Science": "bg-green-100 text-green-800 border-green-200"
  }
  
  const colorClass = colors[domain as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"
  
  return <Badge variant="outline" className={colorClass}>{domain}</Badge>
}

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Student
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="bg-purple-100 text-purple-800 font-semibold text-sm">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900 flex items-center gap-2">
              {student.name}
              {student.isPremium && (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs px-2 py-0">
                  Premium
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">{student.college}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: ({ row }) => getDomainBadge(row.getValue("domain")),
  },
  {
    accessorKey: "kaizenScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Kaizen Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => getScoreBadge(row.getValue("kaizenScore")),
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell: ({ row }) => {
      const skills = row.getValue("skills") as string[]
      return (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{skills.length - 3}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex items-center text-gray-600">
        <MapPin className="w-4 h-4 mr-1" />
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "availability",
    header: "Availability",
    cell: ({ row }) => (
      <div className="flex items-center text-gray-600">
        <Calendar className="w-4 h-4 mr-1" />
        {row.getValue("availability")}
      </div>
    ),
  },
  {
    accessorKey: "aiMatchScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Match Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const score = row.getValue("aiMatchScore") as number
      return (
        <div className="flex items-center">
          <Award className="w-4 h-4 mr-1 text-purple-600" />
          <span className="font-medium">{score}%</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageCircle className="mr-2 h-4 w-4" />
              Request Interview
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </DropdownMenuItem>
            {student.portfolioUrl && (
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Portfolio
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function HiringPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Hire Premium Talent
        </h1>
        <p className="text-gray-600 text-base">
          Discover and connect with top-tier certified students from premier institutions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search students..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-medium text-gray-900">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}