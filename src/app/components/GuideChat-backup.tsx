import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { colors, fonts } from '@/theme';

interface Message {
  type: 'bot' | 'user';
  content: string;
}

const GuideChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: "Hi there!\nI'm your friendly guide to the One Good Thing Journal 🌌\nWhat would you like to know?" }
  ]);

  const handleQuestion = (question: string) => {
    const newMessages: Message[] = [
      ...messages,
      { type: 'user' as const, content: question }
    ];
    setMessages(newMessages);

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(question);
      setMessages([...newMessages, { type: 'bot', content: response }]);
    }, 500);
  };

  const getBotResponse = (question: string): string => {
    const responses = {
      'what': "💫 What is One Good Thing Journal?\nIt's a cozy space to capture something good from each day — a small joy, a kind moment, or something that made you smile.\nOver time, you'll build a beautiful collection of stars ✨ — little reminders that even on hard days, something good still shines.\n\nInspired by Cognitive Behavioral Therapy (CBT), this simple practice helps you focus on the positive thoughts and actions in your daily life.",

      'how': "🌱 How do I use it?\nThink of one good thing that happened today — big or small.\n\nWrite it down in the journal space.\n\nClick \"Save this thought\" ✨\n\nThat thought becomes a star in your night sky.\nAfter 5+ thoughts, you'll start to see them form a glowing constellation — your personal guiding light 💫",

      'past': "📖 Can I see my past entries?\nAbsolutely!\nClick the book icon to open your journal. There, you can:\n\nRevisit your past thoughts\n\nSee which days had the most entries\n\nShare your constellation with others\n\nOr download your journal as a keepsake",

      'who': "🌍 Who is this for?\nYou.\nWhether you're feeling great or going through something tough — this journal is your space.\n\nNothing is too small to be included. A soft breeze, a warm meal, a smile — they all matter.\nJust be you 🌙",

      'why': "💖 Why should I use it?\nPracticing gratitude, even in little ways, can:\n\nBoost your mental well-being\n\nReduce stress and anxiety\n\nHelp you focus on what's going right\n\nBuild a more positive perspective over time\n\nThink of it as your daily dose of stardust ✨",

      'miss': "❔What if I miss a day?\nThat's totally okay. Life happens! Just come back whenever you're ready. There's no pressure — this journal is here for you.",

      'private': "🛡️ Are my thoughts private?\nYes — your thoughts are yours. You can choose to share them, but you're always in control.",

      'more': "🌠 Can I write more than one good thing a day?\nYes! You can write as many as you like. The more you write, the more your sky fills with stars ✨",

      'default': "I can tell you about:\n• What this journal is\n• How to use it\n• Why it's beneficial\n• Viewing past entries\n• Privacy\n• Writing multiple entries\n\nWhat would you like to know? ✨"
    };

    const q = question.toLowerCase();
    if (q.includes('what')) return responses.what;
    if (q.includes('how')) return responses.how;
    if (q.includes('past') || q.includes('see') || q.includes('entries')) return responses.past;
    if (q.includes('who')) return responses.who;
    if (q.includes('why')) return responses.why;
    if (q.includes('miss')) return responses.miss;
    if (q.includes('private')) return responses.private;
    if (q.includes('more')) return responses.more;
    return responses.default;
  };

  const quickQuestions = [
    'What is One Good Thing Journal?',
    'How do I use it?',
    'Why should I use it?',
    'Can I see my past entries?',
    'What if I miss a day?',
    'Are my thoughts private?',
    'Can I write more than one good thing?'
  ];



  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: colors.peach,
            borderRadius: '50%',
            width: '3.5rem',
            height: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 40,
          }}
        >
          <MessageCircle size={24} color={colors.cosmicDark} />
        </button>
      )}

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '320px',
          height: '480px',
          backgroundColor: colors.cream,
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: `1px solid ${colors.cosmicDark}20`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h3 style={{ margin: 0, fontFamily: fonts.heading }}>Journal Guide</h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              <X size={20} color={colors.cosmicDark} />
            </button>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  backgroundColor: msg.type === 'user' ? colors.peach : colors.cosmicDark,
                  color: msg.type === 'user' ? colors.cosmicDark : colors.cream,
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  maxWidth: '85%',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '1rem',
            borderTop: `1px solid ${colors.cosmicDark}20`,
          }}>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '0.5rem',
            }}>
                           {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestion(q)}
                  style={{
                    border: `1px solid ${colors.cosmicDark}40`,
                    borderRadius: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    color: colors.cosmicDark,
                    marginBottom: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.cosmicDark}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuideChat;