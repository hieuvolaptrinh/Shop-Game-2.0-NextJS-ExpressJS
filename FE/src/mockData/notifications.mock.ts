import { Notification } from "@/types/index.type";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    _id: "sys-1",
    userId: "all", // Id đặc biệt cho thông báo hệ thống toàn cục
    title: "Chào mừng bạn đến với Shop Tài Khoản Game Uy Tín",
    content: "Chúc mừng bạn đã gia nhập hệ thống mua bán tài khoản game lớn nhất Việt Nam. Hiện shop đang có ưu đãi nạp tiền cực hấp dẫn!",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sys-2",
    userId: "all",
    title: "Ưu đãi nạp thẻ tháng 12",
    content: "Khuyến mãi thêm 20% giá trị nạp tiền qua ATM/MoMo từ ngày 20/12 đến 31/12. Đừng bỏ lỡ cơ hội này nhé!",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    _id: "sys-3",
    userId: "all",
    title: "Cập nhật hệ thống giao dịch tự động",
    content: "Hệ thống mua bán đã được nâng cấp lên phiên bản 2.0. Giao dịch mua acc giờ đây chỉ mất 3s để nhận thông tin!",
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "sys-4",
    userId: "all",
    title: "Cảnh báo bảo mật",
    content: "Hệ thống ghi nhận một số trang web giả mạo. Vui lòng chỉ giao dịch tại địa chỉ duy nhất của shop chúng tôi.",
    isRead: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  }
];
