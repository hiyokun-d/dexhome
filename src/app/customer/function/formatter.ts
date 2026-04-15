export function fmtRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
