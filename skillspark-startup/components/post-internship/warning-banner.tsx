import { AlertTriangle } from "lucide-react"

export function WarningBanner() {
  return (
    <div className="bg-[#FFFAEB] border-l-4 border-[#F79009] p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-[#F79009]" />
        <p className="text-[#1D2939] text-sm font-medium">
          You must complete verification to publish this internship.
        </p>
      </div>
    </div>
  )
}