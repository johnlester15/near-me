"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, MapPin, X } from "lucide-react";
import { Backdrop, GoogleButton } from "@/components/landing/modal-shared";

export function SignInModal({
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
              aria-label="Close modal"
              title="Close modal"
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
                Static demo only - no real Gmail authentication yet
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
