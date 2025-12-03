"use client";

import * as React from "react";
import { Plus, Filter, Building2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationCard, type ApplicationStatus } from "@/components/dashboard/application-card";

// Mock application data
const mockInternshipApplications = [
  {
    id: "1",
    role: "Frontend Developer Intern",
    company: "TechCorp",
    appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    status: "under_review" as ApplicationStatus,
    progress: 65,
  },
  {
    id: "2",
    role: "Data Science Intern",
    company: "DataCorp",
    appliedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "interview_scheduled" as ApplicationStatus,
    progress: 85,
  },
  {
    id: "3",
    role: "UX Design Intern",
    company: "DesignStudio",
    appliedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: "accepted" as ApplicationStatus,
    progress: 100,
  },
  {
    id: "4",
    role: "Backend Developer Intern",
    company: "ServerTech",
    appliedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: "rejected" as ApplicationStatus,
    progress: 40,
  },
  {
    id: "5",
    role: "Product Management Intern",
    company: "ProductCo",
    appliedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: "submitted" as ApplicationStatus,
    progress: 25,
  },
];

const mockJobApplications = [
  {
    id: "6",
    role: "Senior Frontend Developer",
    company: "TechGiant",
    appliedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    status: "interview_completed" as ApplicationStatus,
    progress: 90,
  },
  {
    id: "7",
    role: "Data Scientist",
    company: "AI Solutions",
    appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    status: "under_review" as ApplicationStatus,
    progress: 55,
  },
  {
    id: "8",
    role: "Product Designer",
    company: "DesignFirst",
    appliedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    status: "rejected" as ApplicationStatus,
    progress: 30,
  },
  {
    id: "9",
    role: "DevOps Engineer",
    company: "CloudTech",
    appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    status: "draft" as ApplicationStatus,
    progress: 10,
  },
];

type FilterStatus = 'all' | ApplicationStatus;

export default function ApplicationsPage() {
  const [internshipFilter, setInternshipFilter] = React.useState<FilterStatus>('all');
  const [jobFilter, setJobFilter] = React.useState<FilterStatus>('all');

  const filteredInternships = internshipFilter === 'all' 
    ? mockInternshipApplications 
    : mockInternshipApplications.filter(app => app.status === internshipFilter);

  const filteredJobs = jobFilter === 'all' 
    ? mockJobApplications 
    : mockJobApplications.filter(app => app.status === jobFilter);

  const handleApplicationAction = (applicationId: string, action: string) => {
    console.log(`Action "${action}" for application ${applicationId}`);
    // In a real app, this would handle the specific action
  };

  const getApplicationActions = (status: ApplicationStatus) => {
    switch (status) {
      case 'draft':
        return [
          { id: 'edit', label: 'Edit Application', type: 'primary' as const, onClick: () => handleApplicationAction('', 'edit') },
          { id: 'delete', label: 'Delete Draft', type: 'destructive' as const, onClick: () => handleApplicationAction('', 'delete') },
        ];
      case 'submitted':
      case 'under_review':
        return [
          { id: 'view', label: 'View Application', type: 'primary' as const, onClick: () => handleApplicationAction('', 'view') },
          { id: 'withdraw', label: 'Withdraw Application', type: 'destructive' as const, onClick: () => handleApplicationAction('', 'withdraw') },
        ];
      case 'interview_scheduled':
        return [
          { id: 'view', label: 'View Details', type: 'primary' as const, onClick: () => handleApplicationAction('', 'view') },
          { id: 'calendar', label: 'Add to Calendar', type: 'secondary' as const, onClick: () => handleApplicationAction('', 'calendar') },
        ];
      case 'accepted':
        return [
          { id: 'offer', label: 'View Offer', type: 'primary' as const, onClick: () => handleApplicationAction('', 'offer') },
          { id: 'accept', label: 'Accept Offer', type: 'primary' as const, onClick: () => handleApplicationAction('', 'accept') },
        ];
      default:
        return [
          { id: 'view', label: 'View Details', type: 'primary' as const, onClick: () => handleApplicationAction('', 'view') },
        ];
    }
  };

  const ApplicationList = ({ applications, filter, onFilterChange }: {
    applications: typeof mockInternshipApplications;
    filter: FilterStatus;
    onFilterChange: (filter: FilterStatus) => void;
  }) => (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm rounded-xl p-4 border">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Filter className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold">Filter by Status:</span>
          </div>
          <Select value={filter} onValueChange={(value: FilterStatus) => onFilterChange(value)}>
            <SelectTrigger className="w-[200px] h-10 bg-background/80 border-2 hover:border-primary/50 transition-colors">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">📋 All Applications</SelectItem>
              <SelectItem value="draft">✏️ Draft</SelectItem>
              <SelectItem value="submitted">📤 Submitted</SelectItem>
              <SelectItem value="under_review">👀 Under Review</SelectItem>
              <SelectItem value="interview_scheduled">📅 Interview Scheduled</SelectItem>
              <SelectItem value="interview_completed">✅ Interview Completed</SelectItem>
              <SelectItem value="accepted">🎉 Accepted</SelectItem>
              <SelectItem value="rejected">❌ Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
          <span className="text-sm font-medium text-primary">
            {applications.length}
          </span>
          <span className="text-sm text-muted-foreground">
            application{applications.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              {...application}
              actions={getApplicationActions(application.status)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center mb-6">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No applications found</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {filter === 'all' 
              ? "You haven't applied to any positions yet. Start exploring opportunities to kickstart your career!"
              : `No applications with status "${filter}". Try adjusting your filter or create a new application.`
            }
          </p>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Browse Opportunities
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            My Applications
          </h1>
          <p className="text-muted-foreground text-lg">
            Track and manage your job and internship applications
          </p>
        </div>
        <Button className="h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      <Tabs defaultValue="internships" className="space-y-8">
        <TabsList className="grid w-full max-w-lg grid-cols-2 h-12 p-1 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger 
            value="internships" 
            className="flex items-center gap-2 h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Building2 className="h-4 w-4" />
            Internships
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium">
              {filteredInternships.length}
            </span>
          </TabsTrigger>
          <TabsTrigger 
            value="jobs" 
            className="flex items-center gap-2 h-10 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <FileText className="h-4 w-4" />
            Jobs
            <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium">
              {filteredJobs.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internships">
          <ApplicationList
            applications={filteredInternships}
            filter={internshipFilter}
            onFilterChange={setInternshipFilter}
          />
        </TabsContent>

        <TabsContent value="jobs">
          <ApplicationList
            applications={filteredJobs}
            filter={jobFilter}
            onFilterChange={setJobFilter}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}