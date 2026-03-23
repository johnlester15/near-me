"use client";

import { ChevronRight, MapPin, Menu, X, Zap, Wrench, Leaf, Monitor, SprayCan, Car, Building2, ArrowRight } from "lucide-react";

export function HomeNavbar({
  scrolled,
  mobileMenu,
  onToggleMobileMenu,
  onOpenSignIn,
  onOpenSignUp,
  onCloseMobileMenu,
}: {
  scrolled: boolean;
  mobileMenu: boolean;
  onToggleMobileMenu: () => void;
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
  onCloseMobileMenu: () => void;
}) {
  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "Advertise", href: "#advertise" },
  ];

  const mobileCategories = [
    { icon: Wrench, label: "Plumbing" },
    { icon: Zap, label: "Electrical" },
    { icon: SprayCan, label: "Cleaning" },
    { icon: Leaf, label: "Landscaping" },
    { icon: Monitor, label: "IT Services" },
    { icon: Car, label: "Auto Repair" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .nav-syne { font-family: 'Syne', sans-serif; }

        @keyframes nav-slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nav-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .nav-mobile-enter {
          animation: nav-slide-down 0.28s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .nav-backdrop-enter {
          animation: nav-fade-in 0.2s ease forwards;
        }

        .nav-link-underline {
          position: relative;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
          transition: width 0.25s ease;
          border-radius: 999px;
        }
        .nav-link-underline:hover::after {
          width: 100%;
        }

        .nav-logo-glow:hover .nav-logo-icon {
          box-shadow: 0 0 20px rgba(245,158,11,0.5);
          transform: scale(1.08) rotate(-4deg);
        }
        .nav-logo-icon {
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }

        .nav-cta-btn {
          position: relative;
          overflow: hidden;
        }
        .nav-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        .nav-cta-btn:hover::before {
          transform: translateX(100%);
        }

        .nav-scrolled-bar {
          background: rgba(10, 10, 14, 0.82);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }
        .nav-transparent-bar {
          background: transparent;
        }
      `}</style>

      <nav
        className={`fixed top-0 inset-x-0 z-30 transition-all duration-500 ${
          scrolled ? "nav-scrolled-bar" : "nav-transparent-bar"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between">

          {/* ── Logo ── */}
          <a href="/" className="nav-logo-glow flex items-center gap-2.5 group">
            <div
              className="nav-logo-icon w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
            >
              <MapPin size={16} className="text-white" />
            </div>
            <span className="nav-syne text-[17px] font-bold tracking-tight text-white">
              Near<span style={{ color: "#f59e0b" }}>Me</span>
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link-underline px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {label}
              </a>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Sign In */}
            <button
              onClick={onOpenSignIn}
              type="button"
              className="hidden sm:flex items-center h-9 px-4 rounded-xl text-[13px] font-semibold text-white/65 hover:text-white hover:bg-white/8 transition-all duration-200"
              style={{ letterSpacing: "0.01em" }}
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-4 bg-white/15 mx-1" />

            {/* CTA */}
            <button
              onClick={onOpenSignUp}
              type="button"
              className="nav-cta-btn h-9 px-5 rounded-xl text-[13px] font-bold text-gray-950 flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
              }}
            >
              Get Started
              <ChevronRight size={13} strokeWidth={2.5} />
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-1 w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
              onClick={onToggleMobileMenu}
              type="button"
              aria-label={mobileMenu ? "Close menu" : "Open menu"}
            >
              {mobileMenu
                ? <X size={18} strokeWidth={2} />
                : <Menu size={18} strokeWidth={2} />
              }
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        {mobileMenu && (
          <>
            {/* Backdrop */}
            <div
              className="nav-backdrop-enter fixed inset-0 top-[68px] z-[-1] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={onCloseMobileMenu}
            />

            {/* Panel */}
            <div
              className="nav-mobile-enter md:hidden"
              style={{
                background: "rgba(12,11,9,0.97)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(32px)",
              }}
            >
              {/* Nav links */}
              <div className="px-5 pt-4 pb-2 space-y-1">
                {navLinks.map(({ label, href }, i) => (
                  <a
                    key={label}
                    href={href}
                    onClick={onCloseMobileMenu}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium text-white/60 hover:text-white hover:bg-white/6 transition-all"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {label}
                    <ArrowRight size={13} className="text-white/25" />
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-5 my-3 h-px bg-white/6" />

              {/* Quick categories */}
              <div className="px-5 pb-3">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/25 px-4 mb-2">
                  Quick Browse
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {mobileCategories.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={onCloseMobileMenu}
                      className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all hover:bg-amber-500/10 group"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors"
                        style={{ background: "rgba(245,158,11,0.1)" }}>
                        <Icon size={14} className="text-amber-400/70 group-hover:text-amber-400" />
                      </div>
                      <span className="text-[10px] font-medium text-white/40 group-hover:text-white/70 transition-colors text-center leading-tight">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-5 my-3 h-px bg-white/6" />

              {/* Auth buttons */}
              <div className="px-5 pb-5 flex flex-col gap-2.5">
                <button
                  onClick={() => { onOpenSignUp(); onCloseMobileMenu(); }}
                  type="button"
                  className="nav-cta-btn w-full h-11 rounded-xl text-sm font-bold text-gray-950 flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
                  }}
                >
                  <Building2 size={14} />
                  Get Started — It's Free
                </button>
                <button
                  onClick={() => { onOpenSignIn(); onCloseMobileMenu(); }}
                  type="button"
                  className="w-full h-11 rounded-xl text-sm font-semibold text-white/60 hover:text-white flex items-center justify-center gap-2 transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Sign In to Account
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}