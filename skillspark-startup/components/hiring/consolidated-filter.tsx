"use client"

import React, { useState } from 'react'
import { FilterOptions } from '@/lib/types/hiring'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Search, X, Filter, ChevronDown } from 'lucide-react'

interface ConsolidatedFilterProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

const DOMAINS = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'Backend Development',
  'Frontend Development',
  'DevOps'
]

const LOCATIONS = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Goa'
]

const AVAILABILITY_OPTIONS = [
  'Immediately',
  '1 week',
  '2 weeks',
  '1 month'
]

const INSTITUTION_TIERS = [
  'Tier 1',
  'Tier 2',
  'Tier 3'
]

const COMMON_TAGS = [
  'React', 'JavaScript', 'Python', 'Java', 'TypeScript', 'Node.js',
  'Figma', 'Adobe XD', 'TensorFlow', 'AWS', 'Docker', 'MongoDB',
  'Flutter', 'Swift', 'Kotlin', 'Vue.js', 'Angular', 'GraphQL'
]

export function ConsolidatedFilter({ filters, onFiltersChange }: ConsolidatedFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tagInput, setTagInput] = useState('')

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value })
  }

  const handleDomainChange = (value: string) => {
    onFiltersChange({ ...filters, domain: value === 'all' ? undefined : value })
  }

  const handleLocationChange = (value: string) => {
    onFiltersChange({ ...filters, location: value === 'all' ? undefined : value })
  }

  const handleAvailabilityChange = (value: string) => {
    onFiltersChange({ ...filters, availability: value === 'all' ? undefined : value })
  }

  const handleInstitutionTierChange = (value: string) => {
    onFiltersChange({ ...filters, institutionTier: value === 'all' ? undefined : value })
  }

  const handleScoreRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, scoreRange: [value[0], value[1] || 100] })
  }

  const handleAddTag = (tag: string) => {
    if (tag && !filters.tags.includes(tag)) {
      onFiltersChange({ ...filters, tags: [...filters.tags, tag] })
    }
    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onFiltersChange({ 
      ...filters, 
      tags: filters.tags.filter(tag => tag !== tagToRemove) 
    })
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      handleAddTag(tagInput.trim())
    }
  }

  const handleReset = () => {
    onFiltersChange({
      searchTerm: '',
      domain: undefined,
      location: undefined,
      availability: undefined,
      institutionTier: undefined,
      scoreRange: [75, 100],
      tags: []
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.searchTerm) count++
    if (filters.domain) count++
    if (filters.location) count++
    if (filters.availability) count++
    if (filters.institutionTier) count++
    if (filters.scoreRange[0] !== 75 || filters.scoreRange[1] !== 100) count++
    if (filters.tags.length > 0) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className="flex items-center gap-4">
      {/* Search Bar - Always visible */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#667085]" />
          <Input
            placeholder="Search by Name, Email, College..."
            value={filters.searchTerm || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]"
          />
        </div>
      </div>

      {/* Filter Button */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-11 px-4 border-[#D0D5DD] text-[#667085] hover:bg-[#F2F4F7] rounded-lg flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
            {activeFiltersCount > 0 && (
              <Badge className="bg-[#7F56D9] text-white text-xs px-2 py-0.5 rounded-full ml-1">
                {activeFiltersCount}
              </Badge>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-6" align="end">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1D2939]">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-[#667085] hover:text-[#1D2939]"
              >
                Reset
              </Button>
            </div>

            {/* Domain Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D2939]">Domain</label>
              <Select value={filters.domain || 'all'} onValueChange={handleDomainChange}>
                <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
                  <SelectValue placeholder="All Domains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {DOMAINS.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D2939]">Location</label>
              <Select value={filters.location || 'all'} onValueChange={handleLocationChange}>
                <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Availability Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D2939]">Availability</label>
              <Select value={filters.availability || 'all'} onValueChange={handleAvailabilityChange}>
                <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
                  <SelectValue placeholder="All Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Institution Tier Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1D2939]">Institution Tier</label>
              <Select value={filters.institutionTier || 'all'} onValueChange={handleInstitutionTierChange}>
                <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
                  <SelectValue placeholder="All Tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  {INSTITUTION_TIERS.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Score Range Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#1D2939]">
                  Certification Score Range
                </label>
                <span className="text-sm text-[#667085]">
                  {filters.scoreRange[0]}% - {filters.scoreRange[1]}%
                </span>
              </div>
              <Slider
                value={filters.scoreRange}
                onValueChange={handleScoreRangeChange}
                max={100}
                min={75}
                step={1}
                className="w-full"
              />
            </div>

            {/* Tags Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#1D2939]">
                Skills Tags
              </label>
              <div className="space-y-3">
                <Input
                  placeholder="Add skills (e.g., React, Figma)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]"
                />
                
                {/* Common Tags */}
                <div className="flex flex-wrap gap-2">
                  {COMMON_TAGS.filter(tag => !filters.tags.includes(tag)).slice(0, 6).map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddTag(tag)}
                      className="h-7 px-3 text-xs border-[#D0D5DD] text-[#667085] hover:bg-[#F2F4F7] rounded-full"
                    >
                      + {tag}
                    </Button>
                  ))}
                </div>

                {/* Selected Tags */}
                {filters.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {filters.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#7F56D9] text-white hover:bg-[#6941C6] rounded-full px-3 py-1"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Apply Button */}
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full h-11 bg-[#7F56D9] hover:bg-[#6941C6] text-white rounded-lg"
            >
              Apply Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}