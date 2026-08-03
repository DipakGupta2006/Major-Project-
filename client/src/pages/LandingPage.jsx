import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const dialNumbers = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];

const features = [
  {
    title: "AES-256 Encryption",
    desc: "Every stored password is encrypted at rest, not just hashed, reversible only with your key.",
  },
  {
    title: "Master Password Layer",
    desc: "A second lock in front of your vault. Session-based, three attempts, then you are back at the door.",
  },
  {
    title: "Security Scoring",
    desc: "Every saved password gets scored for entropy, reuse, and known weak patterns.",
  },
  {
    title: "Auto-Purge Recycle Bin",
    desc: "Deleted entries sit for 30 days before permanent removal, undo without permanent risk.",
  },
  {
    title: "Password Generator",
    desc: "Build random, memorable, or PIN-style passwords, with a history of your last 15 generated.",
  },
  {
    title: "Categories and Tags",
    desc: "Group entries by type or label them freely, so your vault stays searchable as it grows.",
  },
  {
    title: "Login Lockouts",
    desc: "Three failed attempts locks the account for five minutes. Brute-forcing gets nowhere fast.",
  },
  {
    title: "Security Questions Recovery",
    desc: "Forgot your password? Five hashed security questions get you back in, no email required.",
  },
];

const trustPoints = [
  {
    title: "Your data never leaves encrypted",
    desc: "Passwords are encrypted before they touch the database. Even a full database leak reveals nothing readable.",
  },
  {
    title: "No one, not even admins, can read your vault",
    desc: "Encryption keys are derived from your own credentials. Without your master password, your data is just noise, to everyone, including us.",
  },
  {
    title: "Open about what we store",
    desc: "We store your email, a hashed password, and encrypted vault entries, nothing else. No trackers, no data resale.",
  },
  {
    title: "We don't email passwords",
    desc: "We never email your password, and we never store it in plaintext. If you forget it, you can reset it with your security questions.",
  },
  {
    title: "We don't sell your data",
    desc: "We don't sell your data, and we don't share it with third parties. Your vault is yours, and only yours.",
  },
  {
    title: "We don't track you",
    desc: "We don't track you, and we don't use cookies for tracking. We only use cookies for session management.",
  },
];

const faqs = [
  {
    q: "Can VaultX admins or developers see my saved passwords?",
    a: "No. Your vault entries are encrypted using a key tied to your own master password. Nobody on the backend, including the people who built this, can decrypt them without it.",
  },
  {
    q: "What happens if I forget my master password?",
    a: "The master password only guards access to your vault view, it does not encrypt entries with a key we cannot recover. You can reset it from your profile after re-verifying your account password and security questions.",
  },
  {
    q: "What if I forget my account password?",
    a: "Use the forgot password flow: verify your email with an OTP, then answer your five security questions. No password is ever emailed to you.",
  },
  {
    q: "Why do I need both an account password and a master password?",
    a: "Your account password gets you into the app. Your master password gets you into the vault itself. Two independent locks mean a compromised account alone is not enough to expose your saved passwords.",
  },
  {
    q: "What happens when I delete a password entry?",
    a: "It moves to the Recycle Bin for 30 days, recoverable any time in that window. After 30 days, it is permanently and irreversibly deleted.",
  },
  {
    q: "Why use a password manager instead of remembering passwords myself?",
    a: "Reusing or simplifying passwords across sites is the single biggest cause of account breaches. VaultX lets you generate and store strong, unique passwords per site without needing to remember any of them.",
  },
  {
    q: "Is VaultX free to use?",
    a: "Yes, VaultX is free to use. We do not charge for any features, and we do not sell your data. We may offer premium features in the future, but the core functionality will always be free.",
  },
  {
    q: "What browsers and devices does VaultX support?",
    a: "VaultX is a web application and works on modern browsers like Chrome, Firefox, Edge, and Safari. It is also responsive and works on mobile devices and tablets.",
  },
];

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E8E6DF] overflow-x-hidden">
      <nav className="flex items-center justify-between px-8 md:px-16 py-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9A227]"></div>
          <span className="font-['Fraunces'] text-xl tracking-wide">Vault<span className="text-xl text-[#C9A227] font-bold tracking-widest">X</span> 2.0</span>
        </div>
        <div className="flex items-center gap-6 font-['Inter'] text-sm">
          <a href="/login" className="text-[#8B94A0] hover:text-[#E8E6DF] transition-colors">Unlock Vault</a>
          <a href="/register" className="px-4 py-2 rounded-sm bg-[#C9A227] text-[#0B0F14] font-medium hover:bg-[#dbb537] transition-colors">Create Vault</a>
        </div>
      </nav>

      <section className="px-8 md:px-16 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div>
          <p className="font-['JetBrains_Mono'] text-xs tracking-[0.2em] text-[#3FA796] mb-6 uppercase">
            Encrypted, Local-first, Yours
          </p>
          <h1 className="font-['Fraunces'] text-5xl md:text-6xl leading-[1.05] mb-6">
            Every password,
            <br />
            <span className="text-[#C9A227]">locked properly.</span>
          </h1>
          <p className="text-[#8B94A0] text-lg leading-relaxed mb-10 max-w-md">
            VaultX keeps your credentials behind two independent locks, your account, and a separate master password that guards the vault itself.
          </p>
          <div className="flex items-center gap-4">
            <a href="/register" className="px-6 py-3 rounded-sm bg-[#C9A227] text-[#0B0F14] font-medium hover:bg-[#dbb537] transition-colors">Get started</a>
            <a href="/login" className="px-6 py-3 rounded-sm border border-white/15 hover:border-white/30 transition-colors">I have an account</a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            <svg viewBox="0 0 340 340" className="w-full h-full">
              <g style={{ transformOrigin: '170px 170px', animation: 'spin-cw 90s linear infinite' }}>
                <circle cx="170" cy="170" r="162" fill="none" stroke="#1c2530" strokeWidth="1" />
                {dialNumbers.map((num, i) => {
                  const angle = (i / dialNumbers.length) * 2 * Math.PI - Math.PI / 2;
                  const x1 = 170 + 155 * Math.cos(angle);
                  const y1 = 170 + 155 * Math.sin(angle);
                  const x2 = 170 + 162 * Math.cos(angle);
                  const y2 = 170 + 162 * Math.sin(angle);
                  const tx = 170 + 145 * Math.cos(angle);
                  const ty = 170 + 145 * Math.sin(angle);
                  return (
                    <g key={num}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3FA796" strokeWidth="1.5" opacity="0.5" />
                      <g style={{ transformOrigin: `${tx}px ${ty}px`, animation: 'spin-ccw 90s linear infinite' }}>
                        <text x={tx} y={ty} fill="#8B94A0" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" dominantBaseline="middle">
                          {num}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>

              <g style={{ transformOrigin: '170px 170px', animation: 'spin-ccw 60s linear infinite' }}>
                <circle cx="170" cy="170" r="130" fill="none" stroke="#1c2530" strokeWidth="1" />
                {dialNumbers.map((num, i) => {
                  const angle = (i / dialNumbers.length) * 2 * Math.PI - Math.PI / 2;
                  const x1 = 170 + 118 * Math.cos(angle);
                  const y1 = 170 + 118 * Math.sin(angle);
                  const x2 = 170 + 130 * Math.cos(angle);
                  const y2 = 170 + 130 * Math.sin(angle);
                  const tx = 170 + 102 * Math.cos(angle);
                  const ty = 170 + 102 * Math.sin(angle);
                  return (
                    <g key={num}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A227" strokeWidth="1.5" opacity="0.5" />
                      <g style={{ transformOrigin: `${tx}px ${ty}px`, animation: 'spin-cw 60s linear infinite' }}>
                        <text x={tx} y={ty} fill="#8B94A0" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" dominantBaseline="middle">
                          {num}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-[#131A22] border border-[#C9A227]/30 flex flex-col items-center justify-center shadow-[0_0_60px_-10px_rgba(201,162,39,0.25)]">
                <span className="font-['JetBrains_Mono'] text-2xl text-[#C9A227]">2.0</span>
                <div className="flex items-baseline gap-0.5 mt-1 flex items-center justify-center">
                  <span className="text-[13px] text-[#8B94A0] tracking-widest flex items-center">Vault</span>
                  <span className="text-[15px] text-[#C9A227] font-bold tracking-widest">X</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-16 pb-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-sm overflow-hidden">
          {features.map((f) => (
            <div key={f.title} className="bg-[#0B0F14] p-8 hover:bg-[#131A22] transition-colors">
              <h3 className="font-['Fraunces'] text-xl mb-2 text-[#E8E6DF]">{f.title}</h3>
              <p className="text-[#8B94A0] text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="px-8 md:px-16 pb-24 max-w-7xl mx-auto">
        <p className="font-['JetBrains_Mono'] text-xs tracking-[0.2em] text-[#3FA796] mb-4 uppercase">
          Why trust VaultX
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {trustPoints.map((t) => (
            <div
              key={t.title}
              className="border-l-3 border-[#C9A227]/40 pl-5 transition-colors duration-300 hover:border-[#C9A227]"
            >
              <h4 className="font-['Fraunces'] text-lg mb-2">{t.title}</h4>
              <p className="text-[#8B94A0] text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 md:px-16 pb-24 max-w-4xl mx-auto">
        <h2 className="font-['Fraunces'] text-3xl mb-10">Frequently asked questions</h2>
        <div className="divide-y divide-white/10">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.q} className="py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="font-['Inter'] font-medium text-[#E8E6DF] pr-4">{item.q}</span>
                  <span
                    className={`text-[#C9A227] text-xl shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#8B94A0] text-sm leading-relaxed mt-3 max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-8 md:px-16 pb-24 max-w-4xl mx-auto text-center">
        <div className="border border-white/10 rounded-sm bg-[#131A22] py-16 px-8">
          <p className="font-['JetBrains_Mono'] text-xs tracking-[0.2em] text-[#3FA796] mb-4 uppercase">
            Ready when you are
          </p>
          <h2 className="font-['Fraunces'] text-3xl md:text-4xl mb-4">
            Lock it down properly.
          </h2>
          <p className="text-[#8B94A0] text-base mb-10 max-w-md mx-auto">
            Two locks, one vault, zero excuses for reused passwords. Your vault is yours, and only yours.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">

            
            <Link to="/register" className="px-6 py-3 rounded-sm bg-[#C9A227] text-[#0B0F14] font-medium hover:bg-[#dbb537] transition-colors"
            >Get started</Link>

           <Link to="/login" className="px-6 py-3 rounded-sm border border-white/15 hover:border-white/30 transition-colors"
            >I have an account</Link>
          </div>
        </div >
      </section >

      <footer className="px-8 md:px-16 py-8 border-t border-white/5 flex justify-between items-center">
        <span className="text-xs text-[#8B94A0] font-['JetBrains_Mono']">VaultX 2.0</span>
        <span className="text-xs text-[#8B94A0]">Built with care for what you do not want lost.</span>
      </footer>
    </div >
  );
};

export default LandingPage;