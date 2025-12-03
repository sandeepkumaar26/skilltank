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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Edit, Trash2, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export type Internship = {
  id: string
  title: string
  type: "Remote" | "In-office" | "Hybrid"
  applicants: number
  status: "Under Review" | "Approved" | "Rejected" | "Draft"
  deadline: string
  profileViews: number
  shortlisted: number
  assignmentSubmissions?: number
}

const data: Internship[] = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    type: "Remote",
    applicants: 45,
    status: "Approved",
    deadline: "15 Aug 2025",
    profileViews: 120,
    shortlisted: 8,
    assignmentSubmissions: 35
  },
  {
    id: "2", 
    title: "Marketing Intern",
    type: "In-office",
    applicants: 20,
    status: "Under Review",
    deadline: "10 Sep 2025",
    profileViews: 65,
    shortlisted: 5
  },
  {
    id: "3",
    title: "Data Science Intern",
    type: "Hybrid",
    applicants: 33,
    status: "Approved",
    deadline: "20 Aug 2025",
    profileViews: 89,
    shortlisted: 12,
    assignmentSubmissions: 28
  },
  {
    id: "4",
    title: "UI/UX Design Intern",
    type: "Remote",
    applicants: 0,
    status: "Draft",
    deadline: "25 Sep 2025",
    profileViews: 0,
    shortlisted: 0
  }
]

export const columns: ColumnDef<Internship>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const colors = {
        "Remote": "bg-green-100 text-green-800",
        "In-office": "bg-blue-100 text-blue-800", 
        "Hybrid": "bg-purple-100 text-purple-800"
      }
      return (
        <Badge className={colors[type as keyof typeof colors]}>
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "applicants",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applicants
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const applicants = parseInt(row.getValue("applicants"))
      return <div className="text-center font-semibold">{applicants}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variants = {
        "Approved": "bg-green-500 text-white",
        "Under Review": "bg-yellow-500 text-white", 
        "Rejected": "bg-red-500 text-white",
        "Draft": "bg-gray-400 text-white"
      }
      return (
        <Badge className={cn("whitespace-nowrap", variants[status as keyof typeof variants])}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("deadline")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const internship = row.original

      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                style={{ backgroundColor: 'white', color: 'black', borderColor: '#d1d5db' }}
                className="hover:bg-gray-50"
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Metrics
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{internship.title}</DialogTitle>
                <DialogDescription>
                  Internship performance metrics
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Application Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Applicants</span>
                      <span className="font-semibold">{internship.applicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Profile Views</span>
                      <span className="font-semibold">{internship.profileViews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Shortlisted</span>
                      <span className="font-semibold">{internship.shortlisted}</span>
                    </div>
                    {internship.assignmentSubmissions && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Assignment Submissions</span>
                        <span className="font-semibold">{internship.assignmentSubmissions}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {internship.applicants > 0 
                        ? Math.round((internship.shortlisted / internship.applicants) * 100) 
                        : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Views to shortlist conversion
                    </p>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

export function MyInternshipsTable() {
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
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-black border-black focus:border-black"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="ml-auto"
              style={{ backgroundColor: 'white', color: 'black', borderColor: '#d1d5db' }}
            >
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
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex-1 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    table.previousPage()
                  }}
                  className={cn(
                    !table.getCanPreviousPage() && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
              {Array.from({ length: table.getPageCount() }, (_, i) => i + 1)
                .filter((page) => {
                  const currentPage = table.getState().pagination.pageIndex + 1
                  return (
                    page === 1 ||
                    page === table.getPageCount() ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                })
                .map((page, index, array) => {
                  const currentPage = table.getState().pagination.pageIndex + 1
                  const showEllipsis = index > 0 && page - array[index - 1] > 1
                  
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            table.setPageIndex(page - 1)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    </React.Fragment>
                  )
                })}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    table.nextPage()
                  }}
                  className={cn(
                    !table.getCanNextPage() && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="w-0"></div>
      </div>
    </div>
  )
}