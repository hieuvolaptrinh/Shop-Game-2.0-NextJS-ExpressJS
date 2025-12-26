"use client";

import { useEffect, useState } from "react";
import { listGameCategories } from "@/apis/game-category.api";
import type { GameCategory } from "@/types/game-category.type";
import AccRegListSection from "./acc-reg-list.section";
import AccRankListSection from "./acc-rank-list.section";
import LuckyBagListSection from "./lucky-bag-list.section";

function ListGameHomeSection() {
  const [gameCategories, setGameCategories] = useState<GameCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGameCategories() {
      try {
        setLoading(true);
        const response = await listGameCategories();
        setGameCategories(response.data || []);
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch game categories:", err);
        setError(err.message || "Failed to load game categories");
      } finally {
        setLoading(false);
      }
    }

    fetchGameCategories();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center py-8">
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {/* Header - Reggiare Style */}
        <div className="mb-8 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e40af] dark:text-blue-400 uppercase inline-block pb-1 border-b-4 border-[#1e40af] dark:border-blue-400 transition-colors duration-300">
              Acc Game
            </h2>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* SECTION 1: ACC REG */}
        <AccRegListSection gameCategories={gameCategories} loading={loading} />

        {/* SECTION 2: ACC RANK */}
        <AccRankListSection gameCategories={gameCategories} loading={loading} />

        {/* SECTION 3: TÚI MÙ */}
        <LuckyBagListSection />
      </div>
    </div>
  );
}

export default ListGameHomeSection;

