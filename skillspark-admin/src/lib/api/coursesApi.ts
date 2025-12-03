import { CourseForm } from '@/lib/validation/courseSchema';

export interface Course extends CourseForm {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  enrollmentCount?: number;
  rating?: number;
}

// Mock API functions - replace with actual API calls
export async function createCourse(course: CourseForm): Promise<Course> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock successful response
  const newCourse: Course = {
    ...course,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: course.visibility === 'published' ? 'published' : 'draft',
    enrollmentCount: 0,
    rating: 0,
  };
  
  console.log('Course created:', newCourse);
  return newCourse;
}

export async function saveDraft(course: Partial<CourseForm>): Promise<Course> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful response
  const draftCourse: Course = {
    title: course.title || 'Untitled Course',
    shortDesc: course.shortDesc || '',
    longDesc: course.longDesc || '',
    category: course.category || [],
    tags: course.tags || [],
    price: course.price || 0,
    certificate: course.certificate || false,
    visibility: 'draft',
    lessons: course.lessons || [],
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    enrollmentCount: 0,
    rating: 0,
  };
  
  console.log('Draft saved:', draftCourse);
  return draftCourse;
}

export async function getCourses(): Promise<Course[]> {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock courses
  return [
    {
      id: '1',
      title: 'React Fundamentals',
      shortDesc: 'Learn the basics of React development',
      longDesc: 'A comprehensive course covering React fundamentals...',
      category: ['Technology'],
      tags: ['react', 'javascript', 'frontend'],
      price: 49.99,
      certificate: true,
      visibility: 'published',
      lessons: [],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      status: 'published',
      enrollmentCount: 150,
      rating: 4.8,
    }
  ];
}