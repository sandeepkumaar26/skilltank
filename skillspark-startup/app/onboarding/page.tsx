'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AlertCircle, Loader2, GraduationCap, Building2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

type UserRole = 'student' | 'startup'

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('')
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    collegeName: '',
    course: '',
    yearOfStudy: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, updateProfile } = useAuth()
  const router = useRouter()

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setError('')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select your role')
      return
    }

    if (!formData.fullName) {
      setError('Please enter your full name')
      return
    }

    if (selectedRole === 'startup' && !formData.companyName) {
      setError('Please enter your company name')
      return
    }

    if (selectedRole === 'student' && (!formData.collegeName || !formData.course)) {
      setError('Please fill in all student details')
      return
    }

    setLoading(true)
    setError('')

    try {
      const updates = {
        role: selectedRole,
        full_name: formData.fullName,
        ...(selectedRole === 'startup' && { company_name: formData.companyName }),
        ...(selectedRole === 'student' && {
          college_name: formData.collegeName,
          course: formData.course,
          year_of_study: formData.yearOfStudy ? parseInt(formData.yearOfStudy) : null,
        }),
      }

      const { error } = await updateProfile(updates)

      if (error) {
        setError(error.message)
      } else {
        // Redirect will be handled by AuthContext based on role
        router.push('/')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    router.push('/auth')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to SkillSpark!</CardTitle>
          <CardDescription>
            Let's set up your profile to get you started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">I am a:</Label>
            <RadioGroup
              value={selectedRole}
              onValueChange={(value) => handleRoleSelect(value as UserRole)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="student" id="student" className="peer sr-only" />
                <Label
                  htmlFor="student"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <GraduationCap className="mb-3 h-8 w-8" />
                  <div className="text-center">
                    <div className="font-medium">Student</div>
                    <div className="text-sm text-muted-foreground">
                      Looking for opportunities
                    </div>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="startup" id="startup" className="peer sr-only" />
                <Label
                  htmlFor="startup"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Building2 className="mb-3 h-8 w-8" />
                  <div className="text-center">
                    <div className="font-medium">Startup/Company</div>
                    <div className="text-sm text-muted-foreground">
                      Hiring talent and posting opportunities
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Basic Info */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Role-specific fields */}
          {selectedRole === 'startup' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter your company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {selectedRole === 'student' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="collegeName">College/University *</Label>
                <Input
                  id="collegeName"
                  placeholder="Enter your college or university name"
                  value={formData.collegeName}
                  onChange={(e) => handleInputChange('collegeName', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course/Major *</Label>
                <Input
                  id="course"
                  placeholder="e.g., Computer Science, Business Administration"
                  value={formData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearOfStudy">Year of Study</Label>
                <Select
                  value={formData.yearOfStudy}
                  onValueChange={(value) => handleInputChange('yearOfStudy', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Year</SelectItem>
                    <SelectItem value="2">2nd Year</SelectItem>
                    <SelectItem value="3">3rd Year</SelectItem>
                    <SelectItem value="4">4th Year</SelectItem>
                    <SelectItem value="5">5th Year</SelectItem>
                    <SelectItem value="6">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={loading || !selectedRole}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Complete Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}