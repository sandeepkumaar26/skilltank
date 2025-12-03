"use client"

import React from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'

interface SearchSortBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  totalResults: number
  currentPage: number
  resultsPerPage: number
}

export function SearchSortBar({ 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  totalResults,
  currentPage,
  resultsPerPage
}: SearchSortBarProps) {
  const startResult = (currentPage - 1) * resultsPerPage + 1
  const endResult = Math.min(currentPage * resultsPerPage, totalResults)

  return (
    <div className="flex items-center justify-between py-4 border-b border-[#F2F4F7] mb-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#667085]" />
          <Input
            placeholder="Search by Name, Email, College..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]"
          />
        </div>
      </div>

      {/* Sort and Results Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#667085]">Sort by:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48 h-10 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="score-high">Score: High to Low</SelectItem>
              <SelectItem value="score-low">Score: Low to High</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-[#667085]">
          Showing <span className="font-medium text-[#1D2939]">{startResult}-{endResult}</span> of{' '}
          <span className="font-medium text-[#1D2939]">{totalResults.toLocaleString()}</span> talent profiles
        </div>
      </div>
    </div>
  )
}