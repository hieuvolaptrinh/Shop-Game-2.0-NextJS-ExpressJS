import { notFound } from "next/navigation";
import Link from "next/link";
import ListAccountSection from "@/sections/account-sections/list-account.section";
import { GameRoutes } from "@/routes";
import Image from "next/image";
import type { GameAccount } from "@/types/game-account.type";
import type { Metadata } from "next";
import { Suspense } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from "lucide-react";
import {
  parseOneLevelSlug,
  normalizeAccountType,
} from "@/utils/format-slug.util";

import { MOCK_ACCOUNTS, MOCK_ACCOUNT_CATEGORIES, MOCK_ACCOUNT_TYPES } from "@/mockData";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // 1. Check if it's an AccountType slug (Layer 2)
  const accountType = MOCK_ACCOUNT_TYPES.find(t => t.slug === slug);
  if (accountType) {
    return {
      title: `${accountType.name} - Uy Tín & Chất Lượng`,
      description: `Danh sách ${accountType.name.toLowerCase()}. Giao dịch an toàn, nhận acc ngay.`,
    };
  }

  // 2. Check if it's a Category slug (Layer 1) - Optional, but good for SEO
  const category = MOCK_ACCOUNT_CATEGORIES.find(cat => cat.slug === slug);
  if (category) {
    return {
      title: `${category.name} - Hệ Thống Bán Acc Liên Quân`,
      description: `Tổng hợp các ${category.name.toLowerCase()}.`,
    };
  }

  const { gameName, gameId } = parseOneLevelSlug(slug);
  if (!gameId) return { title: "Không tìm thấy trang" };

  return {
    title: `Mua Tài Khoản ${gameName} - Uy Tín & Chất Lượng`,
    description: `Danh sách tài khoản ${gameName}. Giao dịch an toàn, nhận acc ngay.`,
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

  const { gameName, gameId, type } = parseOneLevelSlug(slug);

  // 1. Check if slug is an AccountType Slug (Layer 2)
  const accountType = MOCK_ACCOUNT_TYPES.find(t => t.slug === slug);
  
  let accounts: any[] = [];
  let title = "";
  let displayType = "";

  if (accountType) {
    title = accountType.name;
    displayType = accountType.slug;
    accounts = MOCK_ACCOUNTS.filter(acc => acc.typeId === accountType._id);
  } else {
    // 2. Check if it's a Category Slug (Layer 1)
    const category = MOCK_ACCOUNT_CATEGORIES.find(cat => cat.slug === slug);
    if (category) {
       title = category.name;
       displayType = category.slug;
       const typeIds = MOCK_ACCOUNT_TYPES.filter(t => t.categoryId === category._id).map(t => t._id);
       accounts = MOCK_ACCOUNTS.filter(acc => typeIds.includes(acc.typeId));
    } else {
       // 3. Fallback to Game ID parsing
       if (!gameId) {
         notFound();
       }

       title = `Tài Khoản ${gameName}`;
       displayType = "normal";
       accounts = MOCK_ACCOUNTS.filter(acc => 
          acc.type?.name.toUpperCase().includes(gameName.toUpperCase()) || 
          acc.typeId.includes(gameId.toString())
       );
    }
  }

  const totalPages = 1; // Simplify for now

  return (
    <div className="min-h-screen bg-background pb-20 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Title */}
        <div className="text-center mb-8">
           <h1 className="text-xl md:text-3xl font-bold text-primary uppercase inline-block tracking-tight">
             {title}
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
                  parentSlug={slug}
                />
            </Suspense>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-6">
             <Link
                 href={`/${slug}?page=${Math.max(1, currentPage - 1)}`}
                 className={`w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground transition-all ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
             >
                <ChevronLeft className="w-4 h-4" />
             </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
                key={p}
                href={`/${slug}?page=${p}`}
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
                 href={`/${slug}?page=${Math.min(totalPages, currentPage + 1)}`}
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
