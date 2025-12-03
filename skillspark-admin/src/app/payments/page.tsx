"use client"

import * as React from "react"
import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Banknote,
  Receipt,
  Send,
  Mail,
  FileText,
  Shield,
  Info,
  Building2,
  User,
  Zap,
  Plus,
  Minus,
  ExternalLink,
  History,
  Settings,
  Lock,
  Unlock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

interface Payment {
  id: string
  transactionId: string
  userId: string
  userName: string
  userEmail: string
  userAvatar?: string
  amount: number
  currency: string
  type: "enrollment" | "certification" | "premium" | "corporate" | "refund" | "subscription"
  status: "pending" | "completed" | "failed" | "refunded" | "disputed" | "cancelled"
  paymentMethod: "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "wallet" | "crypto"
  processorReference: string
  createdAt: string
  processedAt?: string
  refundedAt?: string
  description: string
  courseId?: string
  courseName?: string
  companyId?: string
  companyName?: string
  subscriptionPlan?: string
  processingFee: number
  netAmount: number
  gatewayFee: number
  tax?: number
  discount?: number
  couponCode?: string
  refundReason?: string
  disputeReason?: string
  riskScore?: number
  fraudulent?: boolean
  ipAddress?: string
  country?: string
  notes?: string
}

interface PaymentAnalytics {
  totalRevenue: number
  monthlyRevenue: number
  pendingAmount: number
  refundedAmount: number
  successRate: number
  averageTransactionValue: number
  topPaymentMethod: string
  totalTransactions: number
  monthlyGrowth: number
  chargebackRate: number
}

const mockPayments: Payment[] = [
  {
    id: "PAY001",
    transactionId: "TXN-2024-001234",
    userId: "STU001234",
    userName: "John Smith",
    userEmail: "john.smith@mit.edu",
    userAvatar: "/avatars/01.png",
    amount: 299.00,
    currency: "USD",
    type: "enrollment",
    status: "completed",
    paymentMethod: "credit_card",
    processorReference: "ch_3OmQxQ2eZvKYlo2C1234567890",
    createdAt: "2024-02-01T10:30:00Z",
    processedAt: "2024-02-01T10:30:15Z",
    description: "Full Stack Development Course Enrollment",
    courseId: "COURSE001",
    courseName: "Full Stack Development Bootcamp",
    processingFee: 8.97,
    gatewayFee: 11.16,
    netAmount: 278.87,
    tax: 29.90,
    riskScore: 0.12,
    ipAddress: "192.168.1.100",
    country: "United States"
  },
  {
    id: "PAY002",
    transactionId: "TXN-2024-001235",
    userId: "STU001235",
    userName: "Sarah Johnson",
    userEmail: "sarah.j@stanford.edu",
    userAvatar: "/avatars/02.png",
    amount: 149.00,
    currency: "USD",
    type: "certification",
    status: "completed",
    paymentMethod: "paypal",
    processorReference: "PAYID-MU6XQ5A123456789",
    createdAt: "2024-02-01T14:15:00Z",
    processedAt: "2024-02-01T14:15:22Z",
    description: "Data Science Certification Fee",
    processingFee: 4.47,
    gatewayFee: 5.96,
    netAmount: 138.57,
    tax: 14.90,
    riskScore: 0.08,
    ipAddress: "10.0.0.50",
    country: "United States"
  },
  {
    id: "PAY003",
    transactionId: "TXN-2024-001236",
    userId: "CORP001",
    userName: "TechCorp Inc.",
    userEmail: "billing@techcorp.com",
    amount: 4999.00,
    currency: "USD",
    type: "corporate",
    status: "pending",
    paymentMethod: "bank_transfer",
    processorReference: "WIRE-2024-001236",
    createdAt: "2024-02-01T16:45:00Z",
    description: "Corporate Training Package - 50 Employee Licenses",
    companyId: "COMP001",
    companyName: "TechCorp Inc.",
    processingFee: 0,
    gatewayFee: 25.00,
    netAmount: 4974.00,
    tax: 499.90,
    riskScore: 0.05,
    ipAddress: "203.0.113.5",
    country: "United States"
  },
  {
    id: "PAY004",
    transactionId: "TXN-2024-001237",
    userId: "STU001236",
    userName: "Michael Chen",
    userEmail: "m.chen@berkeley.edu",
    userAvatar: "/avatars/03.png",
    amount: 99.00,
    currency: "USD",
    type: "premium",
    status: "failed",
    paymentMethod: "credit_card",
    processorReference: "ch_3OmQxQ2eZvKYlo2C0987654321",
    createdAt: "2024-02-01T18:20:00Z",
    description: "SkillSpark Premium Monthly Subscription",
    subscriptionPlan: "Premium Monthly",
    processingFee: 2.97,
    gatewayFee: 3.17,
    netAmount: 92.86,
    tax: 9.90,
    riskScore: 0.85,
    fraudulent: true,
    ipAddress: "198.51.100.42",
    country: "Unknown",
    notes: "Declined by issuing bank - suspected fraud"
  },
  {
    id: "PAY005",
    transactionId: "TXN-2024-001238",
    userId: "STU001237",
    userName: "Emily Davis",
    userEmail: "emily.d@harvard.edu",
    userAvatar: "/avatars/04.png",
    amount: -199.00,
    currency: "USD",
    type: "refund",
    status: "completed",
    paymentMethod: "credit_card",
    processorReference: "re_3OmQxQ2eZvKYlo2C1122334455",
    createdAt: "2024-02-01T20:10:00Z",
    processedAt: "2024-02-01T20:10:18Z",
    refundedAt: "2024-02-01T20:10:18Z",
    description: "Refund for AI & Machine Learning Course",
    courseId: "COURSE002",
    courseName: "AI & Machine Learning Fundamentals",
    processingFee: -5.97,
    gatewayFee: -7.96,
    netAmount: -185.07,
    refundReason: "Course content did not meet expectations",
    riskScore: 0.02,
    ipAddress: "192.0.2.146",
    country: "United States"
  },
  {
    id: "PAY006",
    transactionId: "TXN-2024-001239",
    userId: "STU001238",
    userName: "David Wilson",
    userEmail: "d.wilson@cmu.edu",
    userAvatar: "/avatars/05.png",
    amount: 399.00,
    currency: "USD",
    type: "enrollment",
    status: "disputed",
    paymentMethod: "credit_card",
    processorReference: "ch_3OmQxQ2eZvKYlo2C9988776655",
    createdAt: "2024-01-28T09:15:00Z",
    processedAt: "2024-01-28T09:15:30Z",
    description: "DevOps Engineering Bootcamp",
    courseId: "COURSE003",
    courseName: "DevOps Engineering Bootcamp",
    processingFee: 11.97,
    gatewayFee: 15.96,
    netAmount: 371.07,
    tax: 39.90,
    disputeReason: "Unauthorized transaction",
    riskScore: 0.45,
    ipAddress: "203.0.113.195",
    country: "United States"
  }
]

const mockAnalytics: PaymentAnalytics = {
  totalRevenue: 2547892,
  monthlyRevenue: 442156,
  pendingAmount: 4999.00,
  refundedAmount: 23450,
  successRate: 94.2,
  averageTransactionValue: 287.50,
  topPaymentMethod: "credit_card",
  totalTransactions: 8863,
  monthlyGrowth: 15.7,
  chargebackRate: 0.8
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments)
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [methodFilter, setMethodFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  const [showDisputeDialog, setShowDisputeDialog] = useState(false)
  const [showBulkRefundDialog, setShowBulkRefundDialog] = useState(false)
  const [refundReason, setRefundReason] = useState("")
  const [disputeResponse, setDisputeResponse] = useState("")
  const [analytics] = useState(mockAnalytics)

  const getFilteredPayments = (tab: string) => {
    return payments.filter(payment => {
      const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || payment.status === statusFilter
      const matchesType = typeFilter === "all" || payment.type === typeFilter
      const matchesMethod = methodFilter === "all" || payment.paymentMethod === methodFilter
      const matchesTab = tab === "all" || payment.status === tab
      
      return matchesSearch && matchesStatus && matchesType && matchesMethod && matchesTab
    })
  }

  const filteredPayments = getFilteredPayments(activeTab)

  const handleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(filteredPayments.map(p => p.id))
    }
  }

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayments(prev =>
      prev.includes(paymentId)
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    )
  }

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowPaymentDetails(true)
  }

  const handleRefundPayment = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowRefundDialog(true)
  }

  const handleDisputeResponse = (payment: Payment) => {
    setSelectedPayment(payment)
    setShowDisputeDialog(true)
  }

  const confirmRefund = () => {
    if (selectedPayment && refundReason.trim()) {
      setPayments(prev => prev.map(p => 
        p.id === selectedPayment.id 
          ? { 
              ...p, 
              status: "refunded" as const,
              refundReason: refundReason,
              refundedAt: new Date().toISOString()
            }
          : p
      ))
      setShowRefundDialog(false)
      setRefundReason("")
      // Show toast: "Refund processed successfully"
    }
  }

  const confirmDisputeResponse = () => {
    if (selectedPayment && disputeResponse.trim()) {
      setPayments(prev => prev.map(p => 
        p.id === selectedPayment.id 
          ? { 
              ...p, 
              notes: disputeResponse
            }
          : p
      ))
      setShowDisputeDialog(false)
      setDisputeResponse("")
      // Show toast: "Dispute response submitted"
    }
  }

  const retryPayment = (payment: Payment) => {
    setPayments(prev => prev.map(p => 
      p.id === payment.id 
        ? { 
            ...p, 
            status: "pending" as const,
            notes: "Payment retry initiated"
          }
        : p
    ))
    // Show toast: "Payment retry initiated"
  }

  const markAsFraud = (payment: Payment) => {
    setPayments(prev => prev.map(p => 
      p.id === payment.id 
        ? { 
            ...p, 
            fraudulent: true,
            status: "cancelled" as const,
            notes: "Marked as fraudulent transaction"
          }
        : p
    ))
    // Show toast: "Transaction marked as fraudulent"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800">Refunded</Badge>
      case "disputed":
        return <Badge className="bg-purple-100 text-purple-800">Disputed</Badge>
      case "cancelled":
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "refunded":
        return <RefreshCw className="h-4 w-4 text-blue-600" />
      case "disputed":
        return <AlertTriangle className="h-4 w-4 text-purple-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "enrollment":
        return <Badge variant="outline" className="text-blue-800 border-blue-200">Course</Badge>
      case "certification":
        return <Badge variant="outline" className="text-purple-800 border-purple-200">Certification</Badge>
      case "premium":
        return <Badge variant="outline" className="text-yellow-800 border-yellow-200">Premium</Badge>
      case "corporate":
        return <Badge variant="outline" className="text-green-800 border-green-200">Corporate</Badge>
      case "refund":
        return <Badge variant="outline" className="text-red-800 border-red-200">Refund</Badge>
      case "subscription":
        return <Badge variant="outline" className="text-indigo-800 border-indigo-200">Subscription</Badge>
      default:
        return null
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return <CreditCard className="h-4 w-4" />
      case "paypal":
        return <Banknote className="h-4 w-4" />
      case "bank_transfer":
        return <Building2 className="h-4 w-4" />
      case "wallet":
        return <DollarSign className="h-4 w-4" />
      case "crypto":
        return <Zap className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getRiskScoreColor = (score?: number) => {
    if (!score) return "text-gray-600"
    if (score < 0.3) return "text-green-600"
    if (score < 0.7) return "text-yellow-600"
    return "text-red-600"
  }

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(Math.abs(amount))
  }

  const pendingCount = payments.filter(p => p.status === "pending").length
  const completedCount = payments.filter(p => p.status === "completed").length
  const failedCount = payments.filter(p => p.status === "failed").length
  const disputedCount = payments.filter(p => p.status === "disputed").length
  const refundedCount = payments.filter(p => p.status === "refunded").length

  const paymentTypes = Array.from(new Set(payments.map(p => p.type)))
  const paymentMethods = Array.from(new Set(payments.map(p => p.paymentMethod)))

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen -m-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            Payments & Transactions
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 ml-2 text-white/80" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs space-y-1">
                  <p className="font-medium">Payment Management System</p>
                  <p className="text-xs">Monitor transactions, process refunds, and handle disputes</p>
                  <p className="text-xs text-muted-foreground">All financial operations are secured and audited</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="text-muted-foreground">
            Monitor transactions, process refunds, and manage payment operations
          </p>
        </div>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download financial report for accounting</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                disabled={selectedPayments.length === 0}
                onClick={() => setShowBulkRefundDialog(true)}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Bulk Refund ({selectedPayments.length})
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Process refunds for selected transactions</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{analytics.monthlyGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.monthlyRevenue)}</div>
            <p className="text-xs text-muted-foreground">Current month earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.successRate}%</div>
            <p className="text-xs text-muted-foreground">Payment success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(analytics.pendingAmount)}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">
            All ({payments.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending ({pendingCount})
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedCount})
          </TabsTrigger>
          <TabsTrigger value="failed" className="relative">
            Failed ({failedCount})
            {failedCount > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="disputed" className="relative">
            Disputed ({disputedCount})
            {disputedCount > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="refunded">
            Refunded ({refundedCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Filters and Search */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, email, transaction ID, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {paymentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                {paymentMethods.map(method => (
                  <SelectItem key={method} value={method}>
                    {method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedPayments.length > 0 && (
            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedPayments.length} transaction(s) selected
              </span>
              <Button size="sm" variant="outline" onClick={() => setShowBulkRefundDialog(true)}>
                <RefreshCw className="mr-1 h-3 w-3" />
                Bulk Refund
              </Button>
              <Button size="sm" variant="outline">
                <Download className="mr-1 h-3 w-3" />
                Export Selected
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="mr-1 h-3 w-3" />
                Send Receipts
              </Button>
            </div>
          )}

          {/* Payments Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className={payment.fraudulent ? "bg-red-50" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedPayments.includes(payment.id)}
                        onCheckedChange={() => handleSelectPayment(payment.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={payment.userAvatar} alt={payment.userName} />
                          <AvatarFallback>
                            {payment.type === "corporate" ? (
                              <Building2 className="h-4 w-4" />
                            ) : (
                              payment.userName.split(' ').map(n => n[0]).join('')
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{payment.userName}</div>
                          <div className="text-sm text-muted-foreground">{payment.userEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div 
                        className="cursor-pointer hover:bg-gray-50 p-1 rounded"
                        onClick={() => handleViewPayment(payment)}
                      >
                        <div className="font-medium text-blue-600 hover:text-blue-800">
                          {payment.transactionId}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {payment.description}
                        </div>
                        {payment.fraudulent && (
                          <div className="flex items-center space-x-1 text-red-600 text-xs">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Flagged</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`font-medium ${payment.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {payment.amount < 0 ? '-' : ''}{formatCurrency(payment.amount, payment.currency)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Net: {formatCurrency(payment.netAmount, payment.currency)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(payment.type)}
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            {getPaymentMethodIcon(payment.paymentMethod)}
                            <span className="text-sm capitalize">
                              {payment.paymentMethod.replace('_', ' ')}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Processor: {payment.processorReference}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(payment.status)}
                            {getStatusBadge(payment.status)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {payment.status === "completed" && payment.processedAt && (
                            <p>Processed: {new Date(payment.processedAt).toLocaleString()}</p>
                          )}
                          {payment.status === "refunded" && payment.refundReason && (
                            <p>Reason: {payment.refundReason}</p>
                          )}
                          {payment.status === "disputed" && payment.disputeReason && (
                            <p>Dispute: {payment.disputeReason}</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {payment.riskScore !== undefined && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-center">
                              <div className={`text-sm font-medium ${getRiskScoreColor(payment.riskScore)}`}>
                                {(payment.riskScore * 100).toFixed(0)}%
                              </div>
                              <Progress 
                                value={payment.riskScore * 100} 
                                className="w-12 h-1"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p>Risk Score: {(payment.riskScore * 100).toFixed(1)}%</p>
                              {payment.country && <p>Country: {payment.country}</p>}
                              {payment.ipAddress && <p>IP: {payment.ipAddress}</p>}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )}
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
                          <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Receipt className="mr-2 h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Receipt
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {payment.status === "completed" && payment.type !== "refund" && (
                            <DropdownMenuItem onClick={() => handleRefundPayment(payment)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Process Refund
                            </DropdownMenuItem>
                          )}
                          {payment.status === "failed" && (
                            <DropdownMenuItem onClick={() => retryPayment(payment)}>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Retry Payment
                            </DropdownMenuItem>
                          )}
                          {payment.status === "disputed" && (
                            <DropdownMenuItem onClick={() => handleDisputeResponse(payment)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Respond to Dispute
                            </DropdownMenuItem>
                          )}
                          {!payment.fraudulent && payment.riskScore && payment.riskScore > 0.7 && (
                            <DropdownMenuItem onClick={() => markAsFraud(payment)} className="text-red-600">
                              <Shield className="mr-2 h-4 w-4" />
                              Mark as Fraud
                            </DropdownMenuItem>
                          )}
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
              Showing {filteredPayments.length} of {payments.length} transactions
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
        </TabsContent>
      </Tabs>

      {/* Payment Details Panel */}
      <Sheet open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <SheetContent className="w-[800px] sm:w-[540px]">
          {selectedPayment && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="flex items-center space-x-2">
                      <span>Transaction Details</span>
                      {selectedPayment.fraudulent && (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </SheetTitle>
                    <SheetDescription>{selectedPayment.transactionId}</SheetDescription>
                  </div>
                  {getStatusBadge(selectedPayment.status)}
                </div>
              </SheetHeader>

              <div className="space-y-6 py-6">
                {/* Transaction Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Amount</Label>
                        <p className={`text-lg font-bold ${selectedPayment.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {selectedPayment.amount < 0 ? '-' : ''}{formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Net Amount</Label>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(selectedPayment.netAmount, selectedPayment.currency)}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Payment Method</Label>
                        <div className="flex items-center space-x-2">
                          {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                          <span className="text-sm capitalize">
                            {selectedPayment.paymentMethod.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Created</Label>
                        <p className="text-sm text-muted-foreground">
                          {new Date(selectedPayment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground">{selectedPayment.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Fee Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fee Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Gross Amount:</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Processing Fee:</span>
                        <span className="text-sm text-red-600">
                          -{formatCurrency(selectedPayment.processingFee, selectedPayment.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Gateway Fee:</span>
                        <span className="text-sm text-red-600">
                          -{formatCurrency(selectedPayment.gatewayFee, selectedPayment.currency)}
                        </span>
                      </div>
                      {selectedPayment.tax && (
                        <div className="flex justify-between">
                          <span className="text-sm">Tax:</span>
                          <span className="text-sm text-red-600">
                            -{formatCurrency(selectedPayment.tax, selectedPayment.currency)}
                          </span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span className="text-sm">Net Amount:</span>
                        <span className="text-sm text-green-600">
                          {formatCurrency(selectedPayment.netAmount, selectedPayment.currency)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technical Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Technical Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Processor Reference</Label>
                        <p className="text-sm text-muted-foreground font-mono">
                          {selectedPayment.processorReference}
                        </p>
                      </div>
                      {selectedPayment.riskScore !== undefined && (
                        <div>
                          <Label className="text-sm font-medium">Risk Score</Label>
                          <p className={`text-sm font-medium ${getRiskScoreColor(selectedPayment.riskScore)}`}>
                            {(selectedPayment.riskScore * 100).toFixed(1)}%
                          </p>
                        </div>
                      )}
                      {selectedPayment.ipAddress && (
                        <div>
                          <Label className="text-sm font-medium">IP Address</Label>
                          <p className="text-sm text-muted-foreground font-mono">
                            {selectedPayment.ipAddress}
                          </p>
                        </div>
                      )}
                      {selectedPayment.country && (
                        <div>
                          <Label className="text-sm font-medium">Country</Label>
                          <p className="text-sm text-muted-foreground">
                            {selectedPayment.country}
                          </p>
                        </div>
                      )}
                    </div>
                    {selectedPayment.notes && (
                      <div>
                        <Label className="text-sm font-medium">Notes</Label>
                        <p className="text-sm text-muted-foreground">{selectedPayment.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Course/Product Info */}
                {(selectedPayment.courseName || selectedPayment.companyName) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {selectedPayment.type === "corporate" ? "Company Details" : "Course Details"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedPayment.courseName && (
                          <div>
                            <Label className="text-sm font-medium">Course</Label>
                            <p className="text-sm text-muted-foreground">{selectedPayment.courseName}</p>
                          </div>
                        )}
                        {selectedPayment.companyName && (
                          <div>
                            <Label className="text-sm font-medium">Company</Label>
                            <p className="text-sm text-muted-foreground">{selectedPayment.companyName}</p>
                          </div>
                        )}
                        {selectedPayment.subscriptionPlan && (
                          <div>
                            <Label className="text-sm font-medium">Subscription Plan</Label>
                            <p className="text-sm text-muted-foreground">{selectedPayment.subscriptionPlan}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Receipt className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Receipt
                  </Button>
                  {selectedPayment.status === "completed" && selectedPayment.type !== "refund" && (
                    <Button variant="outline" onClick={() => handleRefundPayment(selectedPayment)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Process Refund
                    </Button>
                  )}
                  {selectedPayment.status === "disputed" && (
                    <Button variant="outline" onClick={() => handleDisputeResponse(selectedPayment)}>
                      <FileText className="h-4 w-4 mr-2" />
                      Respond to Dispute
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              <span>Process Refund</span>
            </DialogTitle>
            <DialogDescription>
              Process a refund for {selectedPayment?.userName}&apos;s transaction of {selectedPayment && formatCurrency(selectedPayment.amount, selectedPayment.currency)}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="refundReason">Reason for refund *</Label>
              <Textarea
                id="refundReason"
                placeholder="Enter the reason for processing this refund..."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                rows={3}
                required
              />
            </div>
            {selectedPayment && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="text-sm space-y-1">
                  <div className="font-medium">Refund Details:</div>
                  <div>Amount to refund: {formatCurrency(selectedPayment.amount, selectedPayment.currency)}</div>
                  <div>Processing fee: -{formatCurrency(selectedPayment.processingFee, selectedPayment.currency)}</div>
                  <div>Net refund: {formatCurrency(selectedPayment.netAmount, selectedPayment.currency)}</div>
                </div>
              </div>
            )}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Important</span>
              </div>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• Refund will be processed to original payment method</li>
                <li>• Processing may take 5-10 business days</li>
                <li>• User will receive email notification</li>
                <li>• This action cannot be undone</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRefundDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmRefund}
              disabled={!refundReason.trim()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispute Response Dialog */}
      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <span>Respond to Dispute</span>
            </DialogTitle>
            <DialogDescription>
              Provide a response to the dispute for transaction {selectedPayment?.transactionId}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedPayment?.disputeReason && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                <div className="text-sm">
                  <div className="font-medium text-purple-800">Customer&apos;s Dispute Reason:</div>
                  <p className="text-purple-700 mt-1">{selectedPayment.disputeReason}</p>
                </div>
              </div>
            )}
            <div>
              <Label htmlFor="disputeResponse">Your response *</Label>
              <Textarea
                id="disputeResponse"
                placeholder="Enter your response to this dispute..."
                value={disputeResponse}
                onChange={(e) => setDisputeResponse(e.target.value)}
                rows={4}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisputeDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmDisputeResponse}
              disabled={!disputeResponse.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Refund Dialog */}
      <Dialog open={showBulkRefundDialog} onOpenChange={setShowBulkRefundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Refund Processing</DialogTitle>
            <DialogDescription>
              Process refunds for {selectedPayments.length} selected transactions. Only completed transactions will be processed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <div className="text-sm space-y-1">
                <div className="font-medium">Selected Transactions:</div>
                {selectedPayments.slice(0, 3).map(paymentId => {
                  const payment = payments.find(p => p.id === paymentId)
                  return payment ? (
                    <div key={paymentId} className="text-muted-foreground">
                      • {payment.userName} - {formatCurrency(payment.amount, payment.currency)}
                    </div>
                  ) : null
                })}
                {selectedPayments.length > 3 && (
                  <div className="text-muted-foreground">
                    • And {selectedPayments.length - 3} more...
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">High-Risk Operation</span>
              </div>
              <ul className="text-sm text-red-700 mt-2 space-y-1">
                <li>• This will process multiple refunds simultaneously</li>
                <li>• Each transaction will require individual approval</li>
                <li>• Failed transactions will be skipped</li>
                <li>• All users will be notified via email</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkRefundDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              // Bulk refund logic here
              setShowBulkRefundDialog(false)
              setSelectedPayments([])
            }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Process All Refunds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}