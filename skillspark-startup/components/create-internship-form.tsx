"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CalendarIcon, X, Check, CircleCheck, ExternalLink, Building2 } from "lucide-react"
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

const highlights = [
  {
    id: 1,
    feature: "Be clear about learning objectives and outcomes",
  },
  {
    id: 2,
    feature: "Specify required skills and preferred experience",
  },
  {
    id: 3,
    feature: "Include compensation and growth opportunities",
  },
]

const internshipTypes = [
  {
    name: "In-office",
    description: "Traditional office-based internship with in-person collaboration",
    features: [
      { feature: "Direct mentorship and supervision" },
      { feature: "Team collaboration and networking" },
      { feature: "Access to office resources" },
      { feature: "Structured learning environment" },
    ],
    isRecommended: false,
  },
  {
    name: "Remote",
    description: "Flexible remote internship with digital collaboration",
    features: [
      { feature: "Work from anywhere flexibility" },
      { feature: "Digital collaboration tools" },
      { feature: "Self-directed learning" },
      { feature: "Global talent access" },
    ],
    isRecommended: true,
  },
  {
    name: "Hybrid",
    description: "Combination of in-office and remote work",
    features: [
      { feature: "Best of both worlds" },
      { feature: "Flexible schedule options" },
      { feature: "In-person and digital collaboration" },
      { feature: "Balanced work environment" },
    ],
    isRecommended: false,
  },
]

export function CreateInternshipForm({ isVerified = true, onSuccess }: CreateInternshipFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    domains: [] as string[],
    startDate: null as Date | null,
    endDate: null as Date | null,
    duration: "",
    deadline: null as Date | null,
    stipend: "",
    positions: "",
    skills: [] as string[],
    assignmentRequired: false,
    mode: "",
    projectBased: false,
    additionalNotes: ""
  })

  const [selectedType, setSelectedType] = useState(internshipTypes[1])

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
    const submissionData = { ...formData, type: selectedType.name, isDraft: draft }
    console.log("Form submitted:", submissionData)
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form className="space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
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

        {/* Basic Information Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Basic Information
          </h2>
          
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Internship Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Frontend Developer Intern"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  disabled={!isVerified}
                />
              </div>
              <div>
                <Label htmlFor="positions" className="text-sm font-medium text-gray-700">
                  Number of Positions *
                </Label>
                <Input
                  id="positions"
                  name="positions"
                  type="number"
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 2"
                  value={formData.positions}
                  onChange={(e) => setFormData(prev => ({ ...prev, positions: e.target.value }))}
                  disabled={!isVerified}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Job Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                className="mt-2 min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe the role, responsibilities, and learning outcomes..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                disabled={!isVerified}
              />
              <p className="mt-1 text-xs text-gray-500">
                Be specific about what the intern will learn and accomplish
              </p>
            </div>
          </div>
        </div>

        {/* Domain & Skills Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Domain & Skills
          </h2>
          
          <div className="space-y-6">

              {/* Domain and Skills Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-green-600 pl-4">
                  Domain & Skills
                </h3>
                
                {/* Domain Selection */}
                <div>
                <Label className="font-medium">Domain/Category</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <Badge
                      key={domain}
                      variant={formData.domains.includes(domain) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => !isVerified ? null : handleDomainToggle(domain)}
                    >
                      {domain}
                      {formData.domains.includes(domain) && (
                        <X className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Dates and Duration */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="font-medium">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
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
                  <Label className="font-medium">Application Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
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

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="duration" className="font-medium">Duration</Label>
                  <Select 
                    value={formData.duration} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                    disabled={!isVerified}
                  >
                    <SelectTrigger className="mt-2">
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
                  <Label htmlFor="stipend" className="font-medium">Stipend/Compensation</Label>
                  <Input
                    id="stipend"
                    name="stipend"
                    className="mt-2"
                    placeholder="e.g., ₹15,000/month or Unpaid"
                    value={formData.stipend}
                    onChange={(e) => setFormData(prev => ({ ...prev, stipend: e.target.value }))}
                    disabled={!isVerified}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <Label className="font-medium">Required Skills</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => !isVerified ? null : handleSkillToggle(skill)}
                    >
                      {skill}
                      {formData.skills.includes(skill) && (
                        <X className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
              </div>

              {/* Timeline and Compensation Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-purple-600 pl-4">
                  Timeline & Compensation
                </h3>
                
                {/* Dates and Duration - moved from earlier */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="font-medium">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2",
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
                    <Label className="font-medium">Application Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-2",
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

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="duration" className="font-medium">Duration</Label>
                    <Select 
                      value={formData.duration} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                      disabled={!isVerified}
                    >
                      <SelectTrigger className="mt-2">
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
                    <Label htmlFor="stipend" className="font-medium">Stipend/Compensation</Label>
                    <Input
                      id="stipend"
                      name="stipend"
                      className="mt-2"
                      placeholder="e.g., ₹15,000/month or Unpaid"
                      value={formData.stipend}
                      onChange={(e) => setFormData(prev => ({ ...prev, stipend: e.target.value }))}
                      disabled={!isVerified}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-orange-600 pl-4">
                  Additional Options
                </h3>
                <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="assignment"
                    checked={formData.assignmentRequired}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, assignmentRequired: checked }))}
                    disabled={!isVerified}
                  />
                  <Label htmlFor="assignment" className="font-medium">Assignment Required</Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch
                    id="project"
                    checked={formData.projectBased}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, projectBased: checked }))}
                    disabled={!isVerified}
                  />
                  <Label htmlFor="project" className="font-medium">Project-Based Internship</Label>
                </div>
              </div>
              </div>

              {/* Internship Type Selection */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-l-4 border-red-600 pl-4">
                  Internship Type <span className="text-red-500">*</span>
                </h3>
                <RadioGroup
              value={selectedType.name}
              onValueChange={(value) =>
                setSelectedType(
                  internshipTypes.find((type) => type.name === value) || internshipTypes[1]
                )
              }
              className="mt-4 space-y-4"
              disabled={!isVerified}
            >
              {internshipTypes.map((type) => (
                <label
                  key={type.name}
                  htmlFor={type.name}
                  className={cn(
                    "relative block cursor-pointer rounded-md border bg-background transition",
                    selectedType.name === type.name
                      ? "border-primary/20 ring-2 ring-primary/20"
                      : "border-border",
                    !isVerified && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start space-x-4 px-6 py-4">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                      <RadioGroupItem value={type.name} id={type.name} disabled={!isVerified} />
                    </div>
                    <div className="w-full">
                      <p className="leading-6">
                        <span className="font-semibold text-foreground">
                          {type.name}
                        </span>
                        {type.isRecommended && (
                          <Badge variant="secondary" className="ml-2">
                            recommended
                          </Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {type.description}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {type.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check
                              className="h-4 w-4 text-muted-foreground"
                              aria-hidden={true}
                            />
                            {feature.feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </label>
              ))}
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5">
            <Card className="bg-muted">
              <CardContent className="p-6">
                <h4 className="text-sm font-semibold text-foreground">
                  Tips for posting great internships
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Create compelling internship opportunities that attract top talent and provide valuable learning experiences.
                </p>
                <ul className="mt-4 space-y-1">
                  {highlights.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center space-x-2 py-1.5 text-foreground"
                    >
                      <CircleCheck className="h-5 w-5 text-primary" />
                      <span className="truncate text-sm">{item.feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-primary"
                >
                  View internship best practices
                  <ExternalLink className="h-4 w-4" aria-hidden={true} />
                </a>
              </CardContent>
            </Card>

            {/* Company Branding */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">TechCorp</h4>
                    <p className="text-sm text-muted-foreground">Technology Solutions</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company ID:</span>
                    <span className="font-medium">TC001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary" className="text-xs">
                      {isVerified ? "Verified" : "Pending Verification"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Internships:</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-10" />
        
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="ghost" disabled={!isVerified} className="text-black">
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
            Submit for Review
          </Button>
        </div>
      </form>
    </div>
  )
}