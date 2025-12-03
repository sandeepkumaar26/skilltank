"use client"

import React, { useState } from 'react'
import { Student } from '@/lib/types/hiring'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'

interface InterviewModalProps {
  student: Student | null
  isOpen: boolean
  onClose: () => void
  onSendInvite: (student: Student, message: string) => void
}

export function InterviewModal({ student, isOpen, onClose, onSendInvite }: InterviewModalProps) {
  const [message, setMessage] = useState('')

  React.useEffect(() => {
    if (student && isOpen) {
      setMessage(`Hi ${student.name},

We're impressed with your Kaizen performance (${student.kaizenScore}%) and would like to invite you for an interview for our internship program.

We believe your skills in ${student.skills.slice(0, 3).join(', ')} would be a great fit for our team.

Please let us know your availability for the coming week. You can schedule a time that works for you using our calendar link: [Calendar Link]

Looking forward to speaking with you!

Best regards,
TechCorp Hiring Team`)
    }
  }, [student, isOpen])

  const handleSendInvite = () => {
    if (student) {
      onSendInvite(student, message)
      onClose()
      setMessage('')
    }
  }

  const handleClose = () => {
    onClose()
    setMessage('')
  }

  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-white rounded-xl p-6 border border-[#D0D5DD]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold text-[#1D2939]">
            Send Interview Invitation to {student.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="w-8 h-8 p-0 rounded-lg hover:bg-[#F2F4F7]"
          >
            <X className="w-4 h-4 text-[#667085]" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#1D2939] block mb-2">
              Message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px] border-[#D0D5DD] rounded-lg focus:border-[#7F56D9] focus:ring-[#7F56D9] resize-none"
              placeholder="Write your interview invitation message..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-[#D0D5DD] text-[#667085] hover:bg-[#F2F4F7] rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendInvite}
              className="bg-[#7F56D9] hover:bg-[#6941C6] text-white rounded-lg"
            >
              Send Invite
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}