"use client";

import { useFormContext, useFieldArray } from 'react-hook-form';
import { useWizard } from 'react-use-wizard';
import { CourseForm } from '@/lib/validation/courseSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';

const ContentStructureStep = () => {
  const { control, register, formState: { errors }, setValue, watch } = useFormContext<CourseForm>();
  const { fields, append, remove, move } = useFieldArray({ name: 'lessons', control });
  const { previousStep, nextStep } = useWizard();
  
  const lessons = watch('lessons');

  const addLesson = () => {
    append({ 
      id: Date.now().toString(), 
      title: '', 
      type: 'mixed',
      order: fields.length,
      content: [],
      resources: [],
      // Legacy support
      contentUrl: ''
    });
  };

  const canProceed = () => {
    if (fields.length === 0) return false;
    // Check if all lessons have titles
    const hasValidTitles = lessons?.every((lesson: any) => lesson.title && lesson.title.trim().length > 0) || false;
    return hasValidTitles;
  };

  const handleNext = () => {
    if (canProceed()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Content Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm">No lessons yet</p>
              <p className="text-xs">Create your first lesson to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Lesson {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => move(index, index - 1)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => move(index, index + 1)}
                        disabled={index === fields.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`lessons.${index}.title`}>Lesson Title *</Label>
                      <Input
                        {...register(`lessons.${index}.title` as const)}
                        placeholder="Enter lesson title"
                        className={errors.lessons?.[index]?.title ? 'border-red-500' : ''}
                      />
                      {errors.lessons?.[index]?.title && (
                        <p className="text-red-600 text-sm">
                          {errors.lessons[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`lessons.${index}.type`}>Lesson Type</Label>
                      <Select
                        value={lessons?.[index]?.type || field.type}
                        onValueChange={(value) => {
                          setValue(`lessons.${index}.type`, value as 'video' | 'text' | 'quiz');
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">📹 Video Only</SelectItem>
                          <SelectItem value="text">📝 Text Only</SelectItem>
                          <SelectItem value="quiz">❓ Quiz</SelectItem>
                          <SelectItem value="mixed">🎯 Mixed Content</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button 
            type="button"
            onClick={addLesson}
            className="w-full"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lesson
          </Button>

          {errors.lessons && (
            <p className="text-red-600 text-sm">{errors.lessons.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          Back: Course Details
        </Button>
        <Button onClick={handleNext} disabled={!canProceed()}>
          Next: Media Upload
        </Button>
      </div>
    </div>
  );
};

export default ContentStructureStep;