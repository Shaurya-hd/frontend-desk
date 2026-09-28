export const FINDINGS = [
  { id: "f1", text: "The Ministry of MSME's allocation rose from ₹6,552.61 crore in 2018-19 to ₹22,137.95 crore in 2023-24 — a 3.4× increase in five years.", cite: "[1] Union Budget — Expenditure Profile, Demand No. 67" },
  { id: "f2", text: "The sharpest jump came in 2021-22, when allocation more than doubled (+107%), driven by emergency credit guarantee outlays.", cite: "[2] Union Budget 2022-23 — Expenditure Budget, RE 2021-22" },
  { id: "f3", text: "PM Vishwakarma, launched in 2023, is now the Ministry's largest scheme with ₹4,824 crore in BE 2024-25.", cite: "[3] Ministry of MSME — Outcome Budget 2024-25" },
];

export const SOURCES = [
  ["Union Budget — Expenditure Profile", "Ministry of Finance · PDF · Statement 4"],
  ["Union Budget 2022-23 — Expenditure Budget", "Ministry of Finance · PDF · Demand No. 67"],
  ["Outcome Budget 2024-25", "Ministry of MSME · PDF · p. 12"],
  ["Annual Report 2023-24", "Ministry of MSME · PDF · Chapter 2"],
];

export const FEED = [
  {
    id: "t1",
    h: "Credit guarantee corpus for small businesses enhanced in Budget",
    meta: "Wire · 2h ago",
    tag: "Economy",
    links: [
      ["Archive", "2020 · Emergency credit line launched for MSMEs after lockdown"],
      ["Dataset", "MSME Ministry allocation, 2018-19 → 2023-24"],
      ["Related", "RBI data: MSME loan NPAs ease for third year"],
      ["Policy", "Budget speech 2024-25 · para 42"],
    ],
  },
  {
    id: "t2",
    h: "Onion prices rise sharply ahead of the festive season",
    meta: "Agency · 4h ago",
    tag: "Agriculture",
    links: [
      ["Archive", "Dec 2023 · Government bans onion exports"],
      ["Dataset", "Lasalgaon mandi modal prices, daily"],
      ["Related", "Monsoon rainfall deficit in Maharashtra districts"],
      ["Policy", "DGFT notifications on onion export policy"],
    ],
  },
  {
    id: "t3",
    h: "Free foodgrain scheme extended for five more years",
    meta: "Wire · 6h ago",
    tag: "Welfare",
    links: [
      ["Archive", "2020 · Scheme first launched as pandemic relief"],
      ["Dataset", "Food subsidy outlay, Union Budget 2019-20 → 2024-25"],
      ["Related", "FCI central pool stock position"],
      ["Policy", "National Food Security Act coverage by state"],
    ],
  },
  {
    id: "t4",
    h: "Heatwave alerts issued across north India",
    meta: "Agency · 9h ago",
    tag: "Climate",
    links: [
      ["Archive", "2024 · Record temperatures and heatstroke deaths"],
      ["Dataset", "IMD daily maximum temperature, 2015 → 2025"],
      ["Related", "Peak power demand hits new high"],
      ["Policy", "NDMA heat action plan guidelines"],
    ],
  },
];

export const LIVE_SOURCES = [
  ["Union & state budgets", 86],
  ["Parliament Q&A & committee reports", 72],
  ["Ministry annual reports", 64],
  ["MoSPI & statistical releases", 58],
  ["Gazette & notifications", 52],
  ["PIB press releases", 44],
  ["RBI publications", 41],
  ["CAG audit reports", 38],
  ["Court judgments", 25],
  ["Census & national surveys", 23],
];

export const DEPTHS = {
  direct: "Quick factual answers from a single authoritative source.",
  standard: "Charts, tables and analysis across sources.",
  deep: "Multi-step investigation across every indexed record.",
};
