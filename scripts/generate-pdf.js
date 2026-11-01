import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// Ensure public directory exists
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'pt',
  format: 'letter'
});

const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const margin = 40;
const contentWidth = pageWidth - (margin * 2);
let y = margin;

function checkPageBreak(neededHeight) {
  if (y + neededHeight > pageHeight - margin) {
    doc.addPage();
    y = margin;
  }
}

// Colors
const primaryColor = [26, 32, 44]; // Charcoal #1a202c
const secondaryColor = [74, 85, 104]; // Gray #4a5568
const lineColor = [226, 232, 240]; // Light gray #e2e8f0
const linkColor = [37, 99, 235]; // Blue #2563eb

// Header
doc.setFont('helvetica', 'bold');
doc.setFontSize(22);
doc.setTextColor(...primaryColor);
doc.text('Md. Korimul Jaman', margin, y);
y += 18;

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(...secondaryColor);
doc.text('Computer Science & Engineering Student | Aspiring Software Engineer', margin, y);
y += 16;

// Contact info bar
doc.setFontSize(9.5);
const contactItems = [
  'Dhaka, Bangladesh',
  'WhatsApp: +880 1728-694997',
  'Email: korimuljaman.cse@gmail.com (Editable)',
  'GitHub: github.com/Sihab75',
  'LinkedIn: linkedin.com/in/korimul-jaman-16845535b'
];
doc.text(contactItems.join('  •  '), margin, y);
y += 18;

// Divider
doc.setDrawColor(...lineColor);
doc.setLineWidth(1);
doc.line(margin, y, pageWidth - margin, y);
y += 18;

function drawSectionHeading(title) {
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text(title.toUpperCase(), margin, y);
  y += 5;
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1.2);
  doc.line(margin, y, margin + 40, y);
  y += 14;
}

// 1. PROFESSIONAL SUMMARY
drawSectionHeading('Summary');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
const summary = 
  'Motivated Computer Science and Engineering undergraduate student at Green University of Bangladesh (Batch 251) with a strong foundation in C++ programming, object-oriented concepts, and algorithmic problem solving. Experienced in developing native Android applications using Kotlin and Jetpack Compose, as well as desktop algorithmic tools in Python. Passionate about software architecture, data structures, and continuous technical growth. Seeking software engineering internships and collaborative development opportunities.';
const splitSummary = doc.splitTextToSize(summary, contentWidth);
doc.text(splitSummary, margin, y);
y += splitSummary.length * 12 + 10;

// 2. EDUCATION
drawSectionHeading('Education');

// University
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.text('Green University of Bangladesh', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...secondaryColor);
const uniDates = '2025 - Present | Dhaka, Bangladesh';
doc.text(uniDates, pageWidth - margin - doc.getTextWidth(uniDates), y);
y += 13;

doc.setFont('helvetica', 'italic');
doc.setTextColor(...primaryColor);
doc.text('Bachelor of Science in Computer Science and Engineering (CSE)', margin, y);
y += 12;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...secondaryColor);
doc.text('• Department of CSE, Batch 251 (Student ID: 251002084)', margin + 10, y);
y += 11;
doc.text('• Relevant Coursework: Structured Programming (C/C++), Data Structures, Computer Architecture, Discrete Math', margin + 10, y);
y += 16;

// HSC
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...primaryColor);
doc.text('Higher Secondary Certificate (HSC)', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...secondaryColor);
const hscDates = 'Passing Year: 2024';
doc.text(hscDates, pageWidth - margin - doc.getTextWidth(hscDates), y);
y += 13;
doc.setFont('helvetica', 'italic');
doc.setTextColor(...primaryColor);
doc.text('Science Group', margin, y);
y += 16;

// SSC
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...primaryColor);
doc.text('Secondary School Certificate (SSC)', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...secondaryColor);
const sscDates = 'Passing Year: 2022';
doc.text(sscDates, pageWidth - margin - doc.getTextWidth(sscDates), y);
y += 13;
doc.setFont('helvetica', 'italic');
doc.setTextColor(...primaryColor);
doc.text('Science Group', margin, y);
y += 20;

// 3. TECHNICAL SKILLS
drawSectionHeading('Technical Skills');
const skillsList = [
  { label: 'Programming Languages:', val: 'C++, C, Kotlin, Python' },
  { label: 'Computer Science Fundamentals:', val: 'Data Structures, Algorithms, Object-Oriented Programming (OOP), Complexity Analysis' },
  { label: 'Mobile & Software Development:', val: 'Android Native (Jetpack Compose, Room Database), GUI Development (CustomTkinter)' },
  { label: 'Developer Tools & Platforms:', val: 'Git, GitHub, Android Studio, VS Code, Linux/Windows CLI, Gradle' },
  { label: 'Areas of Interest:', val: 'Software Engineering, Problem Solving, Machine Learning & AI Applications' }
];

skillsList.forEach(s => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...primaryColor);
  doc.text(s.label, margin, y);
  const labelWidth = doc.getTextWidth(s.label) + 6;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text(s.val, margin + labelWidth, y);
  y += 13;
});
y += 10;

// 4. PROJECTS
drawSectionHeading('Projects');

// Project 1: Smart Life Manager
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...primaryColor);
doc.text('Smart Life Manager — Android Student Productivity Companion', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...linkColor);
const p1Link = 'github.com/Sihab75/smart-life-manager';
doc.text(p1Link, pageWidth - margin - doc.getTextWidth(p1Link), y);
y += 13;

doc.setFont('helvetica', 'italic');
doc.setFontSize(9);
doc.setTextColor(...secondaryColor);
doc.text('Kotlin • Jetpack Compose • Material 3 • Room Database (Offline-first) • Firebase • Node.js Backend', margin, y);
y += 13;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...primaryColor);
const p1Bullets = [
  'Engineered an offline-first native Android productivity application unifying personal finance tracking, study scheduling, Pomodoro timer, task management, and competitive programming progress.',
  'Integrated local persistence with Room Database and synchronized optional cloud backups via Firebase Authentication, Firestore, and Cloud Messaging.',
  'Connected an AI Study Assistant through a lightweight Express.js proxy to safely query AI language models without exposing API secrets in the mobile binary.'
];
p1Bullets.forEach(b => {
  const lines = doc.splitTextToSize(`•  ${b}`, contentWidth - 10);
  doc.text(lines, margin + 8, y);
  y += lines.length * 11 + 2;
});
y += 8;

// Project 2: Huffman File Compressor
checkPageBreak(80);
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...primaryColor);
doc.text('Huffman File Compressor — Lossless File Compression Engine', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...linkColor);
const p2Link = 'github.com/Sihab75/start';
doc.text(p2Link, pageWidth - margin - doc.getTextWidth(p2Link), y);
y += 13;

doc.setFont('helvetica', 'italic');
doc.setFontSize(9);
doc.setTextColor(...secondaryColor);
doc.text('Python 3 • CustomTkinter • Min-Heap Priority Queue • Binary Prefix Tree • SHA-256 Integrity Verification', margin, y);
y += 13;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...primaryColor);
const p2Bullets = [
  'Implemented from-scratch lossless Huffman Coding compression & decompression for arbitrary binary files without external compression packages.',
  'Designed a responsive multithreaded dark-themed GUI featuring live canvas visualization of the generated Huffman binary tree and frequency table.',
  'Integrated SHA-256 cryptographic checksums to verify bit-perfect data integrity between original and restored files.'
];
p2Bullets.forEach(b => {
  const lines = doc.splitTextToSize(`•  ${b}`, contentWidth - 10);
  doc.text(lines, margin + 8, y);
  y += lines.length * 11 + 2;
});
y += 8;

// Project 3: Algorithmic Solutions
checkPageBreak(70);
doc.setFont('helvetica', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(...primaryColor);
doc.text('Algorithmic Problem Solving & Data Structures Practice', margin, y);
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...linkColor);
const p3Link = 'github.com/Sihab75/localRepo';
doc.text(p3Link, pageWidth - margin - doc.getTextWidth(p3Link), y);
y += 13;

doc.setFont('helvetica', 'italic');
doc.setFontSize(9);
doc.setTextColor(...secondaryColor);
doc.text('C++ • STL • Graph Algorithms • Number Theory • Greedy Algorithms', margin, y);
y += 13;

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...primaryColor);
const p3Bullets = [
  'Solved 70+ algorithmic problems across Codeforces, CodeChef, and LeetCode focusing on optimal time and space complexity.',
  'Implemented fundamental data structures and algorithmic patterns in modern C++.'
];
p3Bullets.forEach(b => {
  const lines = doc.splitTextToSize(`•  ${b}`, contentWidth - 10);
  doc.text(lines, margin + 8, y);
  y += lines.length * 11 + 2;
});
y += 10;

// 5. COMPETITIVE PROGRAMMING PROFILES
checkPageBreak(50);
drawSectionHeading('Competitive Programming Profiles');
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...primaryColor);

const cpProfiles = [
  '• Codeforces: codeforces.com/profile/korimuljaman  (Rating: 693 | 74+ Problems Solved)',
  '• CodeChef: codechef.com/users/sihab_75',
  '• LeetCode: leetcode.com/u/Korimul/',
  '• VJudge / AtCoder: Profiles in active setup for ongoing algorithmic contests'
];
cpProfiles.forEach(p => {
  doc.text(p, margin + 8, y);
  y += 12;
});

// Save to disk
const pdfBytes = doc.output();
const targetPath = path.resolve('public', 'Md_Korimul_Jaman_Resume.pdf');
fs.writeFileSync(targetPath, Buffer.from(pdfBytes, 'binary'));
console.log('PDF successfully generated at:', targetPath);
