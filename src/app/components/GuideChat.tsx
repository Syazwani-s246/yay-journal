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
    { type: 'bot', content: "Hi! 👋 I'm here to help you use this journal ✨ What would you like to know?" }
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
      'what': 'A space to capture one good thing from your day. A small joy, a kind moment, or something that made you smile.',
      'how': '1. Write something good that happened (big or small).\n2. Save it ✨\n3. Watch it become a star! After 5 thoughts, they will form a constellation, your guiding light 💖',
      'why': 'A little gratitude can boost your mood, ease stress, and help you see the good in every day 🌿',
      'default': 'You can ask me about what this journal is, how to use it, or why practicing gratitude is beneficial.'
    };

    const q = question.toLowerCase();
    if (q.includes('what')) return responses.what;
    if (q.includes('how')) return responses.how;
    if (q.includes('why')) return responses.why;
    return responses.default;
  };

  const quickQuestions = [
    '🌱 What is this?',
    '💫 How do I use it?',
    '💖 Why should I use it?'
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
            <h3 style={{ margin: 0, fontFamily: fonts.heading, color: colors.cosmicDark }}>Journal Guide</h3>
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

            {/* Add feedback button here */}
            <button
              onClick={() => window.open('https://forms.gle/D5FqyrHY2iYQkFWf9', '_blank')}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                border: `1px solid ${colors.cosmicDark}20`,
                borderRadius: '0.75rem',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                color: colors.cosmicDark,
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.cosmicDark}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Send Feedback 💌
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default GuideChat;