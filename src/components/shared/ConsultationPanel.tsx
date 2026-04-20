import { Button } from "@/components/ui/button";
import {
  Video,
  Mic,
  Upload,
  Plus,
  X,
  Download,
  FlaskConical,
  Pill,
} from "lucide-react";

const medicines = ["Metformin 500mg", "Amlodipine 5mg", "Omeprazole 20mg"];
const tests = ["CBC", "Blood Sugar (Fasting)", "Lipid Profile"];

export default function ConsultationPanel() {
  return (
    <section id="consultation" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-sm font-medium text-primary mb-1">Live Platform Demo</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Online Consultation Panel
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Doctors write prescriptions in real-time during the video call.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 border border-border rounded-3xl overflow-hidden shadow-lg bg-white">
        {/* Left — Video */}
        <div className="bg-slate-900 flex flex-col min-h-[360px]">
          {/* Main feed */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="text-center text-slate-400">
              <Video className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Patient video feed</p>
            </div>
            {/* Doctor pip */}
            <div className="absolute bottom-4 right-4 w-24 h-20 bg-slate-700 rounded-xl flex items-center justify-center border-2 border-slate-600">
              <span className="text-xs text-slate-400">Doctor</span>
            </div>
            {/* Duration badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-white font-mono">00:18:42</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 p-4 border-t border-slate-700">
            <button className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors">
              <Video className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white transition-colors">
              <Upload className="w-4 h-4" />
            </button>
            <button className="px-5 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">
              End Call
            </button>
          </div>
        </div>

        {/* Right — Prescription */}
        <div className="p-6 flex flex-col gap-5">
          {/* Patient info */}
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
              JH
            </div>
            <div>
              <p className="font-semibold text-sm">Jahangir Hossain</p>
              <p className="text-xs text-muted-foreground">Male, 42 · Session #1</p>
            </div>
            <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
              First Visit
            </span>
          </div>

          {/* Complaint */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wide">
              Chief Complaint
            </label>
            <textarea
              rows={2}
              className="w-full border border-border rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              defaultValue="Chest tightness, mild shortness of breath on exertion for 2 weeks."
            />
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5" /> Medicines
              </label>
              <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {medicines.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {m}
                  <X className="w-3 h-3 cursor-pointer hover:text-primary/70" />
                </span>
              ))}
            </div>
          </div>

          {/* Tests */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" /> Lab Tests
              </label>
              <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tests.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs px-3 py-1.5 rounded-full font-medium"
                >
                  {t}
                  <X className="w-3 h-3 cursor-pointer" />
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-auto pt-2 border-t border-border">
            <Button className="flex-1 gap-2">
              Finalize & Send Prescription
            </Button>
            <Button variant="outline" size="icon" title="Download PDF">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
