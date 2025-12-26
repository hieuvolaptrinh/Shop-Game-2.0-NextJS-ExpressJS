"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { listGameCategories } from "@/apis/game-category.api";
import type { GameCategory } from "@/types/game-category.type";
import { GameRoutes } from "@/routes";
import { useGameCategory } from "@/contexts/game-category.context";

function ListGameHomeSection() {
  const t = useTranslations("home.list_game_section");
  const { setSelectedCategory } = useGameCategory();
  const [gameCategories, setGameCategories] = useState<GameCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGameCategories() {
      try {
        setLoading(true);
        const response = await listGameCategories();
        setGameCategories(response.data || []);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch game categories:", err);
        setError(err.message || "Failed to load game categories");
      } finally {
        setLoading(false);
      }
    }

    fetchGameCategories();
  }, []);

  // Helper to cycle through local images
  const getLocalImage = (index: number) => {
    // We have type1.jpg to type12.jpg
    const imageIndex = (index % 12) + 1;
    return `/images/types_account/type${imageIndex}.jpg`;
  };

  return (
    <div className="w-full flex flex-col justify-center py-8">
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {/* Header - Reggiare Style */}
        <div className="mb-8 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e40af] uppercase inline-block pb-1 border-b-4 border-[#1e40af]">
              {t("title") || "DANH MỤC GAME"}
            </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Game Grid - ACC REG */}
        {!loading && !error && (
          <div className="mb-12">
             <div className="mb-8 text-center relative">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5c7af7] uppercase inline-block pb-1 border-b-4 border-[#5c7af7]">
                  ACC REG - TRẮNG THÔNG TIN
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {gameCategories.slice(0, 4).map((game, index) => {
                return (
                    <Link
                    key={game.gameCategoryId}
                    href={GameRoutes.game(game.gameCategoryName, game.gameCategoryId) as any}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 flex flex-col relative"
                    >
                    <div className="p-1">
                        <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100">
                            <img
                                src={getLocalImage(index)}
                                alt={game.gameCategoryName}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                             {/* Top Left Badge Style */}
                             <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 uppercase">
                                Hot
                             </div>
                        </div>
                    </div>

                    <div className="p-3 pt-2 text-center flex flex-col items-center">
                        <h3 className="text-[14px] font-extrabold text-blue-900 uppercase leading-tight mb-2 min-h-[40px] flex items-center justify-center">
                        {game.gameCategoryName}
                        </h3>

                        <p className="text-gray-600 text-xs font-bold mb-3">
                        Còn <span className="text-red-600 text-sm">{game.availableAccounts ?? 99}</span> Nick
                        </p>

                        <div className="pt-8">
                            <span className="sr-only">XEM TẤT CẢ</span>
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold py-1.5 px-6 rounded-full uppercase shadow-md hover:shadow-lg transition-all hidden group-hover:block absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%]">
                                Mua Ngay
                            </div>
                        </div>
                    </div>
                    </Link>
                );
                })}
            </div>
          </div>
        )}

        {/* SECTION 2: ACC RANK */}
        <div className="mb-12">
            <div className="mb-8 text-center relative">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5c7af7] uppercase inline-block pb-1 border-b-4 border-[#5c7af7]">
                  ACC RANK - TRẮNG THÔNG TIN
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2].map((item, index) => (
                    <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 flex flex-col relative cursor-pointer">
                         <div className="p-1">
                            <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100">
                                <img
                                    src={getLocalImage(index + 4)}
                                    alt="Acc Rank"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </div>
                        <div className="p-3 pt-2 text-center flex flex-col items-center">
                            <h3 className="text-[14px] font-extrabold text-blue-900 uppercase leading-tight mb-2">
                                ACC RANK CAO
                            </h3>
                            <p className="text-gray-600 text-xs font-bold mb-3">
                                Còn <span className="text-red-600 text-sm">{30 + index * 15}</span> Nick
                            </p>
                             <div className="mt-auto">
                                <div className="bg-[url('https://shopgame.vn/storage/images/btn-buy.png')] bg-contain bg-no-repeat bg-center h-8 w-24 mx-auto filter hue-rotate-180"></div>
                                 <div className="bg-blue-600 text-white text-xs font-bold py-1.5 px-8 rounded-full shadow-blue-300 shadow-lg">XEM TẤT CẢ</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* SECTION 3: TÚI MÙ */}
        <div className="mb-12">
            <div className="mb-8 text-center relative">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5c7af7] uppercase inline-block pb-1 border-b-4 border-[#5c7af7]">
                  TÚI MÙ - THỬ VẬN MAY
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {/* Mock Data for Lucky Bags */}
                 {[
                    { name: "TÚI MÙ 25K", price: "25k", stock: 667, img: 7 },
                    { name: "TÚI MÙ 15K", price: "15k", stock: 1531, img: 8 },
                    { name: "TÚI MÙ 40K", price: "40k", stock: 424, img: 9 },
                    { name: "TÚI MÙ 110K", price: "110k", stock: 33, img: 10 },
                    { name: "RANDOM 3K CỰC RẺ", price: "3k", stock: 12503, img: 11 },
                    { name: "RANDOM 1K CỰC NGON", price: "1k", stock: 10633, img: 12 },
                 ].map((item, index) => (
                    <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 flex flex-col relative cursor-pointer">
                        <div className="p-1">
                            <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100">
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
                            <h3 className="text-[14px] font-extrabold text-blue-900 uppercase leading-tight mb-2 min-h-[40px] flex items-center justify-center">
                                {item.name}
                            </h3>
                            <p className="text-gray-600 text-xs font-bold mb-3">
                                Còn <span className="text-red-600 text-sm">{item.stock}</span> Nick
                            </p>
                            <div className="mt-auto w-full flex justify-center">
                                 <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold py-1.5 px-10 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all uppercase items-center flex gap-1 transform active:scale-95">
                                    <span style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }} className="bg-blue-300/30 absolute inset-0 hidden"></span>
                                    XEM TẤT CẢ
                                 </div>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default ListGameHomeSection;
