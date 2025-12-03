export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  bio?: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  linkedAccounts: LinkedAccount[];
  resumePublic: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: string[];
}

export interface LinkedAccount {
  platform: 'github' | 'linkedin';
  username: string;
  url: string;
  isConnected: boolean;
  lastSync?: Date;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  applicationUpdates: boolean;
  courseReminders: boolean;
  deadlineAlerts: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  showEmail: boolean;
  showLinkedAccounts: boolean;
}