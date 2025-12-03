export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  reviewCount: number;
  image: string;
  price: number;
  tags: string[];
  modules: CourseModule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  videoUrl?: string;
  resources: CourseResource[];
  quiz?: Quiz;
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'document';
  url: string;
  size?: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface UserCourse {
  courseId: string;
  userId: string;
  enrolledDate: Date;
  progress: number;
  completedModules: string[];
  isCompleted: boolean;
  certificateUrl?: string;
  lastAccessedAt: Date;
  quizScores: QuizScore[];
}

export interface QuizScore {
  quizId: string;
  score: number;
  maxScore: number;
  completedAt: Date;
  passed: boolean;
}