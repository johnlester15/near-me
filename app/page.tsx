"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Search,
  Star,
  CheckCircle,
  ChevronRight,
  X,
  Eye,
  EyeOff,
  Wrench,
  Zap,
  Hammer,
  Leaf,
  PaintBucket,
  SprayCan,
  Monitor,
  Car,
  Shield,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Menu,
  Building2,
  User,
  Bell,
  MessageCircle,
  BadgeCheck,
  SlidersHorizontal,
  Lock,
  Mail,
  Phone,
  FileText,
  ClipboardCheck,
  UploadCloud,
  Info,
  Briefcase,
  MapPinned,
  FileBadge,
  Clock3,
  Sparkles,
} from "lucide-react";

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 translate-x-0 opacity-100"
          : transforms[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
    />
  );
}

function GoogleButton({
  text,
  onClick,
}: {
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-all flex items-center justify-center gap-3"
    >
      <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303C33.655 32.657 29.243 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.847 1.153 7.964 3.036l5.657-5.657C34.064 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.847 1.153 7.964 3.036l5.657-5.657C34.064 6.053 29.27 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.147 35.091 26.715 36 24 36c-5.221 0-9.621-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.084 5.57h.003l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>
      {text}
    </button>
  );
}

function ConsentModal({
  onClose,
  onAgree,
}: {
  onClose: () => void;
  onAgree: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const canContinue = checked1 && checked2 && checked3;

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden"
          style={{
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateY(0) scale(1)"
              : "translateY(24px) scale(0.95)",
          }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300" />
          <div className="px-7 py-7">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              type="button"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                <Shield size={18} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                  Privacy & Professional Verification
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Before submitting your advertiser application, please confirm
                  that you understand how your information will be handled.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Your submitted documents and personal information are used
                    only for verification, fraud prevention, and advertiser
                    approval review.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <ClipboardCheck
                    size={16}
                    className="text-amber-600 mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Only approved advertisers can appear publicly on the
                    platform. Incomplete or invalid documents may delay or
                    reject approval.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Approval results are sent through email. Once approved, you
                    can sign in and access your professional dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked1}
                  onChange={(e) => setChecked1(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-amber-500"
                />
                <span>
                  I confirm that the information and documents I submit are true
                  and accurate.
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked2}
                  onChange={(e) => setChecked2(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-amber-500"
                />
                <span>
                  I agree that NearMe may review my credentials and business
                  details for approval.
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked3}
                  onChange={(e) => setChecked3(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-amber-500"
                />
                <span>
                  I understand that my application will remain pending until I
                  receive an approval email.
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={onAgree}
                disabled={!canContinue}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-semibold hover:from-amber-700 hover:to-amber-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                I Agree & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PendingApprovalModal({
  onClose,
  email,
}: {
  onClose: () => void;
  email: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          style={{
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateY(0) scale(1)"
              : "translateY(24px) scale(0.95)",
          }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300" />
          <div className="px-8 py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <Clock3 size={28} className="text-emerald-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              Application Submitted
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Your professional account is now under review. Our admin team will
              verify your submitted details and documents first.
            </p>

            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-left mb-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-2">
                What happens next
              </p>
              <div className="space-y-2 text-sm text-amber-800">
                <p>• We review your information and credentials</p>
                <p>• You'll receive an approval email at:</p>
                <p className="font-semibold break-all">{email || "your email"}</p>
                <p>• Once approved, you can sign in immediately</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-semibold text-sm hover:from-amber-700 hover:to-amber-500 transition-all"
              type="button"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SignInModal({
  onClose,
  onSwitch,
  onSuccess,
}: {
  onClose: () => void;
  onSwitch: () => void;
  onSuccess: (role: "customer" | "professional") => void;
}) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  function handleSignIn() {
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (
        email.toLowerCase().includes("professional") ||
        email.toLowerCase().includes("pro")
      ) {
        onSuccess("professional");
      } else {
        onSuccess("customer");
      }
    }, 800);
  }

  function handleGoogleSignIn() {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      onSuccess("customer");
    }, 700);
  }

  return (
    <>
      <Backdrop onClose={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
          style={{
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateY(0) scale(1)"
              : "translateY(24px) scale(0.95)",
          }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300" />
          <div className="px-8 py-8">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              type="button"
            >
              <X size={16} />
            </button>

            <div className="mb-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-sm">
                  <MapPin size={15} className="text-white" />
                </div>
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-600">
                  NearMe
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Sign in to continue to your account
              </p>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            <div className="mb-4">
              <GoogleButton
                text="Continue with Gmail"
                onClick={handleGoogleSignIn}
              />
              <p className="text-[11px] text-gray-400 text-center mt-2">
                Static demo only — no real Gmail authentication yet
              </p>
            </div>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="you@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                  <button
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded accent-amber-500 w-3.5 h-3.5"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="mt-6 w-full h-11 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-semibold text-sm tracking-wide hover:from-amber-700 hover:to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-200 flex items-center justify-center gap-2 disabled:opacity-70"
              type="button"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />{" "}
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={15} />
                </>
              )}
            </button>

            <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                Demo accounts
              </p>
              <p className="text-xs text-gray-500">
                Customer: any email + any password
              </p>
              <p className="text-xs text-gray-500">
                Professional: email with &quot;pro&quot; + any password
              </p>
            </div>

            <p className="mt-5 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <button
                onClick={onSwitch}
                className="text-amber-600 font-bold hover:text-amber-700 transition-colors"
                type="button"
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
  onSuccess,
}: {
  onClose: () => void;
  onSwitch: () => void;
  onSuccess: (role: "customer" | "professional") => void;
}) {
  const [role, setRole] = useState<"customer" | "advertiser">("customer");
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [bio, setBio] = useState("");
  const [letterOfIntent, setLetterOfIntent] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [hasValidId, setHasValidId] = useState(false);
  const [hasPermit, setHasPermit] = useState(false);
  const [hasCertification, setHasCertification] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  function validateFields() {
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return false;
    }

    if (!phone) {
      setError("Please add your contact number.");
      return false;
    }

    if (role === "advertiser") {
      if (
        !category ||
        !location ||
        !yearsExperience ||
        !bio ||
        !letterOfIntent ||
        !businessType
      ) {
        setError("Please complete the professional application form.");
        return false;
      }

      if (!hasValidId || !hasCertification) {
        setError(
          "Please confirm that you have your valid ID and certification ready."
        );
        return false;
      }
    }

    return true;
  }

  function handlePrimarySignUp() {
    if (!validateFields()) return;

    if (role === "advertiser") {
      setConsentOpen(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess("customer");
    }, 800);
  }

  function handleAdvertiserFinalSubmit() {
    setConsentOpen(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPendingOpen(true);
    }, 900);
  }

  function handleGoogleSignUp() {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      onSuccess("customer");
    }, 700);
  }

  function closePending() {
    setPendingOpen(false);
    onClose();
  }

  return (
    <>
      <Backdrop onClose={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        {/* ── MODAL SHELL: fixed height, flex col so children can size properly ── */}
        <div
          className="relative w-full max-w-6xl rounded-[28px] bg-white shadow-2xl overflow-hidden flex flex-col"
          style={{
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateY(0) scale(1)"
              : "translateY(24px) scale(0.95)",
            maxHeight: "94vh",
            height: "94vh",
          }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shrink-0" />

          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 z-20 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all bg-white/90 backdrop-blur-sm"
          >
            <X size={16} />
          </button>

          {/* ── INNER GRID: fills remaining height ── */}
          <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] flex-1 min-h-0 overflow-hidden">
            {/* LEFT PANEL — static, no scroll */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 text-white p-8 xl:p-10 overflow-hidden">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-[0.15em] uppercase">
                    NearMe
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-widest mb-5">
                  {role === "advertiser" ? (
                    <Building2 size={12} />
                  ) : (
                    <User size={12} />
                  )}
                  {role === "advertiser"
                    ? "Professional Signup"
                    : "Customer Signup"}
                </div>

                <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4">
                  {role === "advertiser"
                    ? "Grow your service business with NearMe"
                    : "Find trusted local services faster"}
                </h2>

                <p className="text-sm text-white/85 leading-relaxed max-w-sm">
                  {role === "advertiser"
                    ? "Submit your professional details, service credentials, and verification requirements. Once approved, you can sign in and start receiving inquiries."
                    : "Create your account and start browsing trusted local professionals near you."}
                </p>
              </div>

              <div className="space-y-3 mt-8">
                {role === "advertiser" ? (
                  <>
                    <div className="rounded-2xl bg-white/12 border border-white/15 p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
                        Step 1
                      </p>
                      <p className="text-sm font-semibold">
                        Complete the application form
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/12 border border-white/15 p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
                        Step 2
                      </p>
                      <p className="text-sm font-semibold">
                        Submit credentials for review
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/12 border border-white/15 p-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
                        Step 3
                      </p>
                      <p className="text-sm font-semibold">
                        Receive approval by email
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl bg-white/12 border border-white/15 p-4">
                      <p className="text-sm font-semibold">
                        Browse local categories
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/12 border border-white/15 p-4">
                      <p className="text-sm font-semibold">
                        Message trusted professionals
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/12 border border-white/15 p-4">
                      <p className="text-sm font-semibold">
                        Rate completed services
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT PANEL — flex col with sticky header + scrollable body */}
            <div className="flex flex-col bg-white overflow-hidden">
              {/* ── Sticky header ── */}
              <div className="shrink-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-5 sm:px-7 py-5">
                <div className="pr-10">
                  <div className="flex items-center gap-2 mb-3 lg:hidden">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-sm">
                      <MapPin size={15} className="text-white" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.15em] uppercase text-amber-600">
                      NearMe
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Create account
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {role === "advertiser"
                      ? "Apply as a professional or service provider"
                      : "Join the platform and get started"}
                  </p>
                </div>

                <div className="flex rounded-2xl bg-gray-100 p-1 mt-5 gap-1">
                  {([
                    { key: "customer", label: "Customer", icon: User },
                    { key: "advertiser", label: "Professional", icon: Building2 },
                  ] as const).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setRole(key)}
                      type="button"
                      className={`flex-1 h-10 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
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
              </div>

              {/* ── Scrollable form body ── */}
              <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-7 py-5">
                {error && (
                  <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <GoogleButton
                    text="Continue with Gmail"
                    onClick={handleGoogleSignUp}
                  />
                  <p className="text-[11px] text-gray-400 text-center mt-2">
                    Static demo only — no real Gmail registration yet
                  </p>
                </div>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                      Or fill out the form
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Basic account info */}
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">
                      Account Information
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                          {role === "advertiser"
                            ? "Name or Company Name"
                            : "Full Name"}
                        </label>
                        <div className="relative">
                          <User
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            placeholder={
                              role === "advertiser"
                                ? "e.g. Juan Plumbing Services"
                                : "Your full name"
                            }
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                          Gmail Address
                        </label>
                        <div className="relative">
                          <Mail
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="email"
                            placeholder="you@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                          Contact Number
                        </label>
                        <div className="relative">
                          <Phone
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="tel"
                            placeholder="+63 9XX XXX XXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                          Password
                        </label>
                        <div className="relative">
                          <Lock
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type={show ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                          />
                          <button
                            onClick={() => setShow(!show)}
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {show ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional fields */}
                  {role === "advertiser" && (
                    <>
                      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                        <div className="flex items-start gap-3">
                          <div>
                            <p className="text-sm font-bold text-amber-800 mb-1">
                              Professional accounts require admin approval
                            </p>
                            <p className="text-xs text-amber-700 leading-relaxed">
                              Submit your service details, letter of intent, and
                              credentials below. After review, approval will be
                              sent to your email and you can sign in immediately.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">
                          Professional Information
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                              Service Category
                            </label>
                            <div className="relative">
                              <Briefcase
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                              />
                              <input
                                type="text"
                                placeholder="e.g. Plumbing"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                              Business Type
                            </label>
                            <div className="relative">
                              <Building2
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                              />
                              <select
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                              >
                                <option value="">Select type</option>
                                <option value="individual">
                                  Individual Professional
                                </option>
                                <option value="agency">Service Agency</option>
                                <option value="business">
                                  Registered Business
                                </option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                              Service Location
                            </label>
                            <div className="relative">
                              <MapPinned
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                              />
                              <input
                                type="text"
                                placeholder="e.g. Davao City"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                              Years of Experience
                            </label>
                            <div className="relative">
                              <Award
                                size={14}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                              />
                              <input
                                type="text"
                                placeholder="e.g. 8 years"
                                value={yearsExperience}
                                onChange={(e) =>
                                  setYearsExperience(e.target.value)
                                }
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                              License / Main Certification
                            </label>
                            <div className="relative">
                              <FileBadge
                                size={14}
                                className="absolute left-3.5 top-3.5 text-gray-400"
                              />
                              <input
                                type="text"
                                placeholder="e.g. TESDA NC II - Plumbing"
                                value={licenseName}
                                onChange={(e) => setLicenseName(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                              />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                              Short Professional Bio
                            </label>
                            <textarea
                              placeholder="Tell customers about your experience, specialties, and why they should trust your service."
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              rows={3}
                              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-bold text-gray-500 mb-1.5 tracking-widest uppercase">
                              Letter of Intent
                            </label>
                            <div className="relative">
                              <FileText
                                size={14}
                                className="absolute left-3.5 top-3.5 text-gray-400"
                              />
                              <textarea
                                placeholder="Explain why you want to advertise on NearMe and how your service can help customers."
                                value={letterOfIntent}
                                onChange={(e) =>
                                  setLetterOfIntent(e.target.value)
                                }
                                rows={4}
                                className="w-full rounded-2xl border border-gray-200 pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-3">
                          Credentials & Verification
                        </p>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                          <div className="rounded-2xl border border-gray-200 p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <UploadCloud
                                size={16}
                                className="text-amber-600 mt-0.5 shrink-0"
                              />
                              <div>
                                <p className="text-sm font-bold text-gray-900">
                                  Upload placeholders
                                </p>
                                <p className="text-xs text-gray-500">
                                  Static only for now — no real upload function
                                  yet
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {[
                                "Valid Government ID",
                                "Business Permit (if applicable)",
                                "Professional Certificate / TESDA / License",
                              ].map((item) => (
                                <button
                                  key={item}
                                  type="button"
                                  className="w-full h-10 rounded-xl border border-dashed border-amber-300 bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-all flex items-center justify-center gap-2"
                                >
                                  <UploadCloud size={13} />
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-gray-200 p-4">
                            <p className="text-sm font-bold text-gray-900 mb-3">
                              Confirm available documents
                            </p>

                            <div className="space-y-3">
                              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasValidId}
                                  onChange={(e) =>
                                    setHasValidId(e.target.checked)
                                  }
                                  className="mt-0.5 w-4 h-4 rounded accent-amber-500"
                                />
                                <span>I have a valid government ID ready</span>
                              </label>

                              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasPermit}
                                  onChange={(e) =>
                                    setHasPermit(e.target.checked)
                                  }
                                  className="mt-0.5 w-4 h-4 rounded accent-amber-500"
                                />
                                <span>
                                  I have a business permit ready (if applicable)
                                </span>
                              </label>

                              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasCertification}
                                  onChange={(e) =>
                                    setHasCertification(e.target.checked)
                                  }
                                  className="mt-0.5 w-4 h-4 rounded accent-amber-500"
                                />
                                <span>
                                  I have certifications / credentials ready
                                </span>
                              </label>
                            </div>

                            <div className="mt-4 rounded-xl bg-gray-50 border border-gray-100 p-3">
                              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                                Approval notes
                              </p>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                Applications with complete information and clear
                                credentials are reviewed faster.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    onClick={handlePrimarySignUp}
                    disabled={loading}
                    className="mt-2 w-full h-11 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-semibold text-sm tracking-wide hover:from-amber-700 hover:to-amber-500 active:scale-[0.98] transition-all shadow-lg shadow-amber-200 flex items-center justify-center gap-2 disabled:opacity-70"
                    type="button"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        {role === "advertiser"
                          ? "Submitting application..."
                          : "Creating account..."}
                      </>
                    ) : (
                      <>
                        {role === "advertiser"
                          ? "Submit for Approval"
                          : "Create Account"}
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  {role === "advertiser" && (
                    <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                      <div className="flex items-start gap-3">
                       
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            Professional onboarding flow
                          </p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            Register → submit details and credentials → wait
                            for admin approval email → sign in and access your
                            dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="pt-1 pb-4 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <button
                      onClick={onSwitch}
                      className="text-amber-600 font-bold hover:text-amber-700 transition-colors"
                      type="button"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {consentOpen && (
        <ConsentModal
          onClose={() => setConsentOpen(false)}
          onAgree={handleAdvertiserFinalSubmit}
        />
      )}

      {pendingOpen && (
        <PendingApprovalModal onClose={closePending} email={email} />
      )}
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
      <button className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/60 hover:-translate-y-1 transition-all duration-300 w-full">
        <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors duration-300">
          <Icon size={18} className="text-amber-600" />
        </div>
        <span className="text-[11px] font-semibold text-gray-600 group-hover:text-amber-700 transition-colors text-center leading-tight">
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
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
            Step {num}
          </span>
          <h4 className="font-bold text-gray-900 text-[15px] mb-0.5">
            {title}
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const router = useRouter();
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

  function handleLoginSuccess(role: "customer" | "professional") {
    setModal(null);

    if (role === "professional") {
      router.push("/professional");
    } else {
      router.push("/home");
    }
  }

  return (
    <div
      className="min-h-screen bg-[#F9F8F6] text-gray-900 overflow-x-hidden"
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
          background: linear-gradient(90deg,#d97706,#f59e0b,#fbbf24,#f59e0b,#d97706);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimmer 4s linear infinite;
        }
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
        .scroll-bounce { animation: scrollBounce 1.5s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 0.8s linear infinite; }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-400 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
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
              type="button"
            >
              Sign In
            </button>
            <button
              onClick={() => setModal("signup")}
              className="h-9 px-5 rounded-full bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-semibold hover:from-amber-700 hover:to-amber-500 active:scale-95 transition-all shadow-md shadow-amber-200 flex items-center gap-1.5"
              type="button"
            >
              Get Started <ChevronRight size={13} />
            </button>
            <button
              className="md:hidden p-1.5 text-gray-600"
              onClick={() => setMobileMenu(!mobileMenu)}
              type="button"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

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
              type="button"
            >
              Sign In
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full bg-amber-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-52 h-52 sm:w-[350px] sm:h-[350px] rounded-full bg-orange-100/30 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-[600px] sm:h-[600px] rounded-full bg-yellow-50/40 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center py-16">
          <div className="w-full max-w-full">
            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              
            </div>

            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-gray-900 mb-5">
                Find Local Services
                <br />
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
                Connect with verified professionals and businesses in your area
                — plumbers, electricians, cleaners, IT experts and more.
              </p>
            </div>

            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              }}
            >
              <div className="flex gap-2 bg-white border border-gray-200 rounded-2xl p-2 shadow-xl shadow-gray-100/80 max-w-lg mb-7">
                <div className="flex items-center gap-2.5 flex-1 px-3 min-w-0">
                  <Search size={15} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder='Try "Plumber in Davao"'
                    className="flex-1 min-w-0 text-sm text-gray-700 placeholder-gray-300 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:border-amber-300 hover:text-amber-600 transition-all"
                    type="button"
                  >
                    <SlidersHorizontal size={14} />
                  </button>
                  <button
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-semibold hover:from-amber-700 hover:to-amber-500 transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap"
                    type="button"
                  >
                    Search <Search size={13} />
                  </button>
                </div>
              </div>
            </div>

            <div
              style={{
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              }}
              className="flex flex-wrap items-center gap-4"
            >
              {[
                { icon: BadgeCheck, text: "Admin-verified" },
                { icon: Star, text: "Rated by customers" },
                { icon: MapPin, text: "Location-based" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-500"
                >
                  <Icon size={13} className="text-amber-500" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateX(0)" : "translateX(32px)",
            }}
            className="relative hidden md:flex items-center justify-center h-96"
          >
            <div className="float-a absolute z-10 w-60 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 -translate-y-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center">
                  <Wrench size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Juan dela Cruz
                  </p>
                  <p className="text-xs text-gray-400">
                    Licensed Plumber · Davao
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mb-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={11}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1.5">
                  5.0 · 48 jobs
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgeCheck size={13} className="text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600">
                  Verified
                </span>
              </div>
            </div>

            <div className="float-b absolute bottom-4 right-0 w-48 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={14} className="text-emerald-500" />
                <p className="text-xs font-bold text-gray-900">
                  Job Completed
                </p>
              </div>
              <p className="text-xs text-gray-400 mb-2">Pipe Repair · Davao</p>
              <div className="h-1.5 w-full rounded-full bg-gray-100">
                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400" />
              </div>
              <p className="text-[11px] font-semibold text-amber-600 mt-1.5">
                Customer confirmed
              </p>
            </div>

            <div className="absolute top-0 left-0 bg-white rounded-2xl shadow-md px-4 py-3 border border-gray-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Bell size={13} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">New inquiry!</p>
                <p className="text-[10px] text-gray-400">
                  from Maria Santos
                </p>
              </div>
            </div>

            <div className="absolute top-24 right-0 bg-gradient-to-br from-amber-500 to-yellow-400 text-white rounded-2xl px-4 py-3 shadow-lg shadow-amber-200">
              <p className="font-display text-2xl font-black">200+</p>
              <p className="text-[11px] font-medium opacity-80">
                Professionals
              </p>
            </div>

            <div className="absolute bottom-20 left-0 bg-white rounded-xl shadow-md px-3.5 py-2.5 border border-gray-100 flex items-center gap-2">
              <MessageCircle size={13} className="text-amber-500" />
              <span className="text-xs font-semibold text-gray-700">
                12 inquiries today
              </span>
            </div>
          </div>
        </div>

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
      <section id="services" className="py-24 px-5 bg-white">
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
              <CategoryTile
                key={label}
                icon={icon}
                label={label}
                delay={i * 60}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-5">
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
                Finding the right professional in your area has never been this
                simple.
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

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                val: "200+",
                label: "Verified Advertisers",
                icon: BadgeCheck,
                delay: 0,
              },
              {
                val: "98%",
                label: "Customer Satisfaction",
                icon: TrendingUp,
                delay: 80,
              },
              {
                val: "15+",
                label: "Service Categories",
                icon: SlidersHorizontal,
                delay: 160,
              },
              { val: "5.0", label: "Average Rating", icon: Award, delay: 240 },
            ].map(({ val, label, icon: Icon, delay }) => (
              <Reveal key={label} delay={delay} direction="right">
                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6 hover:shadow-md hover:shadow-amber-100 transition-all duration-300 group">
                  <Icon
                    size={18}
                    className="text-amber-500 mb-3 group-hover:scale-110 transition-transform duration-300"
                  />
                  <p className="font-display text-3xl font-black text-gray-900 mb-0.5">
                    {val}
                  </p>
                  <p className="text-xs font-semibold text-gray-500">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Advertise CTA ── */}
      <section id="advertise" className="py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 overflow-hidden p-10 sm:p-12 text-center text-white">
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-6">
                  <Building2 size={12} /> For Professionals &amp; Businesses
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight mb-4">
                  Advertise Your Services
                  <br />
                  on Near Me
                </h2>
                <p className="text-base text-white/80 mb-9 max-w-lg mx-auto leading-relaxed">
                  Whether you&apos;re an individual freelancer or a registered
                  company — reach customers in your area who need your expertise
                  today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setModal("signup")}
                    className="h-12 px-8 rounded-full bg-white text-amber-600 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                    type="button"
                  >
                    Apply to Advertise <ArrowRight size={15} />
                  </button>
                  <button
                    onClick={() => setModal("signin")}
                    className="h-12 px-8 rounded-full bg-white/20 border border-white/40 text-white font-semibold text-sm hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                    type="button"
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
      <footer className="bg-gray-950 text-gray-500 py-12 px-5">
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
                  <a
                    key={l}
                    href="#"
                    className="text-xs hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Legal
                </p>
                {["Privacy", "Terms", "Contact"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-xs hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-gray-600">
            © 2026 NearMe. All rights reserved. Serving Davao &amp; nearby
            areas.
          </p>
        </div>
      </footer>

      {/* ── Modals ── */}
      {modal === "signin" && (
        <SignInModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal("signup")}
          onSuccess={handleLoginSuccess}
        />
      )}

      {modal === "signup" && (
        <SignUpModal
          onClose={() => setModal(null)}
          onSwitch={() => setModal("signin")}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
}