export const DATASETS = {
  msme: {
    key: "msme",
    tab: "MSME budget",
    title: "Ministry of MSME — budget allocation",
    unit: "₹ crore",
    kind: "series",
    data: [
      { label: "2018-19", value: 6552.61 },
      { label: "2019-20", value: 7011.29 },
      { label: "2020-21", value: 7572.2 },
      { label: "2021-22", value: 15699.65 },
      { label: "2022-23", value: 21422.0 },
      { label: "2023-24", value: 22137.95 },
    ],
    kpis: [
      { k: "MSME budget allocation", v: "Rs 21,422.00 crore", s: "FY 2022-23 Outlay" },
      { k: "PM Vishwakarma allocation", v: "Rs 4,824.00 crore", s: "BE 2024-25" },
      { k: "PMEGP expenditure", v: "Rs 3,106.18 crore", s: "FY 2023-24 Actual" },
      { k: "RAMP budget allocation", v: "Rs 1,170.00 crore", s: "BE 2024-25" },
    ],
    anomalies: [
      { label: "2021-22", type: "spike", title: "Sudden spike · +107.3% YoY", text: "Allocation doubled in a single year — linked to emergency credit guarantee outlays after 2020." },
    ],
    source: "Union Budget — Expenditure Profile, Demand for Grants: Ministry of MSME (2018-19 to 2023-24)",
  },
  gdp: {
    key: "gdp",
    tab: "GDP growth",
    title: "India — real GDP growth rate",
    unit: "% growth",
    kind: "series",
    data: [
      { label: "FY20", value: 3.9 },
      { label: "FY21", value: -5.8 },
      { label: "FY22", value: 9.7 },
      { label: "FY23", value: 7.6 },
      { label: "FY24", value: 9.2 },
      { label: "FY25", value: 6.5 },
    ],
    kpis: [
      { k: "Latest growth", v: "6.5%", s: "FY 2024-25 Provisional" },
      { k: "Peak in window", v: "9.7%", s: "FY 2021-22 · base effect" },
      { k: "Trough in window", v: "−5.8%", s: "FY 2020-21 · pandemic" },
      { k: "Six-year average", v: "5.2%", s: "FY20 – FY25" },
    ],
    anomalies: [
      { label: "FY21", type: "crash", title: "Crash · −5.8%", text: "Sharpest contraction in the series — pandemic lockdown quarter drives the annual figure." },
      { label: "FY24", type: "conflict", title: "Conflicting values · 8.2% vs 9.2%", text: "Provisional estimate (May 2024) reported 8.2%; revised estimate (Feb 2025) reports 9.2%. Cite the latest revision." },
    ],
    source: "MoSPI — National Accounts Statistics & press releases on annual GDP estimates",
  },
  ministries: {
    key: "ministries",
    tab: "Budget by ministry",
    title: "Union Budget 2024-25 — top ministries by allocation",
    unit: "₹ lakh crore",
    kind: "category",
    data: [
      { label: "Defence", value: 6.22 },
      { label: "Rural Dev.", value: 2.66 },
      { label: "Home Affairs", value: 2.19 },
      { label: "Agriculture", value: 1.52 },
      { label: "Education", value: 1.26 },
      { label: "Health", value: 0.9 },
    ],
    kpis: [
      { k: "Largest allocation", v: "₹6.22 lakh cr", s: "Ministry of Defence" },
      { k: "Defence vs next", v: "2.3×", s: "vs Rural Development" },
      { k: "Education", v: "₹1.26 lakh cr", s: "BE 2024-25" },
      { k: "Health", v: "₹0.90 lakh cr", s: "BE 2024-25" },
    ],
    anomalies: [],
    source: "Union Budget 2024-25 — Expenditure Budget, Budget at a Glance",
  },
};

export const RUPEE_GOES_TO = [
  { label: "States' share of taxes", value: 21 },
  { label: "Interest payments", value: 19 },
  { label: "Central sector schemes", value: 16 },
  { label: "Other expenditure", value: 9 },
  { label: "Finance Commission transfers", value: 9 },
  { label: "Centrally sponsored schemes", value: 8 },
  { label: "Defence", value: 8 },
  { label: "Subsidies", value: 6 },
  { label: "Pensions", value: 4 },
];

export const PALETTE = ["#2F5CF0", "#0F0F0F", "#8C8C82", "#7C98FF", "#C9C3B3", "#1C2F7A", "#D6392B", "#5E5E57", "#B9C7FF"];
