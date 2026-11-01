import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Sparkles } from 'lucide-react';
import { personalProfile } from '../data/profile';

export const TerminalCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cpp' | 'kotlin' | 'info'>('cpp');
  const [copied, setCopied] = useState(false);

  const cppCode = `// Problem Solver & Software Engineer Mindset
#include <iostream>
#include <vector>
#include <string>

struct Developer {
    std::string name = "${personalProfile.fullName}";
    std::string role = "CSE Student @ Green University";
    std::string id = "${personalProfile.studentId}";
    int batch = ${personalProfile.batch};
    std::vector<std::string> languages = {"C++", "Kotlin", "Python", "C"};
    std::string focus = "Algorithms & Mobile Architecture";
    
    void displayGoal() const {
        std::cout << "Aspiring Software Engineer & Active CP Contestant\\n";
    }
};

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);
    
    Developer korimul;
    korimul.displayGoal();
    return 0;
}`;

  const kotlinCode = `// Native Android & Jetpack Compose
package com.sihab.smartlifemanager

data class StudentProfile(
    val studentName: String = "${personalProfile.fullName}",
    val university: String = "${personalProfile.university}",
    val batch: Int = ${personalProfile.batch},
    val target: String = "Offline-First Mobile Architecture",
    val primaryTools: List<String> = listOf("Kotlin", "Compose", "Room DB")
)

fun getMotivation(): String =
    "Building real, helpful applications for students."`;

  const infoCode = `$ whoami
${personalProfile.fullName}

$ cat /etc/education
University : ${personalProfile.university}
Department : ${personalProfile.department}
Student ID : ${personalProfile.studentId} (Batch ${personalProfile.batch})
Location   : ${personalProfile.location}

$ git status -s
M  Competitive_Programming/Codeforces (74+ solved)
M  Projects/Smart_Life_Manager (Android + Room)
M  Algorithms/Huffman_Compressor (Python + Trees)`;

  const currentCode = activeTab === 'cpp' ? cppCode : activeTab === 'kotlin' ? kotlinCode : infoCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-2xl backdrop-blur-md">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            korimul@terminal:~
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('cpp')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'cpp'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            main.cpp
          </button>
          <button
            onClick={() => setActiveTab('kotlin')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'kotlin'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Profile.kt
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'info'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            status.sh
          </button>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy snippet"
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          title="Copy snippet"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Terminal Content Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed">
        <pre className="whitespace-pre">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Bottom status line */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span className="flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Language: {activeTab === 'cpp' ? 'C++17' : activeTab === 'kotlin' ? 'Kotlin 1.9' : 'Bash'}</span>
        </span>
        <span className="flex items-center gap-1 text-emerald-400">
          <Sparkles className="w-3 h-3" />
          UTF-8 • Compiles Clean
        </span>
      </div>
    </div>
  );
};
