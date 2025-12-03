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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye, Edit, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Internship = {
  id: string
  title: string
  status: "active" | "draft" | "closed"
  applications: number
  deadline: string
  category: string
  type: "remote" | "on-site" | "hybrid"
  createdAt: string
}

const data: Internship[] = [
  {
    id: "int_001",
    title: "Frontend Developer Intern",
    status: "active",
    applications: 52,
    deadline: "2025-08-12",
    category: "Engineering",
    type: "remote",
    createdAt: "2025-07-15"
  },
  {
    id: "int_002",
    title: "UX Design Intern",
    status: "active",
    applications: 28,
    deadline: "2025-08-20",
    category: "Design",
    type: "hybrid",
    createdAt: "2025-07-20"
  },
  {
    id: "int_003",
    title: "Marketing Intern",
    status: "draft",
    applications: 0,
    deadline: "2025-09-01",
    category: "Marketing",
    type: "on-site",
    createdAt: "2025-07-25"
  },
  {
    id: "int_004",
    title: "Data Science Intern",
    status: "closed",
    applications: 89,
    deadline: "2025-07-30",
    category: "Engineering",
    type: "remote",
    createdAt: "2025-06-15"
  },
  {
    id: "int_005",
    title: "Product Management Intern",
    status: "active",
    applications: 34,
    deadline: "2025-08-25",
    category: "Product",
    type: "hybrid",
    createdAt: "2025-07-18"
  },
  {
    id: "int_006",
    title: "Backend Developer Intern",
    status: "active",
    applications: 67,
    deadline: "2025-08-15",
    category: "Engineering",
    type: "remote",
    createdAt: "2025-07-12"
  },
  {
    id: "int_007",
    title: "Content Marketing Intern",
    status: "draft",
    applications: 0,
    deadline: "2025-09-05",
    category: "Marketing",
    type: "remote",
    createdAt: "2025-07-28"
  },
  {
    id: "int_008",
    title: "Mobile App Developer Intern",
    status: "active",
    applications: 41,
    deadline: "2025-08-18",
    category: "Engineering",
    type: "hybrid",
    createdAt: "2025-07-16"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
    case "draft":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
    case "closed":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Closed</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "remote":
      return <Badge variant="outline" className="text-blue-600 border-blue-200">Remote</Badge>
    case "hybrid":
      return <Badge variant="outline" className="text-purple-600 border-purple-200">Hybrid</Badge>
    case "on-site":
      return <Badge variant="outline" className="text-orange-600 border-orange-200">On-site</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

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
          className="h-auto p-0 font-medium"
        >
          Internship Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },
  {
    accessorKey: "applications",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Applications
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const applications = row.getValue("applications") as number
      return (
        <div className="text-center font-medium">
          {applications}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="text-gray-600">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => getTypeBadge(row.getValue("type")),
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Deadline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const deadline = new Date(row.getValue("deadline"))
      return (
        <div className="text-gray-600">
          {deadline.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"))
      return (
        <div className="text-gray-600">
          {createdAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const internship = row.original

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(internship.id)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy internship ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit internship
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete internship
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function MyInternshipsDashboard() {
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
    <div className="w-full space-y-4">
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
                  No internships found.
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