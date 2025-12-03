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
  BookOpen,
  Users,
  Clock,
  Star,
  Play,
  Pause,
  Plus,
  StarOff,
  EyeOff,
  Grid3X3,
  List,
  CheckCircle,
  XCircle,
  Archive,
  DollarSign,
  Crown
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar?: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  enrolledStudents: number
  totalLessons: number
  completedLessons: number
  rating: number
  reviews: number
  price: number
  status: "active" | "draft" | "archived"
  createdDate: string
  thumbnail?: string
  tags: string[]
  isFeatured?: boolean
  isPriceVisible?: boolean
  lastUpdated?: string
  revenue?: number
}

const mockCourses: Course[] = [
  {
    id: "CRS001234",
    title: "Advanced Programming Fundamentals",
    description: "Comprehensive course covering advanced programming concepts and best practices",
    instructor: "Dr. Sarah Johnson",
    instructorAvatar: "/avatars/instructor1.png",
    category: "Programming",
    level: "advanced",
    duration: "12 weeks",
    enrolledStudents: 450,
    totalLessons: 48,
    completedLessons: 32,
    rating: 4.8,
    reviews: 234,
    price: 299,
    status: "active",
    createdDate: "2024-01-10",
    tags: ["JavaScript", "Python", "Algorithms"],
    isFeatured: true,
    isPriceVisible: true,
    lastUpdated: "2024-01-28",
    revenue: 134550
  },
  {
    id: "CRS001235",
    title: "Data Science Bootcamp",
    description: "Complete data science curriculum from basics to advanced machine learning",
    instructor: "Prof. Michael Chen",
    category: "Data Science",
    level: "intermediate",
    duration: "16 weeks",
    enrolledStudents: 380,
    totalLessons: 64,
    completedLessons: 45,
    rating: 4.9,
    reviews: 189,
    price: 399,
    status: "active",
    createdDate: "2024-01-08",
    tags: ["Python", "Machine Learning", "Statistics"],
    isFeatured: false,
    isPriceVisible: true,
    lastUpdated: "2024-01-25",
    revenue: 151620
  },
  {
    id: "CRS001236",
    title: "Frontend Development Mastery",
    description: "Modern frontend development with React, TypeScript, and advanced patterns",
    instructor: "Emily Davis",
    category: "Web Development",
    level: "intermediate",
    duration: "10 weeks",
    enrolledStudents: 290,
    totalLessons: 40,
    completedLessons: 28,
    rating: 4.7,
    reviews: 156,
    price: 249,
    status: "active",
    createdDate: "2024-01-12",
    tags: ["React", "TypeScript", "CSS"]
  },
  {
    id: "CRS001237",
    title: "Mobile App Development",
    description: "Cross-platform mobile development using React Native and Flutter",
    instructor: "David Wilson",
    category: "Mobile Development",
    level: "beginner",
    duration: "14 weeks",
    enrolledStudents: 180,
    totalLessons: 56,
    completedLessons: 15,
    rating: 4.6,
    reviews: 89,
    price: 329,
    status: "draft",
    createdDate: "2024-01-15",
    tags: ["React Native", "Flutter", "Mobile"]
  },
  {
    id: "CRS001238",
    title: "DevOps and Cloud Computing",
    description: "Complete DevOps pipeline and cloud infrastructure management",
    instructor: "Alex Rodriguez",
    category: "DevOps",
    level: "advanced",
    duration: "18 weeks",
    enrolledStudents: 125,
    totalLessons: 72,
    completedLessons: 55,
    rating: 4.5,
    reviews: 67,
    price: 449,
    status: "archived",
    createdDate: "2023-12-20",
    tags: ["AWS", "Docker", "Kubernetes"]
  }
]

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [showBulkDialog, setShowBulkDialog] = useState(false)
  const [bulkAction, setBulkAction] = useState<"feature" | "unfeature" | "remove" | "">("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesLevel && matchesStatus
  })

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "beginner":
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>
      case "intermediate":
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>
      case "advanced":
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>
      case "archived":
        return <Badge className="bg-red-100 text-red-800">Archived</Badge>
      default:
        return null
    }
  }

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  const handleSelectAll = () => {
    if (selectedCourses.length === filteredCourses.length) {
      setSelectedCourses([])
    } else {
      setSelectedCourses(filteredCourses.map(c => c.id))
    }
  }

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const toggleFeatured = (course: Course) => {
    setCourses(prev => prev.map(c => 
      c.id === course.id 
        ? { ...c, isFeatured: !c.isFeatured }
        : c
    ))
    // Show toast: Course featured/unfeatured
  }

  const togglePriceVisibility = (course: Course) => {
    setCourses(prev => prev.map(c => 
      c.id === course.id 
        ? { ...c, isPriceVisible: !c.isPriceVisible }
        : c
    ))
    // Show toast: Price visibility updated
  }

  const handleBulkAction = (action: "feature" | "unfeature" | "remove") => {
    setBulkAction(action)
    setShowBulkDialog(true)
  }

  const confirmBulkAction = () => {
    if (bulkAction === "remove") {
      setCourses(prev => prev.filter(c => !selectedCourses.includes(c.id)))
    } else if (bulkAction === "feature") {
      setCourses(prev => prev.map(c => 
        selectedCourses.includes(c.id) ? { ...c, isFeatured: true } : c
      ))
    } else if (bulkAction === "unfeature") {
      setCourses(prev => prev.map(c => 
        selectedCourses.includes(c.id) ? { ...c, isFeatured: false } : c
      ))
    }
    setSelectedCourses([])
    setShowBulkDialog(false)
    setBulkAction("")
    // Show toast with summary
  }

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (courseToDelete) {
      setCourses(prev => prev.filter(c => c.id !== courseToDelete.id))
      setShowDeleteDialog(false)
      setCourseToDelete(null)
      // Show toast: Course removed
    }
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen -m-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-white/90 mt-1">
            Manage course content, instructors, and student enrollments
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-white text-[#034078] hover:bg-gray-100 border-white">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-white text-[#034078] hover:bg-gray-100">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses by title, instructor, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Programming">Programming</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Mobile Development">Mobile Development</SelectItem>
            <SelectItem value="DevOps">DevOps</SelectItem>
          </SelectContent>
        </Select>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Table view</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Grid view</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCourses.length > 0 && (
        <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedCourses.length} course(s) selected
          </span>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction("feature")}>
            <Star className="mr-1 h-3 w-3" />
            Feature Selected
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleBulkAction("unfeature")}>
            <StarOff className="mr-1 h-3 w-3" />
            Unfeature Selected
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleBulkAction("remove")}>
            <Trash2 className="mr-1 h-3 w-3" />
            Remove Selected
          </Button>
        </div>
      )}

      {/* Courses Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCourses.includes(course.id)}
                    onCheckedChange={() => handleSelectCourse(course.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{course.title}</span>
                      {course.isFeatured && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Crown className="h-4 w-4 text-yellow-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Featured course</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.duration} • {course.totalLessons} lessons
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                      <AvatarFallback>
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{course.category}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getLevelBadge(course.level)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{course.enrolledStudents}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {getProgressPercentage(course.completedLessons, course.totalLessons)}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${getProgressPercentage(course.completedLessons, course.totalLessons)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-sm text-muted-foreground">({course.reviews})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {course.isPriceVisible ? (
                      <span className="font-medium">${course.price}</span>
                    ) : (
                      <span className="font-medium text-muted-foreground">Hidden</span>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => togglePriceVisibility(course)}
                          className="h-6 w-6 p-0"
                        >
                          {course.isPriceVisible ? (
                            <Eye className="h-3 w-3" />
                          ) : (
                            <EyeOff className="h-3 w-3" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{course.isPriceVisible ? 'Hide price' : 'Show price'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(course.status)}
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
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Course
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Course
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        View Students ({course.enrolledStudents})
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toggleFeatured(course)}>
                        {course.isFeatured ? (
                          <>
                            <StarOff className="mr-2 h-4 w-4" />
                            Remove Feature
                          </>
                        ) : (
                          <>
                            <Star className="mr-2 h-4 w-4" />
                            Make Featured
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => togglePriceVisibility(course)}>
                        {course.isPriceVisible ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Hide Price
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Show Price
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {course.status === "active" ? (
                        <DropdownMenuItem>
                          <Pause className="mr-2 h-4 w-4" />
                          Pause Course
                        </DropdownMenuItem>
                      ) : course.status === "draft" ? (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Publish Course
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <Play className="mr-2 h-4 w-4" />
                          Activate Course
                        </DropdownMenuItem>
                      )}
                      {course.status === "active" && (
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive Course
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteCourse(course)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Bulk Action Confirmation Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {bulkAction === "feature" && "Feature Selected Courses"}
              {bulkAction === "unfeature" && "Unfeature Selected Courses"}
              {bulkAction === "remove" && "Remove Selected Courses"}
            </DialogTitle>
            <DialogDescription>
              {bulkAction === "feature" && 
                `Are you sure you want to feature ${selectedCourses.length} selected course(s)? Featured courses will appear in the &quot;Featured&quot; section on student catalog.`
              }
              {bulkAction === "unfeature" && 
                `Are you sure you want to remove feature status from ${selectedCourses.length} selected course(s)?`
              }
              {bulkAction === "remove" && 
                `Are you sure you want to permanently remove ${selectedCourses.length} selected course(s)? This action cannot be undone.`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={bulkAction === "remove" ? "destructive" : "default"}
              onClick={confirmBulkAction}
            >
              {bulkAction === "feature" && (
                <>
                  <Star className="h-4 w-4 mr-2" />
                  Feature Courses
                </>
              )}
              {bulkAction === "unfeature" && (
                <>
                  <StarOff className="h-4 w-4 mr-2" />
                  Unfeature Courses
                </>
              )}
              {bulkAction === "remove" && (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Courses
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete &quot;{courseToDelete?.title}&quot;? 
              This will remove the course and all associated data. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}