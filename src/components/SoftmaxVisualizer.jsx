"use client";
import React, { useState } from "react";
import { useColorMode } from '@docusaurus/theme-common';

export default function SoftmaxVisualizer({
  initialLogits = [-1.201, 0.891, 0.131, 0.307, 1.078],
  labels = ["I", "am", "learning", "to", "Delhi"]
}) {
  const [temperature, setTemperature] = useState(1.0);
  const [logits, setLogits] = useState(initialLogits);

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Compute Softmax with Temperature
  const scaledLogits = logits.map((val) => val / temperature);
  const maxScaled = Math.max(...scaledLogits);
  const expValues = scaledLogits.map((val) => Math.exp(val - maxScaled)); // numerical stability
  const sumExp = expValues.reduce((a, b) => a + b, 0);
  const probabilities = expValues.map((val) => val / sumExp);

  const maxIndex = probabilities.indexOf(Math.max(...probabilities));

  const handleLogitChange = (index, value) => {
    const newLogits = [...logits];
    newLogits[index] = parseFloat(value) || 0;
    setLogits(newLogits);
  };

  return (
    <div style={{
      padding: "1.75rem",
      background: isDark ? "rgba(17, 24, 39, 0.4)" : "rgba(243, 244, 246, 0.8)",
      borderRadius: "16px",
      border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.1)",
      backdropFilter: "blur(12px)",
      color: isDark ? "#f3f4f6" : "#1f2937",
      marginBottom: "2rem",
      boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.25)" : "0 4px 15px rgba(0,0,0,0.05)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
        <h4 style={{ margin: 0, color: "var(--accent-color)", fontSize: "1.1rem", fontWeight: "600" }}>
          Interactive Softmax & Temperature Visualizer
        </h4>

        {/* Temperature Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", padding: "6px 12px", borderRadius: "8px", border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)" }}>
          <span style={{ fontSize: "0.85rem", color: isDark ? "#aaa" : "#4b5563" }}>Temperature (T):</span>
          <input
            type="range"
            min="0.1"
            max="2.0"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{ cursor: "pointer", accentColor: "var(--accent-color, #00f0ff)" }}
          />
          <span style={{ fontWeight: "bold", fontSize: "0.9rem", color: isDark ? "#00f0ff" : "#0284c7", minWidth: "30px" }}>
            {temperature.toFixed(1)}
          </span>
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", color: isDark ? "#aaa" : "#4b5563", marginTop: 0, marginBottom: "20px", lineHeight: "1.5" }}>
        Adjust the raw <strong>Logits</strong> or move the <strong>Temperature slider</strong> to explore how temperature controls randomness in LLM next-token generation (low <em>T</em> makes output greedy/deterministic, high <em>T</em> flattens probabilities).
      </p>

      {/* Probability Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {labels.map((label, i) => {
          const prob = probabilities[i];
          const percent = (prob * 100).toFixed(1);
          const isMax = i === maxIndex;

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Word Label */}
              <div style={{ width: "80px", fontWeight: "600", fontSize: "0.85rem", color: isMax ? (isDark ? "#10b981" : "#059669") : (isDark ? "#ddd" : "#374151"), textAlign: "right" }}>
                &quot;{label}&quot;
              </div>

              {/* Editable Logit Input */}
              <input
                type="number"
                step="0.1"
                value={logits[i]}
                onChange={(e) => handleLogitChange(i, e.target.value)}
                style={{
                  width: "60px",
                  padding: "4px 6px",
                  background: isDark ? "#232323" : "#ffffff",
                  border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.2)",
                  borderRadius: "4px",
                  color: isDark ? "#fff" : "#111827",
                  fontSize: "0.8rem",
                  textAlign: "center"
                }}
              />

              {/* Bar track */}
              <div style={{ flex: 1, height: "24px", background: isDark ? "#232323" : "#e5e7eb", borderRadius: "6px", overflow: "hidden", position: "relative", border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)" }}>
                <div style={{
                  height: "100%",
                  width: `${percent}%`,
                  background: isMax ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #3b82f6, #60a5fa)",
                  borderRadius: "6px",
                  transition: "width 0.3s ease, background 0.3s ease"
                }} />
                <span style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: isDark ? "#fff" : (isMax ? "#fff" : "#fff"), // keep white for contrast inside colored bar
                  textShadow: "0 0 4px rgba(0,0,0,0.8)"
                }}>
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Formula summary */}
      <div style={{ marginTop: "20px", paddingTop: "12px", borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", fontSize: "0.8rem", color: isDark ? "#888" : "#4b5563", display: "flex", justifyContent: "space-between" }}>
        <span>Predicted Token: <strong style={{ color: isDark ? "#10b981" : "#059669" }}>&quot;{labels[maxIndex]}&quot;</strong></span>
      </div>
    </div>
  );
}
