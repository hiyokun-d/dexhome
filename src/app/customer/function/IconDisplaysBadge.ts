import { OrderStatus } from "@/types";
import { BadgeColor } from "../types/CustomersCollection.types";

export function orderBadge(status: OrderStatus): {
  color: BadgeColor;
  label: string;
} {
  const badge: Record<OrderStatus, { color: BadgeColor; label: string }> = {
    COMPLETED: { color: "green", label: "✓ Selesai" },
    DELIVERED: { color: "green", label: "✓ Diterima" },
    SHIPPED: { color: "gold", label: "🚚 Dikirim" },
    PROCESSING: { color: "gold", label: "⚙️ Diproses" },
    PENDING: { color: "grey", label: "⏳ Menunggu" },
    CANCELLED: { color: "red", label: "✕ Dibatal" },
    CLAIM: { color: "red", label: "↩ Klaim" },
  };

  return badge[status] ?? { color: "grey", label: status };
}

export function pointIcon(type: string) {
  if (type === "BONUS") return { ico: "🎁", bg: `rgba(74,144,217,.1)` };
  if (type === "REDEEM") return { ico: "🎫", bg: `rgba(196,87,42,.1)` };
  if (type === "EXPIRE") return { ico: "⚠️", bg: `rgba(196,87,42,.1)` };
  if (type === "REFUND") return { ico: "↩", bg: `rgba(122,140,110,.1)` };
  return { ico: "⭐", bg: `rgba(201,150,42,.10)` };
}

export function voucherDisplay(type: string, value: number) {
  if (type === "FIXED_DISCOUNT")
    return { icon: "🎫", val: `Rp ${value.toLocaleString("id-ID")}` };
  if (type === "PERCENT_DISCOUNT") return { icon: "🏷️", val: `${value}%` };
  if (type === "FREE_SHIPPING") return { icon: "🚚", val: "Gratis Ongkir" };
  if (type === "CASHBACK") return { icon: "💎", val: `Cashback ${value}%` };
  return { icon: "🎫", val: String(value) };
}
