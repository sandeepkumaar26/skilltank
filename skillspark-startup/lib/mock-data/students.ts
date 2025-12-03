import { Student, PendingStudent } from '../types/hiring'

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@iitd.ac.in',
    college: 'IIT Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 87,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    domain: 'Web Development',
    location: 'Delhi',
    availability: 'Immediately',
    isPremium: true,
    resumeUrl: '/resumes/arjun-sharma.pdf',
    portfolioUrl: 'https://arjun-dev.com',
    githubUrl: 'https://github.com/arjunsharma',
    linkedinUrl: 'https://linkedin.com/in/arjunsharma',
    createdAt: '2024-01-15T10:00:00Z',
    rating: 4.8,
    institutionTier: 'Tier 1',
    aiMatchScore: 92
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@nitsurat.ac.in',
    college: 'NIT Surat',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 92,
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    domain: 'UI/UX Design',
    location: 'Mumbai',
    availability: '1 week',
    isPremium: true,
    resumeUrl: '/resumes/priya-patel.pdf',
    portfolioUrl: 'https://priya-designs.com',
    linkedinUrl: 'https://linkedin.com/in/priyapatel',
    createdAt: '2024-01-12T14:30:00Z',
    rating: 4.9,
    institutionTier: 'Tier 1',
    aiMatchScore: 88
  },
  {
    id: '3',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@bitspilani.ac.in',
    college: 'BITS Pilani',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 89,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'MLOps'],
    domain: 'Machine Learning',
    location: 'Bangalore',
    availability: '2 weeks',
    isPremium: true,
    resumeUrl: '/resumes/rahul-kumar.pdf',
    githubUrl: 'https://github.com/rahulkumar',
    linkedinUrl: 'https://linkedin.com/in/rahulkumar',
    createdAt: '2024-01-10T09:15:00Z',
    rating: 4.7,
    institutionTier: 'Tier 1',
    aiMatchScore: 85
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@iiith.ac.in',
    college: 'IIIT Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 94,
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    domain: 'Mobile Development',
    location: 'Hyderabad',
    availability: 'Immediately',
    isPremium: true,
    resumeUrl: '/resumes/sneha-reddy.pdf',
    githubUrl: 'https://github.com/snehareddy',
    linkedinUrl: 'https://linkedin.com/in/snehareddy',
    createdAt: '2024-01-08T16:45:00Z',
    rating: 4.9,
    institutionTier: 'Tier 1',
    aiMatchScore: 94
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@iitb.ac.in',
    college: 'IIT Bombay',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 88,
    skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Docker'],
    domain: 'Backend Development',
    location: 'Mumbai',
    availability: '1 month',
    isPremium: true,
    resumeUrl: '/resumes/vikram-singh.pdf',
    githubUrl: 'https://github.com/vikramsingh',
    linkedinUrl: 'https://linkedin.com/in/vikramsingh',
    createdAt: '2024-01-05T11:20:00Z',
    rating: 4.6,
    institutionTier: 'Tier 1',
    aiMatchScore: 79
  },
  {
    id: '6',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@nittrichy.ac.in',
    college: 'NIT Trichy',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 91,
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Tableau', 'SQL'],
    domain: 'Data Science',
    location: 'Chennai',
    availability: '2 weeks',
    isPremium: true,
    resumeUrl: '/resumes/ananya-gupta.pdf',
    portfolioUrl: 'https://ananya-data.com',
    linkedinUrl: 'https://linkedin.com/in/ananyagupta',
    createdAt: '2024-01-03T08:00:00Z',
    rating: 4.8,
    institutionTier: 'Tier 1',
    aiMatchScore: 87
  }
]

export const mockPendingStudents: PendingStudent[] = [
  {
    id: 'p1',
    name: 'Karthik Nair',
    email: 'karthik.nair@iitm.ac.in',
    college: 'IIT Madras',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 85,
    skills: ['Vue.js', 'Nuxt.js', 'JavaScript', 'CSS', 'Webpack'],
    domain: 'Frontend Development',
    location: 'Chennai',
    availability: '1 week',
    isPremium: false,
    resumeUrl: '/resumes/karthik-nair.pdf',
    portfolioUrl: 'https://karthik-dev.com',
    githubUrl: 'https://github.com/kartiknair',
    linkedinUrl: 'https://linkedin.com/in/kartiknair',
    createdAt: '2024-01-20T10:00:00Z',
    submittedOn: '2024-01-20T10:00:00Z',
    assignmentSubmissions: [
      '/assignments/karthik-project1.zip',
      '/assignments/karthik-project2.zip'
    ],
    completionCertificate: '/certificates/karthik-completion.pdf',
    plagiarismCheck: {
      similarity: 2,
      status: 'passed',
      details: '2% Similarity - No issues found'
    },
    status: 'pending'
  },
  {
    id: 'p2',
    name: 'Meera Joshi',
    email: 'meera.joshi@bitsgoa.ac.in',
    college: 'BITS Goa',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=100&h=100&fit=crop&crop=face',
    kaizenScore: 93,
    skills: ['Sketch', 'InVision', 'Principle', 'Zeplin', 'After Effects'],
    domain: 'UI/UX Design',
    location: 'Goa',
    availability: 'Immediately',
    isPremium: false,
    resumeUrl: '/resumes/meera-joshi.pdf',
    portfolioUrl: 'https://meera-designs.com',
    linkedinUrl: 'https://linkedin.com/in/meerajoshi',
    createdAt: '2024-01-18T14:30:00Z',
    submittedOn: '2024-01-18T14:30:00Z',
    assignmentSubmissions: [
      '/assignments/meera-design-system.zip'
    ],
    completionCertificate: '/certificates/meera-completion.pdf',
    plagiarismCheck: {
      similarity: 1,
      status: 'passed',
      details: '1% Similarity - No issues found'
    },
    status: 'pending'
  }
]

export const getStudents = (): Student[] => mockStudents
export const getPendingStudents = (): PendingStudent[] => mockPendingStudents

export const getOverviewStats = () => ({
  totalCertifiedTalent: 1245,
  domainsAvailable: 8,
  avgCompletionTime: '3.8 weeks',
  avgCertificationScore: 89
})