import DoctorCard from "./DoctorCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const specialties = ["All", "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "General Physician"];

const doctors = [
  {
    initials: "RA",
    name: "Dr. Rashida Alam",
    specialty: "Cardiologist",
    experience: 12,
    rating: 4.9,
    reviews: 312,
    price: 800,
    followUp: 500,
    available: true,
    color: "bg-rose-500",
  },
  {
    initials: "MH",
    name: "Dr. Mehedi Hassan",
    specialty: "Neurologist",
    experience: 9,
    rating: 4.8,
    reviews: 198,
    price: 900,
    followUp: 600,
    available: true,
    color: "bg-primary",
  },
  {
    initials: "SF",
    name: "Dr. Sumaiya Faruk",
    specialty: "Dermatologist",
    experience: 7,
    rating: 4.7,
    reviews: 245,
    price: 700,
    followUp: 450,
    available: false,
    color: "bg-violet-500",
  },
  {
    initials: "KR",
    name: "Dr. Kamal Rahman",
    specialty: "Pediatrician",
    experience: 15,
    rating: 4.9,
    reviews: 480,
    price: 600,
    followUp: 400,
    available: true,
    color: "bg-emerald-600",
  },
];

export default function DoctorSection() {
  return (
    <section id="doctors" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-primary mb-1">Our Specialists</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Find the Right Doctor
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            All doctors are verified and board-certified.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 gap-1.5">
          View all doctors <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Specialty filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {specialties.map((s) => (
          <button
            key={s}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
              s === "All"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {doctors.map((doc, i) => (
          <DoctorCard key={i} doctor={doc} />
        ))}
      </div>
    </section>
  );
}
