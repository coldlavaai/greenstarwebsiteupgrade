'use client';

import { useEffect, useState, useRef } from 'react';

export default function VapiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputValue, setInputValue] = useState('');
  const previousChatIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WIDGET_CONFIG = {
    assistantId: 'cb76e1bc-dc2d-4ea8-84a1-c17499ed6387',
    directApiKey: 'bb0b198b-1a8f-4675-bdf8-8a865fc5d68a'
  };

  useEffect(() => {
    // Add welcome message after mount
    setTimeout(() => {
      setMessages([{ text: "Hi! I'm Sophie. How can I help you with solar energy today?", isUser: false }]);
    }, 1000);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  const extractAssistantMessage = (data: any): string => {
    if (data.output && Array.isArray(data.output) && data.output.length > 0) {
      const lastOutput = data.output[data.output.length - 1];
      if (lastOutput.content) return lastOutput.content;
      if (lastOutput.text) return lastOutput.text;
      if (lastOutput.message) return lastOutput.message;
    }
    if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
      const lastMessage = data.messages[data.messages.length - 1];
      if (lastMessage.content) return lastMessage.content;
      if (lastMessage.text) return lastMessage.text;
      if (lastMessage.message) return lastMessage.message;
    }
    if (data.response) return data.response;
    if (data.reply) return data.reply;
    return 'Hello! How can I help you today?';
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    addMessage(message, true);
    setInputValue('');

    try {
      const response = await fetch('https://api.vapi.ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WIDGET_CONFIG.directApiKey}`
        },
        body: JSON.stringify({
          assistantId: WIDGET_CONFIG.assistantId,
          input: message,
          previousChatId: previousChatIdRef.current
        })
      });

      const data = await response.json();

      if (data.chatId) {
        previousChatIdRef.current = data.chatId;
      }

      const assistantMessage = extractAssistantMessage(data);
      addMessage(assistantMessage, false);
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('Sorry, there was an error. Please try again.', false);
    }
  };

  return (
    <>
      {/* Widget Styles */}
      <style jsx global>{`
        :root {
          --vapi-primary-color: #8cc63f;
          --vapi-primary-dark: #7ab52f;
          --vapi-accent-color: #ffffff;
          --vapi-dark-bg: #000000;
          --vapi-glass-border: rgba(140, 198, 63, 0.2);
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.88);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Widget Container */}
      <div id="vapi-widget" style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 10000,
        fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}>
        {/* Tooltip */}
        {!isOpen && (
          <div style={{
            position: 'absolute',
            bottom: '85px',
            right: 0,
            background: 'linear-gradient(135deg, #8cc63f, #7ab52f)',
            backdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '15px',
            fontSize: '14px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            opacity: 0,
            transform: 'translateY(10px) scale(0.8)',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            pointerEvents: 'none',
            boxShadow: '0 8px 32px rgba(140, 198, 63, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(140, 198, 63, 0.3)'
          }} className="widget-tooltip">
            Ask Sophie?
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.9))',
            border: '1px solid rgba(140, 198, 63, 0.2)',
            cursor: 'pointer',
            boxShadow: '0 24px 48px rgba(140, 198, 63, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(30px) saturate(200%)',
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 40px 80px rgba(140, 198, 63, 0.35), 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 80px rgba(140, 198, 63, 0.3)';
            const tooltip = e.currentTarget.parentElement?.querySelector('.widget-tooltip') as HTMLElement;
            if (tooltip) {
              tooltip.style.opacity = '1';
              tooltip.style.transform = 'translateY(0) scale(1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 24px 48px rgba(140, 198, 63, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15)';
            const tooltip = e.currentTarget.parentElement?.querySelector('.widget-tooltip') as HTMLElement;
            if (tooltip) {
              tooltip.style.opacity = '0';
              tooltip.style.transform = 'translateY(10px) scale(0.8)';
            }
          }}
          aria-label="Open chat widget"
        >
          <img
            src="/images/greenstar-logo-dots.png"
            alt="Greenstar Solar"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              filter: 'drop-shadow(0 0 12px rgba(140, 198, 63, 0.4)) brightness(1.1)',
              transition: 'all 0.5s ease'
            }}
          />
        </button>

        {/* Chat Panel */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            bottom: '85px',
            right: 0,
            width: '420px',
            height: '600px',
            background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.98), rgba(15, 15, 15, 0.95))',
            borderRadius: '28px',
            border: '1px solid rgba(140, 198, 63, 0.2)',
            backdropFilter: 'blur(50px) saturate(200%)',
            boxShadow: '0 50px 100px rgba(0, 0, 0, 0.6), 0 0 80px rgba(140, 198, 63, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
          }}>
            {/* Header */}
            <div style={{
              padding: '25px 30px',
              background: 'linear-gradient(135deg, #8cc63f, #7ab52f)',
              color: '#000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, letterSpacing: '0.5px' }}>
                Chat with Sophie
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  color: '#000',
                  transition: 'all 0.3s ease'
                }}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages Container */}
            <div style={{
              flex: 1,
              padding: '25px 30px',
              overflowY: 'auto',
              fontSize: '15px'
            }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: '20px',
                    padding: '16px 20px',
                    borderRadius: '18px',
                    maxWidth: '85%',
                    wordWrap: 'break-word',
                    lineHeight: 1.5,
                    fontSize: '14px',
                    background: msg.isUser
                      ? 'linear-gradient(135deg, #8cc63f, #7ab52f)'
                      : 'rgba(40, 40, 40, 0.8)',
                    color: msg.isUser ? '#000' : '#fff',
                    marginLeft: msg.isUser ? 'auto' : 0,
                    marginRight: msg.isUser ? 0 : 'auto',
                    borderBottomRightRadius: msg.isUser ? '8px' : '18px',
                    borderBottomLeftRadius: msg.isUser ? '18px' : '8px',
                    boxShadow: msg.isUser ? '0 4px 12px rgba(140, 198, 63, 0.3)' : 'none',
                    border: msg.isUser ? 'none' : '1px solid rgba(140, 198, 63, 0.1)'
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div style={{
              padding: '25px 30px',
              background: 'rgba(30, 30, 30, 0.8)',
              borderTop: '1px solid rgba(140, 198, 63, 0.2)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              gap: '12px'
            }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                placeholder="Ask Sophie..."
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '1px solid rgba(140, 198, 63, 0.2)',
                  background: 'rgba(40, 40, 40, 0.6)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                aria-label="Message input"
              />
              <button
                onClick={() => sendMessage(inputValue)}
                style={{
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #8cc63f, #7ab52f)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(140, 198, 63, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
