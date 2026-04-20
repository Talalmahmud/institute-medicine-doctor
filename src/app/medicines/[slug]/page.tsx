import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allMedicines } from "@/lib/medicines";
import MedicineDetailClient from "@/components/shared/MedicineDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const med = allMedicines.find((m) => m.slug === slug);
  if (!med) return { title: "Medicine not found" };
  return {
    title: `${med.name} (${med.brand}) — MediConnect`,
    description: `${med.genericName} · ${med.form} · ${med.strength}. ${med.description.slice(0, 140)}`,
  };
}

export function generateStaticParams() {
  return allMedicines.map((m) => ({ slug: m.slug }));
}

export default async function MedicinePage({ params }: Props) {
  const { slug } = await params;
  const medicine = allMedicines.find((m) => m.slug === slug);
  if (!medicine) notFound();
  return <MedicineDetailClient medicine={medicine} />;
}
