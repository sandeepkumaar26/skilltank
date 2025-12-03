export type ApplicationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'interview_scheduled' 
  | 'interview_completed' 
  | 'rejected' 
  | 'accepted';

export interface Application {
  id: string;
  userId: string;
  opportunityId: string;
  opportunityType: 'internship' | 'job';
  status: ApplicationStatus;
  appliedDate: Date;
  lastUpdated: Date;
  documents: ApplicationDocument[];
  notes?: string;
  progress?: number;
}

export interface ApplicationDocument {
  id: string;
  type: 'resume' | 'cover_letter' | 'portfolio' | 'transcript' | 'other';
  name: string;
  url: string;
  uploadedAt: Date;
  size: number;
}

export interface ApplicationAction {
  type: 'reupload' | 'withdraw' | 'view' | 'edit';
  label: string;
  enabled: boolean;
}

export interface ApplicationStatusUpdate {
  status: ApplicationStatus;
  timestamp: Date;
  notes?: string;
}