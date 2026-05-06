import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Clock, Star, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Verified Doctors" },
  { icon: Star, value: "4.9★", label: "Avg. Rating" },
  { icon: Clock, value: "24/7", label: "Available" },
  { icon: Shield, value: "100%", label: "Secure Payments" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Trusted by 50,000+ patients across Bangladesh
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-tight">
            Quality Healthcare,{" "}
            <span className="text-primary">Anywhere, Anytime</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Book certified doctors, attend HD video consultations, receive
            digital prescriptions, and order medicines — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Link href="/find-doctor">
              <Button size="lg" className="shadow-md px-8">
                Find a Doctor
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8">
              Order Medicines
            </Button>
          </div>

          {/* Search bar */}
          {/* <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 bg-white border border-border rounded-2xl px-4 py-2 shadow-lg">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <Input
                placeholder="Search by doctor name, specialty, or condition..."
                className="border-none focus-visible:ring-0 bg-transparent text-sm"
              />
            <Link href="/find-doctor">
              <Button size="sm" className="rounded-xl shrink-0">
                Search
              </Button>
            </Link>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Popular: Cardiologist · Dermatologist · General Physician · Pediatrician
            </p>
          </div> */}
        </div>

        {/* Stats row */}
        {/* <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-white/70 backdrop-blur rounded-2xl border border-border/60 p-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">{value}</span>
              <span className="text-xs text-muted-foreground text-center">
                {label}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
