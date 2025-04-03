"use client";
import React, { useEffect, useState } from "react";
import type { JournalEntry } from "@/app/lib/journalUtils"; // Import the correct type

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
    <div className="fixed inset-0 z-0 bg-cosmic-dark overflow-hidden">
      {/* Stars */}
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="absolute w-2 h-2 bg-white rounded-full animate-star-appear"
          style={{
            top: entry.starPosition.top,
            left: entry.starPosition.left,
            boxShadow:
              "0 0 10px 2px rgba(255, 255, 255, 0.7), 0 0 20px 4px rgba(255, 255, 255, 0.3)",
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
                className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
              >
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
