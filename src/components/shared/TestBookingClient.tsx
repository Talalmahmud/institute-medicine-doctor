"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight,
  ArrowLeft,
  FlaskConical,
  Clock,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Home,
  Building2,
  ShieldCheck,
  CalendarDays,
  Droplets,
  Info,
} from "lucide-react";
import { allTests, type LabTest } from "@/lib/tests";

type CollectionType = "home" | "walkin";

function RelatedTestCard({ test }: { test: LabTest }) {
  return (
    <Link
      href={`/tests/${test.slug}`}
      className="flex items-center gap-3 p-3 rounded-2xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
    >
      <div className={`w-10 h-10 rounded-xl ${test.color} flex items-center justify-center shrink-0`}>
        <FlaskConical className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{test.name}</p>
        <p className="text-xs text-muted-foreground">{test.turnaround} · {test.category}</p>
      </div>
      <span className="text-sm font-bold text-primary shrink-0">৳{test.price}</span>
    </Link>
  );
}

export default function TestBookingClient({ test }: { test: LabTest }) {
  const [collection, setCollection] = useState<CollectionType>(
    test.homeCollection ? "home" : "walkin"
  );
  const [form, setForm] = useState({
    name: "", phone: "", date: "", address: "", notes: "",
  });
  const [booked, setBooked] = useState(false);

  const total = test.price + (collection === "home" ? test.collectionFee : 0);
  const related = allTests.filter((t) => test.relatedSlugs.includes(t.slug));

  const canBook =
    form.name.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.date !== "" &&
    (collection === "walkin" || form.address.trim() !== "");

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/#shop" className="hover:text-primary transition-colors">Lab Tests</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{test.shortName}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/#shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to lab tests
        </Link>

        {/* ── Test Hero ─────────────────────────────────────────── */}
        <div className={`rounded-3xl p-6 sm:p-8 mb-6 border ${test.color.replace("text-", "border-").split(" ")[0]} bg-gradient-to-br ${test.color.replace("text-", "from-").split(" ")[0]}/30 to-background`}>
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className={`w-16 h-16 rounded-2xl ${test.color} flex items-center justify-center shrink-0`}>
              <FlaskConical className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-semibold bg-white/80 text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                  {test.category}
                </span>
                {test.fastingRequired && (
                  <span className="text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Fasting {test.fastingHours}h required
                  </span>
                )}
                {test.homeCollection && (
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Home collection available
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">{test.name}</h1>
              <p className="text-sm text-muted-foreground max-w-2xl">{test.description}</p>

              <div className="flex flex-wrap gap-3 mt-4">
                {[
                  { icon: Clock,    label: "Turnaround", value: test.turnaround },
                  { icon: Droplets, label: "Sample",     value: test.sampleType },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2 bg-white/70 rounded-xl px-3 py-2 text-xs border border-border/60">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-muted-foreground">{label}:</span>
                    <span className="font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── LEFT — Test info + booking form ───────────────────── */}
          <div className="space-y-5">

            {/* What it measures */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" /> What This Test Measures
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {test.measures.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm text-muted-foreground bg-muted/40 rounded-xl p-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            {/* Who should take */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-primary" /> Who Should Take This Test
              </h2>
              <ul className="space-y-2">
                {test.whoShouldTake.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> How to Prepare
              </h2>
              <ul className="space-y-3">
                {test.preparation.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-sm text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking form */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" /> Book This Test
              </h2>

              {/* Collection type */}
              <div className="mb-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Sample Collection Method</p>
                <div className="grid grid-cols-2 gap-3">
                  {test.homeCollection && (
                    <button
                      onClick={() => setCollection("home")}
                      className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all text-sm font-medium ${
                        collection === "home"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <Home className="w-5 h-5" />
                      <span>Home Collection</span>
                      <span className="text-xs">+৳{test.collectionFee}</span>
                    </button>
                  )}
                  <button
                    onClick={() => setCollection("walkin")}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all text-sm font-medium ${
                      collection === "walkin"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>Walk-in Lab</span>
                    <span className="text-xs">No extra charge</span>
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="+880 1XXXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                {/* Address — only for home collection */}
                {collection === "home" && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Collection Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="House/flat, road, area, district..."
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                )}

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Additional Notes <span className="text-muted-foreground/60 normal-case">(optional)</span>
                  </label>
                  <Input
                    placeholder="Any special instructions..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Price + confirm ────────────────────────────── */}
          <div className="space-y-4 lg:sticky lg:top-24">

            {/* Price card */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-4">Order Summary</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{test.shortName} test fee</span>
                  <span className="font-medium text-foreground">৳{test.price}</span>
                </div>
                {collection === "home" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" /> Home collection
                    </span>
                    <span className="font-medium text-foreground">৳{test.collectionFee}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-foreground border-t border-border pt-3 mt-2">
                  <span>Total</span>
                  <span className="text-primary text-lg">৳{total}</span>
                </div>
              </div>
            </div>

            {/* Report delivery */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">Report Delivery</p>
                  <p className="text-xs text-muted-foreground">{test.reportDelivery}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Turnaround: <strong className="text-foreground">{test.turnaround}</strong></p>
                </div>
              </div>
            </div>

            {/* Fasting reminder */}
            {test.fastingRequired && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">Fasting Required</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Do not eat or drink anything (except plain water) for at least{" "}
                    <strong>{test.fastingHours} hours</strong> before sample collection.
                  </p>
                </div>
              </div>
            )}

            {/* Confirm button */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <Button
                size="lg"
                disabled={!canBook}
                className="w-full gap-2 shadow-md disabled:opacity-50"
                onClick={() => canBook && setBooked(true)}
              >
                <FlaskConical className="w-4 h-4" />
                {booked ? "Booking Confirmed ✓" : `Book & Pay ৳${total}`}
              </Button>

              {booked && (
                <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Booking confirmed! You will receive a confirmation SMS shortly.
                </div>
              )}

              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Secure payment · Free reschedule within 24 hrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Tests ─────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Related Tests</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((t) => <RelatedTestCard key={t.slug} test={t} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
