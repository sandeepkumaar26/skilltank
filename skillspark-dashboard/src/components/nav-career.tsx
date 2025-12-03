"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavCareer({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon | React.ComponentType<any>
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="px-2">
      <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Career Hub
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.url || pathname.startsWith(item.url + "/")
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-primary/5",
                      isActive && "bg-primary/10 border-r-2 border-primary"
                    )}
                  >
                    {item.icon && (
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                        isActive 
                          ? "bg-primary/20 text-primary" 
                          : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>
                    )}
                    <span className={cn(
                      "font-medium transition-colors flex-1 text-left",
                      isActive ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}>
                      {item.title}
                    </span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    {isActive && (
                      <div className="absolute inset-y-0 right-0 w-1 bg-primary rounded-l-full" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="ml-4 mt-2 space-y-1">
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname === subItem.url
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild
                            className={cn(
                              "rounded-md transition-colors",
                              isSubActive && "bg-primary/10 text-primary font-medium"
                            )}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}