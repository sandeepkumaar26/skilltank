                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "use client";

import { useFormContext } from 'react-hook-form';
import { useWizard } from 'react-use-wizard';
import { CourseForm, CATEGORIES } from '@/lib/validation/courseSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { X } from 'lucide-react';

const CourseDetailsStep = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext<CourseForm>();
  const { nextStep } = useWizard();
  const [newTag, setNewTag] = useState('');
  
  const watchedCategory = watch('category');
  const watchedTags = watch('tags');
  const watchedPrice = watch('price');

  const handleCategoryChange = (category: string) => {
    const currentCategories = watchedCategory || [];
    if (!currentCategories.includes(category)) {
      setValue('category', [...currentCategories, category]);
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    const currentCategories = watchedCategory || [];
    setValue('category', currentCategories.filter(cat => cat !== categoryToRemove));
  };

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue('tags', [...watchedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const canProceedToNextStep = () => {
    // Check only the fields required for this step
    const title = watch('title');
    const shortDesc = watch('shortDesc');
    const longDesc = watch('longDesc');
    const category = watch('category');
    
    return (
      title && title.trim().length >= 5 &&
      shortDesc && shortDesc.trim().length >= 20 &&
      longDesc && longDesc.trim().length >= 50 &&
      category && category.length > 0
    );
  };

  const handleNext = () => {
    if (canProceedToNextStep()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Course Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter course title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDesc">Short Description *</Label>
            <Textarea
              id="shortDesc"
              {...register('shortDesc')}
              placeholder="Brief description of your course"
              rows={3}
              className={errors.shortDesc ? 'border-red-500' : ''}
            />
            {errors.shortDesc && (
              <p className="text-red-600 text-sm">{errors.shortDesc.message}</p>
            )}
          </div>

          {/* Long Description */}
          <div className="space-y-2">
            <Label htmlFor="longDesc">Detailed Description *</Label>
            <Textarea
              id="longDesc"
              {...register('longDesc')}
              placeholder="Detailed description of what students will learn"
              rows={5}
              className={errors.longDesc ? 'border-red-500' : ''}
            />
            {errors.longDesc && (
              <p className="text-red-600 text-sm">{errors.longDesc.message}</p>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label>Categories *</Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {watchedCategory && watchedCategory.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {watchedCategory.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeCategory(category)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            
            {watchedTags && watchedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {watchedTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={watchedPrice > 0}
                onCheckedChange={(checked) => setValue('price', checked ? 29 : 0)}
              />
              <Label>Paid Course</Label>
            </div>
            
            {watchedPrice > 0 && (
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  {...register('price', { valueAsNumber: true })}
                  placeholder="29"
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm">{errors.price.message}</p>
                )}
              </div>
            )}
          </div>

          {/* Certificate */}
          <div className="flex items-center space-x-2">
            <Switch
              {...register('certificate')}
              onCheckedChange={(checked) => setValue('certificate', checked)}
            />
            <Label>Offer Certificate upon completion</Label>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!canProceedToNextStep()}>
          Next: Content Structure
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailsStep;