import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, X, Eye, Copy, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Internship {
  id: string
  title: string
  status: "active" | "draft" | "closed"
  applications: number
  deadline: string
  category: string
  type: "remote" | "on-site" | "hybrid"
  createdAt: string
}

interface InternshipTableProps {
  internships: Internship[]
}

export function InternshipTable({ internships }: InternshipTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#12B76A] text-white"
      case "draft":
        return "bg-[#667085] text-white"
      case "closed":
        return "bg-[#F04438] text-white"
      default:
        return "bg-[#667085] text-white"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "draft":
        return "Draft"
      case "closed":
        return "Closed"
      default:
        return status
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#D0D5DD] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#D0D5DD]">
            <TableHead className="text-[#667085] font-medium">Title</TableHead>
            <TableHead className="text-[#667085] font-medium">Status</TableHead>
            <TableHead className="text-[#667085] font-medium">Type</TableHead>
            <TableHead className="text-[#667085] font-medium">Applications</TableHead>
            <TableHead className="text-[#667085] font-medium">Deadline</TableHead>
            <TableHead className="text-[#667085] font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {internships.map((internship) => (
            <TableRow key={internship.id} className="border-b border-[#F2F4F7] hover:bg-[#F9FAFB]">
              <TableCell className="font-medium text-[#1D2939]">
                {internship.title}
              </TableCell>
              <TableCell>
                <Badge className={`${getStatusColor(internship.status)} rounded-full px-3 py-1 text-xs font-medium`}>
                  {getStatusText(internship.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-[#F2F4F7] text-[#344054] capitalize">
                  {internship.type}
                </Badge>
              </TableCell>
              <TableCell className="text-[#667085]">
                {internship.applications}
              </TableCell>
              <TableCell className="text-[#667085]">
                {format(new Date(internship.deadline), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] h-8"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    size="sm"
                    className="bg-black hover:bg-gray-800 text-white h-8"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="text-[#344054]">
                        <Copy className="h-4 w-4 mr-2" />
                        Clone
                      </DropdownMenuItem>
                      {internship.status === "active" && (
                        <DropdownMenuItem className="text-[#F04438]">
                          <X className="h-4 w-4 mr-2" />
                          Close
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}