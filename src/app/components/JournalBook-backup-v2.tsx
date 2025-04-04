"use client";
import React, { useState, useEffect } from 'react';
import { JournalEntry, WeeklyData } from '@/app/lib/journalUtils';
import { format, parseISO } from 'date-fns';
import { Book, ChevronLeft, ChevronRight, BarChart2, Calendar, Download, Share2, X } from 'lucide-react';
import { generateWeeklyData, exportJournalAsText, generateShareableLink, groupEntriesByDate } from '@/app/lib/journalUtils';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// import { Button } from '@/app/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/ui/tabs';

import { colors, fonts, journalBookStyles } from '@/theme';


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

  const [activeTab, setActiveTab] = useState<'journal' | 'reflection'>('journal');

  // Group entries by date
  // Inside the useEffect for grouping entries
  useEffect(() => {
    if (entries.length > 0) {
      const grouped = groupEntriesByDate(entries);
      console.log('Grouped entries:', grouped); // Debug log
      setGroupedEntries(grouped);
    }
  }, [entries]);

  // In the render section, before the navigation div
  console.log('Current page index:', currentPageIndex);
  console.log('Total pages:', groupedEntries.length);


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
        ...journalBookStyles.overlay,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none'
      }}>
        <div style={journalBookStyles.backdrop} onClick={onClose} />
        <div style={journalBookStyles.container}>
          <div style={journalBookStyles.book}>
            <div style={journalBookStyles.content}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={journalBookStyles.title}>Your Journal</h2>
                <button style={journalBookStyles.iconButton} onClick={onClose}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
                <Book style={{ width: '4rem', height: '4rem', marginBottom: '1rem', opacity: 0.6 }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 500 }}>Your Journal is Empty</h3>
                <p style={{ color: `${colors.cosmicDark}B3` }}>
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
    <div style={{
      ...journalBookStyles.overlay,
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'auto' : 'none'
    }}>
      <div style={journalBookStyles.backdrop} onClick={onClose} />
      <div style={journalBookStyles.container}>
        <div style={{
          ...journalBookStyles.book,
          transform: pageDirection === 'right' ? 'rotateY(-180deg)' :
            pageDirection === 'left' ? 'rotateY(0deg)' : 'none',
        }}>
          {/* Header */}
          <div style={journalBookStyles.header}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={journalBookStyles.title}>One Good Thing Journal</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={journalBookStyles.tabContainer}>
                  {['journal', 'reflection'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as 'journal' | 'reflection')}
                      style={{
                        ...journalBookStyles.iconButton,
                        backgroundColor: activeTab === tab ? colors.cosmicDark : 'transparent',
                        color: activeTab === tab ? colors.cream : colors.cosmicDark,
                      }}
                    >
                      {tab === 'journal' ? <Calendar size={16} /> : <BarChart2 size={16} />}
                    </button>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  style={journalBookStyles.iconButton}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Journal Content */}
          <div style={{
            ...journalBookStyles.content,
            display: activeTab === 'journal' ? 'flex' : 'none',
            flexDirection: 'column',
            paddingTop: '4rem',
            height: '100%',
          }}>
            {/* <div style={{ flex: 1, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, padding: '1rem', overflowY: 'auto' }}> */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>

              {/* ✅ ENTRIES */}
              {groupedEntries.length > 0 && groupedEntries[currentPageIndex] && (
                <>
                  <div style={{ marginBottom: '1.5rem', borderBottom: `1px solid ${colors.cosmicDark}20`, paddingBottom: '0.5rem' }}>
                    <h3 style={{ ...journalBookStyles.title, fontSize: '1.125rem' }}>
                      {groupedEntries[currentPageIndex].date}
                    </h3>
                  </div>
                  {groupedEntries[currentPageIndex].entries.map((entry, idx) => (
                    <div key={entry.id} style={{
                      marginTop: idx > 0 ? '1rem' : 0,
                      paddingTop: idx > 0 ? '1rem' : 0,
                      borderTop: idx > 0 ? `1px solid ${colors.cosmicDark}10` : 'none'
                    }}>
                      <p style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: fonts.body,
                        lineHeight: 1.6
                      }}>
                        {entry.content}
                      </p>
                      <div style={{
                        fontSize: '0.75rem',
                        color: `${colors.cosmicDark}99`,
                        marginTop: '0.25rem'
                      }}>
                        {format(parseISO(entry.date), "h:mm a")}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {/* </div> */}

            {/* ✅ NAVIGATION & ACTIONS */}
            <div style={journalBookStyles.navigation}>
              <button
                onClick={() => handlePageTurn('previous')}
                disabled={currentPageIndex === 0}
                style={{
                  ...journalBookStyles.actionButton,
                  opacity: currentPageIndex === 0 ? 0.5 : 1,
                  flex: '0 1 auto',  // Changed from flex: 1
                  padding: '0.5rem 1rem',
                }}
              >
                <ChevronLeft size={16} style={{ marginRight: '0.5rem' }} /> Previous
              </button>

              <span style={{
                ...journalBookStyles.pageCount,
                margin: '0 1rem',
              }}>
                {currentPageIndex + 1} of {groupedEntries.length}
              </span>

              <button
                onClick={() => handlePageTurn('next')}
                disabled={currentPageIndex >= groupedEntries.length - 1}
                style={{
                  ...journalBookStyles.actionButton,
                  opacity: currentPageIndex >= groupedEntries.length - 1 ? 0.5 : 1,
                  flex: '0 1 auto',  // Changed from flex: 1
                  padding: '0.5rem 1rem',
                }}
              >
                Next <ChevronRight size={16} style={{ marginLeft: '0.5rem' }} />
              </button>
            </div>
          </div>

          {/* Reflection Content */}

          <div style={{
            ...journalBookStyles.content,
            display: activeTab === 'reflection' ? 'flex' : 'none',
            flexDirection: 'column',
            paddingTop: '4rem',
            height: '100%',
            minHeight: '300px', // ✅ Ensure it can grow
          }}>

            <h3 style={{ ...journalBookStyles.title, marginBottom: '1rem' }}>
              Weekly Reflection
            </h3>

            <div style={journalBookStyles.chart}>
              <ResponsiveContainer>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill={colors.cosmicDark} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <blockquote style={journalBookStyles.quote}>
              {currentQuote}
            </blockquote>

            {/* ✅ ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button
                onClick={handleDownload}
                style={journalBookStyles.actionButton}
              >
                <Download size={18} style={{ marginRight: '0.5rem' }} /> Download Journal
              </button>

              <button
                onClick={handleShare}
                style={journalBookStyles.actionButton}
              >
                <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share Journal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalBook;

