"use client";

import { useFormContext } from 'react-hook-form';
import { useWizard } from 'react-use-wizard';
import { CourseForm } from '@/lib/validation/courseSchema';
import { useCreateCourse } from '@/hooks/useCourses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const ReviewPublishStep = () => {
  const { getValues } = useFormContext<CourseForm>();
  const { previousStep } = useWizard();
  const createCourseMutation = useCreateCourse();
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();
  
  const data = getValues();

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await createCourseMutation.mutateAsync(data);
      toast.success('Course published successfully!');
      router.push('/courses');
    } catch (error) {
      console.error('Failed to publish course:', error);
      toast.error('Failed to publish course. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review Your Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Course Overview */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{data.title || 'Untitled Course'}</h3>
              <p className="text-gray-600">{data.shortDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Price:</span> {data.price > 0 ? `$${data.price}` : 'Free'}
              </div>
              <div>
                <span className="font-medium">Certificate:</span> {data.certificate ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-medium">Visibility:</span> {data.visibility}
              </div>
              <div>
                <span className="font-medium">Lessons:</span> {data.lessons.length}
              </div>
            </div>

            {/* Categories */}
            {data.category.length > 0 && (
              <div>
                <span className="font-medium text-sm">Categories:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.category.map((cat) => (
                    <Badge key={cat} variant="secondary">{cat}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {data.tags.length > 0 && (
              <div>
                <span className="font-medium text-sm">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lessons Overview */}
          <div>
            <h4 className="font-medium mb-3">Course Content</h4>
            <div className="space-y-2">
              {data.lessons.map((lesson, index) => (
                <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg">
                    {lesson.type === 'video' && '📹'}
                    {lesson.type === 'text' && '📝'}
                    {lesson.type === 'quiz' && '❓'}
                    {lesson.type === 'mixed' && '🎯'}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{lesson.title || `Lesson ${index + 1}`}</div>
                    <div className="text-sm text-gray-600 capitalize">{lesson.type} lesson</div>
                  </div>
                  {lesson.content && lesson.content.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {lesson.content.length} content item{lesson.content.length !== 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Long Description */}
          {data.longDesc && (
            <div>
              <h4 className="font-medium mb-2">Detailed Description</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {data.longDesc}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          Back: Media Upload
        </Button>
        <Button 
          onClick={handlePublish} 
          disabled={isPublishing || createCourseMutation.isPending}
          className="bg-green-600 hover:bg-green-700"
        >
          {isPublishing || createCourseMutation.isPending ? 'Publishing...' : 'Publish Course'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewPublishStep;