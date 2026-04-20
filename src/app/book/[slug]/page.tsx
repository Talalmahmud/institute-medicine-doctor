import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDoctors } from "@/lib/doctors";
import BookingClient from "@/components/shared/BookingClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = allDoctors.find((d) => d.slug === slug);
  if (!doctor) return { title: "Doctor not found" };
  return {
    title: `Book ${doctor.name} — MediConnect`,
    description: `Book an online consultation with ${doctor.name}, ${doctor.specialty}. First visit ৳${doctor.price}, follow-up ৳${doctor.followUp}.`,
  };
}

export function generateStaticParams() {
  return allDoctors.map((d) => ({ slug: d.slug }));
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const doctor = allDoctors.find((d) => d.slug === slug);
  if (!doctor) notFound();
  return <BookingClient doctor={doctor} />;
}
