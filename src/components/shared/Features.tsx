import {
  CalendarCheck,
  MessageSquare,
  Video,
  Upload,
  ClipboardList,
  Download,
  Star,
  RefreshCw,
  ShoppingCart,
  FlaskConical,
  History,
  BarChart3,
  Store,
  CreditCard,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Book Any Doctor",
    desc: "Browse doctor profiles and book an appointment with any specialist by making a secure payment.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: MessageSquare,
    title: "SMS Consultation Link",
    desc: "As soon as a booking is confirmed, a video link is sent via SMS to both the patient and doctor.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Video,
    title: "HD Video Consultation",
    desc: "Attend live video consultations with your doctor from anywhere, on any device.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Upload,
    title: "Upload Medical Reports",
    desc: "Patients can upload previous medical reports so the doctor can review them during the session.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: ClipboardList,
    title: "Smart Prescription Writing",
    desc: "Doctors select medicines and lab tests from a predefined list — faster and error-free.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Download,
    title: "Downloadable Prescription",
    desc: "Patients receive a digital prescription they can download as a PDF at any time.",
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: Star,
    title: "Post-Consultation Feedback",
    desc: "After each session, patients can rate and review their doctor to help others choose.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: RefreshCw,
    title: "Refund on Cancellation",
    desc: "If a consultation fails due to either party, the patient can request a refund (a small fee is deducted).",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: CreditCard,
    title: "Follow-up Discount",
    desc: "Returning patients get a lower consultation fee when booking the same doctor for follow-ups.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: ShoppingCart,
    title: "Order Medicines Online",
    desc: "Order prescribed medicines and pathological tests directly from the platform.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: FlaskConical,
    title: "Lab Test at Home",
    desc: "Order lab tests from your prescription. An additional sample collection fee applies for home pickup.",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: History,
    title: "Consultation History",
    desc: "Full history of past consultations including session duration, prescriptions, and reports.",
    color: "bg-slate-100 text-slate-600",
  },
  {
    icon: BarChart3,
    title: "Admin Revenue Dashboard",
    desc: "Consultation fees are split between doctors and the platform. Financial data is visible to admins only.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Store,
    title: "Platform eCommerce Store",
    desc: "Browse and purchase the platform's own health products — available to all customers.",
    color: "bg-green-100 text-green-600",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm font-medium text-primary mb-1">Everything You Need</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Why Choose MediConnect?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
          A complete healthcare ecosystem — from booking to prescription to medicine delivery.
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {features.map(({ icon: Icon, title, desc, color }) => (
          <div
            key={title}
            className="bg-white border border-border/60 rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-foreground mb-1.5">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
