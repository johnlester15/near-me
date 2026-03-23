"use client";

import { Inbox, Lock, MapPin, MessageSquare, Phone, Mail, ArrowLeft, Send, User, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { INITIAL_INQUIRIES } from "../../lib/dashboard/mock-data";
import { Inquiry, Plan } from "../../lib/dashboard/types";
import { AvatarBubble, Reveal, UpgradeBanner } from "./shared";

function ChatWindow({
  inquiry,
  onBack,
  onSend,
}: {
  inquiry: Inquiry;
  onBack: () => void;
  onSend: (id: number, text: string) => void;
}) {
  const [input, setInput] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [inquiry.messages]);

  function handleSend() {
    const t = input.trim();
    if (!t) return;
    onSend(inquiry.id, t);
    setInput("");
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
          <ArrowLeft size={15} className="text-gray-600" />
        </button>
        <AvatarBubble initials={inquiry.avatar} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-gray-900">{inquiry.customer}</p>
          <p className="text-[11px] text-amber-600 font-semibold">
            {inquiry.service} · {inquiry.location}
          </p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            showInfo ? "bg-amber-100" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <User size={14} className={showInfo ? "text-amber-600" : "text-gray-500"} />
        </button>
      </div>

      {showInfo && (
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-3 space-y-1.5 shrink-0">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-2">Customer Info</p>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <Mail size={11} className="text-amber-500 shrink-0" />
            <span>{inquiry.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <Phone size={11} className="text-amber-500 shrink-0" />
            <span>{inquiry.phone}</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8F7F4]">
        {inquiry.messages.map((msg) => {
          const isMe = msg.sender === "professional";
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1 ${
                  isMe ? "bg-gradient-to-br from-gray-700 to-gray-600" : "bg-gradient-to-br from-amber-500 to-amber-400"
                }`}
              >
                {isMe ? "JD" : inquiry.avatar}
              </div>
              <div className={`max-w-[75%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-tr-sm"
                      : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-amber-400 focus-within:bg-white transition-all px-4 py-2.5 min-h-[44px] flex items-center">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your reply..."
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none resize-none"
              style={{ maxHeight: 100 }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 shrink-0"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InboxTab({ plan }: { plan: Plan }) {
  const [inquiries, setInquiries] = useState(INITIAL_INQUIRIES);
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeInquiry = inquiries.find((i) => i.id === activeId) ?? null;
  const unread = inquiries.filter((i) => !i.read).length;

  const monthlyLimit = plan === "free" ? 3 : null;
  const visibleInquiries = monthlyLimit ? inquiries.slice(0, monthlyLimit) : inquiries;
  const usedCount = plan === "free" ? Math.min(inquiries.length, 3) : inquiries.length;

  function openChat(inq: Inquiry) {
    setInquiries((prev) => prev.map((i) => (i.id === inq.id ? { ...i, read: true } : i)));
    setActiveId(inq.id);
  }

  function handleSend(id: number, text: string) {
    const timeStr = new Date().toLocaleTimeString("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id !== id
          ? inq
          : {
              ...inq,
              messages: [...inq.messages, { id: inq.messages.length + 1, sender: "professional", text, time: timeStr }],
            }
      )
    );
  }

  if (activeInquiry) {
    return (
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        <div className="hidden md:flex flex-col w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">Conversations</p>
            <p className="text-[11px] text-gray-400">{unread} unread</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {visibleInquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => openChat(inq)}
                className={`w-full text-left px-4 py-3 transition-all hover:bg-amber-50 ${
                  activeId === inq.id ? "bg-amber-50 border-l-2 border-amber-500" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AvatarBubble initials={inq.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate ${!inq.read ? "font-extrabold text-gray-900" : "font-semibold text-gray-700"}`}>
                        {inq.customer}
                      </p>
                      {!inq.read && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
                    </div>
                    <p className="text-[10px] text-amber-600 font-semibold truncate">{inq.service}</p>
                    <p className="text-[10px] text-gray-400 truncate">{inq.messages[inq.messages.length - 1]?.text.slice(0, 35)}...</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <ChatWindow inquiry={activeInquiry} onBack={() => setActiveId(null)} onSend={handleSend} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">Messages</p>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Customer Inquiries</h1>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Inbox size={17} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Customer Inquiries</h2>
          <p className="text-xs text-gray-400">{unread} unread · tap to open chat</p>
        </div>
      </div>

      {plan === "free" && (
        <div className="mb-6">
          <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-white to-amber-50/50 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Monthly Inquiry Limit</p>
              <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                usedCount === monthlyLimit 
                  ? "bg-red-100 text-red-700" 
                  : "bg-amber-100 text-amber-700"
              }`}>
                {usedCount} / {monthlyLimit} used
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden shadow-inner">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 transition-all duration-500 shadow-lg"
                    style={{ width: `${(usedCount / (monthlyLimit || 1)) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-[11px] font-bold text-gray-500 w-10 text-right">
                {Math.round((usedCount / (monthlyLimit || 1)) * 100)}%
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Get unlimited access</p>
                <p className="text-sm font-bold text-amber-600">₱199/month</p>
              </div>
              <button className="inline-flex items-center gap-2 h-8 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all active:scale-95">
                <span>Upgrade</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {visibleInquiries.map((inq, i) => {
          const lastMsg = inq.messages[inq.messages.length - 1];
          return (
            <Reveal key={inq.id} delay={i * 60} direction="up">
              <button
                onClick={() => openChat(inq)}
                className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5 group ${
                  inq.read ? "border-gray-100 bg-white" : "border-amber-200 bg-amber-50/50 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AvatarBubble initials={inq.avatar} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm ${!inq.read ? "font-extrabold text-gray-900" : "font-semibold text-gray-700"}`}>
                          {inq.customer}
                        </p>
                        {!inq.read && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-2">{inq.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                        {inq.service}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <MapPin size={9} />
                        {inq.location}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {lastMsg.sender === "professional" ? "You: " : ""}
                      {lastMsg.text}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <MessageSquare size={12} className="text-amber-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold">Chat</span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}

        {plan === "free" && inquiries.length > (monthlyLimit || 0) && (
          <Reveal delay={300} direction="up">
            <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 overflow-hidden relative">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-transparent rounded-full -mr-16 -mt-16 opacity-40" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
                    <Lock size={24} className="text-white" strokeWidth={2.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-gray-900 mb-1">
                      Monthly limit reached
                    </p>
                    <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                      You've viewed all {monthlyLimit} free inquiries this month. Upgrade now to see more customer requests and grow your business.
                    </p>

                    <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all active:scale-95">
                      <span>Upgrade Plan</span>
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}