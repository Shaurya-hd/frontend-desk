import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from "recharts";
import { PALETTE } from "@/data/charts";
import { fmt } from "@/lib/api";

export const AXIS = { fontSize: 11, fill: "#6B6B63", fontFamily: "JetBrains Mono" };

export const ChartTip = ({ active, payload, unit }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="border border-ink bg-paper px-3 py-2 font-mono text-[11px] shadow-[3px_3px_0_#0F0F0F]">
      <div className="text-[#6B6B63]">{p.payload.label}</div>
      <div className="mt-0.5 text-[13px] text-ink">{fmt(p.value)} <span className="text-[#6B6B63]">{unit}</span></div>
    </div>
  );
};

export const MiniChart = ({ type, data, unit, anomaly, height = 240 }) => (
  <ResponsiveContainer width="100%" height={height}>
    {type === "line" ? (
      <LineChart data={data} margin={{ top: 14, right: 16, left: -8, bottom: 0 }}>
        <CartesianGrid stroke="#E4E4DC" strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={{ stroke: "#D1D1C7" }} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={68} tickFormatter={(v) => fmt(v, 1)} />
        <Tooltip content={<ChartTip unit={unit} />} cursor={{ stroke: "#0F0F0F", strokeDasharray: "3 3" }} />
        <Line type="linear" dataKey="value" stroke="#2F5CF0" strokeWidth={2} dot={{ r: 3.5, fill: "#fff", stroke: "#2F5CF0", strokeWidth: 1.5 }} activeDot={{ r: 5 }} animationDuration={1200} />
        {anomaly && <ReferenceDot x={anomaly.label} y={anomaly.value} r={11} fill="none" stroke="#D6392B" strokeWidth={1.5} strokeDasharray="3 2" />}
      </LineChart>
    ) : type === "bar" ? (
      <BarChart data={data} margin={{ top: 14, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid stroke="#E4E4DC" strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="label" tick={{ ...AXIS, fontSize: 10 }} axisLine={{ stroke: "#D1D1C7" }} tickLine={false} interval={0} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} width={40} />
        <Tooltip content={<ChartTip unit={unit} />} cursor={{ fill: "rgba(47,92,240,0.06)" }} />
        <Bar dataKey="value" animationDuration={900}>
          {data.map((_, i) => <Cell key={i} fill={i === 0 ? "#2F5CF0" : "#0F0F0F"} />)}
        </Bar>
      </BarChart>
    ) : (
      <PieChart>
        <Tooltip content={<ChartTip unit={unit} />} />
        <Pie data={data} dataKey="value" nameKey="label" innerRadius="55%" outerRadius="88%" paddingAngle={1} stroke="#FBFBF9" strokeWidth={2} animationDuration={900}>
          {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
        </Pie>
      </PieChart>
    )}
  </ResponsiveContainer>
);
