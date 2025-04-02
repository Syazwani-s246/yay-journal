"use client";
import { useState, useEffect } from "react";
import { Entry, loadEntries, saveEntries } from "@/app/lib/journalUtils" // Import the utility functions
import JournalEntry from "@/app/components/JournalEntry";
import JournalBook from "@/app/components/JournalBook";
import NightSky from "@/app/components/NightSky";

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load entries from localStorage when the component is mounted
  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  // Handle saving new or updated entry
  const handleSaveEntry = (entry: Entry) => {
    let updatedEntries;
    if (editIndex !== null) {
      updatedEntries = [...entries];
      updatedEntries[editIndex] = entry;
      setEditIndex(null);
    } else {
      updatedEntries = [entry, ...entries];
    }

    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  // Handle editing an existing entry
  const handleEditEntry = (index: number) => {
    setEditIndex(index);
  };

  // Handle deleting an entry
  const handleDeleteEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <NightSky />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-xl font-bold mb-2">One Good Thing Journal</h1>
        <p className="text-gray-600 italic mb-4">Because even small wins deserve to be remembered! 💛</p>

        <JournalEntry onSave={handleSaveEntry} editEntry={editIndex !== null ? entries[editIndex] : null} />
        <JournalBook entries={entries} onEdit={handleEditEntry} onDelete={handleDeleteEntry} />
      </div>
    </div>
  );
}
