"use client";
import { Users, Clock, Facebook, Phone, Mail, ShieldCheck } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-background text-muted-foreground text-xs md:text-sm border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* --- Column 1: Logo & Description --- */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <img
            src="/images/logo.png"
            alt="Best Game Account Store"
            className="h-18 w-auto mx-auto mb-4 hover:scale-105 transition-transform duration-200 dark:invert drop-shadow-lg"
          />
          <p
            className="text-muted-foreground leading-relaxed text-[13px]"
          >
            Best Game Account Store — nơi cung cấp tài khoản Honkai Star Rail, Genshin Impact an toàn, tốt nhất thế giới
          </p>
        </div>

        {/* --- Column 2: Trust & Policy --- */}
        <div className="flex flex-col items-center mx-auto lg:mx-0 lg:items-start text-center lg:text-left">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Uy tín & Chính sách
          </h3>
          <ul className="space-y-2 w-full">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3f9ced]" />
              <span className="font-medium text-[13px]">Cam kết bảo hành 100% tài khoản</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3f9ced]" />
              <span className="font-medium text-[13px]">Hỗ trợ đổi email, bảo mật tài khoản</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3f9ced]" />
              <span className="font-medium text-[13px]">Giao dịch nhanh chóng, an toàn tuyệt đối</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3f9ced]" />
              <span className="font-medium text-[13px]">Chính sách hoàn tiền minh bạch</span>
            </li>
          </ul>
        </div>

        {/* --- Column 3: Contact --- */}
        <div className="flex flex-col mx-auto lg:mx-0 items-center lg:items-start text-center lg:text-left">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-500" />
            Liên hệ & Hỗ trợ
          </h3>
          <ul className="space-y-2 w-full text-[13px]">
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#3f9ced]" />
              <span>Hỗ trợ: 8h - 22h mỗi ngày</span>
            </li>
            <li className="flex items-center gap-2 hover:text-[#3f9ced] transition cursor-pointer">
              <Facebook className="w-4 h-4 text-[#3f9ced]" />
              <span>FB CSKH (Hỗ trợ mọi vấn đề)</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#3f9ced]" />
              <span>proofbga@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* --- Column 4: Join Discord --- */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Tham gia nhóm Discord
          </h3>
          <a
            href={""}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4"
          >
            <span className="font-bold text-blue-600 dark:text-blue-400 text-sm mb-3">
              Nhận hỗ trợ, trò chuyện và kết nối cộng đồng!
            </span>
          </a>
          <div className="p-3 bg-muted/50 rounded-2xl border border-border transition-colors duration-300">
            <img
                src="/images/qr/zalo-qr.jpg"
                alt="Zalo CSKH QR"
                className="w-32 h-32 object-contain dark:brightness-90"
            />
          </div>
        </div>
      </div>

      {/* --- Copyright --- */}
      <div className="border-t border-border text-center text-muted-foreground/60 text-[12px] py-6">
        © 2025 Best Game Account Store — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
