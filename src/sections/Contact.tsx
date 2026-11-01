import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Check, Copy, ExternalLink, ShieldAlert } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { SectionHeader } from '../components/SectionHeader';
import { personalProfile } from '../data/profile';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const cleanPhone = personalProfile.whatsApp.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Korimul, I reviewed your developer portfolio and resume.')}`;

  const hasEmail = personalProfile.isEmailVerified && personalProfile.email.trim().length > 0;

  const handleCopyEmail = () => {
    if (hasEmail) {
      navigator.clipboard.writeText(personalProfile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = () => {
    if (personalProfile.isPhonePublic) {
      navigator.clipboard.writeText(personalProfile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert('Please fill out your name and message.');
      return;
    }

    const fullDraft = `Subject: ${formData.subject || 'Portfolio Inquiry'}\n\nHello Korimul,\n\n${formData.message}\n\nFrom: ${formData.name}\nReply-To: ${formData.senderEmail || 'Not provided'}`;

    if (hasEmail) {
      const subject = encodeURIComponent(formData.subject || `Inquiry from Portfolio - ${formData.name}`);
      const body = encodeURIComponent(
        `Hello Korimul,\n\n${formData.message}\n\nBest regards,\n${formData.name}\nEmail: ${formData.senderEmail || 'Not provided'}`
      );
      window.location.href = `mailto:${personalProfile.email}?subject=${subject}&body=${body}`;
      setSubmittedStatus('Email client draft launched successfully!');
    } else {
      // Email is pending approval, so copy text to clipboard and prompt user
      navigator.clipboard.writeText(fullDraft);
      setSubmittedStatus('Message draft copied to clipboard! You can send it via WhatsApp or LinkedIn, or configure your primary email in src/data/profile.ts.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Contact"
          title="Connect & Collaborate"
          subtitle="Open to software engineering internship opportunities, competitive programming discussions, and collaborative projects."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* WhatsApp Card */}
            {personalProfile.isPhonePublic && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        WhatsApp Instant Chat
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Direct messaging channel
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    type="button"
                    aria-label="Copy phone number"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  {personalProfile.phone}
                </div>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Chat</span>
                </a>
              </div>
            )}

            {/* Email Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Primary Email
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {hasEmail ? 'Verified contact channel' : 'Pending user confirmation'}
                    </p>
                  </div>
                </div>
                {hasEmail && (
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    aria-label="Copy email address"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>

              <div className="font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 break-all">
                {hasEmail ? personalProfile.email : 'Available Upon Request'}
              </div>

              {hasEmail ? (
                <a
                  href={`mailto:${personalProfile.email}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>
              ) : (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>Email placeholder active. Set your verified address in <code>src/data/profile.ts</code> to enable direct email clicks.</span>
                </div>
              )}
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personalProfile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <LinkedinIcon className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={personalProfile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 flex items-center justify-between transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <GithubIcon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>GitHub</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Accessible Message Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Fill out the fields below to prepare a message draft.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name <span className="text-rose-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe / Recruiter Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Email (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.senderEmail}
                      onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Software Engineering Internship Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message <span className="text-rose-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Write your message, project details, or inquiry here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {submittedStatus && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {submittedStatus}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{hasEmail ? `Draft Email to ${personalProfile.fullName}` : 'Copy Message Draft & Prepare'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
