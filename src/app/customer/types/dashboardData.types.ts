import { OrderStatus } from "@/types";

export type DashboardData = {
  id: string;
  fullName: string;
  membershipTier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
  totalPoints: number;
  tierExpiresAt: string | null;
  avatarUrl: string | null;
  orders: {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    totalAmount: number;
    createdAt: string;
    mitra: { showroomName: string };
    items: { product: { name: string; images: { url: string }[] } }[];
  }[];
  voucherClaims: {
    voucher: {
      id: string;
      code: string;
      name: string;
      type: string;
      value: number;
      validUntil: string;
    };
  }[];
  pointTransactions: {
    id: string;
    type: string;
    amount: number;
    description: string;
    createdAt: string;
  }[];
  _count: { orders: number; reviews: number; warrantyClaims: number };
};
