"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  BellRing,
  ShieldAlert,
  CheckCircle2,
  Building2,
  MapPin,
  Clock4,
  Star,
} from "lucide-react";

type RecJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  age: string;
  rating: number;
  city: string;
};

const recJobs: RecJob[] = [
  { id: "1", title: "Service Desk Analyst", company: "Wipro", location: "Pune", age: "1d ago", rating: 3.7, city: "Pune" },
  { id: "2", title: "Associate Project Specialist", company: "IQVIA", location: "Bengaluru", age: "1d ago", rating: 3.8, city: "Bengaluru" },
  { id: "3", title: "Automation Test Engineer", company: "Leading Client", location: "Bengaluru", age: "4d ago", rating: 4.1, city: "Bengaluru" },
  { id: "4", title: "Data Analyst", company: "DataWorks", location: "Hyderabad", age: "2d ago", rating: 4.0, city: "Hyderabad" },
  { id: "5", title: "Frontend Developer", company: "TechCorp", location: "Remote", age: "3d ago", rating: 4.2, city: "Remote" },
];

export default function HomePage() {
  const { user, profile } = useAuth();
  const displayName = (profile as any)?.full_name || user?.user_metadata?.name || user?.email || "Your name";

  return (
    <div className="space-y-6">
      {/* 3-column responsive layout like Naukri */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left rail: profile + shortcuts */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-center gap-3 border-b">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div className="flex-1">
                  <div className="text-sm font-semibold line-clamp-1">{displayName}</div>
                  <div className="mt-1 h-2 w-20 rounded-full bg-primary/15 relative">
                    <span className="absolute left-0 top-0 h-2 w-[6%] rounded-full bg-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">6% complete</span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold mb-2">What are you missing?</div>
                <ul className="space-y-2 text-xs">
                  {[
                    "Daily job recommendations",
                    "Job application updates",
                    "Direct jobs from recruiters",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange-500" />
                      <span className="text-muted-foreground">{t}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 w-full">Complete profile</Button>
              </div>
              <div className="border-t">
                {[
                  { label: "My home", href: "/home" },
                  { label: "Jobs", href: "/jobs" },
                  { label: "Companies", href: "/companies" },
                  { label: "Blogs", href: "/blogs" },
                ].map((i, idx) => (
                  <Link key={i.href} href={i.href} className={`block px-4 py-3 text-sm ${idx === 0 ? "bg-muted/40 font-medium" : "hover:bg-muted/40"}`}>
                    {i.label}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center column: content */}
        <div className="lg:col-span-6 space-y-4">
          {/* D&I banner */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="max-w-[70%]">
                  <div className="text-[11px] text-muted-foreground mb-1">Diversity &amp; Inclusion</div>
                  <div className="text-sm md:text-base font-medium">
                    Companies want to build inclusive teams, help us identify your disability status for better jobs.
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="rounded-full">I have a disability</Button>
                    <Button variant="outline" className="rounded-full">I don&apos;t have a disability</Button>
                    <Button className="rounded-full">Submit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended jobs carousel */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base md:text-lg">Recommended jobs for you</CardTitle>
                <Link href="/jobs" className="text-xs font-medium text-primary hover:underline">View all</Link>
              </div>
              <Tabs defaultValue="profile" className="mt-2">
                <TabsList className="h-8">
                  <TabsTrigger value="profile" className="text-xs">Profile (50)</TabsTrigger>
                  <TabsTrigger value="preferences" className="text-xs">Preferences (0)</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex gap-3 overflow-x-auto snap-x">
                {recJobs.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`} className="snap-start">
                    <Card className="w-[260px] hover:shadow-sm transition-all">
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>{job.age}</span>
                          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {job.rating}</span>
                        </div>
                        <div className="font-medium text-sm line-clamp-2">{job.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="relative h-6 w-6 rounded bg-muted overflow-hidden">
                            <Image src="/placeholder-logo.jpg" alt="logo" fill className="object-cover" />
                          </div>
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" /> {job.city}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create resume card */}
          <Card className="bg-gradient-to-r from-muted/60 to-muted/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">Create your resume in 3 easy steps</div>
                  <ol className="mt-2 list-decimal pl-5 text-xs text-muted-foreground space-y-1">
                    <li>Add the missing details in your profile</li>
                    <li>Choose a template for your resume</li>
                    <li>Improve the content with AI</li>
                  </ol>
                </div>
                <Button className="rounded-full">Create resume</Button>
              </div>
            </CardContent>
          </Card>

          {/* Explore salaries card */}
          <Card className="bg-emerald-50/60 dark:bg-emerald-900/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Explore salaries of 5 Lakh+ companies</div>
                  <p className="text-xs text-muted-foreground">Compare salaries by designations and experience.</p>
                </div>
                <Button variant="outline" className="rounded-full">Explore salaries</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right rail: info cards */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-500" />
                <div className="font-semibold">Never pay anyone to get a job</div>
              </div>
              <p className="text-xs text-muted-foreground">
                Fraudsters may ask you to invest money either to earn more OR to get you a job. Never make such payments.
              </p>
              <Link href="#" className="text-xs text-primary hover:underline">Learn more</Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="relative h-28 w-full overflow-hidden rounded-t-md">
                <Image src="/placeholder-course.jpg" alt="guide" fill className="object-cover" />
              </div>
              <div className="p-4 space-y-2 text-sm">
                <div className="font-semibold">Work Experience Certificate Format, Samples &amp; Writing Guide</div>
                <p className="text-xs text-muted-foreground">
                  Master the art of drafting work experience certificates! Explore the experience letter...
                </p>
                <Link href="#" className="text-xs text-primary hover:underline">Know more</Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


