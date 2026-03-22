"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapPin, Search, Star, CheckCircle, ChevronRight,
  X, Eye, EyeOff, Wrench, Zap, Hammer, Leaf,
  PaintBucket, SprayCan, Monitor, Car, Shield,
  TrendingUp, Users, Award, ArrowRight, Menu,
  Building2, User, Bell, MessageCircle, BadgeCheck,
  SlidersHorizontal,
} from "lucide-react";

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
}) {
  const { ref, visible } = useInView();

  const transforms: Record<string, string> = {
    up: "translate-y-10 opacity-0",
    left: "-translate-x-10 opacity-0",
    right: "translate-x-10 opacity-0",
    fade: "opacity-0",
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 translate-x-0 opacity-100" : transforms[direction]} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Backdrop ─────────────────────────────────────────────────────────────────
function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.2s ease-out" }}
    />
  );
}

// ─── Sign In Modal ────────────────────────────────────────────────────────────
function SignInModal({
  onClose,
  onSwitch,
}: {
  onClose: () => void;
  onSwitch: () => void;
}) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          style={{
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
          }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300" />

          <div className="px-8 py-8">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X size={16} />
            </button>

            <div className="mb-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-sm">
                  <MapPin size={15} className="text-white" />
                </div>
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-600">NearMe</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
              <p className="text-sm text-gray-400 mt-1">Sign in to continue to your account</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                  <button
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                  <input type="checkbox" className="rounded accent-amber-500 w-3.5 h-3.5" />
                  Remember me
                </label>
                <button className="text-sm text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>

            <button className="mt-6 w-full h-11 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-semibold text-sm tracking-wide hover:from-amber-700 hover:to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-200 flex items-center justify-center gap-2">
              Sign In
              <ArrowRight size={15} />
            </button>

            <p className="mt-5 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-amber-600 font-bold hover:text-amber-700 transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Sign Up Modal ────────────────────────────────────────────────────────────
function SignUpModal({
  onClose,
  onSwitch,
}: {
  onClose: () => void;
  onSwitch: () => void;
}) {
  const [role, setRole] = useState<"customer" | "advertiser">("customer");
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          style={{
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
          }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300" />

          <div className="px-8 py-8">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <X size={16} />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-sm">
                  <MapPin size={15} className="text-white" />
                </div>
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-600">NearMe</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create account</h2>
              <p className="text-sm text-gray-400 mt-1">Join the platform and get started</p>
            </div>

            {/* Role toggle */}
            <div className="flex rounded-2xl bg-gray-100 p-1 mb-5 gap-1">
              {(
                [
                  { key: "customer", label: "Customer", icon: User },
                  { key: "advertiser", label: "Advertiser", icon: Building2 },
                ] as const
              ).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className={`flex-1 h-9 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    role === key
                      ? "bg-white text-amber-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                  {role === "advertiser" ? "Name or Company Name" : "Full Name"}
                </label>
                <input
                  type="text"
                  placeholder={
                    role === "advertiser" ? "e.g. Jerome's IT Services" : "Your full name"
                  }
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                  Gmail Address
                </label>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
              </div>

              {role === "customer" && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+63 9XX XXX XXXX"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                  <button
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {role === "advertiser" && (
                <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-3.5">
                  <Shield size={14} className="text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Advertiser accounts require admin approval. You&apos;ll submit a letter of intent and valid credentials after registration.
                  </p>
                </div>
              )}
            </div>

            <button className="mt-6 w-full h-11 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-semibold text-sm tracking-wide hover:from-amber-700 hover:to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-200 flex items-center justify-center gap-2">
              {role === "advertiser" ? "Apply to Advertise" : "Create Account"}
              <ArrowRight size={15} />
            </button>

            <p className="mt-5 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-amber-600 font-bold hover:text-amber-700 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Category Tile ────────────────────────────────────────────────────────────
const categories = [
  { icon: Wrench, label: "Plumbing" },
  { icon: Zap, label: "Electrical" },
  { icon: Hammer, label: "Carpentry" },
  { icon: Leaf, label: "Landscaping" },
  { icon: PaintBucket, label: "Painting" },
  { icon: SprayCan, label: "Cleaning" },
  { icon: Monitor, label: "IT Services" },
  { icon: Car, label: "Auto Repair" },
];

function CategoryTile({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} direction="up">
      <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/60 hover:-translate-y-1 transition-all duration-300 w-full">
        <div className="w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors duration-300">
          <Icon size={20} className="text-amber-600" />
        </div>
        <span className="text-xs font-semibold text-gray-600 group-hover:text-amber-700 transition-colors">
          {label}
        </span>
      </button>
    </Reveal>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({
  num,
  title,
  desc,
  icon: Icon,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  delay: number;
}) {
  return (
    <Reveal delay={delay} direction="left">
      <div className="flex gap-4 items-start group">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-md shadow-amber-200 group-hover:scale-110 transition-transform duration-300">
          <Icon size={17} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
              Step {num}
            </span>
          </div>
          <h4 className="font-bold text-gray-900 text-[15px] mb-0.5">{title}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [modal, setModal] = useState<"signin" | "signup" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-[#F9F8F6] text-gray-900"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        @keyframes floatA { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
        .float-a { animation: floatA 4s ease-in-out infinite; }
        .float-b { animation: floatB 5s ease-in-out infinite 0.8s; }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .shimmer-text {
          background: linear-gradient(90deg, #d97706, #f59e0b, #fbbf24, #f59e0b, #d97706);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
        .scroll-bounce { animation: scrollBounce 1.5s ease-in-out infinite; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-400 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-sm">
              <MapPin size={15} className="text-white" />
            </div>
            <span className="text-[15px] font-bold tracking-tight text-gray-900">
              Near<span className="text-amber-500">Me</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-500">
            {[
              { label: "How it works", href: "#how-it-works" },
              { label: "Services", href: "#services" },
              { label: "Advertise", href: "#advertise" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-amber-600 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setModal("signin")}
              className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-amber-600 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setModal("signup")}
              className="h-9 px-5 rounded-full bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-semibold hover:from-amber-700 hover:to-amber-500 active:scale-95 transition-all shadow-md shadow-amber-200 flex items-center gap-1.5"
            >
              Get Started
              <ChevronRight size={13} />
            </button>
            <button
              className="md:hidden p-1.5 text-gray-600"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
            {["How it works", "Services", "Advertise"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMobileMenu(false)}
                className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => {
                setModal("signin");
                setMobileMenu(false);
              }}
              className="text-sm font-semibold text-amber-600 text-left"
            >
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 px-6 overflow-hidden">
        {/* BG mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-100/30 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-yellow-50/40 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center py-20">
          {/* Left copy */}
          <div>
            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-200 text-xs font-semibold text-amber-600 mb-7 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Now serving Davao &amp; nearby areas
              </div>
            </div>

            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <h1 className="font-display text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight text-gray-900 mb-5">
                Find Local Services<br />
                <span className="shimmer-text">Near You,</span>
                <br />
                Right Now.
              </h1>
            </div>

            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <p className="text-base text-gray-500 leading-relaxed max-w-md mb-9">
                Connect with verified professionals and businesses in your area — plumbers,
                electricians, cleaners, IT experts and more.
              </p>
            </div>

            {/* Search */}
            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <div className="flex gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-xl shadow-gray-100/80 max-w-lg mb-7">
                <div className="flex items-center gap-2.5 flex-1 px-3">
                  <Search size={15} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder='Try "Plumber in Davao"'
                    className="flex-1 text-sm text-gray-700 placeholder-gray-300 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:border-amber-300 hover:text-amber-600 transition-all">
                    <SlidersHorizontal size={14} />
                  </button>
                  <button className="h-10 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-semibold hover:from-amber-700 hover:to-amber-500 transition-all shadow-sm flex items-center gap-1.5">
                    Search
                    <Search size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              }}
              className="flex flex-wrap items-center gap-5"
            >
              {[
                { icon: BadgeCheck, text: "Admin-verified" },
                { icon: Star, text: "Rated by customers" },
                { icon: MapPin, text: "Location-based" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Icon size={13} className="text-amber-500" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div
            style={{
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateX(0)" : "translateX(32px)",
            }}
            className="relative hidden md:flex items-center justify-center h-96"
          >
            {/* Main profile card */}
            <div className="float-a absolute z-10 w-64 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 -translate-y-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center">
                  <Wrench size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Juan dela Cruz</p>
                  <p className="text-xs text-gray-400">Licensed Plumber · Davao</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                ))}
                <span className="text-xs text-gray-400 ml-1.5">5.0 · 48 jobs done</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgeCheck size={13} className="text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600">Verified Professional</span>
              </div>
            </div>

            {/* Job done card */}
            <div className="float-b absolute bottom-4 right-0 w-52 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={14} className="text-emerald-500" />
                <p className="text-xs font-bold text-gray-900">Job Completed</p>
              </div>
              <p className="text-xs text-gray-400 mb-2.5">Pipe Repair · Davao City</p>
              <div className="h-1.5 w-full rounded-full bg-gray-100 mb-2">
                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400" />
              </div>
              <p className="text-[11px] font-semibold text-amber-600">Customer confirmed</p>
            </div>

            {/* Notification badge */}
            <div className="absolute top-0 left-0 bg-white rounded-2xl shadow-md px-4 py-3 border border-gray-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Bell size={13} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">New inquiry!</p>
                <p className="text-[10px] text-gray-400">from Maria Santos</p>
              </div>
            </div>

            {/* Stat */}
            <div className="absolute top-24 right-0 bg-gradient-to-br from-amber-500 to-yellow-400 text-white rounded-2xl px-4 py-3 shadow-lg shadow-amber-200">
              <p className="font-display text-2xl font-black">200+</p>
              <p className="text-[11px] font-medium opacity-80">Professionals</p>
            </div>

            {/* Inbox badge */}
            <div className="absolute bottom-20 left-0 bg-white rounded-xl shadow-md px-3.5 py-2.5 border border-gray-100 flex items-center gap-2">
              <MessageCircle size={13} className="text-amber-500" />
              <span className="text-xs font-semibold text-gray-700">12 inquiries today</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            transition: "opacity 0.7s ease 1s",
            opacity: heroVisible ? 1 : 0,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
            Scroll
          </span>
          <div className="scroll-bounce w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">
                Browse by Category
              </p>
              <h2 className="font-display text-3xl font-black text-gray-900 tracking-tight">
                What are you looking for?
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {categories.map(({ icon, label }, i) => (
              <CategoryTile key={label} icon={icon} label={label} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">
                Simple Process
              </p>
              <h2 className="font-display text-3xl font-black text-gray-900 tracking-tight mb-3">
                How Near Me Works
              </h2>
              <p className="text-sm text-gray-500 mb-10 max-w-sm">
                Finding the right professional in your area has never been this simple.
              </p>
            </Reveal>

            <div className="space-y-8">
              <StepCard
                num="1"
                icon={Search}
                title="Search service & location"
                desc='Type what you need and where — e.g., "Electrician in Davao City".'
                delay={0}
              />
              <StepCard
                num="2"
                icon={Users}
                title="Browse verified profiles"
                desc="View ratings, credentials, and jobs done count from real customers."
                delay={100}
              />
              <StepCard
                num="3"
                icon={MessageCircle}
                title="Send an inquiry"
                desc="Contact the professional directly through their dedicated inbox."
                delay={200}
              />
              <StepCard
                num="4"
                icon={Star}
                title="Confirm & rate"
                desc="After completion, confirm the job and leave a review for the community."
                delay={300}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "200+", label: "Verified Advertisers", icon: BadgeCheck, delay: 0 },
              { val: "98%", label: "Customer Satisfaction", icon: TrendingUp, delay: 80 },
              { val: "15+", label: "Service Categories", icon: SlidersHorizontal, delay: 160 },
              { val: "5.0", label: "Average Rating", icon: Award, delay: 240 },
            ].map(({ val, label, icon: Icon, delay }) => (
              <Reveal key={label} delay={delay} direction="right">
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6 hover:shadow-md hover:shadow-amber-100 transition-all duration-300 group">
                  <Icon
                    size={18}
                    className="text-amber-500 mb-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="font-display text-3xl font-black text-gray-900 mb-0.5">{val}</p>
                  <p className="text-xs font-semibold text-gray-500">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advertise CTA ── */}
      <section id="advertise" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 overflow-hidden p-12 text-center text-white">
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-6">
                  <Building2 size={12} />
                  For Professionals &amp; Businesses
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight mb-4">
                  Advertise Your Services<br />on Near Me
                </h2>
                <p className="text-base text-white/80 mb-9 max-w-lg mx-auto leading-relaxed">
                  Whether you&apos;re an individual freelancer or a registered company — reach
                  customers in your area who need your expertise today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setModal("signup")}
                    className="h-12 px-8 rounded-full bg-white text-amber-600 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Apply to Advertise
                    <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => setModal("signin")}
                    className="h-12 px-8 rounded-full bg-white/20 border border-white/40 text-white font-semibold text-sm hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Sign In to Account
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-gray-500 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center">
                  <MapPin size={13} className="text-white" />
                </div>
                <span className="text-sm font-bold text-white">
                  Near<span className="text-amber-400">Me</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-xs">
                Connecting you to trusted local professionals in your area.
              </p>
            </div>
            <div className="flex gap-10 text-sm">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Platform
                </p>
                {["How it works", "Services", "Advertise"].map((l) => (
                  <a key={l} href="#" className="text-xs hover:text-white transition-colors">
                    {l}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Legal
                </p>
                {["Privacy", "Terms", "Contact"].map((l) => (
                  <a key={l} href="#" className="text-xs hover:text-white transition-colors">
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-gray-600">
            © 2025 NearMe. All rights reserved. Serving Davao &amp; nearby areas.
          </p>
        </div>
      </footer>

      {/* ── Modals ── */}
      {modal === "signin" && (
        <SignInModal onClose={() => setModal(null)} onSwitch={() => setModal("signup")} />
      )}
      {modal === "signup" && (
        <SignUpModal onClose={() => setModal(null)} onSwitch={() => setModal("signin")} />
      )}
    </div>
  );
}