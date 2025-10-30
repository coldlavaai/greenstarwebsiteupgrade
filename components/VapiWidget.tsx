'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function VapiWidget() {
  useEffect(() => {
    // Widget will initialize after scripts load
    console.log('VAPI Widget component mounted');
  }, []);

  return (
    <>
      {/* Load VAPI SDK */}
      <Script
        src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
        strategy="lazyOnload"
      />

      {/* Widget Styles */}
      <style jsx global>{`
        /* VAPI Widget CSS Variables - Rebranded for New Dark Theme */
        :root {
          --vapi-primary-color: #8cc63f;
          --vapi-primary-dark: #7ab52f;
          --vapi-primary-light: #9dd350;
          --vapi-accent-color: #ffffff;
          --vapi-dark-bg: #000000;
          --vapi-dark-panel: rgba(20, 20, 20, 0.95);
          --vapi-glass-border: rgba(140, 198, 63, 0.2);
        }

        #vapi-hybrid-widget {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 10000;
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        #vapi-tooltip {
          position: absolute;
          bottom: 85px;
          right: 0;
          background: linear-gradient(135deg,
            var(--vapi-primary-color),
            var(--vapi-primary-dark)) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          color: var(--vapi-accent-color) !important;
          padding: 12px 16px !important;
          border-radius: 15px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          white-space: nowrap !important;
          opacity: 0 !important;
          transform: translateY(10px) scale(0.8) !important;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          pointer-events: none !important;
          box-shadow:
            0 8px 32px rgba(140, 198, 63, 0.3),
            0 4px 16px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          border: 1px solid var(--vapi-glass-border) !important;
        }

        #vapi-tooltip::after {
          content: '' !important;
          position: absolute !important;
          bottom: -6px !important;
          right: 20px !important;
          width: 0 !important;
          height: 0 !important;
          border-left: 6px solid transparent !important;
          border-right: 6px solid transparent !important;
          border-top: 6px solid var(--vapi-primary-color) !important;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)) !important;
        }

        #vapi-hybrid-widget:hover #vapi-tooltip {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }

        #vapi-hybrid-widget:hover #vapi-chat-panel.open ~ #vapi-tooltip,
        #vapi-chat-panel.open ~ #vapi-tooltip {
          opacity: 0 !important;
          transform: translateY(10px) scale(0.8) !important;
        }

        #vapi-hybrid-widget *,
        #vapi-hybrid-widget *::before,
        #vapi-hybrid-widget *::after {
          box-sizing: border-box;
        }

        #vapi-chat-button {
          width: 70px !important;
          height: 70px !important;
          border-radius: 50% !important;
          background: linear-gradient(145deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.9)) !important;
          border: 1px solid var(--vapi-glass-border) !important;
          cursor: pointer !important;
          box-shadow:
            0 24px 48px rgba(140, 198, 63, 0.2),
            0 12px 24px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 40px rgba(140, 198, 63, 0.1) !important;
          backdrop-filter: blur(30px) saturate(200%) !important;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          outline: none !important;
          user-select: none !important;
          position: relative !important;
          overflow: hidden !important;
        }

        #vapi-chat-button::before {
          content: '' !important;
          position: absolute !important;
          inset: -2px !important;
          background: conic-gradient(from 0deg, var(--vapi-primary-color), var(--vapi-primary-dark), var(--vapi-primary-color)) !important;
          border-radius: 50% !important;
          opacity: 0 !important;
          transition: opacity 0.5s ease !important;
          z-index: -1 !important;
        }

        #vapi-chat-button::after {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background: radial-gradient(circle at 30% 20%, rgba(140, 198, 63, 0.15), transparent 60%) !important;
          border-radius: 50% !important;
          opacity: 0.9 !important;
          transition: opacity 0.4s ease !important;
        }

        #vapi-chat-button img {
          width: 42px !important;
          height: 42px !important;
          border-radius: 8px !important;
          filter:
            drop-shadow(0 0 12px rgba(140, 198, 63, 0.4))
            drop-shadow(0 0 24px rgba(140, 198, 63, 0.2))
            brightness(1.1) !important;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }

        #vapi-chat-button:hover {
          transform: translateY(-12px) scale(1.08) !important;
          box-shadow:
            0 40px 80px rgba(140, 198, 63, 0.35),
            0 20px 40px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 80px rgba(140, 198, 63, 0.3),
            0 0 160px rgba(140, 198, 63, 0.15) !important;
        }

        #vapi-chat-button:hover::before {
          opacity: 0.3 !important;
        }

        #vapi-chat-button:hover::after {
          opacity: 1 !important;
        }

        #vapi-chat-button:hover img {
          transform: scale(1.05) !important;
          filter:
            drop-shadow(0 0 20px rgba(140, 198, 63, 0.6))
            drop-shadow(0 0 40px rgba(140, 198, 63, 0.3))
            brightness(1.2) !important;
        }

        #vapi-chat-button:active {
          transform: translateY(-6px) scale(1.03) !important;
          transition: all 0.2s ease !important;
        }

        #vapi-chat-panel {
          position: absolute !important;
          bottom: 85px !important;
          right: 0 !important;
          width: 420px !important;
          height: 600px !important;
          background: linear-gradient(145deg, rgba(20, 20, 20, 0.98), rgba(15, 15, 15, 0.95)) !important;
          border-radius: 28px !important;
          border: 1px solid var(--vapi-glass-border) !important;
          backdrop-filter: blur(50px) saturate(200%) !important;
          box-shadow:
            0 50px 100px rgba(0, 0, 0, 0.6),
            0 25px 50px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 0 0 1px rgba(140, 198, 63, 0.15),
            0 0 80px rgba(140, 198, 63, 0.1) !important;
          display: none !important;
          flex-direction: column !important;
          overflow: hidden !important;
        }

        #vapi-chat-panel::before {
          content: '' !important;
          position: absolute !important;
          inset: 0 !important;
          background:
            radial-gradient(circle at 15% 15%, rgba(140, 198, 63, 0.08), transparent 50%),
            radial-gradient(circle at 85% 85%, rgba(140, 198, 63, 0.05), transparent 50%) !important;
          opacity: 0.8 !important;
          pointer-events: none !important;
        }

        #vapi-chat-panel::after {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 1px !important;
          background: linear-gradient(90deg, transparent, rgba(140, 198, 63, 0.5), transparent) !important;
          opacity: 0.6 !important;
        }

        #vapi-chat-panel.open {
          display: flex !important;
          animation: slideUpSmooth 0.8s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }

        @keyframes slideUpSmooth {
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

        #vapi-chat-header {
          padding: 25px 30px !important;
          background: linear-gradient(135deg, var(--vapi-primary-color), var(--vapi-primary-dark)) !important;
          color: var(--vapi-dark-bg) !important;
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          position: relative !important;
          backdrop-filter: blur(20px) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        #vapi-chat-title {
          margin: 0 !important;
          font-size: 18px !important;
          font-weight: 700 !important;
          letter-spacing: 0.5px !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
        }

        #vapi-close-button {
          background: rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(0, 0, 0, 0.2) !important;
          font-size: 20px !important;
          cursor: pointer !important;
          padding: 8px 12px !important;
          border-radius: 12px !important;
          color: var(--vapi-dark-bg) !important;
          transition: all 0.3s ease !important;
          backdrop-filter: blur(10px) !important;
        }

        #vapi-close-button:hover {
          background: rgba(0, 0, 0, 0.25) !important;
          transform: scale(1.05) !important;
        }

        #vapi-text-messages, #vapi-voice-messages {
          flex: 1 !important;
          padding: 25px 30px !important;
          overflow-y: auto !important;
          font-size: 15px !important;
          display: none !important;
        }

        .vapi-text-mode #vapi-text-messages {
          display: block !important;
        }

        .vapi-voice-mode #vapi-voice-messages {
          display: block !important;
        }

        .vapi-message {
          margin-bottom: 20px !important;
          padding: 16px 20px !important;
          border-radius: 18px !important;
          max-width: 85% !important;
          word-wrap: break-word !important;
          line-height: 1.5 !important;
          position: relative !important;
          font-size: 14px !important;
        }

        .vapi-message-user {
          background: linear-gradient(135deg, var(--vapi-primary-color), var(--vapi-primary-dark)) !important;
          color: var(--vapi-dark-bg) !important;
          margin-left: auto !important;
          border-bottom-right-radius: 8px !important;
          box-shadow: 0 4px 12px rgba(140, 198, 63, 0.3) !important;
        }

        .vapi-message-assistant {
          background: rgba(40, 40, 40, 0.8) !important;
          color: var(--vapi-accent-color) !important;
          margin-right: auto !important;
          border-bottom-left-radius: 8px !important;
          border: 1px solid rgba(140, 198, 63, 0.1) !important;
        }

        #vapi-input-container {
          padding: 25px 30px !important;
          background: rgba(30, 30, 30, 0.8) !important;
          border-top: 1px solid var(--vapi-glass-border) !important;
          backdrop-filter: blur(20px) !important;
          display: flex !important;
          gap: 12px !important;
        }

        #vapi-message-input {
          flex: 1 !important;
          padding: 14px 18px !important;
          border-radius: 14px !important;
          border: 1px solid var(--vapi-glass-border) !important;
          background: rgba(40, 40, 40, 0.6) !important;
          color: var(--vapi-accent-color) !important;
          font-size: 14px !important;
          outline: none !important;
          transition: all 0.3s ease !important;
        }

        #vapi-message-input:focus {
          border-color: var(--vapi-primary-color) !important;
          background: rgba(40, 40, 40, 0.8) !important;
          box-shadow: 0 0 0 3px rgba(140, 198, 63, 0.1) !important;
        }

        #vapi-message-input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }

        #vapi-send-button {
          padding: 14px 24px !important;
          background: linear-gradient(135deg, var(--vapi-primary-color), var(--vapi-primary-dark)) !important;
          color: var(--vapi-dark-bg) !important;
          border: none !important;
          border-radius: 14px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-size: 14px !important;
        }

        #vapi-send-button:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 8px 20px rgba(140, 198, 63, 0.3) !important;
        }

        #vapi-send-button:active {
          transform: scale(0.98) !important;
        }

        .vapi-mode-buttons {
          display: flex !important;
          gap: 8px !important;
          padding: 20px 30px 0 !important;
        }

        .vapi-mode-button {
          flex: 1 !important;
          padding: 12px !important;
          background: rgba(40, 40, 40, 0.6) !important;
          border: 1px solid var(--vapi-glass-border) !important;
          border-radius: 12px !important;
          color: rgba(255, 255, 255, 0.7) !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          font-size: 13px !important;
          font-weight: 500 !important;
        }

        .vapi-mode-button.active {
          background: linear-gradient(135deg, var(--vapi-primary-color), var(--vapi-primary-dark)) !important;
          color: var(--vapi-dark-bg) !important;
          border-color: var(--vapi-primary-color) !important;
        }

        .vapi-mode-button:hover:not(.active) {
          background: rgba(40, 40, 40, 0.8) !important;
          border-color: rgba(140, 198, 63, 0.3) !important;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          #vapi-hybrid-widget {
            bottom: 20px;
            right: 20px;
          }

          #vapi-chat-panel {
            width: calc(100vw - 40px) !important;
            height: calc(100vh - 120px) !important;
            bottom: 90px !important;
            right: -10px !important;
          }

          #vapi-chat-button {
            width: 60px !important;
            height: 60px !important;
          }
        }

        /* Scrollbar styling */
        #vapi-text-messages::-webkit-scrollbar,
        #vapi-voice-messages::-webkit-scrollbar {
          width: 8px;
        }

        #vapi-text-messages::-webkit-scrollbar-track,
        #vapi-voice-messages::-webkit-scrollbar-track {
          background: rgba(40, 40, 40, 0.3);
          border-radius: 10px;
        }

        #vapi-text-messages::-webkit-scrollbar-thumb,
        #vapi-voice-messages::-webkit-scrollbar-thumb {
          background: rgba(140, 198, 63, 0.4);
          border-radius: 10px;
        }

        #vapi-text-messages::-webkit-scrollbar-thumb:hover,
        #vapi-voice-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(140, 198, 63, 0.6);
        }
      `}</style>

      {/* Widget HTML */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <div id="vapi-hybrid-widget" class="vapi-text-mode">
              <div id="vapi-tooltip">Ask Sophie?</div>

              <button id="vapi-chat-button" aria-label="Open chat widget">
                <img src="/images/greenstar-logo-dots.png" alt="Greenstar Solar" />
              </button>

              <div id="vapi-chat-panel">
                <div id="vapi-chat-header">
                  <h3 id="vapi-chat-title">Chat with Sophie</h3>
                  <button id="vapi-close-button" aria-label="Close chat">×</button>
                </div>

                <div class="vapi-mode-buttons">
                  <button class="vapi-mode-button active" data-mode="text">💬 Text Chat</button>
                  <button class="vapi-mode-button" data-mode="voice">🎤 Voice Call</button>
                </div>

                <div id="vapi-text-messages"></div>
                <div id="vapi-voice-messages">
                  <div class="vapi-voice-status">
                    <p style="text-align: center; color: rgba(255,255,255,0.7); padding: 40px 20px;">
                      Click the button below to start a voice conversation with Sophie.
                    </p>
                    <div style="text-align: center; padding: 20px;">
                      <button id="vapi-voice-start" style="padding: 16px 32px; background: linear-gradient(135deg, #8cc63f, #7ab52f); color: #000; border: none; border-radius: 16px; font-weight: 600; cursor: pointer; font-size: 16px;">Start Voice Call</button>
                    </div>
                  </div>
                </div>

                <div id="vapi-input-container">
                  <input
                    type="text"
                    id="vapi-message-input"
                    placeholder="Ask Sophie..."
                    aria-label="Message input"
                  />
                  <button id="vapi-send-button" aria-label="Send message">Send</button>
                </div>
              </div>
            </div>

            <script>
              (function() {
                if (typeof window === 'undefined') return;

                let vapiInstance = null;
                let previousChatId = null;
                let voiceInitialized = false;

                const WIDGET_CONFIG = {
                  assistantId: 'cb76e1bc-dc2d-4ea8-84a1-c17499ed6387',
                  publicApiKey: 'b3f38fb7-8541-4e3e-8708-5d49c3f54f00',
                  directApiKey: 'bb0b198b-1a8f-4675-bdf8-8a865fc5d68a'
                };

                const elements = {
                  button: document.getElementById('vapi-chat-button'),
                  panel: document.getElementById('vapi-chat-panel'),
                  closeButton: document.getElementById('vapi-close-button'),
                  textMessages: document.getElementById('vapi-text-messages'),
                  voiceMessages: document.getElementById('vapi-voice-messages'),
                  input: document.getElementById('vapi-message-input'),
                  sendButton: document.getElementById('vapi-send-button'),
                  modeButtons: document.querySelectorAll('.vapi-mode-button'),
                  widget: document.getElementById('vapi-hybrid-widget'),
                  voiceStart: document.getElementById('vapi-voice-start')
                };

                function addMessage(text, isUser = false) {
                  const messagesContainer = elements.textMessages;
                  const messageDiv = document.createElement('div');
                  messageDiv.className = 'vapi-message ' + (isUser ? 'vapi-message-user' : 'vapi-message-assistant');
                  messageDiv.textContent = text;
                  messagesContainer.appendChild(messageDiv);
                  messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }

                async function sendMessage(message) {
                  if (!message.trim()) return;

                  addMessage(message, true);
                  elements.input.value = '';

                  try {
                    const response = await fetch('https://api.vapi.ai/chat', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + WIDGET_CONFIG.directApiKey
                      },
                      body: JSON.stringify({
                        assistantId: WIDGET_CONFIG.assistantId,
                        input: message,
                        previousChatId: previousChatId
                      })
                    });

                    const data = await response.json();

                    if (data.chatId) {
                      previousChatId = data.chatId;
                    }

                    const assistantMessage = extractAssistantMessage(data);
                    if (assistantMessage) {
                      addMessage(assistantMessage, false);
                    }
                  } catch (error) {
                    console.error('Chat error:', error);
                    addMessage('Sorry, there was an error. Please try again.', false);
                  }
                }

                function extractAssistantMessage(data) {
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
                }

                function switchMode(mode) {
                  elements.widget.className = mode === 'voice' ? 'vapi-voice-mode' : 'vapi-text-mode';
                  elements.modeButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.mode === mode);
                  });

                  if (mode === 'voice' && !voiceInitialized) {
                    initializeVoice();
                  }
                }

                function initializeVoice() {
                  if (typeof window.vapiSDK === 'undefined') {
                    console.warn('VAPI SDK not loaded yet');
                    return;
                  }

                  try {
                    vapiInstance = window.vapiSDK.run({
                      apiKey: WIDGET_CONFIG.publicApiKey,
                      assistant: WIDGET_CONFIG.assistantId
                    });
                    voiceInitialized = true;
                  } catch (error) {
                    console.error('Voice initialization error:', error);
                  }
                }

                // Event listeners
                elements.button?.addEventListener('click', () => {
                  elements.panel.classList.add('open');
                });

                elements.closeButton?.addEventListener('click', () => {
                  elements.panel.classList.remove('open');
                });

                elements.sendButton?.addEventListener('click', () => {
                  sendMessage(elements.input.value);
                });

                elements.input?.addEventListener('keypress', (e) => {
                  if (e.key === 'Enter') {
                    sendMessage(elements.input.value);
                  }
                });

                elements.modeButtons?.forEach(btn => {
                  btn.addEventListener('click', () => {
                    switchMode(btn.dataset.mode);
                  });
                });

                elements.voiceStart?.addEventListener('click', () => {
                  if (vapiInstance) {
                    vapiInstance.start(WIDGET_CONFIG.assistantId);
                  } else {
                    initializeVoice();
                    setTimeout(() => {
                      if (vapiInstance) {
                        vapiInstance.start(WIDGET_CONFIG.assistantId);
                      }
                    }, 500);
                  }
                });

                // Welcome message
                setTimeout(() => {
                  addMessage('Hi! I\\'m Sophie. How can I help you with solar energy today?', false);
                }, 1000);
              })();
            </script>
          `
        }}
      />
    </>
  );
}
