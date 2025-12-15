import React from "react";
import { useTranslations } from "next-intl";

interface DepositResultModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    requestDepositId: number;
    userId: number;
    description: string;
    imgUrl: string;
    status: string;
    createdAt: string;
  } | null;
}

export default function DepositResultModal({
  open,
  onClose,
  data,
}: DepositResultModalProps) {
  const t = useTranslations("modals.depositResult");

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#181a20] rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          {t("title")}
        </h2>
        <div className="space-y-3">
          <div>
            <span className="text-gray-400 text-sm">{t("requestId")}</span>
            <span className="text-white font-semibold ml-2">
              #{data.requestDepositId}
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">{t("description")}</span>
            <span className="text-white ml-2">{data.description}</span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">{t("status")}</span>
            <span className="text-blue-400 font-semibold ml-2">
              {data.status}
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">{t("time")}</span>
            <span className="text-white ml-2">
              {new Date(data.createdAt).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">{t("billImage")}</span>
            <a
              href={data.imgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-purple-400 underline"
            >
              {t("viewImage")}
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            {t("closeButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
