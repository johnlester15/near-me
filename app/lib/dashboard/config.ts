import { BadgeCheck, Crown, User, Zap } from "lucide-react";
import { Plan } from "./types";

export const PLAN_CONFIG: Record<
  Plan,
  {
    label: string;
    price: string;
    gradient: string;
    bg: string;
    border: string;
    textColor: string;
    badgeBg: string;
    Icon: React.ElementType;
    features: string[];
    limits: {
      inquiries: string;
      visibility: string;
      position: string;
      video: boolean;
      featured: boolean;
      analytics: boolean;
    };
  }
> = {
  free: {
    label: "Free",
    price: "₱0/mo",
    gradient: "from-gray-500 to-gray-400",
    bg: "bg-gray-50",
    border: "border-gray-200",
    textColor: "text-gray-600",
    badgeBg: "bg-gray-100",
    Icon: User,
    features: [
      "Visible to customers (limited)",
      "3 inquiries per month",
      "Listed at bottom of results",
    ],
    limits: {
      inquiries: "3/month",
      visibility: "Bottom listing",
      position: "Last",
      video: false,
      featured: false,
      analytics: false,
    },
  },
  basic: {
    label: "Basic",
    price: "₱199/mo",
    gradient: "from-blue-500 to-blue-400",
    bg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-600",
    badgeBg: "bg-blue-100",
    Icon: BadgeCheck,
    features: [
      "Unlimited inquiries",
      "Full visibility",
      "Verified badge",
      "Listed in all results",
    ],
    limits: {
      inquiries: "Unlimited",
      visibility: "Full listing",
      position: "Standard",
      video: false,
      featured: false,
      analytics: false,
    },
  },
  pro: {
    label: "Pro",
    price: "₱399/mo",
    gradient: "from-purple-500 to-purple-400",
    bg: "bg-purple-50",
    border: "border-purple-200",
    textColor: "text-purple-600",
    badgeBg: "bg-purple-100",
    Icon: Zap,
    features: [
      "Featured section placement",
      "Priority in search results",
      "Analytics dashboard",
      "Unlimited inquiries",
    ],
    limits: {
      inquiries: "Unlimited",
      visibility: "Featured section",
      position: "Priority",
      video: false,
      featured: true,
      analytics: true,
    },
  },
  premium: {
    label: "Premium",
    price: "₱699/mo",
    gradient: "from-amber-500 to-amber-400",
    bg: "bg-amber-50",
    border: "border-amber-200",
    textColor: "text-amber-600",
    badgeBg: "bg-amber-100",
    Icon: Crown,
    features: [
      "Sponsored top placement",
      "Introduction video on profile",
      "Maximum exposure",
      "Analytics + priority support",
    ],
    limits: {
      inquiries: "Unlimited",
      visibility: "Sponsored top",
      position: "Top",
      video: true,
      featured: true,
      analytics: true,
    },
  },
};