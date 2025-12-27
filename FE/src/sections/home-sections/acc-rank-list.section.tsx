import Link from "next/link";
import { GameRoutes } from "@/routes";
import { Account } from "@/types/index.type";

interface AccRankListSectionProps {
  accounts: Account[];
}

export default function AccRankListSection({ accounts }: AccRankListSectionProps) {
  return (
    <div className="mb-12">
      <div className="mb-8 text-center relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#5c7af7] dark:text-blue-400 uppercase inline-block pb-1 border-b-4 border-[#5c7af7] dark:border-blue-400 transition-colors duration-300">
          ACC RANK - TRẮNG THÔNG TIN
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accounts.map((acc) => {
          const gameName = acc.type?.name || "Game";
          const gameId = acc.typeId;
          const detailUrl = GameRoutes.accountDetail(
            gameName,
            gameId,
            "acc-rank",
            acc.description,
            acc._id
          );

          return (
            <Link
              key={acc._id}
              href={detailUrl as any}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border-2 border-blue-500/30 dark:border-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 flex flex-col relative cursor-pointer"
            >
              <div className="p-1">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100 dark:border-gray-800">
                  <img
                    src={acc.images[0]?.url || "/images/placeholder.jpg"}
                    alt={acc.rank}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {acc.features.length > 0 && (
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {acc.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="bg-yellow-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                          {feature.type}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 pt-2 text-center flex flex-col items-center">
                <h3 className="text-[14px] font-extrabold text-blue-900 dark:text-blue-300 uppercase leading-tight mb-2">
                  {acc.rank} - {gameName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs font-bold mb-3">
                  Giá: <span className="text-red-600 dark:text-red-400 text-sm">{acc.price.toLocaleString("vi-VN")}đ</span>
                </p>
                <div className="mt-auto">
                  <div className="bg-blue-600 text-white text-xs font-bold py-1.5 px-8 rounded-full shadow-blue-300 shadow-lg group-hover:bg-blue-700 transition-colors">
                    MUA NGAY
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
