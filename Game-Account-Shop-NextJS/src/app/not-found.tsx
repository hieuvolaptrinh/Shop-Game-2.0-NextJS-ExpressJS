import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Không Tìm Thấy Trang",
  description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-purple-500 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Không Tìm Thấy Trang
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto">
          Tài khoản game bạn đang tìm kiếm có thể đã được bán hoặc trang này
          không tồn tại.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Về Trang Chủ
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
          >
            Xem Tài Khoản
          </Link>
        </div>
      </div>
    </div>
  );
}
