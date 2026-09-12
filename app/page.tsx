"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  planForCalculatorId,
  planPath,
  plans as planGuides,
} from "@/lib/plans";

type IconName =
  | "calculator"
  | "chevron"
  | "rupee"
  | "landmark"
  | "shield"
  | "trend";
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const classes: Record<IconName, string> = {
    calculator: "fa-solid fa-calculator",
    chevron: "fa-solid fa-chevron-down",
    rupee: "fa-solid fa-indian-rupee-sign",
    landmark: "fa-solid fa-building-columns",
    shield: "fa-solid fa-shield-halved",
    trend: "fa-solid fa-arrow-trend-up",
  };
  return <i aria-hidden="true" className={classes[name]} style={{ fontSize: size }} />;
}

const policies = [
  {
    id: "santosh",
    group: "PLI",
    name: "Endowment Assurance",
    hindi: "Santosh",
    bonus: 52,
    base: 4.65,
  },
  {
    id: "sumangal",
    group: "PLI",
    name: "Anticipated Endowment",
    hindi: "Sumangal",
    bonus: 48,
    base: 5.15,
  },
  {
    id: "suraksha",
    group: "PLI",
    name: "Whole Life Assurance",
    hindi: "Suraksha",
    bonus: 76,
    base: 3.2,
  },
  {
    id: "suvidha",
    group: "PLI",
    name: "Convertible Whole Life",
    hindi: "Suvidha",
    bonus: 76,
    base: 3.55,
  },
  {
    id: "yugal",
    group: "PLI",
    name: "Joint Life Assurance",
    hindi: "Yugal Suraksha",
    bonus: 52,
    base: 5.05,
  },
  {
    id: "bal",
    group: "PLI",
    name: "Children Policy",
    hindi: "Bal Jeevan Bima",
    bonus: 52,
    base: 4.85,
  },
  {
    id: "gram-santosh",
    group: "RPLI",
    name: "Endowment Assurance",
    hindi: "Gram Santosh",
    bonus: 48,
    base: 4.55,
  },
  {
    id: "gram-suraksha",
    group: "RPLI",
    name: "Whole Life Assurance",
    hindi: "Gram Suraksha",
    bonus: 60,
    base: 3.05,
  },
  {
    id: "gram-suvidha",
    group: "RPLI",
    name: "Convertible Whole Life",
    hindi: "Gram Suvidha",
    bonus: 60,
    base: 3.35,
  },
  {
    id: "gram-priya",
    group: "RPLI",
    name: "10 Year Rural PLI",
    hindi: "Gram Priya",
    bonus: 45,
    base: 8.9,
    fixedTerm: 10,
  },
  {
    id: "gram-sumangal",
    group: "RPLI",
    name: "Anticipated Endowment",
    hindi: "Gram Sumangal",
    bonus: 45,
    base: 5,
  },
  {
    id: "gram-bal",
    group: "RPLI",
    name: "Children Policy",
    hindi: "Gram Bal Jeevan Bima",
    bonus: 48,
    base: 4.7,
  },
];
const frequencies = {
  Monthly: 12,
  Quarterly: 4,
  "Half-yearly": 2,
  Yearly: 1,
} as const;
type Frequency = keyof typeof frequencies;
const money = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);

// Official tables quote premiums for Rs 5,000 sum assured. Values are monthly.
const eaRows: Record<number, number[]> = {
  35: [26, 27, 29, 32, 35, 38, 42, 47, 53, 61, 72, 86],
  40: [19, 20, 21, 22, 24, 26, 27, 29, 32, 35, 38, 42, 47, 53, 61, 72, 86],
  45: [
    15, 16, 16, 17, 18, 19, 20, 21, 22, 24, 26, 28, 30, 32, 35, 38, 42, 47, 53,
    61, 72, 87,
  ],
  50: [
    12, 13, 13, 14, 14, 15, 16, 16, 17, 18, 19, 20, 21, 23, 24, 26, 28, 30, 32,
    35, 39, 43, 48, 54, 62, 72, 87,
  ],
  55: [
    10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 16, 17, 17, 18, 19, 20, 22, 23,
    25, 26, 28, 30, 33, 36, 39, 43, 48, 55, 63, 73, 88,
  ],
  58: [
    9, 10, 10, 10, 10, 11, 11, 12, 12, 13, 13, 14, 15, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 25, 27, 29, 31, 33, 36, 40, 44, 49, 55, 65, 75, 89,
  ],
  60: [
    9, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 17, 18, 19,
    20, 21, 22, 24, 25, 27, 29, 31, 34, 37, 40, 44, 52, 59, 66, 76, 90,
  ],
};
const wlaRows: Record<number, number[]> = {
  55: [
    8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 11, 11, 12, 12, 13, 14, 14, 15, 16, 17, 18,
    19, 21, 23, 25, 27, 30, 33, 38, 42, 49, 59,
  ],
  58: [
    7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 15, 16, 16,
    17, 18, 20, 21, 23, 24, 27, 29, 32, 35, 40, 49, 57, 67,
  ],
  60: [
    7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 15, 16,
    16, 17, 18, 19, 21, 22, 24, 26, 28, 30, 33, 41, 46, 52, 59, 70,
  ],
};
const rpliEaRows: Record<number, number[]> = {
  35: [5.1, 5.45, 5.85, 6.35, 6.95, 7.6, 8.4, 9.4, 10.65, 12.2, 14.3, 17.25],
  40: [
    3.75, 3.95, 4.2, 4.45, 4.75, 5.1, 5.45, 5.85, 6.35, 6.95, 7.6, 8.4, 9.4,
    10.65, 12.2, 14.3, 17.25,
  ],
  45: [
    2.95, 3.1, 3.25, 3.4, 3.55, 3.75, 3.95, 4.2, 4.45, 4.75, 5.1, 5.5, 5.9, 6.4,
    6.95, 7.65, 8.45, 9.45, 10.65, 12.25, 14.35, 17.3,
  ],
  50: [
    2.4, 2.5, 2.6, 2.7, 2.8, 2.95, 3.1, 3.25, 3.4, 3.6, 3.8, 4, 4.25, 4.5, 4.8,
    5.15, 5.5, 5.95, 6.45, 7, 7.7, 8.5, 9.5, 10.75, 12.35, 14.45, 17.4,
  ],
  55: [
    2, 2.05, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.85, 3, 3.15, 3.3, 3.45, 3.65,
    3.85, 4.05, 4.3, 4.6, 4.9, 5.2, 5.6, 6.05, 6.55, 7.15, 7.8, 8.65, 9.65,
    10.9, 12.5, 14.6, 17.55,
  ],
  58: [
    1.85, 1.9, 1.95, 2, 2.05, 2.15, 2.25, 2.35, 2.45, 2.55, 2.65, 2.75, 2.9,
    3.05, 3.2, 3.35, 3.5, 3.7, 3.9, 4.15, 4.4, 4.65, 4.95, 5.3, 5.7, 6.15, 6.65,
    7.25, 7.95, 8.75, 9.75, 11, 13.06, 15.07, 17.84,
  ],
  60: [
    1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
    3.05, 3.2, 3.35, 3.55, 3.75, 3.95, 4.2, 4.45, 4.7, 5, 5.35, 5.75, 6.2, 6.75,
    7.3, 8, 8.85, 10.49, 11.71, 13.24, 15.25, 18.01,
  ],
};
const gramPriyaMonthly = [
  9.7, 9.7, 9.7, 9.7, 9.7, 9.7, 9.7, 9.75, 9.75, 9.75, 9.75, 9.75, 9.8, 9.8,
  9.8, 9.8, 9.85, 9.85, 9.85, 9.85, 9.85, 9.95, 9.95, 10, 10.05, 10.15,
];
const gramSumangal15 = [
  6.55, 6.55, 6.55, 6.55, 6.55, 6.55, 6.55, 6.55, 6.55, 6.55, 6.55, 6.6, 6.6,
  6.6, 6.6, 6.65, 6.65, 6.7, 6.7, 6.75, 6.75,
];
const gramSumangal20 = [
  4.95, 4.95, 4.95, 4.95, 4.95, 4.95, 4.95, 5, 5, 5, 5, 5, 5.05, 5.05, 5.05,
  5.1, 5.1, 5.15, 5.15, 5.2, 5.25, 5.3,
];
const officialMonthlyRate = (
  id: string,
  entry: number,
  end: number,
  term: number,
) => {
  if (id === "santosh") {
    const row = eaRows[end];
    return row?.[entry - 19];
  }
  if (id === "suraksha") {
    const row = wlaRows[end];
    return row?.[entry - 19];
  }
  if (id === "sumangal" && term === 15)
    return entry <= 36 ? 33 : entry <= 42 ? 34 : entry <= 45 ? 35 : undefined;
  if (id === "sumangal" && term === 20)
    return entry <= 33 ? 25 : entry <= 39 ? 26 : entry === 40 ? 27 : undefined;
  if (id === "gram-santosh") {
    const row = rpliEaRows[end];
    const rate = row?.[entry - 19];
    return rate === undefined ? undefined : rate * 5;
  }
  if (id === "gram-sumangal" && term === 15) {
    const rate = gramSumangal15[entry - 19];
    return rate === undefined ? undefined : rate * 5;
  }
  if (id === "gram-sumangal" && term === 20) {
    const rate = gramSumangal20[entry - 19];
    return rate === undefined ? undefined : rate * 5;
  }
  if (id === "gram-priya") {
    const rate = gramPriyaMonthly[entry - 20];
    return rate === undefined ? undefined : rate * 5;
  }
  return undefined;
};

export default function Home() {
  const [policyId, setPolicyId] = useState("santosh"),
    [age, setAge] = useState(30),
    [maturityAge, setMaturityAge] = useState(55),
    [sumAssured, setSumAssured] = useState(1000000),
    [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [quoteOpen, setQuoteOpen] = useState(false),
    [customerName, setCustomerName] = useState(""),
    [customerEmail, setCustomerEmail] = useState(""),
    [customerPhone, setCustomerPhone] = useState(""),
    [quoteError, setQuoteError] = useState("");
  const policy = policies.find((p) => p.id === policyId)!;
  const term = policy.fixedTerm ?? Math.max(5, maturityAge - age);
  const activeGuide = planForCalculatorId(policyId);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("policy");
    if (requested && policies.some((p) => p.id === requested))
      setPolicyId(requested);
  }, []);
  useEffect(() => {
    if (!quoteOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQuoteOpen(false);
        setQuoteError("");
      }
    };
    document.addEventListener("keydown", close);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = previous;
    };
  }, [quoteOpen]);
  const r = useMemo(() => {
    const payments = term * frequencies[frequency],
      tableRate = officialMonthlyRate(policy.id, age, maturityAge, term),
      ageLoad = 1 + Math.max(0, age - 20) * 0.012,
      termFactor = Math.pow(20 / term, 0.72),
      monthly =
        tableRate !== undefined
          ? tableRate * (sumAssured / 5000)
          : (sumAssured / 1000) * policy.base * ageLoad * termFactor,
      discount =
        frequency === "Yearly"
          ? 0.97
          : frequency === "Half-yearly"
            ? 0.985
            : frequency === "Quarterly"
              ? 0.995
              : 1,
      base = monthly * (12 / frequencies[frequency]) * discount,
      rebate = Math.floor(sumAssured / 20000) * (12 / frequencies[frequency]),
      taxable = Math.max(0, base - rebate),
      oldFirstYearGst = taxable * 0.045,
      oldRenewalGst = taxable * 0.0225,
      oldTotalGst =
        oldFirstYearGst * frequencies[frequency] +
        oldRenewalGst * Math.max(0, payments - frequencies[frequency]),
      firstYear = taxable,
      renewal = taxable,
      totalPremium = taxable * payments,
      bonus = term >= 5 ? (sumAssured / 1000) * policy.bonus * term : 0,
      maturity = sumAssured + bonus;
    return {
      payments,
      base,
      rebate,
      firstYear,
      renewal,
      totalPremium,
      bonus,
      maturity,
      gain: maturity - totalPremium,
      oldFirstYearGst,
      oldRenewalGst,
      oldTotalGst,
      official: tableRate !== undefined,
    };
  }, [age, frequency, maturityAge, policy, sumAssured, term]);
  const generateBasicQuotation = async () => {
    const name = customerName.trim(),
      email = customerEmail.trim(),
      phone = customerPhone.trim();
    if (name.length < 2) {
      setQuoteError("Please enter the customer name.");
      return;
    }
    if (!email && !phone) {
      setQuoteError("Please provide an email address or phone number.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setQuoteError("Please enter a valid email address.");
      return;
    }
    if (phone && !/^[+\d][\d\s-]{7,15}$/.test(phone)) {
      setQuoteError("Please enter a valid phone number.");
      return;
    }
    setQuoteError("");
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const nf = (v: number) =>
      new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v);
    const today = new Date();
    const quoteNo = `PP-${today.toISOString().slice(0, 10).replaceAll("-", "")}-${String(today.getTime()).slice(-6)}`;
    doc.setFillColor(190, 25, 39);
    doc.rect(0, 0, 210, 38, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("PostalPlan", 18, 17);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("PLI & RPLI Planning Quotation", 18, 25);
    doc.text(`Quotation: ${quoteNo}`, 192, 16, { align: "right" });
    doc.text(
      today.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      192,
      24,
      { align: "right" },
    );
    doc.setTextColor(45, 36, 34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Prepared for", 18, 52);
    doc.setFontSize(16);
    doc.text(name.slice(0, 60), 18, 61);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(105, 91, 86);
    doc.text(
      [
        email && `Email: ${email.slice(0, 80)}`,
        phone && `Phone: ${phone.slice(0, 20)}`,
      ].filter(Boolean) as string[],
      18,
      68,
    );
    doc.setDrawColor(230, 219, 208);
    doc.line(18, 82, 192, 82);
    doc.setTextColor(45, 36, 34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${policy.group} ${policy.name} (${policy.hindi})`, 18, 94);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(110, 95, 90);
    doc.text(
      r.official
        ? "Premium basis: Matching supplied annexure table row"
        : "Premium basis: Indicative planning estimate",
      18,
      101,
    );
    const rows = [
      ["Entry age", `${age} years`],
      [
        "Maturity / ceasing age",
        `${policy.fixedTerm ? age + term : maturityAge} years`,
      ],
      ["Policy term", `${term} years`],
      ["Sum assured", `Rs. ${nf(sumAssured)}`],
      ["Payment frequency", frequency],
      ["Total instalments", String(r.payments)],
      ["First-year instalment", `Rs. ${nf(r.firstYear)}`],
      ["Renewal instalment", `Rs. ${nf(r.renewal)}`],
      ["Estimated total premium", `Rs. ${nf(r.totalPremium)}`],
      ["Projected bonus", `Rs. ${nf(r.bonus)}`],
    ];
    let y = 114;
    rows.forEach(([label, value], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(251, 247, 239);
        doc.rect(18, y - 6, 174, 10, "F");
      }
      doc.setTextColor(105, 91, 86);
      doc.setFont("helvetica", "normal");
      doc.text(label, 22, y);
      doc.setTextColor(45, 36, 34);
      doc.setFont("helvetica", "bold");
      doc.text(value, 188, y, { align: "right" });
      y += 10;
    });
    doc.setFillColor(255, 239, 207);
    doc.roundedRect(18, 218, 174, 30, 3, 3, "F");
    doc.setTextColor(105, 72, 22);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("PROJECTED MATURITY VALUE", 25, 229);
    doc.setFontSize(21);
    doc.setFont("helvetica", "bold");
    doc.text(`Rs. ${nf(r.maturity)}`, 25, 241);
    doc.setFontSize(9);
    doc.text(`Estimated net gain: Rs. ${nf(r.gain)}`, 185, 240, {
      align: "right",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(115, 104, 100);
    const note =
      "Important: This is an indicative planning quotation generated by PostalPlan, an independent calculator. It is not an official India Post quotation, policy offer or guarantee. Premiums, rebates, GST, bonuses, eligibility and benefits must be confirmed with India Post.";
    doc.text(doc.splitTextToSize(note, 174), 18, 261);
    doc.setDrawColor(230, 219, 208);
    doc.line(18, 280, 192, 280);
    doc.text(
      "Generated privately in your browser - customer details are not stored by PostalPlan.",
      105,
      287,
      { align: "center" },
    );
    doc.save(
      `PostalPlan-Quotation-${
        name
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 35) || "Customer"
      }.pdf`,
    );
  };
  const generateQuotation = async () => {
    const name = customerName.trim(),
      email = customerEmail.trim(),
      phone = customerPhone.trim();
    if (name.length < 2) {
      setQuoteError("Please enter the customer name.");
      return;
    }
    if (!email && !phone) {
      setQuoteError("Please provide an email address or phone number.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setQuoteError("Please enter a valid email address.");
      return;
    }
    if (phone && !/^[+\d][\d\s-]{7,15}$/.test(phone)) {
      setQuoteError("Please enter a valid phone number.");
      return;
    }
    setQuoteError("");
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const nf = (v: number) =>
      new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
        Math.round(v),
      );
    const rs = (v: number) => `Rs. ${nf(v)}/-`;
    const today = new Date();
    const maturityDate = new Date(today);
    maturityDate.setFullYear(maturityDate.getFullYear() + term);
    const qno = `PP-${today.toISOString().slice(0, 10).replaceAll("-", "")}-${String(today.getTime()).slice(-6)}`;
    const header = (page: number) => {
      doc.setFillColor(190, 25, 39);
      doc.rect(0, 0, 210, 33, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(21);
      doc.text("PostalPlan", 16, 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("PLI & RPLI Premium, Maturity and Gain Calculator", 16, 23);
      doc.text(`Quotation ${qno}`, 194, 14, { align: "right" });
      doc.text(`Page ${page}`, 194, 22, { align: "right" });
    };
    const section = (
      title: string,
      rows: [string, string][],
      start: number,
    ) => {
      let y = start;
      doc.setFillColor(255, 240, 232);
      doc.rect(16, y - 6, 178, 9, "F");
      doc.setTextColor(174, 20, 34);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(title, 19, y);
      y += 8;
      rows.forEach(([label, value], i) => {
        if (i % 2 === 0) {
          doc.setFillColor(251, 248, 243);
          doc.rect(16, y - 5.5, 178, 8.5, "F");
        }
        doc.setTextColor(92, 79, 75);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.2);
        doc.text(label, 19, y);
        doc.setTextColor(42, 32, 31);
        doc.setFont("helvetica", "bold");
        doc.text(value, 191, y, { align: "right" });
        y += 8.5;
      });
      return y + 5;
    };
    header(1);
    doc.setTextColor(43, 32, 31);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("PREPARED FOR", 16, 44);
    doc.setFontSize(16);
    doc.text(name.slice(0, 60), 16, 53);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(105, 91, 86);
    doc.text(
      [
        email && `Email: ${email.slice(0, 80)}`,
        phone && `Phone: ${phone.slice(0, 20)}`,
      ].filter(Boolean) as string[],
      16,
      59,
    );
    doc.setDrawColor(231, 219, 210);
    doc.line(16, 70, 194, 70);
    doc.setTextColor(43, 32, 31);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text("Result Summary", 16, 81);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(77, 64, 60);
    const en = `You will invest an estimated total of ${rs(r.totalPremium)} in the ${policy.group} ${policy.name} (${policy.hindi}) policy over ${term} years. The projected maturity value is ${rs(r.maturity)}.`;
    doc.text(doc.splitTextToSize(en, 178), 16, 90);
    const canvas = document.createElement("canvas");
    canvas.width = 1500;
    canvas.height = 180;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#fffdf9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#55443f";
      ctx.font = '34px "Nirmala UI", "Noto Sans Devanagari", sans-serif';
      const hi = `परिणाम सारांश: आप ${policy.hindi} पॉलिसी में कुल ₹${nf(r.totalPremium)}/- का निवेश ${term} वर्षों में करेंगे। अनुमानित परिपक्वता राशि ₹${nf(r.maturity)}/- होगी।`;
      const words = hi.split(" ");
      let line = "",
        cy = 45;
      for (const word of words) {
        const test = line + word + " ";
        if (ctx.measureText(test).width > 1420) {
          ctx.fillText(line, 10, cy);
          line = word + " ";
          cy += 48;
        } else line = test;
      }
      ctx.fillText(line, 10, cy);
      doc.addImage(canvas.toDataURL("image/png"), "PNG", 16, 108, 178, 21);
    }
    doc.setFillColor(255, 239, 207);
    doc.roundedRect(16, 137, 178, 27, 3, 3, "F");
    doc.setTextColor(111, 72, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("PROJECTED MATURITY VALUE", 22, 147);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(rs(r.maturity), 22, 158);
    doc.setFontSize(9);
    doc.text(
      `Net gain: ${rs(r.gain)} | ROI: ${Math.round((r.gain / r.totalPremium) * 100)}%`,
      188,
      156,
      { align: "right" },
    );
    let y = 176;
    y = section(
      "BASIC DETAILS",
      [
        ["Entry age (age on next birthday)", String(age)],
        [
          "Maturity / premium ceasing age",
          String(policy.fixedTerm ? age + term : maturityAge),
        ],
        ["Policy term", `${term} years`],
        ["Sum assured", rs(sumAssured)],
        ["Policy maturity date", maturityDate.toLocaleDateString("en-GB")],
      ],
      y,
    );
    y = section(
      "BASE PREMIUM DETAILS",
      [
        ["Total instalments", String(r.payments)],
        ["Frequency", frequency],
        ["Base premium per instalment", rs(r.base)],
      ],
      y,
    );
    section(
      "REBATES ON PREMIUM",
      [
        ["Rebate per premium instalment", rs(r.rebate)],
        ["Total rebate", rs(r.rebate * r.payments)],
        ["Premium after rebate (without GST)", rs(r.firstYear)],
      ],
      y,
    );
    doc.addPage();
    header(2);
    y = 46;
    y = section(
      "GST ON PREMIUM - CURRENT RATE 0%",
      [
        [
          "First-year GST (old 4.5% - new 0%)",
          `Reduced from ${rs(r.oldFirstYearGst)} to Rs. 0/-`,
        ],
        [
          "Renewal GST (old 2.25% - new 0%)",
          `Reduced from ${rs(r.oldRenewalGst)} to Rs. 0/-`,
        ],
        ["Total projected GST", `Reduced from ${rs(r.oldTotalGst)} to Rs. 0/-`],
      ],
      y,
    );
    y = section(
      "FINAL PREMIUM DETAILS",
      [
        [`${frequency} premium - first year`, rs(r.firstYear)],
        [`${frequency} renewal premium`, rs(r.renewal)],
        ["Total premium over full term", rs(r.totalPremium)],
      ],
      y,
    );
    y = section(
      "BONUS AMOUNT",
      [
        [`Bonus (@ Rs. ${policy.bonus}/- per Rs. 1,000 SA/year)`, rs(r.bonus)],
        ["Terminal bonus", "Not included in this estimate"],
        ["Total projected bonus", rs(r.bonus)],
      ],
      y,
    );
    y = section(
      "FINAL MATURITY AMOUNT",
      [["Projected maturity value", rs(r.maturity)]],
      y,
    );
    y = section(
      "NET GAIN / RETURNS AT MATURITY",
      [
        ["Net gain", rs(r.gain)],
        [
          `ROI over ${term} years`,
          `${Math.round((r.gain / r.totalPremium) * 100)}%`,
        ],
      ],
      y,
    );
    doc.setFillColor(246, 234, 209);
    doc.roundedRect(16, y, 178, 37, 3, 3, "F");
    doc.setTextColor(91, 72, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("IMPORTANT INFORMATION", 21, y + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const note =
      "This is an indicative planning quotation generated by PostalPlan, an independent calculator. It is not an official India Post quotation, policy offer or guarantee. Premiums, rebates, GST, bonuses, eligibility, underwriting and benefits must be confirmed with India Post.";
    doc.text(doc.splitTextToSize(note, 166), 21, y + 18);
    doc.setTextColor(120, 104, 98);
    doc.setFontSize(7.5);
    doc.text(
      "Powered by PostalPlan | Generated privately in your browser | Customer details are not stored",
      105,
      287,
      { align: "center" },
    );
    const safeName =
      name
        .replace(/[^a-z0-9]+/gi, "_")
        .replace(/^_|_$/g, "")
        .slice(0, 35) || "Customer";
    const safePolicy =
      `${policy.name}_${policy.hindi}`
        .replace(/[^a-z0-9]+/gi, "_")
        .replace(/^_|_$/g, "") || policy.id;
    doc.save(`PostalPlan_${safeName}_${safePolicy}.pdf`);
  };
  return (
    <main className="min-h-screen">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">प</span>
          <span>PostalPlan</span>
        </div>
        <nav className="home-nav">
          <Link href="/guides/postalplan-calculator-user-guide">
            User guide
          </Link>
          <span className="secure">
            <Icon name="shield" size={16} /> Private &amp; secure calculation
          </span>
        </nav>
      </header>
      <section className="intro">
        <p className="eyebrow">PLI &amp; RPLI CALCULATOR</p>
        <h1>
          Plan today. <em>Prosper tomorrow.</em>
        </h1>
        <p>
          Estimate your premium, maturity amount and total gain in a few simple
          steps.
        </p>
      </section>
      <section className="workspace" id="calculator">
        <div className="form-card">
          <div className="card-title">
            <span>
              <Icon name="calculator" />
            </span>
            <div>
              <h2>Policy details</h2>
              <p>Enter details to see your estimate instantly</p>
            </div>
          </div>
          <div className="policy-label-row">
            <label>Choose policy</label>
            {activeGuide && (
              <Link className="selected-guide" href={planPath(activeGuide)}>
                Policy guide <span>↗</span>
              </Link>
            )}
          </div>
          <div className="select-wrap">
            <select
              value={policyId}
              onChange={(e) => setPolicyId(e.target.value)}
            >
              <optgroup label="Postal Life Insurance (PLI)">
                {policies
                  .filter((p) => p.group === "PLI")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.hindi})
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Rural Postal Life Insurance (RPLI)">
                {policies
                  .filter((p) => p.group === "RPLI")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.hindi})
                    </option>
                  ))}
              </optgroup>
            </select>
            <Icon name="chevron" size={18} />
          </div>
          <div className="field-grid">
            <div>
              <label>Current age</label>
              <div className="suffix-input">
                <input
                  type="number"
                  min="19"
                  max="55"
                  value={age}
                  onChange={(e) => setAge(+e.target.value)}
                />
                <span>years</span>
              </div>
            </div>
            <div>
              <label>{policy.fixedTerm ? "Policy term" : "Maturity age"}</label>
              <div className="suffix-input">
                <input
                  type="number"
                  min={age + 5}
                  max="80"
                  disabled={!!policy.fixedTerm}
                  value={policy.fixedTerm ?? maturityAge}
                  onChange={(e) => setMaturityAge(+e.target.value)}
                />
                <span>years</span>
              </div>
            </div>
          </div>
          <label>Sum assured</label>
          <div className="money-input">
            <Icon name="rupee" size={18} />
            <input
              aria-label="Sum assured"
              type="number"
              step="10000"
              min="20000"
              value={sumAssured}
              onChange={(e) => setSumAssured(+e.target.value)}
            />
          </div>
          <input
            className="range"
            aria-label="Sum assured slider"
            type="range"
            min="50000"
            max="5000000"
            step="50000"
            value={sumAssured}
            onChange={(e) => setSumAssured(+e.target.value)}
          />
          <div className="range-labels">
            <span>₹50,000</span>
            <span>₹50,00,000</span>
          </div>
          <label>Payment frequency</label>
          <div className="segments">
            {Object.keys(frequencies).map((x) => (
              <button
                key={x}
                className={frequency === x ? "active" : ""}
                onClick={() => setFrequency(x as Frequency)}
              >
                {x}
              </button>
            ))}
          </div>
          <div className={`notice ${r.official ? "verified" : ""}`}>
            <Icon name="shield" size={17} />
            <span>
              {r.official ? (
                <>
                  <strong>Official annexure rate found</strong> for this age and
                  maturity combination.
                </>
              ) : (
                <>
                  No matching table row supplied; premium uses an{" "}
                  <strong>indicative estimate</strong>.
                </>
              )}{" "}
              Bonus: ₹{policy.bonus} per ₹1,000/year.
            </span>
          </div>
        </div>
        <div className="results-column">
          <div className="results-card">
            <div className="result-head">
              <div>
                <p>Your estimated maturity</p>
                <h2>{money(r.maturity)}</h2>
              </div>
              <span>
                <Icon name="trend" size={24} />
              </span>
            </div>
            <div className="breakdown">
              <div>
                <span>Sum assured</span>
                <strong>{money(sumAssured)}</strong>
              </div>
              <div>
                <span>Accrued bonus</span>
                <strong className="green">+ {money(r.bonus)}</strong>
              </div>
            </div>
            <div className="bar">
              <span
                style={{
                  width: `${Math.min(100, (sumAssured / r.maturity) * 100)}%`,
                }}
              />
            </div>
            <div className="legend">
              <span>
                <i className="navy" />
                Sum assured
              </span>
              <span>
                <i className="gold" />
                Bonus
              </span>
            </div>
            <div className="premium-block">
              <div>
                <span>{frequency} premium · Year 1</span>
                <strong>{money(r.firstYear)}</strong>
              </div>
              <div>
                <span>Year 2 onwards</span>
                <strong>{money(r.renewal)}</strong>
              </div>
            </div>
            <div className="stats">
              <div>
                <span>Policy term</span>
                <strong>{term} years</strong>
              </div>
              <div>
                <span>Total installments</span>
                <strong>{r.payments}</strong>
              </div>
              <div>
                <span>Total premium</span>
                <strong>{money(r.totalPremium)}</strong>
              </div>
            </div>
            <div className="gain">
              <span>
                <Icon name="landmark" />
                Net gain over premium
              </span>
              <strong>{money(r.gain)}</strong>
            </div>
            <p className="disclaimer">
              Indicative planning estimate, not an official quotation. Premiums
              may differ by policy rules, age and underwriting.
            </p>
            <div className="quote-card">
              <button
                className="quote-trigger"
                onClick={() => setQuoteOpen(true)}
              >
                <span>
                  <b>Generate customer quotation</b>
                  <small>Create a personalised PDF from this estimate</small>
                </span>
                <strong>Get PDF →</strong>
              </button>
            </div>
          </div>
          {quoteOpen && (
            <div
              className="quote-backdrop"
              role="presentation"
              onMouseDown={() => {
                setQuoteOpen(false);
                setQuoteError("");
              }}
            >
              <div
                className="quote-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="quote-heading"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="quote-modal-accent" />
                <div className="quote-form">
                  <div className="quote-title">
                    <div>
                      <span className="quote-kicker">
                        PERSONALISED ESTIMATE
                      </span>
                      <b id="quote-heading">Create customer quotation</b>
                      <span>
                        We’ll use the calculation currently shown on screen.
                      </span>
                    </div>
                    <button
                      aria-label="Close quotation form"
                      onClick={() => {
                        setQuoteOpen(false);
                        setQuoteError("");
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div className="quote-summary">
                    <div>
                      <span>Policy</span>
                      <strong>{policy.hindi}</strong>
                    </div>
                    <div>
                      <span>Maturity estimate</span>
                      <strong>{money(r.maturity)}</strong>
                    </div>
                  </div>
                  <label>Customer name</label>
                  <input
                    autoFocus
                    maxLength={60}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                  />
                  <div className="quote-fields">
                    <div>
                      <label>Email address</label>
                      <input
                        maxLength={80}
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label>Phone number</label>
                      <input
                        maxLength={20}
                        inputMode="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <p className="contact-hint">
                    Provide at least one contact method.
                  </p>
                  {quoteError && (
                    <p className="quote-error" role="alert">
                      {quoteError}
                    </p>
                  )}
                  <button
                    className="download-quote"
                    onClick={generateQuotation}
                  >
                    Download PDF quotation
                  </button>
                  <p className="privacy-note">
                    <Icon name="shield" size={14} /> Generated on this device.
                    Contact details are not stored.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <details className="calculation-details calculation-details-wide">
          <summary><span><b>Full calculation details</b><small>Premium, rebate, GST, bonus and returns</small></span><Icon name="chevron" size={11}/></summary>
          <div className="details-content details-grid">
            <section><h3>Basic details</h3><dl><div><dt>Entry age</dt><dd>{age}</dd></div><div><dt>Maturity / ceasing age</dt><dd>{policy.fixedTerm ? age + term : maturityAge}</dd></div><div><dt>Policy term</dt><dd>{term} years</dd></div><div><dt>Sum assured</dt><dd>{money(sumAssured)}</dd></div></dl></section>
            <section><h3>Base premium</h3><dl><div><dt>Total installments</dt><dd>{r.payments}</dd></div><div><dt>Frequency</dt><dd>{frequency}</dd></div><div><dt>Base premium per installment</dt><dd>{money(r.base)}</dd></div></dl></section>
            <section><h3>Premium rebate</h3><dl><div><dt>Rebate per installment</dt><dd>{money(r.rebate)}</dd></div><div><dt>Total rebate</dt><dd>{money(r.rebate * r.payments)}</dd></div><div><dt>Premium after rebate</dt><dd>{money(r.firstYear)}</dd></div></dl></section>
            <section><h3>GST on premium <span>Current rate: 0%</span></h3><dl><div><dt>First-year GST</dt><dd><s>{money(r.oldFirstYearGst)}</s> ₹0</dd></div><div><dt>Renewal GST</dt><dd><s>{money(r.oldRenewalGst)}</s> ₹0</dd></div><div><dt>Total GST</dt><dd><s>{money(r.oldTotalGst)}</s> ₹0</dd></div></dl></section>
            <section><h3>Bonus and maturity</h3><dl><div><dt>Bonus rate</dt><dd>₹{policy.bonus} per ₹1,000/year</dd></div><div><dt>Projected bonus</dt><dd>{money(r.bonus)}</dd></div><div><dt>Projected maturity value</dt><dd>{money(r.maturity)}</dd></div></dl></section>
            <section className="returns-section"><h3>Returns at maturity</h3><dl><div><dt>Total premium</dt><dd>{money(r.totalPremium)}</dd></div><div><dt>Net gain</dt><dd>{money(r.gain)}</dd></div><div><dt>Estimated ROI</dt><dd>{Math.round(r.gain / r.totalPremium * 100)}%</dd></div></dl></section>
            <p className="details-note">Figures are planning estimates. Confirm eligibility, underwriting, bonus and final premium with India Post.</p>
          </div>
        </details>
      </section>
      <section className="home-tools" aria-labelledby="planning-tools-title">
        <p className="eyebrow">TRUST &amp; DECISION TOOLS</p>
        <h2 id="planning-tools-title">Compare clearly. Calculate privately.</h2>
        <div className="home-tool-grid">
          <Link href="/compare"><span>POLICY COMPARISON</span><strong>Compare PLI with PLI—or RPLI with RPLI</strong><p>Place two policies from the same family side by side to review term, eligibility basis, premiums and benefits.</p><b>Open comparison engine →</b></Link>
          <Link href="/privacy"><span>PRIVACY, TECHNOLOGY &amp; OPEN SOURCE</span><strong>See how calculator data is handled</strong><p>Understand the browser-only calculation flow, inspect the public source code and contribute improvements on GitHub.</p><b>Review our data flow →</b></Link>
        </div>
      </section>
      <section className="guides">
        <p className="eyebrow">POLICY GUIDES</p>
        <h2>Understand every PLI &amp; RPLI plan</h2>
        <p>
          Explore eligibility, terms, benefits and premium-table details from
          the supplied policy documents.
        </p>
        <div className="guide-grid">
          {planGuides.map((plan) => (
            <Link key={plan.slug} href={planPath(plan)}>
              <small>{plan.category.toUpperCase()}</small>
              <strong>{plan.shortName}</strong>
              <span>{plan.name}</span>
              <b>View plan →</b>
            </Link>
          ))}
        </div>
      </section>
      <footer>
        Designed for smarter Postal Life Insurance planning · <Link href="/privacy">Privacy</Link> · <Link href="/license">License</Link> · <a href="https://github.com/theajit/postal-pli-plan" rel="noreferrer">GitHub</a>
      </footer>
    </main>
  );
}
