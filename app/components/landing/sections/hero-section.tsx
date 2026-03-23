"use client";

import {
  BadgeCheck,
  Bell,
  CheckCircle,
  MapPin,
  MessageCircle,
  Search,
  Star,
  Wrench,
  Zap,
  Leaf,
  SprayCan,
  ArrowRight,
  ChevronDown,
  Shield,
  Clock,
  Monitor,
  PaintBucket,
} from "lucide-react";

export function HeroSection({ heroVisible }: { heroVisible: boolean }) {
  const quickTags = [
    { icon: Zap,          label: "Electrical"  },
    { icon: Wrench,       label: "Plumbing"    },
    { icon: SprayCan,     label: "Cleaning"    },
    { icon: Leaf,         label: "Landscaping" },
    { icon: Monitor,      label: "IT Help"     },
    { icon: PaintBucket,  label: "Painting"    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .hero-syne   { font-family: 'Syne', sans-serif; }
        .hero-outfit { font-family: 'Outfit', sans-serif; }

        @keyframes hero-float-up {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-12px); }
        }
        @keyframes hero-float-down {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(10px); }
        }
        @keyframes hero-pulse-ring {
          0%   { transform: scale(1);   opacity: .6; }
          100% { transform: scale(1.6); opacity: 0;  }
        }
        @keyframes hero-shimmer {
          0%   { background-position:  200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes hero-scroll-bounce {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(6px); }
        }
        @keyframes hero-ticker {
          0%   { transform: translateX(0);   }
          100% { transform: translateX(-50%); }
        }
        @keyframes hero-grid-fade {
          0%,100% { opacity: .03; }
          50%     { opacity: .07; }
        }
        @keyframes hero-orb-drift {
          0%,100% { transform: translate(0,0)       scale(1);    }
          33%     { transform: translate(30px,-20px) scale(1.05); }
          66%     { transform: translate(-20px,15px) scale(.95);  }
        }

        .hero-float-up   { animation: hero-float-up   5s ease-in-out infinite; }
        .hero-float-down { animation: hero-float-down 6s ease-in-out infinite 1s; }

        .hero-shimmer-text {
          background: linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a,#f59e0b,#d97706);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hero-shimmer 3.5s linear infinite;
        }

        .hero-scroll-bounce  { animation: hero-scroll-bounce 1.8s ease-in-out infinite; }
        .hero-ticker-track   { animation: hero-ticker 22s linear infinite; }
        .hero-grid-pulse     { animation: hero-grid-fade 6s ease-in-out infinite; }
        .hero-orb-drift      { animation: hero-orb-drift 12s ease-in-out infinite; }

        .hero-card-glow {
          box-shadow: 0 0 0 1px rgba(255,255,255,.08),
                      0 8px 32px rgba(0,0,0,.4),
                      0 2px 8px rgba(0,0,0,.3);
          transition: all .3s ease;
        }

        .hero-search-wrap:focus-within {
          box-shadow: 0 0 0 2px rgba(251,191,36,.4), 0 8px 32px rgba(0,0,0,.3);
        }

        .hero-tag-pill { transition: all .2s ease; }
        .hero-tag-pill:hover {
          background: rgba(251,191,36,.15) !important;
          border-color: rgba(251,191,36,.4) !important;
          color: #fbbf24 !important;
          transform: translateY(-1px);
        }
        .hero-tag-pill:hover svg { color: #fbbf24 !important; }

        .hero-bg-section {
          background-image:
            linear-gradient(to bottom,  rgba(10,10,14,.7)  0%, rgba(10,10,14,.5) 100%),
            linear-gradient(to right,   rgba(10,10,14,.97) 0%, rgba(10,10,14,.7) 55%, rgba(10,10,14,.25) 100%),
            url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1800&auto=format&fit=crop&q=80');
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
        }

        /* ── Mobile: darken bg more so text is readable ── */
        @media (max-width: 1023px) {
          .hero-bg-section {
            background-image:
              linear-gradient(rgba(10,10,14,.92), rgba(10,10,14,.92)),
              url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1800&auto=format&fit=crop&q=80');
            background-position: center center;
          }
        }
      `}</style>

      <section className="hero-outfit hero-bg-section relative min-h-screen flex flex-col overflow-hidden">

        {/* grid overlay */}
        <div
          className="hero-grid-pulse absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,1) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(251,191,36,1) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 80% at 80% 50%,black 0%,transparent 100%)",
          }}
        />

        {/* orbs */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          <div className="hero-orb-drift absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(245,158,11,.12) 0%,transparent 70%)" }} />
          <div className="hero-orb-drift absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle,rgba(251,191,36,.08) 0%,transparent 70%)", animationDelay: "4s" }} />
        </div>

        {/* diagonal stripe */}
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden hidden lg:block">
          <div className="absolute"
            style={{
              width: "2px", height: "140%", top: "-20%", left: "37%",
              background: "linear-gradient(to bottom,transparent,rgba(251,191,36,.15),rgba(251,191,36,.08),transparent)",
              transform: "rotate(12deg)", transformOrigin: "top center",
            }}
          />
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 flex-1 flex items-center px-5 sm:px-8 lg:px-12 xl:px-20 pt-24 pb-10 max-w-[1400px] mx-auto w-full">
          <div className="grid lg:grid-cols-[1fr_460px] gap-12 xl:gap-20 w-full items-center">

            {/* ── LEFT ── */}
            <div className="w-full">

              {/* live badge */}
              

              {/* headline */}
              <div
                style={{
                  transition: "all .8s cubic-bezier(.16,1,.3,1) .1s",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                }}
              >
                <h1 className="hero-syne text-[2.4rem] xs:text-[2.8rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.02] tracking-tight mb-5">
                  <span className="text-white block">Find Trusted</span>
                  <span className="hero-shimmer-text block mt-1">Local Pros</span>
                  <span className="text-white/90 block mt-1" style={{ fontSize: "0.85em" }}>Near You.</span>
                </h1>
              </div>

              {/* subtext */}
              <div
                style={{
                  transition: "all .8s cubic-bezier(.16,1,.3,1) .2s",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                }}
              >
                <p className="text-sm sm:text-[15px] text-white/50 leading-relaxed max-w-sm mb-7 font-light">
                  Verified plumbers, electricians, cleaners, IT pros — all in one place, all within reach.
                </p>
              </div>

              {/* search bar */}
              <div
                style={{
                  transition: "all .8s cubic-bezier(.16,1,.3,1) .3s",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                }}
              >
                {/* ── Desktop search (full row) ── */}
                <div
                  className="hero-search-wrap hidden sm:flex items-center gap-2 rounded-2xl p-2 mb-4 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.1)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 px-3 min-w-0">
                    <Search size={15} className="text-amber-400/80 shrink-0" />
                    <input
                      type="text"
                      placeholder='e.g. "Plumber in Davao"'
                      className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder-white/25 focus:outline-none"
                    />
                  </div>
                  <div className="w-px h-6 bg-white/10 shrink-0" />
                  <div className="flex items-center gap-1.5 px-2 shrink-0">
                    <MapPin size={13} className="text-amber-400/70" />
                    <span className="text-xs text-white/40 font-medium">Davao</span>
                    <ChevronDown size={11} className="text-white/30" />
                  </div>
                  <button
                    type="button"
                    className="h-10 px-5 rounded-xl text-sm font-bold text-gray-950 flex items-center gap-2 shrink-0 transition-all hover:brightness-110 active:scale-95"
                    style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)" }}
                  >
                    Search <ArrowRight size={14} />
                  </button>
                </div>

                {/* ── Mobile search (stacked) ── */}
                <div className="sm:hidden mb-4 space-y-2">
                  <div
                    className="flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,.07)",
                      border: "1px solid rgba(255,255,255,.1)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <Search size={15} className="text-amber-400/80 shrink-0" />
                    <input
                      type="text"
                      placeholder='e.g. "Plumber in Davao"'
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="flex items-center gap-2 flex-1 rounded-xl px-3 py-2.5"
                      style={{
                        background: "rgba(255,255,255,.06)",
                        border: "1px solid rgba(255,255,255,.09)",
                      }}
                    >
                      <MapPin size={13} className="text-amber-400/70" />
                      <span className="text-xs text-white/40 font-medium flex-1">Davao City</span>
                      <ChevronDown size={11} className="text-white/25" />
                    </div>
                    <button
                      type="button"
                      className="h-10 px-5 rounded-xl text-sm font-bold text-gray-950 flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-95"
                      style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)" }}
                    >
                      Search <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* quick-tag pills */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {quickTags.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      className="hero-tag-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/50"
                      style={{
                        background: "rgba(255,255,255,.05)",
                        border: "1px solid rgba(255,255,255,.09)",
                      }}
                    >
                      <Icon size={11} className="text-white/40 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* trust badges */}
              <div
                style={{
                  transition: "all .8s cubic-bezier(.16,1,.3,1) .45s",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                }}
                className="flex flex-wrap items-center gap-4 sm:gap-6"
              >
                {[
                  { icon: Shield,  label: "Admin Verified" },
                  { icon: Star,    label: "5-star Rated"   },
                  { icon: Clock,   label: "Same-day"       },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(251,191,36,.12)", border: "1px solid rgba(251,191,36,.2)" }}>
                      <Icon size={12} className="text-amber-400" />
                    </div>
                    <span className="text-xs font-medium text-white/45">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — floating cards (desktop only) ── */}
            <div
              style={{
                transition: "all .9s cubic-bezier(.16,1,.3,1) .35s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateX(0)" : "translateX(40px)",
              }}
              className="hidden lg:block relative h-[520px]"
            >
              {/* main pro card */}
              <div
                className="hero-float-up hero-card-glow absolute top-0 left-0 right-8 rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg,rgba(28,26,22,.95),rgba(20,18,15,.98))",
                  border: "1px solid rgba(255,255,255,.07)",
                  backdropFilter: "blur(24px)",
                }}
              >
                <div className="h-[3px] w-full"
                  style={{ background: "linear-gradient(90deg,#f59e0b,#fbbf24,#fde68a)" }} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
                        <Wrench size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Juan dela Cruz</p>
                        <p className="text-xs text-white/40 mt-0.5">Licensed Plumber · Davao City</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.25)" }}>
                      <BadgeCheck size={11} className="text-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-400">Verified</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-xs text-white/40 ml-1.5">5.0 · 48 reviews</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["Leak Repair","Pipe Install","Emergency"].map(t => (
                      <span key={t} className="text-[10px] font-medium text-amber-400/80 px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.2)" }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { val: "48",   label: "Jobs Done"   },
                      { val: "4 yrs",label: "Experience"  },
                      { val: "~1hr", label: "Response"    },
                    ].map(({ val, label }) => (
                      <div key={label} className="rounded-xl p-2.5 text-center"
                        style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
                        <p className="text-sm font-bold text-white">{val}</p>
                        <p className="text-[9px] text-white/35 mt-0.5 uppercase tracking-wide">{label}</p>
                      </div>
                    ))}
                  </div>

                  <button type="button"
                    className="w-full h-10 rounded-xl text-sm font-bold text-gray-950 flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[.98]"
                    style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)" }}>
                    Send Inquiry <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* notification chip */}
              <div
                className="hero-float-down hero-card-glow absolute top-[200px] -left-6 rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{
                  background: "rgba(20,18,15,.95)",
                  border: "1px solid rgba(255,255,255,.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(251,191,36,.15)", border: "1px solid rgba(251,191,36,.2)" }}>
                  <Bell size={14} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">New inquiry!</p>
                  <p className="text-[10px] text-white/40">from Maria Santos · 2m ago</p>
                </div>
              </div>

              {/* job done card */}
              <div
                className="hero-float-up hero-card-glow absolute bottom-0 right-0 left-10 rounded-3xl p-4"
                style={{
                  background: "rgba(18,17,13,.96)",
                  border: "1px solid rgba(255,255,255,.07)",
                  backdropFilter: "blur(20px)",
                  animationDelay: "1.5s",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-400" />
                    <p className="text-xs font-bold text-white">Job Completed</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.2)" }}>
                    Confirmed ✓
                  </span>
                </div>
                <p className="text-[11px] text-white/40 mb-3">Pipe Repair · Poblacion District, Davao</p>
                <div className="h-1 w-full rounded-full" style={{ background: "rgba(255,255,255,.06)" }}>
                  <div className="h-1 rounded-full w-full"
                    style={{ background: "linear-gradient(90deg,#f59e0b,#fbbf24)" }} />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex -space-x-2">
                    {[["JD","#f59e0b"],["MS","#10b981"],["AR","#6366f1"]].map(([init,bg]) => (
                      <div key={init}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white border border-gray-900"
                        style={{ background: bg }}>
                        {init}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/30">+12 this week</p>
                </div>
              </div>

              {/* 200+ chip */}
              <div className="hero-card-glow absolute top-[270px] right-0 rounded-2xl px-4 py-3"
                style={{ background: "linear-gradient(135deg,rgba(245,158,11,.9),rgba(217,119,6,.95))" }}>
                <p className="hero-syne text-2xl font-extrabold text-white">200+</p>
                <p className="text-[10px] text-white/70 font-medium">Professionals</p>
              </div>

              {/* inquiries chip */}
              <div className="hero-card-glow absolute top-[345px] right-0 rounded-2xl px-3.5 py-2.5 flex items-center gap-2"
                style={{
                  background: "rgba(18,17,13,.95)",
                  border: "1px solid rgba(255,255,255,.07)",
                  backdropFilter: "blur(16px)",
                }}>
                <MessageCircle size={12} className="text-amber-400" />
                <span className="text-[11px] font-semibold text-white/70">12 inquiries today</span>
              </div>
            </div>

            {/* ── Mobile stats row (shows instead of right cards) ── */}
            <div
              style={{
                transition: "all .8s cubic-bezier(.16,1,.3,1) .5s",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              }}
              className="lg:hidden grid grid-cols-3 gap-3 mt-2"
            >
              {[
                { val: "200+", label: "Professionals" },
                { val: "98%",  label: "Satisfaction"  },
                { val: "5.0",  label: "Avg Rating"    },
              ].map(({ val, label }) => (
                <div key={label} className="rounded-2xl p-3 sm:p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.08)",
                    backdropFilter: "blur(12px)",
                  }}>
                  <p className="hero-syne text-xl sm:text-2xl font-extrabold text-amber-400">{val}</p>
                  <p className="text-[10px] text-white/35 mt-1 font-medium uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Ticker bar ── */}
        <div
          className="relative z-10 border-t overflow-hidden py-3"
          style={{ borderColor: "rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)" }}
        >
          <div className="hero-ticker-track flex whitespace-nowrap w-max">
            {[...Array(2)].map((_,si) => (
              <div key={si} className="flex items-center">
                {[
                  { icon: Wrench,        label: "Plumbing"      },
                  { icon: Zap,           label: "Electrical"    },
                  { icon: SprayCan,      label: "Cleaning"      },
                  { icon: Leaf,          label: "Landscaping"   },
                  { icon: MessageCircle, label: "IT Services"   },
                  { icon: BadgeCheck,    label: "Verified Pros" },
                  { icon: Star,          label: "Top Rated"     },
                  { icon: MapPin,        label: "Davao City"    },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={`${si}-${i}`} className="flex items-center gap-8 px-8">
                    <div className="flex items-center gap-2.5">
                      <Icon size={12} className="text-amber-500/60" />
                      <span className="text-xs font-medium text-white/25 uppercase tracking-widest">{label}</span>
                    </div>
                    <span className="text-amber-500/20 text-xs">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* scroll indicator — desktop only */}
        <div
          style={{ transition: "opacity .8s ease 1.2s", opacity: heroVisible ? 1 : 0 }}
          className="absolute bottom-16 left-10 hidden lg:flex flex-col items-center gap-2 z-10"
        >
          <div className="hero-scroll-bounce w-[1px] h-10"
            style={{ background: "linear-gradient(to bottom,rgba(255,255,255,.25),transparent)" }} />
          <span className="text-[9px] font-semibold tracking-[.2em] uppercase text-white/25"
            style={{ writingMode: "vertical-rl" }}>Scroll</span>
        </div>
      </section>
    </>
  );
}