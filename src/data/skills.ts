import type { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Languages actively used for algorithmic problem solving, native mobile engineering, and system utilities.',
    skills: [
      { name: 'C++', level: 'proficient', highlight: true },
      { name: 'C', level: 'proficient' },
      { name: 'Kotlin', level: 'working-knowledge', highlight: true },
      { name: 'Python', level: 'working-knowledge' }
    ]
  },
  {
    id: 'fundamentals',
    title: 'Computer Science Fundamentals',
    description: 'Foundational concepts applied in competitive problem solving and academic projects.',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'proficient', highlight: true },
      { name: 'Object-Oriented Programming (OOP)', level: 'proficient', highlight: true },
      { name: 'Complexity Analysis (Big-O)', level: 'proficient' },
      { name: 'Computer Architecture & Systems', level: 'working-knowledge' },
      { name: 'Lossless Data Compression Algorithms', level: 'working-knowledge' },
      { name: 'Discrete Mathematics', level: 'working-knowledge' }
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile & Software Development',
    description: 'Modern native Android architecture, declarative UI design, and desktop application tools.',
    skills: [
      { name: 'Android Native Development', level: 'working-knowledge', highlight: true },
      { name: 'Jetpack Compose & Material 3', level: 'working-knowledge', highlight: true },
      { name: 'Offline-First Architecture', level: 'working-knowledge' },
      { name: 'Desktop GUI (CustomTkinter)', level: 'working-knowledge' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & Cloud Persistence',
    description: 'Local caching and cloud document storage utilized in verified software projects.',
    skills: [
      { name: 'Room Database (Android SQLite)', level: 'working-knowledge', highlight: true },
      { name: 'Firebase Firestore & Auth', level: 'working-knowledge' },
      { name: 'SQL Fundamentals', level: 'working-knowledge' }
    ]
  },
  {
    id: 'tools',
    title: 'Developer Tools & Platforms',
    description: 'Version control and engineering tools used across daily development workflows.',
    skills: [
      { name: 'Git & GitHub', level: 'proficient', highlight: true },
      { name: 'Android Studio', level: 'working-knowledge', highlight: true },
      { name: 'VS Code', level: 'proficient' },
      { name: 'Gradle & Build Systems', level: 'working-knowledge' },
      { name: 'Command Line / Terminal', level: 'proficient' }
    ]
  },
  {
    id: 'currently-learning',
    title: 'Areas of Interest & Currently Learning',
    description: 'Active fields of exploration and upcoming competencies.',
    skills: [
      { name: 'Artificial Intelligence & Machine Learning', level: 'currently-learning', highlight: true },
      { name: 'Advanced Dynamic Programming & Graphs', level: 'currently-learning', highlight: true },
      { name: 'Cloud & API Microservices', level: 'currently-learning' },
      { name: 'System Design Fundamentals', level: 'currently-learning' }
    ]
  }
];
