import { LucideIcon } from 'lucide-react';
import { User } from './user';
import { Application, ApplicationAction } from './applications';
import { Course, UserCourse } from './courses';
import { Internship, Job } from './opportunities';

// Layout Components
export interface AppShellProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
}

export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  variant: 'fixed' | 'drawer' | 'sheet';
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string | number;
}

export interface TopBarProps {
  user: User;
  notifications: Notification[];
  onSearch: (query: string) => void;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

// Dashboard Components
export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color: 'primary' | 'secondary' | 'accent';
}

export interface OpportunityCardProps {
  id: string;
  title: string;
  company: string;
  logo: string;
  tags: string[];
  location: string;
  type: 'internship' | 'job';
  compensation: string;
  deadline: Date;
  onViewDetails: (id: string) => void;
}

export interface ApplicationCardProps {
  id: string;
  role: string;
  company: string;
  appliedDate: Date;
  deadline: Date;
  status: 'applied' | 'reviewing' | 'interview' | 'rejected' | 'accepted';
  progress?: number;
  actions: ApplicationAction[];
}

export interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  progress?: number;
  isCompleted?: boolean;
  hasCertificate?: boolean;
  onAction: (action: 'enroll' | 'continue' | 'certificate') => void;
}

// Form Components
export interface FilterPanelProps {
  filters: FilterConfig[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset: () => void;
}

export interface FilterConfig {
  key: string;
  type: 'select' | 'range' | 'toggle' | 'date';
  label: string;
  options?: Option[];
  min?: number;
  max?: number;
}

export interface Option {
  value: string;
  label: string;
}

export interface FilterValues {
  [key: string]: any;
}

export interface ProfileFormProps {
  user: User;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

// Specialized Components
export interface KaizenStepperProps {
  weeks: WeekData[];
  currentWeek: number;
  onUpload: (week: number, file: File) => Promise<void>;
  onDownloadCertificate: () => void;
}

export interface WeekData {
  week: number;
  title: string;
  isCompleted: boolean;
  quizScore?: number;
  uploadStatus: 'pending' | 'uploaded' | 'approved';
}

export interface ResumeToolsProps {
  tools: ResumeTool[];
  onAnalyze: (tool: string, data: any) => Promise<AnalysisResult>;
}

export interface ResumeTool {
  id: string;
  name: string;
  description: string;
  type: 'upload' | 'form' | 'integration';
}

export interface AnalysisResult {
  score?: number;
  passed?: boolean;
  suggestions: string[];
  details: any;
}