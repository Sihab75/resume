# Md. Korimul Jaman - Developer Resume & Portfolio Website

A modern, high-performance personal developer portfolio and interactive ATS-friendly resume website engineered for **Md. Korimul Jaman**, Computer Science & Engineering student at **Green University of Bangladesh** (Batch 251) and aspiring Software Engineer.

---

## 🌟 Key Highlights

- **ATS-Friendly Digital & PDF Resume**:
  - Live structured ATS paper view directly on the page.
  - One-click instant vector PDF download (`Md_Korimul_Jaman_Resume.pdf`).
  - Browser-native print stylesheet (`@media print`) for clean printing.
- **Verified Software Projects Showcase**:
  - **Smart Life Manager**: Native Android companion built with Kotlin, Jetpack Compose, Room Database (offline-first), Firebase sync, and a Node.js/Express AI Assistant backend.
  - **Huffman File Compressor**: From-scratch lossless Huffman Coding algorithmic engine & CustomTkinter desktop GUI in Python 3 with real-time binary prefix tree visualization canvas and SHA-256 integrity verification.
  - **Algorithmic Problem Solving & STL**: Curated repository of competitive programming solutions in modern C++ (74+ verified Codeforces problems).
- **Competitive Programming Hub**:
  - Connected with the **Codeforces API** for live rating, contest rank, and unique problems solved in the latest 100 submissions.
  - API failures display unavailable values rather than presenting stale defaults as live data.
  - Direct verified profiles for **CodeChef**, **LeetCode**, and upcoming handles for **AtCoder** and **VJudge**.
- **Interactive Developer Experience**:
  - Hero interactive terminal featuring live C++, Kotlin, and Shell tabs.
  - A full-screen animated underwater background with WebGL caustics, light rays, mouse-driven waves, a lightweight mobile/CSS fallback, and reduced-motion support.
  - Responsive dark & light mode with persistent user preference.
  - Pure type safety with TypeScript, Vite, and Tailwind CSS.
- **Privacy & Authenticity**:
  - 100% verified credentials; no fabricated work experience, fake companies, or arbitrary skill percentages.
  - Fully configurable personal data in a single centralized file (`src/data/profile.ts`).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS
- **Icons**: Lucide React + Custom SVG Brand Icons
- **PDF Engine**: Client-side dynamic `jspdf` generator + pre-compiled vector PDF asset
- **Data Architecture**: Centralized type-safe modules in `src/data/`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm (v9.0 or later)
- For browser-based verification scripts, set `CHROME_PATH` to your Chrome/Chromium executable if it is not installed at the default Windows path.

### Installation

```bash
# Clone or open the repository directory
cd resume

# Install dependencies
npm install
```

### Running Locally (Development Mode)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

This compiles optimized, code-split production bundles into the `dist/` directory.

### Previewing the Production Build

```bash
npm run preview
```

---

## ⚙️ How to Update Your Information

All website content is centralized in the `src/data/` directory so you never have to edit complex JSX or styling classes.

### 1. Update Personal Info & Social Links
Open `src/data/profile.ts`:
- Set `email: 'your.real.email@domain.com'` and `isEmailVerified: true` once ready to publish.
- Toggle `isPhonePublic: false` if you wish to mask your phone number on the live web.
- Update `phone`, `whatsApp`, or social media URLs as needed.
- Modify `bio` or `detailedAbout` to refine your self-introduction.

### 2. Update Technical Skills
Open `src/data/skills.ts`:
- Add new languages, frameworks, or tools under the appropriate category.
- Set `level` to `'proficient'`, `'working-knowledge'`, or `'currently-learning'`.

### 3. Add or Modify Projects
Open `src/data/projects.ts`:
- Add new projects with title, tagline, tech stack, key features, and GitHub URLs.
- The project modal and filter tabs update automatically.

### 4. Update Competitive Programming Stats
Open `src/data/competitive.ts`:
- Add your profile handles and links for AtCoder, VJudge, or other contest platforms.
- Codeforces stats are fetched dynamically from the official API.

### 5. Update Education & Timeline
Open `src/data/education.ts`:
- Add university CGPA once published, new certifications, or honors.

---

## 📄 Generating & Updating the PDF Resume

The project provides two independent ways to update your resume PDF:

### Option A: Automatic Node Script Generation
The Node generator has manually maintained resume content separate from `src/data/`. Update the generator as well as the relevant data files when profile content changes, then run:
```bash
node scripts/generate-pdf.js
```
This generates `public/Md_Korimul_Jaman_Resume.pdf`, which is instantly served to users when they click **Download Resume**.

### Option B: In-Browser Print / Save as PDF
Scroll to the **Resume** section on the website and click **Print Resume**. In your browser's print dialog, choose **"Save as PDF"** for a perfectly formatted ATS document.

---

## 🌐 Free One-Click Deployment

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub (`https://github.com/Sihab75/resume`).
2. Visit [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository and click **Deploy**.
4. Vercel automatically detects Vite and builds your site with automatic HTTPS.

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and log in.
2. Select **"Add new site" > "Import an existing project"**.
3. Select your GitHub repository. Build command: `npm run build`, Publish directory: `dist`.

### Deploy to GitHub Pages
1. In `vite.config.ts`, set `base: '/resume/'` (or your repository name).
2. Run `npm run build`.
3. Push the `dist/` folder or set up GitHub Actions for GitHub Pages deployment.

---

## 👤 Author

**Md. Korimul Jaman**
- University: Green University of Bangladesh (CSE, Batch 251, ID: 251002084)
- GitHub: [@Sihab75](https://github.com/Sihab75)
- LinkedIn: [korimul-jaman](https://www.linkedin.com/in/korimul-jaman-16845535b/)
- Codeforces: [korimuljaman](https://codeforces.com/profile/korimuljaman)
- WhatsApp: +880 1728-694997

---

## 📜 License
MIT License. Free to use, adapt, and build upon.
