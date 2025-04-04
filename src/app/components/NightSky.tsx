"use client";
import React, { useEffect, useState } from "react";
import type { JournalEntry } from "@/app/lib/journalUtils"; // Import the correct type
import { colors, shadows } from "@/theme";

interface NightSkyProps {
  entries: JournalEntry[];
}

interface Constellation {
  stars: string[];
  lines: { start: string; end: string }[];
}

const NightSky: React.FC<NightSkyProps> = ({ entries }) => {
  const [constellations, setConstellations] = useState<Constellation[]>([]);

  // Create constellations if there are 5+ entries
  useEffect(() => {
    if (entries.length >= 5) {
      const recentEntries = [...entries]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);

      const lines = [];
      for (let i = 0; i < recentEntries.length - 1; i++) {
        lines.push({
          start: recentEntries[i].id,
          end: recentEntries[i + 1].id,
        });
      }

      setConstellations([
        {
          stars: recentEntries.map((entry) => entry.id),
          lines,
        },
      ]);
    }
  }, [entries]);

  return (
    <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      backgroundColor: colors.cosmicDark,
      overflow: "hidden",
      pointerEvents: "none",
    }}
  >
        {/* Stars */}
        {entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            position: "absolute",
            top: entry.starPosition.top,
            left: entry.starPosition.left,
            width: "8px", // w-2
            height: "8px", // h-2
            backgroundColor: colors.cream,
            borderRadius: "50%", // rounded-full
            boxShadow: shadows.softGlow,
            animationName: "star-appear",
            animationDuration: "1s",
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards",
          }}
        />
      ))}

      {/* Constellation lines */}
      {constellations.map((constellation, constellationIndex) => (
        <React.Fragment key={`constellation-${constellationIndex}`}>
          {constellation.lines.map((line, lineIndex) => {
            const startStar = entries.find((entry) => entry.id === line.start);
            const endStar = entries.find((entry) => entry.id === line.end);

            if (!startStar || !endStar) return null;

            // Calculate positions for the SVG line
            const startPos = {
              x: (parseFloat(startStar.starPosition.left) * window.innerWidth) / 100,
              y: (parseFloat(startStar.starPosition.top) * window.innerHeight) / 100,
            };

            const endPos = {
              x: (parseFloat(endStar.starPosition.left) * window.innerWidth) / 100,
              y: (parseFloat(endStar.starPosition.top) * window.innerHeight) / 100,
            };

            return (
              <svg
              key={`line-${lineIndex}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
              }}>
                <line
                  x1={startPos.x}
                  y1={startPos.y}
                  x2={endPos.x}
                  y2={endPos.y}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              </svg>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default NightSky;
