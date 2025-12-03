"use client"

import { useState } from "react"
import { CreateInternshipFormNew } from "@/components/create-internship-form-new"

export default function CreateInternshipPage() {
  const [isVerified] = useState(true) // Set to true for design purposes

  const handleSuccess = () => {
    // Redirect back to post-internship page after successful creation
    window.location.href = "/dashboard/post-internship"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateInternshipFormNew 
        isVerified={isVerified} 
        onSuccess={handleSuccess}
      />
    </div>
  )
}