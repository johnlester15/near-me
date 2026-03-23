import { Inquiry, Job, JobStatus } from "./types";

export const VIDEO_URL = "https://www.youtube.com/embed/DTzHOdfACPM";

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    customer: "Grace Flores",
    email: "grace@gmail.com",
    phone: "+63 955 123 4567",
    initialMessage:
      "Hi! I need a plumber for a burst pipe in our kitchen. Can you come this weekend?",
    time: "10 min ago",
    read: false,
    avatar: "GF",
    service: "Burst Pipe",
    location: "Davao City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hi! I need a plumber for a burst pipe in our kitchen. Can you come this weekend?",
        time: "10:02 AM",
      },
    ],
  },
  {
    id: 2,
    customer: "Ben Tan",
    email: "ben@gmail.com",
    phone: "+63 966 234 5678",
    initialMessage:
      "Good day! Looking for someone to install a new bathroom set. How much do you charge?",
    time: "1 hr ago",
    read: false,
    avatar: "BT",
    service: "Bathroom Installation",
    location: "Tagum City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Good day! Looking for someone to install a new bathroom set. How much do you charge?",
        time: "9:15 AM",
      },
    ],
  },
  {
    id: 3,
    customer: "Joy Cruz",
    email: "joy@gmail.com",
    phone: "+63 977 345 6789",
    initialMessage:
      "Hello, I need help with a leaking pipe under the sink. Are you available Monday morning?",
    time: "Yesterday",
    read: true,
    avatar: "JC",
    service: "Pipe Leak",
    location: "Digos City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hello, I need help with a leaking pipe under the sink. Are you available Monday morning?",
        time: "Yesterday 2:30 PM",
      },
      {
        id: 2,
        sender: "professional",
        text: "Hi Joy! Yes, I'm available Monday morning. I can be there by 8 AM. Can you send me your full address?",
        time: "Yesterday 3:00 PM",
      },
      {
        id: 3,
        sender: "customer",
        text: "Great! My address is 45 Bonifacio St., Brgy. Zone 2, Digos City. Thank you!",
        time: "Yesterday 3:15 PM",
      },
    ],
  },
  {
    id: 4,
    customer: "Noel Santos",
    email: "noel@gmail.com",
    phone: "+63 988 456 7890",
    initialMessage: "Need full bathroom renovation plumbing. Please send quotation.",
    time: "2 days ago",
    read: true,
    avatar: "NS",
    service: "Bathroom Renovation",
    location: "Davao City",
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Need full bathroom renovation plumbing. Please send quotation.",
        time: "2 days ago 11:00 AM",
      },
      {
        id: 2,
        sender: "professional",
        text: "Hello Noel! My rate starts at ₱8,000. Can we schedule a site visit?",
        time: "2 days ago 11:45 AM",
      },
    ],
  },
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 1,
    customer: "Maria Santos",
    email: "maria@gmail.com",
    phone: "+63 912 111 2222",
    service: "Pipe Repair",
    location: "Davao City",
    address: "123 Quezon Blvd., Brgy. Talomo, Davao City",
    date: "Mar 20, 2025",
    status: "awaiting_confirm",
    avatar: "MS",
    description: "Burst pipe in the kitchen causing water to flood the floor.",
    preferredSchedule: "Anytime this week, preferably morning",
    notes: "Gate code is 1234. Please call before arriving.",
  },
  {
    id: 2,
    customer: "Carlo Reyes",
    email: "carlo@gmail.com",
    phone: "+63 922 333 4444",
    service: "Water Heater Install",
    location: "Tagum City",
    address: "45 Rizal St., Brgy. Visayan Village, Tagum City",
    date: "Mar 18, 2025",
    status: "in_progress",
    avatar: "CR",
    description:
      "Need a new electric water heater installed. Customer already purchased an Ariston 30L unit.",
    preferredSchedule: "Saturday morning, March 22",
    notes: "Second floor bathroom. Bring own tools.",
  },
  {
    id: 3,
    customer: "Ana Lim",
    email: "ana@gmail.com",
    phone: "+63 933 555 6666",
    service: "Drainage Fix",
    location: "Davao City",
    address: "78 Pichon St., Brgy. Agdao, Davao City",
    date: "Mar 15, 2025",
    status: "completed",
    avatar: "AL",
    description: "Slow drainage in bathroom and kitchen.",
    preferredSchedule: "March 15, afternoon",
    notes: "Job completed. Customer confirmed.",
  },
  {
    id: 4,
    customer: "Rodel Manalo",
    email: "rodel@gmail.com",
    phone: "+63 944 777 8888",
    service: "Faucet Replacement",
    location: "Panabo City",
    address: "12 National Highway, Brgy. New Visayas, Panabo City",
    date: "Mar 10, 2025",
    status: "completed",
    avatar: "RM",
    description: "Kitchen faucet leaking at base and handle.",
    preferredSchedule: "March 10, any time",
    notes: "Completed. Water shutoff beside kitchen cabinet.",
  },
];

export const STATUS_CONFIG: Record<
  JobStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  pending: {
    label: "Pending",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  in_progress: {
    label: "In Progress",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  awaiting_confirm: {
    label: "Awaiting Confirm",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  completed: {
    label: "Completed",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  },
};