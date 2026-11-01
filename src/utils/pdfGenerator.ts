import { personalProfile } from '../data/profile';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { educationData } from '../data/education';

export async function downloadResumePDF() {
  // First attempt to download the pre-compiled high-res PDF asset
  try {
    const response = await fetch('/Md_Korimul_Jaman_Resume.pdf', { method: 'HEAD' });
    if (response.ok) {
      const link = document.createElement('a');
      link.href = '/Md_Korimul_Jaman_Resume.pdf';
      link.download = 'Md_Korimul_Jaman_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  } catch {
    // Fall back to dynamic client-side generation
  }

  // Dynamic import for lightweight initial bundle
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36;
  const contentWidth = pageWidth - (margin * 2);
  let y = margin;

  function checkPageBreak(neededHeight: number) {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  }

  // Palette
  const primaryColor: [number, number, number] = [17, 24, 39]; // Gray 900
  const secondaryColor: [number, number, number] = [75, 85, 99]; // Gray 600
  const lineColor: [number, number, number] = [209, 213, 219]; // Gray 300
  const linkColor: [number, number, number] = [30, 64, 175]; // Blue 800

  // 1. Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text(personalProfile.fullName, margin, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...secondaryColor);
  doc.text(`${personalProfile.profession} | Aspiring Software Engineer`, margin, y);
  y += 14;

  // Contact line
  doc.setFontSize(8.5);
  const contactText = [
    personalProfile.location,
    `WhatsApp: ${personalProfile.phone}`,
    personalProfile.email,
    'github.com/Sihab75',
    'linkedin.com/in/korimul-jaman-16845535b'
  ].join('  |  ');
  doc.text(contactText, margin, y);
  y += 14;

  // Line
  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;

  function drawHeading(title: string) {
    checkPageBreak(26);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...primaryColor);
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(1);
    doc.line(margin, y, margin + 45, y);
    y += 12;
  }

  // Summary
  drawHeading('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...primaryColor);
  const summaryLines = doc.splitTextToSize(personalProfile.bio, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 11 + 8;

  // Education
  drawHeading('Education');
  educationData.forEach(edu => {
    checkPageBreak(38);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryColor);
    doc.text(edu.institution, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...secondaryColor);
    const dateText = edu.period;
    doc.text(dateText, pageWidth - margin - doc.getTextWidth(dateText), y);
    y += 11;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    doc.text(edu.degree, margin, y);
    y += 10;

    if (edu.batch && edu.studentId) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...secondaryColor);
      doc.text(`• ${edu.field} | Batch: ${edu.batch} | ID: ${edu.studentId}`, margin + 6, y);
      y += 10;
    }
    y += 4;
  });
  y += 4;

  // Technical Skills
  drawHeading('Technical Skills');
  skillsData.slice(0, 5).forEach(cat => {
    checkPageBreak(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    const label = `${cat.title}: `;
    doc.text(label, margin, y);
    const labelWidth = doc.getTextWidth(label);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...secondaryColor);
    const items = cat.skills.map(s => s.name).join(', ');
    const splitItems = doc.splitTextToSize(items, contentWidth - labelWidth);
    doc.text(splitItems, margin + labelWidth, y);
    y += splitItems.length * 10 + 2;
  });
  y += 6;

  // Projects
  drawHeading('Key Projects');
  projectsData.forEach(proj => {
    checkPageBreak(55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryColor);
    doc.text(proj.title, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...linkColor);
    const repoText = proj.githubUrl.replace('https://', '');
    doc.text(repoText, pageWidth - margin - doc.getTextWidth(repoText), y);
    y += 11;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...secondaryColor);
    doc.text(`Technologies: ${proj.techStack.join(', ')}`, margin, y);
    y += 11;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    proj.keyFeatures.slice(0, 2).forEach(f => {
      const bullet = doc.splitTextToSize(`• ${f}`, contentWidth - 8);
      doc.text(bullet, margin + 6, y);
      y += bullet.length * 10 + 2;
    });
    y += 6;
  });

  // Competitive Programming
  checkPageBreak(45);
  drawHeading('Competitive Programming & Profiles');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  const cpLines = [
    '• Codeforces: codeforces.com/profile/korimuljaman (Rating: 693 | 74+ Problems Solved in C++)',
    '• CodeChef: codechef.com/users/sihab_75',
    '• LeetCode: leetcode.com/u/Korimul/',
    '• GitHub: github.com/Sihab75 (Active project repositories in Kotlin, Python, and C++)'
  ];
  cpLines.forEach(l => {
    doc.text(l, margin + 6, y);
    y += 11;
  });

  // Save with professional filename
  doc.save('Md_Korimul_Jaman_Resume.pdf');
}
