import { Search, CreditCard, MessageSquare, Video, FileText, Download } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find a Doctor",
    desc: "Browse verified specialists by specialty, rating, or availability.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: CreditCard,
    title: "Book & Pay",
    desc: "Secure online payment. First visit and follow-up pricing available.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: MessageSquare,
    title: "Get SMS Link",
    desc: "Instant consultation link sent via SMS to both doctor and patient.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: Video,
    title: "Video Consult",
    desc: "Join HD video call. Upload reports for the doctor to review live.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Get Prescription",
    desc: "Doctor writes a digital prescription with medicines & lab tests.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Download,
    title: "Download & Order",
    desc: "Download your prescription and order medicines or tests directly.",
    color: "bg-rose-100 text-rose-600",
  },
];

export default function FlowSteps() {
  return (
    <section className="bg-muted/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary mb-1">Simple Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            How MediConnect Works
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
            From booking to prescription in 6 easy steps — everything digital, everything fast.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                {i + 1}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>

              {/* Connector dot */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-border z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
