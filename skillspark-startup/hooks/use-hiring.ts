import { useState, useEffect, useMemo } from 'react'
import { Student, FilterOptions } from '@/lib/types/hiring'
import { getStudents, getOverviewStats } from '@/lib/mock-data/students'

export function useHiring() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true)
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setStudents(getStudents())
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [])

  const overviewStats = useMemo(() => getOverviewStats(), [])

  const filterStudents = (filters: FilterOptions): Student[] => {
    return students.filter(student => {
      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const matchesSearch = 
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.college.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Domain filter
      if (filters.domain && student.domain !== filters.domain) return false

      // Location filter
      if (filters.location && student.location !== filters.location) return false

      // Availability filter
      if (filters.availability && student.availability !== filters.availability) return false

      // Institution tier filter
      if (filters.institutionTier && student.institutionTier !== filters.institutionTier) return false

      // Score range filter
      if (student.kaizenScore < filters.scoreRange[0] || student.kaizenScore > filters.scoreRange[1]) return false

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          student.skills.some(skill => skill.toLowerCase().includes(tag.toLowerCase()))
        )
        if (!hasMatchingTag) return false
      }

      return true
    })
  }

  const sendInterviewRequest = async (student: Student, message: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Interview request sent to:', student.email)
      console.log('Message:', message)
      return { success: true }
    } catch (error) {
      console.error('Failed to send interview request:', error)
      throw error
    }
  }

  return {
    students,
    isLoading,
    error,
    overviewStats,
    filterStudents,
    sendInterviewRequest
  }
}