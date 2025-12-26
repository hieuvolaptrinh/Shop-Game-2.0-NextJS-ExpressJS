"use client";

import NoticeTicker from "@/components/layout/notice-ticker.marquee";
import Image from "next/image";
import Link from "next/link";

export default function BannerHomeSection() {
  const topRechargeData = [
    { name: "Quy******", amount: "6.296.000 đ" },
    { name: "Lon****", amount: "5.750.000 đ" },
    { name: "Leb********", amount: "2.960.000 đ" },
    { name: "Toi*****", amount: "2.800.000 đ" },
  ];

  return (
    <div className="w-full flex flex-col items-center pt-8">
      <div className="w-full max-w-[1300px] px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Hero Section: Banner + Top Recharge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Banner */}
          <div className="lg:col-span-8">
            <div className="relative w-full aspect-[2/1] lg:aspect-auto lg:h-full rounded-lg overflow-hidden shadow-lg border border-border">
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
            <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border h-full flex flex-col transition-colors duration-300">
              <div className="bg-primary p-4 text-center">
                <h3 className="text-primary-foreground text-xl font-bold flex items-center justify-center gap-2 uppercase tracking-tight">
                   🏆 TOP Nạp Tháng 12
                </h3>
              </div>
              <div className="p-4 flex-1 flex flex-col gap-3">
                {topRechargeData.map((user, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-sm">
                            {index + 1}.
                        </span>
                        <span className="font-bold text-foreground transition-colors truncate max-w-[100px]">{user.name}</span>
                    </div>
                    <span className="font-extrabold text-[#3a8ef6]">{user.amount}</span>
                  </div>
                ))}
                <div className="mt-auto pt-4">
                    <Link href="/deposit" className="block w-full">
                        <button className="w-full bg-primary hover:opacity-90 active:scale-95 text-primary-foreground font-bold py-3.5 rounded-lg shadow-md transition-all uppercase flex items-center justify-center gap-2 text-sm tracking-wider">
                            👉 NẠP TIỀN NGAY 👈
                        </button>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification/Info Area */}
        <div className="bg-card rounded-lg p-6 shadow-xl text-foreground transition-colors duration-300 relative group overflow-hidden">
            <div className="space-y-3 font-medium text-[15px] leading-relaxed relative z-10">
                <p className="flex items-center gap-2">
                    <span className="text-primary font-bold flex items-center gap-1">Ẩn vào <span className="text-2xl">==&gt;</span> <a href="#" className="underline decoration-primary underline-offset-4 hover:text-blue-500">ĐÂY</a></span> 
                    để xem video hướng dẫn tạo tài khoản và nạp tiền
                </p>
                <div className="h-px w-full bg-border/50 my-2"></div>
                <p className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>Kiểm tra acc được hết rồi mới đổi thông tin và tự bảo vệ acc (<span className="text-muted-foreground italic">Acc mới mua chưa kiểm tra đã thêm thông tin có vấn đề đổi hoàn shop không hỗ trợ</span>)</span>
                </p>
                <p className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>
                        Acc đã bán rồi shop không lưu giữ tkmk nữa, Hệ thống tự động xóa, vì vậy mọi người tự lưu lại và đổi mật khẩu thêm thông tin cần thiết sau khi mua acc 
                        <span className="bg-destructive/10 text-destructive px-1.5 py-0.5 rounded font-bold mx-1 text-sm border border-destructive/20">LƯU Ý: Acc mua về phải thay mật khẩu luôn không thay mất tự chịu</span> 
                        <a href="#" className="text-primary hover:underline font-bold">BẤM VÀO ĐÂY ĐỂ ĐỔI MẬT KHẨU</a>
                    </span>
                </p>
                <p className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>Follow kênh tiktok của <span className="font-bold text-primary">admin</span> để xem live tại đây <span className="text-primary">==&gt;</span> <a href="#" className="text-primary hover:underline font-bold">follow ngay</a> thank ae!</span>
                </p>
                
                <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { name: "TÚI MÙ 25k 100% RA SKIN SS", price: "SALE 25K" },
                        { name: "TÚI MÙ TINH HỆ 15K CỰC NGON", price: "GIÁ SỐC 15K" },
                        { name: "TÚI MÙ TỬ THẦN 40K SIÊU VIP - HÊN NỔ SSS", price: "VIP 40K" },
                        { name: "TÚI MÙ VŨ BÃO 110K - MAY MẮN NỔ SSS", price: "PREMIUM 110K" }
                    ].map((item, i) => (
                        <p key={i} className="flex items-center justify-between bg-muted/30 p-2.5 rounded-lg border border-border/30 hover:bg-muted/50 transition-all cursor-pointer">
                            <span className="font-bold text-destructive truncate mr-2">{item.name}</span>
                            <a href="#" className="shrink-0 bg-primary/10 text-primary px-3 py-1 rounded-md font-bold text-xs border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all">MUA NGAY</a>
                        </p>
                    ))}
                </div>
            </div>
        </div>

        {/* Scrolling Banner */}
        <NoticeTicker />

      </div>
    </div>
  );
}
