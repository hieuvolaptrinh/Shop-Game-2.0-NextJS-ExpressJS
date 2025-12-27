import Link from "next/link";
import { GameRoutes } from "@/routes";
import { Account } from "@/types/index.type";

interface AccRandomListSectionProps {
  accounts: Account[];
}

export default function AccRandomListSection({ accounts }: AccRandomListSectionProps) {
  return (
    <div className="mb-12">
      <div className="mb-8 text-center relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1e40af] dark:text-blue-400 uppercase inline-block pb-1 border-b-4 border-[#1e40af] dark:border-blue-400 transition-colors duration-300">
          ACC RANDOM
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accounts.map((acc) => {
          const gameName = acc.type?.name || "Game";
          const gameId = acc.typeId;
          const detailUrl = GameRoutes.accountDetail(
            gameName,
            gameId,
            "acc-random",
            acc.description,
            acc._id
          );

          return (
            <Link
              key={acc._id}
              href={detailUrl as any}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border-2 border-indigo-500/30 dark:border-indigo-500/10 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 flex flex-col relative cursor-pointer"
            >
              <div className="p-1">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-t-lg relative border-b border-gray-100 dark:border-gray-800">
                  <img
                    src={acc.images[0]?.url || "/images/placeholder.jpg"}
                    alt={acc.rank}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20">
                    RANDOM
                  </div>
                </div>
              </div>
              <div className="p-3 pt-2 text-center flex flex-col items-center">
                <h3 className="text-[14px] font-extrabold text-[#1e40af] dark:text-blue-300 uppercase leading-tight mb-2 min-h-[40px] flex items-center justify-center">
                  {acc.rank} - {gameName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs font-bold mb-3">
                  Giá: <span className="text-red-600 dark:text-red-400 text-sm">{acc.price.toLocaleString("vi-VN")}đ</span>
                </p>
                <div className="mt-auto w-full flex justify-center">
                  <div className="bg-indigo-600 text-white text-xs font-bold py-2 px-10 rounded-lg shadow-lg hover:bg-indigo-700 transition-all uppercase flex items-center gap-1">
                    THỬ VẬN MAY
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {accounts.length === 0 && (
          <div className="col-span-full py-10 text-center text-muted-foreground italic">
            Hiện chưa có tài khoản random nào...
          </div>
        )}
      </div>
    </div>
  );
}
