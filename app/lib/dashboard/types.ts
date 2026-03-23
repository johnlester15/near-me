export type Plan = "free" | "basic" | "pro" | "premium";

export type JobStatus =
  | "pending"
  | "in_progress"
  | "awaiting_confirm"
  | "completed";

export type ChatMessage = {
  id: number;
  sender: "customer" | "professional";
  text: string;
  time: string;
};

export type Inquiry = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  initialMessage: string;
  time: string;
  read: boolean;
  avatar: string;
  service: string;
  location: string;
  messages: ChatMessage[];
};

export type Job = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  date: string;
  status: JobStatus;
  avatar: string;
  description: string;
  address: string;
  preferredSchedule: string;
  notes: string;
};
