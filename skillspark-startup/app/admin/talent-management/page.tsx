"use client"

import React, { useState } from 'react'
import { TalentManagement } from '@/components/admin/talent-management'
import { getPendingStudents, getStudents } from '@/lib/mock-data/students'
import { PendingStudent, Student } from '@/lib/types/hiring'

export default function TalentManagementPage() {
  const [pendingStudents, setPendingStudents] = useState<PendingStudent[]>(getPendingStudents())
  const [certifiedStudents, setCertifiedStudents] = useState<Student[]>(getStudents())

  const handleApproveStudent = (studentId: string) => {
    const student = pendingStudents.find(s => s.id === studentId)
    if (student) {
      // Remove from pending
      setPendingStudents(prev => prev.filter(s => s.id !== studentId))
      
      // Add to certified with premium status
      const certifiedStudent: Student = {
        ...student,
        isPremium: true
      }
      setCertifiedStudents(prev => [...prev, certifiedStudent])
      
      console.log('Student approved:', student.name)
    }
  }

  const handleRejectStudent = (studentId: string) => {
    const student = pendingStudents.find(s => s.id === studentId)
    if (student) {
      setPendingStudents(prev => prev.filter(s => s.id !== studentId))
      console.log('Student rejected:', student.name)
    }
  }

  const handleRevokeAccess = (studentId: string) => {
    const student = certifiedStudents.find(s => s.id === studentId)
    if (student) {
      setCertifiedStudents(prev => 
        prev.map(s => 
          s.id === studentId 
            ? { ...s, isPremium: false }
            : s
        )
      )
      console.log('Premium access revoked for:', student.name)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="container mx-auto py-8">
        <TalentManagement
          pendingStudents={pendingStudents}
          certifiedStudents={certifiedStudents}
          onApproveStudent={handleApproveStudent}
          onRejectStudent={handleRejectStudent}
          onRevokeAccess={handleRevokeAccess}
        />
      </div>
    </div>
  )
}