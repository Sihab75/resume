import type { Profile } from '../types';

/**
 * ============================================================================
 * CENTRAL PROFILE CONFIGURATION
 * ============================================================================
 * All personal details, social links, and contact channels are centralized here.
 * You can edit any field here to instantly update the entire website and resume.
 */
export const personalProfile: Profile = {
  fullName: 'Md. Korimul Jaman',
  profession: 'Computer Science & Engineering Student',
  headline: 'Computer Science & Engineering Student | Aspiring Software Engineer',
  university: 'Green University of Bangladesh',
  department: 'Department of Computer Science & Engineering (CSE)',
  studentId: '251002084',
  batch: '251',
  country: 'Bangladesh',
  location: 'Dhaka, Bangladesh',
  
  // Verified Contact & Social Links
  phone: '+880 1728-694997',
  whatsApp: '+8801728694997',
  
  /**
   * Email Address:
   * NOTE: Set your preferred email address below. It will automatically update
   * the contact buttons, footer, and resume.
   */
  email: 'korimuljaman.cse@gmail.com', // [EDITABLE PLACEHOLDER: Update with your primary email]

  careerGoal: 'Software Engineer',
  areasOfInterest: [
    'Software Development',
    'Problem Solving',
    'Data Structures & Algorithms',
    'Artificial Intelligence & Machine Learning',
    'Mobile Application Architecture'
  ],
  
  // Real GitHub avatar with local fallback
  avatarUrl: 'https://avatars.githubusercontent.com/u/219392843?v=4',
  
  // Verified Profiles
  githubUsername: 'Sihab75',
  githubUrl: 'https://github.com/Sihab75',
  linkedInUrl: 'https://www.linkedin.com/in/korimul-jaman-16845535b/',
  facebookUrl: 'https://www.facebook.com/md.korimul.jaman.sihab',
  
  // Competitive Programming Profiles
  codeforcesHandle: 'korimuljaman',
  codeforcesUrl: 'https://codeforces.com/profile/korimuljaman',
  codechefHandle: 'sihab_75',
  codechefUrl: 'https://www.codechef.com/users/sihab_75',
  leetcodeHandle: 'Korimul',
  leetcodeUrl: 'https://leetcode.com/u/Korimul/',
  
  // Optional / Future Platforms
  atcoderHandle: 'korimuljaman',
  atcoderUrl: 'https://atcoder.jp/users/korimuljaman', // [EDITABLE PLACEHOLDER]
  vjudgeHandle: 'korimuljaman',
  vjudgeUrl: 'https://vjudge.net/user/korimuljaman',   // [EDITABLE PLACEHOLDER]

  bio: 'Computer Science & Engineering student at Green University of Bangladesh (Batch 251) driven by a passion for algorithmic problem solving, clean software architecture, and modern mobile engineering. Focused on writing robust, maintainable code in C++, Kotlin, and Python.',

  detailedAbout: [
    'I am currently an undergraduate student in the Department of Computer Science & Engineering at Green University of Bangladesh. My academic journey has given me a deep curiosity for understanding how computational systems work under the hood, from byte-level compression algorithms to offline-first distributed mobile architectures.',
    'My core programming language of focus is C++, which I actively use for competitive programming and data structure exploration across Codeforces, LeetCode, and CodeChef. In parallel, I build practical software applications, such as Smart Life Manager—a native Android companion built with Kotlin, Jetpack Compose, Room DB, and an integrated AI proxy.',
    'I believe in deliberate practice, clean code principles, and continuous learning. As I advance through my CSE curriculum, I am expanding my skills in Artificial Intelligence and Machine Learning while seeking opportunities to contribute to real-world software engineering projects and internships.'
  ]
};
