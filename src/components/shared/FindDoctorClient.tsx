"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, Clock, BadgeCheck, CalendarDays, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DoctorCard from "@/components/shared/DoctorCard";
import SpecialtyCombobox from "@/components/shared/SpecialtyCombobox";
import { allDoctors } from "@/lib/doctors";
import type { Day } from "@/lib/doctors";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const sortOptions = [
  { value: "rating",     label: "Top Rated" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "experience", label: "Most Experienced" },
];

export default function FindDoctorClient() {
  const [query, setQuery]                 = useState("");
  const [specialty, setSpecialty]         = useState("All Specialties");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedDays, setSelectedDays]   = useState<Day[]>([]);
  const [sort, setSort]                   = useState("rating");

  function toggleDay(day: Day) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function clearAll() {
    setQuery("");
    setSpecialty("All Specialties");
    setAvailableOnly(false);
    setSelectedDays([]);
  }

  const hasActiveFilters =
    query.trim() !== "" ||
    specialty !== "All Specialties" ||
    availableOnly ||
    selectedDays.length > 0;

  const results = useMemo(() => {
    let list = allDoctors;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
      );
    }
    if (specialty !== "All Specialties") list = list.filter((d) => d.specialty === specialty);
    if (availableOnly) list = list.filter((d) => d.available);
    if (selectedDays.length > 0) {
      list = list.filter((d) => selectedDays.some((day) => d.availableDays.includes(day)));
    }

    return [...list].sort((a, b) => {
      if (sort === "rating")     return b.rating - a.rating;
      if (sort === "price_asc")  return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "experience") return b.experience - a.experience;
      return 0;
    });
  }, [query, specialty, availableOnly, selectedDays, sort]);

  const activeLabels: string[] = [];
  if (specialty !== "All Specialties") activeLabels.push(specialty);
  if (availableOnly) activeLabels.push("Available Now");
  if (selectedDays.length > 0) activeLabels.push(selectedDays.join(", "));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-linear-to-br from-primary/10 via-background to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm font-medium text-primary mb-1">MediConnect</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">Find a Doctor</h1>
          <p className="text-muted-foreground text-sm">Browse {allDoctors.length} verified specialists and book instantly.</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-white border border-border rounded-xl px-4 h-11 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, specialty or condition..."
                className="border-none focus-visible:ring-0 bg-transparent text-sm p-0 h-auto"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <SpecialtyCombobox value={specialty} onChange={setSpecialty} />
            <Button className="h-11 px-6 shrink-0">Search</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Day filter */}
        <div className="bg-white border border-border rounded-2xl p-4 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Filter by Available Day</span>
            {selectedDays.length > 0 && (
              <button
                onClick={() => setSelectedDays([])}
                className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear days
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const active = selectedDays.includes(day);
              const count = allDoctors.filter(
                (d) =>
                  d.availableDays.includes(day) &&
                  (specialty === "All Specialties" || d.specialty === specialty)
              ).length;
              return (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`flex flex-col items-center px-4 py-2.5 rounded-xl border text-sm font-medium transition-all min-w-14 ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "border-border text-foreground hover:border-primary/60 hover:bg-primary/5"
                  }`}
                >
                  <span>{day}</span>
                  <span className={`text-xs mt-0.5 ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {count} dr{count !== 1 ? "s" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Other filters */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <button
            onClick={() => setAvailableOnly(!availableOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              availableOnly
                ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Available Now
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-border text-muted-foreground hover:border-primary/50 transition-colors">
            <BadgeCheck className="w-3.5 h-3.5" /> Verified Only
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-border text-muted-foreground hover:border-primary/50 transition-colors">
            <Star className="w-3.5 h-3.5" /> Top Rated (4.8+)
          </button>
          <div className="ml-auto flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Result bar */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <p className="text-sm text-muted-foreground">
            {results.length === 0 ? "No doctors found" : `Showing ${results.length} doctor${results.length !== 1 ? "s" : ""}`}
          </p>
          {activeLabels.map((label) => (
            <span key={label} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
              {label}
            </span>
          ))}
          {hasActiveFilters && (
            <button onClick={clearAll} className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 underline underline-offset-2">
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>

        {/* Grid */}
        {results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {results.map((doc) => <DoctorCard key={doc.slug} doctor={doc} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No doctors found</h3>
            <p className="text-sm text-muted-foreground">Try changing the specialty, search term, or selected days.</p>
            <Button variant="outline" className="mt-4" onClick={clearAll}>Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
