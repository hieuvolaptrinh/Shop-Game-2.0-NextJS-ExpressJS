import { notFound } from "next/navigation";
import Link from "next/link";
import AccountDetailSection from "@/sections/account-sections/account-detail.section";
import { ROUTES, GameRoutes } from "@/routes";
import Image from "next/image";
import {
  parseSlugWithId,
  parseSlugId,
  normalizeAccountType,
} from "@/utils/format-slug.util";
import { getGameAccount } from "@/apis/game-account.api";
import { getGameCategory } from "@/apis/game-category.api";
import type { Metadata } from "next";

// Known prefixes for account types to parse from combined slug
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

function parseSlugWithPossibleType(slug: string) {
  // slug format: {type}-{gameName}-{gameId} OR {gameName}-{gameId}
  const parts = slug.split("-");
  const gameId = parts[parts.length - 1];
  const textPart = parts.slice(0, parts.length - 1).join("-");
  
  const sortedTypes = [...KNOWN_TYPES].sort((a, b) => b.length - a.length);
  
  let type = "normal";
  let gameName = textPart;

  for (const knownType of sortedTypes) {
    if (textPart === knownType || textPart.startsWith(`${knownType}-`)) {
       type = knownType;
       const remainder = textPart.slice(knownType.length);
       if (remainder.startsWith("-")) {
         gameName = remainder.substring(1);
       }
       break;
    }
  }

  return { gameId, gameName: gameName.replace(/-/g, " "), type };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; type: string }>;
}): Promise<Metadata> {
  const { slug, type } = await params;
  const { gameName } = parseSlugWithPossibleType(slug);
  const accountId = parseSlugId(type);

  let account;
  let price = 0;

  try {
    const accountData = await getGameAccount(Number(accountId));
    account = accountData.data;
    price = Number(account?.currentPrice) || 0;
  } catch (error) {
    console.error("Failed to fetch account for metadata:", error);
  }

  const accountName = account?.title || `Tài khoản ${gameName} #${accountId}`;
  
  return {
    title: `${accountName} - Shop Tài Khoản Game Uy Tín`,
    description: `Mua ngay ${accountName} giá chỉ ${price.toLocaleString("vi-VN")}đ. Giao dịch an toàn, bảo hành trọn đời.`,
    openGraph: {
      title: accountName,
      images: account?.mainImageUrl ? [account.mainImageUrl] : [],
    },
  };
}

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ slug: string; type: string }>;
}) {
  const { slug, type } = await params;
  
  // 1. Parse combined slug (level 1)
  const { gameName: slugGameName, gameId, type: slugType } = parseSlugWithPossibleType(slug);
  
  // 2. Parse account ID from title-id.html (level 2)
  const accountId = parseSlugId(type);

  if (!accountId || isNaN(Number(accountId))) {
    return notFound();
  }

  let account;
  
  // Mock fallback logic if API fails or returns null
  try {
    const accountData = await getGameAccount(Number(accountId));
    account = accountData.data;
  } catch (error) {
    console.error("Fetch error, using mock data for demo:", error);
  }

  // Mandatory Mock for development/demo as per user request
  if (!account) {
    account = {
        gameAccountId: Number(accountId),
        status: "available",
        gameCategoryId: Number(gameId) || 1,
        title: `Siêu Phẩm ${slugGameName} - Account Vip #${accountId}`,
        originalPrice: 500000,
        currentPrice: 250000,
        description: `Tài khoản chuyên sâu cho game ${slugGameName}.
        - Rank: Cao Thủ
        - Skin: 100+ skin siêu cấp
        - Tướng: Full tướng
        - Thông tin: Trắng thông tin hoàn toàn, chính chủ.
        - Bảo hành: 1 đổi 1 nếu gặp lỗi kỹ thuật.`,
        mainImageUrl: "/images/types_account/type1.jpg",
        typeAccount: slugType,
        images: [
            { id: 1, imageUrl: "/images/types_account/type2.jpg", gameAccountId: Number(accountId) },
            { id: 2, imageUrl: "/images/types_account/type3.jpg", gameAccountId: Number(accountId) },
            { id: 3, imageUrl: "/images/types_account/type4.jpg", gameAccountId: Number(accountId) },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    } as any;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Visual Header / Banner Area */}
      <div className="relative h-[300px] w-full overflow-hidden">
         <Image 
            src="/images/banner.jpg" // Fallback to list banner
            alt="Game Banner"
            fill
            className="object-cover opacity-50 dark:opacity-30 blur-[2px]"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
         
         {/* Container for content overlap */}
         <div className="absolute bottom-0 left-0 w-full">
            <div className="container mx-auto px-4 max-w-7xl pb-8">
                 {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <Link href={ROUTES.HOME} className="hover:text-primary transition-colors">Trang Chủ</Link>
                    <span className="opacity-50">/</span>
                    <Link href={`/${slug}`} className="hover:text-primary transition-colors">{slugGameName}</Link>
                    <span className="opacity-50">/</span>
                    <span className="text-foreground">Chi Tiết # {accountId}</span>
                </nav>
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-wider">
                   CHI TIẾT TÀI KHOẢN
                </h2>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <AccountDetailSection account={account} gameName={slugGameName} />
      </div>
    </div>
  );
}
