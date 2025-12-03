export interface Student {
  id: string
  name: string
  email: string
  college: string
  avatar?: string
  kaizenScore: number
  skills: string[]
  domain: string
  location: string
  availability: string
  isPremium: boolean
  resumeUrl: string
  portfolioUrl?: string
  githubUrl?: string
  linkedinUrl?: string
  createdAt: string
  rating?: number
  institutionTier?: 'Tier 1' | 'Tier 2' | 'Tier 3'
  aiMatchScore?: number
  bio?: string
}

export interface PendingStudent extends Student {
  submittedOn: string
  assignmentSubmissions: string[]
  completionCertificate: string
  plagiarismCheck: {
    similarity: number
    status: 'passed' | 'failed'
    details: string
  }
  status: 'pending' | 'approved' | 'rejected'
}

export interface FilterOptions {
  searchTerm?: string
  domain?: string
  location?: string
  availability?: string
  scoreRange: [number, number]
  tags: string[]
  institutionTier?: string
}

export interface OverviewStats {
  totalCertifiedTalent: number
  domainsAvailable: number
  avgCompletionTime: string
  avgCertificationScore: number
}