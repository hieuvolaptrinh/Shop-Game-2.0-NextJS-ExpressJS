"use client";

import Link from "next/link";
import { GameRoutes } from "@/routes";
import { GameCategory } from "@/types/game-category.type";

interface AccRankListSectionProps {
  gameCategories: GameCategory[]; // Reuse categories or fetch separate rank data
  loading?: boolean;
}

export default function AccRankListSection({ gameCategories, loading }: AccRankListSectionProps) {

  const getLocalImage = (index: number) => {
    const imageIndex = (index % 12) + 1;
    return `/images/types_account/type${imageIndex}.jpg`;
  };

  if (loading) return null;

  return (
    <div className="mb-12">
      <div className="mb-8 text-center relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5c7af7] dark:text-blue-400 uppercase inline-block pb-1 border-b-4 border-[#5c7af7] dark:border-blue-400 transition-colors duration-300">
          ACC RANK - TRẮNG THÔNG TIN
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {gameCategories.slice(0, 4).map((game, index) => (
          <Link
            key={index}
            // Link to Account List Page for "acc-rank"
            href={GameRoutes.accountType(game.gameCategoryName, game.gameCategoryId, "acc-rank") as any}
            className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 dark:border-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 flex flex-col relative cursor-pointer"
          >
            <div className="p-1">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100 dark:border-gray-800">
                <img
                  src={getLocalImage(index + 4)}
                  alt="Acc Rank"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="p-3 pt-2 text-center flex flex-col items-center">
              <h3 className="text-[14px] font-extrabold text-blue-900 dark:text-blue-300 uppercase leading-tight mb-2">
                ACC RANK {game.gameCategoryName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs font-bold mb-3">
                Còn <span className="text-red-600 dark:text-red-400 text-sm">{30 + index * 15}</span> Nick
              </p>
              <div className="mt-auto">
                <div className="bg-[url('https://shopgame.vn/storage/images/btn-buy.png')] bg-contain bg-no-repeat bg-center h-8 w-24 mx-auto filter hue-rotate-180"></div>
                <div className="bg-blue-600 text-white text-xs font-bold py-1.5 px-8 rounded-full shadow-blue-300 shadow-lg">
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
