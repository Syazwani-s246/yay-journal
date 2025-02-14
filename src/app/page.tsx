"use client"; // Next.js perlu ini untuk guna useState & useEffect dalam Client Component

import { useState, useEffect } from "react";

export default function Journal() {
  
  // State untuk simpan input user
  const [entry, setEntry] = useState("");
  
  // State untuk simpan semua entries
  const [entries, setEntries] = useState<string[]>([]); //explain TypeScript yg entries array of strings

  const [editIndex, setEditIndex] = useState<number | null>(null); // Untuk update mode

  // useEffect akan run sekali masa page load untuk fetch data dari localStorage
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("entries") || "[]");
    setEntries(savedEntries);
  }, []);

   // Save new entry atau update entry sedia ada
   const saveEntry = () => {
    if (!entry.trim()) return;

    let updatedEntries;
    if (editIndex !== null) {
      // Update existing entry
      updatedEntries = [...entries];
      updatedEntries[editIndex] = entry;
      setEditIndex(null); // Keluar dari mode edit
    } else {
      // Add new entry
      updatedEntries = [entry, ...entries];
    }

    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));  // Simpan ke localStorage
    setEntry("");  // Kosongkan input selepas simpan
  };

   // Masukkan entry ke dalam input untuk edit
   const editEntry = (index: number) => {
    setEntry(entries[index]);
    setEditIndex(index);
  };

   // Delete entry dari list
   const deleteEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem("entries", JSON.stringify(updatedEntries));
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">One Good Thing Journal</h1>
        
        <input
          type="text"
          placeholder="Tulis benda baik hari ni..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        
        <button
          onClick={saveEntry}
          className={`w-full p-2 rounded text-white ${editIndex !== null ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {editIndex !== null ? "Update Entry" : "Save Entry"}
        </button>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">My Entries:</h2>
          <ul className="mt-2">
            {entries.map((e, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-200 rounded my-1">
                <span>✅ {e}</span>
                <div>
                  <button onClick={() => editEntry(index)} className="text-yellow-600 mx-1">✏️</button>
                  <button onClick={() => deleteEntry(index)} className="text-red-600 mx-1">🗑</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}