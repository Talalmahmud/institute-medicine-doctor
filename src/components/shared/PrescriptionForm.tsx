"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { allDoctors } from "@/lib/doctors";
import { allMedicines, type Medicine } from "@/lib/medicines";
import { allTests, type LabTest } from "@/lib/tests";
import { allPatients, type Patient } from "@/lib/patients";
import {
  Stethoscope,
  Building2,
  Phone,
  Mail,
  Clock,
  Star,
  Pill,
  FlaskConical,
  Plus,
  X,
  Search,
  Download,
  Send,
  ChevronDown,
  CheckCircle2,
  FileText,
  User,
  Calendar,
  Hash,
  Droplets,
  AlertCircle,
} from "lucide-react";

// ─── Logged-in doctor (simulated) ────────────────────────────────────────────
const LOGGED_IN_DOCTOR = allDoctors[0];

// ─── Types ────────────────────────────────────────────────────────────────────

interface PrescribedMedicine {
  medicine: Medicine;
  dose: string;
  frequency: string;
  duration: string;
  instructions: string;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({
  initials,
  color,
  size = "md",
}: {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sz = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  }[size];
  return (
    <div
      className={cn(
        sz,
        color,
        "rounded-full flex items-center justify-center font-bold text-white shrink-0 select-none"
      )}
    >
      {initials}
    </div>
  );
}

function InfoRow({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-600">
      <span className="mt-0.5 text-primary shrink-0">{icon}</span>
      <span className="leading-snug">{children}</span>
    </div>
  );
}

// ─── Doctor Panel ─────────────────────────────────────────────────────────────

function DoctorPanel({ doctor }: { doctor: typeof LOGGED_IN_DOCTOR }) {
  const todayDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
  type Day = (typeof todayDays)[number];
  const today = todayDays[new Date().getDay()] as Day;
  const todaySlot = doctor.schedule[today];

  return (
    <aside className="flex flex-col gap-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <Avatar initials={doctor.initials} color={doctor.color} size="xl" />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-primary uppercase tracking-widest mb-0.5">
              Logged In
            </p>
            <h2 className="font-bold text-gray-900 text-base leading-tight">{doctor.name}</h2>
            <p className="text-xs text-primary font-medium mt-0.5">{doctor.specialty}</p>
            <p className="text-xs text-gray-500 mt-0.5">{doctor.qualifications}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <InfoRow icon={<Building2 className="w-3.5 h-3.5" />}>{doctor.hospital}</InfoRow>
          <InfoRow icon={<Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}>
            {doctor.rating} · {doctor.reviews} reviews ·{" "}
            <span className="text-gray-800 font-medium">{doctor.experience} yrs exp</span>
          </InfoRow>
          <InfoRow icon={<Clock className="w-3.5 h-3.5" />}>
            {todaySlot ? (
              <span>
                Today{" "}
                <span className="text-gray-900 font-medium">
                  {todaySlot.from} – {todaySlot.to}
                </span>
              </span>
            ) : (
              <span className="text-gray-400 italic">No schedule today</span>
            )}
          </InfoRow>
          <InfoRow icon={<Phone className="w-3.5 h-3.5" />}>+880 1700-000000</InfoRow>
          <InfoRow icon={<Mail className="w-3.5 h-3.5" />}>{doctor.slug}@mediconnect.bd</InfoRow>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
          {doctor.availableDays.map((d) => (
            <span
              key={d}
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                d === today ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Consultation", value: `৳ ${doctor.price}`, sub: "New visit" },
          { label: "Follow-up", value: `৳ ${doctor.followUp}`, sub: "Return visit" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center"
          >
            <p className="text-lg font-bold text-gray-900">{s.value}</p>
            <p className="text-xs font-medium text-primary">{s.label}</p>
            <p className="text-[10px] text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ─── Patient Selector ─────────────────────────────────────────────────────────

function PatientSelector({
  patients,
  selected,
  onChange,
}: {
  patients: Patient[];
  selected: Patient;
  onChange: (p: Patient) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-xs font-semibold text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:border-primary hover:text-primary transition-colors"
      >
        <User className="w-3.5 h-3.5" />
        Switch patient
        <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-30 w-64 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
          {patients.map((p) => (
            <button
              key={p.id}
              onClick={() => { onChange(p); setOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left",
                selected.id === p.id && "bg-primary/5"
              )}
            >
              <Avatar initials={p.initials} color={p.color} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">{p.name}</p>
                <p className="text-[10px] text-gray-400">{p.gender} · {p.age} yrs</p>
              </div>
              {selected.id === p.id && <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Medicine chip ────────────────────────────────────────────────────────────

function MedChip({ item, onRemove }: { item: PrescribedMedicine; onRemove: () => void }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium", item.medicine.color)}>
      {item.medicine.name}
      <button onClick={onRemove} className="opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

// ─── Add Medicine inline form ─────────────────────────────────────────────────

function AddMedicineForm({ onAdd }: { onAdd: (pm: PrescribedMedicine) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const filtered = allMedicines.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.genericName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (med: Medicine) => {
    setSelected(med);
    setQuery(med.name);
    setDose(med.dosage);
    setFrequency(med.frequency);
    setDuration(med.duration);
    setInstructions("");
    setDropOpen(false);
  };

  const handleAdd = () => {
    if (!selected) return;
    onAdd({ medicine: selected, dose, frequency, duration, instructions });
    setOpen(false);
    setQuery("");
    setSelected(null);
    setDose("");
    setFrequency("");
    setDuration("");
    setInstructions("");
  };

  const handleCancel = () => {
    setOpen(false);
    setQuery("");
    setSelected(null);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Medicine
      </button>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col gap-3">
      {/* Search */}
      <div ref={dropRef} className="relative">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
          Search Medicine
        </label>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
              setDropOpen(true);
            }}
            onFocus={() => setDropOpen(true)}
            placeholder="Type medicine name or generic…"
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
          />
          {selected && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
        </div>
        {dropOpen && query.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-xs text-gray-400 italic">No medicines found</p>
            ) : (
              filtered.map((med) => (
                <button
                  key={med.slug}
                  onMouseDown={() => handleSelect(med)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={cn("w-2 h-2 rounded-full shrink-0", med.color.split(" ")[0])} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-800">{med.name}</p>
                    <p className="text-[10px] text-gray-400">{med.genericName} · {med.form}</p>
                  </div>
                  <span className={cn("ml-auto text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0", med.color)}>
                    {med.badge ?? med.form}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Dose fields — shown after a medicine is selected */}
      {selected && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Dose
              </label>
              <input
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white placeholder:text-gray-300"
                placeholder="e.g. 500mg"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Frequency
              </label>
              <input
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white placeholder:text-gray-300"
                placeholder="e.g. Twice daily"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
                Duration
              </label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white placeholder:text-gray-300"
                placeholder="e.g. 7 days"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
              Doctor's Instructions
            </label>
            <input
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white placeholder:text-gray-300"
              placeholder="e.g. Take after meals, avoid alcohol…"
            />
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          onClick={handleAdd}
          disabled={!selected}
          size="sm"
          className="gap-1.5 bg-[#0d7377] hover:bg-[#0b5e61] text-white rounded-lg disabled:opacity-40"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Medicine
        </Button>
        <button
          onClick={handleCancel}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-2 py-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Prescribed Medicine Row ──────────────────────────────────────────────────

function MedicineRow({
  index,
  item,
  onRemove,
}: {
  index: number;
  item: PrescribedMedicine;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 group">
      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold", item.medicine.color)}>
            {item.medicine.name}
          </span>
          <span className="text-[10px] text-gray-400">{item.medicine.form}</span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500">
          {item.dose && <span><span className="font-medium text-gray-700">Dose:</span> {item.dose}</span>}
          {item.frequency && <span><span className="font-medium text-gray-700">Freq:</span> {item.frequency}</span>}
          {item.duration && <span><span className="font-medium text-gray-700">Duration:</span> {item.duration}</span>}
        </div>
        {item.instructions && (
          <p className="text-xs text-primary/80 mt-0.5 italic">
            ↳ {item.instructions}
          </p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 mt-0.5"
        aria-label="Remove"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Lab Tests — categorized checklist ───────────────────────────────────────

const TEST_CATEGORIES = Array.from(new Set(allTests.map((t) => t.category)));

function LabTestsPanel({
  selected,
  onChange,
}: {
  selected: LabTest[];
  onChange: (tests: LabTest[]) => void;
}) {
  const isChecked = (slug: string) => selected.some((t) => t.slug === slug);

  const toggle = (test: LabTest) => {
    if (isChecked(test.slug)) {
      onChange(selected.filter((t) => t.slug !== test.slug));
    } else {
      onChange([...selected, test]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {TEST_CATEGORIES.map((cat) => {
        const catTests = allTests.filter((t) => t.category === cat);
        const checkedCount = catTests.filter((t) => isChecked(t.slug)).length;
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat}</p>
              {checkedCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold">
                  {checkedCount}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {catTests.map((test) => {
                const checked = isChecked(test.slug);
                return (
                  <label
                    key={test.slug}
                    className={cn(
                      "flex items-start gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-all",
                      checked
                        ? "border-primary/40 bg-primary/5"
                        : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(test)}
                      className="mt-0.5 w-3.5 h-3.5 accent-primary shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-semibold text-gray-800">{test.name}</span>
                        <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-bold", test.color)}>
                          {test.shortName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[10px] text-gray-400">{test.turnaround}</span>
                        {test.fastingRequired && (
                          <span className="flex items-center gap-0.5 text-[10px] text-amber-600">
                            <AlertCircle className="w-2.5 h-2.5" />
                            Fast {test.fastingHours}h
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-gray-600 ml-auto">৳ {test.price}</span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Success card ─────────────────────────────────────────────────────────────

function SuccessCard({
  doctor,
  patient,
  medicines,
  tests,
  onReset,
}: {
  doctor: typeof LOGGED_IN_DOCTOR;
  patient: Patient;
  medicines: PrescribedMedicine[];
  tests: LabTest[];
  onReset: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-6 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
        <CheckCircle2 className="w-9 h-9 text-emerald-600" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">Prescription Sent!</h3>
        <p className="text-sm text-gray-500 mt-1">
          Sent to <span className="font-semibold text-gray-700">{patient.name}</span> via SMS at{" "}
          <span className="font-semibold text-gray-700">{patient.phone}</span>
        </p>
      </div>
      <div className="w-full bg-gray-50 rounded-xl p-4 text-left flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Avatar initials={doctor.initials} color={doctor.color} size="sm" />
          <div>
            <p className="text-xs font-bold text-gray-900">{doctor.name}</p>
            <p className="text-[10px] text-gray-500">{doctor.specialty}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] text-gray-400">Patient</p>
            <p className="text-xs font-semibold text-gray-700">{patient.name}</p>
          </div>
        </div>
        {medicines.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Medicines</p>
            <div className="flex flex-col gap-1.5">
              {medicines.map((pm, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className={cn("px-2 py-0.5 rounded-full font-medium", pm.medicine.color)}>{pm.medicine.name}</span>
                  <span className="text-gray-400">{pm.dose} · {pm.frequency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tests.length > 0 && (
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Lab Tests</p>
            <div className="flex flex-wrap gap-1.5">
              {tests.map((t) => (
                <span key={t.slug} className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", t.color)}>
                  {t.shortName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3 w-full">
        <Button onClick={() => window.print()} variant="outline" className="flex-1 gap-2 rounded-xl">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
        <Button onClick={onReset} className="flex-1 gap-2 rounded-xl bg-[#0d7377] hover:bg-[#0b5e61] text-white">
          New Prescription
        </Button>
      </div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  icon,
  title,
  badge,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</p>
        {badge !== undefined && badge > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PrescriptionForm() {
  const [patient, setPatient] = useState<Patient>(allPatients[0]);
  const [complaint, setComplaint] = useState(allPatients[0].chiefComplaint);
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState<PrescribedMedicine[]>([]);
  const [tests, setTests] = useState<LabTest[]>([
    allTests.find((t) => t.slug === "cbc")!,
    allTests.find((t) => t.slug === "blood-sugar-fasting")!,
    allTests.find((t) => t.slug === "lipid-profile")!,
  ]);
  const [finalized, setFinalized] = useState(false);

  const handlePatientChange = (p: Patient) => {
    setPatient(p);
    setComplaint(p.chiefComplaint);
    setMedicines([]);
    setTests([]);
    setFinalized(false);
  };

  const canFinalize = complaint.trim().length > 0 && (medicines.length > 0 || tests.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">New Prescription</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and send a prescription for your patient</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
          {/* Doctor panel */}
          <div className="lg:sticky lg:top-6">
            <DoctorPanel doctor={LOGGED_IN_DOCTOR} />
          </div>

          {/* Prescription builder */}
          <div className="flex flex-col gap-4">
            {finalized ? (
              <SuccessCard
                doctor={LOGGED_IN_DOCTOR}
                patient={patient}
                medicines={medicines}
                tests={tests}
                onReset={() => setFinalized(false)}
              />
            ) : (
              <>
                {/* Patient card */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Avatar initials={patient.initials} color={patient.color} size="lg" />
                      <div>
                        <h2 className="font-bold text-gray-900 text-lg leading-tight">{patient.name}</h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {patient.gender}, {patient.age} &middot; Session #{patient.session}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          patient.visitType === "First Visit"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {patient.visitType}
                      </span>
                      <PatientSelector patients={allPatients} selected={patient} onChange={handlePatientChange} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
                    {[
                      { icon: <Hash className="w-3.5 h-3.5" />, label: "MR No.", value: patient.mrNo },
                      { icon: <Phone className="w-3.5 h-3.5" />, label: "Phone", value: patient.phone },
                      { icon: <Droplets className="w-3.5 h-3.5" />, label: "Blood Group", value: patient.bloodGroup },
                      {
                        icon: <Calendar className="w-3.5 h-3.5" />,
                        label: "Date",
                        value: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
                      },
                    ].map(({ icon, label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                          <span className="text-primary">{icon}</span>
                          {label}
                        </p>
                        <p className="text-xs font-semibold text-gray-700">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prescription body */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-6">
                  {/* Chief Complaint */}
                  <Section icon={<FileText className="w-4 h-4" />} title="Chief Complaint">
                    <textarea
                      value={complaint}
                      onChange={(e) => setComplaint(e.target.value)}
                      rows={3}
                      className="w-full text-sm text-gray-800 leading-relaxed resize-none outline-none border border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-300"
                      placeholder="Describe the patient's chief complaint…"
                    />
                  </Section>

                  <div className="border-t border-gray-100" />

                  {/* Medicines */}
                  <Section
                    icon={<Pill className="w-4 h-4" />}
                    title="Medicines"
                    badge={medicines.length}
                  >
                    {/* Existing medicine rows */}
                    {medicines.length > 0 && (
                      <div className="border border-gray-100 rounded-xl px-4 py-1 mb-1">
                        {medicines.map((pm, i) => (
                          <MedicineRow
                            key={`${pm.medicine.slug}-${i}`}
                            index={i}
                            item={pm}
                            onRemove={() =>
                              setMedicines((prev) => prev.filter((_, idx) => idx !== i))
                            }
                          />
                        ))}
                      </div>
                    )}

                    {/* Add medicine form */}
                    <AddMedicineForm onAdd={(pm) => setMedicines((prev) => [...prev, pm])} />
                  </Section>

                  <div className="border-t border-gray-100" />

                  {/* Lab Tests */}
                  <Section
                    icon={<FlaskConical className="w-4 h-4" />}
                    title="Lab Tests"
                    badge={tests.length}
                  >
                    <LabTestsPanel selected={tests} onChange={setTests} />
                  </Section>

                  <div className="border-t border-gray-100" />

                  {/* Notes */}
                  <Section icon={<Stethoscope className="w-4 h-4" />} title="Doctor's Notes & Advice">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full text-sm text-gray-800 leading-relaxed resize-none outline-none border border-gray-200 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-gray-300"
                      placeholder="Follow-up instructions, lifestyle advice, precautions…"
                    />
                  </Section>

                  {/* Finalize */}
                  <div className="flex items-center gap-3 pt-1">
                    <Button
                      onClick={() => setFinalized(true)}
                      disabled={!canFinalize}
                      className="flex-1 h-12 text-sm font-bold bg-[#0d7377] hover:bg-[#0b5e61] text-white rounded-xl gap-2 disabled:opacity-40"
                    >
                      <Send className="w-4 h-4" />
                      Finalize &amp; Send Prescription
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.print()}
                      className="h-12 w-12 shrink-0 rounded-xl border-gray-200"
                      aria-label="Download / Print"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
