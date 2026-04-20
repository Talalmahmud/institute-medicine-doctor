"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  GraduationCap,
  Building2,
  CalendarDays,
  Clock,
  Upload,
  ShieldCheck,
  Repeat,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";
import type { Doctor, Day } from "@/lib/doctors";

/* ─── constants ─────────────────────────────────────────────── */
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const PLATFORM_FEE = 50;

/* ─── Calendar ──────────────────────────────────────────────── */
function BookingCalendar({
  availableDays,
  selected,
  onSelect,
}: {
  availableDays: Day[];
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const availableIndices = availableDays.map((d) => DAY_LABELS.indexOf(d));
  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();

  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const canGoPrev =
    viewYear > today.getFullYear() || viewMonth > today.getMonth();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  function dateOf(day: number) { return new Date(viewYear, viewMonth, day); }
  function isPast(day: number) { return dateOf(day) < today; }
  function isUnavailable(day: number) {
    return !availableIndices.includes(dateOf(day).getDay());
  }
  function isSelected(day: number) {
    return (
      !!selected &&
      selected.getFullYear() === viewYear &&
      selected.getMonth()    === viewMonth &&
      selected.getDate()     === day
    );
  }
  function isToday(day: number) {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth()    === viewMonth &&
      today.getDate()     === day
    );
  }

  return (
    <div className="select-none">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-semibold text-sm">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;
          const disabled = isPast(day) || isUnavailable(day);
          const sel = isSelected(day);
          const tod = isToday(day);
          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => !disabled && onSelect(dateOf(day))}
              className={[
                "aspect-square w-full rounded-xl text-sm font-medium transition-all",
                sel
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : tod && !disabled
                  ? "ring-2 ring-primary text-primary font-bold"
                  : !disabled
                  ? "hover:bg-primary/10 text-foreground"
                  : "text-muted-foreground/30 cursor-not-allowed",
              ].join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-primary inline-block" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full ring-2 ring-primary inline-block" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-muted-foreground/20 inline-block" /> Unavailable
        </span>
      </div>
    </div>
  );
}

/* ─── Weekly schedule table ─────────────────────────────────── */
function WeeklySchedule({ doctor }: { doctor: Doctor }) {
  return (
    <div className="divide-y divide-border">
      {doctor.availableDays.map((day) => {
        const range = doctor.schedule[day];
        return (
          <div key={day} className="flex items-center justify-between py-3 px-1">
            <div className="flex items-center gap-3">
              <span className="w-10 text-xs font-semibold text-muted-foreground">{day}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            {range ? (
              <span className="text-sm font-medium text-foreground">
                {range.from} – {range.to}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">—</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function BookingClient({ doctor }: { doctor: Doctor }) {
  const [visitType, setVisitType] = useState<"first" | "followup">("first");
  const [selectedDate, setDate]   = useState<Date | null>(null);
  const [form, setForm] = useState({
    name: "", phone: "", age: "", gender: "", complaint: "",
  });

  const consultationFee = visitType === "first" ? doctor.price : doctor.followUp;
  const total           = consultationFee + PLATFORM_FEE;

  /* derive time range for the selected date */
  const selectedDayLabel = selectedDate
    ? (DAY_LABELS[selectedDate.getDay()] as Day)
    : null;
  const selectedTimeRange = selectedDayLabel
    ? doctor.schedule[selectedDayLabel] ?? null
    : null;

  const canBook =
    selectedDate !== null &&
    form.name.trim() !== "" &&
    form.phone.trim() !== "";

  function fmtDate(date: Date) {
    return date.toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/find-doctor" className="hover:text-primary transition-colors">Find a Doctor</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">Book Appointment</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/find-doctor"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to doctors
        </Link>

        <div className="grid lg:grid-cols-[340px_1fr] gap-6 items-start">

          {/* ── LEFT SIDEBAR ─────────────────────────────────────── */}
          <div className="space-y-4 lg:sticky lg:top-24">

            {/* Doctor card */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl ${doctor.color} flex items-center justify-center text-white font-bold text-xl shrink-0`}>
                  {doctor.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-bold text-foreground">{doctor.name}</h2>
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                  <span>{doctor.qualifications}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                  <span>{doctor.hospital}</span>
                </div>
              </div>
            </div>

            {/* Weekly schedule */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <CalendarDays className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Consultation Schedule</p>
              </div>
              <WeeklySchedule doctor={doctor} />
            </div>

            {/* Visit type */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-3">Visit Type</p>
              <div className="grid grid-cols-2 gap-2">
                {(["first", "followup"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setVisitType(type)}
                    className={`flex flex-col items-center py-3 px-2 rounded-xl border text-sm font-medium transition-all ${
                      visitType === type
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {type === "first" ? (
                      <>
                        <Clock className="w-4 h-4 mb-1" />
                        <span>First Visit</span>
                        <span className="text-xs font-bold mt-0.5">৳{doctor.price}</span>
                      </>
                    ) : (
                      <>
                        <Repeat className="w-4 h-4 mb-1" />
                        <span>Follow-up</span>
                        <span className="text-xs font-bold mt-0.5 text-primary">৳{doctor.followUp}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-3">Price Breakdown</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Consultation fee</span>
                  <span className="font-medium text-foreground">৳{consultationFee}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Platform fee</span>
                  <span className="font-medium text-foreground">৳{PLATFORM_FEE}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground border-t border-border pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-primary text-base">৳{total}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground bg-muted/50 rounded-xl p-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure payment · Refund policy applies</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT — BOOKING FORM ─────────────────────────────── */}
          <div className="space-y-5">

            {/* Section 1 — Pick a date */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <h3 className="font-semibold text-foreground">Select a Date</h3>
              </div>

              <BookingCalendar
                availableDays={doctor.availableDays}
                selected={selectedDate}
                onSelect={setDate}
              />

              {/* Time range banner — shown after a date is picked */}
              {selectedDate && selectedTimeRange && (
                <div className="mt-5 flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {fmtDate(selectedDate)}
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      Consultation time:{" "}
                      <span className="text-primary">
                        {selectedTimeRange.from} – {selectedTimeRange.to}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Arrive within this window. Exact slot assigned after payment.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2 — Patient details */}
            <div className={`bg-white rounded-2xl border border-border p-6 shadow-sm transition-opacity ${!selectedDate ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="flex items-center gap-2 mb-5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${selectedDate ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  2
                </div>
                <h3 className="font-semibold text-foreground">Patient Details</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Jahangir Hossain"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

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

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Age</label>
                  <Input
                    type="number"
                    placeholder="e.g. 35"
                    min={1}
                    max={120}
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Gender</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Chief Complaint / Reason for Visit
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your symptoms or reason for the consultation..."
                    value={form.complaint}
                    onChange={(e) => setForm({ ...form, complaint: e.target.value })}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Upload Previous Reports{" "}
                    <span className="text-muted-foreground/60 normal-case">(optional)</span>
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload PDF, JPG, PNG</span>
                    <span className="text-xs text-muted-foreground/60 mt-0.5">Max 10 MB per file</span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" multiple />
                  </label>
                </div>
              </div>
            </div>

            {/* Confirm button */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              {/* Booking summary */}
              {selectedDate && (
                <div className="mb-4 p-4 bg-muted/40 rounded-xl text-sm space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor</span>
                    <span className="font-medium text-foreground">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">{fmtDate(selectedDate)}</span>
                  </div>
                  {selectedTimeRange && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-foreground">
                        {selectedTimeRange.from} – {selectedTimeRange.to}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-border pt-1.5 mt-1">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold text-primary">৳{total}</span>
                  </div>
                </div>
              )}

              <Button
                size="lg"
                disabled={!canBook}
                className="w-full text-base shadow-md disabled:opacity-50"
              >
                {canBook
                  ? `Confirm & Pay ৳${total}`
                  : "Select a date and fill in your details"}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                A consultation link will be sent via SMS after payment.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
