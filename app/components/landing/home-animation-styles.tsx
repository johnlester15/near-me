"use client";

export function HomeAnimationStyles() {
  return (
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
  );
}
