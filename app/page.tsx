"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HomeAnimationStyles } from "@/components/landing/home-animation-styles";
import { SignInModal, SignUpModal } from "@/components/landing/modals";
import {
  AdvertiseSection,
  CategoriesSection,
  HeroSection,
  HomeFooter,
  HomeNavbar,
  HowItWorksSection,
} from "@/components/landing/sections";

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
      <HomeAnimationStyles />

      <HomeNavbar
        scrolled={scrolled}
        mobileMenu={mobileMenu}
        onToggleMobileMenu={() => setMobileMenu((value) => !value)}
        onOpenSignIn={() => {
          setModal("signin");
          setMobileMenu(false);
        }}
        onOpenSignUp={() => {
          setModal("signup");
          setMobileMenu(false);
        }}
        onCloseMobileMenu={() => setMobileMenu(false)}
      />

      <HeroSection heroVisible={heroVisible} />
      <CategoriesSection />
      <HowItWorksSection />
      <AdvertiseSection
        onOpenSignIn={() => setModal("signin")}
        onOpenSignUp={() => setModal("signup")}
      />
      <HomeFooter />

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
