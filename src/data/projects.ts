import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'smart-life-manager',
    title: 'Smart Life Manager',
    subtitle: 'All-in-One Android Student Productivity Companion',
    tagline: 'Native Android application unifying personal finance tracking, study scheduling, Pomodoro timer, habit building, and AI study assistance.',
    description: 'An offline-first Android productivity powerhouse engineered with Kotlin and Jetpack Compose. Built to solve the fragmented student workflow by unifying expense logging, semester routines, flashcards, Pomodoro focus sessions, and competitive programming progress into a cohesive Material 3 interface.',
    category: 'Android & Mobile',
    techStack: [
      'Kotlin',
      'Jetpack Compose',
      'Room Database',
      'Material 3',
      'Firebase Auth/Firestore',
      'WorkManager',
      'Node.js Proxy'
    ],
    githubUrl: 'https://github.com/Sihab75/smart-life-manager',
    repoName: 'smart-life-manager',
    status: 'Active',
    isFeatured: true,
    keyFeatures: [
      'Offline-First Local Persistence: Powered by Room SQLite database with instant startup and zero network latency.',
      'Pomodoro Focus Timer: Integrated 25m focus / 5m break cycles that automatically register as logged study sessions.',
      'Comprehensive Student Dashboard: Unifies daily expenses, active routines, upcoming exams, habits, and CP targets.',
      'AI Study Assistant: Connects via a lightweight backend proxy to query AI providers without leaking API secrets in the client.',
      'Cloud Synchronization: Optional Firebase sync for authenticated cloud backups and push notifications.'
    ],
    architectureDetails: [
      'Architected following Clean Architecture & MVVM with unidirectional data flow.',
      'Jetpack Compose UI with adaptive navigation rail for tablets and 4-item bottom bar on mobile.',
      'WorkManager integration for reliable background habit reminders and routine notifications.',
      'Local unit tests covering schedule conflict detection and Bangladesh phone normalization.'
    ]
  },
  {
    id: 'huffman-compressor',
    title: 'Huffman File Compressor',
    subtitle: 'Lossless Binary Compression Engine & GUI',
    tagline: 'From-scratch lossless Huffman Coding implementation compressing arbitrary binary files with real-time tree visualization.',
    description: 'A comprehensive desktop application built for Computer Architecture / Data Structures coursework. It implements the greedy Huffman Coding algorithm completely from scratch (without utilizing external compression libraries), providing bit-level streaming compression, deconstruction, and visual tree verification.',
    category: 'Algorithms & Systems',
    techStack: [
      'Python 3',
      'CustomTkinter',
      'Min-Heap Priority Queue',
      'Binary Prefix Trees',
      'Bit-Packing Stream',
      'SHA-256'
    ],
    githubUrl: 'https://github.com/Sihab75/start',
    repoName: 'start',
    status: 'Completed',
    isFeatured: true,
    keyFeatures: [
      'Pure Algorithmic Compression: Implemented greedy Huffman min-heap construction and bit-packing stream from scratch.',
      'Live Tree Visualization: Interactive zoomable and scrollable canvas displaying binary prefix trees with 0/1 edge labels.',
      'SHA-256 Data Integrity: Cryptographic verification ensuring 100% bit-perfect parity between original and restored files.',
      'Live String Demo Mode: Instant frequency inspection and tree generation for quick live demonstration.',
      'Responsive Multithreaded GUI: Background worker threads prevent UI freezing even during large file compression.'
    ],
    architectureDetails: [
      'Streaming chunked I/O maintaining bounded O(1) memory during compression of large binary files.',
      'Custom .huff binary format containing original filename, size, frequency metadata, and bit-padding headers.',
      '10-case automated test suite verifying edge cases: 0-byte, single-byte, uniform distributions, and maximum entropy data.'
    ]
  },
  {
    id: 'algorithmic-problem-solving',
    title: 'Algorithmic Problem Solving & STL',
    subtitle: 'Competitive Programming Implementations in C++',
    tagline: 'Curated repository of algorithmic solutions, data structure implementations, and competitive programming contest practice.',
    description: 'Systematic implementations of core algorithms, mathematical number theory, dynamic programming paradigms, and graph traversal techniques in modern C++. Serves as the practice hub for contest preparations on Codeforces, LeetCode, and CodeChef.',
    category: 'Academic & Practice',
    techStack: [
      'C++17',
      'C',
      'C++ STL (Vector, Map, Set, Priority Queue)',
      'Data Structures',
      'Asymptotic Analysis'
    ],
    githubUrl: 'https://github.com/Sihab75/localRepo',
    repoName: 'localRepo',
    status: 'Practicing',
    isFeatured: true,
    keyFeatures: [
      'Codeforces Solutions: 74+ verified problem solutions with optimal time & space complexity.',
      'Core Data Structures: Manual implementations and STL benchmarking of trees, heaps, and graphs.',
      'Number Theory & Math: Sieve of Eratosthenes, GCD/LCM, modular arithmetic, and combinatorial algorithms.',
      'Greedy & Dynamic Programming: Solutions to classic optimization problems with asymptotic verification.'
    ],
    architectureDetails: [
      'Organized by platform and topic (Ad-hoc, Implementation, Math, Graphs, DP).',
      'Focus on fast I/O optimizations, memory limits, and strict C++17/C++20 standards.'
    ]
  },
  {
    id: 'portfolio-resume',
    title: 'Developer Portfolio & Resume Engine',
    subtitle: 'Personal Portfolio, ATS Generator & Project Showcase',
    tagline: 'Production personal portfolio website engineered with React 19, TypeScript, Tailwind CSS, and client-side vector ATS resume generation.',
    description: 'A modern, responsive, animated personal portfolio and developer resume website built from scratch. Features an animated infinite technology skills marquee, interactive project modals, Codeforces contest integration, and an ATS-compliant PDF resume compiler.',
    category: 'Web Applications',
    techStack: [
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Vite 8',
      'jsPDF',
      'Lucide React'
    ],
    githubUrl: 'https://github.com/Sihab75/resume',
    liveDemoUrl: 'https://korimul-portfolio.vercel.app/',
    repoName: 'resume',
    status: 'Completed',
    isFeatured: true,
    keyFeatures: [
      'Animated Skills Marquee: Smooth infinite horizontal loop with pause-on-hover and reduced-motion accessibility.',
      'ATS-Compliant PDF Compiler: Generates clean, vector-rendered resumes matching ATS formatting rules.',
      'Responsive Architectural Design: Fluid adaptation across mobile, tablet, and desktop viewports.',
      'Zero-Secret Public Safety: Verified data isolation ensuring zero API keys or private tokens are leaked.'
    ],
    architectureDetails: [
      'Component-based architecture utilizing React hooks and clean unidirectional data flow.',
      'Sub-second production builds (680ms) via Vite 8 and Tailwind CSS v4.'
    ]
  }
];
