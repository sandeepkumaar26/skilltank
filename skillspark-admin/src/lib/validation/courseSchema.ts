import { z } from 'zod';

const resourceSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Resource name is required'),
  type: z.enum(['pdf', 'ppt', 'image', 'document', 'link']),
  url: z.string().optional(),
  file: z.instanceof(File).optional(),
  description: z.string().optional(),
});

const lessonContentSchema = z.object({
  id: z.string(),
  type: z.enum(['video', 'text', 'image', 'ppt', 'pdf', 'link']),
  title: z.string().min(1, 'Content title is required'),
  description: z.string().optional(),
  url: z.string().optional(),
  file: z.instanceof(File).optional(),
  textContent: z.string().optional(),
  linkUrl: z.string().refine((val) => {
    if (!val) return true; // Optional field
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, { message: 'Invalid URL format' }).optional(),
  order: z.number(),
});

const lessonSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Lesson title is required'),
  description: z.string().optional(),
  type: z.enum(['video', 'text', 'quiz', 'mixed']),
  duration: z.number().optional(),
  order: z.number(),
  content: z.array(lessonContentSchema),
  resources: z.array(resourceSchema),
  // Legacy support
  contentUrl: z.string().optional(),
});

export const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  shortDesc: z.string().min(20, 'Short description must be at least 20 characters').max(200, 'Short description must be less than 200 characters'),
  longDesc: z.string().min(50, 'Long description must be at least 50 characters'),
  category: z.array(z.string()).nonempty('At least one category is required'),
  tags: z.array(z.string()),
  coverImageFile: z
    .instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .optional(),
  price: z.number().min(0, 'Price must be 0 or greater'),
  certificate: z.boolean(),
  visibility: z.enum(['draft', 'published', 'scheduled']),
  scheduleDate: z.string().optional(),
  lessons: z.array(lessonSchema).min(1, 'At least one lesson is required'),
});

export type CourseForm = z.infer<typeof courseSchema>;

export const CATEGORIES = [
  'Technology',
  'Business',
  'Design',
  'Marketing',
  'Health & Fitness',
  'Music',
  'Photography',
  'Language',
  'Personal Development',
  'Teaching & Academics',
  'Science',
  'Mathematics',
  'Arts & Crafts',
  'Cooking',
  'Sports',
] as const;