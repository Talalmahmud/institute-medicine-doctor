"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ShoppingCart,
  Minus,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Info,
  Thermometer,
  Package,
  Clock,
  BookOpen,
  ArrowLeft,
  Pill,
} from "lucide-react";
import { allMedicines, type Medicine } from "@/lib/medicines";

const TABS = ["Overview", "Dosage", "Side Effects", "Warnings"] as const;
type Tab = (typeof TABS)[number];

function RxBadge({ rx }: { rx: boolean }) {
  return rx ? (
    <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold px-2.5 py-1 rounded-full">
      <AlertTriangle className="w-3 h-3" /> Prescription Required
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full">
      <CheckCircle2 className="w-3 h-3" /> Over the Counter
    </span>
  );
}

function RelatedCard({ med }: { med: Medicine }) {
  return (
    <Link
      href={`/medicines/${med.slug}`}
      className="flex items-center gap-3 p-3 rounded-2xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group"
    >
      <div className={`w-10 h-10 rounded-xl ${med.color} flex items-center justify-center shrink-0`}>
        <Pill className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{med.name}</p>
        <p className="text-xs text-muted-foreground">{med.brand} · {med.form}</p>
      </div>
      <span className="text-sm font-bold text-primary">৳{med.price}</span>
    </Link>
  );
}

export default function MedicineDetailClient({ medicine }: { medicine: Medicine }) {
  const [tab, setTab]       = useState<Tab>("Overview");
  const [qty, setQty]       = useState(1);
  const [added, setAdded]   = useState(false);

  const related = allMedicines.filter((m) => medicine.relatedSlugs.includes(m.slug));

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/#shop" className="hover:text-primary transition-colors">Medicines</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{medicine.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/#shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to medicines
        </Link>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 mb-6">
          {/* Left — Info */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Icon */}
              <div className={`w-24 h-24 rounded-2xl ${medicine.color} flex items-center justify-center shrink-0 mx-auto sm:mx-0`}>
                <Pill className="w-12 h-12" />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <RxBadge rx={medicine.prescriptionRequired} />
                  {medicine.inStock ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">In Stock</span>
                  ) : (
                    <span className="text-xs font-semibold text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-200">Out of Stock</span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">{medicine.name}</h1>
                <p className="text-muted-foreground text-sm mb-3">{medicine.genericName}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-primary" />
                    <span><strong className="text-foreground">{medicine.brand}</strong> by {medicine.manufacturer}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Form",     value: medicine.form },
                    { label: "Strength", value: medicine.strength },
                    { label: "Pack",     value: medicine.packSize },
                    { label: "Category", value: medicine.category },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-muted/60 rounded-xl px-3 py-2 text-xs">
                      <span className="text-muted-foreground">{label}: </span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Buy card */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">Price per pack</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-primary">৳{medicine.price}</span>
                <span className="text-sm text-muted-foreground">{medicine.packSize}</span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-lg">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-muted-foreground ml-1">
                  = <strong className="text-foreground">৳{medicine.price * qty}</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <Button
                className="w-full gap-2"
                disabled={!medicine.inStock}
                onClick={handleAdd}
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </Button>
              <Button variant="outline" className="w-full" disabled={!medicine.inStock}>
                Buy Now
              </Button>
            </div>

            {medicine.prescriptionRequired && (
              <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>A valid prescription is required. Upload during checkout.</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Detail Tabs ───────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-border shadow-sm mb-6 overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-border overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                  tab === t
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview */}
            {tab === "Overview" && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{medicine.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Uses & Indications
                  </h3>
                  <ul className="space-y-2">
                    {medicine.uses.map((u) => (
                      <li key={u} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Dosage */}
            {tab === "Dosage" && (
              <div className="space-y-5">
                {[
                  { icon: Pill,  label: "Dose",      value: medicine.dosage },
                  { icon: Clock, label: "Frequency",  value: medicine.frequency },
                  { icon: BookOpen, label: "Duration", value: medicine.duration },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-muted/40 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-sm text-foreground font-medium">{value}</p>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-xl p-3">
                  ⚠️ Always follow the dosage instructions on your prescription or as directed by your doctor. Do not self-medicate.
                </p>
              </div>
            )}

            {/* Side Effects */}
            {tab === "Side Effects" && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Not everyone experiences side effects. The following may occur in some patients:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {medicine.sideEffects.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-muted-foreground bg-muted/40 rounded-xl p-3">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground">
                  If you experience severe or unusual side effects, stop taking the medicine and consult a doctor immediately.
                </p>
              </div>
            )}

            {/* Warnings */}
            {tab === "Warnings" && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Precautions
                  </h3>
                  <ul className="space-y-2">
                    {medicine.warnings.map((w) => (
                      <li key={w} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Contraindications</h3>
                  <ul className="space-y-2">
                    {medicine.contraindications.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl">
                  <Thermometer className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Storage</p>
                    <p className="text-sm text-foreground">{medicine.storage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Medicines ─────────────────────────────────── */}
        {related.length > 0 && (
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Related Medicines</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((m) => <RelatedCard key={m.slug} med={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
