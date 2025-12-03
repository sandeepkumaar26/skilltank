import { CheckCircle } from "lucide-react"

export function SuccessToast() {
  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className="bg-[#12B76A] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
        <CheckCircle className="h-5 w-5" />
        <p className="text-sm font-medium">
          Internship published successfully! Track applications in 'My Internships'.
        </p>
      </div>
    </div>
  )
}