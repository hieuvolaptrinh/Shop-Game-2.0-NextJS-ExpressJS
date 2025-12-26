"use client";

import Link from "next/link";
import { GameRoutes } from "@/routes";
import { GameCategory } from "@/types/game-category.type";

interface AccRegListSectionProps {
  gameCategories: GameCategory[];
  loading?: boolean;
}

export default function AccRegListSection({ gameCategories, loading }: AccRegListSectionProps) {

  // Helper to cycle through local images (reused/shared logic or simple copy)
  const getLocalImage = (index: number) => {
    const imageIndex = (index % 12) + 1;
    return `/images/types_account/type${imageIndex}.jpg`;
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="mb-8 text-center relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5c7af7] dark:text-blue-400 uppercase inline-block pb-1 border-b-4 border-[#5c7af7] dark:border-blue-400 transition-colors duration-300">
          ACC REG - TRẮNG THÔNG TIN
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gameCategories.slice(0, 4).map((game, index) => {
          return (
            <Link
              key={game.gameCategoryId}
              // Link to Account List Page directly. Assuming "acc-reg" is the type.
              href={GameRoutes.accountType(game.gameCategoryName, game.gameCategoryId, "acc-reg") as any}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 dark:border-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 flex flex-col relative"
            >
              <div className="p-1">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100 dark:border-gray-800">
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
                <h3 className="text-[14px] font-extrabold text-blue-900 dark:text-blue-300 uppercase leading-tight mb-2 min-h-[40px] flex items-center justify-center">
                  {game.gameCategoryName}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-xs font-bold mb-3">
                  Còn <span className="text-red-600 dark:text-red-400 text-sm">{game.availableAccounts ?? 99}</span> Nick
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
  );
}
