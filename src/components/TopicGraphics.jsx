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

export function LLMGraphic({ color = "#ec4899" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="llmGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#llmGlow)" />
      {/* Neural Network Nodes */}
      <circle cx="70" cy="40" r="6" fill="#ec4899" />
      <circle cx="70" cy="80" r="6" fill="#ec4899" />
      <circle cx="100" cy="30" r="6" fill="#ec4899" />
      <circle cx="100" cy="60" r="6" fill="#fbcfe8" />
      <circle cx="100" cy="90" r="6" fill="#ec4899" />
      <circle cx="130" cy="40" r="6" fill="#ec4899" />
      <circle cx="130" cy="80" r="6" fill="#ec4899" />
      
      {/* Connections */}
      <path d="M70 40 L100 30 M70 40 L100 60 M70 40 L100 90" stroke="#ec4899" strokeWidth="1.5" opacity="0.6"/>
      <path d="M70 80 L100 30 M70 80 L100 60 M70 80 L100 90" stroke="#ec4899" strokeWidth="1.5" opacity="0.6"/>
      <path d="M100 30 L130 40 M100 30 L130 80" stroke="#ec4899" strokeWidth="1.5" opacity="0.6"/>
      <path d="M100 60 L130 40 M100 60 L130 80" stroke="#ec4899" strokeWidth="1.5" opacity="0.8"/>
      <path d="M100 90 L130 40 M100 90 L130 80" stroke="#ec4899" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  );
}

export function ProjectsGraphic({ color = "#eab308" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="projGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#projGlow)" />
      {/* Rocket */}
      <path d="M85 85 L70 95 L75 80 Z" fill="#eab308" />
      <path d="M115 85 L130 95 L125 80 Z" fill="#eab308" />
      <path d="M100 25 C120 45, 120 75, 115 85 H85 C80 75, 80 45, 100 25 Z" fill="#eab308" stroke="#fef08a" strokeWidth="2" />
      <circle cx="100" cy="55" r="8" fill="#1e293b" stroke="#fef08a" strokeWidth="2" />
      {/* Flames */}
      <path d="M90 85 L100 105 L110 85 Z" fill="#ef4444" />
    </svg>
  );
}

export function VisionGraphic({ color = "#14b8a6" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="visionGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#visionGlow)" />
      {/* Eye / Lens shape */}
      <path d="M60 60 C80 40, 120 40, 140 60 C120 80, 80 80, 60 60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="3" />
      {/* Iris */}
      <circle cx="100" cy="60" r="12" fill="#14b8a6" />
      {/* Pupil */}
      <circle cx="100" cy="60" r="4" fill="#0f172a" />
      {/* Scanning laser line */}
      <line x1="50" y1="60" x2="150" y2="60" stroke="#5eead4" strokeWidth="1" strokeDasharray="4 2" opacity="0.8"/>
    </svg>
  );
}

export function PythonGraphic({ color = "#3b82f6" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="pyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#pyGlow)" />
      {/* Top Snake (Blue) */}
      <path d="M90 25 C115 25, 115 40, 115 45 V50 H85 V60 H115 C130 60, 130 80, 115 80 H90 C75 80, 75 60, 90 60 V55 H120 V45 C120 30, 110 20, 90 20 Z" fill="#3b82f6" opacity="0.9" />
      {/* Bottom Snake (Yellow) */}
      <path d="M110 95 C85 95, 85 80, 85 75 V70 H115 V60 H85 C70 60, 70 40, 85 40 H110 C125 40, 125 60, 110 60 V65 H80 V75 C80 90, 90 100, 110 100 Z" fill="#eab308" opacity="0.9" />
      {/* Eyes */}
      <circle cx="85" cy="35" r="3" fill="#0f172a" />
      <circle cx="115" cy="85" r="3" fill="#0f172a" />
    </svg>
  );
}

export function DistributedSystemsGraphic({ color = "#f97316" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="dsGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#dsGlow)" />
      {/* Hexagon nodes */}
      <circle cx="100" cy="60" r="12" fill="#f97316" />
      <circle cx="60" cy="30" r="10" fill="#f97316" opacity="0.8" />
      <circle cx="140" cy="30" r="10" fill="#f97316" opacity="0.8" />
      <circle cx="60" cy="90" r="10" fill="#f97316" opacity="0.8" />
      <circle cx="140" cy="90" r="10" fill="#f97316" opacity="0.8" />
      
      {/* Network Lines */}
      <line x1="70" y1="37.5" x2="90" y2="52.5" stroke="#fdba74" strokeWidth="2" strokeDasharray="3 3"/>
      <line x1="130" y1="37.5" x2="110" y2="52.5" stroke="#fdba74" strokeWidth="2" strokeDasharray="3 3"/>
      <line x1="70" y1="82.5" x2="90" y2="67.5" stroke="#fdba74" strokeWidth="2" strokeDasharray="3 3"/>
      <line x1="130" y1="82.5" x2="110" y2="67.5" stroke="#fdba74" strokeWidth="2" strokeDasharray="3 3"/>
      <line x1="60" y1="40" x2="60" y2="80" stroke="#fdba74" strokeWidth="1.5" />
      <line x1="140" y1="40" x2="140" y2="80" stroke="#fdba74" strokeWidth="1.5" />
    </svg>
  );
}

export function FlutterGraphic({ color = "#0284c7" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="flutterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#flutterGlow)" />
      <path d="M120 20 L65 75 L85 95 L140 40 Z" fill="#38bdf8" />
      <path d="M140 95 L95 50 L85 60 L120 95 Z" fill="#0284c7" />
      <path d="M120 95 L105 80 L85 100 L120 100 Z" fill="#0c4a6e" />
    </svg>
  );
}

export function InterviewGraphic({ color = "#84cc16" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="intGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#intGlow)" />
      {/* Speech bubbles */}
      <path d="M60 40 H110 C115 40, 120 45, 120 50 V70 C120 75, 115 80, 110 80 H75 L60 95 V80 H60 C55 80, 50 75, 50 70 V50 C50 45, 55 40, 60 40 Z" fill="#84cc16" stroke="#d9f99d" strokeWidth="2" />
      <path d="M140 30 H90 C85 30, 80 35, 80 40 V50 C80 55, 85 60, 90 60 H125 L140 75 V60 H140 C145 60, 150 55, 150 50 V40 C150 35, 145 30, 140 30 Z" fill="none" stroke="#65a30d" strokeWidth="2.5" />
      <text x="85" y="65" fill="#1e293b" fontSize="18" fontWeight="bold" fontFamily="sans-serif">?</text>
    </svg>
  );
}

export function TemplatesGraphic({ color = "#64748b" }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="topic-graphic-svg">
      <defs>
        <radialGradient id="tempGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="60" r="50" fill="url(#tempGlow)" />
      {/* Document Stack */}
      <rect x="75" y="25" width="40" height="50" rx="2" fill="none" stroke="#94a3b8" strokeWidth="2" />
      <rect x="80" y="30" width="40" height="50" rx="2" fill="none" stroke="#64748b" strokeWidth="2" />
      <rect x="85" y="35" width="40" height="50" rx="2" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="95" y1="50" x2="115" y2="50" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <line x1="95" y1="60" x2="115" y2="60" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
      <line x1="95" y1="70" x2="105" y2="70" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
