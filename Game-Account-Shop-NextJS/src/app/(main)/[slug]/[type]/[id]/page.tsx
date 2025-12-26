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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; type: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const { gameName: slugGameName } = parseSlugWithId(slug);

  let account;
  let gameName = slugGameName;
  let price = 0;

  try {
    const accountData = await getGameAccount(Number(id));
    account = accountData.data;
    price = Number(account?.currentPrice) || 0;

    if (account?.gameCategoryId) {
      try {
        const categoryData = await getGameCategory(account.gameCategoryId);
        gameName = categoryData.data?.gameCategoryName || gameName;
      } catch (error) {
        console.error("Failed to fetch game category:", error);
      }
    }
  } catch (error) {
    console.error("Failed to fetch account:", error);
  }

  const accountName = account?.title || `Tài khoản ${gameName} #${id}`;
  const description = account?.description
    ? account.description.substring(0, 150)
    : `Tài khoản game ${gameName} cao cấp với thông tin đã được xác thực. Giao hàng ngay lập tức sau khi mua.`;

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
      images: account?.mainImageUrl ? [account.mainImageUrl] : [],
    },
  };
}

export default async function AccountDetailPage({
  params,
}: {
  params: Promise<{ slug: string; type: string; id: string }>;
}) {
  const { slug, type, id } = await params;
  const { gameName: slugGameName, gameId } = parseSlugWithId(slug);

  // Parse account ID từ slug format: account-name-123.html
  const accountId = parseSlugId(id);

  const accountType = normalizeAccountType(type);
  if (!accountType) {
    notFound();
  }

  let account;
  let gameName = slugGameName;

  try {
    const accountData = await getGameAccount(Number(accountId));
    account = accountData.data;

    if (account?.gameCategoryId) {
      try {
        const categoryData = await getGameCategory(account.gameCategoryId);
        gameName = categoryData.data?.gameCategoryName || gameName;
      } catch (error) {
        console.error("Failed to fetch game category:", error);
      }
    }
  } catch (error) {
    console.error("Failed to fetch account:", error);
    notFound();
  }

  if (!account) {
    notFound();
  }

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
