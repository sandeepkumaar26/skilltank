"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PremiumInternsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the new hiring page
    router.replace('/dashboard/hiring')
  }, [router])

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto border border-[#D0D5DD]">
        <p className="text-[#667085] text-center">Redirecting to Hiring page...</p>
      </div>
    </div>
  )
}