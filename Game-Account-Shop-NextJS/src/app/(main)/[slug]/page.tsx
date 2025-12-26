import { notFound } from "next/navigation";
import Link from "next/link";
import ListAccountSection from "@/sections/account-sections/list-account.section";
import { GameRoutes } from "@/routes";
import Image from "next/image";
import { listGameAccounts } from "@/apis/game-account.api";
import type { GameAccount } from "@/types/game-account.type";
import type { Metadata } from "next";
import { Suspense } from "react";
import { cache } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";

// Known prefixes for account types to parse from single slug
const KNOWN_TYPES = [
  "acc-reg",
  "acc-rank",
  "tui-mu",
  "vip",
  "reroll",
  "normal",
  "random-3k",
  "random-1k",
  "random",
];

function parseOneLevelSlug(slug: string) {
  // slug format: {type}-{gameName}-{gameId} OR {gameName}-{gameId}
  // 1. Extract ID
  const parts = slug.split("-");
  const lastPart = parts[parts.length - 1];
  const gameId = Number(lastPart);

  if (isNaN(gameId)) {
    return { gameId: null, gameName: slug, type: null };
  }

  // Remainder: type-gameName
  const textPart = parts.slice(0, parts.length - 1).join("-");
  
  // 2. Identify Type
  // Try to match start of textPart with known types
  // Sort prefixes by length descending to match longest first (e.g. random-3k vs random)
  const sortedTypes = [...KNOWN_TYPES].sort((a, b) => b.length - a.length);
  
  let type = "acc-reg"; // Default fallback if no type found? Or maybe "normal"?
  let gameName = textPart;

  for (const knownType of sortedTypes) {
    if (textPart === knownType || textPart.startsWith(`${knownType}-`)) {
       type = knownType;
       // Remove type prefix from gameName
       // e.g. acc-reg-lien-quan -> lien-quan
       // e.g. acc-reg -> "" (invalid?)
       const remainder = textPart.slice(knownType.length);
       if (remainder.startsWith("-")) {
         gameName = remainder.substring(1);
       } else if (remainder === "") {
          gameName = ""; // Should not happen for valid game URL
       }
       break;
    }
  }

  return { gameId, gameName, type };
}

// Map slugs to display names and API values
function normalizeAccountType(typeSlug: string) {
  const map: Record<string, { display: string; apiValue: string; slug: string }> = {
    "acc-reg": { display: "ACC REG", apiValue: "acc-reg", slug: "acc-reg" },
    "acc-rank": { display: "ACC RANK", apiValue: "acc-rank", slug: "acc-rank" },
    "tui-mu": { display: "TÚI MÙ", apiValue: "tui-mu", slug: "tui-mu" },
    "vip": { display: "VIP", apiValue: "vip", slug: "vip" },
    "reroll": { display: "REROLL", apiValue: "reroll", slug: "reroll" },
    "normal": { display: "NORMAL", apiValue: "normal", slug: "normal" },
    "random-3k": { display: "RANDOM 3K", apiValue: "random-3k", slug: "random-3k" },
    "random-1k": { display: "RANDOM 1K", apiValue: "random-1k", slug: "random-1k" },
  };
  return map[typeSlug] || { display: typeSlug.toUpperCase(), apiValue: typeSlug, slug: typeSlug };
}

const fetchAccounts = cache(
  async (gameId: number, typeAccount: string, page: number) => {
    return listGameAccounts({
      gameCategoryId: gameId,
      typeAccount,
      status: "available",
      limit: 12,
      page,
      sortOrder: "ASC",
    });
  }
);

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { gameName, type } = parseOneLevelSlug(slug);
  
  if (!type) return { title: "Tài Khoản Game" };

  const accountType = normalizeAccountType(type);
  const typeLabel = accountType.display;

  return {
    title: `Mua Tài Khoản ${gameName} ${typeLabel} - Uy Tín & Chất Lượng`,
    description: `Danh sách tài khoản ${typeLabel.toLowerCase()} ${gameName}. Giao dịch an toàn, nhận acc ngay.`,
  };
}

export default async function AccountListPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: rawPage } = await searchParams;
  const currentPage = Math.max(Number(rawPage) || 1, 1);

  let { gameName, gameId, type } = parseOneLevelSlug(slug);

  // Fallback defaults if parsing fails (Force Load)
  if (!gameId) gameId = 1; 
  if (!type) type = "acc-reg";
  if (!gameName) gameName = slug; // Use the slug as name if parsing failed

  const accountType = normalizeAccountType(type);

  // Try to fetch, if API errors, we handle it gracefully or let it show empty list
  let accounts: GameAccount[] = [];
  let totalPages = 1;

  /* MOCK DATA GENERATION */
  const MOCK_ACCOUNTS: GameAccount[] = Array.from({ length: 12 }).map((_, i) => {
    // Generate some random looking IDs like in the screenshots
    const mockId = 1000000 + Math.floor(Math.random() * 9000000);
    const mockPrices = [170000, 220000, 199999, 1399999, 80000, 110000, 450000, 300000];
    const price = mockPrices[i % mockPrices.length];
    
    return {
      gameAccountId: mockId,
      status: "available",
      gameCategoryId: Number(gameId) || 1,
      title: `${gameName} - Tài khoản Vip #${i + 1}`,
      originalPrice: price * 1.5,
      currentPrice: price,
      description: "Trắng thông tin, bảo hành trọn đời, hỗ trợ đổi trả nếu lỗi.",
      mainImageUrl: `/images/types_account/type${(i % 12) + 1}.jpg`,
      typeAccount: (type as any) || "Normal",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      gameCategory: {
          gameCategoryId: Number(gameId) || 1,
          gameCategoryName: gameName || "Game",
          imageGameCategory: "/images/banner.jpg"
      },
      images: []
    };
  });

  try {
     const response = await fetchAccounts(gameId, accountType.apiValue, currentPage);
     accounts = response.data?.data || [];
     totalPages = response.data?.pagination?.totalPages || 1;
     
     // Fallback to mock if empty response (Mocking for User Request)
     if (accounts.length === 0) {
        accounts = MOCK_ACCOUNTS;
     }

  } catch (error) {
     console.error("Fetch error or API mismatch, showing mock list:", error);
     accounts = MOCK_ACCOUNTS;
  }

  return (
    <div className="min-h-screen bg-background pb-20 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Title */}
        <div className="text-center mb-8">
           <h1 className="text-xl md:text-3xl font-bold text-primary uppercase inline-block tracking-tight">
             Tài Khoản {gameName} - {accountType.display}
           </h1>
           <div className="h-1 w-16 bg-primary mx-auto mt-3 rounded-full opacity-50"></div>
        </div>

        {/* Notification Box */}
        <div className="max-w-4xl mx-auto bg-card border border-primary/30 rounded-lg p-5 mb-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 text-sm font-semibold text-foreground/80 space-y-2 mb-5">
                <div className="flex items-start gap-2.5">
                   <div className="mt-0.5 p-1 bg-primary/10 rounded-md text-primary">
                      <ShieldCheck className="w-3.5 h-3.5" />
                   </div>
                   <p className="text-xs md:text-sm">Bảo hành tài khoản tới <span className="text-primary font-bold">7 ngày</span> (Độc quyền tại Shop). Hỗ trợ hoàn tiền/đổi mới nếu lỗi.</p>
                </div>
                <div className="flex items-start gap-2.5">
                   <div className="mt-0.5 p-1 bg-destructive/10 rounded-md text-destructive">
                      <ShieldAlert className="w-3.5 h-3.5" />
                   </div>
                   <p className="text-xs md:text-sm text-destructive">Vui lòng thay đổi mật khẩu ngay sau khi mua để bảo mật tuyệt đối.</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="p-1 bg-blue-500/10 rounded-md text-blue-500">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs md:text-sm">Nhóm Zalo: <a href="#" className="text-primary hover:underline font-bold">Tham gia ngay</a></p>
                </div>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col items-center gap-3 py-3 bg-muted/20 rounded-lg border border-border/40">
                 <div className="relative w-32 h-32 bg-white p-1.5 rounded-lg shadow-sm border border-border">
                     <Image 
                        src="/images/qr/zalo-qr.jpg"
                        alt="Zalo System QR"
                        width={128}
                        height={128}
                        className="object-contain"
                     />
                 </div>
                 <div className="text-center">
                    <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider mb-0.5">Cập nhật thông báo tại</p>
                    <p className="text-xs font-semibold text-foreground">Kênh Tin Tức Zalo</p>
                 </div>
            </div>
        </div>

        {/* Filter & List Container */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-5 mb-8 transition-all">
             <Suspense fallback={
               <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground text-sm font-semibold animate-pulse">Đang tải danh sách...</p>
               </div>
             }>
                <ListAccountSection
                  accounts={accounts}
                  gameName={gameName || "Game"}
                  gameId={Number(gameId)}
                  type={accountType.slug}
                />
            </Suspense>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-6">
             <Link
                 href={`${GameRoutes.accountList(gameName || "", gameId, type)}?page=${Math.max(1, currentPage - 1)}`}
                 className={`w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground transition-all ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
             >
                <ChevronLeft className="w-4 h-4" />
             </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
                key={p}
                href={
                `${GameRoutes.accountList(
                    gameName || "",
                    gameId,
                    type
                )}?page=${p}`
                }
                className={`w-9 h-9 flex items-center justify-center rounded-md border text-xs font-bold transition-all ${
                p === currentPage
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-foreground"
                }`}
            >
                {p}
            </Link>
            ))}
             <Link
                 href={`${GameRoutes.accountList(gameName || "", gameId, type)}?page=${Math.min(totalPages, currentPage + 1)}`}
                 className={`w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground transition-all ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
             >
                <ChevronRight className="w-4 h-4" />
             </Link>
        </div>
        )}
        
        {/* Bottom Call to Action */}
        <div className="mt-10 text-center p-5 bg-muted/10 rounded-lg border border-dashed border-border group">
             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Cập nhật Live & Event</p>
             <a href="#" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-bold text-base transition-all">
                Visit TikTok Channel <ArrowRight className="w-4 h-4" />
             </a>
        </div>

      </div>
    </div>
  );
}
