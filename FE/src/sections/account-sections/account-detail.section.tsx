"use client";

import { useState } from "react";
import { Account } from "@/types/index.type";
import { useRouter } from "next/navigation";
import { GameRoutes, ROUTES } from "@/routes";
import {
  ShieldCheck,
  Info,
  ShoppingCart,
  MessageCircle,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Swords,
  Trophy,
  Star,
  Gem,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AccountDetailSectionProps {
  account: Account;
  gameName: string;
}

function AccountDetailSection({
  account,
  gameName,
}: AccountDetailSectionProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const currentPrice = Number(account.price || 0);
  const originalPrice = Math.round(currentPrice * 1.25); // Mock 25% discount logic
  const hasDiscount = true; // For demo aesthetics
  const discountPercent = 25;

  const handleBuyNow = () => {
    router.push(
      GameRoutes.accountPayment(
        gameName,
        account.typeId,
        account.type?.slug || "normal",
        account.description || `Account ${account._id}`,
        account._id
      )
    );
  };

  const allImages = account.images?.map((img: any) => img.url) || [];
  
  const nextImage = () =>
    setSelectedImage((prev) => (prev + 1) % allImages.length);
  const prevImage = () =>
    setSelectedImage(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 transition-colors duration-300">
      {/* Left Column - Images Gallery (8 cols) */}
      <div className="lg:col-span-8 space-y-4">
        <div className="bg-card rounded-lg overflow-hidden border border-border p-3 shadow-sm transition-all h-full">
          {/* Main Image Viewer */}
          <div className="relative aspect-video rounded-md overflow-hidden group bg-muted/20">
            <img
              src={
                allImages[selectedImage] ||
                account.mainImageUrl ||
                "/images/placeholder.png"
              }
              alt={account.title || "Account image"}
              className="w-full h-full object-contain md:object-cover"
            />

            {/* Status Overlays */}
            {account.status === "SOLD" && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                <div className="bg-destructive text-white px-6 py-3 rounded-lg text-xl font-bold uppercase tracking-widest shadow-lg">
                  ĐÃ BÁN
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter Badge */}
            <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2.5 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1.5 backdrop-blur-sm">
              <ImageIcon className="w-3 h-3" />
              {selectedImage + 1} / {allImages.length}
            </div>

            {/* MS Badge - Simplified */}
            <div className="absolute top-0 right-0 z-10">
              <div className="bg-primary text-primary-foreground px-4 py-1.5 font-bold text-sm rounded-bl-lg shadow-sm flex items-center gap-1">
                <span className="text-[10px] opacity-80 uppercase">Mã số:</span>
                <span>{account._id}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {allImages.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {allImages.map((img: any, idx: any) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative flex-shrink-0 w-20 aspect-video rounded-md overflow-hidden border-2 transition-all",
                    selectedImage === idx
                      ? "border-primary scale-105"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Detailed Description */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-1 bg-primary rounded-full"></div>
              <h3 className="text-lg font-semibold text-foreground">
                Thông Tin Chi Tiết
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {/* Champion Count */}
              <div className="bg-muted/30 border border-border rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider leading-none mb-1">
                    Tướng
                  </p>
                  <p className="text-xs font-bold text-foreground">
                    {account.generalCount || 0}
                  </p>
                </div>
              </div>

              {/* Skin Count */}
              <div className="bg-muted/30 border border-border rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider leading-none mb-1">
                    Trang phục
                  </p>
                  <p className="text-xs font-bold text-foreground">
                    {account.skinCount || 0}
                  </p>
                </div>
              </div>

              {/* Security / Linked Info */}
              <div className="bg-muted/30 border border-border rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider leading-none mb-1">
                    Bảo mật
                  </p>
                  <div className="text-[11px] font-bold leading-tight">
                    {(() => {
                      const info = account.linkedInfo;
                      const linked = [];
                      if (info?.emailLinked) linked.push("Email");
                      if (info?.phoneLinked) linked.push("SĐT");
                      if (info?.facebookLinked) linked.push("Facebook");

                      if (linked.length === 0) {
                        return <span className="text-green-600">Trắng Thông tin</span>;
                      }
                      return (
                        <span className="text-destructive break-words">
                          Đã LK: {linked.join(", ")}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-muted/30 border border-border rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider leading-none mb-1">
                    Trạng thái
                  </p>
                  <p className="text-xs font-bold text-foreground">
                    Sẵn sàng
                  </p>
                </div>
              </div>
            </div>

            {/* Features Spotlight */}
            {account.features && account.features.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                   <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                   <h4 className="text-sm font-bold uppercase tracking-tight text-foreground/70">Vật phẩm nổi bật</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                   {account.features.map((feature, idx) => (
                     <div key={idx} className="flex items-center gap-2 bg-gradient-to-br from-muted/50 to-muted border border-border px-3 py-2 rounded-lg shadow-sm">
                        <span className="text-xs font-bold text-foreground/90">{feature.name}</span>
                        <span className={cn(
                          "text-[9px] font-black px-1.5 py-0.5 rounded italic",
                          feature.type === "SSS" ? "bg-red-500/20 text-red-600" : 
                          feature.type === "SS" ? "bg-yellow-500/20 text-yellow-600" : "bg-yellow-500/20 text-yellow-600"
                        )}>{feature.type}</span>
                     </div>
                   ))}
                </div>
              </div>
            )}

            <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/10 p-4 rounded-lg border border-border/40">
              <p className="whitespace-pre-line leading-relaxed text-sm text-foreground/80">
                {account.description ||
                  "Không có mô tả chi tiết cho tài khoản này."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Info & Action (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="bg-card rounded-lg border border-border p-5 shadow-sm sticky top-24 transition-colors duration-300">
          {/* Header Info */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="bg-muted text-muted-foreground text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                {gameName}
              </span>
              <span className="bg-primary/10 text-primary text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                #{account._id}
              </span>
            </div>
            <h1 className="text-lg font-bold text-foreground leading-snug">
              {account.title || `${gameName} Premium Account`}
            </h1>
          </div>

          {/* Pricing Card */}
          <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border transition-colors relative overflow-hidden">
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-widest">
                Giá bán ưu đãi
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {currentPrice.toLocaleString("vi-VN")}
                  <span className="text-base ml-0.5">₫</span>
                </span>
                {hasDiscount && (
                  <span className="text-muted-foreground/50 line-through text-sm font-medium">
                    {originalPrice.toLocaleString("vi-VN")}₫
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div className="mt-1.5 inline-flex items-center gap-1.5 text-destructive font-semibold text-xs">
                  <div className="bg-destructive text-white px-1.5 py-0.5 rounded text-[9px]">
                    -{discountPercent}%
                  </div>
                  <span className="text-[10px] uppercase">
                    Tiết kiệm{" "}
                    {(originalPrice - currentPrice).toLocaleString("vi-VN")}₫
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {account.status === "AVAILABLE" ? (
              <>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>THANH TOÁN NGAY</span>
                </button>

                <button className="w-full bg-card hover:bg-muted border border-border text-foreground font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-primary" />
                  <span>Hướng dẫn mua hàng</span>
                </button>

                 <button
                    className="w-full bg-card hover:bg-muted border border-border text-foreground font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-2 text-sm"
                    onClick={() => window.open("https://zalo.me", "_blank")}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png"
                      className="w-3.5 h-3.5"
                      alt="Zalo"
                    />
                    Zalo Hỗ Trợ
                  </button>
              </>
            ) : (
              <div className="p-4 bg-destructive/5 border border-destructive/10 rounded-md text-center">
                <ShieldAlert className="w-6 h-6 text-destructive mx-auto mb-2" />
                <p className="text-destructive font-bold text-xs uppercase">
                  Tài khoản này đã bán
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Vui lòng quay lại tìm tài khoản khác
                </p>
              </div>
            )}
          </div>

          {/* Quick Commitments */}
          <div className="mt-6 pt-5 border-t border-border space-y-3">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">
                Bảo hành 1:1 trọn đời
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-semibold uppercase tracking-wide">
                Giao hàng tự động 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetailSection;
