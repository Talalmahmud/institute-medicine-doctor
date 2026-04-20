export type LabTest = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  color: string;
  price: number;
  collectionFee: number;
  turnaround: string;
  homeCollection: boolean;
  sampleType: string;
  fastingRequired: boolean;
  fastingHours?: number;
  description: string;
  measures: string[];
  whoShouldTake: string[];
  preparation: string[];
  reportDelivery: string;
  relatedSlugs: string[];
};

export const allTests: LabTest[] = [
  {
    slug: "cbc",
    name: "Complete Blood Count",
    shortName: "CBC",
    category: "Haematology",
    color: "bg-rose-100 text-rose-700",
    price: 350,
    collectionFee: 100,
    turnaround: "4–6 hours",
    homeCollection: true,
    sampleType: "Venous blood",
    fastingRequired: false,
    description:
      "A Complete Blood Count (CBC) is one of the most common blood tests that provides important information about the kinds and numbers of cells in the blood — red cells, white cells, and platelets.",
    measures: [
      "Red blood cell (RBC) count",
      "White blood cell (WBC) count and differential",
      "Haemoglobin (Hb) level",
      "Haematocrit (HCT)",
      "Platelet count",
      "Mean Corpuscular Volume (MCV)",
    ],
    whoShouldTake: [
      "Routine annual health checkup",
      "Suspected anaemia or fatigue",
      "Unexplained fever or infection",
      "Monitoring blood disorders",
      "Before major surgery",
    ],
    preparation: [
      "No fasting required",
      "Stay well hydrated",
      "Inform the technician of any blood-thinning medications",
    ],
    reportDelivery: "Soft copy via SMS/email within 6 hours",
    relatedSlugs: ["blood-sugar-fasting", "lipid-profile", "liver-function-test"],
  },
  {
    slug: "blood-sugar-fasting",
    name: "Blood Sugar (Fasting)",
    shortName: "FBS",
    category: "Biochemistry",
    color: "bg-amber-100 text-amber-700",
    price: 150,
    collectionFee: 100,
    turnaround: "2–4 hours",
    homeCollection: true,
    sampleType: "Venous blood",
    fastingRequired: true,
    fastingHours: 8,
    description:
      "A fasting blood sugar test measures the level of glucose in your blood after you have not eaten for at least 8 hours. It is used to screen for and diagnose diabetes or prediabetes.",
    measures: [
      "Fasting plasma glucose level (mg/dL)",
    ],
    whoShouldTake: [
      "Diabetes screening",
      "Monitoring diabetes management",
      "Obesity or metabolic syndrome",
      "Family history of diabetes",
      "Symptoms of frequent thirst, urination, or fatigue",
    ],
    preparation: [
      "Fast for at least 8 hours before the test",
      "You may drink plain water only",
      "Avoid exercise just before the test",
      "Take regular medications only after the test",
    ],
    reportDelivery: "Soft copy via SMS/email within 4 hours",
    relatedSlugs: ["hba1c", "lipid-profile", "cbc"],
  },
  {
    slug: "lipid-profile",
    name: "Lipid Profile",
    shortName: "Lipid Panel",
    category: "Biochemistry",
    color: "bg-yellow-100 text-yellow-700",
    price: 500,
    collectionFee: 100,
    turnaround: "6–8 hours",
    homeCollection: true,
    sampleType: "Venous blood",
    fastingRequired: true,
    fastingHours: 10,
    description:
      "A lipid profile measures different types of lipids (fats) in your blood to assess cardiovascular risk. It includes total cholesterol, LDL, HDL, and triglycerides.",
    measures: [
      "Total Cholesterol",
      "LDL Cholesterol (bad cholesterol)",
      "HDL Cholesterol (good cholesterol)",
      "Triglycerides",
      "VLDL Cholesterol",
      "LDL/HDL ratio",
    ],
    whoShouldTake: [
      "Cardiovascular disease risk assessment",
      "Adults over 35 years (routine)",
      "Hypertension or diabetes patients",
      "Obesity or unhealthy diet",
      "Family history of heart disease",
    ],
    preparation: [
      "Fast for 10–12 hours before the test",
      "Drink only plain water",
      "Avoid fatty or oily foods the evening before",
      "Do not exercise on the morning of the test",
    ],
    reportDelivery: "Soft copy via SMS/email within 8 hours",
    relatedSlugs: ["blood-sugar-fasting", "hba1c", "cbc"],
  },
  {
    slug: "tsh",
    name: "Thyroid Function Test (TSH)",
    shortName: "TSH",
    category: "Endocrinology",
    color: "bg-violet-100 text-violet-700",
    price: 600,
    collectionFee: 100,
    turnaround: "24 hours",
    homeCollection: true,
    sampleType: "Venous blood",
    fastingRequired: false,
    description:
      "TSH (Thyroid Stimulating Hormone) is the primary screening test for thyroid disorders. It measures how well the thyroid gland is functioning.",
    measures: [
      "TSH (Thyroid Stimulating Hormone)",
      "Free T3 (triiodothyronine) — if ordered",
      "Free T4 (thyroxine) — if ordered",
    ],
    whoShouldTake: [
      "Unexplained weight gain or loss",
      "Persistent fatigue or weakness",
      "Hair thinning or excessive hair growth",
      "Irregular heart rate",
      "Mood swings, anxiety or depression",
      "Women over 35 (routine screening)",
    ],
    preparation: [
      "No fasting required",
      "Inform the lab if you take thyroid medication — test timing may matter",
      "Avoid biotin supplements for 24 hours before",
    ],
    reportDelivery: "Soft copy via SMS/email within 24 hours",
    relatedSlugs: ["hba1c", "blood-sugar-fasting", "liver-function-test"],
  },
  {
    slug: "hba1c",
    name: "Glycated Haemoglobin",
    shortName: "HbA1c",
    category: "Biochemistry",
    color: "bg-emerald-100 text-emerald-700",
    price: 700,
    collectionFee: 100,
    turnaround: "24 hours",
    homeCollection: true,
    sampleType: "Venous blood",
    fastingRequired: false,
    description:
      "HbA1c measures the average blood glucose level over the past 2–3 months. It is the gold standard for monitoring long-term diabetes control.",
    measures: [
      "Glycated haemoglobin percentage (%)",
      "Estimated Average Glucose (eAG)",
    ],
    whoShouldTake: [
      "Diagnosed diabetic patients (every 3–6 months)",
      "Prediabetes monitoring",
      "Diagnosis of type 2 diabetes",
      "Cardiovascular risk assessment in diabetics",
    ],
    preparation: [
      "No fasting required",
      "Can be done at any time of day",
      "Continue regular medications",
    ],
    reportDelivery: "Soft copy via SMS/email within 24 hours",
    relatedSlugs: ["blood-sugar-fasting", "lipid-profile", "cbc"],
  },
  {
    slug: "urine-re",
    name: "Urine Routine Examination",
    shortName: "Urine R/E",
    category: "Urinalysis",
    color: "bg-cyan-100 text-cyan-700",
    price: 200,
    collectionFee: 100,
    turnaround: "2–4 hours",
    homeCollection: true,
    sampleType: "Midstream urine (MSU)",
    fastingRequired: false,
    description:
      "A routine urine examination analyses the physical, chemical, and microscopic properties of urine. It helps detect urinary tract infections, kidney disease, and diabetes.",
    measures: [
      "Colour, clarity, pH",
      "Protein, glucose, ketones",
      "White blood cells (pus cells)",
      "Red blood cells",
      "Epithelial cells and casts",
      "Bacteria and crystals",
    ],
    whoShouldTake: [
      "Suspected urinary tract infection (UTI)",
      "Burning sensation during urination",
      "Routine health checkup",
      "Kidney disease monitoring",
      "Diabetes screening",
    ],
    preparation: [
      "Collect the midstream portion of the first morning urine",
      "Clean the genital area before collection",
      "Use the sterile container provided",
      "Deliver the sample within 2 hours",
    ],
    reportDelivery: "Soft copy via SMS/email within 4 hours",
    relatedSlugs: ["cbc", "creatinine-kidney-function"],
  },
  {
    slug: "liver-function-test",
    name: "Liver Function Test",
    shortName: "LFT",
    category: "Biochemistry",
    color: "bg-orange-100 text-orange-700",
    price: 800,
    collectionFee: 100,
    turnaround: "24 hours",
    homeCollection: true,
    sampleType: "Venous blood",
    fastingRequired: false,
    description:
      "A Liver Function Test (LFT) is a group of blood tests that check how well your liver is working. They measure enzymes, proteins, and bilirubin produced or processed by the liver.",
    measures: [
      "ALT (Alanine Aminotransferase)",
      "AST (Aspartate Aminotransferase)",
      "ALP (Alkaline Phosphatase)",
      "Total Bilirubin & Direct Bilirubin",
      "Total Protein & Albumin",
      "GGT (Gamma-glutamyltransferase)",
    ],
    whoShouldTake: [
      "Jaundice or yellowing of skin/eyes",
      "Abdominal pain in upper right",
      "Alcohol or drug use monitoring",
      "Long-term medication users (statins, paracetamol)",
      "Hepatitis B/C monitoring",
      "Fatty liver disease",
    ],
    preparation: [
      "No strict fasting required, but light meal preferred",
      "Avoid alcohol for at least 24 hours before",
      "Inform the lab about all medications",
    ],
    reportDelivery: "Soft copy via SMS/email within 24 hours",
    relatedSlugs: ["cbc", "creatinine-kidney-function", "tsh"],
  },
  {
    slug: "creatinine-kidney-function",
    name: "Kidney Function Test",
    shortName: "KFT / RFT",
    category: "Biochemistry",
    color: "bg-indigo-100 text-indigo-700",
    price: 600,
    collectionFee: 100,
    turnaround: "6–8 hours",
    homeCollection: true,
    sampleType: "Venous blood + Urine",
    fastingRequired: false,
    description:
      "Kidney Function Test (KFT) evaluates how well the kidneys are filtering waste from the blood. It is essential for detecting kidney disease early.",
    measures: [
      "Serum Creatinine",
      "Blood Urea Nitrogen (BUN)",
      "Uric Acid",
      "eGFR (estimated glomerular filtration rate)",
      "Electrolytes: Sodium, Potassium, Chloride",
    ],
    whoShouldTake: [
      "Diabetes or hypertension patients",
      "Swelling in legs or ankles",
      "Frequent urination or foamy urine",
      "Routine kidney health monitoring",
      "Before starting nephrotoxic drugs",
    ],
    preparation: [
      "Avoid excessive protein intake the day before",
      "Stay well hydrated",
      "Avoid vigorous exercise 24 hours before",
      "Continue regular medications unless told otherwise",
    ],
    reportDelivery: "Soft copy via SMS/email within 8 hours",
    relatedSlugs: ["urine-re", "liver-function-test", "cbc"],
  },
];
