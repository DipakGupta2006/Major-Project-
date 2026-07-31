import React from 'react';

const dialNumbers = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];

// const features = [
//   {
//     title: "AES-256 Encryption",
//     desc: "Every stored password is encrypted at rest, not just hashed, reversible only with your key.",
//   },
//   {
//     title: "Master Password Layer",
//     desc: "A second lock in front of your vault. Session-based, three attempts, then you are back at the door.",
//   },
//   {
//     title: "Security Scoring",
//     desc: "Every saved password gets scored for entropy, reuse, and known weak patterns.",
//   },
//   {
//     title: "Auto-Purge Recycle Bin",
//     desc: "Deleted entries sit for 30 days before permanent removal, undo without permanent risk.",
//   },
// ];

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

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E8E6DF] overflow-x-hidden">
      <nav className="flex items-center justify-between px-8 md:px-16 py-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C9A227]"></div>
          <span className="font-['Fraunces'] text-xl tracking-wide">VaultX 2.0</span>
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
                <span className="text-[10px] text-[#8B94A0] tracking-widest mt-1">VAULTX</span>
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

      <footer className="px-8 md:px-16 py-8 border-t border-white/5 flex justify-between items-center">
        <span className="text-xs text-[#8B94A0] font-['JetBrains_Mono']">VaultX 2.0</span>
        <span className="text-xs text-[#8B94A0]">Built with care for what you do not want lost.</span>
      </footer>
    </div>
  );
};

export default LandingPage;