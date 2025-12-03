"use client";

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, CourseForm } from '@/lib/validation/courseSchema';
import { Wizard } from 'react-use-wizard';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CourseDetailsStep from './CourseDetailsStep';
import ContentStructureStep from './ContentStructureStep';
import MediaUploadStep from './MediaUploadStep';
import ReviewPublishStep from './ReviewPublishStep';
import { useState } from 'react';

const defaultValues: CourseForm = {
  title: '',
  shortDesc: '',
  longDesc: '',
  category: [],
  tags: [],
  price: 0,
  certificate: false,
  visibility: 'draft',
  lessons: [],
};

const steps = [
  { title: 'Course Details', description: 'Basic information about your course' },
  { title: 'Content Structure', description: 'Create lessons and organize content' },
  { title: 'Media Upload', description: 'Upload videos, images, and resources' },
  { title: 'Review & Publish', description: 'Review and publish your course' },
];

const CourseWizard: React.FC = () => {
  const methods = useForm<CourseForm>({ 
    resolver: zodResolver(courseSchema), 
    mode: 'onBlur',
    defaultValues
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
          <p className="text-muted-foreground">
            Build and publish your course content for students
          </p>
        </div>

        {/* Progress */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Wizard Steps */}
      <FormProvider {...methods}>
        <Wizard
          onStepChange={handleStepChange}
          startIndex={0}
        >
          <CourseDetailsStep />
          <ContentStructureStep />
          <MediaUploadStep />
          <ReviewPublishStep />
        </Wizard>
      </FormProvider>
    </div>
  );
};

export default CourseWizard;