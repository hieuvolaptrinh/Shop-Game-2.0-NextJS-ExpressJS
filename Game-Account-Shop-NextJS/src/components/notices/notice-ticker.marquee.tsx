"use client";

import { useEffect, useState } from "react";
import { getRecentOrdersForBanner } from "@/apis/purchase.api";
import type { ApiResponse } from "@/types/api.type";
import { formatTimeAgo } from "@/utils/format-date.util";

interface BannerOrder {
  createdAt: string;
  description: string;
  email: string;
}

export default function NoticeTicker() {
  const [notices, setNotices] = useState<BannerOrder[]>([]);

  useEffect(() => {
    async function fetchRecentOrders() {
      try {
        const res: ApiResponse<BannerOrder[]> = await getRecentOrdersForBanner();

        if (res?.data?.length) {
          setNotices(res.data);
        } else {
            // Fallback content for testing/empty state
            setNotices([
                { createdAt: new Date().toISOString(), description: "Tài khoản #123456", email: "user@example.com" },
                { createdAt: new Date().toISOString(), description: "Tài khoản #789012", email: "gamer@test.com" },
                 { createdAt: new Date().toISOString(), description: "Tài khoản #345678", email: "vip@shop.com" },
            ]);
        }
      } catch (err) {
        console.error("Failed to load recent orders:", err);
      }
    }

    fetchRecentOrders();
  }, []);

  const repeatedNotices = [...notices, ...notices, ...notices]; // Repeat more for smooth loop

  return (
    <div className="w-full mt-6">
      {/* Top Scrolling Ticker */}
      <div className="bg-card border border-border rounded-xl shadow-sm mb-3 overflow-hidden h-12 flex items-center transition-colors duration-300">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="text-primary font-bold text-lg mr-2">🔔 [SHOP]</span>
              <span className="text-foreground font-bold text-sm sm:text-base uppercase tracking-tight">UY TÍN - GIÁ RẺ - CHẤT LƯỢNG</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Ticker */}
      <div className="bg-card border border-border rounded-xl shadow-md overflow-hidden h-14 flex items-center transition-colors duration-300">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {repeatedNotices.map((order, index) => (
            <div key={index} className="inline-flex items-center mx-6 text-sm sm:text-base">
              <span className="mr-2 text-green-500">🛒</span>
              <span className="text-muted-foreground mr-1">Đã mua</span>
              <span className="text-blue-500 dark:text-blue-400 font-bold mr-2 uppercase text-sm tracking-tighter">{order.description || "Tài khoản VIP"}</span>
              <span className="text-muted-foreground mr-1">- Giá</span>
              <span className="text-primary font-extrabold mr-2">150.000 đ</span>
              <span className="text-border mx-2">|</span>
              <span className="text-pink-600 dark:text-pink-400 font-bold mr-2 max-w-[100px] truncate">{order.email.split('@')[0]}***</span>
              <span className="text-orange-500 dark:text-orange-400 text-sm font-medium italic">cách đây {formatTimeAgo(order.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
