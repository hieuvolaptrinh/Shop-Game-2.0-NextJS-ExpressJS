import DepositSection from "@/sections/deposit-section/deposit.section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nạp Tiền - Thêm Số Dư Vào Tài Khoản",
  description:
    "Dễ dàng nạp tiền vào ví Best Game Account Store của bạn. Nhiều phương thức thanh toán có sẵn bao gồm thẻ cào, chuyển khoản ngân hàng và tiền điện tử. Giao dịch nhanh chóng và an toàn.",
  keywords: [
    "nạp tiền",
    "thêm số dư",
    "phương thức thanh toán",
    "nạp tài khoản",
    "ví game",
  ],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Nạp Tiền - Hệ Thống Tài Khoản Game",
    description:
      "Thêm số dư vào tài khoản của bạn với nhiều phương thức thanh toán an toàn",
    type: "website",
  },
};

export default function DepositPage() {
  return <DepositSection />;
}
