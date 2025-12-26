"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function HomeRoutePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Title */}
        <div className="text-center pt-6 pb-2 px-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            🔔 Thông Báo Mới 🔔
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-2 text-center space-y-4">
          {/* Admin Follow Link */}
          <p className="text-lg font-medium text-gray-700">
            Follow Kênh Admin tại đây{" "}
            <a href="#" className="text-blue-500 font-bold hover:underline">
              Nghĩa Reg LQ
            </a>
          </p>

          {/* Special Offer Text */}
          <div className="text-lg leading-tight font-bold max-w-md mx-auto">
            <span className="text-red-500">TÚI MÙ 25K</span>{" "}
            <span className="text-gray-800">100% RA SKIN SS</span>{" "}
            <a href="#" className="inline-block hover:underline mx-1">
              <span className="text-blue-600">MUA TẠI ĐÂY</span>
            </a>{" "}
            <span className="text-gray-800">ĐANG SALE NHA AE</span>
          </div>

          {/* Social Notification Image */}
          <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-gray-200">
             <Image 
                src="/images/notification-homepage.jpg"
                alt="Notification"
                fill
                className="object-contain"
             />
          </div>

          {/* Random Offer Text */}
          <p className="text-gray-600 font-bold text-base uppercase">
            RANDOM 3K NỔ SKIN NGON NGẠI GÌ MÀ KHÔNG THỬ
          </p>
        </div>

        {/* Footer/Close Button */}
        <div className="p-6 pt-2 flex justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#8b5cf6] cursor-pointer hover:bg-[#7c3aed] text-white font-bold py-2 px-10 rounded-lg shadow-lg shadow-purple-200 transform hover:scale-105 transition-all text-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
