"use client";

import { useParams, notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, DollarSign, CheckCircle2, ShieldCheck, Calendar } from "lucide-react";

const mockInternships: Record<string, any> = {
  "1": {
    id: "1",
    title: "Frontend Developer Intern",
    company: { name: "TechCorp", verified: true },
    location: "Remote",
    type: "internship",
    compensation: "₹25,000/month",
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    skills: ["React", "TypeScript", "CSS"],
    description: "Work on modern web applications with mentorship from senior engineers.",
  },
};

export default function InternshipDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const data = mockInternships[id];
  if (!data) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{data.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {data.company.name}</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {data.location}</span>
            <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {data.compensation}</span>
            <Badge variant="secondary" className="capitalize">{data.type}</Badge>
            {data.company.verified && (
              <span className="flex items-center gap-1 text-emerald-600"><ShieldCheck className="h-4 w-4" /> Verified</span>
            )}
          </div>
        </div>
        <Button size="lg" className="gap-2">
          <CheckCircle2 className="h-5 w-5" /> Apply Now
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">About the Role</h3>
              <p className="text-sm text-muted-foreground">{data.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s: string) => (
                  <Badge key={s} variant="outline">{s}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Deadline</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(data.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Compensation</span>
                <span>{data.compensation}</span>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="w-full">Save Opportunity</Button>
        </div>
      </div>
    </div>
  );
}


