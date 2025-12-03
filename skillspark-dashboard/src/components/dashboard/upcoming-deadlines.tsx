"use client";

import * as React from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Deadline {
  id: string;
  title: string;
  company?: string;
  type: 'application' | 'assignment' | 'interview' | 'course';
  dueDate: Date;
  isUrgent?: boolean;
}

export interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
  className?: string;
}

function formatDaysUntil(date: Date): string {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return "Overdue";
  } else if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Tomorrow";
  } else if (diffDays <= 7) {
    return `${diffDays} days`;
  } else {
    return date.toLocaleDateString();
  }
}

function getDeadlineVariant(deadline: Deadline): 'default' | 'destructive' | 'secondary' {
  const now = new Date();
  const diffTime = deadline.dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0 || deadline.isUrgent) {
    return 'destructive';
  } else if (diffDays <= 3) {
    return 'secondary';
  }
  return 'default';
}

function getTypeIcon(type: Deadline['type']) {
  switch (type) {
    case 'application':
      return Calendar;
    case 'assignment':
      return Clock;
    case 'interview':
      return AlertCircle;
    case 'course':
      return Clock;
    default:
      return Calendar;
  }
}

export function UpcomingDeadlines({ deadlines, className }: UpcomingDeadlinesProps) {
  if (deadlines.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No upcoming deadlines. Great job staying on top of things! 🎉
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.map((deadline) => {
          const Icon = getTypeIcon(deadline.type);
          const variant = getDeadlineVariant(deadline);
          const daysUntil = formatDaysUntil(deadline.dueDate);
          
          return (
            <div
              key={deadline.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                variant === 'destructive' && "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/10",
                variant === 'secondary' && "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/10",
                variant === 'default' && "border-border bg-card"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  variant === 'destructive' && "bg-red-100 dark:bg-red-900/20",
                  variant === 'secondary' && "bg-amber-100 dark:bg-amber-900/20",
                  variant === 'default' && "bg-muted"
                )}>
                  <Icon className={cn(
                    "h-4 w-4",
                    variant === 'destructive' && "text-red-600 dark:text-red-400",
                    variant === 'secondary' && "text-amber-600 dark:text-amber-400",
                    variant === 'default' && "text-muted-foreground"
                  )} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-tight">
                    {deadline.title}
                  </p>
                  {deadline.company && (
                    <p className="text-xs text-muted-foreground">
                      {deadline.company}
                    </p>
                  )}
                </div>
              </div>
              <Badge variant={variant} className="text-xs">
                {daysUntil}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}