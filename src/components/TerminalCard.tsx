import React, { useState } from 'react';
import { Terminal, Copy, Check, Code2, Sparkles } from 'lucide-react';
import { personalProfile } from '../data/profile';

export const TerminalCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cpp' | 'kotlin' | 'info'>('cpp');
  const [copyStatus, setCopyStatus] = useState<'copied' | 'error' | null>(null);
  const tabs = ['cpp', 'kotlin', 'info'] as const;

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

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    event.preventDefault();
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = (currentIndex + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    setCopyStatus(null);
    document.getElementById(`terminal-tab-${nextTab}`)?.focus();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/90 shadow-2xl backdrop-blur-md">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-950/90 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-emerald-500/80"></div>
          <span className="hidden md:inline ml-1.5 text-xs font-mono text-slate-400 flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            terminal:~
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1" role="tablist" aria-label="Code language switchers">
          <button
            id="terminal-tab-cpp"
            role="tab"
            aria-controls="terminal-panel"
            aria-selected={activeTab === 'cpp'}
            tabIndex={activeTab === 'cpp' ? 0 : -1}
            onKeyDown={handleTabKeyDown}
            onClick={() => { setActiveTab('cpp'); setCopyStatus(null); }}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors cursor-pointer ${
              activeTab === 'cpp'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            main.cpp
          </button>
          <button
            id="terminal-tab-kotlin"
            role="tab"
            aria-controls="terminal-panel"
            aria-selected={activeTab === 'kotlin'}
            tabIndex={activeTab === 'kotlin' ? 0 : -1}
            onKeyDown={handleTabKeyDown}
            onClick={() => { setActiveTab('kotlin'); setCopyStatus(null); }}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors cursor-pointer ${
              activeTab === 'kotlin'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Profile.kt
          </button>
          <button
            id="terminal-tab-info"
            role="tab"
            aria-controls="terminal-panel"
            aria-selected={activeTab === 'info'}
            tabIndex={activeTab === 'info' ? 0 : -1}
            onKeyDown={handleTabKeyDown}
            onClick={() => { setActiveTab('info'); setCopyStatus(null); }}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors cursor-pointer ${
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
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          title={copyStatus === 'error' ? 'Clipboard access failed' : copyStatus === 'copied' ? 'Snippet copied' : 'Copy snippet'}
        >
          {copyStatus === 'copied' ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className={`w-4 h-4 ${copyStatus === 'error' ? 'text-rose-400' : ''}`} />
          )}
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {copyStatus === 'copied' ? 'Snippet copied to clipboard.' : copyStatus === 'error' ? 'Could not access the clipboard.' : ''}
        </span>
      </div>

      {/* Terminal Content Body */}
      <div
        id="terminal-panel"
        role="tabpanel"
        aria-labelledby={`terminal-tab-${activeTab}`}
        tabIndex={0}
        className="p-3 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed"
      >
        <pre className="whitespace-pre">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Bottom status line */}
      <div className="px-3 sm:px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500">
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
