"use client"

import * as React from "react"
import {
  IconAward,
  IconBuilding,
  IconChartBar,
  IconClipboardList,
  IconCreditCard,
  IconDashboard,
  IconHelp,
  IconBook,
  IconBriefcase,
  IconSearch,
  IconSettings,
  IconUsers,
  IconSchool,
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

const data = {
  user: {
    name: "Admin User",
    email: "admin@skillspark.com",
    avatar: "/avatars/admin.png",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Students",
      url: "/students",
      icon: IconUsers,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: IconBuilding,
    },
    {
      title: "Internships/Jobs",
      url: "/jobs",
      icon: IconBriefcase,
    },
    {
      title: "Courses",
      url: "/courses",
      icon: IconBook,
      items: [
        {
          title: "All Courses",
          url: "/courses",
        },
        {
          title: "Create Course",
          url: "/courses/create",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
  ],
  navManagement: [
    {
      name: "Assignments",
      url: "/assignments",
      icon: IconClipboardList,
    },
    {
      name: "Certifications",
      url: "/certifications",
      icon: IconAward,
    },
    {
      name: "Payments",
      url: "/payments",
      icon: IconCreditCard,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconSchool className="!size-6 text-blue-600" />
                <span className="text-base font-semibold">SkillSpark Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.navManagement} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}