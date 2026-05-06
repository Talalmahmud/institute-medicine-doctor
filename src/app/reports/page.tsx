import type { Metadata } from "next";
import ReportAccessClient from "@/components/shared/ReportAccessClient";

export const metadata: Metadata = {
  title: "Access Your Lab Report — MediConnect",
  description:
    "Securely access and download your MediConnect lab test report. Enter your phone number and report code to view your results.",
};

export default function ReportsPage() {
  return <ReportAccessClient />;
}
