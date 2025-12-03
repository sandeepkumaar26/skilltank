"use client"

import { CompanyApplicantsTable } from "@/components/company-applicants-table"

export default function ApplicationsPage() {
  // You can get the internshipId from URL params, props, or context
  // For now, using a placeholder - replace with actual logic
  const internshipId = "your-internship-id"

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <p className="text-muted-foreground">
          Manage and review applications for your internships
        </p>
      </div>
      
      <CompanyApplicantsTable internshipId={internshipId} />
    </div>
  )
}