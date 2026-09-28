import axios from "axios";

export const api = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL}/api` });

export const fmt = (v, d = 2) =>
  v == null ? "—" : Number(v).toLocaleString("en-IN", { maximumFractionDigits: d });

export const errorMessage = (err) => {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) return detail[0]?.msg?.replace("Value error, ", "") || "Please check the form.";
  return typeof detail === "string" ? detail : "Something went wrong. Please try again.";
};
