"use client";

import {
  Briefcase,
  Camera,
  CheckCircle,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { PLAN_CONFIG } from "../../lib/dashboard/config";
import { VIDEO_URL } from "../../lib/dashboard/mock-data";
import { Plan } from "../../lib/dashboard/types";
import { CredentialsCard, UpgradeBanner } from "./shared";
import VideoManager from "./video-manager";

export default function ProfileTab({ plan }: { plan: Plan }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [videoUrl, setVideoUrl] = useState(plan === "premium" ? VIDEO_URL : undefined);

  const [form, setForm] = useState({
    name: "Juan dela Cruz",
    type: "Individual Professional",
    category: "Licensed Plumber",
    bio: "With over 8 years of hands-on experience in residential and commercial plumbing.",
    phone: "+63 912 345 6789",
    email: "juan.delacruz@gmail.com",
    address: "Brgy. Talomo, Davao City",
  });

  const cfg = PLAN_CONFIG[plan];
  const Icon = cfg.Icon;

  return (
    <div className="space-y-5 pb-10">
      <div className="mb-7">
        <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">Your Profile</p>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Manage Your Profile</h1>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-green-50 border border-green-200">
          <CheckCircle size={15} className="text-green-500" />
          <p className="text-sm font-bold text-green-700">Profile updated!</p>
        </div>
      )}

      <div className="relative">
        <div className="h-36 rounded-2xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <button className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/25 text-white text-[11px] font-bold backdrop-blur-sm">
            <Camera size={11} /> Change Cover
          </button>
        </div>

        <div className="absolute -bottom-8 left-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <Wrench size={26} className="text-amber-600" strokeWidth={1.6} />
              </div>
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-sm">
              <Camera size={10} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-10 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-gray-900">{form.name}</h2>
          <p className="text-xs font-semibold text-amber-600">
            {form.category} · {form.type}
          </p>
          <div className={`inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-full ${cfg.bg} border ${cfg.border}`}>
            <Icon size={11} className={cfg.textColor} />
            <span className={`text-[10px] font-bold ${cfg.textColor}`}>{cfg.label} Plan</span>
          </div>
        </div>

        <button
          onClick={() => {
            if (editing) {
              setSaved(true);
              setTimeout(() => setSaved(false), 3000);
            }
            setEditing(!editing);
          }}
          className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold transition-all shrink-0 ${
            editing
              ? "bg-amber-500 text-white shadow-md"
              : "border border-gray-200 text-gray-600 hover:border-amber-300 bg-white"
          }`}
        >
          {editing ? (
            <>
              <Save size={13} /> Save
            </>
          ) : (
            <>
              <Edit3 size={13} /> Edit
            </>
          )}
        </button>
      </div>

      {plan === "free" && (
        <UpgradeBanner currentPlan="free" targetPlan="basic" message="Your profile is hidden - subscribe to go live!" />
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3.5">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Basic Info</p>

        {[
          { key: "name", label: "Name", Icon: User },
          { key: "category", label: "Category", Icon: Briefcase },
          { key: "phone", label: "Phone", Icon: Phone },
          { key: "email", label: "Gmail", Icon: Mail },
          { key: "address", label: "Address", Icon: MapPin },
        ].map(({ key, label, Icon }) => (
          <div key={key}>
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              {label}
            </label>
            <div className="relative">
              <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                disabled={!editing}
                className={`w-full h-10 pl-9 pr-3 rounded-xl border text-sm text-gray-800 transition-all ${
                  editing
                    ? "border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                    : "border-gray-100 bg-gray-50 text-gray-600 cursor-default"
                }`}
              />
            </div>
          </div>
        ))}

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Bio</label>
          <textarea
            rows={3}
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            disabled={!editing}
            className={`w-full px-3 py-2.5 rounded-xl border text-sm text-gray-800 transition-all resize-none ${
              editing
                ? "border-amber-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                : "border-gray-100 bg-gray-50 text-gray-600 cursor-default"
            }`}
          />
        </div>
      </div>

      <VideoManager plan={plan} videoUrl={videoUrl} onSave={(url) => setVideoUrl(url)} />

      <CredentialsCard />

      {plan !== "premium" && (
        <UpgradeBanner
          currentPlan={plan}
          targetPlan="premium"
          message="Unlock all Premium features for maximum exposure"
        />
      )}
    </div>
  );
}
