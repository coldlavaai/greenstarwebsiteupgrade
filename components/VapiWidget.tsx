'use client';

import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    vapiSDK: any;
  }
}

export default function VapiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('Ready to chat');
  const vapiInstanceRef = useRef<any>(null);

  const WIDGET_CONFIG = {
    publicKey: 'b3f38fb7-8541-4e3e-8708-5d49c3f54f00',
    assistantId: 'cb76e1bc-dc2d-4ea8-84a1-c17499ed6387'
  };

  useEffect(() => {
    // Load VAPI SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js';
    script.async = true;
    script.onload = initializeVapi;
    document.body.appendChild(script);

    return () => {
      if (vapiInstanceRef.current) {
        vapiInstanceRef.current.stop();
      }
    };
  }, []);

  const initializeVapi = () => {
    if (typeof window !== 'undefined' && window.vapiSDK) {
      const vapi = new window.vapiSDK(WIDGET_CONFIG.publicKey);
      vapiInstanceRef.current = vapi;

      // Event listeners
      vapi.on('call-start', () => {
        setIsCallActive(true);
        setCallStatus('Connected to Sophie');
      });

      vapi.on('call-end', () => {
        setIsCallActive(false);
        setCallStatus('Call ended');
        setTimeout(() => setCallStatus('Ready to chat'), 2000);
      });

      vapi.on('speech-start', () => {
        setCallStatus('Sophie is speaking...');
      });

      vapi.on('speech-end', () => {
        setCallStatus('Listening...');
      });

      vapi.on('error', (error: any) => {
        console.error('VAPI Error:', error);
        setCallStatus('Error occurred');
        setIsCallActive(false);
      });
    }
  };

  const startCall = () => {
    if (vapiInstanceRef.current && !isCallActive) {
      vapiInstanceRef.current.start(WIDGET_CONFIG.assistantId);
    }
  };

  const endCall = () => {
    if (vapiInstanceRef.current && isCallActive) {
      vapiInstanceRef.current.stop();
    }
  };

  return (
    <>
      {/* Widget Styles */}
      <style jsx global>{`
        :root {
          --vapi-primary-color: #8cc63f;
          --vapi-primary-dark: #7ab52f;
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
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
        {/* Speech Bubble */}
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
            opacity: 1,
            transform: 'translateY(0) scale(1)',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            pointerEvents: 'none',
            boxShadow: '0 8px 32px rgba(140, 198, 63, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(140, 198, 63, 0.3)'
          }} className="widget-tooltip">
            Talk to Sophie about your project
            {/* Speech bubble arrow */}
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              right: '20px',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #7ab52f'
            }} />
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
            boxShadow: isCallActive
              ? '0 0 0 4px rgba(140, 198, 63, 0.3), 0 24px 48px rgba(140, 198, 63, 0.4)'
              : '0 24px 48px rgba(140, 198, 63, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(30px) saturate(200%)',
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            animation: isCallActive ? 'pulse 2s ease-in-out infinite' : 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px) scale(1.08)';
            e.currentTarget.style.boxShadow = '0 40px 80px rgba(140, 198, 63, 0.35), 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 80px rgba(140, 198, 63, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = isCallActive
              ? '0 0 0 4px rgba(140, 198, 63, 0.3), 0 24px 48px rgba(140, 198, 63, 0.4)'
              : '0 24px 48px rgba(140, 198, 63, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15)';
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

        {/* Voice Chat Panel */}
        {isOpen && (
          <div style={{
            position: 'absolute',
            bottom: '85px',
            right: 0,
            width: '420px',
            height: '500px',
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
                Talk with Sophie
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

            {/* Voice Interface */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              gap: '30px'
            }}>
              {/* Voice Indicator */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: isCallActive
                  ? 'linear-gradient(135deg, #8cc63f, #7ab52f)'
                  : 'rgba(140, 198, 63, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.5s ease',
                boxShadow: isCallActive
                  ? '0 0 40px rgba(140, 198, 63, 0.6), 0 0 80px rgba(140, 198, 63, 0.3)'
                  : 'none',
                animation: isCallActive ? 'pulse 2s ease-in-out infinite' : 'none'
              }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke={isCallActive ? '#000' : '#8cc63f'} strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>

              {/* Status Text */}
              <div style={{
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}>
                  {callStatus}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {isCallActive ? 'Speak naturally - Sophie is listening' : 'Start a voice conversation with Sophie'}
                </div>
              </div>

              {/* Call Controls */}
              <button
                onClick={isCallActive ? endCall : startCall}
                style={{
                  padding: '16px 40px',
                  background: isCallActive
                    ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                    : 'linear-gradient(135deg, #8cc63f, #7ab52f)',
                  color: isCallActive ? 'white' : '#000',
                  border: 'none',
                  borderRadius: '16px',
                  fontWeight: 700,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                }}
              >
                {isCallActive ? 'End Call' : 'Start Call'}
              </button>

              {/* Info Text */}
              <div style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.4)',
                textAlign: 'center',
                maxWidth: '300px',
                lineHeight: '1.6'
              }}>
                Sophie is Greenstar Solar's AI assistant. She can answer questions about solar panels, batteries, and our services.
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
