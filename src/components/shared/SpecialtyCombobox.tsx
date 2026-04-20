"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";

export const specialties = [
  "All Specialties",
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Pediatrician",
  "Gynecologist",
  "Orthopedist",
  "ENT Specialist",
  "Ophthalmologist",
  "Psychiatrist",
  "Endocrinologist",
  "Gastroenterologist",
  "Urologist",
  "Pulmonologist",
  "Rheumatologist",
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SpecialtyCombobox({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = specialties.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(specialty: string) {
    onChange(specialty);
    setOpen(false);
    setQuery("");
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange("All Specialties");
    setQuery("");
  }

  const isFiltered = value !== "All Specialties";

  return (
    <div ref={containerRef} className="relative w-full sm:w-64">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          if (!open) setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`w-full flex items-center justify-between gap-2 h-11 px-4 rounded-xl border text-sm transition-colors bg-white ${
          open
            ? "border-primary ring-2 ring-primary/20"
            : "border-border hover:border-primary/50"
        }`}
      >
        <span className={isFiltered ? "text-foreground font-medium" : "text-muted-foreground"}>
          {value}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {isFiltered && (
            <X
              className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground"
              onClick={clear}
            />
          )}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-border rounded-2xl shadow-xl overflow-hidden">
          {/* Search inside dropdown */}
          <div className="p-2 border-b border-border">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search specialty..."
              className="w-full h-8 px-3 text-sm rounded-lg bg-muted/60 border-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Options list */}
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-muted-foreground text-center">
                No specialty found
              </li>
            )}
            {filtered.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => select(s)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-muted/60 transition-colors ${
                    value === s ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  {s}
                  {value === s && <Check className="w-4 h-4 text-primary" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
