"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon | React.ComponentType<any>
    isActive?: boolean
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="px-2">
      <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive}
                className="group relative flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-primary/5 data-[active=true]:bg-primary/10 data-[active=true]:border-r-2 data-[active=true]:border-primary"
              >
                <Link href={item.url}>
                  {item.icon && (
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    }`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                  )}
                  <span className={`font-medium transition-colors ${
                    isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {item.title}
                  </span>
                  {isActive && (
                    <div className="absolute inset-y-0 right-0 w-1 bg-primary rounded-l-full" />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}