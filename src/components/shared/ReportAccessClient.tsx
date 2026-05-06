"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lock,
  ShieldCheck,
  Timer,
  Download,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  FileText,
  Eye,
  EyeOff,
  Phone,
  Hash,
  Info,
  Printer,
  Building2,
  User,
  CalendarDays,
  FlaskConical,
} from "lucide-react";

/* ─── Mock report data ──────────────────────────────────────── */
type ResultRow = {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  status: "normal" | "high" | "low";
};

type MockReport = {
  code: string;
  patientName: string;
  age: string;
  gender: string;
  testName: string;
  shortName: string;
  orderedBy: string;
  collectionDate: string;
  reportDate: string;
  lab: string;
  results: ResultRow[];
  impression: string;
};

const MOCK_REPORTS: MockReport[] = [
  {
    code: "CBC-2026-001",
    patientName: "Md. Jahangir Hossain",
    age: "42 years",
    gender: "Male",
    testName: "Complete Blood Count",
    shortName: "CBC",
    orderedBy: "Dr. Rashida Alam",
    collectionDate: "15 April 2026",
    reportDate: "15 April 2026",
    lab: "MediConnect Diagnostics, Dhaka",
    results: [
      { parameter: "WBC (White Blood Cells)", value: "7.2",  unit: "× 10³/μL",  normalRange: "4.5 – 11.0",  status: "normal" },
      { parameter: "RBC (Red Blood Cells)",   value: "4.8",  unit: "× 10⁶/μL",  normalRange: "4.5 – 5.5",   status: "normal" },
      { parameter: "Haemoglobin (Hb)",        value: "13.8", unit: "g/dL",       normalRange: "13.5 – 17.5", status: "normal" },
      { parameter: "Haematocrit (HCT)",       value: "42",   unit: "%",          normalRange: "41 – 53",     status: "normal" },
      { parameter: "MCV",                     value: "87",   unit: "fL",         normalRange: "80 – 100",    status: "normal" },
      { parameter: "Platelet Count",          value: "245",  unit: "× 10³/μL",  normalRange: "150 – 400",   status: "normal" },
      { parameter: "Neutrophils",             value: "65",   unit: "%",          normalRange: "50 – 70",     status: "normal" },
      { parameter: "Lymphocytes",             value: "28",   unit: "%",          normalRange: "20 – 40",     status: "normal" },
      { parameter: "Eosinophils",             value: "3",    unit: "%",          normalRange: "1 – 6",       status: "normal" },
    ],
    impression: "All haematological parameters are within normal limits. No anaemia or blood disorder detected.",
  },
  {
    code: "FBS-2026-042",
    patientName: "Sumaiya Begum",
    age: "38 years",
    gender: "Female",
    testName: "Blood Sugar (Fasting)",
    shortName: "FBS",
    orderedBy: "Dr. Farzana Ahmed",
    collectionDate: "18 April 2026",
    reportDate: "18 April 2026",
    lab: "MediConnect Diagnostics, Dhaka",
    results: [
      { parameter: "Fasting Blood Glucose", value: "118", unit: "mg/dL", normalRange: "70 – 100", status: "high" },
    ],
    impression: "Fasting blood glucose is mildly elevated above the normal range. Clinical correlation and follow-up HbA1c recommended.",
  },
  {
    code: "TSH-2026-107",
    patientName: "Karim Abdullah",
    age: "55 years",
    gender: "Male",
    testName: "Thyroid Function Test (TSH)",
    shortName: "TSH",
    orderedBy: "Dr. Mehedi Hassan",
    collectionDate: "20 April 2026",
    reportDate: "21 April 2026",
    lab: "MediConnect Diagnostics, Dhaka",
    results: [
      { parameter: "TSH (Thyroid Stimulating Hormone)", value: "5.8",  unit: "mIU/L", normalRange: "0.4 – 4.0",  status: "high"   },
      { parameter: "Free T4 (Thyroxine)",               value: "0.72", unit: "ng/dL", normalRange: "0.8 – 1.8",  status: "low"    },
      { parameter: "Free T3 (Triiodothyronine)",        value: "2.9",  unit: "pg/mL", normalRange: "2.3 – 4.2",  status: "normal" },
    ],
    impression: "TSH is elevated with low Free T4 — findings are consistent with primary hypothyroidism. Thyroid hormone replacement therapy is recommended.",
  },
];

const ACCESS_WINDOW = 10 * 60; // 600 seconds

/* ─── Helpers ────────────────────────────────────────────────── */
function fmtTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function StatusBadge({ status }: { status: "normal" | "high" | "low" }) {
  if (status === "normal")
    return <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Normal</span>;
  if (status === "high")
    return <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">↑ High</span>;
  return <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">↓ Low</span>;
}

/* ─── PDF-style report ───────────────────────────────────────── */
function ReportDocument({ report }: { report: MockReport }) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm print:shadow-none">
      {/* Header */}
      <div className="bg-primary px-6 py-5 text-primary-foreground">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FlaskConical className="w-5 h-5" />
              <span className="font-bold text-lg">MediConnect</span>
            </div>
            <p className="text-xs text-primary-foreground/70">Diagnostics & Pathology</p>
            <p className="text-xs text-primary-foreground/70">Dhaka, Bangladesh · DGDA Certified</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-primary-foreground/70 mb-0.5">Report Code</p>
            <p className="font-mono font-bold text-sm">{report.code}</p>
          </div>
        </div>
      </div>

      {/* Patient info bar */}
      <div className="bg-muted/40 border-b border-border px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        {[
          { icon: User,        label: "Patient",    value: report.patientName },
          { icon: Info,        label: "Age / Sex",  value: `${report.age}, ${report.gender}` },
          { icon: FileText,    label: "Referred by",value: report.orderedBy },
          { icon: CalendarDays,label: "Report Date",value: report.reportDate },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
              <Icon className="w-3 h-3" /> {label}
            </div>
            <p className="font-semibold text-foreground text-xs">{value}</p>
          </div>
        ))}
      </div>

      {/* Test title */}
      <div className="px-6 py-4 border-b border-border">
        <h3 className="font-bold text-foreground text-base">{report.testName}</h3>
        <p className="text-xs text-muted-foreground">Sample collected: {report.collectionDate}</p>
      </div>

      {/* Results table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40 text-left">
              <th className="px-6 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Parameter</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Value</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Unit</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Normal Range</th>
              <th className="px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {report.results.map((row) => (
              <tr key={row.parameter} className={row.status !== "normal" ? "bg-red-50/50" : "hover:bg-muted/20"}>
                <td className="px-6 py-3 font-medium text-foreground">{row.parameter}</td>
                <td className={`px-4 py-3 font-bold ${row.status === "high" ? "text-red-600" : row.status === "low" ? "text-amber-600" : "text-foreground"}`}>
                  {row.value}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.unit}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.normalRange}</td>
                <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Impression */}
      <div className="px-6 py-4 border-t border-border bg-muted/20">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Clinical Impression</p>
        <p className="text-sm text-foreground">{report.impression}</p>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>{report.lab}</span>
        </div>
        <p className="italic">This report is computer-generated and valid without signature.</p>
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
type View = "form" | "report" | "expired";

export default function ReportAccessClient() {
  const [view, setView]           = useState<View>("form");
  const [phone, setPhone]         = useState("");
  const [code, setCode]           = useState("");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [report, setReport]       = useState<MockReport | null>(null);
  const [timeLeft, setTimeLeft]   = useState(ACCESS_WINDOW);
  const [showWarning, setWarning] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Start countdown when report opens */
  useEffect(() => {
    if (view !== "report") return;
    setTimeLeft(ACCESS_WINDOW);
    setWarning(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setView("expired");
          return 0;
        }
        if (t === 120) setWarning(true); // warn at 2 min remaining
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [view]);

  function handleVerify() {
    setError("");
    const trimPhone = phone.trim();
    const trimCode  = code.trim().toUpperCase();

    if (!trimPhone || !trimCode) {
      setError("Please enter both your phone number / username and the report code.");
      return;
    }
    if (trimPhone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number (at least 10 digits).");
      return;
    }

    setLoading(true);
    /* Simulate API call */
    setTimeout(() => {
      const found = MOCK_REPORTS.find((r) => r.code === trimCode);
      if (!found) {
        setError("Invalid report code. Please check and try again. (Try: CBC-2026-001, FBS-2026-042, or TSH-2026-107)");
        setLoading(false);
        return;
      }
      setReport(found);
      setView("report");
      setLoading(false);
    }, 1000);
  }

  function handleReset() {
    setView("form");
    setReport(null);
    setPhone("");
    setCode("");
    setError("");
    setWarning(false);
    clearInterval(timerRef.current!);
  }

  /* ── FORM ────────────────────────────────────────────────── */
  if (view === "form") {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Icon + title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground">Access Your Report</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Enter your credentials to securely view and download your lab report.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-border p-8 shadow-lg space-y-5">
            {/* Phone / Username */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Phone Number or Username
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="+880 1XXXXXXXXX or your username"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  className="pl-10 h-11 rounded-xl"
                />
              </div>
            </div>

            {/* Report code */}
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Report Access Code
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="e.g. CBC-2026-001"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  className="pl-10 h-11 rounded-xl font-mono tracking-wider uppercase"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                Your report code was sent via SMS after booking.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              className="w-full h-11 text-base shadow-md"
              onClick={handleVerify}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Verifying…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Access Report
                </span>
              )}
            </Button>

            {/* Notice */}
            <div className="flex items-start gap-2.5 bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs text-muted-foreground">
              <Timer className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                For security, your report will be accessible for{" "}
                <strong className="text-foreground">10 minutes</strong> per session.
                After that, you must re-enter your credentials.
              </span>
            </div>
          </div>

          {/* Demo hint */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800">
            <p className="font-semibold mb-1">Demo credentials:</p>
            <p>Phone: any valid number · Code: <span className="font-mono">CBC-2026-001</span></p>
            <p>or <span className="font-mono">FBS-2026-042</span> · or <span className="font-mono">TSH-2026-107</span></p>
          </div>
        </div>
      </div>
    );
  }

  /* ── EXPIRED ─────────────────────────────────────────────── */
  if (view === "expired") {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-3xl border border-border p-8 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground mb-2">Session Expired</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Your 10-minute secure access window has ended. To protect your privacy,
              the report has been locked. Please verify your credentials again to view it.
            </p>

            {/* Report info (no data exposed) */}
            {report && (
              <div className="bg-muted/40 rounded-2xl p-4 mb-6 text-sm text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Report code</span>
                  <span className="font-mono font-semibold text-foreground">{report.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Test</span>
                  <span className="font-semibold text-foreground">{report.shortName}</span>
                </div>
              </div>
            )}

            <Button className="w-full h-11 gap-2" onClick={handleReset}>
              <Eye className="w-4 h-4" /> View Report Again
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              You will need to re-enter your credentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── REPORT VIEW ─────────────────────────────────────────── */
  const pct = (timeLeft / ACCESS_WINDOW) * 100;
  const urgent = timeLeft <= 120;

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      {/* Sticky access bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3">

          {/* Verified badge */}
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-xl px-3 py-2 text-sm font-semibold">
            <ShieldCheck className="w-4 h-4" /> Verified · {report?.patientName}
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold border ${
            urgent
              ? "bg-red-100 text-red-700 border-red-200 animate-pulse"
              : "bg-primary/10 text-primary border-primary/20"
          }`}>
            <Timer className="w-4 h-4" />
            <span>Access expires in <strong className="font-mono">{fmtTime(timeLeft)}</strong></span>
          </div>

          {/* Progress bar */}
          <div className="hidden sm:flex flex-1 items-center">
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${urgent ? "bg-red-500" : "bg-primary"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={() => window.print()}
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </Button>
            <Button size="sm" className="gap-1.5">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </Button>
            <Button size="sm" variant="ghost" onClick={handleReset} className="gap-1.5 text-muted-foreground">
              <EyeOff className="w-3.5 h-3.5" /> Close
            </Button>
          </div>
        </div>

        {/* 2-minute warning banner */}
        {showWarning && (
          <div className="bg-red-50 border-t border-red-200 px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 text-xs text-red-700 max-w-5xl mx-auto">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>
              Less than 2 minutes remaining. Download the PDF now or your session will expire.
            </span>
          </div>
        )}
      </div>

      {/* Report content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Session info */}
        <div className="flex items-center gap-2 mb-5 text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Report loaded successfully · Code: <strong className="font-mono text-foreground">{report?.code}</strong></span>
        </div>

        {report && <ReportDocument report={report} />}

        {/* Bottom actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className={`w-4 h-4 ${urgent ? "text-red-500" : "text-primary"}`} />
            <span>Session ends in <strong className={`font-mono ${urgent ? "text-red-600" : "text-foreground"}`}>{fmtTime(timeLeft)}</strong></span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer className="w-4 h-4" /> Print Report
            </Button>
            <Button className="gap-2 shadow-sm">
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 This report is for authorized access only. Your session will expire automatically in {fmtTime(timeLeft)}.
          After expiry, re-enter your credentials to view again.
        </p>
      </div>
    </div>
  );
}
