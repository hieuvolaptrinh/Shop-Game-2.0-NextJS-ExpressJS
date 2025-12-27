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
import { MOCK_ACCOUNTS, MOCK_ACCOUNT_TYPES, MOCK_ACCOUNT_CATEGORIES } from "@/mockData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { slug, id } = await params;
  const accountId = parseSlugId(id);
  const account = MOCK_ACCOUNTS.find(acc => acc._id === accountId);
  
  if (!account) return { title: "Không tìm thấy tài khoản" };

  const gameName = account.type?.name || "Liên Quân Mobile";
  const price = account.price;

  const accountName = `Tài khoản ${gameName} #${accountId}`;
  const description = account.description;

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
      images: account.images.map(img => img.url),
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
  
  const account = MOCK_ACCOUNTS.find(acc => acc._id === accountId);

  if (!account) {
    notFound();
  }

  const accountType = MOCK_ACCOUNT_TYPES.find(t => t._id === account.typeId);
  const category = MOCK_ACCOUNT_CATEGORIES.find(c => c._id === accountType?.categoryId);
  const gameName = accountType?.name || "Liên Quân Mobile";
  const categoryName = category?.name || "Game";

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src={account.images[0].url}
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
              className="text-gray-400 hover:text-black dark:hover:text-white hover:underline hover:font-semibold transition-all duration-200"
            >
              Trang chủ
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <Link
              href={`/${category?.slug}`}
              className="text-gray-400 hover:text-black dark:hover:text-white hover:underline hover:font-semibold transition-all duration-200"
            >
              {categoryName}
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <Link
              href={`/${accountType?.slug}`}
              className="text-gray-400 hover:text-black dark:hover:text-white hover:underline hover:font-semibold transition-all duration-200"
            >
              {gameName}
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-bold">#{account._id}</span>
          </div>

          {/* Account Detail Section */}
          <AccountDetailSection account={account} gameName={gameName} />
        </div>
      </div>
    </>
  );
}
