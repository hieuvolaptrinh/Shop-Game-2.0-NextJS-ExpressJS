import ListGameHomeSection from "@/sections/home-sections/list-game.home.section";
import Image from "next/image";
import type { Metadata } from "next";

import BannerHomeSection from "@/sections/home-sections/banner.home.section";
import NotificationModal from "@/components/modals/nofitication.modal";

export const metadata: Metadata = {
  title: "Shop Tài Khoản Game Uy Tín - Mua Bán Acc Game Cao Cấp",
  description:
    "Mua bán tài khoản game uy tín: Liên Quân Mobile. Giao dịch tự động, nhận acc ngay, bảo hành trọn đời. Hỗ trợ 24/7.",
  keywords: [
    "mua acc game",
    "shop acc uy tin",
    "acc lien quan mobile",
    "mua ban tai khoan game",
  ],
  openGraph: {
    title: "Shop Tài Khoản Game Uy Tín - Mua Bán Acc Game Cao Cấp",
    description:
      "Nền tảng mua bán tài khoản game tin cậy nhất. Giao dịch nhanh chóng & an toàn tuyệt đối.",
    type: "website",
    images: ["/logo.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <NotificationModal />

      {/* Content */}
      <div className="relative z-10 min-h-screen pb-20">
        <div className="w-full flex flex-col items-center pt-8">
          <BannerHomeSection />
        </div>

        {/* Existing Sections */}
        <ListGameHomeSection />
      </div>
    </>
  );
}
