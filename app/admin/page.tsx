"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import {
  MapPin, Users, CheckCircle, XCircle, Clock,
  BadgeCheck, Bell, LogOut, Shield, FileText,
  TrendingUp, DollarSign, Eye, X, ChevronDown,
  User, Mail, Phone, Building2, AlertCircle,
  Star, Megaphone, Crown, Zap, Check, Ban,
  Search, Filter, Download, RefreshCw,
  BarChart2, Home, Settings, Wrench,
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
type ApprovalStatus = "pending" | "approved" | "rejected";
type SubscriptionPlan = "none" | "basic" | "pro" | "premium";

type Professional = {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  type: string;
  status: ApprovalStatus;
  plan: SubscriptionPlan;
  submittedDate: string;
  avatar: string;
  letterOfIntent: string;
  credentials: { label: string; issuer: string; year: string }[];
  rating: number;
  jobs: number;
};

type AdSlot = {
  id: number;
  professional: string;
  category: string;
  plan: string;
  position: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending";
  avatar: string;
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const PROFESSIONALS: Professional[] = [
  {
    id: 1, name: "Grace Flores", email: "grace@gmail.com", phone: "+63 955 123 4567",
    category: "Plumbing", location: "Davao City", type: "Individual Professional",
    status: "pending", plan: "none", submittedDate: "Mar 20, 2025", avatar: "GF",
    letterOfIntent: "I am a licensed plumber with 5 years of experience in residential and commercial plumbing in Davao City. I want to advertise my services on NearMe to reach more customers and grow my business. I am committed to providing quality and reliable service.",
    credentials: [
      { label: "TESDA NC II – Plumbing", issuer: "TESDA Davao", year: "2020" },
      { label: "Business Permit", issuer: "City of Davao", year: "2024" },
    ],
    rating: 0, jobs: 0,
  },
  {
    id: 2, name: "Ben Tan IT Solutions", email: "ben@gmail.com", phone: "+63 966 234 5678",
    category: "IT Services", location: "Tagum City", type: "Company / Business",
    status: "pending", plan: "none", submittedDate: "Mar 19, 2025", avatar: "BT",
    letterOfIntent: "Ben Tan IT Solutions is a registered IT services company in Tagum City offering computer repair, network setup, and CCTV installation. We want to expand our reach through NearMe platform.",
    credentials: [
      { label: "DTI Business Registration", issuer: "DTI Davao del Norte", year: "2023" },
      { label: "BIR Certificate", issuer: "BIR Region XI", year: "2023" },
    ],
    rating: 0, jobs: 0,
  },
  {
    id: 3, name: "Juan dela Cruz", email: "juan@gmail.com", phone: "+63 912 345 6789",
    category: "Plumbing", location: "Tagum City", type: "Individual Professional",
    status: "approved", plan: "pro", submittedDate: "Mar 1, 2025", avatar: "JD",
    letterOfIntent: "Experienced plumber seeking to grow client base through NearMe.",
    credentials: [
      { label: "TESDA NC II – Plumbing", issuer: "TESDA Davao", year: "2019" },
    ],
    rating: 4.9, jobs: 134,
  },
  {
    id: 4, name: "Clean Pro Services", email: "cleanpro@gmail.com", phone: "+63 922 987 6543",
    category: "Cleaning", location: "Davao City", type: "Company / Business",
    status: "approved", plan: "premium", submittedDate: "Feb 15, 2025", avatar: "CP",
    letterOfIntent: "Professional cleaning company seeking platform exposure.",
    credentials: [
      { label: "DTI Business Registration", issuer: "DTI Davao", year: "2022" },
    ],
    rating: 4.8, jobs: 212,
  },
  {
    id: 5, name: "Fake Services Co.", email: "fake@gmail.com", phone: "+63 999 000 0000",
    category: "Electrical", location: "Davao City", type: "Company / Business",
    status: "rejected", plan: "none", submittedDate: "Mar 10, 2025", avatar: "FS",
    letterOfIntent: "We offer electrical services.",
    credentials: [],
    rating: 0, jobs: 0,
  },
];

const AD_SLOTS: AdSlot[] = [
  { id: 1, professional: "Clean Pro Services", category: "Cleaning", plan: "Premium", position: "Top Banner", startDate: "Mar 1, 2025", endDate: "Mar 31, 2025", status: "active", avatar: "CP" },
  { id: 2, professional: "Juan dela Cruz", category: "Plumbing", plan: "Pro", position: "Featured Card", startDate: "Mar 1, 2025", endDate: "Mar 31, 2025", status: "active", avatar: "JD" },
  { id: 3, professional: "Jerome IT Services", category: "IT Services", plan: "Premium", position: "Top Banner", startDate: "Feb 1, 2025", endDate: "Feb 28, 2025", status: "expired", avatar: "JI" },
  { id: 4, professional: "Ben Tan IT Solutions", category: "IT Services", plan: "Pro", position: "Featured Card", startDate: "Mar 22, 2025", endDate: "Apr 22, 2025", status: "pending", avatar: "BT" },
];

const PLAN_CONFIG: Record<SubscriptionPlan, { label: string; color: string; bg: string; border: string; price: string }> = {
  none:    { label: "No Plan",  color: "text-gray-500",   bg: "bg-gray-50",    border: "border-gray-200",   price: "₱0" },
  basic:   { label: "Basic",    color: "text-blue-600",   bg: "bg-blue-50",    border: "border-blue-200",   price: "₱199/mo" },
  pro:     { label: "Pro",      color: "text-purple-600", bg: "bg-purple-50",  border: "border-purple-200", price: "₱399/mo" },
  premium: { label: "Premium",  color: "text-amber-600",  bg: "bg-amber-50",   border: "border-amber-200",  price: "₱699/mo" },
};

const STATUS_CONFIG: Record<ApprovalStatus, { label: string; color: string; bg: string; border: string; Icon: React.ElementType }> = {
  pending:  { label: "Pending",  color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", Icon: Clock },
  approved: { label: "Approved", color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200",  Icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-red-600",    bg: "bg-red-50",    border: "border-red-200",    Icon: XCircle },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
function AvatarBubble({ initials, size = "md", color = "amber" }: {
  initials: string; size?: "sm" | "md" | "lg"; color?: "amber" | "red" | "green" | "gray";
}) {
  const s = { sm: "w-8 h-8 text-[11px]", md: "w-10 h-10 text-xs", lg: "w-14 h-14 text-base" }[size];
  const c = {
    amber: "from-amber-500 to-amber-400",
    red:   "from-red-500 to-red-400",
    green: "from-green-500 to-green-400",
    gray:  "from-gray-500 to-gray-400",
  }[color];
  return (
    <div className={`${s} rounded-full bg-gradient-to-br ${c} flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

// ─── Professional Detail Modal ────────────────────────────────────────────────
function ProfessionalModal({ pro, onClose, onApprove, onReject }: {
  pro: Professional; onClose: () => void;
  onApprove: (id: number) => void; onReject: (id: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<"details" | "letter" | "credentials">("details");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const s = STATUS_CONFIG[pro.status];

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] flex flex-col rounded-t-3xl bg-white overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 md:inset-0 md:m-auto md:max-w-2xl md:max-h-[90vh] md:rounded-3xl">
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shrink-0" />

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-amber-500" />
              <p className="text-sm font-extrabold text-gray-900">Application Review</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>{s.label}</span>
              <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X size={13} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <AvatarBubble initials={pro.avatar} size="lg" />
            <div>
              <p className="text-base font-extrabold text-gray-900">{pro.name}</p>
              <p className="text-xs font-semibold text-amber-600 mb-1">{pro.category} · {pro.type}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={10} className="text-amber-500" />{pro.location}</span>
                <span className="flex items-center gap-1"><Clock size={10} className="text-amber-500" />Submitted {pro.submittedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 py-3 border-b border-gray-100 shrink-0">
          {(["details", "letter", "credentials"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 h-8 rounded-lg text-[11px] font-bold capitalize transition-all ${activeTab === tab ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-400 hover:text-gray-700"}`}
            >{tab === "letter" ? "Letter of Intent" : tab}</button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

          {/* DETAILS */}
          {activeTab === "details" && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Information</p>
                {[
                  { Icon: Mail, label: "Gmail", value: pro.email },
                  { Icon: Phone, label: "Phone", value: pro.phone },
                  { Icon: Building2, label: "Type", value: pro.type },
                  { Icon: MapPin, label: "Location", value: pro.location },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <Icon size={12} className="text-amber-600" />
                    </div>
                    <div className="flex-1 flex justify-between">
                      <span className="text-xs text-gray-400">{label}</span>
                      <span className="text-xs font-bold text-gray-700">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LETTER OF INTENT */}
          {activeTab === "letter" && (
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
                <FileText size={14} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">This is the applicant&apos;s letter of intent explaining why they want to advertise on NearMe.</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-sm font-bold text-gray-700 mb-3">Letter of Intent</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{pro.letterOfIntent}</p>
                </div>
              </div>
            </div>
          )}

          {/* CREDENTIALS */}
          {activeTab === "credentials" && (
            <div className="space-y-3">
              {pro.credentials.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-3">
                    <AlertCircle size={22} className="text-red-400" />
                  </div>
                  <p className="text-sm font-bold text-gray-600">No credentials submitted</p>
                  <p className="text-xs text-gray-400 mt-1">This applicant did not submit any documents</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                    <Shield size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">Review submitted credentials carefully before approving.</p>
                  </div>
                  {pro.credentials.map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">{c.label}</p>
                        <p className="text-xs text-gray-400">{c.issuer} · {c.year}</p>
                      </div>
                      <button className="flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
                        <Eye size={12} /> View
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {pro.status === "pending" && (
          <div className="px-6 py-4 border-t border-gray-100 shrink-0 space-y-3">
            {showRejectForm ? (
              <div className="space-y-3">
                <textarea rows={3} value={rejectReason} onChange={e => setRejectReason(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={() => setShowRejectForm(false)} className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">Cancel</button>
                  <button onClick={() => { onReject(pro.id); onClose(); }} className="flex-1 h-10 rounded-xl bg-red-500 text-white text-sm font-bold hover:opacity-90 transition-all">Confirm Reject</button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setShowRejectForm(true)}
                  className="flex-1 h-11 rounded-xl border-2 border-red-200 text-red-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all">
                  <XCircle size={15} /> Reject
                </button>
                <button onClick={() => { onApprove(pro.id); onClose(); }}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md shadow-green-200">
                  <CheckCircle size={15} /> Approve
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ─── DASHBOARD TAB ────────────────────────────────────────────────────────────
function DashboardTab({ professionals }: { professionals: Professional[] }) {
  const pending  = professionals.filter(p => p.status === "pending").length;
  const approved = professionals.filter(p => p.status === "approved").length;
  const rejected = professionals.filter(p => p.status === "rejected").length;
  const premium  = professionals.filter(p => p.plan === "premium").length;
  const pro      = professionals.filter(p => p.plan === "pro").length;
  const basic    = professionals.filter(p => p.plan === "basic").length;

  const monthlyRevenue = (premium * 699) + (pro * 399) + (basic * 199);

  const stats = [
    { Icon: Clock,       val: pending,  label: "Pending",    color: "text-yellow-500", bg: "bg-yellow-50"  },
    { Icon: CheckCircle, val: approved, label: "Approved",   color: "text-green-500",  bg: "bg-green-50"   },
    { Icon: Users,       val: approved, label: "Active Pros", color: "text-blue-500",  bg: "bg-blue-50"    },
    { Icon: DollarSign,  val: `₱${monthlyRevenue.toLocaleString()}`, label: "Monthly Revenue", color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ Icon, val, label, color, bg }, i) => (
          <Reveal key={label} delay={i * 70} direction="up">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-amber-100 transition-all">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={17} className={color} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{val}</p>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Revenue breakdown */}
      <Reveal direction="up" delay={100}>
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} />
              <span className="text-xs font-bold uppercase tracking-widest text-amber-100">Monthly Revenue</span>
            </div>
            <p className="text-3xl font-extrabold mb-3">₱{monthlyRevenue.toLocaleString()}</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Premium", count: premium, price: "₱699", color: "text-yellow-200" },
                { label: "Pro", count: pro, price: "₱399", color: "text-amber-100" },
                { label: "Basic", count: basic, price: "₱199", color: "text-orange-100" },
              ].map(({ label, count, price, color }) => (
                <div key={label}>
                  <p className={`text-xs font-bold ${color}`}>{label} {price}</p>
                  <p className="text-lg font-extrabold">{count} subs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Pending approvals quick view */}
      <Reveal direction="up" delay={150}>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Approvals</p>
            {pending > 0 && <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">{pending}</span>}
          </div>
          {professionals.filter(p => p.status === "pending").length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No pending applications</p>
          ) : (
            <div className="space-y-3">
              {professionals.filter(p => p.status === "pending").map(pro => (
                <div key={pro.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <AvatarBubble initials={pro.avatar} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{pro.name}</p>
                    <p className="text-xs text-gray-400">{pro.category} · {pro.submittedDate}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full border text-yellow-600 bg-yellow-50 border-yellow-200">Pending</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {/* Subscription breakdown */}
      <Reveal direction="up" delay={200}>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Subscription Overview</p>
          <div className="space-y-3">
            {[
              { plan: "premium", Icon: Crown, count: premium, revenue: premium * 699 },
              { plan: "pro", Icon: Zap, count: pro, revenue: pro * 399 },
              { plan: "basic", Icon: Star, count: basic, revenue: basic * 199 },
            ].map(({ plan, Icon, count, revenue }) => {
              const p = PLAN_CONFIG[plan as SubscriptionPlan];
              return (
                <div key={plan} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-8 h-8 rounded-lg ${p.bg} flex items-center justify-center`}>
                    <Icon size={14} className={p.color} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${p.color}`}>{p.label} — {p.price}</p>
                    <p className="text-xs text-gray-400">{count} subscribers</p>
                  </div>
                  <p className="text-sm font-extrabold text-gray-800">₱{revenue.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ─── APPROVALS TAB ────────────────────────────────────────────────────────────
function ApprovalsTab({ professionals, onApprove, onReject }: {
  professionals: Professional[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const [selected, setSelected] = useState<Professional | null>(null);
  const [filter, setFilter] = useState<"all" | ApprovalStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = professionals.filter(p =>
    (filter === "all" || p.status === filter) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const counts = {
    all: professionals.length,
    pending: professionals.filter(p => p.status === "pending").length,
    approved: professionals.filter(p => p.status === "approved").length,
    rejected: professionals.filter(p => p.status === "rejected").length,
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Shield size={17} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Professional Approvals</h2>
          <p className="text-xs text-gray-400">{counts.pending} pending review</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 h-10 bg-white border border-gray-200 rounded-xl px-3 mb-4 focus-within:border-amber-400 transition-all">
        <Search size={14} className="text-gray-400 shrink-0" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applicants..."
          className="flex-1 text-sm bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none" />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {([
          { key: "all", label: `All (${counts.all})` },
          { key: "pending", label: `Pending (${counts.pending})` },
          { key: "approved", label: `Approved (${counts.approved})` },
          { key: "rejected", label: `Rejected (${counts.rejected})` },
        ] as { key: "all" | ApprovalStatus; label: string }[]).map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`h-8 px-4 rounded-full text-xs font-bold transition-all ${filter === key ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-100 hover:border-amber-200"}`}
          >{label}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((pro, i) => {
          const s = STATUS_CONFIG[pro.status];
          return (
            <Reveal key={pro.id} delay={i * 50} direction="up">
              <button onClick={() => setSelected(pro)}
                className="w-full text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-amber-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <AvatarBubble initials={pro.avatar} size="md"
                    color={pro.status === "approved" ? "green" : pro.status === "rejected" ? "red" : "amber"}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors">{pro.name}</p>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>{s.label}</span>
                    </div>
                    <p className="text-xs font-semibold text-amber-600 mb-1.5">{pro.category} · {pro.type}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><MapPin size={10} />{pro.location}</span>
                      <span className="flex items-center gap-1"><Mail size={10} />{pro.email}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />Submitted {pro.submittedDate}</span>
                    </div>
                  </div>
                </div>
                {pro.status === "pending" && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
                    <button onClick={e => { e.stopPropagation(); onReject(pro.id); }}
                      className="flex-1 h-8 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-1">
                      <XCircle size={12} /> Reject
                    </button>
                    <button onClick={e => { e.stopPropagation(); onApprove(pro.id); }}
                      className="flex-1 h-8 rounded-xl bg-green-500 text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-1">
                      <CheckCircle size={12} /> Approve
                    </button>
                    <button onClick={e => { e.stopPropagation(); setSelected(pro); }}
                      className="h-8 px-3 rounded-xl border border-amber-200 text-amber-600 text-xs font-bold hover:bg-amber-50 transition-all flex items-center gap-1">
                      <Eye size={12} /> Review
                    </button>
                  </div>
                )}
              </button>
            </Reveal>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
              <Users size={22} className="text-amber-400" />
            </div>
            <p className="text-sm font-bold text-gray-500">No applications found</p>
          </div>
        )}
      </div>

      {selected && (
        <ProfessionalModal
          pro={selected}
          onClose={() => setSelected(null)}
          onApprove={(id) => { onApprove(id); setSelected(null); }}
          onReject={(id) => { onReject(id); setSelected(null); }}
        />
      )}
    </div>
  );
}

// ─── SUBSCRIBERS TAB ──────────────────────────────────────────────────────────
function SubscribersTab({ professionals }: { professionals: Professional[] }) {
  const [filter, setFilter] = useState<"all" | SubscriptionPlan>("all");
  const subscribers = professionals.filter(p => p.status === "approved");
  const filtered = filter === "all" ? subscribers : subscribers.filter(p => p.plan === filter);

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Crown size={17} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Subscribers</h2>
          <p className="text-xs text-gray-400">{subscribers.length} active subscribers</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {([
          { key: "all", label: `All (${subscribers.length})` },
          { key: "premium", label: `Premium` },
          { key: "pro", label: `Pro` },
          { key: "basic", label: `Basic` },
        ] as { key: "all" | SubscriptionPlan; label: string }[]).map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`h-8 px-4 rounded-full text-xs font-bold transition-all ${filter === key ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-100 hover:border-amber-200"}`}
          >{label}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((pro, i) => {
          const plan = PLAN_CONFIG[pro.plan];
          return (
            <Reveal key={pro.id} delay={i * 50} direction="up">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-amber-100 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <AvatarBubble initials={pro.avatar} size="md" color="green" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-extrabold text-gray-900">{pro.name}</p>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${plan.color} ${plan.bg} ${plan.border}`}>{plan.label} — {plan.price}</span>
                    </div>
                    <p className="text-xs text-amber-600 font-semibold mb-1.5">{pro.category} · {pro.location}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Star size={10} className="text-amber-400 fill-amber-400" />{pro.rating.toFixed(1)} rating</span>
                      <span className="flex items-center gap-1"><CheckCircle size={10} />{pro.jobs} jobs done</span>
                      <span className="flex items-center gap-1"><Mail size={10} />{pro.email}</span>
                    </div>
                  </div>
                </div>

                {/* Plan upgrade buttons */}
                {pro.plan !== "premium" && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2">
                    <p className="text-[11px] text-gray-400 mr-auto self-center">Upgrade plan:</p>
                    {pro.plan === "basic" && (
                      <button className="h-7 px-3 rounded-lg border border-purple-200 text-purple-600 text-[11px] font-bold hover:bg-purple-50 transition-all">→ Pro</button>
                    )}
                    <button className="h-7 px-3 rounded-lg border border-amber-200 text-amber-600 text-[11px] font-bold hover:bg-amber-50 transition-all">→ Premium</button>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
              <Crown size={22} className="text-amber-400" />
            </div>
            <p className="text-sm font-bold text-gray-500">No subscribers in this plan</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADS TAB ──────────────────────────────────────────────────────────────────
function AdsTab() {
  const [ads, setAds] = useState<AdSlot[]>(AD_SLOTS);

  const active  = ads.filter(a => a.status === "active").length;
  const expired = ads.filter(a => a.status === "expired").length;
  const pending = ads.filter(a => a.status === "pending").length;

  const adStatusConfig = {
    active:  { color: "text-green-600",  bg: "bg-green-50",  border: "border-green-200"  },
    expired: { color: "text-gray-500",   bg: "bg-gray-50",   border: "border-gray-200"   },
    pending: { color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Megaphone size={17} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Advertisement Slots</h2>
          <p className="text-xs text-gray-400">{active} active · {pending} pending · {expired} expired</p>
        </div>
      </div>

      {/* Slot availability */}
      <Reveal direction="up">
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Top Banner Slots", total: 3, used: ads.filter(a => a.position === "Top Banner" && a.status === "active").length, Icon: Crown, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Featured Card Slots", total: 8, used: ads.filter(a => a.position === "Featured Card" && a.status === "active").length, Icon: Star, color: "text-purple-600", bg: "bg-purple-50" },
          ].map(({ label, total, used, Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-2`}>
                <Icon size={15} className={color} />
              </div>
              <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
              <p className="text-2xl font-extrabold text-gray-900">{used}<span className="text-sm font-medium text-gray-400">/{total}</span></p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
                <div className="h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all" style={{ width: `${(used / total) * 100}%` }} />
              </div>
              <p className="text-[10px] text-gray-400 mt-1">{total - used} slots available</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Ad list */}
      <div className="space-y-3">
        {ads.map((ad, i) => {
          const s = adStatusConfig[ad.status];
          return (
            <Reveal key={ad.id} delay={i * 50} direction="up">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-amber-100 transition-all">
                <div className="flex items-start gap-3">
                  <AvatarBubble initials={ad.avatar} size="md"
                    color={ad.status === "active" ? "amber" : "gray"}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-extrabold text-gray-900">{ad.professional}</p>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>{ad.status}</span>
                    </div>
                    <p className="text-xs text-amber-600 font-semibold mb-1.5">{ad.category} · <span className="font-bold">{ad.plan} Plan</span></p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Megaphone size={10} />{ad.position}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{ad.startDate} — {ad.endDate}</span>
                    </div>
                  </div>
                </div>
                {ad.status === "active" && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2">
                    <button onClick={() => setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: "expired" } : a))}
                      className="flex items-center gap-1.5 h-7 px-3 rounded-lg border border-red-200 text-red-600 text-[11px] font-bold hover:bg-red-50 transition-all">
                      <Ban size={11} /> Deactivate
                    </button>
                    <button className="flex items-center gap-1.5 h-7 px-3 rounded-lg border border-gray-200 text-gray-600 text-[11px] font-bold hover:bg-gray-50 transition-all">
                      <RefreshCw size={11} /> Renew
                    </button>
                  </div>
                )}
                {ad.status === "pending" && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex gap-2">
                    <button onClick={() => setAds(prev => prev.map(a => a.id === ad.id ? { ...a, status: "active" } : a))}
                      className="flex-1 h-8 rounded-xl bg-green-500 text-white text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1">
                      <Check size={12} /> Activate Ad
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "approvals" | "subscribers" | "ads">("dashboard");
  const [showNotif, setShowNotif] = useState(false);
  const [professionals, setProfessionals] = useState<Professional[]>(PROFESSIONALS);

  useEffect(() => { setMounted(true); }, []);

  function handleApprove(id: number) {
    setProfessionals(prev => prev.map(p => p.id === id ? { ...p, status: "approved", plan: "basic" } : p));
  }

  function handleReject(id: number) {
    setProfessionals(prev => prev.map(p => p.id === id ? { ...p, status: "rejected" } : p));
  }

  const pendingCount = professionals.filter(p => p.status === "pending").length;

  const tabs = [
    { key: "dashboard",   Icon: Home,       label: "Dashboard"    },
    { key: "approvals",   Icon: Shield,     label: "Approvals",   badge: pendingCount },
    { key: "subscribers", Icon: Crown,      label: "Subscribers"  },
    { key: "ads",         Icon: Megaphone,  label: "Ads"          },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-[family-name:var(--font-geist-sans)]">

      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center shadow-sm">
              <MapPin size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-gray-900 tracking-tight">Near<span className="text-amber-500">Me</span></span>
            <span className="hidden sm:inline-block text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase tracking-widest ml-1">Admin</span>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {tabs.map(({ key, Icon, label, badge }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-1.5 h-8 px-4 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === key ? "bg-white text-amber-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Icon size={13} />{label}
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <Bell size={16} className="text-gray-600" />
                {pendingCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                  <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">Notifications</p>
                  <div className="space-y-3">
                    {[
                      { text: `${pendingCount} new professional applications`, time: "Just now" },
                      { text: "Clean Pro Services renewed Premium plan", time: "1 hr ago" },
                    ].map((n, i) => (
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
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <Shield size={16} className="text-red-600" />
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">Admin</span>
            </div>
            <button className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors font-semibold"><LogOut size={14} /></button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-28">
        <div className={`mb-7 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">
            {activeTab === "dashboard"   && "Overview"}
            {activeTab === "approvals"   && "Applications"}
            {activeTab === "subscribers" && "Subscriptions"}
            {activeTab === "ads"         && "Advertisements"}
          </p>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {activeTab === "dashboard"   && "Admin Dashboard"}
            {activeTab === "approvals"   && "Professional Approvals"}
            {activeTab === "subscribers" && "Manage Subscribers"}
            {activeTab === "ads"         && "Manage Ad Slots"}
          </h1>
        </div>

        {activeTab === "dashboard"   && <DashboardTab professionals={professionals} />}
        {activeTab === "approvals"   && <ApprovalsTab professionals={professionals} onApprove={handleApprove} onReject={handleReject} />}
        {activeTab === "subscribers" && <SubscribersTab professionals={professionals} />}
        {activeTab === "ads"         && <AdsTab />}
      </main>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-white border-t border-gray-100 px-2 py-2 flex items-center justify-around z-30">
        {tabs.map(({ key, Icon, label, badge }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`relative flex flex-col items-center gap-1 flex-1 py-1 rounded-xl transition-all ${activeTab === key ? "text-amber-600" : "text-gray-400"}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${activeTab === key ? "bg-amber-50" : ""}`}>
              <Icon size={17} />
            </div>
            <span className="text-[10px] font-bold">{label}</span>
            {badge && badge > 0 && (
              <span className="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}