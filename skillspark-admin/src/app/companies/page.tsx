"use client"

import * as React from "react"
import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  MapPin,
  Users,
  Crown,
  Shield,
  ShieldX,
  Settings,
  FileText,
  Calendar,
  Globe,
  AlertTriangle,
  Lock,
  Unlock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Company {
  id: string
  name: string
  email: string
  logo?: string
  industry: string
  location: string
  website: string
  verificationStatus: "verified" | "pending" | "rejected"
  tier: "basic" | "premium" | "enterprise"
  employeeCount: string
  joinDate: string
  activeJobs: number
  isBlocked?: boolean
  domain?: string
  incorporationDocs?: string
  contactPerson?: string
  phone?: string
  description?: string
  accessFeatures?: {
    premiumInterns: boolean
    analytics: boolean
    prioritySupport: boolean
    bulkPosting: boolean
  }
}

const mockCompanies: Company[] = [
  {
    id: "COM001234",
    name: "TechCorp Inc.",
    email: "hr@techcorp.com",
    logo: "/logos/techcorp.png",
    industry: "Software Development",
    location: "San Francisco, CA",
    website: "www.techcorp.com",
    verificationStatus: "verified",
    tier: "premium",
    employeeCount: "500-1000",
    joinDate: "2024-01-10",
    activeJobs: 12,
    isBlocked: false,
    domain: "techcorp.com",
    incorporationDocs: "/docs/techcorp-inc.pdf",
    contactPerson: "Sarah Wilson",
    phone: "+1 (555) 987-6543",
    description: "Leading software development company specializing in AI and cloud solutions.",
    accessFeatures: {
      premiumInterns: true,
      analytics: true,
      prioritySupport: true,
      bulkPosting: true
    }
  },
  {
    id: "COM001235",
    name: "StartupX",
    email: "jobs@startupx.io",
    industry: "Fintech",
    location: "New York, NY",
    website: "www.startupx.io",
    verificationStatus: "pending",
    tier: "basic",
    employeeCount: "10-50",
    joinDate: "2024-01-15",
    activeJobs: 3
  },
  {
    id: "COM001236",
    name: "MegaCorp Industries",
    email: "recruitment@megacorp.com",
    industry: "Manufacturing",
    location: "Chicago, IL",
    website: "www.megacorp.com",
    verificationStatus: "verified",
    tier: "enterprise",
    employeeCount: "5000+",
    joinDate: "2024-01-08",
    activeJobs: 25
  },
  {
    id: "COM001237",
    name: "InnovateLab",
    email: "careers@innovatelab.org",
    industry: "Research & Development",
    location: "Boston, MA",
    website: "www.innovatelab.org",
    verificationStatus: "rejected",
    tier: "basic",
    employeeCount: "50-100",
    joinDate: "2024-01-20",
    activeJobs: 0
  },
  {
    id: "COM001238",
    name: "DataDriven Solutions",
    email: "hiring@datadriven.com",
    industry: "Data Analytics",
    location: "Seattle, WA",
    website: "www.datadriven.com",
    verificationStatus: "pending",
    tier: "premium",
    employeeCount: "100-500",
    joinDate: "2024-01-25",
    activeJobs: 8
  }
]

export default function CompaniesPage() {
  const [companies, setCompanies] = useState(mockCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [tierFilter, setTierFilter] = useState<string>("all")
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showVerifyDialog, setShowVerifyDialog] = useState(false)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [showAccessPanel, setShowAccessPanel] = useState(false)
  const [blockReason, setBlockReason] = useState("")

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || company.verificationStatus === statusFilter
    const matchesTier = tierFilter === "all" || company.tier === tierFilter
    
    return matchesSearch && matchesStatus && matchesTier
  })

  const handleVerifyCompany = (company: Company) => {
    setSelectedCompany(company)
    setShowVerifyDialog(true)
  }

  const handleBlockCompany = (company: Company) => {
    setSelectedCompany(company)
    setShowBlockDialog(true)
  }

  const handleManageAccess = (company: Company) => {
    setSelectedCompany(company)
    setShowAccessPanel(true)
  }

  const confirmVerification = () => {
    if (selectedCompany) {
      setCompanies(prev => prev.map(c => 
        c.id === selectedCompany.id 
          ? { ...c, verificationStatus: "verified" as const }
          : c
      ))
      setShowVerifyDialog(false)
      // Show toast: "Company verified"
    }
  }

  const confirmBlock = () => {
    if (selectedCompany) {
      setCompanies(prev => prev.map(c => 
        c.id === selectedCompany.id 
          ? { ...c, isBlocked: !c.isBlocked }
          : c
      ))
      setShowBlockDialog(false)
      setBlockReason("")
      // Show toast: "Company blocked/unblocked"
    }
  }

  const updateAccessFeature = (feature: string, enabled: boolean) => {
    if (selectedCompany) {
      setCompanies(prev => prev.map(c => 
        c.id === selectedCompany.id 
          ? {
              ...c,
              accessFeatures: {
                ...c.accessFeatures!,
                [feature]: enabled
              }
            }
          : c
      ))
      setSelectedCompany(prev => prev ? {
        ...prev,
        accessFeatures: {
          ...prev.accessFeatures!,
          [feature]: enabled
        }
      } : null)
      // Show toast: "Access updated"
    }
  }

  const handleSelectAll = () => {
    if (selectedCompanies.length === filteredCompanies.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(filteredCompanies.map(c => c.id))
    }
  }

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanies(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return null
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "basic":
        return <Badge variant="secondary">Basic</Badge>
      case "premium":
        return <Badge className="bg-blue-100 text-blue-800">Premium</Badge>
      case "enterprise":
        return <Badge className="bg-purple-100 text-purple-800">
          <Crown className="mr-1 h-3 w-3" />
          Enterprise
        </Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen -m-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-white/90 mt-1">
            Manage company profiles, verification status, and subscription tiers
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-white text-[#034078] hover:bg-gray-100 border-white">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>Add Company</Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies by name, email, or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedCompanies.length > 0 && (
        <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium">
            {selectedCompanies.length} company(s) selected
          </span>
          <Button size="sm" variant="outline">
            Verify Selected
          </Button>
          <Button size="sm" variant="outline">
            Send Email
          </Button>
          <Button size="sm" variant="outline">
            Upgrade Tier
          </Button>
          <Button size="sm" variant="destructive">
            Delete Selected
          </Button>
        </div>
      )}

      {/* Companies Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedCompanies.length === filteredCompanies.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Active Jobs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCompanies.includes(company.id)}
                    onCheckedChange={() => handleSelectCompany(company.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className={`flex items-center space-x-3 ${company.isBlocked ? 'opacity-50' : ''}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback>
                        <Building2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{company.name}</span>
                        {company.isBlocked && (
                          <Tooltip>
                            <TooltipTrigger>
                              <ShieldX className="h-4 w-4 text-red-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Company is blocked</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{company.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm">{company.email}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {company.location}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-sm font-medium">{company.industry}</div>
                    <div className="text-xs text-muted-foreground">{company.website}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(company.verificationStatus)}
                    {getStatusBadge(company.verificationStatus)}
                  </div>
                </TableCell>
                <TableCell>
                  {getTierBadge(company.tier)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{company.employeeCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-center">
                    <div className="text-sm font-medium">{company.activeJobs}</div>
                    <div className="text-xs text-muted-foreground">positions</div>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {company.verificationStatus !== "verified" && (
                        <DropdownMenuItem onClick={() => handleVerifyCompany(company)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Verify Company
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleBlockCompany(company)}>
                        {company.isBlocked ? (
                          <>
                            <Unlock className="mr-2 h-4 w-4" />
                            Unblock Company
                          </>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Block Company
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleManageAccess(company)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Access
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade Tier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Company
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCompanies.length} of {companies.length} companies
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Verification Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Company</DialogTitle>
            <DialogDescription>
              Review company details before verification
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedCompany.logo} alt={selectedCompany.name} />
                        <AvatarFallback>
                          <Building2 className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedCompany.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedCompany.domain}</div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Industry</Label>
                        <p>{selectedCompany.industry}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Location</Label>
                        <p>{selectedCompany.location}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Employee Count</Label>
                        <p>{selectedCompany.employeeCount}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Contact Person</Label>
                        <p>{selectedCompany.contactPerson || 'Not provided'}</p>
                      </div>
                    </div>
                    {selectedCompany.incorporationDocs && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Documents</Label>
                        <Button size="sm" variant="outline" className="mt-1">
                          <FileText className="h-3 w-3 mr-1" />
                          View Incorporation Docs
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmVerification}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify Company
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block/Unblock Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCompany?.isBlocked ? 'Unblock' : 'Block'} Company
            </DialogTitle>
            <DialogDescription>
              {selectedCompany?.isBlocked 
                ? `Are you sure you want to unblock ${selectedCompany?.name}? This will restore their access to all platform features.`
                : `Are you sure you want to block ${selectedCompany?.name}? This will prevent them from posting new jobs and accessing premium features.`
              }
            </DialogDescription>
          </DialogHeader>
          {!selectedCompany?.isBlocked && (
            <div className="space-y-2">
              <Label htmlFor="blockReason">Reason for blocking (optional)</Label>
              <Textarea
                id="blockReason"
                placeholder="Enter reason for blocking this company..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant={selectedCompany?.isBlocked ? "default" : "destructive"}
              onClick={confirmBlock}
            >
              {selectedCompany?.isBlocked ? (
                <>
                  <Unlock className="h-4 w-4 mr-2" />
                  Unblock Company
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Block Company
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Management Panel */}
      <Sheet open={showAccessPanel} onOpenChange={setShowAccessPanel}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Manage Access Features</SheetTitle>
            <SheetDescription>
              Control which premium features {selectedCompany?.name} can access
            </SheetDescription>
          </SheetHeader>
          {selectedCompany && selectedCompany.accessFeatures && (
            <div className="space-y-6 py-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Premium Interns</Label>
                    <p className="text-sm text-muted-foreground">
                      Access to premium intern candidates
                    </p>
                  </div>
                  <Switch
                    checked={selectedCompany.accessFeatures.premiumInterns}
                    onCheckedChange={(checked) => updateAccessFeature('premiumInterns', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Analytics Dashboard</Label>
                    <p className="text-sm text-muted-foreground">
                      Advanced hiring analytics and reports
                    </p>
                  </div>
                  <Switch
                    checked={selectedCompany.accessFeatures.analytics}
                    onCheckedChange={(checked) => updateAccessFeature('analytics', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Priority Support</Label>
                    <p className="text-sm text-muted-foreground">
                      Priority customer support channel
                    </p>
                  </div>
                  <Switch
                    checked={selectedCompany.accessFeatures.prioritySupport}
                    onCheckedChange={(checked) => updateAccessFeature('prioritySupport', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Bulk Job Posting</Label>
                    <p className="text-sm text-muted-foreground">
                      Ability to post multiple jobs at once
                    </p>
                  </div>
                  <Switch
                    checked={selectedCompany.accessFeatures.bulkPosting}
                    onCheckedChange={(checked) => updateAccessFeature('bulkPosting', checked)}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full" onClick={() => setShowAccessPanel(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}