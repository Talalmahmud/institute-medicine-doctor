import type { Metadata } from "next";
import FindDoctorClient from "@/components/shared/FindDoctorClient";

export const metadata: Metadata = {
  title: "Find a Doctor — MediConnect",
  description:
    "Browse verified specialists by specialty, rating, and availability. Book instantly and attend online consultations.",
};

export default function FindDoctorPage() {
  return <FindDoctorClient />;
}
