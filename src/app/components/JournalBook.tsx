"use client";
import { Entry, formatDate } from "../lib/journalUtils";

interface Props {
  entries: Entry[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function JournalEntries({ entries, onEdit, onDelete }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold">My Entries:</h2>
      <ul className="mt-2">
        {entries.map((entry, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded my-1">
            <span>
              ✅ {entry.text}
              <br />
              <small className="text-gray-500">🕒 {formatDate(new Date(entry.timestamp))}</small>
            </span>
            <div>
              <button onClick={() => onEdit(index)} className="text-yellow-600 mx-1">✏️</button>
              <button onClick={() => onDelete(index)} className="text-red-600 mx-1">🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
