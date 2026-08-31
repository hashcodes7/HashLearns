import sys

content = """
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
"""

with open("src/components/TopicGraphics.jsx", "a", encoding="utf-8") as f:
    f.write(content)

print("More graphics added.")
