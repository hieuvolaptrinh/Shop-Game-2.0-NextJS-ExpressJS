"use client";

import Link from "next/link";
import { GameRoutes } from "@/routes";

export default function LuckyBagListSection() {

  const getLocalImage = (index: number) => {
    const imageIndex = (index % 12) + 1;
    return `/images/types_account/type${imageIndex}.jpg`;
  };

  const luckyBags = [
    { name: "TÚI MÙ 25K", slug: "tui-mu-25k", price: "25k", stock: 667, img: 7 },
    { name: "TÚI MÙ 15K", slug: "tui-mu-15k", price: "15k", stock: 1531, img: 8 },
    { name: "TÚI MÙ 40K", slug: "tui-mu-40k", price: "40k", stock: 424, img: 9 },
    { name: "TÚI MÙ 110K", slug: "tui-mu-110k", price: "110k", stock: 33, img: 10 },
    { name: "RANDOM 3K CỰC RẺ", slug: "random-3k", price: "3k", stock: 12503, img: 11 },
    { name: "RANDOM 1K CỰC NGON", slug: "random-1k", price: "1k", stock: 10633, img: 12 },
  ];

  return (
    <div className="mb-12">
      <div className="mb-8 text-center relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5c7af7] dark:text-blue-400 uppercase inline-block pb-1 border-b-4 border-[#5c7af7] dark:border-blue-400 transition-colors duration-300">
          TÚI MÙ - THỬ VẬN MAY
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {luckyBags.map((item, index) => (
          <Link
            key={index}
            // Using a default game "Lien Quan" (ID 1) as placeholder for Lucky Bags, 
            // OR use a specific "Lucky Bag" game if exists. For now, assuming Lien Quan.
            href={GameRoutes.accountType("Lien Quan", 1, item.slug) as any}
            className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 dark:border-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 flex flex-col relative cursor-pointer"
          >
            <div className="p-1">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100 dark:border-gray-800">
                <img
                  src={getLocalImage(item.img)}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-0 right-0 bg-yellow-400 text-red-600 text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 border border-red-500/20">
                  SALE
                </div>
              </div>
            </div>
            <div className="p-3 pt-2 text-center flex flex-col items-center">
              <h3 className="text-[14px] font-extrabold text-blue-900 dark:text-blue-300 uppercase leading-tight mb-2 min-h-[40px] flex items-center justify-center">
                {item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs font-bold mb-3">
                Còn <span className="text-red-600 dark:text-red-400 text-sm">{item.stock}</span> Nick
              </p>
              <div className="mt-auto w-full flex justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold py-1.5 px-10 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all uppercase items-center flex gap-1 transform active:scale-95">
                  <span
                    style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
                    className="bg-blue-300/30 absolute inset-0 hidden"
                  ></span>
                  XEM TẤT CẢ
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
