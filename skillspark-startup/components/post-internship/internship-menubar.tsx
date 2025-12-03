"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  FileText, 
  ChevronDown, 
  Filter,
  Download,
  Search
} from "lucide-react"

interface InternshipMenubarProps {
  onCreateNew: () => void
}

export function InternshipMenubar({ 
  onCreateNew
}: InternshipMenubarProps) {
  return (
    <div className="w-full mb-6">
      {/* Main Menubar - All elements in one row without card wrapper */}
      <div className="flex h-12 items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#667085]" />
            <input
              type="text"
              placeholder="Search internships..."
              className="h-10 w-64 pl-10 pr-4 text-sm border border-[#D0D5DD] rounded-md bg-white text-[#1D2939] placeholder-[#667085] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section - Filters and Create Button */}
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 px-3 text-[#667085] hover:text-[#1D2939]">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#12B76A] mr-2" />
                  Active
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#667085] mr-2" />
                  Draft
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[#F04438] mr-2" />
                  Closed
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 px-3 text-[#667085] hover:text-[#1D2939]">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 px-3 text-[#667085] hover:text-[#1D2939]">
                All Status
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>All Status</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
              <DropdownMenuItem>Closed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 px-3 text-[#667085] hover:text-[#1D2939]">
                All Domains
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>All Domains</DropdownMenuItem>
              <DropdownMenuItem>Engineering</DropdownMenuItem>
              <DropdownMenuItem>Design</DropdownMenuItem>
              <DropdownMenuItem>Marketing</DropdownMenuItem>
              <DropdownMenuItem>Sales</DropdownMenuItem>
              <DropdownMenuItem>Operations</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-10 px-3 text-[#667085] hover:text-[#1D2939]">
                Newest First
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Most Applications</DropdownMenuItem>
              <DropdownMenuItem>Least Applications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-6" />

          <Button
            onClick={onCreateNew}
            className="h-10 px-4 text-sm font-medium bg-black text-white shadow-sm hover:bg-gray-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Internship
          </Button>
        </div>
      </div>
    </div>
  )
}