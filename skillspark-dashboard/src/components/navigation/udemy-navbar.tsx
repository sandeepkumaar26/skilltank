"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, Search, ShoppingCart, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import TopUserMenu from "@/components/navigation/top-user-menu";
import { useAuth } from "@/contexts/AuthContext";

const categories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
];

export default function UdemyNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { profile } = useAuth();

  const role = (profile?.role as string) || "student";
  const navMain = role === "admin"
    ? [
        { title: "Home", url: "/home" },
        { title: "Applications", url: "/applications" },
        { title: "Internships", url: "/internships" },
        { title: "Jobs", url: "/jobs" },
        { title: "Courses", url: "/courses" },
      ]
    : role === "startup"
    ? [
        { title: "Home", url: "/home" },
        { title: "Manage Internships", url: "/internships" },
        { title: "Manage Jobs", url: "/jobs" },
        { title: "Applications", url: "/applications" },
        { title: "Create Courses", url: "/courses" },
        { title: "Talent Pool", url: "/home" },
      ]
    : [
        { title: "Home", url: "/home" },
        { title: "Courses", url: "/courses" },
        { title: "Internships", url: "/internships" },
        { title: "Jobs", url: "/jobs" },
        { title: "Applications", url: "/applications" },
        { title: "Kaizen", url: "/kaizen" },
      ];

  const documents = [
    { name: "Resume Builder", url: "/resume" },
    { name: "Career Reports", url: "/reports" },
    { name: "Job Tracker", url: "/tracker" },
  ];

  const onSearch = (formData: FormData) => {
    const q = String(formData.get("q") || "").trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 items-center gap-3 px-3 md:gap-4 md:px-6">

        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2">
          <div className="relative h-7 w-7 md:h-8 md:w-8">
            <Image src="/logo.png" alt="SkillSpark" fill className="object-contain" />
          </div>
          <span className="hidden text-lg font-bold md:inline">SkillSpark+</span>
        </Link>

        {/* Categories */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hidden items-center gap-1 md:inline-flex hover:bg-muted hover:text-foreground"
            >
              Categories <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Top categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((c) => (
              <DropdownMenuItem key={c} onClick={() => router.push(`/courses?category=${encodeURIComponent(c)}`)}>
                {c}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Role-based main nav moved from sidebar (hide Applications here) */}
        <nav className="ml-1 hidden items-center gap-1 overflow-x-auto md:flex">
          {navMain.filter((i) => i.url !== "/applications" && i.url !== "/kaizen").map((item) => {
            const active = pathname === item.url;
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-muted" : "hover:bg-muted"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Search */}
        <form action={onSearch} className="relative ml-1 hidden flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            placeholder="Search for anything"
            className="h-10 rounded-full border-2 pl-10"
          />
        </form>

        {/* Right Actions */}
        <div className="ml-auto hidden items-center gap-1 md:flex">
          {/* Cart */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cart"
                className="hover:bg-muted hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Your cart</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-4 text-sm text-muted-foreground">Your cart is empty</div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative hover:bg-muted hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
            <Badge
              variant="secondary"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px]"
            >
              3
            </Badge>
          </Button>

          {/* User */}
          <TopUserMenu />
        </div>

        {/* Mobile actions */}
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="border-t px-3 py-2 md:hidden">
        <form action={onSearch} className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" placeholder="Search for anything" className="h-10 rounded-full pl-10" />
        </form>
      </div>
    </div>
  );
}


