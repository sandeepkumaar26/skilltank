"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  IconSparkles,
  IconDashboard,
  IconBriefcase,
  IconStar,
  IconSettings,
  IconShieldCheck,
  IconUser,
  IconLogout,
  IconMenu,
  IconBell,
  IconSearch,
} from "@tabler/icons-react"

const navItems: Array<{ title: string; url: string; icon: any }> = [
  { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
  { title: "Post Internship", url: "/dashboard/post-internship", icon: IconBriefcase },
  { title: "Hiring", url: "#", icon: IconStar },
]

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 px-4">
        {/* Search */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <IconSearch className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <IconBell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

      </div>
    </header>
  );
}