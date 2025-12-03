"use client";

import * as React from "react";
import { Calendar, Clock, MoreHorizontal, Upload, X, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type ApplicationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'interview_scheduled' 
  | 'interview_completed' 
  | 'rejected' 
  | 'accepted';

export interface ApplicationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'destructive';
  onClick: () => void;
}

export interface ApplicationCardProps {
  id: string;
  role: string;
  company: string;
  appliedDate: Date;
  deadline: Date;
  status: ApplicationStatus;
  progress?: number;
  actions?: ApplicationAction[];
  className?: string;
}

const statusConfig = {
  draft: {
    label: 'Draft',
    variant: 'outline' as const,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/10',
  },
  submitted: {
    label: 'Submitted',
    variant: 'secondary' as const,
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  under_review: {
    label: 'Under Review',
    variant: 'default' as const,
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
  },
  interview_scheduled: {
    label: 'Interview Scheduled',
    variant: 'default' as const,
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  interview_completed: {
    label: 'Interview Completed',
    variant: 'default' as const,
    color: 'text-indigo-700 dark:text-indigo-300',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950',
  },
  rejected: {
    label: 'Rejected',
    variant: 'destructive' as const,
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-950',
  },
  accepted: {
    label: 'Accepted',
    variant: 'default' as const,
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function calculateDaysRemaining(deadline: Date): number {
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function ApplicationCard({
  id,
  role,
  company,
  appliedDate,
  deadline,
  status,
  progress,
  actions = [],
  className,
}: ApplicationCardProps) {
  const config = statusConfig[status];
  const daysRemaining = calculateDaysRemaining(deadline);
  const hasProgress = typeof progress === 'number';

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      config.bgColor,
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 truncate">
              {role}
            </h3>
            <p className="text-muted-foreground mb-2">
              {company}
            </p>
            <Badge variant={config.variant} className="text-xs">
              {config.label}
            </Badge>
          </div>
          
          {actions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {actions.map((action, index) => (
                  <React.Fragment key={action.id}>
                    <DropdownMenuItem
                      onClick={action.onClick}
                      className={cn(
                        action.type === 'destructive' && "text-red-600 dark:text-red-400"
                      )}
                    >
                      {action.label}
                    </DropdownMenuItem>
                    {index < actions.length - 1 && <DropdownMenuSeparator />}
                  </React.Fragment>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Progress Bar */}
        {hasProgress && status !== 'rejected' && status !== 'accepted' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Application Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Dates and Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Applied: {formatDate(appliedDate)}</span>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 text-sm",
              daysRemaining <= 3 && daysRemaining > 0 && "text-amber-600 dark:text-amber-400",
              daysRemaining <= 0 && "text-red-600 dark:text-red-400"
            )}>
              <Clock className="h-4 w-4" />
              <span>
                {daysRemaining > 0 
                  ? `${daysRemaining} days remaining`
                  : daysRemaining === 0 
                    ? 'Due today'
                    : 'Overdue'
                }
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          {status === 'draft' && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <Upload className="h-3 w-3 mr-1" />
                Submit Application
              </Button>
            </div>
          )}

          {(status === 'submitted' || status === 'under_review') && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Upload className="h-3 w-3 mr-1" />
                Re-upload Documents
              </Button>
              <Button size="sm" variant="outline">
                <X className="h-3 w-3 mr-1" />
                Withdraw
              </Button>
            </div>
          )}

          {status === 'interview_scheduled' && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <ExternalLink className="h-3 w-3 mr-1" />
                Join Interview
              </Button>
            </div>
          )}

          {status === 'accepted' && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                View Offer Letter
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ApplicationCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
            <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
          </div>
          <div className="h-8 w-8 bg-muted animate-pulse rounded" />
        </div>
        
        <div className="space-y-3">
          <div className="h-2 w-full bg-muted animate-pulse rounded" />
          <div className="flex justify-between">
            <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-8 flex-1 bg-muted animate-pulse rounded" />
            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}