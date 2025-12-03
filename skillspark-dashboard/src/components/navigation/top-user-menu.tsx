"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User as UserIcon, Briefcase, FileText, ClipboardList } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function TopUserMenu() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const displayName = profile?.full_name || user?.user_metadata?.name || user?.email || "User";
  const email = user?.email || "";
  const avatarUrl = (user?.user_metadata as any)?.avatar_url || 
    (user?.user_metadata as any)?.picture || 
    "/placeholder-logo.jpg";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/60">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>
              {displayName
                .toString()
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm font-medium">{displayName}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback>
                {displayName
                  .toString()
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-semibold leading-tight">{displayName}</div>
              {email && <div className="text-muted-foreground text-xs">{email}</div>}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/settings")}> 
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}> 
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/applications")}>
            <ClipboardList className="mr-2 h-4 w-4" />
            Applications
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/kaizen")}>
            <Briefcase className="mr-2 h-4 w-4" />
            Kaizen Certification
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/resume")}>
            <FileText className="mr-2 h-4 w-4" />
            Resume Builder
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/reports")}>
            <Briefcase className="mr-2 h-4 w-4" />
            Career Reports
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/tracker")}>
            <ClipboardList className="mr-2 h-4 w-4" />
            Job Tracker
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


