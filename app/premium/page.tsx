"use client";

import { useState, useEffect, useRef, ReactNode, useMemo } from "react";
import {
  MapPin, Star, CheckCircle, BadgeCheck, Bell, LogOut,
  Wrench, MessageSquare, User, Phone, Mail,
  Clock, TrendingUp, X, Edit3, Save, Camera,
  FileText, Briefcase,
  Inbox, Home, CheckSquare, AlertCircle,
  Eye, Send, ArrowLeft, Calendar,
  Crown, Zap, Play, Lock, Video, Link, Info,
  CheckCheck, ArrowRight, ChevronRight,
  Sun, Moon, Upload, Trash2,
} from "lucide-react";

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}) {
  const { ref, visible } = useScrollReveal();
  const hidden = {
    up: "opacity-0 translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    fade: "opacity-0",
  }[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : hidden
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Plan = "free" | "basic" | "pro" | "premium";
type JobStatus = "pending" | "in_progress" | "awaiting_confirm" | "completed";
type ThemeMode = "light" | "dark";

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

type SavedVideo = {
  type: "youtube" | "file";
  url: string;
  name?: string;
  savedAt: string;
};

// ─── Plan config ──────────────────────────────────────────────────────────────
const PLAN_CONFIG: Record<
  Plan,
  {
    label: string;
    price: string;
    gradient: string;
    bg: string;
    border: string;
    textColor: string;
    badgeBg: string;
    Icon: React.ElementType;
    features: string[];
    limits: {
      inquiries: string;
      visibility: string;
      position: string;
      video: boolean;
      featured: boolean;
      analytics: boolean;
    };
  }
> = {
  free: {
    label: "Free",
    price: "₱0/mo",
    gradient: "from-gray-500 to-gray-400",
    bg: "bg-gray-50 dark:bg-gray-800/60",
    border: "border-gray-200 dark:border-gray-700",
    textColor: "text-gray-600 dark:text-gray-300",
    badgeBg: "bg-gray-100 dark:bg-gray-800",
    Icon: User,
    features: [
      "Visible to customers (limited)",
      "3 inquiries per month",
      "Listed at bottom of results",
    ],
    limits: {
      inquiries: "3/month",
      visibility: "Bottom listing",
      position: "Last",
      video: false,
      featured: false,
      analytics: false,
    },
  },
  basic: {
    label: "Basic",
    price: "₱199/mo",
    gradient: "from-blue-500 to-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800/70",
    textColor: "text-blue-600 dark:text-blue-300",
    badgeBg: "bg-blue-100 dark:bg-blue-950/40",
    Icon: BadgeCheck,
    features: [
      "Unlimited inquiries",
      "Full visibility",
      "Verified badge",
      "Listed in all results",
    ],
    limits: {
      inquiries: "Unlimited",
      visibility: "Full listing",
      position: "Standard",
      video: false,
      featured: false,
      analytics: false,
    },
  },
  pro: {
    label: "Pro",
    price: "₱399/mo",
    gradient: "from-purple-500 to-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800/70",
    textColor: "text-purple-600 dark:text-purple-300",
    badgeBg: "bg-purple-100 dark:bg-purple-950/40",
    Icon: Zap,
    features: [
      "Featured section placement",
      "Priority in search results",
      "Analytics dashboard",
      "Unlimited inquiries",
    ],
    limits: {
      inquiries: "Unlimited",
      visibility: "Featured section",
      position: "Priority",
      video: false,
      featured: true,
      analytics: true,
    },
  },
  premium: {
    label: "Premium",
    price: "₱699/mo",
    gradient: "from-amber-500 to-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-700/60",
    textColor: "text-amber-600 dark:text-amber-300",
    badgeBg: "bg-amber-100 dark:bg-amber-950/40",
    Icon: Crown,
    features: [
      "Sponsored top placement",
      "Introduction video on profile",
      "Maximum exposure",
      "Analytics + priority support",
    ],
    limits: {
      inquiries: "Unlimited",
      visibility: "Sponsored top",
      position: "Top",
      video: true,
      featured: true,
      analytics: true,
    },
  },
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const DEMO_PLAN: Plan = "premium";
const VIDEO_URL = "https://www.youtube.com/embed/DTzHOdfACPM";

const INITIAL_VIDEO_DATA: SavedVideo = {
  type: "youtube",
  url: VIDEO_URL,
  savedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
};

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    customer: "Grace Flores",
    email: "grace@gmail.com",
    phone: "+63 955 123 4567",
    initialMessage:
      "Hi! I need a plumber for a burst pipe in our kitchen. Can you come this weekend?",
    time: "10 min ago",
    read: false,
    avatar: "GF",
    service: "Burst Pipe",
    location: "Davao City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hi! I need a plumber for a burst pipe in our kitchen. Can you come this weekend?",
        time: "10:02 AM",
      },
    ],
  },
  {
    id: 2,
    customer: "Ben Tan",
    email: "ben@gmail.com",
    phone: "+63 966 234 5678",
    initialMessage:
      "Good day! Looking for someone to install a new bathroom set. How much do you charge?",
    time: "1 hr ago",
    read: false,
    avatar: "BT",
    service: "Bathroom Installation",
    location: "Tagum City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Good day! Looking for someone to install a new bathroom set. How much do you charge?",
        time: "9:15 AM",
      },
    ],
  },
  {
    id: 3,
    customer: "Joy Cruz",
    email: "joy@gmail.com",
    phone: "+63 977 345 6789",
    initialMessage:
      "Hello, I need help with a leaking pipe under the sink. Are you available Monday morning?",
    time: "Yesterday",
    read: true,
    avatar: "JC",
    service: "Pipe Leak",
    location: "Digos City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hello, I need help with a leaking pipe under the sink. Are you available Monday morning?",
        time: "Yesterday 2:30 PM",
      },
      {
        id: 2,
        sender: "professional",
        text: "Hi Joy! Yes, I'm available Monday morning. I can be there by 8 AM. Can you send me your full address?",
        time: "Yesterday 3:00 PM",
      },
      {
        id: 3,
        sender: "customer",
        text: "Great! My address is 45 Bonifacio St., Brgy. Zone 2, Digos City. Thank you!",
        time: "Yesterday 3:15 PM",
      },
    ],
  },
  {
    id: 4,
    customer: "Noel Santos",
    email: "noel@gmail.com",
    phone: "+63 988 456 7890",
    initialMessage: "Need full bathroom renovation plumbing. Please send quotation.",
    time: "2 days ago",
    read: true,
    avatar: "NS",
    service: "Bathroom Renovation",
    location: "Davao City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Need full bathroom renovation plumbing. Please send quotation.",
        time: "2 days ago 11:00 AM",
      },
      {
        id: 2,
        sender: "professional",
        text: "Hello Noel! My rate starts at ₱8,000. Can we schedule a site visit?",
        time: "2 days ago 11:45 AM",
      },
    ],
  },
];

const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    customer: "Maria Santos",
    email: "maria@gmail.com",
    phone: "+63 912 111 2222",
    service: "Pipe Repair",
    location: "Davao City",
    address: "123 Quezon Blvd., Brgy. Talomo, Davao City",
    date: "Mar 20, 2025",
    status: "awaiting_confirm",
    avatar: "MS",
    description: "Burst pipe in the kitchen causing water to flood the floor.",
    preferredSchedule: "Anytime this week, preferably morning",
    notes: "Gate code is 1234. Please call before arriving.",
  },
  {
    id: 2,
    customer: "Carlo Reyes",
    email: "carlo@gmail.com",
    phone: "+63 922 333 4444",
    service: "Water Heater Install",
    location: "Tagum City",
    address: "45 Rizal St., Brgy. Visayan Village, Tagum City",
    date: "Mar 18, 2025",
    status: "in_progress",
    avatar: "CR",
    description:
      "Need a new electric water heater installed. Customer already purchased an Ariston 30L unit.",
    preferredSchedule: "Saturday morning, March 22",
    notes: "Second floor bathroom. Bring own tools.",
  },
  {
    id: 3,
    customer: "Ana Lim",
    email: "ana@gmail.com",
    phone: "+63 933 555 6666",
    service: "Drainage Fix",
    location: "Davao City",
    address: "78 Pichon St., Brgy. Agdao, Davao City",
    date: "Mar 15, 2025",
    status: "completed",
    avatar: "AL",
    description: "Slow drainage in bathroom and kitchen.",
    preferredSchedule: "March 15, afternoon",
    notes: "Job completed. Customer confirmed.",
  },
  {
    id: 4,
    customer: "Rodel Manalo",
    email: "rodel@gmail.com",
    phone: "+63 944 777 8888",
    service: "Faucet Replacement",
    location: "Panabo City",
    address: "12 National Highway, Brgy. New Visayas, Panabo City",
    date: "Mar 10, 2025",
    status: "completed",
    avatar: "RM",
    description: "Kitchen faucet leaking at base and handle.",
    preferredSchedule: "March 10, any time",
    notes: "Completed. Water shutoff beside kitchen cabinet.",
  },
];

const STATUS_CONFIG: Record<
  JobStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  pending: {
    label: "Pending",
    color: "text-yellow-600 dark:text-yellow-300",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800/60",
  },
  in_progress: {
    label: "In Progress",
    color: "text-blue-600 dark:text-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800/60",
  },
  awaiting_confirm: {
    label: "Awaiting Confirm",
    color: "text-orange-600 dark:text-orange-300",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800/60",
  },
  completed: {
    label: "Completed",
    color: "text-green-600 dark:text-green-300",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800/60",
  },
};

// ─── Shared ───────────────────────────────────────────────────────────────────
function AvatarBubble({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const s = {
    sm: "w-8 h-8 text-[11px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-base",
  }[size];

  return (
    <div
      className={`${s} rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}

function InfoRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={12} className="text-amber-600 dark:text-amber-300" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── UPGRADE PROMPT BANNER ────────────────────────────────────────────────────
function UpgradeBanner({
  targetPlan,
  message,
  compact = false,
}: {
  currentPlan: Plan;
  targetPlan: Plan;
  message: string;
  compact?: boolean;
}) {
  const cfg = PLAN_CONFIG[targetPlan];
  const Icon = cfg.Icon;

  if (compact) {
    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-xl ${cfg.bg} border ${cfg.border}`}
      >
        <Icon size={14} className={cfg.textColor} />
        <p className={`text-xs font-semibold ${cfg.textColor} flex-1`}>
          {message}
        </p>
        <button
          className={`shrink-0 h-7 px-3 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${cfg.gradient} hover:opacity-90 transition-all`}
        >
          Upgrade
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border ${cfg.border} overflow-hidden`}>
      <div
        className={`bg-gradient-to-r ${cfg.gradient} p-4 text-white relative overflow-hidden`}
      >
        <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">
              Upgrade to {cfg.label}
            </p>
            <p className="text-base font-extrabold">{message}</p>
          </div>
        </div>
      </div>
      <div className={`${cfg.bg} px-4 py-3`}>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          {cfg.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle size={11} className={cfg.textColor} />
              <span className={`text-[11px] font-semibold ${cfg.textColor}`}>
                {f}
              </span>
            </div>
          ))}
        </div>
        <button
          className={`w-full h-10 rounded-xl text-white text-sm font-bold bg-gradient-to-r ${cfg.gradient} hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2`}
        >
          Upgrade to {cfg.label} — {cfg.price} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── SUBSCRIPTION STATUS CARD ─────────────────────────────────────────────────
function SubscriptionCard({ plan }: { plan: Plan }) {
  const cfg = PLAN_CONFIG[plan];
  const Icon = cfg.Icon;

  return (
    <div className={`relative rounded-2xl overflow-hidden border ${cfg.border} shadow-sm`}>
      <div
        className={`bg-gradient-to-r ${cfg.gradient} p-4 text-white relative overflow-hidden`}
      >
        <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon size={15} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                Current Plan
              </span>
            </div>
            <p className="text-xl font-extrabold">
              {cfg.label} — {cfg.price}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
            <CheckCheck size={18} className="text-white" />
          </div>
        </div>
      </div>

      <div className={`${cfg.bg} px-4 py-3`}>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {cfg.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle size={10} className={cfg.textColor} />
              <span className={`text-[10px] font-semibold ${cfg.textColor}`}>
                {f}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-white dark:bg-gray-900 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Clock size={11} className="text-gray-400 dark:text-gray-500" />
          <span>
            Renews: <span className="font-bold text-gray-700 dark:text-gray-200">April 30, 2025</span>
          </span>
        </div>
        {plan !== "premium" ? (
          <button
            className={`flex items-center gap-1.5 h-7 px-3 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${PLAN_CONFIG.premium.gradient} hover:opacity-90 transition-all`}
          >
            <Crown size={10} /> Upgrade
          </button>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-300">
            <Star size={10} className="fill-amber-400 text-amber-400" /> Best Plan
          </div>
        )}
      </div>
    </div>
  );
}

// ─── VIDEO MANAGER ────────────────────────────────────────────────────────────
function VideoManager({
  plan,
  videoData,
  onSave,
  onRemove,
}: {
  plan: Plan;
  videoData?: SavedVideo;
  onSave: (video: SavedVideo) => void;
  onRemove: () => void;
}) {
  const [mode, setMode] = useState<"upload" | "youtube">(
    videoData?.type === "youtube" ? "youtube" : "upload"
  );
  const [input, setInput] = useState(videoData?.type === "youtube" ? videoData.url : "");
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localVideoUrl, setLocalVideoUrl] = useState<string | null>(
    videoData?.type === "file" ? videoData.url : null
  );

  const savedAtMs = videoData?.savedAt ? new Date(videoData.savedAt).getTime() : null;
  const now = Date.now();
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  const canReplace = !savedAtMs || now - savedAtMs >= threeDaysMs;
  const nextReplaceAt = savedAtMs ? new Date(savedAtMs + threeDaysMs) : null;

  useEffect(() => {
    return () => {
      if (localVideoUrl?.startsWith("blob:")) URL.revokeObjectURL(localVideoUrl);
    };
  }, [localVideoUrl]);

  function getEmbedUrl(url: string) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    if (url.includes("youtube.com/embed/")) return url;
    return url;
  }

  function handleFileChange(file: File | null) {
    if (!file) return;
    const allowed = ["video/mp4", "video/webm", "video/quicktime"];
    if (!allowed.includes(file.type)) {
      alert("Please upload MP4, WEBM, or MOV only.");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      alert("Video must be 100MB or below.");
      return;
    }

    if (localVideoUrl?.startsWith("blob:")) URL.revokeObjectURL(localVideoUrl);

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setLocalVideoUrl(objectUrl);
    setPreview(false);
    setPlaying(false);
    setMode("upload");
  }

  function handleSave() {
    if (!canReplace && videoData) return;

    if (mode === "youtube") {
      const finalUrl = getEmbedUrl(input.trim());
      if (!finalUrl) return;

      onSave({
        type: "youtube",
        url: finalUrl,
        savedAt: new Date().toISOString(),
      });
    } else {
      if (!selectedFile || !localVideoUrl) return;

      onSave({
        type: "file",
        url: localVideoUrl,
        name: selectedFile.name,
        savedAt: new Date().toISOString(),
      });
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (plan !== "premium") {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Introduction Video
          </p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Lock size={9} className="text-gray-400 dark:text-gray-500" />
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
              Premium Only
            </span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/70 p-5 flex flex-col items-center text-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <Video size={22} className="text-gray-400 dark:text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-200 mb-0.5">
              Video Introduction
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
              Add a YouTube video or upload from file manager so customers can see your work before hiring you.
            </p>
          </div>
          <div className="text-[11px] text-gray-400 dark:text-gray-500">
            Available for <span className="font-bold text-amber-600 dark:text-amber-300">Premium ₱699/mo</span> only
          </div>
        </div>

        <UpgradeBanner
          currentPlan={plan}
          targetPlan="premium"
          message="Add upload + YouTube video to attract more customers"
          compact
        />
      </div>
    );
  }

  const currentPreviewUrl =
    mode === "youtube"
      ? input
        ? getEmbedUrl(input)
        : videoData?.type === "youtube"
        ? videoData.url
        : ""
      : localVideoUrl || (videoData?.type === "file" ? videoData.url : "");

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-amber-200 dark:border-amber-700/60 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Introduction Video
          </p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-700/60">
            <Crown size={10} className="text-amber-600 dark:text-amber-300" />
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300">
              Premium
            </span>
          </div>
        </div>
        {saved && (
          <div className="flex items-center gap-1 text-green-600 dark:text-green-300">
            <CheckCircle size={13} />
            <span className="text-xs font-bold">Saved!</span>
          </div>
        )}
      </div>

      {videoData && currentPreviewUrl && (
        <div className="mb-4">
          <div
            className="relative w-full rounded-xl overflow-hidden bg-gray-900 shadow-md mb-2"
            style={{ paddingBottom: "56.25%" }}
          >
            {videoData.type === "youtube" ? (
              !playing ? (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
                  onClick={() => setPlaying(true)}
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center group-hover:bg-amber-500/80 group-hover:border-amber-400 transition-all duration-300">
                    <Play size={22} className="text-white fill-white ml-1" />
                  </div>
                  <p className="text-white/60 text-xs mt-3">Click to preview your video</p>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full">
                    <div className="w-3 h-3 bg-red-500 rounded-sm flex items-center justify-center shrink-0">
                      <Play size={7} className="text-white fill-white ml-0.5" />
                    </div>
                    <span className="text-[9px] font-bold text-white/80">YouTube</span>
                  </div>
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${videoData.url}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="Your introduction video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )
            ) : (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                src={videoData.url}
              />
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              {videoData.type === "file"
                ? `Your uploaded video is live${videoData.name ? ` · ${videoData.name}` : ""} ✓`
                : "Your YouTube video is live on your profile ✓"}
            </p>

            <button
              onClick={onRemove}
              disabled={!canReplace}
              className="h-8 px-3 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 text-[11px] font-bold flex items-center gap-1.5 disabled:opacity-40"
            >
              <Trash2 size={11} /> Remove
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
          <Info size={13} className="text-blue-600 dark:text-blue-300 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-700 dark:text-blue-200 leading-relaxed">
            <p className="font-bold mb-0.5">How video works:</p>
            <p>1. You can upload from file manager or paste a YouTube link</p>
            <p>2. Supported uploads: MP4, MOV, WEBM up to 100MB</p>
            <p>3. After saving, video can be changed again after 3 days</p>
            {!canReplace && nextReplaceAt && (
              <p className="mt-1 font-semibold text-blue-500 dark:text-blue-300">
                Next change available: {nextReplaceAt.toLocaleString("en-PH")}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("upload")}
            disabled={!canReplace && !!videoData}
            className={`h-10 rounded-xl text-sm font-bold border transition-all ${
              mode === "upload"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-700"
            } disabled:opacity-40`}
          >
            Upload File
          </button>
          <button
            onClick={() => setMode("youtube")}
            disabled={!canReplace && !!videoData}
            className={`h-10 rounded-xl text-sm font-bold border transition-all ${
              mode === "youtube"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 border-gray-200 dark:border-gray-700"
            } disabled:opacity-40`}
          >
            YouTube Link
          </button>
        </div>

        {mode === "upload" ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 p-4">
              <label className="flex flex-col items-center justify-center gap-2 cursor-pointer text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                  <Upload size={22} className="text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    Choose video from file manager
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    MP4, MOV, WEBM · max 100MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime,video/*"
                  className="hidden"
                  disabled={!canReplace && !!videoData}
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
                <span className="h-9 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-bold inline-flex items-center justify-center">
                  Select Video
                </span>
              </label>
            </div>

            {localVideoUrl && (
              <div
                className="relative w-full rounded-xl overflow-hidden bg-gray-900 shadow-md"
                style={{ paddingBottom: "56.25%" }}
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  src={localVideoUrl}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                YouTube Video Link
              </label>
              <div className="relative">
                <Link
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                />
                <input
                  type="url"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setPlaying(false);
                  }}
                  disabled={!canReplace && !!videoData}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all disabled:opacity-40"
                />
              </div>
            </div>

            {input && (
              <button
                onClick={() => {
                  setPreview(!preview);
                  setPlaying(false);
                }}
                className="h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 text-sm font-bold hover:border-amber-300 transition-all flex items-center gap-1.5"
              >
                <Eye size={13} /> {preview ? "Hide Preview" : "Preview"}
              </button>
            )}

            {preview && input && (
              <div
                className="relative w-full rounded-xl overflow-hidden bg-gray-900 shadow-md"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${getEmbedUrl(input)}?rel=0&modestbranding=1`}
                  title="Video preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={
            (!canReplace && !!videoData) ||
            (mode === "youtube" ? !input.trim() : !selectedFile || !localVideoUrl)
          }
          className="w-full h-10 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Save size={13} /> Save Video
        </button>
      </div>
    </div>
  );
}

// ─── Chat Window ──────────────────────────────────────────────────────────────
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
      <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
        >
          <ArrowLeft size={15} className="text-gray-600 dark:text-gray-300" />
        </button>
        <AvatarBubble initials={inquiry.avatar} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-extrabold text-gray-900 dark:text-white">{inquiry.customer}</p>
          <p className="text-[11px] text-amber-600 dark:text-amber-300 font-semibold">
            {inquiry.service} · {inquiry.location}
          </p>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            showInfo
              ? "bg-amber-100 dark:bg-amber-950/40"
              : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <User
            size={14}
            className={showInfo ? "text-amber-600 dark:text-amber-300" : "text-gray-500 dark:text-gray-300"}
          />
        </button>
      </div>

      {showInfo && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900 px-4 py-3 space-y-1.5 shrink-0">
          <p className="text-[10px] font-bold text-amber-600 dark:text-amber-300 uppercase tracking-wider mb-2">
            Customer Info
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-200">
            <Mail size={11} className="text-amber-500 shrink-0" />
            <span>{inquiry.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-200">
            <Phone size={11} className="text-amber-500 shrink-0" />
            <span>{inquiry.phone}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <a
              href={`mailto:${inquiry.email}`}
              className="flex-1 h-7 rounded-lg bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 hover:opacity-90"
            >
              <Mail size={10} /> Email
            </a>
            <a
              href={`tel:${inquiry.phone}`}
              className="flex-1 h-7 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-amber-100 dark:hover:bg-amber-950/30"
            >
              <Phone size={10} /> Call
            </a>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8F7F4] dark:bg-gray-950">
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium px-2">
            Conversation
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        {inquiry.messages.map((msg) => {
          const isMe = msg.sender === "professional";
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1 ${
                  isMe
                    ? "bg-gradient-to-br from-gray-700 to-gray-600"
                    : "bg-gradient-to-br from-amber-500 to-amber-400"
                }`}
              >
                {isMe ? "JD" : inquiry.avatar}
              </div>
              <div className={`max-w-[75%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-gradient-to-br from-amber-500 to-amber-400 text-white rounded-tr-sm"
                      : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-100 shadow-sm rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-amber-400 focus-within:bg-white dark:focus-within:bg-gray-900 transition-all px-4 py-2.5 min-h-[44px] flex items-center">
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
              className="flex-1 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none resize-none"
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
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 text-center">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

// ─── INBOX TAB ────────────────────────────────────────────────────────────────
function InboxTab({ plan }: { plan: Plan }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeInquiry = inquiries.find((i) => i.id === activeId) ?? null;
  const unread = inquiries.filter((i) => !i.read).length;

  const monthlyLimit = plan === "free" ? 3 : null;
  const visibleInquiries = monthlyLimit ? inquiries.slice(0, monthlyLimit) : inquiries;
  const usedCount = plan === "free" ? Math.min(inquiries.length, 3) : inquiries.length;

  function openChat(inq: Inquiry) {
    setInquiries((prev) =>
      prev.map((i) => (i.id === inq.id ? { ...i, read: true } : i))
    );
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
              messages: [
                ...inq.messages,
                {
                  id: inq.messages.length + 1,
                  sender: "professional",
                  text,
                  time: timeStr,
                },
              ],
            }
      )
    );
  }

  if (activeInquiry) {
    return (
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        <div className="hidden md:flex flex-col w-72 shrink-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <p className="text-xs font-extrabold text-gray-700 dark:text-gray-100 uppercase tracking-wider">
              Conversations
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">{unread} unread</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
            {visibleInquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => openChat(inq)}
                className={`w-full text-left px-4 py-3 transition-all hover:bg-amber-50 dark:hover:bg-amber-950/20 ${
                  activeId === inq.id ? "bg-amber-50 dark:bg-amber-950/20 border-l-2 border-amber-500" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AvatarBubble initials={inq.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-xs truncate ${
                          !inq.read
                            ? "font-extrabold text-gray-900 dark:text-white"
                            : "font-semibold text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {inq.customer}
                      </p>
                      {!inq.read && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
                    </div>
                    <p className="text-[10px] text-amber-600 dark:text-amber-300 font-semibold truncate">
                      {inq.service}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                      {inq.messages[inq.messages.length - 1]?.text.slice(0, 35)}...
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col">
          <ChatWindow inquiry={activeInquiry} onBack={() => setActiveId(null)} onSend={handleSend} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
          <Inbox size={17} className="text-amber-600 dark:text-amber-300" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Customer Inquiries</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">{unread} unread · tap to open chat</p>
        </div>
      </div>

      {plan === "free" && (
        <div className="mb-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-600 dark:text-gray-200">Monthly Inquiry Limit</p>
            <span className="text-xs font-bold text-gray-700 dark:text-gray-100">
              {usedCount} / {monthlyLimit} used
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800 mb-3">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all"
              style={{ width: `${(usedCount / (monthlyLimit || 1)) * 100}%` }}
            />
          </div>
          <UpgradeBanner
            currentPlan="free"
            targetPlan="basic"
            message="Get unlimited inquiries — ₱199/mo"
            compact
          />
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
                  inq.read
                    ? "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                    : "border-amber-200 dark:border-amber-700/50 bg-amber-50/50 dark:bg-amber-950/10 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AvatarBubble initials={inq.avatar} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm ${
                            !inq.read
                              ? "font-extrabold text-gray-900 dark:text-white"
                              : "font-semibold text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {inq.customer}
                        </p>
                        {!inq.read && <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />}
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                        {inq.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-800/50">
                        {inq.service}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500">
                        <MapPin size={9} />
                        {inq.location}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">
                      {lastMsg.sender === "professional" ? "You: " : ""}
                      {lastMsg.text}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <MessageSquare
                        size={12}
                        className="text-amber-500 group-hover:text-white transition-colors"
                      />
                    </div>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold">Chat</span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}

        {plan === "free" && inquiries.length > (monthlyLimit || 0) && (
          <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 overflow-hidden">
            <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 gap-2">
              <Lock size={20} className="text-gray-400 dark:text-gray-500" />
              <p className="text-sm font-bold text-gray-600 dark:text-gray-200">Monthly limit reached</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Upgrade to see more inquiries</p>
            </div>
            <div className="opacity-20 pointer-events-none space-y-2">
              {inquiries.slice(monthlyLimit || 0).map((inq) => (
                <div key={inq.id} className="flex items-center gap-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                    <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── JOB DETAIL MODAL ─────────────────────────────────────────────────────────
function JobDetailModal({
  job,
  onClose,
  onMarkDone,
}: {
  job: Job;
  onClose: () => void;
  onMarkDone: (id: number) => void;
}) {
  const [confirmDone, setConfirmDone] = useState(false);
  const s = STATUS_CONFIG[job.status];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] flex flex-col rounded-t-3xl bg-white dark:bg-gray-900 overflow-hidden shadow-2xl md:inset-0 md:m-auto md:max-w-lg md:max-h-[88vh] md:rounded-3xl">
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shrink-0" />
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <CheckSquare size={15} className="text-amber-500" />
            <p className="text-sm font-extrabold text-gray-900 dark:text-white">Job Details</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
              {s.label}
            </span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X size={13} className="text-gray-500 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="flex items-center gap-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 rounded-2xl p-4">
            <AvatarBubble initials={job.avatar} size="lg" />
            <div>
              <p className="text-base font-extrabold text-gray-900 dark:text-white">{job.customer}</p>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-300 mb-1">{job.service}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin size={10} className="text-amber-500" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={10} className="text-amber-500" />
                  {job.date}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Customer Contact
            </p>
            <InfoRow Icon={Mail} label="Gmail" value={job.email} />
            <InfoRow Icon={Phone} label="Contact Number" value={job.phone} />
            <div className="flex gap-2 mt-3">
              <a
                href={`mailto:${job.email}`}
                className="flex-1 h-9 rounded-xl bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"
              >
                <Mail size={12} /> Email
              </a>
              <a
                href={`tel:${job.phone}`}
                className="flex-1 h-9 rounded-xl border border-amber-200 dark:border-amber-700 text-amber-600 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all"
              >
                <Phone size={12} /> Call
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              What They Need
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3.5">
              <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{job.description}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Location & Schedule
            </p>
            <InfoRow Icon={MapPin} label="Full Address" value={job.address} />
            <InfoRow Icon={Clock} label="Preferred Schedule" value={job.preferredSchedule} />
          </div>

          {job.notes && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
              <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Notes
              </p>
              <div className="flex gap-2.5 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900 rounded-xl p-3">
                <AlertCircle size={13} className="text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{job.notes}</p>
              </div>
            </div>
          )}

          {job.status === "in_progress" && !confirmDone && (
            <button
              onClick={() => setConfirmDone(true)}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-amber-200"
            >
              <CheckCircle size={16} /> Mark as Job Done
            </button>
          )}

          {job.status === "in_progress" && confirmDone && (
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4">
              <div className="flex items-start gap-2.5 mb-4">
                <AlertCircle size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-orange-800 dark:text-orange-200 mb-0.5">
                    Confirm Job Completion?
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-300 leading-relaxed">
                    Notification sent to <span className="font-bold">{job.customer}</span>. Jobs Done updates after they confirm.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDone(false)}
                  className="flex-1 h-9 rounded-xl border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-300 text-xs font-bold hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onMarkDone(job.id);
                    onClose();
                  }}
                  className="flex-1 h-9 rounded-xl bg-orange-500 text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
                >
                  Yes, Mark Done
                </button>
              </div>
            </div>
          )}

          {job.status === "awaiting_confirm" && (
            <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4">
              <AlertCircle size={16} className="text-orange-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-orange-800 dark:text-orange-200">
                  Waiting for Customer Confirmation
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-300 mt-0.5">
                  Jobs Done updates once the customer confirms.
                </p>
              </div>
            </div>
          )}

          {job.status === "completed" && (
            <div className="flex items-center gap-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-4">
              <CheckCircle size={16} className="text-green-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-green-800 dark:text-green-200">
                  Job Completed & Confirmed
                </p>
                <p className="text-xs text-green-600 dark:text-green-300 mt-0.5">
                  Counted in your Jobs Done total.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── DASHBOARD TAB ────────────────────────────────────────────────────────────
function DashboardTab({ jobs, plan }: { jobs: Job[]; plan: Plan }) {
  const done = jobs.filter((j) => j.status === "completed").length;
  const active = jobs.filter((j) => j.status === "in_progress").length;
  const awaiting = jobs.filter((j) => j.status === "awaiting_confirm").length;
  const cfg = PLAN_CONFIG[plan];
  const limits = cfg.limits;

  const stats = [
    {
      Icon: CheckCircle,
      val: done,
      label: "Completed",
      color: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950/20",
    },
    {
      Icon: TrendingUp,
      val: active,
      label: "In Progress",
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      Icon: AlertCircle,
      val: awaiting,
      label: "Awaiting",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      Icon: Star,
      val: "4.9",
      label: "Avg Rating",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/20",
    },
  ];

  return (
    <div className="space-y-5">
      {plan === "free" && (
        <Reveal direction="up">
          <div className="rounded-2xl overflow-hidden border-2 border-amber-300 dark:border-amber-700 shadow-lg">
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 p-5 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/10 -translate-y-10 translate-x-10" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="text-white" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                    You are on Free Plan
                  </span>
                </div>
                <p className="text-lg font-extrabold mb-1">
                  Your profile is hidden from most customers!
                </p>
                <p className="text-sm text-white/80">
                  Upgrade now to get full visibility and start getting more jobs.
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 space-y-2">
              {[
                { plan: "basic" as Plan, desc: "Unlimited inquiries + full visibility" },
                { plan: "pro" as Plan, desc: "Featured placement + analytics" },
                { plan: "premium" as Plan, desc: "Top sponsored + video profile" },
              ].map(({ plan: p, desc }) => {
                const c = PLAN_CONFIG[p];
                const Icon = c.Icon;
                return (
                  <button
                    key={p}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl ${c.bg} border ${c.border} hover:opacity-90 transition-all group`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-extrabold ${c.textColor}`}>
                        {c.label} — {c.price}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                    </div>
                    <ChevronRight size={14} className={`${c.textColor} shrink-0`} />
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ Icon, val, label, color, bg }, i) => (
          <Reveal key={label} delay={i * 70} direction="up">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm hover:shadow-md hover:border-amber-100 dark:hover:border-amber-800 transition-all duration-200">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={17} className={color} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{val}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">
                {label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up" delay={80}>
        <SubscriptionCard plan={plan} />
      </Reveal>

      <Reveal direction="up" delay={100}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
            Your Visibility Status
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Inquiries", val: limits.inquiries, ok: plan !== "free" },
              { label: "Position", val: limits.position, ok: plan === "premium" || plan === "pro" },
              { label: "Visibility", val: limits.visibility, ok: plan !== "free" },
            ].map(({ label, val, ok }) => (
              <div
                key={label}
                className={`rounded-xl p-3 border text-center ${
                  ok
                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                }`}
              >
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                    ok ? "text-green-600 dark:text-green-300" : "text-red-500 dark:text-red-300"
                  }`}
                >
                  {label}
                </p>
                <p
                  className={`text-xs font-extrabold ${
                    ok ? "text-green-700 dark:text-green-200" : "text-red-700 dark:text-red-200"
                  }`}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {limits.analytics ? (
        <Reveal direction="up" delay={120}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 shadow-sm">
            <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              Analytics
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Profile Views", val: "248" },
                { label: "Inquiries", val: "12" },
                { label: "Conversion", val: "4.8%" },
              ].map(({ label, val }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-extrabold text-gray-900 dark:text-white">{val}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal direction="up" delay={120}>
          <UpgradeBanner
            currentPlan={plan}
            targetPlan="pro"
            message="Unlock analytics to track your performance"
          />
        </Reveal>
      )}

      {plan === "premium" && (
        <Reveal direction="up" delay={140}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-amber-200 dark:border-amber-700/60 p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-400 flex items-center justify-center shadow-sm shrink-0">
              <Play size={20} className="text-white fill-white ml-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                Introduction Video
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Your video is live and visible to customers on your profile.
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <CheckCircle size={14} className="text-green-500" />
              <span className="text-xs font-bold text-green-600 dark:text-green-300">Live</span>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal direction="up" delay={160}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Recent Jobs
          </p>
          <div className="space-y-3">
            {jobs.slice(0, 3).map((job) => {
              const s = STATUS_CONFIG[job.status];
              return (
                <div key={job.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                  <AvatarBubble initials={job.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 dark:text-white truncate">{job.customer}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {job.service} · {job.date}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                    {s.label}
                  </span>
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

  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);
  const counts = {
    all: jobs.length,
    in_progress: jobs.filter((j) => j.status === "in_progress").length,
    awaiting_confirm: jobs.filter((j) => j.status === "awaiting_confirm").length,
    completed: jobs.filter((j) => j.status === "completed").length,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
          <CheckSquare size={17} className="text-amber-600 dark:text-amber-300" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Job Tracker</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">Click any job to view full details</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {([
          { key: "all", label: `All (${counts.all})` },
          { key: "in_progress", label: `In Progress (${counts.in_progress})` },
          { key: "awaiting_confirm", label: `Awaiting (${counts.awaiting_confirm})` },
          { key: "completed", label: `Done (${counts.completed})` },
        ] as { key: "all" | JobStatus; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`h-8 px-4 rounded-full text-xs font-bold transition-all ${
              filter === key
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300 border border-gray-100 dark:border-gray-800 hover:border-amber-200 dark:hover:border-amber-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((job, i) => {
          const s = STATUS_CONFIG[job.status];
          return (
            <Reveal key={job.id} delay={i * 60} direction="up">
              <button
                onClick={() => setSelectedJob(job)}
                className="w-full text-left bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:border-amber-200 dark:hover:border-amber-700 hover:shadow-lg hover:shadow-amber-50 dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <AvatarBubble initials={job.avatar} size="md" />
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-extrabold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                        {job.customer}
                      </p>
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-300 mb-1.5">
                        {job.service}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {job.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                      {s.label}
                    </span>
                    {job.status === "awaiting_confirm" && (
                      <span className="flex items-center gap-1 text-[11px] text-orange-500 dark:text-orange-300 font-semibold">
                        <AlertCircle size={11} /> Waiting
                      </span>
                    )}
                    {job.status === "completed" && (
                      <span className="flex items-center gap-1 text-[11px] text-green-600 dark:text-green-300 font-semibold">
                        <CheckCircle size={11} /> Confirmed
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 group-hover:text-amber-500 flex items-center gap-1 transition-colors">
                      <Eye size={10} /> View
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center mb-3">
              <CheckSquare size={22} className="text-amber-400" />
            </div>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">No jobs here</p>
          </div>
        )}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onMarkDone={(id) => {
            setJobs((prev) =>
              prev.map((j) => (j.id === id ? { ...j, status: "awaiting_confirm" } : j))
            );
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
}

// ─── PROFILE TAB ─────────────────────────────────────────────────────────────
function ProfileTab({ plan }: { plan: Plan }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [videoData, setVideoData] = useState<SavedVideo | undefined>(
    plan === "premium" ? INITIAL_VIDEO_DATA : undefined
  );
  const [form, setForm] = useState({
    name: "Juan dela Cruz",
    type: "Individual Professional",
    category: "Licensed Plumber",
    bio: "With over 8 years of hands-on experience in residential and commercial plumbing.",
    phone: "+63 912 345 6789",
    email: "juan.delacruz@gmail.com",
    address: "Brgy. Talomo, Davao City",
  });

  const credentials = [
    { label: "TESDA NC II – Plumbing", issuer: "TESDA Davao", year: "2019", verified: true },
    { label: "Business Permit", issuer: "City of Davao", year: "2024", verified: true },
    { label: "Valid Government ID (PhilSys)", issuer: "PSA Philippines", year: "2022", verified: true },
  ];

  const cfg = PLAN_CONFIG[plan];
  const Icon = cfg.Icon;

  return (
    <div className="space-y-5 pb-10">
      {saved && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
          <CheckCircle size={15} className="text-green-500" />
          <p className="text-sm font-bold text-green-700 dark:text-green-200">Profile updated!</p>
        </div>
      )}

      <div className="relative">
        <div className="h-36 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/25 text-white text-[11px] font-bold backdrop-blur-sm">
            <Camera size={11} /> Change Cover
          </button>
        </div>
        <div className="absolute -bottom-8 left-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-900 shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <Wrench size={26} className="text-amber-600" strokeWidth={1.6} />
              </div>
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900 flex items-center justify-center shadow-sm">
              <Camera size={10} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-10 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white">{form.name}</h2>
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-300">
            {form.category} · {form.type}
          </p>
          <div className={`inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full ${cfg.bg} border ${cfg.border}`}>
            <Icon size={11} className={cfg.textColor} />
            <span className={`text-[10px] font-bold ${cfg.textColor}`}>{cfg.label} Plan</span>
          </div>
        </div>

        <button
          onClick={() => {
            if (editing) {
              setSaved(true);
              setTimeout(() => setSaved(false), 3000);
            }
            setEditing(!editing);
          }}
          className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold transition-all shrink-0 ${
            editing
              ? "bg-amber-500 text-white shadow-md"
              : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 hover:border-amber-300 bg-white dark:bg-gray-900"
          }`}
        >
          {editing ? (
            <>
              <Save size={13} /> Save
            </>
          ) : (
            <>
              <Edit3 size={13} /> Edit
            </>
          )}
        </button>
      </div>

      {plan === "free" && (
        <UpgradeBanner
          currentPlan="free"
          targetPlan="basic"
          message="Your profile is hidden — subscribe to go live!"
        />
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm space-y-3.5">
        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Basic Info
        </p>
        {[
          { key: "name", label: "Name", Icon: User },
          { key: "category", label: "Category", Icon: Briefcase },
          { key: "phone", label: "Phone", Icon: Phone },
          { key: "email", label: "Gmail", Icon: Mail },
          { key: "address", label: "Address", Icon: MapPin },
        ].map(({ key, label, Icon }) => (
          <div key={key}>
            <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
              {label}
            </label>
            <div className="relative">
              <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                disabled={!editing}
                className={`w-full h-10 pl-9 pr-3 rounded-xl border text-sm text-gray-800 dark:text-gray-100 transition-all ${
                  editing
                    ? "border-amber-300 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                    : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-default"
                }`}
              />
            </div>
          </div>
        ))}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Bio
          </label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            disabled={!editing}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm text-gray-800 dark:text-gray-100 transition-all resize-none ${
              editing
                ? "border-amber-300 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 cursor-default"
            }`}
          />
        </div>
      </div>

      <VideoManager
        plan={plan}
        videoData={videoData}
        onSave={(video) => setVideoData(video)}
        onRemove={() => setVideoData(undefined)}
      />

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Credentials
          </p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/20">
            <BadgeCheck size={11} className="text-green-500" />
            <span className="text-[10px] font-bold text-green-600 dark:text-green-300">
              Admin Verified
            </span>
          </div>
        </div>

        {credentials.map((c, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
              <FileText size={13} className="text-amber-600 dark:text-amber-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-800 dark:text-white truncate">{c.label}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                {c.issuer} · {c.year}
              </p>
            </div>
            {c.verified && <CheckCircle size={14} className="text-green-500 shrink-0" />}
          </div>
        ))}
      </div>

      {plan !== "premium" && (
        <UpgradeBanner
          currentPlan={plan}
          targetPlan="premium"
          message="Unlock all Premium features for maximum exposure"
        />
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfessionalDashboard() {
  const [mounted, setMounted] = useState(false);
  const [plan] = useState<Plan>(DEMO_PLAN);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeTab, setActiveTab] = useState<"dashboard" | "inbox" | "jobs" | "profile">(
    "dashboard"
  );
  const [showNotif, setShowNotif] = useState(false);
  const [inquiries] = useState(INITIAL_INQUIRIES);
  const unreadInquiries = inquiries.filter((i) => !i.read).length;

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("professional-dashboard-theme") as ThemeMode | null;
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("professional-dashboard-theme", theme);
  }, [theme]);

  const cfg = PLAN_CONFIG[plan];
  const PlanIcon = cfg.Icon;
///
///
  const tabs = useMemo<
    ReadonlyArray<{
      key: "dashboard" | "inbox" | "jobs" | "profile";
      Icon: React.ElementType;
      label: string;
      badge?: number;
    }>
  >(
    () => [
      { key: "dashboard", Icon: Home, label: "Dashboard" },
      { key: "inbox", Icon: Inbox, label: "Inbox", badge: unreadInquiries },
      { key: "jobs", Icon: CheckSquare, label: "Jobs" },
      { key: "profile", Icon: User, label: "Profile" },
    ],
    [unreadInquiries]
  );

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-[#F8F7F4] dark:bg-gray-950 font-[family-name:var(--font-geist-sans)] overflow-x-hidden transition-colors">
        <nav
          className={`fixed top-0 inset-x-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center shadow-sm">
                <MapPin size={15} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-gray-900 dark:text-white tracking-tight">
                Near<span className="text-amber-500">Me</span>
              </span>

              <div className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full ${cfg.badgeBg} border ${cfg.border} ml-1`}>
                <PlanIcon size={10} className={cfg.textColor} />
                <span className={`text-[10px] font-bold ${cfg.textColor} uppercase tracking-wider`}>
                  {cfg.label}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              {tabs.map(({ key, Icon, label, badge }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-bold transition-all duration-200 ${
                    activeTab === key
                      ? "bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-300 shadow-sm"
                      : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                  {badge && badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Toggle theme"
                title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                {theme === "light" ? (
                  <Moon size={16} className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun size={16} className="text-amber-500" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className="relative w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <Bell size={16} className="text-gray-600 dark:text-gray-300" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white dark:border-gray-900" />
                </button>

                {showNotif && (
                  <div className="absolute right-0 top-11 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 z-50">
                    <p className="text-xs font-bold text-gray-700 dark:text-white mb-3 uppercase tracking-wider">
                      Notifications
                    </p>
                    <div className="space-y-3">
                      {[
                        { text: "Maria Santos confirmed your job completion!", time: "5 min ago" },
                        { text: "New inquiry from Grace Flores", time: "10 min ago" },
                      ].map((n, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
                            <Bell size={12} className="text-amber-600 dark:text-amber-300" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-700 dark:text-gray-200 leading-snug">
                              {n.text}
                            </p>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center">
                  <Wrench size={16} className="text-amber-600 dark:text-amber-300" />
                </div>
                <span className="hidden sm:block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Juan
                </span>
              </div>

              <button className="hidden sm:flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 transition-colors font-semibold">
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-5xl mx-auto px-4 pt-20 pb-28">
          <div
            className={`mb-7 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">
              {activeTab === "dashboard" && "Overview"}
              {activeTab === "inbox" && "Messages"}
              {activeTab === "jobs" && "Job Management"}
              {activeTab === "profile" && "Your Profile"}
            </p>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {activeTab === "dashboard" && "Good morning, Juan"}
              {activeTab === "inbox" && "Customer Inquiries"}
              {activeTab === "jobs" && "Track Your Jobs"}
              {activeTab === "profile" && "Manage Your Profile"}
            </h1>
          </div>

          {activeTab === "dashboard" && <DashboardTab jobs={INITIAL_JOBS} plan={plan} />}
          {activeTab === "inbox" && <InboxTab plan={plan} />}
          {activeTab === "jobs" && <JobsTab />}
          {activeTab === "profile" && <ProfileTab plan={plan} />}
        </main>

        <div className="fixed bottom-0 inset-x-0 md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-2 py-2 flex items-center justify-around z-30">
          {tabs.map(({ key, Icon, label, badge }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${
                activeTab === key ? "text-amber-600 dark:text-amber-300" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  activeTab === key ? "bg-amber-50 dark:bg-amber-950/30" : ""
                }`}
              >
                <Icon size={17} />
              </div>
              <span className="text-[10px] font-bold">{label}</span>
              {badge && badge > 0 && (
                <span className="absolute top-0.5 right-3 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}