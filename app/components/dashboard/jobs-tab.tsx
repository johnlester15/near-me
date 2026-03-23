"use client";

import { AlertCircle, CheckCircle, CheckSquare, Clock, Eye, MapPin, X, Calendar, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { INITIAL_JOBS, STATUS_CONFIG } from "../../lib/dashboard/mock-data";
import { Job } from "../../lib/dashboard/types";
import { AvatarBubble, InfoRow, Reveal } from "./shared";

function JobDetailModal({
  job,
  onClose,
  onMarkDone,
}: {
  job: Job;
  onClose: () => void;
  onMarkDone: (id: number) => void;
}) {
  const [confirmDone, setConfirmDone] = useState(false);
  const s = STATUS_CONFIG[job.status];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] flex flex-col rounded-t-3xl bg-white overflow-hidden shadow-2xl md:inset-0 md:m-auto md:max-w-lg md:max-h-[88vh] md:rounded-3xl">
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shrink-0" />
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <CheckSquare size={15} className="text-amber-500" />
            <p className="text-sm font-extrabold text-gray-900">Job Details</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
              {s.label}
            </span>
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <X size={13} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="flex items-center gap-4 bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <AvatarBubble initials={job.avatar} size="lg" />
            <div>
              <p className="text-base font-extrabold text-gray-900">{job.customer}</p>
              <p className="text-xs font-semibold text-amber-600 mb-1">{job.service}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={10} className="text-amber-500" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={10} className="text-amber-500" />
                  {job.date}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Contact</p>
            <InfoRow Icon={Mail} label="Gmail" value={job.email} />
            <InfoRow Icon={Phone} label="Contact Number" value={job.phone} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">What They Need</p>
            <div className="bg-gray-50 rounded-xl p-3.5">
              <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Location & Schedule</p>
            <InfoRow Icon={MapPin} label="Full Address" value={job.address} />
            <InfoRow Icon={Clock} label="Preferred Schedule" value={job.preferredSchedule} />
          </div>

          {job.status === "in_progress" && !confirmDone && (
            <button
              onClick={() => setConfirmDone(true)}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-400 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-amber-200"
            >
              <CheckCircle size={16} /> Mark as Job Done
            </button>
          )}

          {job.status === "in_progress" && confirmDone && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
              <div className="flex items-start gap-2.5 mb-4">
                <AlertCircle size={15} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-orange-800 mb-0.5">Confirm Job Completion?</p>
                  <p className="text-xs text-orange-600 leading-relaxed">
                    Notification sent to <span className="font-bold">{job.customer}</span>. Jobs Done updates after they confirm.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmDone(false)}
                  className="flex-1 h-9 rounded-xl border border-orange-200 text-orange-600 text-xs font-bold hover:bg-orange-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onMarkDone(job.id);
                    onClose();
                  }}
                  className="flex-1 h-9 rounded-xl bg-orange-500 text-white text-xs font-bold hover:opacity-90 transition-all shadow-sm"
                >
                  Yes, Mark Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function JobsTab() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState<"all" | "in_progress" | "awaiting_confirm" | "completed">("all");

  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);

  const counts = {
    all: jobs.length,
    in_progress: jobs.filter((j) => j.status === "in_progress").length,
    awaiting_confirm: jobs.filter((j) => j.status === "awaiting_confirm").length,
    completed: jobs.filter((j) => j.status === "completed").length,
  };

  return (
    <div>
      <div className="mb-7">
        <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">Job Management</p>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Track Your Jobs</h1>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <CheckSquare size={17} className="text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Job Tracker</h2>
          <p className="text-xs text-gray-400">Click any job to view full details</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { key: "all", label: `All (${counts.all})` },
          { key: "in_progress", label: `In Progress (${counts.in_progress})` },
          { key: "awaiting_confirm", label: `Awaiting (${counts.awaiting_confirm})` },
          { key: "completed", label: `Done (${counts.completed})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as typeof filter)}
            className={`h-8 px-4 rounded-full text-xs font-bold transition-all ${
              filter === key ? "bg-amber-500 text-white shadow-sm" : "bg-white text-gray-500 border border-gray-100 hover:border-amber-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((job, i) => {
          const s = STATUS_CONFIG[job.status];
          return (
            <Reveal key={job.id} delay={i * 60} direction="up">
              <button
                onClick={() => setSelectedJob(job)}
                className="w-full text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <AvatarBubble initials={job.avatar} size="md" />
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {job.customer}
                      </p>
                      <p className="text-xs font-semibold text-amber-600 mb-1.5">{job.service}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {job.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}>
                      {s.label}
                    </span>
                    <span className="text-[10px] text-gray-400 group-hover:text-amber-500 flex items-center gap-1 transition-colors">
                      <Eye size={10} /> View
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onMarkDone={(id) => {
            setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: "awaiting_confirm" } : j)));
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
}