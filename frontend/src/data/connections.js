export const NODE_TYPES = {
  event: { label: "Event", color: "#FBFBF9" },
  policy: { label: "Policy", color: "#2F5CF0" },
  data: { label: "Data", color: "#7C98FF" },
  org: { label: "Organisation", color: "#C9C3B3" },
  people: { label: "People", color: "#D6392B" },
};

export const NODES = [
  { id: "monsoon", t: "Monsoon deficit, kharif 2023", type: "data", date: "Aug 2023", x: 120, y: 110 },
  { id: "inflation", t: "Food inflation climbs", type: "data", date: "Nov 2023", x: 340, y: 70 },
  { id: "ministry", t: "Dept. of Consumer Affairs", type: "org", date: "Price monitoring", x: 590, y: 90 },
  { id: "ban", t: "Onion export ban", type: "policy", date: "8 Dec 2023", x: 460, y: 260 },
  { id: "dgft", t: "DGFT notification", type: "policy", date: "Dec 2023", x: 720, y: 220 },
  { id: "exports", t: "Export volumes collapse", type: "data", date: "Q4 FY24", x: 880, y: 120 },
  { id: "mandi", t: "Lasalgaon mandi prices crash", type: "data", date: "Dec 2023", x: 240, y: 330 },
  { id: "nafed", t: "NAFED buffer procurement", type: "org", date: "2024", x: 660, y: 390 },
  { id: "protest", t: "Farmer protests, Nashik", type: "event", date: "Dec 2023", x: 360, y: 490 },
  { id: "growers", t: "Onion growers' associations", type: "people", date: "Maharashtra", x: 110, y: 450 },
  { id: "polls", t: "Lok Sabha polls, Maharashtra", type: "event", date: "Apr–May 2024", x: 610, y: 540 },
  { id: "lifted", t: "Ban lifted with MEP", type: "policy", date: "4 May 2024", x: 890, y: 430 },
];

export const EDGES = [
  ["monsoon", "inflation"], ["inflation", "ministry"], ["ministry", "ban"], ["inflation", "ban"], ["ban", "dgft"], ["dgft", "exports"],
  ["ban", "mandi"], ["mandi", "protest"], ["growers", "protest"], ["growers", "mandi"], ["ban", "nafed"], ["nafed", "mandi"],
  ["protest", "polls"], ["polls", "lifted"], ["lifted", "dgft"], ["exports", "lifted"], ["monsoon", "mandi"],
];

export const THREAD = ["monsoon", "inflation", "ban", "mandi", "protest", "polls", "lifted"];

export const THREAD_NOTES = {
  monsoon: "Triggering event — a weak monsoon cuts the kharif crop.",
  inflation: "Food prices rise; onions become a political pressure point.",
  ban: "Government prohibits onion exports to cool domestic prices.",
  mandi: "Wholesale prices at Asia's largest onion market fall sharply.",
  protest: "Growers protest as farm-gate prices collapse.",
  polls: "The issue lands in the middle of a general-election campaign.",
  lifted: "Ban lifted weeks before polling in onion-growing seats.",
};
