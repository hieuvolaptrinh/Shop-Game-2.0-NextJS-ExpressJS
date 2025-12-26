"use client";

import { Mail, MessageCircle } from "lucide-react";

interface PolicyDetail {
  text: string;
}

interface Policy {
  id: number;
  title: string;
  description: string;
  icon: string;
  details: PolicyDetail[];
  gradient: string;
}

const policiesData: Policy[] = [
  {
    id: 1,
    title: "Chính Sách Bảo Mật Thông Tin",
    description: "Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng theo các tiêu chuẩn bảo mật cao nhất.",
    icon: "🔒",
    details: [
      { text: "Mọi thông tin cá nhân được mã hóa và lưu trữ an toàn" },
      { text: "Không chia sẻ dữ liệu cho bên thứ ba khi chưa có sự đồng ý" },
      { text: "Tuân thủ nghiêm ngặt các quy định về bảo vệ dữ liệu" },
      { text: "Hệ thống bảo mật được cập nhật thường xuyên" },
    ],
    gradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    id: 2,
    title: "Chính Sách Bảo Hành",
    description: "Đảm bảo quyền lợi của khách hàng với chính sách bảo hành linh hoạt và rõ ràng.",
    icon: "🛡️",
    details: [
      { text: "Bảo hành 7-30 ngày tùy theo gói sản phẩm đã chọn" },
      { text: "Hỗ trợ đổi tài khoản mới hoàn toàn miễn phí if có lỗi" },
      { text: "Xử lý khiếu nại trong vòng 24 giờ làm việc" },
      { text: "Đội ngũ kỹ thuật hỗ trợ 24/7 trong thời gian bảo hành" },
    ],
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: 3,
    title: "Chính Sách Thanh Toán",
    description: "Cung cấp đa dạng phương thức thanh toán an toàn, nhanh chóng và tiện lợi.",
    icon: "💳",
    details: [
      { text: "Thanh toán qua các cổng thanh toán - An toàn và nhanh chóng" },
      { text: "Chuyển khoản TRC20-USDT - Phí thấp, xử lý nhanh" },
      { text: "Xác nhận giao dịch tự động trong 1-5 phút" },
      { text: "Hỗ trợ thanh toán 24/7 mọi thời điểm" },
    ],
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: 4,
    title: "Chính Sách Đổi Trả & Hoàn Tiền",
    description: "Chính sách đổi trả linh hoạt, bảo vệ quyền lợi tối đa cho người tiêu dùng.",
    icon: "🔄",
    details: [
      { text: "Đổi trả trong 24 giờ nếu tài khoản không đúng mô tả" },
      { text: "Hoàn tiền 100% nếu có vấn đề về bảo mật ban đầu" },
      { text: "Thời gian xử lý hoàn tiền: 1-3 ngày làm việc" },
      { text: "Kiểm tra kỹ thông tin trước khi hoàn tất giao dịch" },
    ],
    gradient: "from-orange-500/10 to-red-500/10",
  },
  {
    id: 5,
    title: "Chính Sách Giao Hàng",
    description: "Giao tài khoản nhanh chóng ngay sau khi thanh toán thành công.",
    icon: "📦",
    details: [
      { text: "Giao thông tin tài khoản qua Email hoặc Discord ngay lập tức" },
      { text: "Hướng dẫn chi tiết cách đổi mật khẩu và bảo mật tài khoản" },
      { text: "Kiểm tra và xác nhận thông tin trước khi giao hàng" },
      { text: "Hỗ trợ đăng nhập lần đầu nếu khách hàng gặp khó khăn" },
    ],
    gradient: "from-indigo-500/10 to-blue-500/10",
  },
  {
    id: 6,
    title: "Điều Khoản Sử Dụng",
    description: "Các quy định và điều khoản khi sử dụng dịch vụ mua bán tài khoản game.",
    icon: "📜",
    details: [
      { text: "Khách hàng phải từ 16 tuổi trở lên để thực hiện giao dịch" },
      { text: "Tuân thủ các điều khoản của nhà phát hành game" },
      { text: "Không sử dụng tài khoản cho mục đích vi phạm pháp luật" },
      { text: "Chúng tôi không chịu trách nhiệm nếu tài khoản bị khóa do vi phạm" },
    ],
    gradient: "from-slate-500/10 to-gray-500/10",
  },
];

function PolicesSection() {
  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Chính Sách & Điều Khoản
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Vui lòng đọc kỹ các chính sách để hiểu rõ quyền lợi của bạn
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
          {policiesData.map((policy) => (
            <div
              key={policy.id}
              className={`group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row items-start gap-5 md:gap-6">
                {/* Icon */}
                <div className="text-5xl md:text-6xl flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300 grayscale-[0.2] group-hover:grayscale-0">
                  {policy.icon}
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 mb-5 leading-relaxed text-sm md:text-base">
                    {policy.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-3">
                    {policy.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600 text-sm md:text-base"
                      >
                        <span className="text-blue-500 mt-1 flex-shrink-0 font-bold">
                          ✓
                        </span>
                        <span className="leading-relaxed">{detail.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-6">
              Liên Hệ Hỗ Trợ 24/7
            </h3>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Email */}
              <a
                href="mailto:proofbga@gmail.com"
                className="group flex items-center gap-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl p-4 md:p-5 transition-all duration-300"
              >
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">
                    Email
                  </p>
                  <p className="text-gray-900 font-semibold text-sm md:text-base truncate">
                    proofbga@gmail.com
                  </p>
                </div>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/8DrYCxTV7u"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-xl p-4 md:p-5 transition-all duration-300"
              >
                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 text-xs md:text-sm mb-1">
                    Discord
                  </p>
                  <p className="text-gray-900 font-semibold text-sm md:text-base truncate">
                    https://discord.gg/8DrYCxTV7u
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PolicesSection;
