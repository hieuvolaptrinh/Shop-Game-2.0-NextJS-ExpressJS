import { notFound } from "next/navigation";
import Link from "next/link";
import AccountDetailSection from "@/sections/account-sections/account-detail.section";
import { ROUTES, GameRoutes } from "@/routes";
import Image from "next/image";
import {
  parseOneLevelSlug,
  parseSlugId,
  normalizeAccountType,
} from "@/utils/format-slug.util";
import type { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const { gameName: slugGameName, type } = parseOneLevelSlug(slug);

  const gameName = slugGameName;
  const price = 450000; // Mock price

  const accountName = `Tài khoản ${gameName} #${id}`;
  const description = `Tài khoản game ${gameName} cao cấp với thông tin đã được xác thực. Giao hàng ngay lập tức sau khi mua.`;

  return {
    title: `${accountName} - Mua tài khoản ${gameName}`,
    description: `${description}... Giá: ${price.toLocaleString("vi-VN")}đ. Thanh toán an toàn, giao hàng ngay, hỗ trợ trọn đời.`,
    keywords: [
      `mua tài khoản ${gameName}`,
      gameName,
      "bán tài khoản game",
      "tài khoản uy tín",
      accountName,
    ],
    openGraph: {
      title: `${accountName} - ${gameName}`,
      description: `Tài khoản ${gameName} cao cấp - ${price.toLocaleString("vi-VN")}đ`,
      type: "website",
      images: [],
    },
  };
}

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  
  const accountId = parseSlugId(id);

  const { gameName, gameId, type } = parseOneLevelSlug(slug);
  const accountType = normalizeAccountType(type);
  if (!accountType) {
    notFound();
  }

  // Mock account data
  const account: any = {
      gameAccountId: accountId || 123456,
      status: "available",
      gameCategoryId: Number(gameId) || 1,
      title: `${gameName} Premium Account #${accountId}`,
      originalPrice: 650000,
      currentPrice: 450000,
      description: "Tài khoản trắng thông tin 100%, bảo hành trọn đời. Có nhiều tướng và skin hiếm. Thích hợp cho game thủ muốn try hard rank cao.",
      mainImageUrl: "/images/types_account/type1.jpg",
      typeAccount: accountType.display,
      images: [
          { imageUrl: "/images/types_account/type2.jpg" },
          { imageUrl: "/images/types_account/type3.jpg" },
          { imageUrl: "/images/types_account/type4.jpg" }
      ]
  };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/images/background_hks_2.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm">
            <Link
              href={ROUTES.HOME}
              className="text-gray-400 hover:text-white"
            >
              Trang chủ
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <Link
              href={GameRoutes.game(gameName, gameId) as any}
              className="text-gray-400 hover:text-white"
            >
              {gameName}
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <Link
              href={
                GameRoutes.accountType(
                  gameName,
                  gameId,
                  accountType.slug
                ) as any
              }
              className="text-gray-400 hover:text-white"
            >
              Danh mục {accountType.display}
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-white">#{account.gameAccountId}</span>
          </div>

          {/* Account Detail Section */}
          <AccountDetailSection account={account} gameName={gameName} />
        </div>
      </div>
    </>
  );
}
