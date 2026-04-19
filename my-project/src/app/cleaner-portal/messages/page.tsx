"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  ArrowRight,
  MessageCircle,
  User,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  customerName: string
  initials: string
  lastMessage: string
  time: string
  unread: boolean
  avatarColor: string
  online?: boolean
}

const conversations: Conversation[] = [
  {
    id: "conv-amanda",
    customerName: "Amanda Johnson",
    initials: "AJ",
    lastMessage: "Hi! Will you be able to come a bit earlier tomorrow? I need to head out by noon.",
    time: "2h ago",
    unread: true,
    avatarColor: "bg-[#1B4332] text-white",
    online: true,
  },
  {
    id: "conv-bob",
    customerName: "Bob Martinez",
    initials: "BM",
    lastMessage: "Thanks for the great clean today! The kitchen looks amazing.",
    time: "Yesterday",
    unread: false,
    avatarColor: "bg-[#0f766e] text-white",
    online: false,
  },
  {
    id: "conv-carol",
    customerName: "Carol Williams",
    initials: "CW",
    lastMessage: "Can you use the eco products for next week's clean? My allergies have been acting up.",
    time: "2 days ago",
    unread: true,
    avatarColor: "bg-[#15803d] text-white",
    online: true,
  },
  {
    id: "conv-david",
    customerName: "David Thompson",
    initials: "DT",
    lastMessage: "I left the key under the mat. The alarm code is 1234.",
    time: "3 days ago",
    unread: false,
    avatarColor: "bg-[#7c3aed] text-white",
    online: false,
  },
  {
    id: "conv-admin",
    customerName: "CleanInstead Admin",
    initials: "AD",
    lastMessage: "Your schedule for next week has been updated. Please review and confirm.",
    time: "1 week ago",
    unread: false,
    avatarColor: "bg-[#d97706] text-white",
    online: false,
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations
    const q = searchQuery.toLowerCase()
    return conversations.filter(
      (c) =>
        c.customerName.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const unreadCount = conversations.filter((c) => c.unread).length

  return (
    <div className="px-4 py-5 space-y-4">
      {/* Header */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1B4332]">Messages</h1>
          {unreadCount > 0 && (
            <Badge className="bg-[#1B4332] text-white text-xs font-medium px-2.5 py-0.5">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <p className="text-sm text-[#6b7280]">
          {conversations.length} conversations
        </p>
      </section>

      {/* Search Bar */}
      <section className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
        <Input
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 h-10 bg-white border-[#e5e7eb] text-sm rounded-xl focus-visible:ring-[#1B4332]/30"
        />
      </section>

      {/* Conversations List */}
      <section className="space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-[#95D5B2]" />
            </div>
            <p className="text-sm font-medium text-[#1B4332]">No messages found</p>
            <p className="text-xs text-[#9ca3af] mt-1">Try a different search term</p>
          </div>
        ) : (
          filteredConversations.map((conversation, index) => (
            <Link
              key={conversation.id}
              href={`/cleaner-portal/messages/${conversation.id}`}
              className="block"
            >
              <Card
                className={cn(
                  "border-0 shadow-sm mb-1 hover:shadow-md transition-all cursor-pointer",
                  conversation.unread ? "bg-[#f0fdf4]" : "bg-white"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold",
                          conversation.avatarColor
                        )}
                      >
                        {conversation.initials}
                      </div>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22c55e] rounded-full border-2 border-white" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={cn(
                            "text-sm font-semibold truncate",
                            conversation.unread ? "text-[#1B4332]" : "text-[#374151]"
                          )}
                        >
                          {conversation.customerName}
                        </h3>
                        <span
                          className={cn(
                            "text-[11px] shrink-0",
                            conversation.unread ? "text-[#1B4332] font-semibold" : "text-[#9ca3af]"
                          )}
                        >
                          {conversation.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <p
                          className={cn(
                            "text-sm truncate flex-1",
                            conversation.unread ? "text-[#374151] font-medium" : "text-[#6b7280]"
                          )}
                        >
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] shrink-0" />
                        )}
                        {!conversation.unread && (
                          <ArrowRight className="w-4 h-4 text-[#d1d5db] shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Unread indicator bar */}
                  {conversation.unread && (
                    <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#1B4332] rounded-r-full" />
                  )}
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </section>

      {/* Empty state for all read */}
      {unreadCount === 0 && !searchQuery && (
        <div className="text-center py-4">
          <p className="text-xs text-[#9ca3af]">✓ All caught up! No unread messages.</p>
        </div>
      )}
    </div>
  )
}
