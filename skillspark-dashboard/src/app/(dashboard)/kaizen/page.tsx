"use client";

import * as React from "react";
import { Award, Calendar, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KaizenStepper, type WeekData } from "@/components/dashboard/kaizen-stepper";

// Mock Kaizen program data
const mockWeeksData: WeekData[] = [
  {
    week: 1,
    title: "Foundations of Continuous Improvement",
    isCompleted: true,
    quizScore: 95,
    uploadStatus: 'approved',
    description: "Learn the fundamental principles of Kaizen methodology and its applications in personal and professional development.",
    dueDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
  },
  {
    week: 2,
    title: "Process Analysis and Mapping",
    isCompleted: true,
    quizScore: 88,
    uploadStatus: 'approved',
    description: "Master the techniques for analyzing and mapping current processes to identify improvement opportunities.",
    dueDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    week: 3,
    title: "Implementation Strategies",
    isCompleted: false,
    quizScore: undefined,
    uploadStatus: 'uploaded',
    description: "Develop skills in implementing Kaizen improvements and managing change in organizations.",
    dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    week: 4,
    title: "Measurement and Sustainability",
    isCompleted: false,
    quizScore: undefined,
    uploadStatus: 'pending',
    description: "Learn how to measure improvement results and ensure long-term sustainability of changes.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
];

const programStats = {
  totalStudents: 1247,
  averageCompletionTime: "6 weeks",
  certificationsIssued: 892,
  successRate: 89,
};

export default function KaizenPage() {
  const handleFileUpload = async (week: number, file: File) => {
    console.log(`Uploading file for week ${week}:`, file.name);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In a real app, this would upload to a server
  };

  const handleDownloadCertificate = () => {
    console.log("Downloading certificate...");
    // In a real app, this would download the certificate
  };

  const currentWeek = mockWeeksData.find(week => !week.isCompleted)?.week || 4;
  const completedWeeks = mockWeeksData.filter(week => week.isCompleted).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kaizen Certification</h1>
          <p className="text-muted-foreground mt-2">
            Master continuous improvement methodologies and earn your certification
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Week {currentWeek} of 4
        </Badge>
      </div>

      {/* Program Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{programStats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Completion</p>
                <p className="text-2xl font-bold">{programStats.averageCompletionTime}</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">{programStats.certificationsIssued.toLocaleString()}</p>
              </div>
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{programStats.successRate}%</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Information */}
      <Card>
        <CardHeader>
          <CardTitle>About the Kaizen Certification Program</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The Kaizen Certification Program is a comprehensive 4-week course designed to teach you the principles 
            and practices of continuous improvement. Through a combination of theoretical learning, practical 
            assignments, and real-world applications, you'll develop the skills needed to drive positive change 
            in any organization.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">What You'll Learn:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Kaizen methodology fundamentals</li>
                <li>• Process analysis and improvement techniques</li>
                <li>• Change management strategies</li>
                <li>• Measurement and sustainability practices</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Complete all weekly assignments</li>
                <li>• Pass weekly quizzes with 80% or higher</li>
                <li>• Submit final project</li>
                <li>• Attend virtual workshops (optional)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kaizen Stepper */}
      <KaizenStepper
        weeks={mockWeeksData}
        currentWeek={currentWeek}
        onUpload={handleFileUpload}
        onDownloadCertificate={handleDownloadCertificate}
      />
    </div>
  );
}