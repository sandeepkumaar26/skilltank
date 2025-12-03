"use client"

import * as React from "react"
import { useState } from "react"
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Palette,
  Key,
  Mail,
  Phone,
  Download,
  Upload,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Info,
  Lock,
  Unlock,
  Trash2,
  Edit,
  Plus,
  Minus,
  Clock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AdminUser {
  id: string
  name: string
  email: string
  role: "super_admin" | "admin" | "moderator"
  avatar?: string
  lastLogin: string
  status: "active" | "inactive"
  permissions: string[]
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  weeklyReports: boolean
  securityAlerts: boolean
  systemUpdates: boolean
  marketingEmails: boolean
}

interface SystemSettings {
  siteName: string
  siteDescription: string
  timezone: string
  language: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  emailVerificationRequired: boolean
  twoFactorRequired: boolean
  sessionTimeout: number
  maxLoginAttempts: number
}

interface SecurityEvent {
  id: string
  type: "login" | "logout" | "failed_login" | "password_change" | "settings_change"
  user: string
  ip: string
  timestamp: string
  details: string
}

const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Admin",
    email: "john@skillspark.com",
    role: "super_admin",
    avatar: "/avatars/admin1.png",
    lastLogin: "2024-02-01 09:30:00",
    status: "active",
    permissions: ["all"]
  },
  {
    id: "2", 
    name: "Sarah Manager",
    email: "sarah@skillspark.com",
    role: "admin",
    lastLogin: "2024-02-01 08:15:00",
    status: "active",
    permissions: ["users", "courses", "analytics"]
  },
  {
    id: "3",
    name: "Mike Moderator", 
    email: "mike@skillspark.com",
    role: "moderator",
    lastLogin: "2024-01-31 16:45:00",
    status: "active",
    permissions: ["assignments", "support"]
  }
]

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: "1",
    type: "login",
    user: "john@skillspark.com",
    ip: "192.168.1.100",
    timestamp: "2024-02-01 09:30:00",
    details: "Successful login from Chrome browser"
  },
  {
    id: "2",
    type: "failed_login",
    user: "unknown@example.com",
    ip: "45.123.456.789",
    timestamp: "2024-02-01 03:22:15",
    details: "Failed login attempt - invalid credentials"
  },
  {
    id: "3",
    type: "settings_change",
    user: "sarah@skillspark.com",
    ip: "192.168.1.105",
    timestamp: "2024-01-31 14:20:00",
    details: "Updated notification preferences"
  }
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [currentUser, setCurrentUser] = useState({
    name: "John Admin",
    email: "john@skillspark.com",
    role: "super_admin",
    avatar: "/avatars/admin1.png"
  })
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    systemUpdates: true,
    marketingEmails: false
  })

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: "SkillSpark Kaizen",
    siteDescription: "Professional development and certification platform",
    timezone: "UTC-5",
    language: "en",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    twoFactorRequired: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5
  })

  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false)
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  })

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
    // Show toast: "Notification preferences updated"
  }

  const handleSystemSettingChange = (key: keyof SystemSettings, value: string | number | boolean) => {
    if (key === "maintenanceMode" && value === true) {
      setShowMaintenanceDialog(true)
      return
    }
    setSystemSettings(prev => ({ ...prev, [key]: value }))
    // Show toast: "System settings updated"
  }

  const confirmMaintenanceMode = () => {
    setSystemSettings(prev => ({ ...prev, maintenanceMode: true }))
    setShowMaintenanceDialog(false)
    // Show toast: "Maintenance mode enabled - users will see maintenance page"
  }

  const saveProfile = () => {
    // Save profile logic
    // Show toast: "Profile updated successfully"
  }

  const changePassword = () => {
    if (passwords.new !== passwords.confirm) {
      // Show error toast: "New passwords don't match"
      return
    }
    if (passwords.new.length < 8) {
      // Show error toast: "Password must be at least 8 characters"
      return
    }
    // Change password logic
    setShowPasswordDialog(false)
    setPasswords({ current: "", new: "", confirm: "" })
    // Show toast: "Password changed successfully"
  }

  const exportSettings = () => {
    // Export settings logic
    console.log("Exporting settings...")
    // Show toast: "Settings exported successfully"
  }

  const importSettings = () => {
    // Import settings logic
    console.log("Importing settings...")
    // Show toast: "Settings imported successfully"
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "text-red-600"
      case "admin":
        return "text-blue-600"
      case "moderator":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Badge className="bg-red-100 text-red-800">Super Admin</Badge>
      case "admin":
        return <Badge className="bg-blue-100 text-blue-800">Admin</Badge>
      case "moderator":
        return <Badge className="bg-green-100 text-green-800">Moderator</Badge>
      default:
        return <Badge variant="outline">User</Badge>
    }
  }

  const getSecurityEventIcon = (type: string) => {
    switch (type) {
      case "login":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "logout":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "failed_login":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "password_change":
        return <Key className="h-4 w-4 text-yellow-600" />
      case "settings_change":
        return <Settings className="h-4 w-4 text-purple-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-8 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen -m-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 rounded-lg shadow-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            Settings
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 ml-2 text-white/80" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs space-y-1">
                  <p className="font-medium">System Configuration</p>
                  <p className="text-xs">Manage platform settings, user accounts, and security</p>
                  <p className="text-xs text-muted-foreground">Changes affect all platform users</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="text-muted-foreground">
            Configure system preferences, user management, and security settings
          </p>
        </div>
        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={exportSettings}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export current settings configuration</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={importSettings}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Import settings from backup file</p>
            </TooltipContent>
          </Tooltip>
          <Button onClick={saveProfile}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline">
                      <Upload className="h-3 w-3 mr-1" />
                      Change Photo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={currentUser.name} 
                      onChange={(e) => setCurrentUser(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={currentUser.email}
                      onChange={(e) => setCurrentUser(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center space-x-2">
                    {getRoleBadge(currentUser.role)}
                    <span className="text-sm text-muted-foreground">
                      Role permissions are managed by super administrators
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Brief description about yourself..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Password</Label>
                      <p className="text-sm text-muted-foreground">
                        Last changed 2 weeks ago
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone logs into your account
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-base font-medium">Active Sessions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Current Session</div>
                          <div className="text-xs text-muted-foreground">
                            Chrome on macOS • 192.168.1.100 • Active now
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600">Current</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Mobile Session</div>
                          <div className="text-xs text-muted-foreground">
                            Safari on iPhone • 2 hours ago
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Terminate</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about platform activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates and alerts via email
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get instant notifications in your browser
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive critical alerts via text message
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Get weekly summary of platform activities
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Important security notifications (always enabled)
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)}
                    disabled
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about system maintenance and updates
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Product updates and feature announcements
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription>
                  Basic platform configuration and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    value={systemSettings.siteName}
                    onChange={(e) => handleSystemSettingChange('siteName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea 
                    id="siteDescription" 
                    value={systemSettings.siteDescription}
                    onChange={(e) => handleSystemSettingChange('siteDescription', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={systemSettings.timezone} 
                      onValueChange={(value) => handleSystemSettingChange('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={systemSettings.language} 
                      onValueChange={(value) => handleSystemSettingChange('language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Platform Controls</span>
                </CardTitle>
                <CardDescription>
                  System-wide controls and operational settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Show maintenance page to all users
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => handleSystemSettingChange('maintenanceMode', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register accounts
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.registrationEnabled}
                    onCheckedChange={(checked) => handleSystemSettingChange('registrationEnabled', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.emailVerificationRequired}
                    onCheckedChange={(checked) => handleSystemSettingChange('emailVerificationRequired', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Two-Factor Required</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <Switch 
                    checked={systemSettings.twoFactorRequired}
                    onCheckedChange={(checked) => handleSystemSettingChange('twoFactorRequired', checked)}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => handleSystemSettingChange('sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input 
                      id="maxLoginAttempts" 
                      type="number"
                      value={systemSettings.maxLoginAttempts}
                      onChange={(e) => handleSystemSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Administrator Accounts</span>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Admin
                </Button>
              </CardTitle>
              <CardDescription>
                Manage administrator and moderator accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRoleBadge(user.role)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{user.lastLogin}</div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedUser(user)
                              setShowDeleteUserDialog(true)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Events</span>
              </CardTitle>
              <CardDescription>
                Monitor security-related activities and login attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSecurityEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-4 p-3 border rounded">
                    {getSecurityEventIcon(event.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium capitalize">
                          {event.type.replace('_', ' ')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.timestamp}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.user} • {event.ip} • {event.details}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>System Maintenance</span>
                </CardTitle>
                <CardDescription>
                  Database and system maintenance operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Clear Cache</Label>
                      <p className="text-sm text-muted-foreground">
                        Clear application cache and temporary files
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Database Backup</Label>
                      <p className="text-sm text-muted-foreground">
                        Create a backup of the database
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Backup
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">System Logs</Label>
                      <p className="text-sm text-muted-foreground">
                        Download system logs for troubleshooting
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Danger Zone</span>
                </CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium text-red-900">Reset All Data</Label>
                        <p className="text-sm text-red-700">
                          Permanently delete all user data and reset platform
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>

                    <Separator className="bg-red-200" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium text-red-900">Delete Platform</Label>
                        <p className="text-sm text-red-700">
                          Permanently delete the entire platform and all data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input 
                  id="currentPassword" 
                  type={showPassword ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                type={showPassword ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with letters, numbers, and symbols
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type={showPassword ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={changePassword}>
              <Save className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Maintenance Mode Dialog */}
      <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Enable Maintenance Mode</span>
            </DialogTitle>
            <DialogDescription>
              This will show a maintenance page to all users and prevent access to the platform. 
              Only administrators will be able to access the admin panel.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-orange-50 border border-orange-200 rounded">
            <div className="flex items-center space-x-2 text-orange-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">Impact Warning</span>
            </div>
            <ul className="text-sm text-orange-700 mt-2 space-y-1">
              <li>• All users will see a maintenance page</li>
              <li>• Course access will be temporarily disabled</li>
              <li>• Assignment submissions will be blocked</li>
              <li>• API access will be limited</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMaintenanceDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmMaintenanceMode} className="bg-orange-600 hover:bg-orange-700">
              <Lock className="h-4 w-4 mr-2" />
              Enable Maintenance Mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={showDeleteUserDialog} onOpenChange={setShowDeleteUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Administrator</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">This will permanently:</span>
            </div>
            <ul className="text-sm text-red-700 mt-2 space-y-1">
              <li>• Remove all account access</li>
              <li>• Delete user session data</li>
              <li>• Remove from all admin roles</li>
              <li>• Cannot be undone</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteUserDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              setShowDeleteUserDialog(false)
              setSelectedUser(null)
              // Delete user logic
            }}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Administrator
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}