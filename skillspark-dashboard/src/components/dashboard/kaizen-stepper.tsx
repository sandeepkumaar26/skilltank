"use client";

import * as React from "react";
import { Check, Upload, Download, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface WeekData {
  week: number;
  title: string;
  isCompleted: boolean;
  quizScore?: number;
  uploadStatus: 'pending' | 'uploaded' | 'approved';
  description?: string;
  dueDate?: Date;
}

export interface KaizenStepperProps {
  weeks: WeekData[];
  currentWeek: number;
  onUpload: (week: number, file: File) => Promise<void>;
  onDownloadCertificate: () => void;
  className?: string;
}

const uploadStatusConfig = {
  pending: {
    label: 'Pending',
    variant: 'outline' as const,
    color: 'text-muted-foreground',
  },
  uploaded: {
    label: 'Uploaded',
    variant: 'secondary' as const,
    color: 'text-blue-700 dark:text-blue-300',
  },
  approved: {
    label: 'Approved',
    variant: 'default' as const,
    color: 'text-green-700 dark:text-green-300',
  },
};

export function KaizenStepper({
  weeks,
  currentWeek,
  onUpload,
  onDownloadCertificate,
  className,
}: KaizenStepperProps) {
  const [uploadingWeek, setUploadingWeek] = React.useState<number | null>(null);
  const completedWeeks = weeks.filter(week => week.isCompleted).length;
  const overallProgress = (completedWeeks / weeks.length) * 100;
  const isFullyCompleted = completedWeeks === weeks.length;

  const handleFileUpload = async (week: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingWeek(week);
    try {
      await onUpload(week, file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploadingWeek(null);
    }
  };

  const getStepStatus = (week: WeekData) => {
    if (week.isCompleted) return 'completed';
    if (week.week === currentWeek) return 'current';
    if (week.week < currentWeek) return 'available';
    return 'upcoming';
  };

  const renderWeekStep = (week: WeekData, index: number) => {
    const status = getStepStatus(week);
    const statusConfig = uploadStatusConfig[week.uploadStatus];
    const isUploading = uploadingWeek === week.week;

    return (
      <div key={week.week} className="relative">
        {/* Connection Line */}
        {index < weeks.length - 1 && (
          <div className="absolute left-6 top-12 w-px h-16 bg-border" />
        )}

        <div className="flex items-start gap-4">
          {/* Step Circle */}
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
            status === 'completed' && "border-green-500 bg-green-500 text-white",
            status === 'current' && "border-primary bg-primary text-primary-foreground",
            status === 'available' && "border-primary bg-background text-primary",
            status === 'upcoming' && "border-muted bg-muted text-muted-foreground"
          )}>
            {status === 'completed' ? (
              <Check className="h-6 w-6" />
            ) : (
              <span className="font-semibold">{week.week}</span>
            )}
          </div>

          {/* Step Content */}
          <Card className={cn(
            "flex-1 transition-colors",
            status === 'current' && "border-primary shadow-md"
          )}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Week {week.week}: {week.title}
                </CardTitle>
                <Badge variant={statusConfig.variant}>
                  {statusConfig.label}
                </Badge>
              </div>
              {week.description && (
                <p className="text-sm text-muted-foreground">
                  {week.description}
                </p>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Quiz Score */}
              {week.quizScore !== undefined && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Quiz Score</span>
                  </div>
                  <span className={cn(
                    "font-semibold",
                    week.quizScore >= 80 ? "text-green-600" : "text-red-600"
                  )}>
                    {week.quizScore}%
                  </span>
                </div>
              )}

              {/* Due Date */}
              {week.dueDate && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Due: {week.dueDate.toLocaleDateString()}</span>
                </div>
              )}

              {/* Upload Section */}
              {status !== 'upcoming' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Assignment Upload
                  </label>
                  
                  {week.uploadStatus === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.zip"
                        onChange={(e) => handleFileUpload(week.week, e)}
                        disabled={isUploading}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {isUploading && (
                        <div className="text-sm text-muted-foreground">
                          Uploading...
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Assignment submitted</span>
                      <Button variant="outline" size="sm">
                        <Upload className="h-3 w-3 mr-1" />
                        Re-upload
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Kaizen Certification Progress</span>
            <span className="text-sm font-normal">
              {completedWeeks}/{weeks.length} weeks completed
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={overallProgress} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {overallProgress.toFixed(0)}% complete
            </span>
            {isFullyCompleted && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Ready for Certificate
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Week Steps */}
      <div className="space-y-6">
        {weeks.map((week, index) => renderWeekStep(week, index))}
      </div>

      {/* Certificate Download */}
      {isFullyCompleted && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Download className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-muted-foreground mb-4">
                You have successfully completed the Kaizen Certification program.
                Your certificate is ready for download.
              </p>
              <Button onClick={onDownloadCertificate} size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}