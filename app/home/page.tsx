"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin, Search, Star, ChevronRight, Bell, LogOut,
  Wrench, Zap, Hammer, Leaf, Paintbrush, SprayCan,
  Monitor, Car, UserCircle, BadgeCheck, Clock,
  TrendingUp, MessageSquare, CheckCircle, Filter,
  SlidersHorizontal, ChevronDown, X, Flame, ArrowRight,
  User, Phone, Mail, FileText, Shield, Award,
  Building2, ImageIcon, Send, ThumbsUp, Calendar,
  ChevronUp, Eye, Home, Inbox, Edit3, Save,
  Crown, Zap as ZapIcon, Play, Lock, Video,
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, direction = "up", className = "" }: {
  children: ReactNode; delay?: number; direction?: "up"|"left"|"right"|"fade"; className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  const hidden = { up:"opacity-0 translate-y-6", left:"opacity-0 -translate-x-6", right:"opacity-0 translate-x-6", fade:"opacity-0" }[direction];
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible?"opacity-100 translate-x-0 translate-y-0":hidden} ${className}`} style={{ transitionDelay:`${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Professional = {
  id: number; name: string; category: string; location: string;
  rating: number; jobs: number; Icon: React.ElementType; badge: boolean;
  featured?: boolean; sponsored?: boolean; plan: "free"|"basic"|"pro"|"premium";
  type: string; bio: string; phone: string; email: string; address: string;
  responseRate: string; memberSince: string; videoUrl?: string;
  accentFrom?: string; accentTo?: string;
  identity: { fullName: string; idType: string; idNumber: string; dob: string };
  credentials: { label: string; issuer: string; year: string; verified: boolean }[];
  reviews: { name: string; rating: number; date: string; comment: string; avatar: string }[];
};
type NavTab = "home"|"search"|"inbox"|"profile";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { Icon: Wrench, label: "Plumbing" }, { Icon: Zap, label: "Electrical" },
  { Icon: Hammer, label: "Carpentry" }, { Icon: Leaf, label: "Landscaping" },
  { Icon: Paintbrush, label: "Painting" }, { Icon: SprayCan, label: "Cleaning" },
  { Icon: Monitor, label: "IT Services" }, { Icon: Car, label: "Auto Repair" },
];
const LOCATIONS = ["Davao City","Tagum","Digos","Panabo","Mati","Samal Island"];

const ALL_PROFESSIONALS: Professional[] = [
  {
    id: 1, name: "Jerome's IT Services", category: "IT Services", location: "Davao City",
    rating: 5.0, jobs: 89, Icon: Monitor, badge: true, featured: true, sponsored: true, plan: "premium",
    type: "Company / Business", accentFrom: "#0ea5e9", accentTo: "#6366f1",
    bio: "Jerome's IT Services is a trusted tech solutions provider based in Davao City. We offer software troubleshooting, network setup, CCTV installation, and computer repair for homes and businesses.",
    phone: "+63 917 123 4567", email: "jerome.itservices@gmail.com", address: "Brgy. Poblacion, Davao City",
    responseRate: "99%", memberSince: "January 2023",
    videoUrl: "https://www.youtube.com/embed/QyhwSYhX09s",
    identity: { fullName: "Jerome P. Alcantara", idType: "PhilSys National ID", idNumber: "•••• •••• 3312", dob: "June 10, 1988" },
    credentials: [
      { label: "DTI Business Registration", issuer: "DTI Davao", year: "2023", verified: true },
      { label: "TESDA NC II – Computer Hardware Servicing", issuer: "TESDA", year: "2020", verified: true },
    ],
    reviews: [
      { name: "Carlo Reyes", rating: 5, date: "Mar 5, 2025", comment: "Fixed my laptop in less than 2 hours. Very professional!", avatar: "CR" },
      { name: "Ana Lim", rating: 5, date: "Feb 18, 2025", comment: "Set up our office network perfectly. Highly recommend!", avatar: "AL" },
    ],
  },
  {
    id: 2, name: "Juan dela Cruz", category: "Plumbing", location: "Tagum",
    rating: 4.9, jobs: 134, Icon: Wrench, badge: true, featured: true, sponsored: true, plan: "premium",
    type: "Individual Professional", accentFrom: "#10b981", accentTo: "#059669",
    bio: "With over 8 years of hands-on experience in residential and commercial plumbing, I specialize in pipe installation, leak repairs, drainage systems, and water heater setup.",
    phone: "+63 912 345 6789", email: "juan.delacruz@gmail.com", address: "Brgy. Talomo, Tagum City",
    responseRate: "97%", memberSince: "March 2023",
    videoUrl: "https://www.youtube.com/embed/5R-jd3USKWs",
    identity: { fullName: "Juan Reyes dela Cruz", idType: "PhilSys National ID", idNumber: "•••• •••• 4821", dob: "March 14, 1990" },
    credentials: [
      { label: "TESDA NC II – Plumbing", issuer: "TESDA Davao", year: "2019", verified: true },
      { label: "Business Permit", issuer: "City of Tagum", year: "2024", verified: true },
    ],
    reviews: [
      { name: "Maria Santos", rating: 5, date: "Feb 28, 2025", comment: "Very professional and fast. Fixed our broken pipe in under an hour!", avatar: "MS" },
      { name: "Rodel Manalo", rating: 5, date: "Jan 5, 2025", comment: "Excellent! He noticed a hidden leak I wasn't even aware of.", avatar: "RM" },
      { name: "Ana Lim", rating: 4, date: "Dec 22, 2024", comment: "Good work overall. A bit late but communicated ahead of time.", avatar: "AL" },
    ],
  },
  {
    id: 3, name: "Clean Pro Services", category: "Cleaning", location: "Davao City",
    rating: 4.8, jobs: 212, Icon: SprayCan, badge: true, featured: true, plan: "pro",
    type: "Company / Business",
    bio: "Clean Pro Services offers premium residential and commercial cleaning solutions in Davao. Our trained team uses eco-friendly products to deliver spotless results every time.",
    phone: "+63 922 987 6543", email: "cleanpro.davao@gmail.com", address: "Brgy. Buhangin, Davao City",
    responseRate: "95%", memberSince: "June 2022",
    identity: { fullName: "Liza M. Fernandez", idType: "Passport", idNumber: "•••• •••• 7714", dob: "August 3, 1985" },
    credentials: [
      { label: "DTI Business Registration", issuer: "DTI Davao", year: "2022", verified: true },
      { label: "Sanitation Safety Certificate", issuer: "Davao City Health Office", year: "2024", verified: true },
    ],
    reviews: [
      { name: "Rina Flores", rating: 5, date: "Mar 10, 2025", comment: "Absolutely spotless! Will book again.", avatar: "RF" },
      { name: "Ben Cruz", rating: 5, date: "Feb 2, 2025", comment: "Team was on time, thorough, and very polite.", avatar: "BC" },
    ],
  },
  {
    id: 4, name: "PowerLine Electrical", category: "Electrical", location: "Davao City",
    rating: 4.9, jobs: 76, Icon: Zap, badge: true, plan: "pro",
    type: "Individual Professional",
    bio: "Licensed electrician with 10 years of experience handling residential wiring, panel upgrades, troubleshooting, and safety inspections.",
    phone: "+63 933 456 7890", email: "powerline.elec@gmail.com", address: "Brgy. Agdao, Davao City",
    responseRate: "96%", memberSince: "April 2023",
    identity: { fullName: "Roberto S. Villanueva", idType: "Driver's License", idNumber: "•••• •••• 2290", dob: "November 22, 1987" },
    credentials: [{ label: "PRC Licensed Electrician", issuer: "Professional Regulation Commission", year: "2018", verified: true }],
    reviews: [{ name: "Tony Guzman", rating: 5, date: "Mar 1, 2025", comment: "Fixed our entire panel. Very knowledgeable and clean work.", avatar: "TG" }],
  },
  {
    id: 5, name: "GreenScape Co.", category: "Landscaping", location: "Digos",
    rating: 4.7, jobs: 55, Icon: Leaf, badge: false, plan: "basic",
    type: "Company / Business",
    bio: "GreenScape Co. transforms outdoor spaces into beautiful, sustainable gardens.",
    phone: "+63 944 321 0987", email: "greenscape.co@gmail.com", address: "Brgy. Zone 1, Digos City",
    responseRate: "90%", memberSince: "September 2023",
    identity: { fullName: "Paolo A. Mendoza", idType: "PhilSys National ID", idNumber: "•••• •••• 6634", dob: "April 5, 1992" },
    credentials: [{ label: "DTI Business Registration", issuer: "DTI Davao del Sur", year: "2023", verified: false }],
    reviews: [{ name: "Grace Reyes", rating: 5, date: "Feb 20, 2025", comment: "Transformed our garden beautifully!", avatar: "GR" }],
  },
  {
    id: 6, name: "BuildRight Carpentry", category: "Carpentry", location: "Panabo",
    rating: 4.8, jobs: 98, Icon: Hammer, badge: true, plan: "basic",
    type: "Individual Professional",
    bio: "Skilled carpenter offering custom furniture, cabinet making, door and window framing, and general woodwork. 12 years of experience.",
    phone: "+63 955 654 3210", email: "buildright.carp@gmail.com", address: "Brgy. New Visayas, Panabo City",
    responseRate: "93%", memberSince: "July 2022",
    identity: { fullName: "Danilo F. Bautista", idType: "PhilSys National ID", idNumber: "•••• •••• 9901", dob: "January 30, 1983" },
    credentials: [
      { label: "TESDA NC II – Carpentry", issuer: "TESDA Davao del Norte", year: "2017", verified: true },
      { label: "Business Permit", issuer: "City of Panabo", year: "2024", verified: true },
    ],
    reviews: [{ name: "Lito Herrera", rating: 5, date: "Mar 8, 2025", comment: "Built our kitchen cabinets perfectly.", avatar: "LH" }],
  },
  {
    id: 7, name: "Grace Flores Plumbing", category: "Plumbing", location: "Davao City",
    rating: 4.3, jobs: 12, Icon: Wrench, badge: true, plan: "free",
    type: "Individual Professional",
    bio: "Licensed plumber offering residential plumbing services in Davao City. 5 years experience.",
    phone: "+63 955 123 4567", email: "grace@gmail.com", address: "Brgy. Matina, Davao City",
    responseRate: "85%", memberSince: "March 2025",
    identity: { fullName: "Grace A. Flores", idType: "PhilSys National ID", idNumber: "•••• •••• 1122", dob: "July 12, 1995" },
    credentials: [{ label: "TESDA NC II – Plumbing", issuer: "TESDA Davao", year: "2020", verified: true }],
    reviews: [{ name: "Noel Cruz", rating: 4, date: "Mar 15, 2025", comment: "Good work, fixed our bathroom pipe quickly.", avatar: "NC" }],
  },
];

const SPONSORED = ALL_PROFESSIONALS.filter(p => p.sponsored);
const RECENT_SEARCHES = [
  { category: "Plumbing", location: "Davao City", time: "2 hours ago" },
  { category: "IT Services", location: "Tagum", time: "Yesterday" },
  { category: "Cleaning", location: "Davao City", time: "3 days ago" },
];
const INBOX_MESSAGES = [
  { id: 1, from: "Juan dela Cruz", category: "Plumbing", message: "Your pipe repair inquiry has been received. I'm available this Saturday morning. Please confirm.", time: "10 min ago", read: false, avatar: "JD" },
  { id: 2, from: "Clean Pro Services", category: "Cleaning", message: "Thank you for your inquiry! We can schedule a deep clean this weekend. Our rate is ₱800/room.", time: "2 hrs ago", read: false, avatar: "CP" },
  { id: 3, from: "PowerLine Electrical", category: "Electrical", message: "Hi! I reviewed your concern about the panel upgrade. I can visit for a free assessment anytime weekdays.", time: "Yesterday", read: true, avatar: "PE" },
];
const PLAN_BADGE: Record<string, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  premium: { label: "Sponsored", color: "text-amber-700", bg: "bg-amber-100", Icon: Crown },
  pro:     { label: "Featured",  color: "text-violet-700", bg: "bg-violet-100", Icon: ZapIcon },
  basic:   { label: "Verified",  color: "text-sky-700",    bg: "bg-sky-100",    Icon: BadgeCheck },
  free:    { label: "Free",      color: "text-gray-500",   bg: "bg-gray-100",   Icon: User },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  .nh-root { font-family: 'Plus Jakarta Sans', sans-serif; }
  .nh-scrollbar-none::-webkit-scrollbar { display: none; }
  .nh-scrollbar-none { -ms-overflow-style:none; scrollbar-width:none; }
  .nh-section-title { font-size:11px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; color:#6b7280; }
  @keyframes nh-card-hover { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
  .nh-lift { transition: transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s ease; }
  .nh-lift:hover { transform: translateY(-3px); }
`;

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i<=Math.round(rating)?"text-amber-400 fill-amber-400":"text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

// ─── VIDEO SECTION (modal) ────────────────────────────────────────────────────
function VideoSection({ pro }: { pro: Professional }) {
  const [playing, setPlaying] = useState(false);
  if (pro.plan === "premium" && pro.videoUrl) {
    return (
      <div className="px-5 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
            <div className="w-3 h-3 bg-red-500 rounded-sm flex items-center justify-center"><Play size={7} className="text-white fill-white ml-0.5" /></div>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Introduction Video</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 border border-amber-200">
            <Crown size={9} className="text-amber-600" /><span className="text-[9px] font-bold text-amber-700">Premium</span>
          </div>
        </div>
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200" style={{ paddingBottom:"56.25%" }}>
          {!playing ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group" onClick={() => setPlaying(true)}
              style={{ background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)" }}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
              <div className="absolute top-3 left-4"><p className="text-white/40 text-[10px] font-semibold">{pro.name}</p></div>
              <div className="relative group-hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-amber-500/80 transition-all duration-300">
                  <Play size={26} className="text-white fill-white ml-1" />
                </div>
                <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-30" />
              </div>
              <div className="mt-4 text-center px-6">
                <p className="text-white font-bold text-sm">{pro.name}</p>
                <p className="text-white/50 text-xs mt-0.5">Tap to watch introduction</p>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                <div className="w-3.5 h-3.5 bg-red-500 rounded-sm flex items-center justify-center shrink-0"><Play size={8} className="text-white fill-white ml-0.5" /></div>
                <span className="text-[9px] font-bold text-white/80">YouTube</span>
              </div>
            </div>
          ) : (
            <iframe className="absolute inset-0 w-full h-full"
              src={`${pro.videoUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={`${pro.name} intro`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          )}
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">Video introduction · <span className="text-amber-600 font-semibold">Premium feature</span></p>
      </div>
    );
  }
  if (pro.plan === "premium" && !pro.videoUrl) {
    return (
      <div className="px-5 mb-3">
        <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 p-5 flex flex-col items-center text-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"><Video size={18} className="text-amber-600" /></div>
          <p className="text-xs font-bold text-amber-700">No video uploaded yet</p>
        </div>
      </div>
    );
  }
  return (
    <div className="px-5 mb-3">
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200" style={{ paddingBottom:"38%" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-300/60 flex items-center justify-center"><Lock size={16} className="text-gray-500" /></div>
          <div className="text-center px-6">
            <p className="text-xs font-extrabold text-gray-600 mb-0.5">Video Introduction</p>
            <p className="text-[10px] text-gray-400">Available for <span className="font-bold text-amber-600">Premium</span> only</p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 mt-1"><Crown size={10} className="text-white" /><span className="text-[10px] font-bold text-white">Upgrade to Premium</span></div>
        </div>
      </div>
    </div>
  );
}

// ─── Credential card ──────────────────────────────────────────────────────────
function CredentialCard({ label, issuer, year, verified }: { label: string; issuer: string; year: string; verified: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 p-3.5 text-left">
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm"><FileText size={14} className="text-amber-600" /></div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-800 truncate">{label}</p>
          <p className="text-[11px] text-gray-400">{issuer} · {year}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {verified && <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50"><BadgeCheck size={10} className="text-green-500" /><span className="text-[10px] font-bold text-green-600">Verified</span></div>}
          {expanded ? <ChevronUp size={13} className="text-gray-400" /> : <ChevronDown size={13} className="text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="px-3.5 pb-3.5 border-t border-gray-100">
          <div className="mt-3 rounded-lg bg-white border border-dashed border-gray-200 p-4 flex flex-col items-center gap-2">
            <ImageIcon size={18} className="text-gray-300" />
            <p className="text-xs text-gray-400 text-center">Document verified by NearMe admin.<br />Original on file.</p>
            <button className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700"><Eye size={11} /> Request to view</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Inquiry form ─────────────────────────────────────────────────────────────
function InquiryForm({ name }: { name: string }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3"><CheckCircle size={28} className="text-green-500" /></div>
        <p className="text-sm font-extrabold text-gray-900 mb-1">Inquiry Sent!</p>
        <p className="text-xs text-gray-400 max-w-xs">Sent to <span className="font-semibold text-gray-700">{name}</span>. They'll contact you via email or phone.</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-xs font-bold text-amber-600 hover:underline">Send another</button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {[
        { key:"name", label:"Your Full Name", placeholder:"e.g. Maria Santos", Icon:User, type:"text" },
        { key:"email", label:"Gmail Address", placeholder:"you@gmail.com", Icon:Mail, type:"email" },
        { key:"phone", label:"Contact Number", placeholder:"+63 9XX XXX XXXX", Icon:Phone, type:"tel" },
      ].map(({ key, label, placeholder, Icon, type }) => (
        <div key={key}>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
          <div className="relative">
            <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" />
          </div>
        </div>
      ))}
      <div>
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Message</label>
        <textarea rows={3} placeholder="Describe what you need, your location, and preferred schedule..."
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none" />
      </div>
      <button onClick={() => { if (form.name && form.email && form.phone && form.message) setSubmitted(true); }}
        className="w-full h-10 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2">
        <Send size={13} /> Send Inquiry
      </button>
    </div>
  );
}

// ─── Professional Modal ───────────────────────────────────────────────────────
function ProfessionalModal({ pro, onClose }: { pro: Professional; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"about"|"credentials"|"reviews"|"inquiry">("about");
  const avgRating = pro.reviews.reduce((a,r) => a + r.rating, 0) / pro.reviews.length;
  const planBadge = PLAN_BADGE[pro.plan];
  const isPremium = pro.plan === "premium";
  const accent = pro.accentFrom || "#f59e0b";

  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[94vh] flex flex-col rounded-t-3xl bg-white overflow-hidden shadow-2xl md:inset-0 md:m-auto md:max-w-2xl md:max-h-[92vh] md:rounded-3xl">
        <div className="relative h-28 shrink-0" style={{ background:`linear-gradient(135deg,${accent},${pro.accentTo||accent})` }}>
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/30 md:hidden" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors"><X size={14} className="text-white" /></button>
          <div className={`absolute bottom-3 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${planBadge.bg}`}>
            <planBadge.Icon size={11} className={planBadge.color} /><span className={`text-[10px] font-bold ${planBadge.color}`}>{planBadge.label}</span>
          </div>
          {isPremium && pro.videoUrl && (
            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-500/90">
              <Play size={8} className="text-white fill-white" /><span className="text-[9px] font-bold text-white uppercase tracking-wide">Has Video</span>
            </div>
          )}
        </div>
        <div className="px-5 pt-0 pb-3 shrink-0">
          <div className="flex items-end justify-between -mt-9 mb-3">
            <div className="relative">
              <div className="w-[72px] h-[72px] rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-xl flex items-center justify-center" style={{ background:`linear-gradient(135deg,${accent}22,${accent}44)` }}>
                  <pro.Icon size={26} style={{ color:accent }} strokeWidth={1.6} />
                </div>
              </div>
              {pro.badge && <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-sm"><BadgeCheck size={12} className="text-white" /></div>}
            </div>
            <button onClick={() => setActiveTab("inquiry")} className="flex items-center gap-1.5 h-9 px-4 rounded-xl text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-md"
              style={{ background:`linear-gradient(135deg,${accent},${pro.accentTo||accent})`, boxShadow:`0 4px 16px ${accent}44` }}>
              <MessageSquare size={13} /> Inquire
            </button>
          </div>
          <h2 className="text-base font-extrabold text-gray-900 tracking-tight">{pro.name}</h2>
          <p className="text-xs font-semibold mb-1" style={{ color:accent }}>{pro.category}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1"><MapPin size={10} className="text-gray-400" /><span className="text-xs text-gray-400">{pro.location}</span></div>
            <div className="flex items-center gap-1"><Stars rating={pro.rating} size={10} /><span className="text-xs font-bold text-gray-700">{pro.rating.toFixed(1)}</span></div>
            <div className="flex items-center gap-1"><CheckCircle size={10} className="text-green-500" /><span className="text-xs text-gray-500">{pro.jobs} jobs</span></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 px-5 pb-3 shrink-0">
          {[
            { label:"Rating", val:pro.rating.toFixed(1), Icon:Star, color:"text-amber-500" },
            { label:"Jobs Done", val:pro.jobs, Icon:CheckCircle, color:"text-green-500" },
            { label:"Response", val:pro.responseRate, Icon:TrendingUp, color:"text-blue-500" },
          ].map(({ label, val, Icon, color }) => (
            <div key={label} className="flex flex-col items-center py-2 rounded-xl bg-gray-50 border border-gray-100">
              <Icon size={13} className={`${color} mb-0.5`} />
              <p className="text-sm font-extrabold text-gray-900">{val}</p>
              <p className="text-[9px] text-gray-400">{label}</p>
            </div>
          ))}
        </div>
        <VideoSection pro={pro} />
        <div className="flex gap-1 px-5 pb-3 shrink-0">
          {(["about","credentials","reviews","inquiry"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 h-8 rounded-lg text-[10px] font-bold capitalize transition-all duration-200 ${activeTab===tab?"text-white shadow-sm":"text-gray-400 bg-gray-100 hover:text-gray-700"}`}
              style={activeTab===tab ? { background:`linear-gradient(135deg,${accent},${pro.accentTo||accent})` } : {}}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {activeTab === "about" && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">About</p>
                <p className="text-sm text-gray-600 leading-relaxed">{pro.bio}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Identity Details</p>
                <div className="space-y-2">
                  {[{label:"Full Name",value:pro.identity.fullName},{label:"ID Type",value:pro.identity.idType},{label:"ID Number",value:pro.identity.idNumber},{label:"Date of Birth",value:pro.identity.dob}].map(({label,value})=>(
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                      <span className="text-xs text-gray-400">{label}</span><span className="text-xs font-bold text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100"><BadgeCheck size={13} className="text-green-500" /><span className="text-[11px] font-bold text-green-600">Admin Verified Identity</span></div>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contact & Business Info</p>
                <div className="space-y-2.5">
                  {[{Icon:Phone,label:"Phone",value:pro.phone},{Icon:Mail,label:"Email",value:pro.email},{Icon:MapPin,label:"Address",value:pro.address},{Icon:Building2,label:"Type",value:pro.type},{Icon:Clock,label:"Member Since",value:pro.memberSince}].map(({Icon,label,value})=>(
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center border border-gray-100 shrink-0"><Icon size={12} className="text-amber-500" /></div>
                      <div className="flex-1 flex justify-between min-w-0"><span className="text-xs text-gray-400 shrink-0">{label}</span><span className="text-xs font-bold text-gray-700 text-right truncate ml-2">{value}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "credentials" && (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200"><Shield size={14} className="text-amber-600 shrink-0 mt-0.5" /><p className="text-xs text-amber-700 leading-relaxed">All documents reviewed and verified by the NearMe admin team.</p></div>
              {pro.credentials.map((c,i) => <CredentialCard key={i} {...c} />)}
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3"><Award size={14} className="text-amber-500" /><p className="text-xs font-bold text-gray-700">Verification Summary</p></div>
                {[{label:"Identity Check",status:"Passed"},{label:"Document Review",status:"Passed"},{label:"Admin Approval",status:"Approved"},{label:"Subscription Status",status:"Active"}].map(({label,status})=>(
                  <div key={label} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-xs text-gray-500">{label}</span>
                    <div className="flex items-center gap-1"><CheckCircle size={11} className="text-green-500" /><span className="text-xs font-bold text-green-600">{status}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-4">
                <div className="text-center shrink-0">
                  <p className="text-4xl font-extrabold text-gray-900">{avgRating.toFixed(1)}</p>
                  <Stars rating={avgRating} size={13} />
                  <p className="text-[11px] text-gray-400 mt-1">{pro.reviews.length} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(star => {
                    const count = pro.reviews.filter(r => r.rating===star).length;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 w-2">{star}</span>
                        <Star size={9} className="text-amber-400 fill-amber-400 shrink-0" />
                        <div className="flex-1 h-1.5 rounded-full bg-gray-200"><div className="h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width:`${(count/pro.reviews.length)*100}%` }} /></div>
                        <span className="text-[10px] text-gray-400 w-2">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {pro.reviews.map((rev,i) => (
                <div key={i} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white text-[11px] font-bold shrink-0">{rev.avatar}</div>
                      <div><p className="text-xs font-bold text-gray-800">{rev.name}</p><Stars rating={rev.rating} size={10} /></div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400"><Calendar size={10} />{rev.date}</div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{rev.comment}</p>
                  <button className="mt-2 flex items-center gap-1 text-[11px] text-gray-400 hover:text-amber-600 font-medium"><ThumbsUp size={10} /> Helpful</button>
                </div>
              ))}
            </div>
          )}
          {activeTab === "inquiry" && (
            <div>
              <div className="flex items-center gap-2 mb-4"><MessageSquare size={15} className="text-amber-500" /><p className="text-sm font-bold text-gray-800">Send Inquiry to {pro.name.split(" ")[0]}</p></div>
              <InquiryForm name={pro.name} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── PREMIUM CARD with autoplay video background ──────────────────────────────
function PremiumCard({ pro, onView }: { pro: Professional; onView: () => void }) {
  const from = pro.accentFrom || "#f59e0b";
  const to   = pro.accentTo   || "#d97706";
  const hasVideo = !!pro.videoUrl;
  const [mounted, setMounted] = useState(false);

  // Extract YouTube video ID for thumbnail + embed
  const ytId = pro.videoUrl
    ? pro.videoUrl.replace("https://www.youtube.com/embed/","").split("?")[0]
    : null;

  // Build iframe src with all required autoplay params
  const iframeSrc = hasVideo && ytId 
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&rel=0&playsinline=1&modestbranding=1&showinfo=0&fs=0`
    : "";

  // Only render iframe after client-side mount to trigger autoplay
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      onClick={onView}
      className="nh-lift relative w-full rounded-3xl cursor-pointer overflow-hidden"
      style={{ boxShadow:`0 20px 60px ${from}35, 0 4px 16px rgba(0,0,0,.1)` }}
    >
      {/* ── VIDEO / THUMBNAIL BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        {hasVideo && ytId && iframeSrc && mounted ? (
          <>
            {/* YouTube iframe autoplaying muted as visual background */}
            <iframe
              key={ytId}
              className="absolute w-[177.78%] h-full left-[-38.89%] top-0"
              src={iframeSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder="0"
              style={{ pointerEvents: "none" }}
              title="bg-video"
            />
            {/* Fallback thumbnail in case iframe is blocked */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(https://img.youtube.com/vi/${ytId}/maxresdefault.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </>
        ) : (
          /* Solid gradient fallback if no video */
          <div className="absolute inset-0" style={{ background:`linear-gradient(145deg,${from},${to})` }} />
        )}

        {/* Dark overlay so text is always readable */}
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.62) 100%)" }} />
        {/* Subtle color tint from accent */}
        <div className="absolute inset-0 mix-blend-multiply" style={{ background:`linear-gradient(135deg,${from}99,${to}99)` }} />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10">

        {/* TOP BADGES */}
        <div className="flex items-center justify-between px-4 pt-4 pb-0">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md"
              style={{ background:"rgba(0,0,0,0.35)", border:"1px solid rgba(255,255,255,0.2)" }}>
              <Crown size={10} className="text-yellow-300" />
              <span className="text-[10px] font-extrabold text-yellow-100 uppercase tracking-widest">Premium · Sponsored</span>
            </div>
            {hasVideo && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md"
                style={{ background:"rgba(239,68,68,0.8)", border:"1px solid rgba(255,255,255,0.2)" }}>
                <Play size={8} className="text-white fill-white" />
                <span className="text-[9px] font-bold text-white uppercase">Video</span>
              </div>
            )}
          </div>
          {pro.badge && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md"
              style={{ background:"rgba(16,185,129,0.8)", border:"1px solid rgba(255,255,255,0.2)" }}>
              <BadgeCheck size={10} className="text-white" />
              <span className="text-[9px] font-bold text-white">Verified</span>
            </div>
          )}
        </div>

        {/* PROFILE ROW */}
        <div className="flex items-start gap-3.5 px-4 pt-4 pb-0">
          <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-lg"
            style={{ background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.3)", backdropFilter:"blur(10px)" }}>
            <pro.Icon size={24} className="text-white" strokeWidth={1.6} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-[17px] font-extrabold text-white leading-tight tracking-tight truncate">{pro.name}</h3>
            <p className="text-xs font-semibold text-white/70 mt-0.5">{pro.category}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={10} className="text-white/50 shrink-0" />
              <span className="text-[11px] text-white/60">{pro.location}</span>
            </div>
          </div>
        </div>

        {/* STARS + RESPONSE */}
        <div className="flex items-center justify-between px-4 mt-3">
          <div className="flex items-center gap-1.5">
            {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-yellow-300 text-yellow-300" />)}
            <span className="text-sm font-extrabold text-white ml-0.5">{pro.rating.toFixed(1)}</span>
            <span className="text-[11px] text-white/50">({pro.reviews.length} reviews)</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md"
            style={{ background:"rgba(0,0,0,0.25)" }}>
            <Clock size={9} className="text-white/60" />
            <span className="text-[10px] text-white/70 font-medium">{pro.responseRate} response</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-2 px-4 mt-3">
          {[
            { val:`${pro.jobs}+`, label:"Jobs Done" },
            { val:pro.responseRate, label:"Response Rate" },
            { val:pro.memberSince.split(" ")[1]||"2023", label:"Since" },
          ].map(({ val, label }) => (
            <div key={label} className="rounded-xl py-2.5 text-center backdrop-blur-md"
              style={{ background:"rgba(0,0,0,0.28)", border:"1px solid rgba(255,255,255,0.12)" }}>
              <p className="text-[15px] font-extrabold text-white">{val}</p>
              <p className="text-[9px] text-white/50 uppercase tracking-wide mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA BUTTONS */}
        <div className="flex gap-2.5 px-4 pt-4 pb-4">
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onView(); }}
            className="flex-1 h-11 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-105 active:scale-[.97] shadow-lg"
            style={{ background:"rgba(255,255,255,0.96)", color:from }}>
            <MessageSquare size={14} /> Send Inquiry
          </button>
          <button
            type="button"
            className="h-11 px-5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-1.5 transition-all hover:bg-white/25 active:scale-[.97] backdrop-blur-md"
            style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.28)" }}>
            <Eye size={14} /> View
          </button>
        </div>
      </div>

      {/* Bottom edge shine */}
      <div className="absolute bottom-0 left-8 right-8 h-px z-10" style={{ background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)" }} />
    </div>
  );
}

// ─── PRO CARD ─────────────────────────────────────────────────────────────────
function ProCard({ pro, onView }: { pro: Professional; onView: () => void }) {
  return (
    <div onClick={onView}
      className="nh-lift relative group bg-white rounded-2xl cursor-pointer overflow-hidden"
      style={{ border:"1.5px solid #e9d5ff", boxShadow:"0 4px 20px rgba(139,92,246,.08), 0 1px 4px rgba(0,0,0,.04)" }}>
      <div className="h-[3px] w-full" style={{ background:"linear-gradient(90deg,#8b5cf6,#a78bfa,#7c3aed)" }} />
      <div className="p-4 pt-3.5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#8b5cf6,#7c3aed)" }}>
              <pro.Icon size={18} className="text-white" strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <ZapIcon size={9} className="text-violet-500" />
                <span className="text-[9px] font-extrabold text-violet-600 uppercase tracking-widest">Featured</span>
              </div>
              <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-violet-600 transition-colors truncate max-w-[160px]">{pro.name}</h3>
            </div>
          </div>
          {pro.badge && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-100 shrink-0">
              <BadgeCheck size={10} className="text-green-500" /><span className="text-[9px] font-bold text-green-600">Verified</span>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-1.5">{pro.category}</p>
        <div className="flex items-center gap-1 mb-3"><MapPin size={10} className="text-gray-400 shrink-0" /><span className="text-xs text-gray-400 truncate">{pro.location}</span></div>
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
          <div className="flex items-center gap-1"><Stars rating={pro.rating} size={11} /><span className="text-xs font-bold text-gray-700">{pro.rating.toFixed(1)}</span></div>
          <div className="flex items-center gap-1"><CheckCircle size={10} className="text-gray-400" /><span className="text-xs text-gray-400">{pro.jobs} jobs</span></div>
          <span className="text-xs font-bold text-violet-600 flex items-center gap-1">View<ArrowRight size={10} /></span>
        </div>
      </div>
    </div>
  );
}

// ─── STANDARD CARD ────────────────────────────────────────────────────────────
function StandardCard({ pro, onView }: { pro: Professional; onView: () => void }) {
  return (
    <div onClick={onView}
      className="nh-lift group bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <pro.Icon size={17} className="text-amber-600" strokeWidth={1.8} />
          </div>
          {pro.badge && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 border border-green-100">
              <BadgeCheck size={10} className="text-green-500" /><span className="text-[9px] font-bold text-green-600">Verified</span>
            </div>
          )}
        </div>
        <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-amber-600 transition-colors truncate">{pro.name}</h3>
        <p className="text-xs text-gray-400 mb-1.5">{pro.category}</p>
        <div className="flex items-center gap-1 mb-3"><MapPin size={10} className="text-gray-400 shrink-0" /><span className="text-xs text-gray-400 truncate">{pro.location}</span></div>
        <div className="flex items-center justify-between pt-2.5 border-t border-gray-50">
          <div className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" /><span className="text-xs font-bold text-gray-700">{pro.rating.toFixed(1)}</span></div>
          <div className="flex items-center gap-1"><CheckCircle size={10} className="text-gray-400" /><span className="text-xs text-gray-400">{pro.jobs} jobs</span></div>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:gap-2 transition-all">View<ArrowRight size={10} /></span>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH TAB ───────────────────────────────────────────────────────────────
function SearchTab({ onViewPro }: { onViewPro: (pro: Professional) => void }) {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [locOpen, setLocOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const locRef = useRef<HTMLDivElement>(null);
  const filters = ["All","Plumbing","Electrical","IT Services","Cleaning","Carpentry"];

  useEffect(() => {
    const fn = (e: MouseEvent) => { if (locRef.current && !locRef.current.contains(e.target as Node)) setLocOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const sortOrder = { premium:0, pro:1, basic:2, free:3 } as const;
  const filtered = ALL_PROFESSIONALS
    .filter(a => (filter==="All"||a.category===filter)&&(loc===""||a.location===loc)&&(q===""||a.name.toLowerCase().includes(q.toLowerCase())||a.category.toLowerCase().includes(q.toLowerCase())))
    .sort((a,b) => sortOrder[a.plan]-sortOrder[b.plan]);

  const premiums = filtered.filter(p => p.plan==="premium");
  const pros     = filtered.filter(p => p.plan==="pro");
  const rest     = filtered.filter(p => p.plan!=="premium"&&p.plan!=="pro");

  return (
    <div className="space-y-5">
      <div className="sticky top-16 z-20 -mx-1 px-1 py-2 bg-[#F7F6F3]/95 backdrop-blur-sm">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 h-11 bg-gray-50 rounded-xl px-3 border border-transparent focus-within:border-amber-300 focus-within:bg-white transition-all">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search service or professional..."
              className="flex-1 text-sm bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none" />
            {q && <button onClick={()=>setQ("")}><X size={13} className="text-gray-400" /></button>}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1" ref={locRef}>
              <button onClick={()=>setLocOpen(!locOpen)} className="w-full flex items-center gap-2 h-10 px-3 rounded-xl bg-gray-50 border border-transparent hover:border-amber-300 transition-all text-sm text-gray-600 font-medium">
                <MapPin size={13} className="text-amber-500 shrink-0" /><span className="truncate">{loc||"All Locations"}</span>
                <ChevronDown size={13} className={`text-gray-400 ml-auto shrink-0 transition-transform ${locOpen?"rotate-180":""}`} />
              </button>
              {locOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-[60] py-1 max-h-48 overflow-y-auto">
                  <button onClick={()=>{setLoc("");setLocOpen(false);}} className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50">All Locations</button>
                  {LOCATIONS.map(l=>(
                    <button key={l} onClick={()=>{setLoc(l);setLocOpen(false);}} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 ${loc===l?"text-amber-600 font-semibold bg-amber-50":"text-gray-700"}`}>{l}</button>
                  ))}
                </div>
              )}
            </div>
            <button className="h-10 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-amber-200 flex items-center gap-1.5 shrink-0">
              <Search size={14} /> Search
            </button>
          </div>
        </div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 nh-scrollbar-none">
        {filters.map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={`shrink-0 h-8 px-4 rounded-full text-xs font-bold transition-all ${filter===f?"bg-amber-500 text-white shadow-sm":"bg-white text-gray-500 border border-gray-100 hover:border-amber-200"}`}>{f}</button>
        ))}
      </div>
      <div className="flex items-center gap-1.5"><Filter size={13} className="text-gray-400" /><span className="text-xs text-gray-500 font-medium">{filtered.length} found</span></div>
      {premiums.length>0 && <div className="space-y-4">{premiums.map((p,i)=><Reveal key={p.id} delay={i*60} direction="up"><PremiumCard pro={p} onView={()=>onViewPro(p)} /></Reveal>)}</div>}
      {pros.length>0 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{pros.map((p,i)=><Reveal key={p.id} delay={i*50} direction="up"><ProCard pro={p} onView={()=>onViewPro(p)} /></Reveal>)}</div>}
      {rest.length>0 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{rest.map((p,i)=><Reveal key={p.id} delay={i*50} direction="up"><StandardCard pro={p} onView={()=>onViewPro(p)} /></Reveal>)}</div>}
    </div>
  );
}

// ─── INBOX TAB ────────────────────────────────────────────────────────────────
function InboxTab() {
  const [messages, setMessages] = useState(INBOX_MESSAGES);
  const [selected, setSelected] = useState<typeof INBOX_MESSAGES[0]|null>(null);
  const [reply, setReply] = useState("");
  const unread = messages.filter(m=>!m.read).length;
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center"><Inbox size={16} className="text-amber-600" /></div>
        <div><h2 className="text-sm font-extrabold text-gray-900">Messages</h2><p className="text-xs text-gray-400">{unread} unread</p></div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-2">
          {messages.map(msg=>(
            <button key={msg.id} onClick={()=>{setSelected(msg);setMessages(prev=>prev.map(m=>m.id===msg.id?{...m,read:true}:m));}}
              className={`w-full text-left rounded-2xl border p-3.5 transition-all hover:border-amber-200 ${selected?.id===msg.id?"border-amber-400 bg-amber-50":msg.read?"border-gray-100 bg-white":"border-amber-100 bg-amber-50/40"}`}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white text-[11px] font-bold shrink-0">{msg.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-sm truncate ${!msg.read?"font-extrabold text-gray-900":"font-semibold text-gray-700"}`}>{msg.from}</p>
                    <div className="flex items-center gap-1 shrink-0 ml-1">{!msg.read&&<span className="w-2 h-2 rounded-full bg-amber-500" />}<span className="text-[9px] text-gray-400">{msg.time}</span></div>
                  </div>
                  <p className="text-[10px] font-semibold text-amber-600 mb-0.5">{msg.category}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-snug">{msg.message}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-64">
          {selected ? (
            <>
              <div className="p-3.5 border-b border-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">{selected.avatar}</div>
                <div className="flex-1 min-w-0"><p className="text-sm font-extrabold text-gray-900 truncate">{selected.from}</p><p className="text-[10px] text-amber-600 font-semibold">{selected.category} · {selected.time}</p></div>
                <button onClick={()=>setSelected(null)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"><X size={12} className="text-gray-500" /></button>
              </div>
              <div className="flex-1 p-4">
                <div className="bg-gray-50 rounded-xl p-3 mb-4"><p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p></div>
                <div className="relative">
                  <textarea rows={3} value={reply} onChange={e=>setReply(e.target.value)} placeholder="Type your reply..."
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none" />
                  <button onClick={()=>setReply("")} className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center hover:opacity-90 transition-all"><Send size={13} className="text-white" /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><MessageSquare size={22} className="text-amber-400" /></div>
              <p className="text-sm font-bold text-gray-500 mb-1">Select a message</p>
              <p className="text-xs text-gray-400">Click any message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE TAB ─────────────────────────────────────────────────────────────
function ProfileTab({ onLogout }: { onLogout: () => void }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name:"Maria Santos", email:"maria.santos@gmail.com", phone:"+63 912 888 9999", address:"Brgy. Talomo, Davao City" });
  return (
    <div className="space-y-4 pb-10">
      {saved && <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-green-50 border border-green-200"><CheckCircle size={15} className="text-green-500" /><p className="text-sm font-bold text-green-700">Profile updated!</p></div>}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mb-3 shadow-lg shadow-amber-200"><span className="text-2xl font-extrabold text-white">MS</span></div>
        <h2 className="text-base font-extrabold text-gray-900">{form.name}</h2>
        <p className="text-xs text-gray-400 mb-1">{form.email}</p>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 mt-1"><UserCircle size={12} className="text-amber-500" /><span className="text-[11px] font-bold text-amber-600">Customer Account</span></div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="nh-section-title">Personal Info</p>
          <button onClick={()=>{if(editing){setSaved(true);setTimeout(()=>setSaved(false),3000);}setEditing(!editing);}}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-bold transition-all ${editing?"bg-amber-500 text-white":"border border-gray-200 text-gray-500 hover:border-amber-300"}`}>
            {editing?<><Save size={12}/>Save</>:<><Edit3 size={12}/>Edit</>}
          </button>
        </div>
        <div className="space-y-3.5">
          {[{key:"name",label:"Full Name",Icon:User},{key:"email",label:"Gmail",Icon:Mail},{key:"phone",label:"Contact",Icon:Phone},{key:"address",label:"Address",Icon:MapPin}].map(({key,label,Icon})=>(
            <div key={key}>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
              <div className="relative">
                <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={form[key as keyof typeof form]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} disabled={!editing}
                  className={`w-full h-10 pl-9 pr-3 rounded-xl border text-sm text-gray-800 transition-all ${editing?"border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20":"border-gray-100 bg-gray-50 text-gray-600 cursor-default"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="nh-section-title mb-3">Account</p>
        {[{label:"Notification Settings",Icon:Bell,color:"text-gray-700"},{label:"Privacy & Security",Icon:Shield,color:"text-gray-700"},{label:"Help & Support",Icon:MessageSquare,color:"text-gray-700"},{label:"Sign Out",Icon:LogOut,color:"text-red-500"}].map(({label,Icon,color})=>(
          <button key={label} onClick={label==="Sign Out"?onLogout:undefined} className="w-full flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-xl px-2 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center shrink-0 transition-colors"><Icon size={14} className={color} /></div>
            <span className={`text-sm font-medium ${color}`}>{label}</span>
            <ArrowRight size={13} className="text-gray-300 ml-auto" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CustomerHome() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState<NavTab>("home");
  const [selectedPro, setSelectedPro] = useState<Professional|null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationDrop, setShowLocationDrop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const fn = (e: MouseEvent) => { if (locationRef.current && !locationRef.current.contains(e.target as Node)) setShowLocationDrop(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const unreadCount = INBOX_MESSAGES.filter(m => !m.read).length;
  const filters = ["All","Plumbing","Electrical","IT Services","Cleaning","Carpentry"];
  const sortOrder = { premium:0, pro:1, basic:2, free:3 } as const;

  const allFiltered = ALL_PROFESSIONALS
    .filter(a => (activeFilter==="All"||a.category===activeFilter)&&(selectedLocation===""||a.location===selectedLocation)&&(searchQuery===""||a.name.toLowerCase().includes(searchQuery.toLowerCase())||a.category.toLowerCase().includes(searchQuery.toLowerCase())))
    .sort((a,b) => sortOrder[a.plan]-sortOrder[b.plan]);

  const premiums = allFiltered.filter(p => p.plan==="premium");
  const pros     = allFiltered.filter(p => p.plan==="pro");
  const rest     = allFiltered.filter(p => p.plan!=="premium"&&p.plan!=="pro");

  const navTabs: ReadonlyArray<{ key: NavTab; Icon: React.ElementType; label: string; badge?: number }> = [
    { key:"home", Icon:Home, label:"Home" },
    { key:"search", Icon:Search, label:"Search" },
    { key:"inbox", Icon:Inbox, label:"Inbox", badge:unreadCount },
    { key:"profile", Icon:UserCircle, label:"Profile" },
  ];

  return (
    <div className="nh-root min-h-screen bg-[#F7F6F3] overflow-x-hidden">
      <style>{CSS}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-30 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-700 ${mounted?"opacity-100 translate-y-0":"opacity-0 -translate-y-2"}`}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center shadow-sm"><MapPin size={15} className="text-white" strokeWidth={2.5} /></div>
            <span className="font-extrabold text-gray-900 tracking-tight">Near<span className="text-amber-500">Me</span></span>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {navTabs.map(({ key, Icon, label, badge }) => (
              <button key={key} onClick={() => setActiveNav(key)} className={`relative flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-bold transition-all duration-200 ${activeNav===key?"bg-white text-amber-600 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
                <Icon size={13} />{label}
                {badge&&badge>0&&<span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Bell size={16} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white" />
              </button>
              {showNotif && (
                <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                  <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">Notifications</p>
                  <div className="space-y-3">
                    {[{text:"Juan dela Cruz marked your job as done",time:"10 min ago"},{text:"Your inquiry to PowerLine was seen",time:"1 hr ago"}].map((n,i)=>(
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0"><Bell size={12} className="text-amber-600" /></div>
                        <div><p className="text-xs text-gray-700 leading-snug">{n.text}</p><p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveNav("profile")}>
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center"><UserCircle size={18} className="text-amber-600" /></div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">Maria</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-24">
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}>
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-0.5">
            {activeNav==="home"&&"Good morning"}{activeNav==="search"&&"Explore"}{activeNav==="inbox"&&"Messages"}{activeNav==="profile"&&"Account"}
          </p>
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            {activeNav==="home"&&"What do you need today, Maria?"}{activeNav==="search"&&"Find Professionals"}{activeNav==="inbox"&&"Your Inbox"}{activeNav==="profile"&&"Your Profile"}
          </h1>
        </div>

        {activeNav === "home" && (
          <div className="space-y-8">
            {/* Search */}
            <Reveal direction="up" className="sticky top-16 z-20 -mx-1 px-1 py-2 bg-[#F7F6F3]/95 backdrop-blur-sm">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 h-11 bg-gray-50 rounded-xl px-3 border border-transparent focus-within:border-amber-300 focus-within:bg-white transition-all">
                    <Search size={15} className="text-gray-400 shrink-0" />
                    <input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder='e.g. "Plumber", "IT Services"'
                      className="flex-1 text-sm bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none" />
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1" ref={locationRef}>
                      <button onClick={()=>setShowLocationDrop(!showLocationDrop)} className="w-full flex items-center gap-2 h-10 px-3 rounded-xl bg-gray-50 border border-transparent hover:border-amber-300 transition-all text-sm text-gray-600 font-medium">
                        <MapPin size={13} className="text-amber-500 shrink-0" /><span className="truncate text-sm">{selectedLocation||"All Locations"}</span>
                        <ChevronDown size={13} className={`text-gray-400 ml-auto shrink-0 transition-transform ${showLocationDrop?"rotate-180":""}`} />
                      </button>
                      {showLocationDrop && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-[60] py-1 max-h-48 overflow-y-auto">
                          <button onClick={()=>{setSelectedLocation("");setShowLocationDrop(false);}} className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-50">All Locations</button>
                          {LOCATIONS.map(l=>(
                            <button key={l} onClick={()=>{setSelectedLocation(l);setShowLocationDrop(false);}} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 ${selectedLocation===l?"text-amber-600 font-bold bg-amber-50":"text-gray-700"}`}>{l}</button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button onClick={()=>setActiveNav("search")} className="h-10 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-amber-200 flex items-center gap-1.5 whitespace-nowrap shrink-0">
                      <Search size={14} /> Search
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Recent Searches */}
            <Reveal direction="up" delay={60}>
              <div className="flex items-center gap-2 mb-3"><Clock size={14} className="text-amber-500" /><h2 className="nh-section-title">Recent Searches</h2></div>
              <div className="flex flex-col gap-2">
                {RECENT_SEARCHES.map((r,i)=>(
                  <button key={i} onClick={()=>{setSearchQuery(r.category);setSelectedLocation(r.location);setActiveNav("search");}}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100 hover:border-amber-300 hover:shadow-sm transition-all group text-left">
                    <Search size={13} className="text-gray-400 group-hover:text-amber-500 transition-colors shrink-0" />
                    <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-gray-700 group-hover:text-amber-600 transition-colors truncate">{r.category} in {r.location}</p><p className="text-[10px] text-gray-400">{r.time}</p></div>
                    <ArrowRight size={13} className="text-gray-300 group-hover:text-amber-500 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Categories */}
            <Reveal direction="up" delay={80}>
              <div className="flex items-center gap-2 mb-3"><SlidersHorizontal size={14} className="text-amber-500" /><h2 className="nh-section-title">Browse Categories</h2></div>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.map(({ Icon, label })=>(
                  <button key={label} onClick={()=>{setActiveFilter(label);setActiveNav("search");}}
                    className="flex flex-col items-center gap-2 py-3 px-1 rounded-xl border bg-white border-gray-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 hover:-translate-y-0.5 transition-all duration-200 active:scale-95">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center"><Icon size={16} className="text-amber-600" strokeWidth={1.8} /></div>
                    <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Premium Spotlight */}
            {premiums.length > 0 && (
              <div>
                <Reveal direction="up" delay={100}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md shadow-amber-200/50"
                      style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)" }}>
                      <Crown size={11} className="text-white" />
                      <span className="text-[10px] font-extrabold text-white uppercase tracking-widest">Premium Spotlight</span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-red-50 border border-red-200">
                      <Play size={8} className="text-red-500 fill-red-500" />
                      <span className="text-[9px] font-bold text-red-600 uppercase">Video Autoplay</span>
                    </div>
                    <div className="flex-1 h-px" style={{ background:"linear-gradient(to right,#fcd34d40,transparent)" }} />
                  </div>
                </Reveal>
                <div className="space-y-4">
                  {premiums.map((pro,i)=>(
                    <Reveal key={pro.id} delay={i*80} direction="up">
                      <PremiumCard pro={pro} onView={()=>setSelectedPro(pro)} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Featured */}
            {pros.length > 0 && (
              <div>
                <Reveal direction="up" delay={120}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><Flame size={14} className="text-violet-500" /><h2 className="nh-section-title">Featured Professionals</h2></div>
                    <button onClick={()=>setActiveNav("search")} className="flex items-center gap-1 text-xs text-amber-600 font-semibold hover:text-amber-700 transition-colors">View all<ChevronRight size={11} /></button>
                  </div>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pros.map((pro,i)=>(
                    <Reveal key={pro.id} delay={i*60} direction="up"><ProCard pro={pro} onView={()=>setSelectedPro(pro)} /></Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* All */}
            {rest.length > 0 && (
              <div>
                <Reveal direction="up">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2"><TrendingUp size={14} className="text-amber-500" /><h2 className="nh-section-title">All Professionals</h2></div>
                    <span className="text-xs text-gray-400">{rest.length} listed</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-4 nh-scrollbar-none">
                    {filters.map(f=>(
                      <button key={f} onClick={()=>setActiveFilter(f)} className={`shrink-0 h-8 px-4 rounded-full text-xs font-bold transition-all ${activeFilter===f?"bg-amber-500 text-white shadow-sm":"bg-white text-gray-500 border border-gray-100 hover:border-amber-200"}`}>{f}</button>
                    ))}
                  </div>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {rest.map((pro,i)=>(
                    <Reveal key={pro.id} delay={i*50} direction="up"><StandardCard pro={pro} onView={()=>setSelectedPro(pro)} /></Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeNav==="search"  && <SearchTab onViewPro={setSelectedPro} />}
        {activeNav==="inbox"   && <InboxTab />}
        {activeNav==="profile" && <ProfileTab onLogout={()=>router.push("/")} />}
      </main>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-white/96 backdrop-blur-md border-t border-gray-100 px-2 py-2 flex items-center justify-around z-30">
        {navTabs.map(({ key, Icon, label, badge })=>(
          <button key={key} onClick={()=>setActiveNav(key)} className={`relative flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeNav===key?"text-amber-600":"text-gray-400"}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${activeNav===key?"bg-amber-50":""}`}>
              <Icon size={18} strokeWidth={activeNav===key?2.5:1.8} />
            </div>
            <span className="text-[10px] font-bold">{label}</span>
            {badge&&badge>0&&<span className="absolute top-0.5 right-3 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>}
          </button>
        ))}
      </div>

      {selectedPro && <ProfessionalModal pro={selectedPro} onClose={()=>setSelectedPro(null)} />}
    </div>
  );
}