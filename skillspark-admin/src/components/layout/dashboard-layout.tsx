"use client"

import * as React from "react"
import { Search, Bell, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b-2 border-white bg-[#112351] px-4 shadow-lg">
            <SidebarTrigger className="-ml-1 text-white hover:bg-blue-800" />
            <div className="flex flex-1 items-center gap-2">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students, companies, courses..."
                  className="pl-8 bg-white border-2 border-white"
                />
              </div>
              
              {/* Right side actions */}
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-blue-800">
                  <Bell className="h-4 w-4" />
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-600 text-white"
                  >
                    3
                  </Badge>
                </Button>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}