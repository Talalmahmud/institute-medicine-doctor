export type Patient = {
  id: string;
  initials: string;
  name: string;
  gender: "Male" | "Female";
  age: number;
  session: number;
  visitType: "First Visit" | "Follow Up";
  color: string;
  phone: string;
  mrNo: string;
  bloodGroup: string;
  chiefComplaint: string;
};

export const allPatients: Patient[] = [
  {
    id: "1",
    initials: "JH",
    name: "Jahangir Hossain",
    gender: "Male",
    age: 42,
    session: 1,
    visitType: "First Visit",
    color: "bg-teal-500",
    phone: "01712-345678",
    mrNo: "MR-20240001",
    bloodGroup: "B+",
    chiefComplaint:
      "Chest tightness, mild shortness of breath on exertion for 2 weeks.",
  },
  {
    id: "2",
    initials: "FB",
    name: "Fatema Begum",
    gender: "Female",
    age: 35,
    session: 3,
    visitType: "Follow Up",
    color: "bg-rose-500",
    phone: "01911-223344",
    mrNo: "MR-20240002",
    bloodGroup: "O+",
    chiefComplaint: "Persistent headache and dizziness for the past 5 days.",
  },
  {
    id: "3",
    initials: "RK",
    name: "Rahim Khan",
    gender: "Male",
    age: 58,
    session: 2,
    visitType: "Follow Up",
    color: "bg-amber-500",
    phone: "01811-998877",
    mrNo: "MR-20240003",
    bloodGroup: "A+",
    chiefComplaint: "Uncontrolled blood sugar, fatigue, and increased thirst.",
  },
  {
    id: "4",
    initials: "SA",
    name: "Sumaiya Akter",
    gender: "Female",
    age: 28,
    session: 1,
    visitType: "First Visit",
    color: "bg-violet-500",
    phone: "01611-554433",
    mrNo: "MR-20240004",
    bloodGroup: "AB+",
    chiefComplaint: "Skin rash and itching on arms and neck for 1 week.",
  },
  {
    id: "5",
    initials: "MN",
    name: "Mizanur Noor",
    gender: "Male",
    age: 47,
    session: 4,
    visitType: "Follow Up",
    color: "bg-sky-500",
    phone: "01511-776655",
    mrNo: "MR-20240005",
    bloodGroup: "O-",
    chiefComplaint: "Knee joint pain worsening after long walks.",
  },
];
