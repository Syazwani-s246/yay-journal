"use client";
import { useState } from "react";
import { Entry, formatDate } from "../lib/journalUtils";

interface Props {
  onSave: (entry: Entry) => void;
  editEntry: Entry | null;
}

export default function JournalEntryForm({ onSave, editEntry }: Props) {
  const [entry, setEntry] = useState(editEntry?.text || "");

  const handleSubmit = () => {
    if (!entry.trim()) return;
    onSave({ text: entry, timestamp: formatDate(new Date()) });
    setEntry("");
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Write something good..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        className="w-full p-2 rounded text-white bg-blue-500 hover:bg-blue-600"
      >
        {editEntry ? "Update Entry" : "Save Entry"}
      </button>
    </div>
  );
}
