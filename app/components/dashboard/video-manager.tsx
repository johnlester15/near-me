"use client";

import {
  CheckCircle,
  Crown,
  ExternalLink,
  Link2,
  Lock,
  Play,
  Upload,
  Video,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Plan } from "../../lib/dashboard/types";

type VideoManagerProps = {
  plan: Plan;
  videoUrl?: string;
  onSave: (url: string) => void;
};

function toEmbedUrl(url: string) {
  const watch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;

  const short = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;

  return url;
}

export default function VideoManager({ plan, videoUrl, onSave }: VideoManagerProps) {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [input, setInput] = useState(videoUrl ?? "");
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const previewUrl = useMemo(() => {
    if (mode === "upload") return uploadedPreviewUrl;
    if (!input.trim()) return "";
    return toEmbedUrl(input.trim());
  }, [input, mode, uploadedPreviewUrl]);

  const isYouTubeEmbed = previewUrl.includes("youtube.com/embed/");

  useEffect(() => {
    return () => {
      if (uploadedPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(uploadedPreviewUrl);
      }
    };
  }, [uploadedPreviewUrl]);

  function handleUpload(file: File | null) {
    if (!file) return;

    if (uploadedPreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(uploadedPreviewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadedPreviewUrl(objectUrl);
    setMode("upload");
  }

  function handleSave() {
    if (!previewUrl) return;
    onSave(previewUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (plan !== "premium") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Introduction Video</p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
            <Lock size={10} className="text-gray-500" />
            <span className="text-[10px] font-bold text-gray-600">Premium Only</span>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
            <Video size={22} className="text-gray-400" />
          </div>
          <p className="text-sm font-bold text-gray-700 mb-1">Feature Locked</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Upgrade to <span className="font-bold text-amber-600">Premium</span> to use Video Manager and show a video intro on your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Introduction Video</p>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
            <Crown size={10} className="text-amber-600" />
            <span className="text-[10px] font-bold text-amber-600">Premium</span>
          </div>
        </div>
        {saved && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle size={13} />
            <span className="text-xs font-bold">Saved</span>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`h-9 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
            mode === "url"
              ? "border-amber-300 bg-amber-50 text-amber-700"
              : "border-gray-200 bg-white text-gray-600"
          }`}
        >
          <Link2 size={13} /> Paste URL
        </button>

        <label
          className={`h-9 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mode === "upload"
              ? "border-amber-300 bg-amber-50 text-amber-700"
              : "border-gray-200 bg-white text-gray-600"
          }`}
        >
          <Upload size={13} /> Upload Video
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      {mode === "url" && (
        <div className="mb-4">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Video URL
          </label>
          <div className="relative">
            <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
          </div>
        </div>
      )}

      {previewUrl && (
        <div className="mb-4">
          <div className="relative w-full rounded-xl overflow-hidden bg-gray-900" style={{ paddingBottom: "56.25%" }}>
            {isYouTubeEmbed ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`${previewUrl}?rel=0&modestbranding=1&playsinline=1`}
                title="Video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={previewUrl}
                controls
                playsInline
              />
            )}
          </div>
          <p className="mt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
            <Play size={11} className="text-amber-500" /> Preview ready
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!previewUrl}
          className="flex-1 h-10 rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 text-white text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Video
        </button>

        {mode === "url" && input.trim() && (
          <a
            href={input.trim()}
            target="_blank"
            rel="noreferrer"
            className="h-10 px-3 rounded-xl border border-gray-200 text-gray-600 hover:border-amber-300 transition-all inline-flex items-center justify-center"
            aria-label="Open source URL"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
