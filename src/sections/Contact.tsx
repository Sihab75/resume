import React, { useState } from 'react';
import { Send, Check, Copy, MapPin, Phone, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../components/Icons';
import { personalProfile } from '../data/profile';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    subject: '',
    message: ''
  });
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const cleanPhone = personalProfile.whatsApp.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Korimul, I reviewed your developer portfolio and resume.')}`;

  const hasEmail = personalProfile.isEmailVerified && personalProfile.email.trim().length > 0;

  const handleCopyPhone = () => {
    if (personalProfile.isPhonePublic) {
      navigator.clipboard.writeText(personalProfile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
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
      navigator.clipboard.writeText(fullDraft);
      setSubmittedStatus('Message draft copied to clipboard! You can also message directly via WhatsApp or LinkedIn.');
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16 overflow-hidden">
      {/* Section Container Card inspired by reference */}
      <div className="w-[92%] max-w-7xl mx-auto rounded-[2.25rem] p-6 sm:p-8 md:p-12 bg-gradient-to-br from-pink-50/70 via-slate-50/90 to-white/95 dark:from-black dark:via-slate-900/90 dark:to-black border border-red-100/70 dark:border-zinc-800/80 shadow-xl shadow-red-500/5">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-800 dark:text-orange-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-red-500" />
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
            Let's Work <span className="text-red-500">Together</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Open to software engineering internship opportunities, competitive programming discussions, and collaborative projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 cols on lg): Send a Message Form */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-950 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800/80 p-6 sm:p-8 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label htmlFor="contact-name" className="block text-slate-700 dark:text-orange-400 font-bold mb-1.5">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-zinc-900/60 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-slate-700 dark:text-orange-400 font-bold mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={formData.senderEmail}
                  onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-zinc-900/60 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-slate-700 dark:text-orange-400 font-bold mb-1.5">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Software Engineering Opportunity / Inquiry"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-zinc-900/60 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-slate-700 dark:text-orange-400 font-bold mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Share details about the role, project, or question..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-zinc-900/60 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-full transition-all duration-300 shadow-md shadow-red-500/25 cursor-pointer flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
                Submitting prepares an email draft or copies your message to your clipboard for direct messaging via WhatsApp/LinkedIn.
              </p>

              {submittedStatus && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-800 mt-2">
                  {submittedStatus}
                </div>
              )}
            </form>
          </div>

          {/* Right Column (1 col on lg): Contact Cards matching reference */}
          <div className="flex flex-col gap-6">
            
            {/* Phone & WhatsApp Card */}
            {personalProfile.isPhonePublic && (
              <div className="bg-white dark:bg-zinc-950 p-6 sm:p-7 rounded-2xl shadow-sm border-[1.5px] border-slate-100 dark:border-zinc-800/80 hover:border-red-500 transition-colors flex flex-col items-center text-center">
                <div className="bg-red-50 dark:bg-red-950/40 p-3 rounded-full mb-3 text-red-500">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-orange-400 mb-1 text-sm sm:text-base">
                  Phone & WhatsApp
                </h4>
                <p className="text-slate-600 dark:text-slate-300 font-mono text-xs sm:text-sm">
                  {personalProfile.phone}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    type="button"
                    className="p-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium pt-3 text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Opportunities</span>
                </div>
              </div>
            )}

            {/* University & Location Card */}
            <div className="bg-white dark:bg-zinc-950 p-6 sm:p-7 rounded-2xl shadow-sm border-[1.5px] border-slate-100 dark:border-zinc-800/80 hover:border-red-500 transition-colors flex flex-col items-center text-center">
              <div className="bg-red-50 dark:bg-red-950/40 p-3 rounded-full mb-3 text-red-500">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-orange-400 mb-1 text-sm sm:text-base">
                Location & Campus
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                {personalProfile.location}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {personalProfile.university}
              </p>
              <p className="text-[11px] font-mono text-red-500 mt-0.5">
                Batch 251 • CSE
              </p>
            </div>

            {/* Professional Profiles Card */}
            <div className="bg-white dark:bg-zinc-950 p-6 sm:p-7 rounded-2xl shadow-sm border-[1.5px] border-slate-100 dark:border-zinc-800/80 hover:border-red-500 transition-colors flex flex-col items-center text-center">
              <h4 className="font-bold text-slate-900 dark:text-orange-400 mb-3 text-sm sm:text-base">
                Online Profiles
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href={personalProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-black text-white dark:bg-white dark:text-black transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalProfile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0077B5] hover:bg-[#006097] text-white transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
