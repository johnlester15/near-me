"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Clock3,
  ClipboardCheck,
  Eye,
  EyeOff,
  FileBadge,
  FileText,
  Info,
  Lock,
  Mail,
  MapPin,
  MapPinned,
  Phone,
  Shield,
  UploadCloud,
  User,
  X,
} from "lucide-react";
import { Backdrop, GoogleButton } from "@/components/landing/modal-shared";
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
              aria-label="Close modal"
              title="Close modal"
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
                <p>- We review your information and credentials</p>
                <p>- You&apos;ll receive an approval email at:</p>
                <p className="font-semibold break-all">{email || "your email"}</p>
                <p>- Once approved, you can sign in immediately</p>
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


export function SignUpModal({
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
            aria-label="Close modal"
            title="Close modal"
          >
            <X size={16} />
          </button>

          <div className="grid lg:grid-cols-[360px_minmax(0,1fr)] flex-1 min-h-0 overflow-hidden">
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

            <div className="flex flex-col bg-white overflow-hidden">
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
                    Static demo only - no real Gmail registration yet
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
                                aria-label="Business Type"
                                title="Business Type"
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
                                onChange={(e) => setYearsExperience(e.target.value)}
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
                                onChange={(e) => setLetterOfIntent(e.target.value)}
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
                                  Static only for now - no real upload function yet
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
                                  onChange={(e) => setHasValidId(e.target.checked)}
                                  className="mt-0.5 w-4 h-4 rounded accent-amber-500"
                                />
                                <span>I have a valid government ID ready</span>
                              </label>

                              <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasPermit}
                                  onChange={(e) => setHasPermit(e.target.checked)}
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
                                  onChange={(e) => setHasCertification(e.target.checked)}
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
                            Register - submit details and credentials - wait for
                            admin approval email - sign in and access your
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


