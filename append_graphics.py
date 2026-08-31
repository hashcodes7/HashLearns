import sys

content = """
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
"""

with open("src/components/TopicGraphics.jsx", "a", encoding="utf-8") as f:
    f.write(content)

print("Graphics added.")
