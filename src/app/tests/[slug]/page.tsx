import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allTests } from "@/lib/tests";
import TestBookingClient from "@/components/shared/TestBookingClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const test = allTests.find((t) => t.slug === slug);
  if (!test) return { title: "Test not found" };
  return {
    title: `Book ${test.name} (${test.shortName}) — MediConnect`,
    description: `${test.description.slice(0, 140)} Turnaround: ${test.turnaround}. Home collection available.`,
  };
}

export function generateStaticParams() {
  return allTests.map((t) => ({ slug: t.slug }));
}

export default async function TestPage({ params }: Props) {
  const { slug } = await params;
  const test = allTests.find((t) => t.slug === slug);
  if (!test) notFound();
  return <TestBookingClient test={test} />;
}
