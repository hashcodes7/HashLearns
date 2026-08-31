import React from 'react';

export function JavaGraphic({ color = "#f59e0b" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <linearGradient id="javaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="javaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#javaGlow)" />
      {/* Steam lines */}
      <path d="M85 30 C85 20, 95 15, 95 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
      <path d="M100 28 C100 16, 110 12, 110 5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
      <path d="M115 30 C115 20, 125 15, 125 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
      {/* Cup */}
      <path d="M65 42 H135 V75 C135 90, 120 98, 100 98 C80 98, 65 90, 65 75 Z" fill="url(#javaGrad)" stroke="#f59e0b" strokeWidth="2"/>
      {/* Cup handle */}
      <path d="M135 50 C150 50, 150 72, 133 74" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Saucer */}
      <ellipse cx="100" cy="104" rx="48" ry="6" fill="#f59e0b" opacity="0.3" stroke="#f59e0b" strokeWidth="1.5"/>
    </svg>
  );
}

export function DSAGraphic({ color = "#6366f1" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <linearGradient id="dsaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="dsaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#dsaGlow)" />
      {/* Tree connections */}
      <line x1="100" y1="28" x2="60" y2="65" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3"/>
      <line x1="100" y1="28" x2="140" y2="65" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3"/>
      <line x1="60" y1="65" x2="40" y2="98" stroke="#6366f1" strokeWidth="2"/>
      <line x1="60" y1="65" x2="80" y2="98" stroke="#6366f1" strokeWidth="2"/>
      <line x1="140" y1="65" x2="120" y2="98" stroke="#6366f1" strokeWidth="2"/>
      <line x1="140" y1="65" x2="160" y2="98" stroke="#6366f1" strokeWidth="2"/>
      {/* Root Node */}
      <circle cx="100" cy="28" r="14" fill="#6366f1" stroke="#a5b4fc" strokeWidth="2"/>
      <text x="100" y="32" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">root</text>
      {/* Level 1 Nodes */}
      <circle cx="60" cy="65" r="12" fill="#4f46e5" stroke="#818cf8" strokeWidth="1.5"/>
      <circle cx="140" cy="65" r="12" fill="#4f46e5" stroke="#818cf8" strokeWidth="1.5"/>
      {/* Leaf Nodes */}
      <circle cx="40" cy="98" r="9" fill="url(#dsaGrad)" stroke="#6366f1" strokeWidth="1.5"/>
      <circle cx="80" cy="98" r="9" fill="url(#dsaGrad)" stroke="#6366f1" strokeWidth="1.5"/>
      <circle cx="120" cy="98" r="9" fill="url(#dsaGrad)" stroke="#6366f1" strokeWidth="1.5"/>
      <circle cx="160" cy="98" r="9" fill="url(#dsaGrad)" stroke="#6366f1" strokeWidth="1.5"/>
    </svg>
  );
}

export function SpringGraphic({ color = "#10b981" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <linearGradient id="springGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="springGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#springGlow)" />
      {/* Microservice connected boxes */}
      <rect x="35" y="45" width="30" height="30" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
      <rect x="135" y="45" width="30" height="30" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
      <path d="M65 60 H85 M115 60 H135" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2"/>
      {/* Central Leaf Icon */}
      <path d="M100 25 C125 25, 128 55, 120 75 C115 88, 100 95, 100 95 C100 95, 85 88, 80 75 C72 55, 75 25, 100 25 Z" fill="url(#springGrad)" stroke="#10b981" strokeWidth="2"/>
      <path d="M100 95 V40" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
      <path d="M100 65 Q112 55 116 52" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
      <path d="M100 75 Q88 65 84 62" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    </svg>
  );
}

export function ReactGraphic({ color = "#06b6d4" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="reactGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#reactGlow)" />
      {/* 3 Ellipses */}
      <ellipse cx="100" cy="60" rx="18" ry="46" stroke="#06b6d4" strokeWidth="2" transform="rotate(30 100 60)"/>
      <ellipse cx="100" cy="60" rx="18" ry="46" stroke="#06b6d4" strokeWidth="2" transform="rotate(90 100 60)"/>
      <ellipse cx="100" cy="60" rx="18" ry="46" stroke="#06b6d4" strokeWidth="2" transform="rotate(150 100 60)"/>
      {/* Center Core */}
      <circle cx="100" cy="60" r="8" fill="#06b6d4" stroke="#a5f3fc" strokeWidth="2"/>
    </svg>
  );
}

export function SystemDesignGraphic({ color = "#a855f7" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <linearGradient id="sysGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="sysGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#sysGlow)" />
      {/* DB Cylinders */}
      <ellipse cx="100" cy="35" rx="35" ry="10" fill="url(#sysGrad)" stroke="#a855f7" strokeWidth="2"/>
      <path d="M65 35 V55 C65 60.5, 80.5 65, 100 65 C119.5 65, 135 60.5, 135 55 V35" fill="none" stroke="#a855f7" strokeWidth="2"/>
      <path d="M65 55 V75 C65 80.5, 80.5 85, 100 85 C119.5 85, 135 80.5, 135 75 V55" fill="none" stroke="#a855f7" strokeWidth="2"/>
      <path d="M65 75 V95 C65 100.5, 80.5 105, 100 105 C119.5 105, 135 100.5, 135 95 V75" fill="none" stroke="#a855f7" strokeWidth="2"/>
      {/* Connecting Network Dots */}
      <circle cx="40" cy="60" r="4" fill="#a855f7" />
      <circle cx="160" cy="60" r="4" fill="#a855f7" />
      <line x1="44" y1="60" x2="65" y2="60" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3"/>
      <line x1="135" y1="60" x2="156" y2="60" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3"/>
    </svg>
  );
}

export function DevOpsGraphic({ color = "#f43f5e" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <linearGradient id="devopsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#be123c" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="devopsGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#devopsGlow)" />
      {/* Cloud base */}
      <path d="M140 78 C151 78, 160 69, 160 58 C160 48, 152 40, 142 39 C140 23, 122 12, 102 14 C87 15, 74 25, 70 39 C60 41, 52 49, 52 60 C52 70, 60 78, 70 78 Z" fill="url(#devopsGrad)" stroke="#f43f5e" strokeWidth="2"/>
      {/* Container boxes inside cloud */}
      <rect x="80" y="42" width="16" height="14" rx="2" fill="#f43f5e" stroke="#fff" strokeWidth="1"/>
      <rect x="100" y="42" width="16" height="14" rx="2" fill="#f43f5e" stroke="#fff" strokeWidth="1"/>
      <rect x="90" y="24" width="16" height="14" rx="2" fill="#f43f5e" stroke="#fff" strokeWidth="1"/>
      {/* Pipeline Arrow */}
      <path d="M60 96 H140 M132 90 L140 96 L132 102" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DeveloperAvatarGraphic() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="avatar-graphic-svg">
      <defs>
        <linearGradient id="avatarBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <radialGradient id="avatarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="76" fill="url(#avatarGlow)" />
      <circle cx="80" cy="80" r="68" fill="url(#avatarBg)" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
      {/* Stylized Developer Character */}
      {/* Head */}
      <circle cx="80" cy="62" r="26" fill="#fde047" />
      {/* Hair */}
      <path d="M54 60 C54 38, 106 38, 106 60 C106 48, 92 42, 80 42 C68 42, 54 48, 54 60 Z" fill="#1e293b" />
      {/* Glasses */}
      <rect x="63" y="58" width="14" height="10" rx="3" fill="#1e293b" />
      <rect x="83" y="58" width="14" height="10" rx="3" fill="#1e293b" />
      <line x1="77" y1="63" x2="83" y2="63" stroke="#1e293b" strokeWidth="2" />
      {/* Glasses glare */}
      <line x1="65" y1="60" x2="70" y2="65" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="85" y1="60" x2="90" y2="65" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Smile */}
      <path d="M74 76 C76 80, 84 80, 86 76" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      {/* Hoodie / Shoulders */}
      <path d="M40 128 C40 100, 60 94, 80 94 C100 94, 120 100, 120 128" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
      <path d="M72 94 L80 114 L88 94" fill="#38bdf8" />
    </svg>
  );
}
