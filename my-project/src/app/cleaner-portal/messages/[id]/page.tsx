"use client"

import React, { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Send,
  Check,
  CheckCheck,
  Phone,
  Camera,
  Paperclip,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  text: string
  time: string
  sent: boolean
  read: boolean
}

interface ConversationData {
  customerName: string
  initials: string
  avatarColor: string
  online: boolean
  messages: ChatMessage[]
}

const conversationData: Record<string, ConversationData> = {
  "conv-amanda": {
    customerName: "Amanda Johnson",
    initials: "AJ",
    avatarColor: "bg-[#1B4332] text-white",
    online: true,
    messages: [
      {
        id: "m1",
        text: "Hi Maria! I just wanted to confirm your appointment for tomorrow at 9 AM.",
        time: "10:30 AM",
        sent: false,
        read: true,
      },
      {
        id: "m2",
        text: "Yes, Amanda! I'll be there at 9 AM sharp. Looking forward to it!",
        time: "10:32 AM",
        sent: true,
        read: true,
      },
      {
        id: "m3",
        text: "Great! Just a quick question — do you bring your own cleaning supplies?",
        time: "10:35 AM",
        sent: false,
        read: true,
      },
      {
        id: "m4",
        text: "I do! I bring all my own eco-friendly products and equipment. I use the CleanInstead standard kit which includes microfiber cloths, HEPA vacuum, and non-toxic cleaning solutions.",
        time: "10:37 AM",
        sent: true,
        read: true,
      },
      {
        id: "m5",
        text: "That sounds perfect! I have allergies so I really appreciate the eco-friendly products.",
        time: "10:40 AM",
        sent: false,
        read: true,
      },
      {
        id: "m6",
        text: "Absolutely! I always prioritize using products that are safe for families with allergies and pets. I also have a special hypoallergenic option I can use if needed.",
        time: "10:42 AM",
        sent: true,
        read: true,
      },
      {
        id: "m7",
        text: "Hi! Will you be able to come a bit earlier tomorrow? I need to head out by noon.",
        time: "2:15 PM",
        sent: false,
        read: true,
      },
      {
        id: "m8",
        text: "I can definitely try to arrive by 8:30 AM! That should give us enough time. Would that work for you?",
        time: "2:20 PM",
        sent: true,
        read: false,
      },
      {
        id: "m9",
        text: "That would be amazing! Yes, 8:30 works perfectly. Thank you so much!",
        time: "2:22 PM",
        sent: false,
        read: true,
      },
      {
        id: "m10",
        text: "You're welcome! See you tomorrow at 8:30 AM. Don't forget to leave the key under the mat if you're not home. 😊",
        time: "2:25 PM",
        sent: true,
        read: false,
      },
    ],
  },
  "conv-bob": {
    customerName: "Bob Martinez",
    initials: "BM",
    avatarColor: "bg-[#0f766e] text-white",
    online: false,
    messages: [
      {
        id: "m1",
        text: "Hey Maria, I just got home. The place looks incredible!",
        time: "5:00 PM",
        sent: false,
        read: true,
      },
      {
        id: "m2",
        text: "Thank you Bob! I really focused on the kitchen and bathrooms since that was the priority. How does the oven look?",
        time: "5:05 PM",
        sent: true,
        read: true,
      },
      {
        id: "m3",
        text: "The oven is spotless! I can't believe how clean it is. My wife is going to be so happy.",
        time: "5:08 PM",
        sent: false,
        read: true,
      },
      {
        id: "m4",
        text: "That's wonderful to hear! The grout in the master bathroom shower took some extra work but it came out great too.",
        time: "5:10 PM",
        sent: true,
        read: true,
      },
      {
        id: "m5",
        text: "Thanks for the great clean today! The kitchen looks amazing. I'll definitely be booking again for next month.",
        time: "5:15 PM",
        sent: false,
        read: true,
      },
      {
        id: "m6",
        text: "That means a lot! Looking forward to it. Don't hesitate to reach out if you need anything before then!",
        time: "5:18 PM",
        sent: true,
        read: true,
      },
    ],
  },
  "conv-carol": {
    customerName: "Carol Williams",
    initials: "CW",
    avatarColor: "bg-[#15803d] text-white",
    online: true,
    messages: [
      {
        id: "m1",
        text: "Hi Maria, thanks for the eco clean today! My allergies weren't triggered at all 🎉",
        time: "4:00 PM",
        sent: false,
        read: true,
      },
      {
        id: "m2",
        text: "That's so great to hear, Carol! I'm glad the hypoallergenic products worked well for you.",
        time: "4:05 PM",
        sent: true,
        read: true,
      },
      {
        id: "m3",
        text: "Can you use the eco products for next week's clean? My allergies have been acting up.",
        time: "3:00 PM",
        sent: false,
        read: true,
      },
      {
        id: "m4",
        text: "Of course! I always use the eco-friendly products for your home. I'll make sure to bring the extra-gentle solutions this time.",
        time: "3:10 PM",
        sent: true,
        read: true,
      },
      {
        id: "m5",
        text: "Perfect, thank you! Also, could you focus a bit more on the bedroom this time? Lots of dust.",
        time: "3:15 PM",
        sent: false,
        read: true,
      },
    ],
  },
  "conv-david": {
    customerName: "David Thompson",
    initials: "DT",
    avatarColor: "bg-[#7c3aed] text-white",
    online: false,
    messages: [
      {
        id: "m1",
        text: "Hi Maria! Just wanted to let you know I'll be out during tomorrow's clean.",
        time: "9:00 AM",
        sent: false,
        read: true,
      },
      {
        id: "m2",
        text: "No problem, David! I'll make sure everything is locked up properly when I'm done.",
        time: "9:15 AM",
        sent: true,
        read: true,
      },
      {
        id: "m3",
        text: "I left the key under the mat. The alarm code is 1234.",
        time: "9:20 AM",
        sent: false,
        read: true,
      },
      {
        id: "m4",
        text: "Got it! Key under the mat, alarm code 1234. I'll text you when I'm done.",
        time: "9:22 AM",
        sent: true,
        read: true,
      },
      {
        id: "m5",
        text: "Perfect, thanks Maria! See you tomorrow.",
        time: "9:25 AM",
        sent: false,
        read: true,
      },
    ],
  },
  "conv-admin": {
    customerName: "CleanInstead Admin",
    initials: "AD",
    avatarColor: "bg-[#d97706] text-white",
    online: false,
    messages: [
      {
        id: "m1",
        text: "Hi Maria, your performance review for last month is now available in your profile.",
        time: "9:00 AM",
        sent: false,
        read: true,
      },
      {
        id: "m2",
        text: "Thank you! I'll take a look at it today.",
        time: "10:00 AM",
        sent: true,
        read: true,
      },
      {
        id: "m3",
        text: "Great! Also, your schedule for next week has been updated. You have 6 jobs scheduled. Please review and confirm by Friday.",
        time: "10:05 AM",
        sent: false,
        read: true,
      },
      {
        id: "m4",
        text: "Will do! I'll check the schedule right away. Thanks for the heads up!",
        time: "10:10 AM",
        sent: true,
        read: true,
      },
    ],
  },
}

export default function ChatThreadPage() {
  const params = useParams()
  const router = useRouter()
  const conversationId = params.id as string

  const conv = conversationData[conversationId] || conversationData["conv-amanda"]

  const [messages, setMessages] = useState<ChatMessage[]>(conv.messages)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      text: inputValue.trim(),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      sent: true,
      read: false,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Group messages by date
  const getDateSeparator = (index: number): string | null => {
    if (index === 0) return "Today"
    return null
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Chat Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#e5e7eb] px-4 py-3 flex items-center gap-3 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/cleaner-portal/messages")}
          className="h-9 w-9 text-[#1B4332] hover:bg-[#1B4332]/10 shrink-0"
          aria-label="Back to messages"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative shrink-0">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                conv.avatarColor
              )}
            >
              {conv.initials}
            </div>
            {conv.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-white" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-[#1B4332] truncate">{conv.customerName}</h1>
            <p className={cn("text-xs", conv.online ? "text-[#22c55e]" : "text-[#9ca3af]")}>
              {conv.online ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-[#1B4332] hover:bg-[#1B4332]/10 shrink-0"
          aria-label="Call"
        >
          <Phone className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f9fafb]">
        {/* Date separator */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-[#e5e7eb]" />
          <span className="text-[10px] font-medium text-[#9ca3af] uppercase tracking-wider bg-[#f9fafb] px-2">
            Today
          </span>
          <div className="flex-1 h-px bg-[#e5e7eb]" />
        </div>

        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sent ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm",
                message.sent
                  ? "bg-[#1B4332] text-white rounded-br-md"
                  : "bg-white text-[#1f2937] rounded-bl-md border border-[#e5e7eb]"
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              <div
                className={cn(
                  "flex items-center gap-1 mt-1",
                  message.sent ? "justify-end" : "justify-start"
                )}
              >
                <span
                  className={cn(
                    "text-[10px]",
                    message.sent ? "text-[#95D5B2]" : "text-[#9ca3af]"
                  )}
                >
                  {message.time}
                </span>
                {message.sent && (
                  message.read ? (
                    <CheckCheck className="w-3.5 h-3.5 text-[#95D5B2]" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-[#95D5B2]/60" />
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar */}
      <div className="sticky bottom-16 bg-white border-t border-[#e5e7eb] px-3 py-2.5">
        <div className="flex items-end gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#6b7280] hover:text-[#1B4332] hover:bg-[#1B4332]/10 shrink-0"
              aria-label="Attach file"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-[#6b7280] hover:text-[#1B4332] hover:bg-[#1B4332]/10 shrink-0"
              aria-label="Take photo"
            >
              <Camera className="w-4.5 h-4.5" />
            </Button>
          </div>
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-10 pr-3 bg-[#f9fafb] border-[#e5e7eb] rounded-xl text-sm focus-visible:ring-[#1B4332]/30"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={cn(
              "h-10 w-10 rounded-xl shrink-0 p-0 flex items-center justify-center transition-all",
              inputValue.trim()
                ? "bg-[#1B4332] hover:bg-[#1B4332]/90 text-white shadow-md"
                : "bg-[#e5e7eb] text-[#9ca3af]"
            )}
            aria-label="Send message"
          >
            <Send className="w-4.5 h-4.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
