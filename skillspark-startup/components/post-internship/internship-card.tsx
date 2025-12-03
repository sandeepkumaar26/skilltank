import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Edit, X, Eye, Copy } from "lucide-react"
import { format } from "date-fns"

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

interface InternshipCardProps {
  internship: Internship
}

export function InternshipCard({ internship }: InternshipCardProps) {
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
    <div className="bg-white rounded-xl border border-[#D0D5DD] shadow-sm hover:shadow-md transition-shadow p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1D2939] line-clamp-2 flex-1 mr-3">
          {internship.title}
        </h3>
        <span className={`${getStatusColor(internship.status)} rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap`}>
          {getStatusText(internship.status)}
        </span>
      </div>
      
      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-[#667085] mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{internship.applications} Applications</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Deadline: {format(new Date(internship.deadline), "MMM dd, yyyy")}</span>
        </div>
      </div>

      {/* Type Badge */}
      <div className="mb-4">
        <span className="bg-[#F2F4F7] text-[#344054] px-2 py-1 rounded-md text-xs font-medium capitalize">
          {internship.type}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-2">
          <button className="border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button className="border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
            <Copy className="h-4 w-4" />
            Clone
          </button>
          {internship.status === "active" && (
            <button className="border border-[#F04438] text-[#F04438] hover:bg-[#FEF3F2] px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
              <X className="h-4 w-4" />
              Close
            </button>
          )}
        </div>
        
        <button className="bg-black hover:bg-gray-800 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
          <Eye className="h-4 w-4" />
          See Applicants
        </button>
      </div>
    </div>
  )
}