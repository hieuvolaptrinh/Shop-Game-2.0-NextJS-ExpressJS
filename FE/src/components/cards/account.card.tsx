import Link from "next/link";
import { Account, AccountStatus } from "@/types/index.type";
import { createSlugHtml } from "@/utils/format-slug.util";
import Image from "next/image";
import { GameRoutes } from "@/routes";

interface AccountCardProps {
  account: Account;
  parentSlug: string;
}

function AccountCard({
  account,
  parentSlug,
}: AccountCardProps) {

  const statusConfig: Record<
    AccountStatus,
    { label: string; color: string }
  > = {
    AVAILABLE: { label: "Có sẵn", color: "bg-green-600" },
    SOLD: { label: "Đã bán", color: "bg-red-600" },
    LOCKED: { label: "Đã khóa", color: "bg-gray-600" },
  };

  const actualPrice = account.price || 0;
  const coverImage = account.images?.[0]?.url || "/images/placeholder.jpg";
  const title = account.title || `Account #${account._id}`;

  const isQuickBuy = account.type?.categoryId === "cat-lucky" || account.type?.categoryId === "cat-random";
  
  const detailLink = isQuickBuy 
    ? GameRoutes.accountPayment(account.type?.name || "Game", account.typeId, account.type?.slug || "normal", title, account._id)
    : `/${parentSlug}/${createSlugHtml(title, account._id)}`;

  return (
    <div className="group bg-card text-card-foreground rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500 flex flex-col relative">
      {/* Image Container */}
      <div className="p-1.5">
        <div className="relative w-full aspect-[1.8/1] overflow-hidden rounded-lg">
          {isQuickBuy ? (
            <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
               <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Link href={detailLink}>
              <Image
                src={coverImage}
                alt={title}
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          )}
        
          {/* MS ID Badge - Top Right Ribbon Style */}
          <div className="absolute top-0 right-0 z-10">
            <div className="bg-[#ff0080] text-white px-4 py-1.5 font-extrabold text-sm md:text-base relative rounded-bl-xl shadow-lg flex items-center gap-1">
              <span className="text-[10px] md:text-xs">MS:</span>
              <span>{account._id}</span>
              {/* Optional Ribbon fold effect */}
              <div className="absolute top-full right-0 w-0 h-0 border-l-[6px] border-l-transparent border-t-[6px] border-t-[#c20061]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-2 flex-1 flex flex-col">
          
        {/* Status Badge - Dynamic Colors from Reference */}
        {(() => {
            const colors = [
                { bg: "bg-[#00a8a8]", text: "text-white" }, // Teal
                { bg: "bg-[#5c7af7]", text: "text-white" }, // Blue
                { bg: "bg-[#ffb800]", text: "text-white" }, // Yellow
                { bg: "bg-[#e11d48]", text: "text-white" }, // Red
            ];
            
            // Bulletproof index calculation for any ID format
            const rawId = account._id?.toString().replace(/\D/g, '') || '0';
            const parsedId = parseInt(rawId) || 0;
            const color = colors[Math.abs(parsedId) % colors.length] || colors[0];
            return (
                <div className="mb-4">
                     <div className={`inline-flex items-center gap-1.5 ${color.bg} ${color.text} px-3 py-1.5 rounded-lg font-extrabold text-[10px] shadow-sm group-hover:shadow-md transition-shadow uppercase`}>
                        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {account.rank || "Trắng thông tin"}
                     </div>
                </div>
            )
        })()}

        <div className="flex items-center gap-3 mt-auto">
            {/* Price section with dashed border */}
            <div className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-sm py-2 px-3 shadow-inner transition-colors duration-300">
                <svg className="w-4 h-4 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2"   y="5" width="20" height="14" rx="2" strokeWidth="2" />
                    <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
                </svg>
                <div className="flex flex-col">
                    <span className="text-gray-900 dark:text-gray-100 font-extrabold text-xs leading-none">
                        {actualPrice.toLocaleString("vi-VN")} <span className="text-xs underline">đ</span>
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <Link
                href={detailLink}
                className={`flex-[1.2] h-[30px] font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 text-[10px] shadow-md hover:shadow-lg active:scale-95 ${
                    isQuickBuy ? "bg-orange-600 hover:bg-orange-700 text-white" : "bg-[#5c7af7] hover:bg-blue-600 text-white"
                }`}
            >
                {isQuickBuy ? (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        MUA NGAY
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        CHI TIẾT
                    </>
                )}
            </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountCard;
