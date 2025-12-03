"use client";

import { useFormContext, useFieldArray } from 'react-hook-form';
import { useWizard } from 'react-use-wizard';
import { CourseForm } from '@/lib/validation/courseSchema';
import { FileDropZone } from '@/components/FileDropZone';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Plus, Trash2, Link as LinkIcon, FileText, Image, Video, Presentation } from 'lucide-react';

const MediaUploadStep = () => {
  const { setValue, watch, control } = useFormContext<CourseForm>();
  const lessons = watch('lessons');
  const { previousStep, nextStep } = useWizard();
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null);

  const addContentToLesson = (lessonIndex: number, contentType: 'video' | 'text' | 'image' | 'ppt' | 'pdf' | 'link') => {
    const lesson = lessons[lessonIndex];
    if (!lesson) return;

    const newContent = {
      id: Date.now().toString(),
      type: contentType,
      title: '',
      order: lesson.content?.length || 0,
    };

    const updatedContent = [...(lesson.content || []), newContent];
    setValue(`lessons.${lessonIndex}.content`, updatedContent);
  };

  const removeContentFromLesson = (lessonIndex: number, contentIndex: number) => {
    const lesson = lessons[lessonIndex];
    if (!lesson) return;

    const updatedContent = lesson.content.filter((_: any, index: number) => index !== contentIndex);
    setValue(`lessons.${lessonIndex}.content`, updatedContent);
  };

  const handleFileUpload = (lessonIndex: number, contentIndex: number, files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setValue(`lessons.${lessonIndex}.content.${contentIndex}.file`, file);
      setValue(`lessons.${lessonIndex}.content.${contentIndex}.url`, url);
    }
  };

  const updateContentField = (lessonIndex: number, contentIndex: number, field: string, value: any) => {
    // Cast the dynamic path to satisfy react-hook-form's Path<T> constraint at compile-time
    setValue(
      (`lessons.${lessonIndex}.content.${contentIndex}.${field}` as unknown) as any,
      value as any
    );
  };

  const renderContentEditor = (lessonIndex: number, contentIndex: number, content: any) => {
    const contentPath = `lessons.${lessonIndex}.content.${contentIndex}`;

    switch (content.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Video Title</Label>
              <Input
                value={content.title || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'title', e.target.value)}
                placeholder="Enter video title"
              />
            </div>
            <div className="space-y-2">
              <Label>Upload Video</Label>
              <FileDropZone
                acceptedTypes="video"
                onFilesAdded={(files) => handleFileUpload(lessonIndex, contentIndex, files)}
                maxSize={1024 * 1024 * 1024} // 1GB
              />
              {content.url && (
                <video src={content.url} controls className="w-full max-w-md h-48 object-cover rounded-lg border" />
              )}
            </div>
            <div className="space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea
                value={content.description || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'description', e.target.value)}
                placeholder="Describe this video content"
                rows={3}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Image Title</Label>
              <Input
                value={content.title || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'title', e.target.value)}
                placeholder="Enter image title"
              />
            </div>
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <FileDropZone
                acceptedTypes="image"
                onFilesAdded={(files) => handleFileUpload(lessonIndex, contentIndex, files)}
                maxSize={10 * 1024 * 1024} // 10MB
              />
              {content.url && (
                <img src={content.url} alt={content.title} className="w-full max-w-md h-48 object-cover rounded-lg border" />
              )}
            </div>
            <div className="space-y-2">
              <Label>Caption/Description</Label>
              <Textarea
                value={content.description || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'description', e.target.value)}
                placeholder="Add a caption or description for this image"
                rows={3}
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Text Section Title</Label>
              <Input
                value={content.title || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'title', e.target.value)}
                placeholder="Enter section title"
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={content.textContent || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'textContent', e.target.value)}
                placeholder="Write your text content here... (Supports Markdown)"
                rows={8}
                className="font-mono"
              />
              <p className="text-xs text-gray-500">Supports Markdown formatting</p>
            </div>
          </div>
        );

      case 'link':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Link Title</Label>
              <Input
                value={content.title || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'title', e.target.value)}
                placeholder="Enter link title"
              />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={content.linkUrl || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'linkUrl', e.target.value)}
                placeholder="https://example.com"
                type="url"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={content.description || ''}
                onChange={(e) => updateContentField(lessonIndex, contentIndex, 'description', e.target.value)}
                placeholder="Describe what students will find at this link"
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return <div>Unknown content type</div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Content & Media</CardTitle>
        </CardHeader>
        <CardContent>
          {lessons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No lessons to add content to.</p>
              <p className="text-sm">Go back to add some lessons first.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Lesson Selector */}
              <div className="space-y-2">
                <Label>Select Lesson to Add Content</Label>
                <Select
                  value={selectedLessonIndex?.toString() || ''}
                  onValueChange={(value) => setSelectedLessonIndex(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons.map((lesson: any, index: number) => (
                      <SelectItem key={lesson.id} value={index.toString()}>
                        {lesson.title || `Lesson ${index + 1}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Management for Selected Lesson */}
              {selectedLessonIndex !== null && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Content for: {lessons[selectedLessonIndex]?.title || `Lesson ${selectedLessonIndex + 1}`}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addContentToLesson(selectedLessonIndex, 'video')}
                        >
                          <Video className="w-4 h-4 mr-1" />
                          Video
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addContentToLesson(selectedLessonIndex, 'image')}
                        >
                          <Image className="w-4 h-4 mr-1" />
                          Image
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addContentToLesson(selectedLessonIndex, 'text')}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Text
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addContentToLesson(selectedLessonIndex, 'link')}
                        >
                          <LinkIcon className="w-4 h-4 mr-1" />
                          Link
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {lessons[selectedLessonIndex]?.content?.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p>No content added yet</p>
                        <p className="text-sm">Click the buttons above to add different types of content</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {lessons[selectedLessonIndex]?.content?.map((content: any, contentIndex: number) => (
                          <Card key={content.id} className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {content.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                                  {content.type === 'image' && <Image className="w-5 h-5 text-green-600" />}
                                  {content.type === 'text' && <FileText className="w-5 h-5 text-gray-600" />}
                                  {content.type === 'link' && <LinkIcon className="w-5 h-5 text-purple-600" />}
                                  <span className="font-medium capitalize">{content.type} Content</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeContentFromLesson(selectedLessonIndex, contentIndex)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent>
                              {renderContentEditor(selectedLessonIndex, contentIndex, content)}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={previousStep}>
          Back: Content Structure
        </Button>
        <Button onClick={nextStep}>
          Next: Review & Publish
        </Button>
      </div>
    </div>
  );
};

export default MediaUploadStep;