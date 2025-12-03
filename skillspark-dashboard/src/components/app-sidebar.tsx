"use client"

import * as React from "react"
import {
  IconAward,
  IconBuilding,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFileText,
  IconFolder,
  IconHelp,
  IconBulb,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconBook,
  IconTarget,
  IconBriefcase,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"

const baseDocuments = [
  {
    name: "Resume Builder",
    url: "/resume",
    icon: IconFileDescription,
  },
  {
    name: "Career Reports",
    url: "/reports",
    icon: IconReport,
  },
  {
    name: "Job Tracker",
    url: "/tracker",
    icon: IconDatabase,
  },
]

const secondaryNav = [
  {
    title: "Settings",
    url: "/settings",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "/help",
    icon: IconHelp,
  },
  {
    title: "Search",
    url: "/search",
    icon: IconSearch,
  },
]

function useRoleNav() {
  const { profile } = useAuth();
  const role = (profile?.role as string) || "student";

  if (role === "admin") {
    return [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Applications", url: "/applications", icon: IconListDetails },
      { title: "Internships", url: "/internships", icon: IconFolder },
      { title: "Jobs", url: "/jobs", icon: IconBriefcase },
      { title: "Courses", url: "/courses", icon: IconBook },
      { title: "Analytics", url: "/dashboard", icon: IconChartBar },
    ] as const;
  }

  if (role === "startup") {
    return [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Manage Internships", url: "/internships", icon: IconFolder },
      { title: "Manage Jobs", url: "/jobs", icon: IconBriefcase },
      { title: "Applications", url: "/applications", icon: IconListDetails },
      { title: "Create Courses", url: "/courses", icon: IconBook },
      { title: "Talent Pool", url: "/dashboard", icon: IconUsers },
    ] as const;
  }

  // default student
  return [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Courses", url: "/courses", icon: IconBook },
    { title: "Internships", url: "/internships", icon: IconFolder },
    { title: "Jobs", url: "/jobs", icon: IconBriefcase },
    { title: "Applications", url: "/applications", icon: IconListDetails },
    { title: "Kaizen", url: "/kaizen", icon: IconTarget },
  ] as const;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, profile } = useAuth();
  const navMain = useRoleNav() as any[];
  const displayUser = {
    name: (profile as any)?.full_name || user?.user_metadata?.name || user?.email || "User",
    email: user?.email || "",
    avatar: (user?.user_metadata as any)?.avatar_url || (user?.user_metadata as any)?.picture || "/placeholder-logo.jpg",
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconBulb className="!size-5" />
                <span className="text-base font-semibold">SkillSpark</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={baseDocuments} />
        <NavSecondary items={secondaryNav} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
    </Sidebar>
  )
}