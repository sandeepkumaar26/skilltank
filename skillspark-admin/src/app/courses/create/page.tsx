"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CourseWizard from '@/components/CourseWizard/Wizard';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export default function CreateCoursePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <CourseWizard />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}