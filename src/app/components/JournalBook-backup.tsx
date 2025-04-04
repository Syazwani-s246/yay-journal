"use client";
import React, { useState, useEffect } from 'react';
import { JournalEntry, WeeklyData } from '@/app/lib/journalUtils';
import { format, parseISO } from 'date-fns';
import { Book, ChevronLeft, ChevronRight, BarChart2, Calendar, Download, Share2, X } from 'lucide-react';
import { generateWeeklyData, exportJournalAsText, generateShareableLink, groupEntriesByDate } from '@/app/lib/journalUtils';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { Button } from '@/app/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/ui/tabs';


interface JournalBookProps {
  entries: JournalEntry[];
  isOpen: boolean;
  onClose: () => void;
}

const JournalBook: React.FC<JournalBookProps> = ({ entries, isOpen, onClose }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageDirection, setPageDirection] = useState<'right' | 'left' | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [groupedEntries, setGroupedEntries] = useState<{ date: string, entries: JournalEntry[] }[]>([]);

  // Group entries by date
  useEffect(() => {
    if (entries.length > 0) {
      const grouped = groupEntriesByDate(entries);
      setGroupedEntries(grouped);
    }
  }, [entries]);

  // Prepare weekly data for the chart
  useEffect(() => {
    setWeeklyData(generateWeeklyData(entries));
  }, [entries]);

  // Generate a "motivational" quote
  useEffect(() => {
    const quotes = [
      "Every small positive thought can transform your day.",
      "Capture the good, release the rest.",
      "Your journal of good things becomes your map of gratitude.",
      "Stars are born from darkness, just as joy can emerge from reflection.",
      "The simple act of noting one good thing changes how you see everything."
    ];
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Handle page turning with animation
  const handlePageTurn = (direction: 'next' | 'previous') => {
    if (direction === 'next' && currentPageIndex < groupedEntries.length - 1) {
      setPageDirection('right');
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex + 1);
        setPageDirection(null);
      }, 500);
    } else if (direction === 'previous' && currentPageIndex > 0) {
      setPageDirection('left');
      setTimeout(() => {
        setCurrentPageIndex(currentPageIndex - 1);
        setPageDirection(null);
      }, 500);
    }
  };

  // Handle journal download
  const handleDownload = () => {
    const text = exportJournalAsText(entries);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'one_good_thing_journal.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Journal downloaded successfully');
  };

  // Handle journal sharing
  const handleShare = () => {
    const link = generateShareableLink();
    navigator.clipboard.writeText(link);
    toast.success('Shareable link copied to clipboard');
  };

  // If there are no entries, show a placeholder
  if (entries.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.5s',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}>
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }} 
          onClick={onClose}
        />
        <div className="perspective relative z-10">
          <div className="relative book-shadow preserve-3d w-80 h-[500px] sm:w-[460px] sm:h-[600px] bg-cosmic-blue rounded-r-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cream/80 to-cosmic-peach/80 p-8 text-cosmic-dark rounded-r-lg flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-playfair">Your Journal</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <Book className="h-16 w-16 mb-4 opacity-60" />
                <h3 className="text-xl mb-2 font-medium">Your Journal is Empty</h3>
                <p className="text-cosmic-dark/70">
                  Start by adding your first thought. It will appear here and create a star in the night sky.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-black/60 absolute inset-0" onClick={onClose}></div>

      <div className="perspective relative z-10">
        <div
          className={`
            relative book-shadow preserve-3d w-80 h-[500px] sm:w-[460px] sm:h-[600px] rounded-r-lg overflow-hidden
            ${pageDirection === 'right' ? 'animate-page-turn-right' : ''}
            ${pageDirection === 'left' ? 'animate-page-turn-left' : ''}
          `}
        >
          <Tabs defaultValue="journal" className="w-full h-full">
            {/* Book Cover/Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-cosmic-peach to-cosmic-cream p-4 shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-cosmic-dark font-playfair">One Good Thing Journal</h2>

                <div className="flex items-center space-x-1">
                  <TabsList className="bg-cosmic-dark/20">
                    <TabsTrigger value="journal" className="data-[state=active]:bg-cosmic-dark data-[state=active]:text-cosmic-cream">
                      <Calendar className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="reflection" className="data-[state=active]:bg-cosmic-dark data-[state=active]:text-cosmic-cream">
                      <BarChart2 className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>

                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                    <X className="h-4 w-4 text-cosmic-dark" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Journal Content */}
            <TabsContent value="journal" className="h-full pt-16 data-[state=inactive]:hidden">
              <div className="h-full bg-gradient-to-r from-cosmic-cream/90 to-cosmic-peach/90 rounded-r-lg p-6 text-cosmic-dark flex flex-col">
                {/* Entry Content */}
                <div className="flex-1 relative">
                  <div className="absolute top-0 left-0 w-full h-full p-4 overflow-y-auto">
                    {groupedEntries.length > 0 && groupedEntries[currentPageIndex] && (
                      <>
                        <div className="mb-6 border-b border-cosmic-dark/20 pb-2">
                          <h3 className="text-lg font-medium font-playfair">
                            {groupedEntries[currentPageIndex].date}
                          </h3>
                        </div>
                        {groupedEntries[currentPageIndex].entries.map((entry, idx) => (
                          <div key={entry.id} className={idx > 0 ? "mt-4 pt-4 border-t border-cosmic-dark/10" : ""}>
                            <p className="whitespace-pre-wrap font-lora leading-relaxed">
                              {entry.content}
                            </p>
                            <div className="text-xs text-cosmic-dark/60 mt-1">
                              {format(parseISO(entry.date), "h:mm a")}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between pt-4 border-t border-cosmic-dark/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageTurn('previous')}
                    disabled={currentPageIndex === 0}
                    className="text-cosmic-dark hover:bg-cosmic-dark/10"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>

                  <span className="text-sm text-cosmic-dark/70">
                    {currentPageIndex + 1} of {groupedEntries.length}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageTurn('next')}
                    disabled={currentPageIndex >= groupedEntries.length - 1}
                    className="text-cosmic-dark hover:bg-cosmic-dark/10"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Reflection Mode */}
            <TabsContent value="reflection" className="h-full pt-16 data-[state=inactive]:hidden">
              <div className="h-full bg-gradient-to-r from-cosmic-cream/90 to-cosmic-peach/90 rounded-r-lg p-6 text-cosmic-dark flex flex-col">
                <h3 className="text-lg font-playfair font-medium mb-4">Weekly Reflection</h3>

                {/* Chart */}
                <div className="bg-white/50 p-4 rounded-lg mb-4 shadow-inner h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0F172A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Quote */}
                <blockquote className="bg-white/30 p-4 rounded-lg mb-4 italic border-l-4 border-cosmic-dark/20">
                  {currentQuote}
                </blockquote>

                {/* Export Controls */}
                <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                  <Button
                    className="flex-1 bg-cosmic-dark text-cosmic-cream hover:bg-cosmic-dark/90"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 mr-2" /> Download Journal
                  </Button>

                  <Button
                    className="flex-1 bg-cosmic-dark text-cosmic-cream hover:bg-cosmic-dark/90"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" /> Share Journal
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default JournalBook;

