import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  FlaskConical,
  Store,
  ArrowRight,
  Truck,
  Pill,
  Home,
  Clock,
  Droplets,
  Shield,
  CheckCircle2,
  Zap,
  Heart,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import { allMedicines } from "@/lib/medicines";
import { allTests } from "@/lib/tests";

const showcaseMedicines = allMedicines.slice(0, 6);
const showcaseTests = allTests.slice(0, 6);

const products = [
  {
    name: "MediConnect Pulse Oximeter",
    category: "Device",
    price: 1200,
    desc: "Fingertip SpO₂ & pulse rate monitor",
    icon: Heart,
    gradient: "from-rose-100 to-pink-50",
    iconColor: "text-rose-500",
  },
  {
    name: "Digital Thermometer",
    category: "Device",
    price: 450,
    desc: "Fast 1-second read, fever alarm",
    icon: Zap,
    gradient: "from-amber-100 to-yellow-50",
    iconColor: "text-amber-500",
  },
  {
    name: "BP Monitor (Wrist)",
    category: "Device",
    price: 2800,
    desc: "Automatic blood pressure & pulse tracker",
    icon: Stethoscope,
    gradient: "from-sky-100 to-cyan-50",
    iconColor: "text-sky-500",
  },
  {
    name: "Multivitamin Gummies",
    category: "Supplement",
    price: 380,
    desc: "Daily essential vitamins A, C, D & zinc",
    icon: Pill,
    gradient: "from-violet-100 to-purple-50",
    iconColor: "text-violet-500",
  },
  {
    name: "Immunity Booster Pack",
    category: "Supplement",
    price: 750,
    desc: "Vitamin C + Elderberry + Zinc blend",
    icon: Shield,
    gradient: "from-emerald-100 to-green-50",
    iconColor: "text-emerald-500",
  },
  {
    name: "First Aid Kit (Basic)",
    category: "Safety",
    price: 990,
    desc: "30-piece kit for home & travel emergencies",
    icon: CheckCircle2,
    gradient: "from-teal-100 to-cyan-50",
    iconColor: "text-teal-500",
  },
];

const trustPoints = [
  { icon: Truck, label: "Free delivery over ৳500" },
  { icon: CheckCircle2, label: "100% genuine medicines" },
  { icon: Clock, label: "Same-day dispatch" },
  { icon: Home, label: "Home sample collection" },
];

const badgeStyle: Record<string, string> = {
  Rx: "bg-rose-50 text-rose-600 border-rose-200",
  Popular: "bg-amber-50 text-amber-600 border-amber-200",
  OTC: "bg-emerald-50 text-emerald-600 border-emerald-200",
};

export default function Shop() {
  return (
    <section
      id="shop"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* ── Section Header ──────────────────────────────────────── */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full mb-3">
              <ShoppingCart className="w-3.5 h-3.5" />
              One-Stop Health Store
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Medicines, Tests &amp; More
            </h2>
            <p className="text-muted-foreground mt-2 text-base max-w-xl">
              Order directly from your prescription or browse our full
              catalogue—all in one place.
            </p>
          </div>
          <Button className="shrink-0 gap-2 h-10 px-5 rounded-xl">
            Full catalogue <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Trust bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 bg-muted/60 rounded-xl px-4 py-3 text-sm text-muted-foreground"
            >
              <Icon className="w-4 h-4 text-primary shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Medicines ─────────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Pill className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground leading-none">
                Medicines
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {allMedicines.length}+ products available
              </p>
            </div>
          </div>
          <Link
            href="/medicines/paracetamol-500mg"
            className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            Browse all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseMedicines.map((item) => (
            <div
              key={item.slug}
              className="group bg-white border border-border/60 rounded-2xl p-4 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}
                >
                  <Pill className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/medicines/${item.slug}`}
                      className="font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    {item.badge && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 shrink-0 font-medium ${badgeStyle[item.badge] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.brand}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] bg-secondary/60 text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                  {item.form}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {item.packSize}
                </span>
                {item.inStock ? (
                  <span className="ml-auto text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    In Stock
                  </span>
                ) : (
                  <span className="ml-auto text-[10px] text-rose-500 font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-lg text-foreground leading-none">
                    ৳{item.price}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    / {item.packSize.split(" ")[0]} {item.packSize.split(" ")[1]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link href={`/medicines/${item.slug}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs px-2.5 rounded-lg"
                    >
                      Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="h-8 text-xs gap-1.5 px-3 rounded-lg"
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-3 h-3" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lab Tests ─────────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <FlaskConical className="w-4.5 h-4.5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-bold text-foreground leading-none">
                Lab Tests
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Home collection +৳100 · {allTests.length}+ tests
              </p>
            </div>
          </div>
          <Link
            href="/tests/cbc"
            className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            Browse all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseTests.map((t) => (
            <div
              key={t.slug}
              className="group bg-white border border-border/60 rounded-2xl p-4 hover:shadow-lg hover:shadow-black/5 hover:border-violet-200 transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-11 h-11 rounded-xl ${t.color} flex items-center justify-center shrink-0`}
                >
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/tests/${t.slug}`}
                    className="font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2 block"
                  >
                    {t.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.category}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                <span className="text-[10px] flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {t.turnaround}
                </span>
                <span className="text-[10px] flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                  <Droplets className="w-3 h-3" />
                  {t.sampleType}
                </span>
                {t.homeCollection && (
                  <span className="text-[10px] flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
                    <Home className="w-3 h-3" />
                    Home collection
                  </span>
                )}
                {t.fastingRequired && (
                  <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                    Fasting {t.fastingHours}h
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <div>
                  <span className="font-bold text-lg text-foreground leading-none">
                    ৳{t.price}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    +৳{t.collectionFee} home collection
                  </p>
                </div>
                <Link href={`/tests/${t.slug}`}>
                  <Button size="sm" className="h-8 text-xs gap-1.5 px-3 rounded-lg">
                    Book Test
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Platform store ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-accent/60 flex items-center justify-center">
            <Store className="w-4.5 h-4.5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-foreground leading-none">
              Our Store
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Platform&apos;s own health products &amp; devices
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <Card
                key={p.name}
                className="group p-0 overflow-hidden border-border/60 hover:shadow-lg hover:shadow-black/5 hover:border-primary/20 transition-all duration-200"
              >
                <div
                  className={`w-full h-32 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative`}
                >
                  <Icon
                    className={`w-12 h-12 ${p.iconColor} opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-200`}
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-3 left-3 text-[10px] px-2 py-0.5 font-medium"
                  >
                    {p.category}
                  </Badge>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm text-foreground mb-1 leading-snug">
                    {p.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    {p.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-foreground">
                      ৳{p.price}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs gap-1.5 px-3 rounded-lg"
                    >
                      <ShoppingCart className="w-3 h-3" /> Add to cart
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
