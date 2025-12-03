"use client";

import * as React from "react";
import { Search, Bell } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ErrorBoundary } from "@/components/error-boundary";
import { toast } from "sonner";
import TopUserMenu from "@/components/navigation/top-user-menu";
import UdemyNavbar from "@/components/navigation/udemy-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleNotificationClick = () => {
    toast.info("You have 3 new notifications", {
      description: "Check your applications and course updates",
      action: {
        label: "View All",
        onClick: () => console.log("View notifications"),
      },
    });
  };

  return (
    <ErrorBoundary level="page">
      <SidebarProvider>
        <SidebarInset>
          <UdemyNavbar />
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              <ErrorBoundary level="component">
                {children}
              </ErrorBoundary>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ErrorBoundary>
  );
}