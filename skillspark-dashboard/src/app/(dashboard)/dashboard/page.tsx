"use client";

import { FileText, Building2, BookOpen, Award, TrendingUp, Calendar, Target, Users, Clock, Star, ArrowRight } from "lucide-react";
import { ProfileCompletionBanner } from "@/components/dashboard/profile-completion-banner";
import { UpcomingDeadlines, type Deadline } from "@/components/dashboard/upcoming-deadlines";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - in real app this would come from API/database
const mockDeadlines: Deadline[] = [
  {
    id: "1",
    title: "Frontend Developer Application",
    company: "ApplyTech",
    type: "application",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    id: "2",
    title: "Data Analyst Position",
    company: "DataCorp",
    type: "application",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
  },
  {
    id: "3",
    title: "Kaizen Week 3 Assignment",
    type: "assignment",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    isUrgent: false,
  },
  {
    id: "4",
    title: "Technical Interview",
    company: "StartupX",
    type: "interview",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
];

const mockMissingFields = [
  "Professional Summary",
  "Skills Assessment",
  "Portfolio Links",
  "Work Experience Details",
];

export default function HomePage() { return null }