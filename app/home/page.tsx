"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import {
  MapPin, Search, Star, ChevronRight, Bell, LogOut,
  Wrench, Zap, Hammer, Leaf, Paintbrush, SprayCan,
  Monitor, Car, UserCircle, BadgeCheck, Clock,
  TrendingUp, MessageSquare, CheckCircle, Filter,
  SlidersHorizontal, ChevronDown, X, Flame, ArrowRight,
  User, Phone, Mail, FileText, Shield, Award,
  Building2, ImageIcon, Send, ThumbsUp, Calendar,
  ChevronUp, Eye, Home, Inbox, Edit3, Save,
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
type Professional = {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  jobs: number;
  Icon: React.ElementType;
  badge: boolean;
  featured?: boolean;
  type: string;
  bio: string;
  phone: string;
  email: string;
  address: string;
  responseRate: string;
  memberSince: string;
  identity: { fullName: string; idType: string; idNumber: string; dob: string };
  credentials: { label: string; issuer: string; year: string; verified: boolean }[];
  reviews: { name: string; rating: number; date: string; comment: string; avatar: string }[];
};

type NavTab = "home" | "search" | "inbox" | "profile";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { Icon: Wrench, label: "Plumbing" },
  { Icon: Zap, label: "Electrical" },
  { Icon: Hammer, label: "Carpentry" },
  { Icon: Leaf, label: "Landscaping" },
  { Icon: Paintbrush, label: "Painting" },
  { Icon: SprayCan, label: "Cleaning" },
  { Icon: Monitor, label: "IT Services" },
  { Icon: Car, label: "Auto Repair" },
];

const LOCATIONS = ["Davao City", "Tagum", "Digos", "Panabo", "Mati", "Samal Island"];

const ALL_PROFESSIONALS: Professional[] = [
  {
    id: 1, name: "Jerome's IT Services", category: "IT Services", location: "Davao City",
    rating: 5.0, jobs: 89, Icon: Monitor, badge: true, featured: true, type: "Company / Business",
    bio: "Jerome's IT Services is a trusted tech solutions provider based in Davao City. We offer software troubleshooting, network setup, CCTV installation, and computer repair for homes and businesses.",
    phone: "+63 917 123 4567", email: "jerome.itservices@gmail.com", address: "Brgy. Poblacion, Davao City",
    responseRate: "99%", memberSince: "January 2023",
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
    rating: 4.9, jobs: 134, Icon: Wrench, badge: true, featured: true, type: "Individual Professional",
    bio: "With over 8 years of hands-on experience in residential and commercial plumbing, I specialize in pipe installation, leak repairs, drainage systems, and water heater setup.",
    phone: "+63 912 345 6789", email: "juan.delacruz@gmail.com", address: "Brgy. Talomo, Tagum City",
    responseRate: "97%", memberSince: "March 2023",
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
    rating: 4.8, jobs: 212, Icon: SprayCan, badge: true, featured: true, type: "Company / Business",
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
    rating: 4.9, jobs: 76, Icon: Zap, badge: true, type: "Individual Professional",
    bio: "Licensed electrician with 10 years of experience handling residential wiring, panel upgrades, troubleshooting, and safety inspections.",
    phone: "+63 933 456 7890", email: "powerline.elec@gmail.com", address: "Brgy. Agdao, Davao City",
    responseRate: "96%", memberSince: "April 2023",
    identity: { fullName: "Roberto S. Villanueva", idType: "Driver's License", idNumber: "•••• •••• 2290", dob: "November 22, 1987" },
    credentials: [
      { label: "PRC Licensed Electrician", issuer: "Professional Regulation Commission", year: "2018", verified: true },
    ],
    reviews: [
      { name: "Tony Guzman", rating: 5, date: "Mar 1, 2025", comment: "Fixed our entire panel. Very knowledgeable and clean work.", avatar: "TG" },
    ],
  },
  {
    id: 5, name: "GreenScape Co.", category: "Landscaping", location: "Digos",
    rating: 4.7, jobs: 55, Icon: Leaf, badge: false, type: "Company / Business",
    bio: "GreenScape Co. transforms outdoor spaces into beautiful, sustainable gardens. We handle lawn care, garden design, tree trimming, and irrigation systems.",
    phone: "+63 944 321 0987", email: "greenscape.co@gmail.com", address: "Brgy. Zone 1, Digos City",
    responseRate: "90%", memberSince: "September 2023",
    identity: { fullName: "Paolo A. Mendoza", idType: "PhilSys National ID", idNumber: "•••• •••• 6634", dob: "April 5, 1992" },
    credentials: [{ label: "DTI Business Registration", issuer: "DTI Davao del Sur", year: "2023", verified: false }],
    reviews: [{ name: "Grace Reyes", rating: 5, date: "Feb 20, 2025", comment: "Transformed our garden beautifully!", avatar: "GR" }],
  },
  {
    id: 6, name: "BuildRight Carpentry", category: "Carpentry", location: "Panabo",
    rating: 4.8, jobs: 98, Icon: Hammer, badge: true, type: "Individual Professional",
    bio: "Skilled carpenter offering custom furniture, cabinet making, door and window framing, and general woodwork. 12 years of experience.",
    phone: "+63 955 654 3210", email: "buildright.carp@gmail.com", address: "Brgy. New Visayas, Panabo City",
    responseRate: "93%", memberSince: "July 2022",
    identity: { fullName: "Danilo F. Bautista", idType: "PhilSys National ID", idNumber: "•••• •••• 9901", dob: "January 30, 1983" },
    credentials: [
      { label: "TESDA NC II – Carpentry", issuer: "TESDA Davao del Norte", year: "2017", verified: true },
      { label: "Business Permit", issuer: "City of Panabo", year: "2024", verified: true },
    ],
    reviews: [
      { name: "Lito Herrera", rating: 5, date: "Mar 8, 2025", comment: "Built our kitchen cabinets perfectly.", avatar: "LH" },
    ],
  },
];

const FEATURED = ALL_PROFESSIONALS.filter(p => p.featured);

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

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

// ─── Credential card ──────────────────────────────────────────────────────────
function CredentialCard({ label, issuer, year, verified }: { label: string; issuer: string; year: string; verified: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-3 p-3.5 text-left">
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
          <FileText size={14} className="text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-800 truncate">{label}</p>
          <p className="text-[11px] text-gray-400">{issuer} · {year}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {verified && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50">
              <BadgeCheck size={10} className="text-green-500" />
              <span className="text-[10px] font-bold text-green-600">Verified</span>
            </div>
          )}
          {expanded ? <ChevronUp size={13} className="text-gray-400" /> : <ChevronDown size={13} className="text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="px-3.5 pb-3.5 border-t border-gray-100">
          <div className="mt-3 rounded-lg bg-white border border-dashed border-gray-200 p-4 flex flex-col items-center gap-2">
            <ImageIcon size={18} className="text-gray-300" />
            <p className="text-xs text-gray-400 text-center">Document verified by NearMe admin.<br />Original on file.</p>
            <button className="flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 transition-colors">
              <Eye size={11} /> Request to view
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Inquiry form ─────────────────────────────────────────────────────────────
function InquiryForm({ name }: { name: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <p className="text-sm font-extrabold text-gray-900 mb-1">Inquiry Sent!</p>
        <p className="text-xs text-gray-400 leading-relaxed max-w-xs">Your message has been sent to <span className="font-semibold text-gray-700">{name}</span>. They will contact you via email or phone.</p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-xs font-bold text-amber-600 hover:underline">Send another</button>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {[
        { key: "name", label: "Your Full Name", placeholder: "e.g. Maria Santos", Icon: User, type: "text" },
        { key: "email", label: "Gmail Address", placeholder: "you@gmail.com", Icon: Mail, type: "email" },
        { key: "phone", label: "Contact Number", placeholder: "+63 9XX XXX XXXX", Icon: Phone, type: "tel" },
      ].map(({ key, label, placeholder, Icon, type }) => (
        <div key={key}>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
          <div className="relative">
            <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
          </div>
        </div>
      ))}
      <div>
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Message</label>
        <textarea rows={3} placeholder="Describe what you need, your location, and preferred schedule..."
          value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
        />
      </div>
      <button onClick={() => { if (form.name && form.email && form.phone && form.message) setSubmitted(true); }}
        className="w-full h-10 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-amber-200 flex items-center justify-center gap-2"
      >
        <Send size={13} /> Send Inquiry
      </button>
    </div>
  );
}

// ─── Professional Modal ───────────────────────────────────────────────────────
function ProfessionalModal({ pro, onClose }: { pro: Professional; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"about" | "credentials" | "reviews" | "inquiry">("about");
  const avgRating = pro.reviews.reduce((a, r) => a + r.rating, 0) / pro.reviews.length;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] flex flex-col rounded-t-3xl bg-white overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 md:inset-0 md:m-auto md:max-w-2xl md:max-h-[90vh] md:rounded-3xl">
        <div className="relative h-36 bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 shrink-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/30 md:hidden" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center transition-colors backdrop-blur-sm">
            <X size={14} className="text-white" />
          </button>
        </div>
        <div className="px-6 pt-0 pb-4 shrink-0">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <pro.Icon size={28} className="text-amber-600" strokeWidth={1.6} />
                </div>
              </div>
              {pro.badge && (
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center shadow-sm">
                  <BadgeCheck size={13} className="text-white" />
                </div>
              )}
            </div>
            <button onClick={() => setActiveTab("inquiry")} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-amber-200">
              <MessageSquare size={13} /> Inquire
            </button>
          </div>
          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">{pro.name}</h2>
          <p className="text-xs font-semibold text-amber-600 mb-1">{pro.category}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1"><MapPin size={11} className="text-gray-400" /><span className="text-xs text-gray-400">{pro.location}</span></div>
            <div className="flex items-center gap-1"><Stars rating={pro.rating} size={11} /><span className="text-xs font-bold text-gray-700">{pro.rating.toFixed(1)}</span></div>
            <div className="flex items-center gap-1"><CheckCircle size={11} className="text-green-500" /><span className="text-xs text-gray-500">{pro.jobs} jobs done</span></div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 px-6 pb-4 shrink-0">
          {[
            { label: "Rating", val: pro.rating.toFixed(1), Icon: Star, color: "text-amber-500" },
            { label: "Jobs Done", val: pro.jobs, Icon: CheckCircle, color: "text-green-500" },
            { label: "Response", val: pro.responseRate, Icon: TrendingUp, color: "text-blue-500" },
          ].map(({ label, val, Icon, color }) => (
            <div key={label} className="flex flex-col items-center py-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <Icon size={14} className={`${color} mb-1`} />
              <p className="text-sm font-extrabold text-gray-900">{val}</p>
              <p className="text-[10px] text-gray-400">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-1 px-6 pb-3 shrink-0">
          {(["about", "credentials", "reviews", "inquiry"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 h-8 rounded-lg text-[11px] font-bold capitalize transition-all duration-200 ${activeTab === tab ? "bg-amber-500 text-white shadow-sm" : "text-gray-400 bg-gray-100 hover:text-gray-700"}`}
            >{tab}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          {activeTab === "about" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">About</p>
                <p className="text-sm text-gray-600 leading-relaxed">{pro.bio}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Identity Details</p>
                <div className="space-y-2">
                  {[{ label: "Full Name", value: pro.identity.fullName }, { label: "ID Type", value: pro.identity.idType }, { label: "ID Number", value: pro.identity.idNumber }, { label: "Date of Birth", value: pro.identity.dob }].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                      <span className="text-xs text-gray-400">{label}</span>
                      <span className="text-xs font-bold text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                  <BadgeCheck size={13} className="text-green-500" />
                  <span className="text-[11px] font-bold text-green-600">Admin Verified Identity</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contact & Business Info</p>
                <div className="space-y-2.5">
                  {[{ Icon: Phone, label: "Phone", value: pro.phone }, { Icon: Mail, label: "Email", value: pro.email }, { Icon: MapPin, label: "Address", value: pro.address }, { Icon: Building2, label: "Type", value: pro.type }, { Icon: Clock, label: "Member Since", value: pro.memberSince }].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center border border-gray-100 shrink-0"><Icon size={12} className="text-amber-500" /></div>
                      <div className="flex-1 flex justify-between"><span className="text-xs text-gray-400">{label}</span><span className="text-xs font-bold text-gray-700">{value}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "credentials" && (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <Shield size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">All documents reviewed and verified by the NearMe admin team.</p>
              </div>
              {pro.credentials.map((c, i) => <CredentialCard key={i} {...c} />)}
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-3"><Award size={14} className="text-amber-500" /><p className="text-xs font-bold text-gray-700">Verification Summary</p></div>
                {[{ label: "Identity Check", status: "Passed" }, { label: "Document Review", status: "Passed" }, { label: "Admin Approval", status: "Approved" }, { label: "Subscription Status", status: "Active" }].map(({ label, status }) => (
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
              <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 flex items-center gap-5">
                <div className="text-center shrink-0">
                  <p className="text-4xl font-extrabold text-gray-900">{avgRating.toFixed(1)}</p>
                  <Stars rating={avgRating} size={14} />
                  <p className="text-[11px] text-gray-400 mt-1">{pro.reviews.length} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map(star => {
                    const count = pro.reviews.filter(r => r.rating === star).length;
                    const pct = (count / pro.reviews.length) * 100;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-400 w-2.5">{star}</span>
                        <Star size={9} className="text-amber-400 fill-amber-400 shrink-0" />
                        <div className="flex-1 h-1.5 rounded-full bg-gray-200">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[11px] text-gray-400 w-2.5">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {pro.reviews.map((rev, i) => (
                <div key={i} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white text-[11px] font-bold shrink-0">{rev.avatar}</div>
                      <div><p className="text-xs font-bold text-gray-800">{rev.name}</p><Stars rating={rev.rating} size={10} /></div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400"><Calendar size={10} />{rev.date}</div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{rev.comment}</p>
                  <button className="mt-2 flex items-center gap-1 text-[11px] text-gray-400 hover:text-amber-600 transition-colors font-medium"><ThumbsUp size={10} /> Helpful</button>
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

// ─── Advertiser Card ──────────────────────────────────────────────────────────
function AdvertiserCard({ pro, featured = false, onView }: { pro: Professional; featured?: boolean; onView: () => void }) {
  return (
    <div onClick={onView} className={`group bg-white rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-50 ${featured ? "border-amber-200 shadow-md shadow-amber-100" : "border-gray-100 shadow-sm"}`}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${featured ? "bg-gradient-to-br from-amber-500 to-amber-400" : "bg-amber-50"}`}>
            <pro.Icon size={20} className={featured ? "text-white" : "text-amber-600"} strokeWidth={1.8} />
          </div>
          {pro.badge && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 border border-green-100">
              <BadgeCheck size={11} className="text-green-500" /><span className="text-[10px] font-bold text-green-600">Verified</span>
            </div>
          )}
        </div>
        <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-amber-600 transition-colors">{pro.name}</h3>
        <p className="text-xs text-gray-400 mb-3">{pro.category}</p>
        <div className="flex items-center gap-1 mb-2"><MapPin size={11} className="text-gray-400" /><span className="text-xs text-gray-400">{pro.location}</span></div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400" /><span className="text-xs font-bold text-gray-700">{pro.rating.toFixed(1)}</span></div>
          <div className="flex items-center gap-1"><CheckCircle size={11} className="text-gray-400" /><span className="text-xs text-gray-400">{pro.jobs} jobs</span></div>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:gap-2 transition-all">View <ArrowRight size={11} /></span>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH TAB ───────────────────────────────────────────────────────────────
function SearchTab({ onViewPro }: { onViewPro: (pro: Professional) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationDrop, setShowLocationDrop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Plumbing", "Electrical", "IT Services", "Cleaning", "Carpentry"];
  const filtered = ALL_PROFESSIONALS.filter(a =>
    (activeFilter === "All" || a.category === activeFilter) &&
    (selectedLocation === "" || a.location === selectedLocation) &&
    (searchQuery === "" || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2.5 flex-1 h-11 bg-gray-50 rounded-xl px-4 border border-transparent focus-within:border-amber-300 focus-within:bg-white transition-all">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='e.g. "Plumber", "IT Services"'
              className="flex-1 text-sm bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none" />
            {searchQuery && <button onClick={() => setSearchQuery("")}><X size={13} className="text-gray-400" /></button>}
          </div>
          <div className="relative">
            <button onClick={() => setShowLocationDrop(!showLocationDrop)} className="flex items-center gap-2 h-11 px-4 rounded-xl bg-gray-50 border border-transparent hover:border-amber-300 transition-all text-sm text-gray-600 font-medium whitespace-nowrap">
              <MapPin size={14} className="text-amber-500" />
              {selectedLocation || "Location"}
              <ChevronDown size={13} className={`text-gray-400 transition-transform ${showLocationDrop ? "rotate-180" : ""}`} />
            </button>
            {showLocationDrop && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-1">
                <button onClick={() => { setSelectedLocation(""); setShowLocationDrop(false); }} className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:bg-gray-50">All</button>
                {LOCATIONS.map(l => (
                  <button key={l} onClick={() => { setSelectedLocation(l); setShowLocationDrop(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition-colors ${selectedLocation === l ? "text-amber-600 font-semibold" : "text-gray-700"}`}>{l}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} className={`shrink-0 h-8 px-4 rounded-full text-xs font-bold transition-all ${activeFilter === f ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-100 hover:border-amber-200"}`}>{f}</button>
        ))}
      </div>
      <div className="flex items-center gap-1.5"><Filter size={13} className="text-gray-400" /><span className="text-xs text-gray-500 font-medium">{filtered.length} professionals found</span></div>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pro, i) => (
            <Reveal key={pro.id} delay={i * 50} direction="up">
              <AdvertiserCard pro={pro} onView={() => onViewPro(pro)} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4"><Search size={24} className="text-amber-400" /></div>
          <p className="text-sm font-bold text-gray-600 mb-1">No professionals found</p>
          <button onClick={() => { setSearchQuery(""); setActiveFilter("All"); setSelectedLocation(""); }} className="mt-3 text-xs font-bold text-amber-600 hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  );
}

// ─── INBOX TAB ────────────────────────────────────────────────────────────────
function InboxTab() {
  const [messages, setMessages] = useState(INBOX_MESSAGES);
  const [selected, setSelected] = useState<typeof INBOX_MESSAGES[0] | null>(null);
  const [reply, setReply] = useState("");
  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center"><Inbox size={16} className="text-amber-600" /></div>
        <div>
          <h2 className="text-sm font-extrabold text-gray-900">Messages</h2>
          <p className="text-xs text-gray-400">{unread} unread</p>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {/* List */}
        <div className="md:col-span-2 space-y-2">
          {messages.map(msg => (
            <button key={msg.id} onClick={() => { setSelected(msg); setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m)); }}
              className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 hover:border-amber-200 hover:shadow-sm ${selected?.id === msg.id ? "border-amber-400 bg-amber-50" : msg.read ? "border-gray-100 bg-white" : "border-amber-100 bg-amber-50/40"}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white text-[11px] font-bold shrink-0">{msg.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={`text-sm truncate ${!msg.read ? "font-extrabold text-gray-900" : "font-semibold text-gray-700"}`}>{msg.from}</p>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-semibold text-amber-600 mb-0.5">{msg.category}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">{msg.message}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: 340 }}>
          {selected ? (
            <>
              <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white text-[11px] font-bold shrink-0">{selected.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-extrabold text-gray-900">{selected.from}</p>
                  <p className="text-[11px] text-amber-600 font-semibold">{selected.category} · {selected.time}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"><X size={12} className="text-gray-500" /></button>
              </div>
              <div className="flex-1 p-4">
                <div className="bg-gray-50 rounded-xl p-3.5 mb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.message}</p>
                </div>
                <div className="relative">
                  <textarea rows={3} value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply..."
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 text-sm placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                  />
                  <button onClick={() => setReply("")} className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center hover:opacity-90 transition-all">
                    <Send size={13} className="text-white" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3"><MessageSquare size={22} className="text-amber-400" /></div>
              <p className="text-sm font-bold text-gray-500 mb-1">Select a message</p>
              <p className="text-xs text-gray-400">Click any message to view the full conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE TAB ─────────────────────────────────────────────────────────────
function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "Maria Santos", email: "maria.santos@gmail.com",
    phone: "+63 912 888 9999", address: "Brgy. Talomo, Davao City",
  });
  return (
    <div className="space-y-5 pb-10">
      {saved && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-green-50 border border-green-200 animate-in fade-in duration-300">
          <CheckCircle size={15} className="text-green-500" />
          <p className="text-sm font-bold text-green-700">Profile updated successfully!</p>
        </div>
      )}

      {/* Avatar block */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mb-3 shadow-lg shadow-amber-200">
          <span className="text-2xl font-extrabold text-white">MS</span>
        </div>
        <h2 className="text-base font-extrabold text-gray-900">{form.name}</h2>
        <p className="text-xs text-gray-400 mb-1">{form.email}</p>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 mt-1">
          <UserCircle size={12} className="text-amber-500" />
          <span className="text-[11px] font-bold text-amber-600">Customer Account</span>
        </div>
      </div>

      {/* Editable fields */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Personal Info</p>
          <button
            onClick={() => { if (editing) { setSaved(true); setTimeout(() => setSaved(false), 3000); } setEditing(!editing); }}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-bold transition-all ${editing ? "bg-amber-500 text-white" : "border border-gray-200 text-gray-500 hover:border-amber-300"}`}
          >
            {editing ? <><Save size={12} /> Save</> : <><Edit3 size={12} /> Edit</>}
          </button>
        </div>
        <div className="space-y-3.5">
          {[
            { key: "name", label: "Full Name", Icon: User },
            { key: "email", label: "Gmail", Icon: Mail },
            { key: "phone", label: "Contact Number", Icon: Phone },
            { key: "address", label: "Address", Icon: MapPin },
          ].map(({ key, label, Icon }) => (
            <div key={key}>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
              <div className="relative">
                <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} disabled={!editing}
                  className={`w-full h-10 pl-9 pr-3 rounded-xl border text-sm text-gray-800 transition-all ${editing ? "border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20" : "border-gray-100 bg-gray-50 text-gray-600 cursor-default"}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-1">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Account</p>
        {[
          { label: "Notification Settings", Icon: Bell, color: "text-gray-700" },
          { label: "Privacy & Security", Icon: Shield, color: "text-gray-700" },
          { label: "Help & Support", Icon: MessageSquare, color: "text-gray-700" },
          { label: "Sign Out", Icon: LogOut, color: "text-red-500" },
        ].map(({ label, Icon, color }) => (
          <button key={label} className="w-full flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-xl px-2 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center shrink-0 transition-colors">
              <Icon size={14} className={color} />
            </div>
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
  const [mounted, setMounted] = useState(false);
  const [activeNav, setActiveNav] = useState<NavTab>("home");
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationDrop, setShowLocationDrop] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => { setMounted(true); }, []);

  const unreadCount = INBOX_MESSAGES.filter(m => !m.read).length;
  const filters = ["All", "Plumbing", "Electrical", "IT Services", "Cleaning", "Carpentry"];
  const filteredAdvertisers = ALL_PROFESSIONALS.filter(a =>
    (activeFilter === "All" || a.category === activeFilter) &&
    (selectedLocation === "" || a.location === selectedLocation) &&
    (searchQuery === "" || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const navTabs = [
    { key: "home" as NavTab, Icon: Home, label: "Home" },
    { key: "search" as NavTab, Icon: Search, label: "Search" },
    { key: "inbox" as NavTab, Icon: Inbox, label: "Inbox", badge: unreadCount },
    { key: "profile" as NavTab, Icon: UserCircle, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-[family-name:var(--font-geist-sans)]">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center shadow-sm">
              <MapPin size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-gray-900 tracking-tight">Near<span className="text-amber-500">Me</span></span>
          </div>

          {/* Desktop nav tabs */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {navTabs.map(({ key, Icon, label, badge }) => (
              <button key={key} onClick={() => setActiveNav(key)}
                className={`relative flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-bold transition-all duration-200 ${activeNav === key ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Icon size={13} />{label}
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>
                )}
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
                    {[{ text: "Juan dela Cruz marked your job as done", time: "10 min ago" }, { text: "Your inquiry to PowerLine was seen", time: "1 hr ago" }].map((n, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0"><Bell size={12} className="text-amber-600" /></div>
                        <div><p className="text-xs text-gray-700 leading-snug">{n.text}</p><p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveNav("profile")}>
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center"><UserCircle size={18} className="text-amber-600" /></div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700 group-hover:text-amber-600 transition-colors">Maria</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-28">

        {/* Page title */}
        <div className={`mb-7 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-0.5">
            {activeNav === "home" && "Good morning"}
            {activeNav === "search" && "Explore"}
            {activeNav === "inbox" && "Messages"}
            {activeNav === "profile" && "Account"}
          </p>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {activeNav === "home" && "What do you need today, Maria?"}
            {activeNav === "search" && "Find Professionals"}
            {activeNav === "inbox" && "Your Inbox"}
            {activeNav === "profile" && "Your Profile"}
          </h1>
        </div>

        {/* HOME TAB */}
        {activeNav === "home" && (
          <div className="space-y-10">
            {/* Search card */}
            <Reveal direction="up">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center gap-2.5 flex-1 h-11 bg-gray-50 rounded-xl px-4 border border-transparent focus-within:border-amber-300 focus-within:bg-white transition-all">
                    <Search size={15} className="text-gray-400 shrink-0" />
                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='e.g. "Plumber", "IT Services"'
                      className="flex-1 text-sm bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none" />
                  </div>
                  <div className="relative">
                    <button onClick={() => setShowLocationDrop(!showLocationDrop)} className="flex items-center gap-2 h-11 px-4 rounded-xl bg-gray-50 border border-transparent hover:border-amber-300 transition-all text-sm text-gray-600 font-medium whitespace-nowrap">
                      <MapPin size={14} className="text-amber-500" />{selectedLocation || "Location"}
                      <ChevronDown size={13} className={`text-gray-400 transition-transform ${showLocationDrop ? "rotate-180" : ""}`} />
                    </button>
                    {showLocationDrop && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-1">
                        <button onClick={() => { setSelectedLocation(""); setShowLocationDrop(false); }} className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:bg-gray-50">All</button>
                        {LOCATIONS.map(l => (
                          <button key={l} onClick={() => { setSelectedLocation(l); setShowLocationDrop(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 transition-colors ${selectedLocation === l ? "text-amber-600 font-semibold" : "text-gray-700"}`}>{l}</button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => setActiveNav("search")} className="h-11 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-amber-200 flex items-center gap-2 justify-center">
                    <Search size={15} /> Search
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Recent Searches */}
            <Reveal direction="up" delay={60}>
              <div className="flex items-center gap-2 mb-3"><Clock size={15} className="text-amber-500" /><h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Recent Searches</h2></div>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map((r, i) => (
                  <button key={i} onClick={() => { setSearchQuery(r.category); setSelectedLocation(r.location); setActiveNav("search"); }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-gray-100 hover:border-amber-300 hover:shadow-sm transition-all group">
                    <Search size={13} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
                    <div className="text-left">
                      <p className="text-xs font-semibold text-gray-700 group-hover:text-amber-600 transition-colors">{r.category} in {r.location}</p>
                      <p className="text-[10px] text-gray-400">{r.time}</p>
                    </div>
                    <X size={11} className="text-gray-300 group-hover:text-gray-500 ml-1 transition-colors" />
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Categories */}
            <Reveal direction="up" delay={100}>
              <div className="flex items-center gap-2 mb-3"><SlidersHorizontal size={15} className="text-amber-500" /><h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Browse Categories</h2></div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {CATEGORIES.map(({ Icon, label }) => (
                  <button key={label} onClick={() => { setActiveFilter(label); setActiveNav("search"); }}
                    className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl border bg-white border-gray-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 hover:-translate-y-0.5 transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <Icon size={16} className="text-amber-600" strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Featured */}
            <div>
              <Reveal direction="up" delay={140}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Flame size={15} className="text-amber-500" /><h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Top Rated Professionals</h2></div>
                  <button onClick={() => setActiveNav("search")} className="flex items-center gap-1 text-xs text-amber-600 font-semibold hover:underline">View all <ChevronRight size={12} /></button>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FEATURED.map((pro, i) => (
                  <Reveal key={pro.id} delay={i * 80} direction="up">
                    <AdvertiserCard pro={pro} featured onView={() => setSelectedPro(pro)} />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* All */}
            <div>
              <Reveal direction="up">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><TrendingUp size={15} className="text-amber-500" /><h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">All Professionals</h2></div>
                  <span className="text-xs text-gray-400">{filteredAdvertisers.length} found</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                  {filters.map(f => (
                    <button key={f} onClick={() => setActiveFilter(f)} className={`shrink-0 h-8 px-4 rounded-full text-xs font-bold transition-all ${activeFilter === f ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-100 hover:border-amber-200"}`}>{f}</button>
                  ))}
                </div>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAdvertisers.map((pro, i) => (
                  <Reveal key={pro.id} delay={i * 60} direction="up">
                    <AdvertiserCard pro={pro} onView={() => setSelectedPro(pro)} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeNav === "search"  && <SearchTab onViewPro={setSelectedPro} />}
        {activeNav === "inbox"   && <InboxTab />}
        {activeNav === "profile" && <ProfileTab />}
      </main>

      {/* ── Mobile bottom nav ── */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around z-30">
        {navTabs.map(({ key, Icon, label, badge }) => (
          <button
            key={key}
            onClick={() => setActiveNav(key)}
            className={`relative flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeNav === key ? "text-amber-600" : "text-gray-400"}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${activeNav === key ? "bg-amber-50" : ""}`}>
              <Icon size={18} strokeWidth={activeNav === key ? 2.5 : 1.8} />
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

      {/* Modal */}
      {selectedPro && <ProfessionalModal pro={selectedPro} onClose={() => setSelectedPro(null)} />}
    </div>
  );
}