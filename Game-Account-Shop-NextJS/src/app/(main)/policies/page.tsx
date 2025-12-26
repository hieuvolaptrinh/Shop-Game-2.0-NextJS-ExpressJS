import PolicesSection from "@/sections/policies/polices.section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách - Điều Khoản, Quyền Riêng Tư & Chính Sách Hoàn Tiền",
  description:
    "Đọc các chính sách toàn diện của chúng tôi bao gồm điều khoản dịch vụ, chính sách bảo mật, chính sách hoàn tiền và nguyên tắc bảo vệ người mua. Sự an toàn của bạn là ưu tiên hàng đầu của chúng tôi.",
  keywords: [
    "điều khoản dịch vụ",
    "chính sách bảo mật",
    "chính sách hoàn tiền",
    "bảo vệ người mua",
    "chính sách tài khoản game",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Chính Sách Của Chúng Tôi",
    description:
      "Điều khoản, quyền riêng tư và chính sách hoàn tiền khi mua tài khoản game an toàn",
    type: "website",
  },
};

function PoliciesPage() {
  return (
    <div>
      <PolicesSection />
    </div>
  );
}

export default PoliciesPage;
