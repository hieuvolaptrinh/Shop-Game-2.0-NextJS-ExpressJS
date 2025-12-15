"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DISCORD_CONTACT_LINK } from "@/utils/contact.info";

interface OrderSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: {
    orderId: string;
    accountId: number;
    gameName: string;
    price: number;
    email: string;
    createdAt: string;
  } | null;
}

export default function OrderSuccessModal({
  open,
  onOpenChange,
  orderData,
}: OrderSuccessModalProps) {
  const router = useRouter();
  const t = useTranslations("modals.orderSuccess");

  const handleClose = () => {
    onOpenChange(false);
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  if (!orderData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#12141a] border border-[#2a2d3a] text-white sm:max-w-lg">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <CheckCircle className="w-14 h-14 text-green-400 mb-3" />
            <DialogTitle className="text-2xl font-bold">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm mt-2">
              {t("description")}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-6 bg-[#1a1d29] border border-[#2a2d3a] rounded-xl text-sm p-4 space-y-2">
          <div className="flex justify-between text-gray-300">
            <span>{t("orderId")}</span>
            <span className="text-blue-400 font-medium">
              #{orderData.orderId}
            </span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>{t("accountId")}</span>
            <span>#{orderData.accountId}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>{t("gameName")}</span>
            <span>{orderData.gameName}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>{t("price")}</span>
            <span className="text-blue-400 font-semibold">
              ${orderData.price.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>{t("emailReceive")}</span>
            <span>{orderData.email}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>{t("purchaseDate")}</span>
            <span>{new Date(orderData.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-center gap-3">
          <DialogClose asChild>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
              onClick={handleClose}
            >
              {t("closeButton")}
            </Button>
          </DialogClose>
          <a
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold rounded-md px-6 py-2 text-sm transition-all"
          >
            {t("homeButton")}
          </a>
          <a
            href={DISCORD_CONTACT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-md px-6 py-2 text-sm transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {t("contactDiscordButton")}
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
