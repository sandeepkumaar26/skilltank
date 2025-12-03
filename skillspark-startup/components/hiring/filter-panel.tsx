"use client"

import React, { useState } from 'react'
import { FilterOptions } from '@/lib/types/hiring'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'

interface FilterPanelProps {
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

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
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

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      handleAddTag(tagInput.trim())
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 border border-[#D0D5DD] shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        {/* Search Bar */}
        <div className="lg:col-span-3">
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

        {/* Domain Filter */}
        <div className="lg:col-span-2">
          <Select value={filters.domain || 'all'} onValueChange={handleDomainChange}>
            <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
              <SelectValue placeholder="Domain" />
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
        <div className="lg:col-span-2">
          <Select value={filters.location || 'all'} onValueChange={handleLocationChange}>
            <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
              <SelectValue placeholder="Location" />
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
        <div className="lg:col-span-2">
          <Select value={filters.availability || 'all'} onValueChange={handleAvailabilityChange}>
            <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
              <SelectValue placeholder="Availability" />
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
        <div className="lg:col-span-2">
          <Select value={filters.institutionTier || 'all'} onValueChange={handleInstitutionTierChange}>
            <SelectTrigger className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]">
              <SelectValue placeholder="Institution Tier" />
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

        {/* Reset Button */}
        <div className="lg:col-span-1">
          <Button
            variant="outline"
            onClick={() => onFiltersChange({
              searchTerm: '',
              domain: undefined,
              location: undefined,
              availability: undefined,
              institutionTier: undefined,
              scoreRange: [75, 100],
              tags: []
            })}
            className="h-11 w-full border-[#D0D5DD] text-[#667085] hover:bg-[#F2F4F7] rounded-lg"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Score Range Slider */}
      <div className="mt-6 space-y-3">
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
      <div className="mt-6 space-y-3">
        <label className="text-sm font-medium text-[#1D2939]">
          Skills Tags
        </label>
        <div className="space-y-3">
          <Input
            placeholder="Add skills (e.g., React, Figma)..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagInputKeyPress}
            className="h-11 border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9]"
          />
          
          {/* Common Tags */}
          <div className="flex flex-wrap gap-2">
            {COMMON_TAGS.filter(tag => !filters.tags.includes(tag)).slice(0, 8).map((tag) => (
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
    </div>
  )
}