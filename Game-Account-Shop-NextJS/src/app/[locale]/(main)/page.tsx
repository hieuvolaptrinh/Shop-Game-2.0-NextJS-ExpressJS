import ListGameHomeSection from "@/sections/home-sections/list-game.home.section";
import Image from "next/image";
import type { Metadata } from "next";
import SnowEffect from "@/components/effects/SnowEffect";
import HomeRoutePopup from "@/components/popups/home.popup";
import NoticeTicker from "@/components/notices/notice-ticker.marquee";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Best Game Account Store - Buy Premium Gaming Accounts",
  description:
    "Buy verified gaming accounts for League of Legends, Genshin Impact, Arknights, Mobile Legends, Honkai Star Rail & more. Instant delivery, secure payment, 24/7 support. Trusted by 50,000+ gamers worldwide.",
  keywords: [
    "buy game accounts",
    "premium gaming accounts",
    "League of Legends accounts",
    "Genshin Impact accounts",
    "gaming marketplace",
  ],
  openGraph: {
    title: "Best Game Account Store - Premium Gaming Accounts",
    description:
      "The most trusted marketplace for gaming accounts. Instant delivery & secure transactions.",
    type: "website",
    images: ["/logo.jpg"],
  },
};

const topRechargeData = [
  { name: "Quy******", amount: "6.296.000 đ" },
  { name: "Lon****", amount: "5.750.000 đ" },
  { name: "Leb********", amount: "2.960.000 đ" },
  { name: "Toi*****", amount: "2.800.000 đ" },
];

export default function Home() {
  return (
    <>
      {/* Background - Pure White/Light */}
      <div className="fixed inset-0 z-[-1] bg-white" />
      
      <HomeRoutePopup />
      <SnowEffect />

      {/* Content */}
      <div className="relative z-10 min-h-screen pb-20">
        <div className="w-full flex flex-col items-center pt-8">
          <div className="w-full max-w-[1300px] px-4 sm:px-6 lg:px-8 space-y-6">
            
            {/* Hero Section: Banner + Top Recharge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Banner */}
              <div className="lg:col-span-8">
                <div className="relative w-full aspect-[2/1] lg:aspect-auto lg:h-full rounded-xl overflow-hidden shadow-lg border-2 border-white/50">
                  <Image
                    src="/images/banner.jpg"
                    alt="Main Banner"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Right Top Recharge */}
              <div className="lg:col-span-4 flex flex-col">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-200 h-full flex flex-col">
                  <div className="bg-[#5c7af7] p-4 text-center">
                    <h3 className="text-white text-xl font-bold flex items-center justify-center gap-2">
                       🏆 TOP Nạp Tháng 12
                    </h3>
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-3 bg-white">
                    {topRechargeData.map((user, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg border border-blue-100 bg-blue-50/30 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                                {index + 1}.
                            </span>
                            <span className="font-semibold text-blue-600 truncate max-w-[100px]">{user.name}</span>
                        </div>
                        <span className="font-bold text-red-500">{user.amount}</span>
                      </div>
                    ))}
                    <div className="mt-auto pt-4">
                        <Link href="/deposit" className="block w-full">
                            <button className="w-full bg-[#5c7af7] hover:bg-[#4b63d6] text-white font-bold py-3 rounded-lg shadow-md transition-all uppercase flex items-center justify-center gap-2">
                                👉 NẠP TIỀN NGAY 👈
                            </button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification/Info Area */}
            <div className="bg-white rounded-xl border-2 border-blue-400 p-6 shadow-lg text-gray-800">
                <div className="space-y-3 font-medium">
                    <p className="flex items-center gap-2">
                        <span className="text-blue-600 font-bold">Ẩn vào ==&gt; <a href="#" className="underline">ĐÂY</a></span> 
                        để xem video hướng dẫn tạo tài khoản và nạp tiền
                    </p>
                    <p>• Kiểm tra acc được hết rồi mới đổi thông tin và tự bảo vệ acc (Acc mới mua chưa kiểm tra đã thêm thông tin có vấn đề đổi hoàn shop không hỗ trợ)</p>
                    <p>
                        • Acc đã bán rồi shop không lưu giữ tkmk nữa, Hệ thống tự động xóa, vì vậy mọi người tự lưu lại và đổi mật khẩu thêm thông tin cần thiết sau khi mua acc 
                        <span className="text-red-600 font-bold ml-1">LƯU Ý:Acc mua về phải thay mật khẩu luôn không thay mất tự chịu</span> 
                        <a href="#" className="text-blue-500 ml-1 hover:underline">BẤM VÀO ĐÂY ĐỂ ĐỔI MẬT KHẨU</a>
                    </p>
                    <p>follow kênh tiktok của adimin để xem live tại đây &gt; <a href="#" className="text-blue-500 hover:underline">follow ngay</a> thank ae</p>
                    
                    <div className="pt-2 space-y-1">
                        <p className="font-bold text-red-600">TÚI MÙ 25k 100% RA SKIN SS <a href="#" className="text-blue-500 font-normal hover:underline">MUA TẠI ĐÂY</a> DANG SALE NHA AE</p>
                        <p className="font-bold text-red-600">TÚI MÙ TINH HỆ 15K CỰC NGON <a href="#" className="text-blue-500 font-normal hover:underline">MUA TẠI ĐÂY</a></p>
                        <p className="font-bold text-red-600">TÚI MÙ TỬ THẦN 40K SIÊU VIP HÊN LÀ NỔ SKIN SSS <a href="#" className="text-blue-500 font-normal hover:underline">MUA TẠI ĐÂY</a></p>
                        <p className="font-bold text-red-600">TÚI MÙ VŨ BÃO 110K MAY MẮN NỔ SKIN SSS <a href="#" className="text-blue-500 font-normal hover:underline">MUA TẠI ĐÂY</a></p>
                    </div>
                </div>
            </div>

            {/* Scrolling Banner */}
            <NoticeTicker />

          </div>
        </div>

        {/* Existing Sections */}
        <ListGameHomeSection />
      </div>
    </>
  );
}
