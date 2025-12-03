"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { CalendarIcon, X, Check, Building2 } from "lucide-react"
import { format } from "date-fns"

interface CreateInternshipFormProps {
  isVerified: boolean
  onSuccess?: () => void
}

const domains = [
  "Web Development",
  "Mobile Development", 
  "AI/ML",
  "Data Science",
  "Marketing",
  "Design",
  "Sales",
  "HR",
  "Finance",
  "Operations"
]

const skills = [
  "React", "JavaScript", "Python", "Java", "Node.js", "HTML/CSS", 
  "Figma", "Adobe Creative Suite", "SQL", "Machine Learning",
  "Digital Marketing", "Content Writing", "SEO", "Social Media"
]

const internshipTypes = [
  {
    name: "Remote",
    description: "Work from anywhere with digital collaboration",
    isRecommended: true,
  },
  {
    name: "In-office",
    description: "Traditional office-based internship",
    isRecommended: false,
  },
  {
    name: "Hybrid",
    description: "Combination of remote and in-office work",
    isRecommended: false,
  },
]

export function CreateInternshipFormNew({ isVerified = true, onSuccess }: CreateInternshipFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Remote",
    domains: [] as string[],
    startDate: null as Date | null,
    endDate: null as Date | null,
    duration: "",
    deadline: null as Date | null,
    stipend: "",
    positions: "",
    skills: [] as string[],
    assignmentRequired: false,
    projectBased: false,
    additionalNotes: ""
  })

  const handleDomainToggle = (domain: string) => {
    setFormData(prev => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain]
    }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSubmit = (draft: boolean = false) => {
    const submissionData = { ...formData, isDraft: draft }
    console.log("Form submitted:", submissionData)
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-blue-50">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Internship
            </h1>
            <p className="text-gray-600 mt-1">TechCorp • Company ID: TC001</p>
          </div>
        </div>
        <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
          <p className="text-blue-900 font-medium">Required fields are marked with *</p>
          <p className="text-blue-700 text-sm mt-1">Fill out all sections to create your internship posting</p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Basic Information
          </h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                  Internship Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="e.g., Frontend Developer Intern"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  disabled={!isVerified}
                />
              </div>
              <div>
                <Label htmlFor="positions" className="text-sm font-medium text-gray-700 mb-2 block">
                  Number of Positions *
                </Label>
                <Input
                  id="positions"
                  name="positions"
                  type="number"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="e.g., 2"
                  value={formData.positions}
                  onChange={(e) => setFormData(prev => ({ ...prev, positions: e.target.value }))}
                  disabled={!isVerified}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                Job Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg resize-none"
                placeholder="Describe the role, responsibilities, and what the intern will learn..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                disabled={!isVerified}
              />
              <p className="mt-2 text-xs text-gray-500">
                Be specific about responsibilities, learning outcomes, and growth opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Domain & Skills Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Domain & Skills
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Domain/Category *
              </Label>
              <p className="text-xs text-gray-500 mb-3">Select one or more relevant domains for this internship</p>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <Badge
                    key={domain}
                    variant={formData.domains.includes(domain) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-50 transition-all duration-200 px-3 py-1"
                    onClick={() => !isVerified ? null : handleDomainToggle(domain)}
                  >
                    {domain}
                    {formData.domains.includes(domain) && (
                      <X className="ml-2 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Required Skills *
              </Label>
              <p className="text-xs text-gray-500 mb-3">Choose skills that are essential for this role</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-blue-50 transition-all duration-200 px-3 py-1"
                    onClick={() => !isVerified ? null : handleSkillToggle(skill)}
                  >
                    {skill}
                    {formData.skills.includes(skill) && (
                      <X className="ml-2 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Compensation Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Timeline & Compensation
          </h2>
          
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-300 hover:border-blue-500",
                        !formData.startDate && "text-muted-foreground"
                      )}
                      disabled={!isVerified}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : "Pick start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Application Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-300 hover:border-blue-500",
                        !formData.deadline && "text-muted-foreground"
                      )}
                      disabled={!isVerified}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? format(formData.deadline, "PPP") : "Pick deadline"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2 block">Duration *</Label>
                <Select 
                  value={formData.duration} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                  disabled={!isVerified}
                >
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 weeks</SelectItem>
                    <SelectItem value="8">8 weeks</SelectItem>
                    <SelectItem value="12">12 weeks</SelectItem>
                    <SelectItem value="16">16 weeks</SelectItem>
                    <SelectItem value="24">24 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="stipend" className="text-sm font-medium text-gray-700 mb-2 block">Stipend/Compensation</Label>
                <Input
                  id="stipend"
                  name="stipend"
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  placeholder="e.g., ₹15,000/month or Unpaid"
                  value={formData.stipend}
                  onChange={(e) => setFormData(prev => ({ ...prev, stipend: e.target.value }))}
                  disabled={!isVerified}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Internship Type Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Work Mode *
          </h2>
          
          <RadioGroup
            value={formData.type}
            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
            className="space-y-4"
            disabled={!isVerified}
          >
            {internshipTypes.map((type) => (
              <label
                key={type.name}
                htmlFor={type.name}
                className={cn(
                  "relative block cursor-pointer rounded-lg border bg-white p-4 transition-all hover:border-blue-300",
                  formData.type === type.name
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-gray-200",
                  !isVerified && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    <RadioGroupItem value={type.name} id={type.name} disabled={!isVerified} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{type.name}</span>
                      {type.isRecommended && (
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Additional Options Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-100">
            Additional Options
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <Label htmlFor="assignment" className="text-sm font-medium text-gray-900">
                  Assignment Required
                </Label>
                <p className="text-xs text-gray-500 mt-1">Require candidates to submit an assignment</p>
              </div>
              <Switch
                id="assignment"
                checked={formData.assignmentRequired}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, assignmentRequired: checked }))}
                disabled={!isVerified}
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <Label htmlFor="project" className="text-sm font-medium text-gray-900">
                  Project-Based Internship
                </Label>
                <p className="text-xs text-gray-500 mt-1">Structured around specific project deliverables</p>
              </div>
              <Switch
                id="project"
                checked={formData.projectBased}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, projectBased: checked }))}
                disabled={!isVerified}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6">
          <Button 
            type="button" 
            variant="ghost" 
            disabled={!isVerified} 
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleSubmit(true)}
            disabled={!isVerified}
            style={{ backgroundColor: 'white', color: 'black', borderColor: '#d1d5db' }}
            className="hover:bg-gray-50"
          >
            Save as Draft
          </Button>
          <Button 
            type="button" 
            onClick={() => handleSubmit(false)}
            disabled={!isVerified}
            style={{ backgroundColor: 'white', color: 'black', borderColor: '#d1d5db' }}
            className="hover:bg-gray-50"
          >
            Publish Internship
          </Button>
        </div>
      </form>
    </div>
  )
}