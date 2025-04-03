"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Unique ID generator

import JournalEntry from "@/app/components/JournalEntry";
import JournalBook from "@/app/components/JournalBook";
import NightSky from "@/app/components/NightSky";

// ✅ FIXED: Use `import type`
import type { JournalEntry as JournalEntryType } from "@/app/lib/journalUtils";
import { loadEntriesFromLocalStorage, saveEntriesToLocalStorage, generateStarPosition } from "@/app/lib/journalUtils";

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [isBookOpen, setIsBookOpen] = useState(false);
  
  // Load entries from local storage on initial render
  useEffect(() => {
    const savedEntries = loadEntriesFromLocalStorage();
    setEntries(savedEntries);
  }, []);
  
  // Save a new journal entry
  const handleSaveEntry = (content: string) => {
    const newEntry: JournalEntryType = {
      id: uuidv4(),
      content,
      date: new Date().toISOString(),
      timestamp: Date.now(),
      starPosition: generateStarPosition(),
    };
    
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    saveEntriesToLocalStorage(updatedEntries);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Night Sky Background with Stars */}
      <NightSky entries={entries} />
      
      {/* Journal Entry Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <JournalEntry 
          onSave={handleSaveEntry} 
          onOpenBook={() => setIsBookOpen(true)}
        />
      </div>
      
      {/* Journal Book Modal */}
      <JournalBook 
        entries={entries} 
        isOpen={isBookOpen} 
        onClose={() => setIsBookOpen(false)}
      />
    </div>
  );
};

export default Journal;
