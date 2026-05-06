import type { Metadata } from "next";
import PrescriptionForm from "@/components/shared/PrescriptionForm";

export const metadata: Metadata = {
  title: "Prescription — MediConnect",
  description: "Create and print medical prescriptions",
};

export default function PrescriptionPage() {
  return <PrescriptionForm />;
}
