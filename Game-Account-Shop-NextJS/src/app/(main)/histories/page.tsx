import React from "react";
import HistoriesSection from "@/sections/histories-section/histories.section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch Sử Giao Dịch - Theo Dõi Đơn Hàng",
  description:
    "Xem toàn bộ lịch sử đơn hàng và theo dõi tất cả các giao dịch mua tài khoản game của bạn. Theo dõi trạng thái đơn hàng, tải biên lai và quản lý các giao dịch của bạn.",
  keywords: [
    "lịch sử đơn hàng",
    "lịch sử mua hàng",
    "theo dõi đơn hàng",
    "mua tài khoản game",
    "lịch sử giao dịch",
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Lịch Sử Giao Dịch",
    description: "Theo dõi và quản lý tất cả các giao dịch mua tài khoản game của bạn",
    type: "website",
  },
};

export default function HistoriesPage() {
  return <HistoriesSection />;
}
