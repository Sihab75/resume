export interface Profile {
  fullName: string;
  profession: string;
  headline: string;
  university: string;
  department: string;
  studentId: string;
  batch: string;
  country: string;
  location: string;
  phone: string;
  whatsApp: string;
  isPhonePublic: boolean;
  email: string;
  isEmailVerified: boolean;
  careerGoal: string;
  areasOfInterest: string[];
  avatarUrl: string;
  githubUsername: string;
  githubUrl: string;
  linkedInUrl: string;
  facebookUrl: string;
  codeforcesHandle: string;
  codeforcesUrl: string;
  codechefHandle: string;
  codechefUrl: string;
  leetcodeHandle: string;
  leetcodeUrl: string;
  atcoderHandle?: string;
  atcoderUrl?: string;
  vjudgeHandle?: string;
  vjudgeUrl?: string;
  bio: string;
  detailedAbout: string[];
}

export type SkillProficiency = 'proficient' | 'working-knowledge' | 'currently-learning';

export interface SkillItem {
  name: string;
  level: SkillProficiency;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: 'Android & Mobile' | 'Algorithms & Systems' | 'Academic & Practice' | 'Web Applications';
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  status: 'Active' | 'Completed' | 'Practicing';
  keyFeatures: string[];
  architectureDetails: string[];
  isFeatured: boolean;
  repoName?: string;
}

export interface CompetitiveProfile {
  platform: string;
  handle: string;
  profileUrl: string;
  badge: string;
  rating?: number | string;
  rank?: string;
  solvedCount?: number | string;
  isVerified: boolean;
  note?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  field: string;
  period: string;
  batch?: string;
  studentId?: string;
  details: string[];
  status: 'Current' | 'Completed';
}

export interface AchievementEntry {
  title: string;
  category: string;
  date: string;
  description: string;
  link?: string;
}
