"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// ─── Config ─────────────────────────────────────────────────────────
const MAX_INPUT_LENGTH = 500;
const CONVERSATION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity
const AUTO_CLOSE_DELAY_MS = 4 * 60 * 1000; // close chat after 4 min of no activity
const MAX_MESSAGES = 50; // max messages before trimming old ones

const initialQuickActions = [
  "What services do you offer?",
  "How much does it cost?",
  "What areas do you serve?",
  "How does your rewards program work?",
];

const followUpQuickActions = [
  "Book a cleaning",
  "Get a free quote",
  "What products do you use?",
  "Are your cleaners insured?",
];

const closingQuickActions = [
  "Contact our team",
  "View our pricing",
  "Learn about our guarantee",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Topic Detection for Smart Quick Actions ─────────────────
  const detectConversationState = useCallback((): "initial" | "engaged" | "closing" => {
    if (messages.length <= 1) return "initial";
    const lastMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
    if (/thank|bye|goodby|see you|that's all|done|i'm good/.test(lastMsg)) return "closing";
    return "engaged";
  }, [messages]);

  const getQuickActions = useCallback((): string[] => {
    const state = detectConversationState();
    switch (state) {
      case "closing":
        return closingQuickActions;
      case "engaged":
        return followUpQuickActions;
      default:
        return initialQuickActions;
    }
  }, [detectConversationState]);

  // ─── Scroll to bottom ────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // ─── Activity Tracking & Auto-close ──────────────────────────
  const resetActivityTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    if (isOpen && !isLoading) {
      autoCloseTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, AUTO_CLOSE_DELAY_MS);
    }
  }, [isOpen, isLoading]);

  useEffect(() => {
    resetActivityTimer();
    return () => {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, [isOpen, isLoading, messages, resetActivityTimer]);

  // ─── Conversation Expiry Timer ──────────────────────────────
  useEffect(() => {
    if (messages.length === 0) return;

    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);

    expiryTimerRef.current = setTimeout(() => {
      setIsExpired(true);
    }, CONVERSATION_TIMEOUT_MS);

    return () => {
      if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
    };
  }, [messages]);

  // ─── Online/Offline Detection ────────────────────────────────
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Initial check
    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ─── Greeting on first open ─────────────────────────────────
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setMessages([
        {
          role: "assistant",
          content:
            "Hi there! I'm CleanBot, your eco-friendly cleaning assistant. How can I help you today? Feel free to ask about our services, pricing, or booking!",
          timestamp: Date.now(),
        },
      ]);
      setIsExpired(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (isOpen) {
      setIsExpired(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, hasGreeted]);

  // ─── Send Message ────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      // Enforce client-side message length
      const trimmed = text.trim().slice(0, MAX_INPUT_LENGTH);

      const userMessage: Message = {
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updated = [...prev, userMessage];
        // Trim old messages if over limit
        if (updated.length > MAX_MESSAGES) {
          return updated.slice(updated.length - MAX_MESSAGES);
        }
        return updated;
      });
      setInput("");
      setIsLoading(true);
      setIsRateLimited(false);

      try {
        const allMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages }),
        });

        if (!res.ok) {
          if (res.status === 429) {
            setIsRateLimited(true);
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content:
                  "You're sending messages too quickly. Please wait a moment before trying again.",
                timestamp: Date.now(),
              },
            ]);
            return;
          }
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (data.error) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, I'm having trouble right now. Please call us at +1 604.497.1001 or email info@cleaninstead.com.",
              timestamp: Date.now(),
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.message, timestamp: Date.now() },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Oops, something went wrong on my end. Please try again! If the issue persists, reach us at +1 604.497.1001 or info@cleaninstead.com.",
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetActivityTimer();
    sendMessage(input);
  };

  const handleQuickAction = (action: string) => {
    resetActivityTimer();
    sendMessage(action);
  };

  // ─── Restart Expired Conversation ───────────────────────────
  const handleRestartConversation = () => {
    setMessages([]);
    setHasGreeted(false);
    setIsExpired(false);
    if (expiryTimerRef.current) clearTimeout(expiryTimerRef.current);
  };

  // ─── Copy Transcript ────────────────────────────────────────
  const handleCopyTranscript = () => {
    const lines = messages.map((m) => {
      const time = new Date(m.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sender = m.role === "user" ? "You" : "CleanBot";
      return `[${time}] ${sender}: ${m.content}`;
    });

    const transcript = [
      "=== CleanInstead Chat Transcript ===",
      `Date: ${new Date().toLocaleDateString()}`,
      `Time: ${new Date().toLocaleTimeString()}`,
      "---",
      ...lines,
      "---",
      "Contact us: +1 604.497.1001 | info@cleaninstead.com",
      "Website: cleaninstead.com",
    ].join("\n");

    navigator.clipboard.writeText(transcript).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // ─── Format timestamp ────────────────────────────────────────
  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // ─── Render ──────────────────────────────────────────────────
  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Notification dot when closed & no messages */}
      {!isOpen && messages.length === 0 && <div className="chatbot-notification" />}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="flex items-center gap-3">
              <div className="chatbot-avatar">CI</div>
              <div>
                <h4 className="chatbot-title">CleanBot</h4>
                <p className="chatbot-status">
                  {isLoading
                    ? "typing..."
                    : !isOnline
                    ? "Offline - check your connection"
                    : "Online - Ready to help"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Transcript button */}
              {messages.length > 1 && (
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="chatbot-close"
                  aria-label="Copy chat transcript"
                  title="Copy transcript"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="chatbot-close"
                aria-label="Close chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Transcript Panel */}
          {showTranscript && (
            <div className="chatbot-transcript-panel">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>Chat Transcript</span>
                <button
                  onClick={handleCopyTranscript}
                  className="chatbot-transcript-copy"
                  disabled={isCopied}
                >
                  {isCopied ? "Copied!" : "Copy All"}
                </button>
              </div>
              <div className="chatbot-transcript-preview">
                {messages.map((m, i) => (
                  <div key={i} className="text-xs" style={{ color: "var(--light-text)" }}>
                    <strong>{m.role === "user" ? "You" : "CleanBot"}</strong>
                    <span className="opacity-60 ml-1">({formatTime(m.timestamp)})</span>
                    : {m.content.slice(0, 80)}{m.content.length > 80 ? "..." : ""}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="chatbot-messages">
            {isExpired ? (
              <div className="chatbot-expired">
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--primary)" }}>
                  This conversation has expired
                </p>
                <p className="text-xs mb-4" style={{ color: "var(--light-text)" }}>
                  For your privacy, chat sessions end after 30 minutes of inactivity. Start a new conversation to continue.
                </p>
                <button
                  onClick={handleRestartConversation}
                  className="chatbot-restart-btn"
                >
                  Start New Conversation
                </button>
              </div>
            ) : !isOnline && messages.length <= 1 ? (
              <div className="chatbot-expired">
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--primary)" }}>
                  You appear to be offline
                </p>
                <p className="text-xs mb-4" style={{ color: "var(--light-text)" }}>
                  Please check your internet connection and try again. You can also reach us directly:
                </p>
                <div className="text-xs space-y-1" style={{ color: "var(--light-text)" }}>
                  <p>📞 <a href="tel:+16044971001" style={{ color: "var(--primary)", textDecoration: "underline" }}>+1 604.497.1001</a></p>
                  <p>✉️ <a href="mailto:info@cleaninstead.com" style={{ color: "var(--primary)", textDecoration: "underline" }}>info@cleaninstead.com</a></p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
                    {msg.role === "assistant" && (
                      <div className="chatbot-msg-avatar">CI</div>
                    )}
                    <div className="chatbot-msg-wrapper">
                      <div className="chatbot-msg-bubble">{msg.content}</div>
                      <span className="chatbot-msg-time">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chatbot-msg chatbot-msg-assistant">
                    <div className="chatbot-msg-avatar">CI</div>
                    <div className="chatbot-msg-bubble chatbot-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (show only when conversation is active and not expired) */}
          {!isExpired && !isLoading && messages.length >= 1 && (
            <div className="chatbot-quick-actions">
              {getQuickActions().map((action) => (
                <button
                  key={action}
                  onClick={() => handleQuickAction(action)}
                  className="chatbot-quick-btn"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {!isExpired && (
            <form onSubmit={handleSubmit} className="chatbot-input-area">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
                  placeholder={!isOnline ? "No internet connection..." : "Ask about our services..."}
                  className="chatbot-input"
                  disabled={isLoading || !isOnline}
                  maxLength={MAX_INPUT_LENGTH}
                  onKeyDown={() => resetActivityTimer()}
                />
                {/* Character counter */}
                {input.length > MAX_INPUT_LENGTH * 0.8 && (
                  <span className="chatbot-char-count">
                    {input.length}/{MAX_INPUT_LENGTH}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="chatbot-send"
                disabled={!input.trim() || isLoading || !isOnline}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          )}

          {/* Footer */}
          {!isExpired && (
            <div className="chatbot-footer">
              <button onClick={() => { setShowTranscript(!showTranscript); }} className="chatbot-footer-link">
                Transcript
              </button>
              <a href="tel:+16044971001" className="chatbot-footer-link">
                Call Us
              </a>
              <a href="mailto:info@cleaninstead.com" className="chatbot-footer-link">
                Email Us
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
