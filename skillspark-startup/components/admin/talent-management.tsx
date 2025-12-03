"use client"

import React, { useState } from 'react'
import { PendingStudent, Student } from '@/lib/types/hiring'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  ExternalLink,
  AlertCircle,
  Users,
  Clock,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import { format } from 'date-fns'

interface TalentManagementProps {
  pendingStudents: PendingStudent[]
  certifiedStudents: Student[]
  onApproveStudent: (studentId: string) => void
  onRejectStudent: (studentId: string) => void
  onRevokeAccess: (studentId: string) => void
}

export function TalentManagement({
  pendingStudents,
  certifiedStudents,
  onApproveStudent,
  onRejectStudent,
  onRevokeAccess
}: TalentManagementProps) {
  const [selectedStudent, setSelectedStudent] = useState<PendingStudent | null>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const handleReviewApplication = (student: PendingStudent) => {
    setSelectedStudent(student)
    setIsReviewModalOpen(true)
  }

  const handleApprove = () => {
    if (selectedStudent) {
      onApproveStudent(selectedStudent.id)
      setIsReviewModalOpen(false)
      setSelectedStudent(null)
    }
  }

  const handleReject = () => {
    if (selectedStudent) {
      onRejectStudent(selectedStudent.id)
      setIsReviewModalOpen(false)
      setSelectedStudent(null)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const pendingCount = pendingStudents.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1D2939]">Talent Management</h1>
        <p className="text-[#667085] mt-1">
          Manage and verify the certified talent pool
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#F2F4F7] rounded-lg p-1">
          <TabsTrigger 
            value="pending" 
            className="relative data-[state=active]:bg-white data-[state=active]:text-[#1D2939] text-[#667085] rounded-md"
          >
            Pending Approval
            {pendingCount > 0 && (
              <Badge className="ml-2 bg-[#F79009] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center p-0">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="certified" 
            className="data-[state=active]:bg-white data-[state=active]:text-[#1D2939] text-[#667085] rounded-md"
          >
            Certified Talent
          </TabsTrigger>

        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="bg-white rounded-xl border border-[#D0D5DD] shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#D0D5DD]">
                  <TableHead className="text-[#667085] font-medium">Student</TableHead>
                  <TableHead className="text-[#667085] font-medium">College</TableHead>
                  <TableHead className="text-[#667085] font-medium">Score</TableHead>
                  <TableHead className="text-[#667085] font-medium">Submitted On</TableHead>
                  <TableHead className="text-[#667085] font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingStudents.map((student) => (
                  <TableRow key={student.id} className="border-b border-[#D0D5DD] hover:bg-[#F8F9FA]">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-[#E9E7FD] text-[#7F56D9] font-semibold text-sm">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#1D2939]">{student.name}</p>
                          <p className="text-sm text-[#667085]">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#1D2939]">{student.college}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.kaizenScore >= 90 ? "default" : "secondary"}
                        className={student.kaizenScore >= 90 ? "bg-[#7F56D9] text-white" : "bg-[#F2F4F7] text-[#1D2939]"}
                      >
                        {student.kaizenScore}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#667085]">
                      {format(new Date(student.submittedOn), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReviewApplication(student)}
                        className="border-[#D0D5DD] text-[#667085] hover:bg-[#F2F4F7] rounded-lg"
                      >
                        Review Application
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="certified" className="mt-6">
          <div className="bg-white rounded-xl border border-[#D0D5DD] shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#D0D5DD]">
                  <TableHead className="text-[#667085] font-medium">Student</TableHead>
                  <TableHead className="text-[#667085] font-medium">College</TableHead>
                  <TableHead className="text-[#667085] font-medium">Domain</TableHead>
                  <TableHead className="text-[#667085] font-medium">Score</TableHead>
                  <TableHead className="text-[#667085] font-medium">Status</TableHead>
                  <TableHead className="text-[#667085] font-medium">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifiedStudents.map((student) => (
                  <TableRow key={student.id} className="border-b border-[#D0D5DD] hover:bg-[#F8F9FA]">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-[#E9E7FD] text-[#7F56D9] font-semibold text-sm">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[#1D2939]">{student.name}</p>
                          <p className="text-sm text-[#667085]">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#1D2939]">{student.college}</TableCell>
                    <TableCell className="text-[#1D2939]">{student.domain}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={student.kaizenScore >= 90 ? "default" : "secondary"}
                        className={student.kaizenScore >= 90 ? "bg-[#7F56D9] text-white" : "bg-[#F2F4F7] text-[#1D2939]"}
                      >
                        {student.kaizenScore}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#FFFAEB] border border-[#F79009] text-[#B54708] rounded-full">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Premium Certified
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRevokeAccess(student.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Revoke Access
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>


      </Tabs>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="sm:max-w-4xl bg-white rounded-xl border border-[#D0D5DD]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#1D2939]">
              Review Application - {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedStudent && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - Submitted Data */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1D2939]">Submitted Data</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#D0D5DD]">
                    <h4 className="font-medium text-[#1D2939] mb-2">Assignment Submissions</h4>
                    <div className="space-y-2">
                      {selectedStudent.assignmentSubmissions.map((submission, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-[#D0D5DD] text-[#667085] hover:bg-white"
                          asChild
                        >
                          <a href={submission} download>
                            <Download className="w-4 h-4 mr-2" />
                            Assignment {index + 1}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#D0D5DD]">
                    <h4 className="font-medium text-[#1D2939] mb-2">Completion Certificate</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-[#D0D5DD] text-[#667085] hover:bg-white"
                      asChild
                    >
                      <a href={selectedStudent.completionCertificate} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Certificate
                      </a>
                    </Button>
                  </div>

                  <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#D0D5DD]">
                    <h4 className="font-medium text-[#1D2939] mb-2">Plagiarism Check</h4>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-[#1D2939]">
                        {selectedStudent.plagiarismCheck.details}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Student Profile */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1D2939]">Student Profile</h3>
                
                <div className="p-4 bg-[#F8F9FA] rounded-lg border border-[#D0D5DD]">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
                      <AvatarFallback className="bg-[#E9E7FD] text-[#7F56D9] font-semibold">
                        {getInitials(selectedStudent.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold text-[#1D2939]">{selectedStudent.name}</h4>
                      <p className="text-[#667085]">{selectedStudent.college}</p>
                      <p className="text-sm text-[#667085]">{selectedStudent.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-[#1D2939]">Kaizen Score:</span>
                      <Badge 
                        variant={selectedStudent.kaizenScore >= 90 ? "default" : "secondary"}
                        className={selectedStudent.kaizenScore >= 90 ? "bg-[#7F56D9] text-white" : "bg-[#F2F4F7] text-[#1D2939]"}
                      >
                        {selectedStudent.kaizenScore}%
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-[#1D2939]">Domain:</span>
                      <p className="text-sm text-[#667085] mt-1">{selectedStudent.domain}</p>
                    </div>

                    <div>
                      <span className="text-sm font-medium text-[#1D2939]">Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedStudent.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-[#F2F4F7] text-[#1D2939] text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve & Add to Pool
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}