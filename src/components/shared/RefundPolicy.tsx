import { ShieldCheck, AlertCircle, Clock, BadgePercent } from "lucide-react";

const steps = [
  {
    icon: AlertCircle,
    title: "Issue Reported",
    desc: "Patient or doctor reports that the consultation could not take place.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Request Reviewed",
    desc: "Our support team verifies the cancellation within 24 hours.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BadgePercent,
    title: "Small Fee Deducted",
    desc: "A nominal processing fee is deducted before the refund is processed.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: Clock,
    title: "Refund Processed",
    desc: "The remaining amount is refunded to the original payment method within 3–5 business days.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function RefundPolicy() {
  return (
    <section className="bg-muted/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-medium text-primary mb-1">Patient Protection</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Refund Policy
          </h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xl mx-auto">
            If a consultation cannot take place due to a problem from either the doctor or patient,
            you are eligible for a refund — a small processing fee will be deducted.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border/60 p-5 shadow-sm text-center">
              <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground mx-auto mb-3">
                {i + 1}
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1.5">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs text-muted-foreground mt-8 max-w-lg mx-auto">
          Refund eligibility must be claimed within <span className="font-medium text-foreground">24 hours</span> of the scheduled consultation time.
          Full terms and conditions apply.
        </p>
      </div>
    </section>
  );
}
