export interface KaizenProgram {
  id: string;
  userId: string;
  startDate: Date;
  currentWeek: number;
  isCompleted: boolean;
  finalScore?: number;
  certificateUrl?: string;
  weeks: KaizenWeek[];
}

export interface KaizenWeek {
  week: number;
  title: string;
  description: string;
  requirements: string[];
  assignment?: KaizenAssignment;
  quiz?: KaizenQuiz;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface KaizenAssignment {
  id: string;
  title: string;
  description: string;
  fileUrl?: string;
  submittedAt?: Date;
  status: 'pending' | 'submitted' | 'reviewed' | 'approved' | 'rejected';
  feedback?: string;
  grade?: number;
}

export interface KaizenQuiz {
  id: string;
  title: string;
  questions: KaizenQuestion[];
  score?: number;
  maxScore: number;
  completedAt?: Date;
  passed: boolean;
}

export interface KaizenQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  userAnswer?: string | string[];
  points: number;
}

export interface KaizenCertificate {
  id: string;
  userId: string;
  programId: string;
  issuedAt: Date;
  certificateUrl: string;
  verificationCode: string;
  finalScore: number;
}