"use client";

import { Wallet, Upload, CheckCircle, ShoppingCart, Gift } from "lucide-react";

function BuyingGuideSection() {

  const steps = [
    {
      icon: Wallet,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      title: "Nhập số tiền muốn nạp",
      description: "Chọn số tiền và phương thức thanh toán phù hợp (Nạp card hoặc Chuyển khoản).",
    },
    {
      icon: Upload,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      title: "Thanh toán & Chụp bill",
      description: "Thực hiện thanh toán theo thông tin hiển thị và chụp lại ảnh biên lai thành công.",
    },
    {
      icon: CheckCircle,
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      title: "Gửi yêu cầu & Đợi duyệt",
      description: "Tải ảnh bill lên hệ thống. Admin sẽ kiểm tra và cộng tiền vào tài khoản của bạn trong 1-5 phút.",
    },
    {
      icon: ShoppingCart,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      title: "Chọn Nick & Mua hàng",
      description: "Tìm kiếm tài khoản game bạn yêu thích, chọn 'Mua ngay' và xác nhận thanh toán bằng số dư.",
    },
    {
      icon: Gift,
      iconColor: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
      title: "Nhận tài khoản ngay",
      description: "Sau khi xác nhận, thông tin tài khoản sẽ hiển thị ngay lập tức trong lịch sử mua hàng của bạn.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
          <span className="text-4xl sm:text-5xl">⚡</span>
          <span className="leading-tight">Hướng Dẫn Mua Hàng</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg px-4">Chỉ với 5 bước đơn giản để sở hữu ngay tài khoản yêu thích</p>
      </div>

      {/* Steps */}
      <div className="space-y-4 sm:space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className={`flex gap-4 sm:gap-6 p-4 sm:p-6 bg-[#1a1d29] rounded-xl border ${step.borderColor} hover:border-opacity-60 transition-all duration-300 hover:transform hover:scale-[1.02]`}
            >
              <div
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full ${step.bgColor} flex items-center justify-center relative`}
              >
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${step.iconColor}`} />
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-lg sm:text-xl mb-1 sm:mb-2 break-words">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed break-words">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
        <p className="text-center text-base sm:text-lg text-white font-semibold mb-2 break-words">
          💬 Nếu gặp bất kỳ khó khăn nào, hãy nhắn tin ngay cho Support qua Discord!
        </p>
        <p className="text-center text-xs sm:text-sm text-gray-400 break-words px-2">
          Lưu ý: Mọi thông tin giao dịch đều được bảo mật tuyệt đối.
        </p>
      </div>
    </div>
  );
}

export default BuyingGuideSection;
