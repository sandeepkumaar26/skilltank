export interface CourseCreationStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
}

export interface CourseCreationWizardState {
  currentStep: number
  steps: CourseCreationStep[]
  courseData: Partial<CourseFormData>
}

export interface CourseFormData {
  // Basic Details
  title: string
  shortDesc: string
  longDesc: string
  category: string[]
  tags: string[]
  coverImageFile?: File
  price: number
  certificate: boolean
  visibility: 'draft' | 'published' | 'scheduled'
  scheduleDate?: string
  
  // Content Structure
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description?: string
  type: 'video' | 'text' | 'quiz' | 'mixed'
  duration?: number
  order: number
  content: LessonContent[]
  resources: Resource[]
  contentUrl?: string // Legacy support
}

export interface LessonContent {
  id: string
  type: 'video' | 'text' | 'image' | 'ppt' | 'pdf' | 'link'
  title: string
  description?: string
  url?: string
  file?: File
  textContent?: string
  linkUrl?: string
  order: number
}

export interface Resource {
  id: string
  name: string
  type: 'pdf' | 'ppt' | 'image' | 'document' | 'link'
  url?: string
  file?: File
  description?: string
}

export interface WizardContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  resetWizard: () => void
}

export const COURSE_CREATION_STEPS: CourseCreationStep[] = [
  {
    id: 'details',
    title: 'Course Details',
    description: 'Basic information about your course',
    isCompleted: false,
    isActive: true
  },
  {
    id: 'content',
    title: 'Content Structure',
    description: 'Create lessons and organize content',
    isCompleted: false,
    isActive: false
  },
  {
    id: 'media',
    title: 'Media Upload',
    description: 'Upload videos, images, and resources',
    isCompleted: false,
    isActive: false
  },
  {
    id: 'review',
    title: 'Review & Publish',
    description: 'Review and publish your course',
    isCompleted: false,
    isActive: false
  }
]