export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  industry: string;
  size: string;
  location: string;
}

export interface Internship {
  id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  duration: string;
  stipend: number;
  location: string;
  isRemote: boolean;
  tags: string[];
  deadline: Date;
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  experience: string;
  salary: SalaryRange;
  location: string;
  isRemote: boolean;
  tags: string[];
  deadline: Date;
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
}

export type OpportunityType = 'internship' | 'job';
export type Opportunity = Internship | Job;