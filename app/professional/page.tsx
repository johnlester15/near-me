"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import {
  MapPin, Star, CheckCircle, BadgeCheck, Bell, LogOut,
  Wrench, MessageSquare, User, Phone, Mail,
  Building2, Clock, TrendingUp, X, Edit3, Save, Camera,
  Shield, FileText, Briefcase, Award,
  Inbox, Home, CheckSquare, AlertCircle,
  ChevronDown, Eye, Send, ArrowLeft, Calendar, Filter,
} from "lucide-react";

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, direction = "up" }: {
  children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "fade";
}) {
  const { ref, visible } = useScrollReveal();
  const hidden = {
    up: "opacity-0 translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    fade: "opacity-0",
  }[direction];
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0 translate-y-0" : hidden}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type JobStatus = "pending" | "in_progress" | "awaiting_confirm" | "completed";

type ChatMessage = {
  id: number;
  sender: "customer" | "professional";
  text: string;
  time: string;
};

type Inquiry = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  initialMessage: string;
  time: string;
  read: boolean;
  avatar: string;
  service: string;
  location: string;
  messages: ChatMessage[];
};

type Job = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  date: string;
  status: JobStatus;
  avatar: string;
  description: string;
  address: string;
  preferredSchedule: string;
  notes: string;
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    customer: "Grace Flores",
    email: "grace@gmail.com",
    phone: "+63 955 123 4567",
    initialMessage: "Hi! I need a plumber for a burst pipe in our kitchen. Can you come this weekend? It's been leaking since last night and we've been mopping the floor every hour.",
    time: "10 min ago",
    read: false,
    avatar: "GF",
    service: "Burst Pipe",
    location: "Davao City",
    messages: [
      { id: 1, sender: "customer", text: "Hi! I need a plumber for a burst pipe in our kitchen. Can you come this weekend? It's been leaking since last night and we've been mopping the floor every hour.", time: "10:02 AM" },
    ],
  },
  {
    id: 2,
    customer: "Ben Tan",
    email: "ben@gmail.com",
    phone: "+63 966 234 5678",
    initialMessage: "Good day! Looking for someone to install a new bathroom set including toilet bowl, sink, and shower. How much do you charge for a full bathroom setup?",
    time: "1 hr ago",
    read: false,
    avatar: "BT",
    service: "Bathroom Installation",
    location: "Tagum City",
    messages: [
      { id: 1, sender: "customer", text: "Good day! Looking for someone to install a new bathroom set including toilet bowl, sink, and shower. How much do you charge for a full bathroom setup?", time: "9:15 AM" },
    ],
  },
  {
    id: 3,
    customer: "Joy Cruz",
    email: "joy@gmail.com",
    phone: "+63 977 345 6789",
    initialMessage: "Hello, I need help with a leaking pipe under the sink. It's been dripping for a week and there's already mold forming. Are you available Monday morning?",
    time: "Yesterday",
    read: true,
    avatar: "JC",
    service: "Pipe Leak",
    location: "Digos City",
    messages: [
      { id: 1, sender: "customer", text: "Hello, I need help with a leaking pipe under the sink. It's been dripping for a week and there's already mold forming. Are you available Monday morning?", time: "Yesterday 2:30 PM" },
      { id: 2, sender: "professional", text: "Hi Joy! Yes, I'm available Monday morning. I can be there by 8 AM. Can you send me your full address?", time: "Yesterday 3:00 PM" },
      { id: 3, sender: "customer", text: "Great! My address is 45 Bonifacio St., Brgy. Zone 2, Digos City. Thank you!", time: "Yesterday 3:15 PM" },
      { id: 4, sender: "professional", text: "Perfect, I've noted it down. I'll see you Monday at 8 AM. Please have the water shut-off valve accessible.", time: "Yesterday 3:20 PM" },
    ],
  },
  {
    id: 4,
    customer: "Noel Santos",
    email: "noel@gmail.com",
    phone: "+63 988 456 7890",
    initialMessage: "Need full bathroom renovation plumbing. We are remodeling and need someone who can handle all the rough-in plumbing before the tiles go in. Please send quotation.",
    time: "2 days ago",
    read: true,
    avatar: "NS",
    service: "Bathroom Renovation",
    location: "Davao City",
    messages: [
      { id: 1, sender: "customer", text: "Need full bathroom renovation plumbing. We are remodeling and need someone who can handle all the rough-in plumbing before the tiles go in. Please send quotation.", time: "2 days ago 11:00 AM" },
      { id: 2, sender: "professional", text: "Hello Noel! For a full bathroom rough-in, my rate starts at ₱8,000 depending on the scope. Can we schedule a site visit first so I can give an accurate quote?", time: "2 days ago 11:45 AM" },
    ],
  },
];

const INITIAL_JOBS: Job[] = [
  {
    id: 1, customer: "Maria Santos", email: "maria@gmail.com", phone: "+63 912 111 2222",
    service: "Pipe Repair", location: "Davao City",
    address: "123 Quezon Blvd., Brgy. Talomo, Davao City", date: "Mar 20, 2025",
    status: "awaiting_confirm", avatar: "MS",
    description: "Burst pipe in the kitchen causing water to flood the floor. The pipe is located under the kitchen sink and appears to have a crack about 3 inches long.",
    preferredSchedule: "Anytime this week, preferably morning",
    notes: "Gate code is 1234. Please call before arriving.",
  },
  {
    id: 2, customer: "Carlo Reyes", email: "carlo@gmail.com", phone: "+63 922 333 4444",
    service: "Water Heater Install", location: "Tagum City",
    address: "45 Rizal St., Brgy. Visayan Village, Tagum City", date: "Mar 18, 2025",
    status: "in_progress", avatar: "CR",
    description: "Need a new electric water heater installed. Customer already purchased an Ariston 30L unit. Just needs professional installation and water line connection.",
    preferredSchedule: "Saturday morning, March 22",
    notes: "Second floor bathroom. Bring own tools.",
  },
  {
    id: 3, customer: "Ana Lim", email: "ana@gmail.com", phone: "+63 933 555 6666",
    service: "Drainage Fix", location: "Davao City",
    address: "78 Pichon St., Brgy. Agdao, Davao City", date: "Mar 15, 2025",
    status: "completed", avatar: "AL",
    description: "Slow drainage in bathroom and kitchen. Both drains are clogged and backing up. Likely needs snaking or hydro-jetting.",
    preferredSchedule: "March 15, afternoon",
    notes: "Job was completed. Customer confirmed on March 16.",
  },
  {
    id: 4, customer: "Rodel Manalo", email: "rodel@gmail.com", phone: "+63 944 777 8888",
    service: "Faucet Replacement", location: "Panabo City",
    address: "12 National Highway, Brgy. New Visayas, Panabo City", date: "Mar 10, 2025",
    status: "completed", avatar: "RM",
    description: "Kitchen faucet is leaking at the base and handle. Customer wants it fully replaced with a new single-handle faucet (American Standard brand).",
    preferredSchedule: "March 10, any time",
    notes: "Completed. Water shutoff is beside the kitchen cabinet.",
  },
];

const STATUS_CONFIG: Record<JobStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:          { label: "Pending",          color: "text-yellow-600", bg: "bg-yellow-50",  border: "border-yellow-200" },
  in_progress:      { label: "In Progress",      color: "text-blue-600",   bg: "bg-blue-50",    border: "border-blue-200"   },
  awaiting_confirm: { label: "Awaiting Confirm", color: "text-orange-600", bg: "bg-orange-50",  border: "border-orange-200" },
  completed:        { label: "Completed",        color: "text-green-600",  bg: "bg-green-50",   border: "border-green-200"  },
};

// ─── Shared ───────────────────────────────────────────────────────────────────
function AvatarBubble({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const s = { sm: "w-8 h-8 text-[11px]", md: "w-10 h-10 text-xs", lg: "w-14 h-14 text-base" }[size];
  return (
    <div className={`${s} rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

function InfoRow({ Icon, label, value }: { Icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={12} className="text-amber-600" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm text-gray-700 font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

// ─── Chat Window ──────────────────────────────────────────────────────────────
function ChatWindow({ inquiry, onBack, onSend }: {
  inquiry: Inquiry;
  onBack: () => void;
  onSend: (id: number, text: string) => void;
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [inquiry.messages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(inquiry.id, trimmed);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors mr-1">
          <ArrowLeft size={15} className="text-gray-600" />
        </button>
        <AvatarBubble initials={inquiry.avatar} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-gray-900">{inquiry.customer}</p>
          <p className="text-[11px] text-amber-600 font-semibold">{inquiry.service} · {inquiry.location}</p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${showInfo ? "bg-amber-100" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          <User size={14} className={showInfo ? "text-amber-600" : "text-gray-500"} />
        </button>
      </div>

      {/* Customer info panel (collapsible) */}
      {showInfo && (
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-3 space-y-1 shrink-0 animate-in slide-in-from-top duration-200">
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-2">Customer Info</p>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <Mail size={11} className="text-amber-500 shrink-0" />
            <span>{inquiry.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <Phone size={11} className="text-amber-500 shrink-0" />
            <span>{inquiry.phone}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <a href={`mailto:${inquiry.email}`} className="flex-1 h-7 rounded-lg bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 hover:opacity-90 transition-all">
              <Mail size={10} /> Email
            </a>
            <a href={`tel:${inquiry.phone}`} className="flex-1 h-7 rounded-lg border border-amber-300 text-amber-600 text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-amber-100 transition-all">
              <Phone size={10} /> Call
            </a>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8F7F4]">
        {/* Date divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] text-gray-400 font-medium px-2">Conversation</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {inquiry.messages.map((msg) => {
          const isMe = msg.sender === "professional";
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              {!isMe && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
                  {inquiry.avatar}
                </div>
              )}
              {isMe && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">
                  JD
                </div>
              )}
              <div className={`max-w-[75%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? "bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-tr-sm"
                    : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-sm"
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-amber-400 focus-within:bg-white transition-all px-4 py-2.5 min-h-[44px] flex items-center">
            <textarea
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type your reply..."
              className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none resize-none leading-relaxed"
              style={{ maxHeight: 100 }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-200 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}

// ─── INBOX TAB ────────────────────────────────────────────────────────────────
function InboxTab() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [activeId, setActiveId] = useState<number | null>(null);

  const activeInquiry = inquiries.find(i => i.id === activeId) ?? null;
  const unread = inquiries.filter(i => !i.read).length;

  function openChat(inq: Inquiry) {
    setInquiries(prev => prev.map(i => i.id === inq.id ? { ...i, read: true } : i));
    setActiveId(inq.id);
  }

  function handleSend(id: number, text: string) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" });
    setInquiries(prev => prev.map(inq => {
      if (inq.id !== id) return inq;
      return {
        ...inq,
        messages: [...inq.messages, {
          id: inq.messages.length + 1,
          sender: "professional",
          text,
          time: timeStr,
        }],
      };
    }));
  }

  // ── Chat view (full screen on mobile, right panel on desktop)
  if (activeInquiry) {
    return (
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* Sidebar list (desktop only) */}
        <div className="hidden md:flex flex-col w-72 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">Conversations</p>
            <p className="text-[11px] text-gray-400">{unread} unread</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {inquiries.map(inq => (
              <button
                key={inq.id}
                onClick={() => openChat(inq)}
                className={`w-full text-left px-4 py-3 transition-all hover:bg-amber-50 ${activeId === inq.id ? "bg-amber-50 border-l-2 border-amber-500" : ""}`}
              >
                <div className="flex items-center gap-2.5">
                  <AvatarBubble initials={inq.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate ${!inq.read ? "font-extrabold text-gray-900" : "font-semibold text-gray-700"}`}>{inq.customer}</p>
                      {!inq.read && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
                    </div>
                    <p className="text-[10px] text-amber-600 font-semibold truncate">{inq.service}</p>
                    <p className="text-[10px] text-gray-400 truncate">
                      {inq.messages[inq.messages.length - 1]?.text.slice(0, 35)}...
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <ChatWindow
            inquiry={activeInquiry}
            onBack={() => setActiveId(null)}
            onSend={handleSend}
          />
        </div>
      </div>
    );
  }

  // ── Inbox list view
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Inbox size={17} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Customer Inquiries</h2>
          <p className="text-xs text-gray-400">{unread} unread · tap to open chat</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {inquiries.map((inq, i) => {
          const lastMsg = inq.messages[inq.messages.length - 1];
          return (
            <Reveal key={inq.id} delay={i * 60} direction="up">
              <button
                onClick={() => openChat(inq)}
                className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5 group ${inq.read ? "border-gray-100 bg-white" : "border-amber-200 bg-amber-50/50 shadow-sm"}`}
              >
                <div className="flex items-start gap-3">
                  <AvatarBubble initials={inq.avatar} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm ${!inq.read ? "font-extrabold text-gray-900" : "font-semibold text-gray-700"}`}>{inq.customer}</p>
                        {!inq.read && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-2">{inq.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">{inq.service}</span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <MapPin size={9} />{inq.location}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1 leading-relaxed">
                      {lastMsg.sender === "professional" ? "You: " : ""}{lastMsg.text}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <MessageSquare size={12} className="text-amber-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[9px] text-gray-400 group-hover:text-amber-500 font-bold transition-colors">Chat</span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

// ─── JOB DETAIL MODAL ─────────────────────────────────────────────────────────
function JobDetailModal({ job, onClose, onMarkDone }: {
  job: Job; onClose: () => void; onMarkDone: (id: number) => void;
}) {
  const [confirmDone, setConfirmDone] = useState(false);
  const s = STATUS_CONFIG[job.status];
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] flex flex-col rounded-t-3xl bg-white overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 md:inset-0 md:m-auto md:max-w-lg md:max-h-[88vh] md:rounded-3xl">
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shrink-0" />
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <CheckSquare size={15} className="text-amber-500" />
            <p className="text-sm font-extrabold text-gray-900">Job Details</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>{s.label}</span>
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <X size={13} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="flex items-center gap-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <AvatarBubble initials={job.avatar} size="lg" />
            <div>
              <p className="text-base font-extrabold text-gray-900">{job.customer}</p>
              <p className="text-xs font-semibold text-amber-600 mb-1">{job.service}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={10} className="text-amber-500" />{job.location}</span>
                <span className="flex items-center gap-1"><Calendar size={10} className="text-amber-500" />{job.date}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Contact</p>
            <InfoRow Icon={Mail} label="Gmail" value={job.email} />
            <InfoRow Icon={Phone} label="Contact Number" value={job.phone} />
            <div className="flex gap-2 mt-3">
              <a href={`mailto:${job.email}`} className="flex-1 h-9 rounded-xl bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"><Mail size={12} /> Email</a>
              <a href={`tel:${job.phone}`} className="flex-1 h-9 rounded-xl border border-amber-200 text-amber-600 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-50 transition-all"><Phone size={12} /> Call</a>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">What They Need</p>
            <div className="bg-gray-50 rounded-xl p-3.5"><p className="text-sm text-gray-700 leading-relaxed">{job.description}</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Location & Schedule</p>
            <InfoRow Icon={MapPin} label="Full Address" value={job.address} />
            <InfoRow Icon={Clock} label="Preferred Schedule" value={job.preferredSchedule} />
          </div>
          {job.notes && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Notes</p>
              <div className="flex gap-2.5 bg-yellow-50 border border-yellow-100 rounded-xl p-3">
                <AlertCircle size={13} className="text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">{job.notes}</p>
              </div>
            </div>
          )}
          {job.status === "in_progress" && !confirmDone && (
            <button onClick={() => setConfirmDone(true)} className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-amber-200">
              <CheckCircle size={16} /> Mark as Job Done
            </button>
          )}
          {job.status === "in_progress" && confirmDone && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-start gap-2.5 mb-4">
                <AlertCircle size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-orange-800 mb-0.5">Confirm Job Completion?</p>
                  <p className="text-xs text-orange-600 leading-relaxed">A notification will be sent to <span className="font-bold">{job.customer}</span>. Jobs Done count updates only after they confirm.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setConfirmDone(false)} className="flex-1 h-9 rounded-xl border border-orange-200 text-orange-600 text-xs font-bold hover:bg-orange-100 transition-all">Cancel</button>
                <button onClick={() => { onMarkDone(job.id); onClose(); }} className="flex-1 h-9 rounded-xl bg-orange-500 text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm">Yes, Mark Done</button>
              </div>
            </div>
          )}
          {job.status === "awaiting_confirm" && (
            <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <AlertCircle size={16} className="text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-orange-800">Waiting for Customer Confirmation</p>
                <p className="text-xs text-orange-600 mt-0.5">Jobs Done updates once the customer confirms.</p>
              </div>
            </div>
          )}
          {job.status === "completed" && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
              <CheckCircle size={16} className="text-green-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-green-800">Job Completed & Confirmed</p>
                <p className="text-xs text-green-600 mt-0.5">Counted in your Jobs Done total.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── DASHBOARD TAB ────────────────────────────────────────────────────────────
function DashboardTab({ jobs }: { jobs: Job[] }) {
  const done = jobs.filter(j => j.status === "completed").length;
  const active = jobs.filter(j => j.status === "in_progress").length;
  const awaiting = jobs.filter(j => j.status === "awaiting_confirm").length;
  const stats = [
    { Icon: CheckCircle, val: done,     label: "Completed",   color: "text-green-500",  bg: "bg-green-50"  },
    { Icon: TrendingUp,  val: active,   label: "In Progress", color: "text-blue-500",   bg: "bg-blue-50"   },
    { Icon: AlertCircle, val: awaiting, label: "Awaiting",    color: "text-orange-500", bg: "bg-orange-50" },
    { Icon: Star,        val: "4.9",    label: "Avg Rating",  color: "text-amber-500",  bg: "bg-amber-50"  },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ Icon, val, label, color, bg }, i) => (
          <Reveal key={label} delay={i * 70} direction="up">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-200">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}><Icon size={17} className={color} /></div>
              <p className="text-2xl font-extrabold text-gray-900">{val}</p>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal direction="up" delay={100}>
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1"><BadgeCheck size={16} /><span className="text-xs font-bold uppercase tracking-widest text-amber-100">Subscription</span></div>
            <p className="text-lg font-extrabold mb-0.5">Active — Listed on Platform</p>
            <p className="text-xs text-amber-100">Your profile is visible to customers searching in Davao.</p>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-white/80 font-semibold"><Clock size={12} /> Renews: April 30, 2025</div>
          </div>
        </div>
      </Reveal>
      <Reveal direction="up" delay={150}>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Recent Jobs</p>
          <div className="space-y-3">
            {jobs.slice(0, 3).map(job => {
              const s = STATUS_CONFIG[job.status];
              return (
                <div key={job.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <AvatarBubble initials={job.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{job.customer}</p>
                    <p className="text-xs text-gray-400">{job.service} · {job.date}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ─── JOBS TAB ─────────────────────────────────────────────────────────────────
function JobsTab() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState<"all" | JobStatus>("all");
  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);
  const counts = {
    all: jobs.length,
    in_progress: jobs.filter(j => j.status === "in_progress").length,
    awaiting_confirm: jobs.filter(j => j.status === "awaiting_confirm").length,
    completed: jobs.filter(j => j.status === "completed").length,
  };
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center"><CheckSquare size={17} className="text-amber-600" /></div>
        <div><h2 className="text-base font-extrabold text-gray-900">Job Tracker</h2><p className="text-xs text-gray-400">Click any job to view full details</p></div>
      </div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {([
          { key: "all", label: `All (${counts.all})` },
          { key: "in_progress", label: `In Progress (${counts.in_progress})` },
          { key: "awaiting_confirm", label: `Awaiting (${counts.awaiting_confirm})` },
          { key: "completed", label: `Done (${counts.completed})` },
        ] as { key: "all" | JobStatus; label: string }[]).map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)} className={`h-8 px-4 rounded-full text-xs font-bold transition-all ${filter === key ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-100 hover:border-amber-200"}`}>{label}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((job, i) => {
          const s = STATUS_CONFIG[job.status];
          return (
            <Reveal key={job.id} delay={i * 60} direction="up">
              <button onClick={() => setSelectedJob(job)} className="w-full text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <AvatarBubble initials={job.avatar} size="md" />
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors">{job.customer}</p>
                      <p className="text-xs font-semibold text-amber-600 mb-1.5">{job.service}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin size={10} />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{job.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Mail size={10} />{job.email}</span>
                        <span className="flex items-center gap-1"><Phone size={10} />{job.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>{s.label}</span>
                    {job.status === "awaiting_confirm" && <span className="flex items-center gap-1 text-[11px] text-orange-500 font-semibold"><AlertCircle size={11} /> Waiting</span>}
                    {job.status === "completed" && <span className="flex items-center gap-1 text-[11px] text-green-600 font-semibold"><CheckCircle size={11} /> Confirmed</span>}
                    <span className="text-[10px] text-gray-400 group-hover:text-amber-500 flex items-center gap-1 transition-colors"><Eye size={10} /> View</span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><CheckSquare size={22} className="text-amber-400" /></div>
            <p className="text-sm font-bold text-gray-500">No jobs here</p>
          </div>
        )}
      </div>
      {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} onMarkDone={(id) => { setJobs(prev => prev.map(j => j.id === id ? { ...j, status: "awaiting_confirm" } : j)); setSelectedJob(null); }} />}
    </div>
  );
}

// ─── PROFILE TAB ─────────────────────────────────────────────────────────────
function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "Juan dela Cruz", type: "Individual Professional", category: "Licensed Plumber", bio: "With over 8 years of hands-on experience in residential and commercial plumbing.", phone: "+63 912 345 6789", email: "juan.delacruz@gmail.com", address: "Brgy. Talomo, Davao City" });
  const credentials = [
    { label: "TESDA NC II – Plumbing", issuer: "TESDA Davao", year: "2019", verified: true },
    { label: "Business Permit", issuer: "City of Davao", year: "2024", verified: true },
    { label: "Valid Government ID (PhilSys)", issuer: "PSA Philippines", year: "2022", verified: true },
  ];
  return (
    <div className="space-y-5 pb-10">
      {saved && <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-green-50 border border-green-200"><CheckCircle size={15} className="text-green-500" /><p className="text-sm font-bold text-green-700">Profile updated!</p></div>}
      <div className="relative">
        <div className="h-36 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/25 text-white text-[11px] font-bold backdrop-blur-sm"><Camera size={11} /> Change Cover</button>
        </div>
        <div className="absolute -bottom-8 left-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center"><Wrench size={26} className="text-amber-600" strokeWidth={1.6} /></div>
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-sm"><Camera size={10} className="text-white" /></button>
          </div>
        </div>
      </div>
      <div className="pt-10 flex items-center justify-between">
        <div><h2 className="text-lg font-extrabold text-gray-900">{form.name}</h2><p className="text-xs font-semibold text-amber-600">{form.category} · {form.type}</p></div>
        <button onClick={() => { if (editing) { setSaved(true); setTimeout(() => setSaved(false), 3000); } setEditing(!editing); }} className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold transition-all ${editing ? "bg-amber-500 text-white shadow-md" : "border border-gray-200 text-gray-600 hover:border-amber-300 bg-white"}`}>
          {editing ? <><Save size={13} /> Save</> : <><Edit3 size={13} /> Edit</>}
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3.5">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Basic Info</p>
        {[{ key: "name", label: "Name", Icon: User }, { key: "category", label: "Category", Icon: Briefcase }, { key: "phone", label: "Phone", Icon: Phone }, { key: "email", label: "Gmail", Icon: Mail }, { key: "address", label: "Address", Icon: MapPin }].map(({ key, label, Icon }) => (
          <div key={key}>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
            <div className="relative"><Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} disabled={!editing} className={`w-full h-10 pl-9 pr-3 rounded-xl border text-sm text-gray-800 transition-all ${editing ? "border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20" : "border-gray-100 bg-gray-50 text-gray-600 cursor-default"}`} />
            </div>
          </div>
        ))}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Bio</label>
          <textarea rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} disabled={!editing} className={`w-full px-3 py-2.5 rounded-xl border text-sm text-gray-800 transition-all resize-none ${editing ? "border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20" : "border-gray-100 bg-gray-50 text-gray-600 cursor-default"}`} />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Credentials</p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50"><BadgeCheck size={11} className="text-green-500" /><span className="text-[10px] font-bold text-green-600">Admin Verified</span></div>
        </div>
        {credentials.map((c, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0"><FileText size={13} className="text-amber-600" /></div>
            <div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-800 truncate">{c.label}</p><p className="text-[11px] text-gray-400">{c.issuer} · {c.year}</p></div>
            {c.verified && <CheckCircle size={14} className="text-green-500 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfessionalDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "inbox" | "jobs" | "profile">("dashboard");
  const [showNotif, setShowNotif] = useState(false);
  const jobs = INITIAL_JOBS;
  const [inquiries] = useState(INITIAL_INQUIRIES);
  const unreadInquiries = inquiries.filter(i => !i.read).length;

  useEffect(() => { setMounted(true); }, []);

  const tabs = [
    { key: "dashboard", Icon: Home,        label: "Dashboard" },
    { key: "inbox",     Icon: Inbox,       label: "Inbox",    badge: unreadInquiries },
    { key: "jobs",      Icon: CheckSquare, label: "Jobs"      },
    { key: "profile",   Icon: User,        label: "Profile"   },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-[family-name:var(--font-geist-sans)]">
      <nav className={`fixed top-0 inset-x-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center shadow-sm"><MapPin size={15} className="text-white" strokeWidth={2.5} /></div>
            <span className="font-extrabold text-gray-900 tracking-tight">Near<span className="text-amber-500">Me</span></span>
            <span className="hidden sm:inline-block text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">Professional</span>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {tabs.map(({ key, Icon, label, badge }) => (
              <button key={key} onClick={() => setActiveTab(key)} className={`relative flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === key ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                <Icon size={13} />{label}
                {badge && badge > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Bell size={16} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white" />
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                  <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">Notifications</p>
                  <div className="space-y-3">
                    {[{ text: "Maria Santos confirmed your job completion!", time: "5 min ago" }, { text: "New inquiry from Grace Flores", time: "10 min ago" }].map((n, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0"><Bell size={12} className="text-amber-600" /></div>
                        <div><p className="text-xs text-gray-700 leading-snug">{n.text}</p><p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center"><Wrench size={16} className="text-amber-600" /></div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">Juan</span>
            </div>
            <button className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors font-semibold"><LogOut size={14} /></button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-28">
        <div className={`mb-7 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">
            {activeTab === "dashboard" && "Overview"}{activeTab === "inbox" && "Messages"}{activeTab === "jobs" && "Job Management"}{activeTab === "profile" && "Your Profile"}
          </p>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {activeTab === "dashboard" && "Good morning, Juan"}{activeTab === "inbox" && "Customer Inquiries"}{activeTab === "jobs" && "Track Your Jobs"}{activeTab === "profile" && "Manage Your Profile"}
          </h1>
        </div>
        {activeTab === "dashboard" && <DashboardTab jobs={jobs} />}
        {activeTab === "inbox"     && <InboxTab />}
        {activeTab === "jobs"      && <JobsTab />}
        {activeTab === "profile"   && <ProfileTab />}
      </main>

      <div className="fixed bottom-0 inset-x-0 md:hidden bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around z-30">
        {tabs.map(({ key, Icon, label, badge }) => (
          <button key={key} onClick={() => setActiveTab(key)} className={`relative flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeTab === key ? "text-amber-600" : "text-gray-400"}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${activeTab === key ? "bg-amber-50" : ""}`}><Icon size={17} /></div>
            <span className="text-[10px] font-bold">{label}</span>
            {badge && badge > 0 && <span className="absolute top-0.5 right-3 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}