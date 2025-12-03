"use client"

import { useState } from "react"
import { CreateInternshipForm } from "@/components/post-internship/create-internship-form"
import { MyInternshipsDashboard } from "@/components/post-internship/my-internships-dashboard"
import { InternshipMenubar } from "@/components/post-internship/internship-menubar"

export default function PostInternshipPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreateNew = () => {
    setShowCreateForm(true)
  }

  const handleBackToList = () => {
    setShowCreateForm(false)
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#1D2939] mb-2">
          Post an Internship
        </h1>
        <p className="text-[#667085] text-base">
          Create and manage your company's internship listings to attract top talent from our certified pool.
        </p>
      </div>

      {/* Menubar Navigation */}
      <InternshipMenubar onCreateNew={handleCreateNew} />

      {/* Content */}
      <div className="mt-0">
        {showCreateForm ? (
          <div>
            <button 
              onClick={handleBackToList}
              className="mb-4 text-sm text-[#667085] hover:text-[#1D2939] flex items-center"
            >
              ← Back to My Internships
            </button>
            <CreateInternshipForm />
          </div>
        ) : (
          <MyInternshipsDashboard />
        )}
      </div>
    </div>
  )
}