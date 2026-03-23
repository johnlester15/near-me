"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { INITIAL_INQUIRIES } from "@/lib/dashboard/mock-data";
import { useSubscription } from "@/contexts/subscription-context";
import { PLAN_CONFIG } from "@/lib/dashboard/config";
import { Plan } from "../../lib/dashboard/types";
import { CheckCircle, Crown, Loader2 } from "lucide-react";

const PLAN_ORDER: Plan[] = ["free", "basic", "pro", "premium"];
const VALID_PLANS: Plan[] = ["free", "basic", "pro", "premium"];

export default function BillingPage() {
  const unreadInquiries = INITIAL_INQUIRIES.filter((i) => !i.read).length;
  const { plan, setPlan } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const payment = searchParams.get("payment");
  const paidPlan = searchParams.get("plan") as Plan | null;

  useEffect(() => {
    if (
      payment === "success" &&
      paidPlan &&
      VALID_PLANS.includes(paidPlan)
    ) {
      setPlan(paidPlan);

      const timeout = setTimeout(() => {
        router.replace("/dashboard/billing");
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [payment, paidPlan, setPlan, router]);

  const currentIndex = PLAN_ORDER.indexOf(plan);
  const availableUpgrades = PLAN_ORDER.filter(
    (p) => PLAN_ORDER.indexOf(p) > currentIndex
  );

  const handleSubscribe = async (selectedPlan: Plan) => {
    try {
      setLoadingPlan(selectedPlan);

      const res = await fetch("/api/paymongo/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: selectedPlan }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create checkout session.");
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error(error);
      alert("Unable to start checkout.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <DashboardShell plan={plan} unreadInquiries={unreadInquiries}>
      <div className="mb-7">
        <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">
          Subscription
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          Billing & Plans
        </h1>
      </div>

      <div className="space-y-5">
        {payment === "success" && paidPlan && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            Payment successful. Your plan is now{" "}
            <span className="uppercase">{paidPlan}</span>.
          </div>
        )}

        {payment === "cancelled" && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            Payment cancelled. Your current plan was not changed.
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
            Current Plan
          </p>

          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${PLAN_CONFIG[plan].gradient} flex items-center justify-center`}
            >
              {(() => {
                const Icon = PLAN_CONFIG[plan].Icon;
                return <Icon size={22} className="text-white" />;
              })()}
            </div>

            <div className="flex-1">
              <p className="text-lg font-extrabold text-gray-900">
                {PLAN_CONFIG[plan].label} — {PLAN_CONFIG[plan].price}
              </p>
              <p className="text-sm text-gray-500">
                This is your active subscription right now.
              </p>
            </div>

            <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
              <CheckCircle size={15} /> Active
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {availableUpgrades.length > 0 ? (
            availableUpgrades.map((p) => {
              const cfg = PLAN_CONFIG[p];
              const Icon = cfg.Icon;
              const isLoading = loadingPlan === p;

              return (
                <div
                  key={p}
                  className={`rounded-2xl border ${cfg.border} bg-white overflow-hidden shadow-sm`}
                >
                  <div className={`bg-gradient-to-r ${cfg.gradient} p-4 text-white`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={18} />
                      <p className="font-extrabold text-lg">{cfg.label}</p>
                    </div>
                    <p className="text-sm font-semibold">{cfg.price}</p>
                  </div>

                  <div className="p-4">
                    <div className="space-y-2 mb-4">
                      {cfg.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle size={14} className={cfg.textColor} />
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSubscribe(p)}
                      disabled={isLoading}
                      className={`w-full h-10 rounded-xl text-white text-sm font-bold bg-gradient-to-r ${cfg.gradient} hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center gap-2`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Subscribe to {cfg.label}</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="md:col-span-3 bg-white rounded-2xl border border-amber-200 p-6 text-center shadow-sm">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center mb-3">
                <Crown size={24} className="text-white" />
              </div>
              <p className="text-lg font-extrabold text-gray-900 mb-1">
                You are already on Premium
              </p>
              <p className="text-sm text-gray-500">
                All best features are already unlocked.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}