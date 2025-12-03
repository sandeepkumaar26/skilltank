"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { DatePicker } from "@/components/ui/date-picker"
import { TagsInput } from "@/components/post-internship/tags-input"
import { WarningBanner } from "@/components/post-internship/warning-banner"
import { SuccessToast } from "@/components/post-internship/success-toast"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  title: string
  category: string
  type: "on-site" | "remote" | "hybrid" | ""
  location: string
  duration: string
  startDate: Date | undefined
  applicationDeadline: Date | undefined
  responsibilities: string
  requiredSkills: string[]
  preferredQualifications: string
  benefits: string
  minimumEducation: string
  premiumOnly: boolean
  maxApplications: string
  stipend: string
  workingHours: string
  timings: string
  resumeRequired: boolean
  portfolioRequired: boolean
  allowAssignments: boolean
  screeningQuestions: string
}

export function CreateInternshipForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    type: "",
    location: "",
    duration: "",
    startDate: undefined,
    applicationDeadline: undefined,
    responsibilities: "",
    requiredSkills: [],
    preferredQualifications: "",
    benefits: "",
    minimumEducation: "",
    premiumOnly: false,
    maxApplications: "",
    stipend: "",
    workingHours: "",
    timings: "",
    resumeRequired: true,
    portfolioRequired: false,
    allowAssignments: false,
    screeningQuestions: ""
  })

  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [isVerified] = useState(true) // Mock verification status

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (isDraft: boolean = false) => {
    // Mock submission logic
    if (!isDraft) {
      setShowSuccessToast(true)
      setTimeout(() => setShowSuccessToast(false), 5000)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      type: "",
      location: "",
      duration: "",
      startDate: undefined,
      applicationDeadline: undefined,
      responsibilities: "",
      requiredSkills: [],
      preferredQualifications: "",
      benefits: "",
      minimumEducation: "",
      premiumOnly: false,
      maxApplications: "",
      stipend: "",
      workingHours: "",
      timings: "",
      resumeRequired: true,
      portfolioRequired: false,
      allowAssignments: false,
      screeningQuestions: ""
    })
  }

  return (
    <div className="space-y-6 w-full">
      {/* Warning Banner for unverified companies */}
      {!isVerified && <WarningBanner />}

      {/* Success Toast */}
      {showSuccessToast && <SuccessToast />}

      {/* Basic Details Card */}
      <div className="bg-white rounded-xl border border-[#D0D5DD] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1D2939] mb-6">
          Basic Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-[#1D2939]">
              Internship Title *
            </Label>
            <div className="relative">
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Frontend Developer Intern"
                className="h-11 rounded-lg border-[#D0D5DD]"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
              >
                <Sparkles className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium text-[#1D2939]">
              Category/Domain *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="h-11 rounded-lg border-[#D0D5DD]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#1D2939]">Type *</Label>
            <RadioGroup
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="on-site" id="on-site" className="border-[#D0D5DD]" />
                <Label htmlFor="on-site" className="text-sm text-[#1D2939]">On-site</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="remote" id="remote" className="border-[#D0D5DD]" />
                <Label htmlFor="remote" className="text-sm text-[#1D2939]">Remote</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" className="border-[#D0D5DD]" />
                <Label htmlFor="hybrid" className="text-sm text-[#1D2939]">Hybrid</Label>
              </div>
            </RadioGroup>
          </div>

          {(formData.type === "on-site" || formData.type === "hybrid") && (
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-[#1D2939]">
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., San Francisco, CA"
                className="h-11 rounded-lg border-[#D0D5DD]"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium text-[#1D2939]">
              Duration *
            </Label>
            <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
              <SelectTrigger className="h-11 rounded-lg border-[#D0D5DD]">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="2-months">2 Months</SelectItem>
                <SelectItem value="3-months">3 Months</SelectItem>
                <SelectItem value="6-months">6 Months</SelectItem>
                <SelectItem value="12-months">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DatePicker
            id="startDate"
            label="Start Date"
            placeholder="Select start date"
            value={formData.startDate}
            onChange={(date) => handleInputChange("startDate", date)}
            required
          />

          <DatePicker
            id="applicationDeadline"
            label="Application Deadline"
            placeholder="Select deadline"
            value={formData.applicationDeadline}
            onChange={(date) => handleInputChange("applicationDeadline", date)}
            required
          />
        </div>
      </div>

      {/* Internship Description Card */}
      <div className="bg-white rounded-xl border border-[#D0D5DD] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1D2939] mb-6">
          Internship Description
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="responsibilities" className="text-sm font-medium text-[#1D2939]">
              Responsibilities *
            </Label>
            <div className="relative">
              <Textarea
                id="responsibilities"
                value={formData.responsibilities}
                onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                placeholder="Describe the key responsibilities and tasks..."
                className="min-h-24 rounded-lg border-[#D0D5DD]"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-2 h-6 w-6"
              >
                <Sparkles className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1D2939]">
              Required Skills *
            </Label>
            <TagsInput
              value={formData.requiredSkills}
              onChange={(skills) => handleInputChange("requiredSkills", skills)}
              placeholder="Type a skill and press Enter"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualifications" className="text-sm font-medium text-[#1D2939]">
              Preferred Qualifications
            </Label>
            <Textarea
              id="qualifications"
              value={formData.preferredQualifications}
              onChange={(e) => handleInputChange("preferredQualifications", e.target.value)}
              placeholder="Any preferred qualifications or experience..."
              className="min-h-20 rounded-lg border-[#D0D5DD]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits" className="text-sm font-medium text-[#1D2939]">
              Benefits/Perks
            </Label>
            <Textarea
              id="benefits"
              value={formData.benefits}
              onChange={(e) => handleInputChange("benefits", e.target.value)}
              placeholder="List any benefits, perks, or learning opportunities..."
              className="min-h-20 rounded-lg border-[#D0D5DD]"
            />
          </div>
        </div>
      </div>

      {/* Eligibility & Criteria Card */}
      <div className="bg-white rounded-xl border border-[#D0D5DD] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1D2939] mb-6">
          Eligibility & Criteria
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="education" className="text-sm font-medium text-[#1D2939]">
                Minimum Education Level *
              </Label>
              <Select value={formData.minimumEducation} onValueChange={(value) => handleInputChange("minimumEducation", value)}>
                <SelectTrigger className="h-11 rounded-lg border-[#D0D5DD]">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxApplications" className="text-sm font-medium text-[#1D2939]">
                Maximum Applications
              </Label>
              <Input
                id="maxApplications"
                type="number"
                value={formData.maxApplications}
                onChange={(e) => handleInputChange("maxApplications", e.target.value)}
                placeholder="e.g., 100"
                className="h-11 rounded-lg border-[#D0D5DD]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-[#1D2939]">
                Premium Access Only?
              </Label>
              <p className="text-sm text-[#667085]">
                Only allow Kaizen-certified students to apply
              </p>
            </div>
            <Switch
              checked={formData.premiumOnly}
              onCheckedChange={(checked) => handleInputChange("premiumOnly", checked)}
              className="data-[state=checked]:bg-black"
            />
          </div>
        </div>
      </div>

      {/* Stipend & Availability Card */}
      <div className="bg-white rounded-xl border border-[#D0D5DD] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1D2939] mb-6">
          Stipend & Availability
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="stipend" className="text-sm font-medium text-[#1D2939]">
              Stipend
            </Label>
            <Input
              id="stipend"
              value={formData.stipend}
              onChange={(e) => handleInputChange("stipend", e.target.value)}
              placeholder="e.g., $1000/month"
              className="h-11 rounded-lg border-[#D0D5DD]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workingHours" className="text-sm font-medium text-[#1D2939]">
              Working Hours
            </Label>
            <Input
              id="workingHours"
              value={formData.workingHours}
              onChange={(e) => handleInputChange("workingHours", e.target.value)}
              placeholder="e.g., 40 hours/week"
              className="h-11 rounded-lg border-[#D0D5DD]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timings" className="text-sm font-medium text-[#1D2939]">
              Timings
            </Label>
            <Input
              id="timings"
              value={formData.timings}
              onChange={(e) => handleInputChange("timings", e.target.value)}
              placeholder="e.g., 9 AM - 5 PM PST"
              className="h-11 rounded-lg border-[#D0D5DD]"
            />
          </div>
        </div>
      </div>

      {/* Application Requirements Card */}
      <div className="bg-white rounded-xl border border-[#D0D5DD] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1D2939] mb-6">
          Application Requirements
        </h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-[#1D2939]">
                Resume Required?
              </Label>
              <Switch
                checked={formData.resumeRequired}
                onCheckedChange={(checked) => handleInputChange("resumeRequired", checked)}
                className="data-[state=checked]:bg-black"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-[#1D2939]">
                Portfolio/GitHub Link Required?
              </Label>
              <Switch
                checked={formData.portfolioRequired}
                onCheckedChange={(checked) => handleInputChange("portfolioRequired", checked)}
                className="data-[state=checked]:bg-black"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-[#1D2939]">
                Allow Assignment Uploads?
              </Label>
              <Switch
                checked={formData.allowAssignments}
                onCheckedChange={(checked) => handleInputChange("allowAssignments", checked)}
                className="data-[state=checked]:bg-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="screening" className="text-sm font-medium text-[#1D2939]">
              Short Screening Question(s)
            </Label>
            <Textarea
              id="screening"
              value={formData.screeningQuestions}
              onChange={(e) => handleInputChange("screeningQuestions", e.target.value)}
              placeholder="Optional screening questions for applicants..."
              className="min-h-20 rounded-lg border-[#D0D5DD]"
            />
          </div>
        </div>
      </div>

      {/* Sticky Footer Controls */}
      <div className="sticky bottom-0 bg-white border-t border-[#D0D5DD] shadow-lg p-4 rounded-t-lg">
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={resetForm}
            className="text-[#667085] hover:text-[#1D2939]"
          >
            Reset Form
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSubmit(true)}
            className="border-black text-black hover:bg-gray-100"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit(false)}
            disabled={!isVerified}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Publish Internship
          </Button>
        </div>
      </div>
    </div>
  )
}