import { notFound } from "next/navigation";
import PaymentSection from "@/sections/payment-section/payment.section";
import { parseSlugWithId, parseSlugId } from "@/utils/format-slug.util";
import { getGameAccount } from "@/apis/game-account.api";
import { getGameCategory } from "@/apis/game-category.api";
import type { Metadata } from "next";

interface PaymentPageProps {
  params: Promise<{
    slug: string;
    type: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PaymentPageProps): Promise<Metadata> {
  const { slug, id } = await params;
  const { gameName: slugGameName } = parseSlugWithId(slug);

  // Parse account ID từ slug
  const accountId = parseSlugId(id);

  let gameName = slugGameName;
  let price = 0;

  try {
    const accountData = await getGameAccount(Number(accountId));
    const account = accountData.data;
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

  return {
    title: `Thanh Toán - Hoàn Tất Mua Tài Khoản ${gameName}`,
    description: `Hoàn tất thanh toán an toàn cho tài khoản ${gameName} với giá ${price.toLocaleString("vi-VN")}đ. Đa dạng phương thức thanh toán. Giao hàng ngay lập tức sau khi xác nhận thanh toán thành công.`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `Thanh Toán - Tài Khoản ${gameName}`,
      description: "Hoàn tất thanh toán an toàn để sở hữu tài khoản game của bạn",
      type: "website",
    },
  };
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { slug, id } = await params;
  const { gameName: slugGameName, gameId } = parseSlugWithId(slug);

  // Parse account ID từ slug
  const accountId = parseSlugId(id);

  // Fetch the account from API
  let account;
  let gameName = slugGameName;

  try {
    const accountData = await getGameAccount(Number(accountId));
    account = accountData.data;

    // Fetch game category name if available
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

  return <PaymentSection account={account} gameName={gameName} />;
}
