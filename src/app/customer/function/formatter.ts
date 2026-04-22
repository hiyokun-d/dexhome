export function fmt(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}
export function fmtRp(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}
export function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
export function daysLeft(s: string) {
  return Math.ceil((new Date(s).getTime() - Date.now()) / 86_400_000);
}
