import type { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'programming-languages',
    title: 'Programming Languages',
    description: 'Core languages actively used for algorithmic problem solving, native mobile engineering, and system utilities.',
    skills: [
      { name: 'C++', level: 'proficient', highlight: true },
      { name: 'C', level: 'proficient' },
      { name: 'Kotlin', level: 'working-knowledge', highlight: true },
      { name: 'Python', level: 'working-knowledge' },
      { name: 'TypeScript', level: 'working-knowledge' },
      { name: 'JavaScript', level: 'working-knowledge' }
    ]
  },
  {
    id: 'frontend-development',
    title: 'Frontend Development',
    description: 'Modern declarative user interfaces and responsive web and mobile application engineering.',
    skills: [
      { name: 'React.js', level: 'working-knowledge', highlight: true },
      { name: 'Jetpack Compose', level: 'working-knowledge', highlight: true },
      { name: 'Tailwind CSS', level: 'proficient', highlight: true },
      { name: 'HTML5 & Semantic Web', level: 'proficient' },
      { name: 'CSS3 & Flexbox/Grid', level: 'proficient' },
      { name: 'Material 3 Design', level: 'working-knowledge' }
    ]
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    description: 'Lightweight service proxies, background worker tasks, and application integration architecture.',
    skills: [
      { name: 'Node.js', level: 'working-knowledge', highlight: true },
      { name: 'Express Proxy APIs', level: 'working-knowledge' },
      { name: 'RESTful API Integration', level: 'working-knowledge', highlight: true },
      { name: 'Android WorkManager', level: 'working-knowledge' }
    ]
  },
  {
    id: 'database',
    title: 'Database',
    description: 'Local relational persistence and cloud document caching utilized in verified software projects.',
    skills: [
      { name: 'Room Database (SQLite)', level: 'working-knowledge', highlight: true },
      { name: 'Firebase Firestore & Auth', level: 'working-knowledge' },
      { name: 'SQL Query Fundamentals', level: 'working-knowledge' }
    ]
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    description: 'Developer environments, version control systems, and build automation platforms.',
    skills: [
      { name: 'Git & GitHub', level: 'proficient', highlight: true },
      { name: 'Android Studio', level: 'working-knowledge', highlight: true },
      { name: 'VS Code', level: 'proficient' },
      { name: 'Linux / Terminal', level: 'proficient' },
      { name: 'Gradle Build System', level: 'working-knowledge' },
      { name: 'Vite & npm', level: 'proficient' }
    ]
  },
  {
    id: 'cs-fundamentals',
    title: 'Computer Science Fundamentals',
    description: 'Core computational principles and algorithmic theory applied in university coursework and contest problem solving.',
    skills: [
      { name: 'Data Structures & Algorithms', level: 'proficient', highlight: true },
      { name: 'Object-Oriented Programming (OOP)', level: 'proficient', highlight: true },
      { name: 'Complexity Analysis (Big-O)', level: 'proficient' },
      { name: 'Greedy & Dynamic Programming', level: 'working-knowledge' },
      { name: 'Binary Trees & Min-Heaps', level: 'working-knowledge', highlight: true },
      { name: 'Lossless Huffman Compression', level: 'working-knowledge' },
      { name: 'Discrete Mathematics', level: 'working-knowledge' }
    ]
  }
];
