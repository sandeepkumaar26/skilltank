"use client"

import React, { useState } from 'react'
import { FilterOptions } from '@/lib/types/hiring'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { X, Filter, MapPin, Clock, GraduationCap, Award, Code, Menu, User } from 'lucide-react'

interface FilterSidebarProps {
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

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const [tagInput, setTagInput] = useState('')

  const handleDomainChange = (domain: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, domain })
    } else {
      onFiltersChange({ ...filters, domain: undefined })
    }
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, location })
    } else {
      onFiltersChange({ ...filters, location: undefined })
    }
  }

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, availability })
    } else {
      onFiltersChange({ ...filters, availability: undefined })
    }
  }

  const handleInstitutionTierChange = (tier: string, checked: boolean) => {
    if (checked) {
      onFiltersChange({ ...filters, institutionTier: tier })
    } else {
      onFiltersChange({ ...filters, institutionTier: undefined })
    }
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

  const handleClearAll = () => {
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

  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filterSections = [
    { id: 'domain', icon: Filter, label: 'Domain' },
    { id: 'location', icon: MapPin, label: 'Location' },
    { id: 'availability', icon: Clock, label: 'Availability' },
    { id: 'tier', icon: GraduationCap, label: 'Institution' },
    { id: 'score', icon: Award, label: 'Score' },
    { id: 'skills', icon: Code, label: 'Skills' }
  ]

  return (
    <div className="w-full bg-[#F3F3F1] h-screen sticky top-0 flex flex-col">
      {/* Logo Area */}
      <div className="flex flex-col items-center pt-8 pb-12">
        <div className="w-8 h-8 mb-3 flex items-center justify-center">
          <svg className="w-6 h-6 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div className="text-[#1A1A1A] font-bold text-sm tracking-wide">
          Skill.Spark
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 flex flex-col items-center space-y-8">
        {filterSections.map((section) => {
          const Icon = section.icon
          const isActive = activeFilter === section.id
          const hasActiveFilters = 
            (section.id === 'domain' && filters.domain) ||
            (section.id === 'location' && filters.location) ||
            (section.id === 'availability' && filters.availability) ||
            (section.id === 'tier' && filters.institutionTier) ||
            (section.id === 'score' && (filters.scoreRange[0] !== 75 || filters.scoreRange[1] !== 100)) ||
            (section.id === 'skills' && filters.tags.length > 0)

          return (
            <button
              key={section.id}
              onClick={() => setActiveFilter(isActive ? null : section.id)}
              className={`
                relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200
                ${isActive || hasActiveFilters 
                  ? 'bg-[#1A1A1A] shadow-lg' 
                  : 'hover:bg-[#E8E8E6]'
                }
              `}
            >
              <Icon 
                className={`w-6 h-6 ${
                  isActive || hasActiveFilters ? 'text-white' : 'text-[#1A1A1A]'
                }`} 
              />
              {hasActiveFilters && !isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#7F56D9] rounded-full"></div>
              )}
            </button>
          )
        })}
      </div>

      {/* Profile & Settings Area */}
      <div className="flex flex-col items-center pb-8 space-y-4">
        <div className="w-10 h-10 rounded-full bg-[#7F56D9] border border-white flex items-center justify-center">
          <span className="text-white text-sm font-medium">A</span>
        </div>
        <button className="w-6 h-6 flex items-center justify-center">
          <svg className="w-4 h-4 text-[#1A1A1A]" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-[#1A1A1A] hover:bg-[#E8E8E6] text-xs px-2 py-1 h-auto"
        >
          Clear
        </Button>
      </div>

      {/* Expanded Filter Panel */}
      {activeFilter && (
        <div className="absolute left-full top-0 w-80 h-screen bg-white shadow-xl border-l border-[#D0D5DD] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1D2939]">
                {filterSections.find(s => s.id === activeFilter)?.label}
              </h3>
              <button
                onClick={() => setActiveFilter(null)}
                className="w-8 h-8 rounded-full hover:bg-[#F2F4F7] flex items-center justify-center"
              >
                <X className="w-4 h-4 text-[#667085]" />
              </button>
            </div>

            {/* Domain Filter */}
            {activeFilter === 'domain' && (
              <div className="space-y-3">
                {DOMAINS.map((domain) => (
                  <div key={domain} className="flex items-center space-x-3">
                    <Checkbox
                      id={`domain-${domain}`}
                      checked={filters.domain === domain}
                      onCheckedChange={(checked) => handleDomainChange(domain, checked as boolean)}
                      className="data-[state=checked]:bg-[#1A1A1A] data-[state=checked]:border-[#1A1A1A]"
                    />
                    <label
                      htmlFor={`domain-${domain}`}
                      className="text-sm text-[#667085] cursor-pointer"
                    >
                      {domain}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Location Filter */}
            {activeFilter === 'location' && (
              <div className="space-y-3">
                {LOCATIONS.map((location) => (
                  <div key={location} className="flex items-center space-x-3">
                    <Checkbox
                      id={`location-${location}`}
                      checked={filters.location === location}
                      onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                      className="data-[state=checked]:bg-[#1A1A1A] data-[state=checked]:border-[#1A1A1A]"
                    />
                    <label
                      htmlFor={`location-${location}`}
                      className="text-sm text-[#667085] cursor-pointer"
                    >
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Availability Filter */}
            {activeFilter === 'availability' && (
              <div className="space-y-3">
                {AVAILABILITY_OPTIONS.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <Checkbox
                      id={`availability-${option}`}
                      checked={filters.availability === option}
                      onCheckedChange={(checked) => handleAvailabilityChange(option, checked as boolean)}
                      className="data-[state=checked]:bg-[#1A1A1A] data-[state=checked]:border-[#1A1A1A]"
                    />
                    <label
                      htmlFor={`availability-${option}`}
                      className="text-sm text-[#667085] cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Institution Tier Filter */}
            {activeFilter === 'tier' && (
              <div className="space-y-3">
                {INSTITUTION_TIERS.map((tier) => (
                  <div key={tier} className="flex items-center space-x-3">
                    <Checkbox
                      id={`tier-${tier}`}
                      checked={filters.institutionTier === tier}
                      onCheckedChange={(checked) => handleInstitutionTierChange(tier, checked as boolean)}
                      className="data-[state=checked]:bg-[#1A1A1A] data-[state=checked]:border-[#1A1A1A]"
                    />
                    <label
                      htmlFor={`tier-${tier}`}
                      className="text-sm text-[#667085] cursor-pointer"
                    >
                      {tier}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Certification Score Range */}
            {activeFilter === 'score' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#667085]">Range</span>
                  <span className="text-sm font-medium text-[#1D2939]">
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
            )}

            {/* Skills Tags */}
            {activeFilter === 'skills' && (
              <div className="space-y-4">
                <Input
                  placeholder="Add skills (e.g., React, Figma)..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  className="h-10 border-[#D0D5DD] rounded-lg focus:border-[#1A1A1A] focus:ring-[#1A1A1A]"
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
                        className="bg-[#1A1A1A] text-white hover:bg-[#333] rounded-full px-3 py-1"
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
            )}
          </div>
        </div>
      )}
    </div>
  )
}