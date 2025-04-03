

import { format, startOfWeek, addDays, parseISO } from "date-fns";

// Define types for Journal Entry and Weekly Data

export interface JournalEntry {
  id: string;
  content: string;
  date: string;
  timestamp: number;
  starPosition: {
    top: string;
    left: string;
  };
}

export interface WeeklyData {
  day: string;
  count: number;
}

// Save entries to local storage
export const saveEntriesToLocalStorage = (entries: JournalEntry[]): void => {
  localStorage.setItem("journalEntries", JSON.stringify(entries));
};

// Load entries from local storage
export const loadEntriesFromLocalStorage = (): JournalEntry[] => {
  const entries = localStorage.getItem("journalEntries");
  return entries ? JSON.parse(entries) : [];
};

// Generate random star position
export const generateStarPosition = (): { top: string; left: string } => {
  return {
    top: `${Math.floor(Math.random() * 80) + 5}%`,
    left: `${Math.floor(Math.random() * 80) + 5}%`,
  };
};

// Group entries by date
export const groupEntriesByDate = (entries: JournalEntry[]): { date: string; entries: JournalEntry[] }[] => {
  const groupedEntries: Record<string, JournalEntry[]> = {};

  // Sort entries by timestamp (newest first)
  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  // Group by formatted date
  sortedEntries.forEach(entry => {
    const dateKey = format(parseISO(entry.date), "EEEE, MMMM d, yyyy");

    if (!groupedEntries[dateKey]) {
      groupedEntries[dateKey] = [];
    }

    groupedEntries[dateKey].push(entry);
  });

  // Convert to array format for easier mapping in component
  return Object.entries(groupedEntries).map(([date, entries]) => ({
    date,
    entries,
  }));
};

// Generate weekly data for visualization
export const generateWeeklyData = (entries: JournalEntry[]): WeeklyData[] => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(startOfCurrentWeek, i);
    return format(day, "EEE");
  });

  const dailyCounts = weekDays.map((weekDay) => {
    const count = entries.filter((entry) => {
      const entryDate = parseISO(entry.date);
      return format(entryDate, "EEE") === weekDay;
    }).length;

    return {
      day: weekDay,
      count,
    };
  });

  return dailyCounts;
};

// Export journal as text
export const exportJournalAsText = (entries: JournalEntry[]): string => {
  if (entries.length === 0) return "No entries yet.";

  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);

  return sortedEntries
    .map((entry) => {
      return `Date: ${format(parseISO(entry.date), "PPP")}\n\n${entry.content}\n\n---\n`;
    })
    .join("\n");
};

// Generate shareable link (in a real app, this would connect to a backend)
export const generateShareableLink = (): string => {
  const randomId = Math.random().toString(36).substring(2, 10);
  return `${window.location.origin}/shared/${randomId}`;
};
