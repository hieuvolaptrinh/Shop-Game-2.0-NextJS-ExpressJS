import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import ListAccountSection from "@/sections/account-sections/list-account.section";
import { ROUTES, GameRoutes } from "@/routes";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  parseSlugWithId,
  normalizeAccountType,
} from "@/utils/format-slug.util";
import { listGameAccounts } from "@/apis/game-account.api";
import type { GameAccount } from "@/types/game-account.type";
import type { Metadata } from "next";
import { Suspense } from "react";
import { cache } from "react";

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
  params: Promise<{ slug: string; type: string }>;
}): Promise<Metadata> {
  const { slug, type } = await params;
  const { gameName } = parseSlugWithId(slug);
  const accountType = normalizeAccountType(type);

  const typeLabel = accountType?.display || type.toUpperCase();

  return {
    title: `Buy ${gameName} ${typeLabel} Accounts - Premium & Verified`,
    description: `Browse ${typeLabel.toLowerCase()} ${gameName} accounts. Secure & instant delivery.`,
  };
}

export default async function AccountListPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; type: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug, type } = await params;
  const { page: rawPage } = await searchParams;
  const currentPage = Math.max(Number(rawPage) || 1, 1);

  const { gameName, gameId } = parseSlugWithId(slug);
  const accountType = normalizeAccountType(type);

  if (!accountType || isNaN(Number(gameId))) return notFound();

  const [t, response] = await Promise.all([
    getTranslations("game.account_list"),
    fetchAccounts(Number(gameId), accountType.apiValue, currentPage),
  ]);

  const accounts: GameAccount[] = response.data?.data || [];
  const totalPages = response.data?.pagination?.totalPages || 1;

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/background_hks_2.jpg"
          alt="Background"
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-400">
            <Link href={ROUTES.HOME as any} className="hover:text-white">
              {t("homepage")}
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link
              href={GameRoutes.game(gameName, gameId) as any}
              className="hover:text-white"
            >
              {gameName}
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-white">
              {t("acc_prefix")} {accountType.display}
            </span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {t("acc_prefix")} {accountType.display} {gameName}
            </h1>
            <p className="text-gray-300 text-lg">
              {t("all_available", {
                type: accountType.display.toLowerCase(),
              })}
            </p>
            <div className="h-1 w-24 bg-blue-500 mt-4 rounded-full" />
          </div>

          {/* List Accounts */}
          <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
            <ListAccountSection
              accounts={accounts}
              gameName={gameName}
              gameId={Number(gameId)}
              type={accountType.slug}
            />
          </Suspense>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={
                    `${GameRoutes.accountList(
                      gameName,
                      gameId,
                      type
                    )}?page=${p}` as any
                  }
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    p === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-[#1a1d29] hover:bg-[#2a2d3a] text-gray-300"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
