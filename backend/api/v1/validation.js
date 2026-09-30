export function positiveInt(value, name) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) {
    const error = new Error("Invalid " + name);
    error.code = "INVALID_PARAMETER";
    throw error;
  }
  return n;
}
export function boundedQuery(value, max = 200) {
  return String(value || "").trim().slice(0, max);
}
