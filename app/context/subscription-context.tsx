"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Plan } from "@/lib/dashboard/types";

type SubscriptionContextType = {
  plan: Plan;
  setPlan: (plan: Plan) => void;
  resetPlan: () => void;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

const VALID_PLANS: Plan[] = ["free", "basic", "pro", "premium"];

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlanState] = useState<Plan>("free");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("nearme-plan") as Plan | null;

    if (savedPlan && VALID_PLANS.includes(savedPlan)) {
      setPlanState(savedPlan);
    } else {
      setPlanState("free");
      localStorage.setItem("nearme-plan", "free");
    }

    setMounted(true);
  }, []);

  const setPlan = (newPlan: Plan) => {
    setPlanState(newPlan);
    localStorage.setItem("nearme-plan", newPlan);
  };

  const resetPlan = () => {
    setPlanState("free");
    localStorage.setItem("nearme-plan", "free");
  };

  if (!mounted) return null;

  return (
    <SubscriptionContext.Provider value={{ plan, setPlan, resetPlan }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }

  return context;
}