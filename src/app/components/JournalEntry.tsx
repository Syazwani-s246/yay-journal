"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Book } from "lucide-react";

import { colors, fonts, baseButtonStyle, baseTextareaStyle, radii, shadows, layoutStyle, animations } from "@/theme";

interface JournalEntryFormProps {
  onSave: (content: string) => void;
  onOpenBook: () => void;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({ onSave, onOpenBook }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [floatingText, setFloatingText] = useState<string | null>(null);

  
  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error('Please enter your thought before saving');
      return;
    }

    setIsSubmitting(true);
    setFloatingText(content);
    setContent('');

    setTimeout(() => {
      onSave(content);
      setFloatingText(null);
      setIsSubmitting(false);
      toast.success('Your thought has been captured as a star');
    }, 1500);
  };

  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      width: '100%',
      maxWidth: '28rem',
      margin: '0 auto',
      paddingTop: '5rem'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 700,
          color: colors.cream,
          marginBottom: '0.5rem',
          fontFamily: fonts.heading
        }}>
          One Good Thing Journal
        </h1>
        <p style={{ color: `${colors.peach}CC` /* peach/80 */ }}>
          Capture a positive thought for today
        </p>
      </div>

      {/* Entry Form */}
      <div style={{
        backgroundColor: `${colors.cosmicBlue}4D`, // blue/30
        backdropFilter: 'blur(4px)',
        borderRadius: radii.lg,
        padding: '1.5rem',
        border: `1px solid ${colors.whiteSoft}`,
        boxShadow: shadows.softGlow,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <textarea
          placeholder="What's one good thing that happened today?"
          style={{
            ...baseTextareaStyle,
            minHeight: '150px',
            marginBottom: '1rem'
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Save Button */}
          <button
            style={{
              ...baseButtonStyle,
              width: '100%',
              backgroundColor: colors.peach,
              color: colors.background,
              opacity: isSubmitting ? 0.6 : 1
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Save This Thought
          </button>

          {/* Floating Book Button */}
          <div style={{ margin: '1rem 0', position: 'relative' }}>
            <button
              style={{
                backgroundColor: `${colors.cosmicBlue}80`,
                borderRadius: '50%',
                width: '3rem',
                height: '3rem',
                border: `1px solid ${colors.whiteSoft}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'gentle-pulse 2s ease-in-out infinite',
                cursor: 'pointer'
              }}
              onClick={onOpenBook}
            >
              <Book size={24} color={colors.cream} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Text */}
      {floatingText && (
        <div
          className="animate-float-up"
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(4px)',
            color: colors.cream,
            borderRadius: radii.md,
            padding: '0.75rem',
            maxWidth: '80%',
            marginTop: '1rem'
          }}
        >
          {floatingText}
        </div>
      )}
    </div>
  );
};

export default JournalEntryForm;
