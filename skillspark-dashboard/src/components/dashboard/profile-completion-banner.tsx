"use client";

import * as React from "react";
import { AlertTriangle, X, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface ProfileCompletionBannerProps {
  completionPercentage: number;
  missingFields: string[];
  onDismiss?: () => void;
  onComplete?: () => void;
}

export function ProfileCompletionBanner({
  completionPercentage,
  missingFields,
  onDismiss,
  onComplete,
}: ProfileCompletionBannerProps) {
  // Don't show if profile is complete
  if (completionPercentage >= 100) {
    return null;
  }

  return (
    <Alert className="border border-border bg-card">
      <div className="flex items-start gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">
                Complete your profile to unlock more opportunities
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                A complete profile increases your chances of getting noticed by employers
              </p>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss</span>
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {completionPercentage}% complete
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {missingFields.length} fields missing
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                Missing: {missingFields.slice(0, 2).join(', ')}
                {missingFields.length > 2 && ` +${missingFields.length - 2} more`}
              </p>
            </div>
            {onComplete && (
              <Button
                onClick={onComplete}
                size="sm"
              >
                Complete Profile
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Alert>
  );
}