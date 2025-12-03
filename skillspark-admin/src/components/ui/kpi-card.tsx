import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease" | "neutral"
    period: string
  }
  icon?: React.ReactNode
  className?: string
}

export function KPICard({ title, value, change, icon, className }: KPICardProps) {
  const getTrendIcon = () => {
    if (!change) return null
    
    switch (change.type) {
      case "increase":
        return <TrendingUp className="h-3 w-3" />
      case "decrease":
        return <TrendingDown className="h-3 w-3" />
      case "neutral":
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    if (!change) return "secondary"
    
    switch (change.type) {
      case "increase":
        return "default" // Green
      case "decrease":
        return "destructive" // Red
      case "neutral":
        return "secondary" // Gray
    }
  }

  return (
    <Card className={cn("bg-white/90 backdrop-blur-sm border-blue-200/30 shadow-sm hover:shadow-md transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        {change && (
          <div className="flex items-center space-x-1 mt-2">
            <Badge
              variant={getTrendColor()}
              className="flex items-center space-x-1 text-xs"
            >
              {getTrendIcon()}
              <span>
                {change.type === "increase" ? "+" : change.type === "decrease" ? "-" : ""}
                {Math.abs(change.value)}%
              </span>
            </Badge>
            <span className="text-xs text-muted-foreground">{change.period}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}