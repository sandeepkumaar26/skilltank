"use client";

import * as React from "react";
import { ProfileForm, type UserProfile } from "@/components/forms/profile-form";

// Mock user data
const mockUser = {
  profile: {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate software developer with 3+ years of experience in React, Node.js, and cloud technologies. Always eager to learn new technologies and contribute to innovative projects.",
    avatar: "",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    skills: [
      "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", 
      "GraphQL", "PostgreSQL", "MongoDB", "Git", "Agile", "Leadership"
    ],
    education: [
      {
        id: "1",
        institution: "Stanford University",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startYear: 2018,
        endYear: 2022,
        current: false,
      },
      {
        id: "2", 
        institution: "MIT",
        degree: "Master of Science",
        field: "Software Engineering",
        startYear: 2022,
        endYear: undefined,
        current: true,
      }
    ],
    experience: [
      {
        id: "1",
        company: "TechCorp",
        position: "Senior Frontend Developer",
        description: "Led a team of 5 developers to build and maintain React-based web applications. Implemented modern development practices including CI/CD, code reviews, and automated testing. Reduced application load time by 40% through performance optimizations.",
        startDate: "2022-06",
        endDate: undefined,
        current: true,
      },
      {
        id: "2",
        company: "StartupX",
        position: "Full Stack Developer",
        description: "Developed and deployed scalable web applications using React, Node.js, and AWS. Collaborated with designers and product managers to deliver user-centric features. Built RESTful APIs and integrated third-party services.",
        startDate: "2020-01",
        endDate: "2022-05",
        current: false,
      }
    ],
    linkedAccounts: [
      {
        id: "1",
        platform: "github" as const,
        url: "https://github.com/alexjohnson",
        verified: true,
      },
      {
        id: "2",
        platform: "linkedin" as const,
        url: "https://linkedin.com/in/alexjohnson",
        verified: true,
      },
      {
        id: "3",
        platform: "website" as const,
        url: "https://alexjohnson.dev",
        verified: false,
      }
    ],
    resumePublic: true,
  },
  preferences: {
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      profileVisible: true,
      resumePublic: true,
    }
  }
} as const;

export default function SettingsPage() {
  const handleSaveProfile = async (data: Partial<UserProfile>) => {
    console.log("Saving profile data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would save to the backend
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>
      
      <ProfileForm 
        user={mockUser}
        onSave={handleSaveProfile}
      />
    </div>
  );
}