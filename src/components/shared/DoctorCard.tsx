import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Repeat, GraduationCap } from "lucide-react";
import type { Doctor } from "@/lib/doctors";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow border-border/70 group">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={`w-14 h-14 rounded-2xl ${doctor.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
          {doctor.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground truncate">{doctor.name}</h3>
            {doctor.available ? (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs py-0">Available</Badge>
            ) : (
              <Badge variant="secondary" className="text-xs py-0">Busy</Badge>
            )}
          </div>
          <p className="text-sm text-primary font-medium mt-0.5">{doctor.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{doctor.experience} yrs experience</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(doctor.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{doctor.rating}</span>
        <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
      </div>

      {/* Pricing */}
      <div className="bg-muted/50 rounded-xl p-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">First visit</span>
          </div>
          <span className="text-sm font-semibold text-foreground">৳{doctor.price}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Repeat className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">Follow-up</span>
          </div>
          <span className="text-sm font-semibold text-primary">৳{doctor.followUp}</span>
        </div>
      </div>

      {/* CTA */}
      <Link href={`/book/${doctor.slug}`} className="block">
        <Button className="w-full group-hover:shadow-md transition-shadow">
          Book & Pay
        </Button>
      </Link>
    </Card>
  );
}
