

export interface Entry {
    text: string;
    timestamp: string;
  }
  
  // Format date into the "en-GB" format
  export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };
  
  // Load entries from localStorage
  export const loadEntries = (): Entry[] => {
    return JSON.parse(localStorage.getItem("entries") || "[]");
  };
  
  // Save entries to localStorage
  export const saveEntries = (entries: Entry[]): void => {
    localStorage.setItem("entries", JSON.stringify(entries));
  };
  