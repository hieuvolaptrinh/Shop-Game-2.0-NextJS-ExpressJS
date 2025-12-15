"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface GameCategoryData {
  gameCategoryId: number;
  gameCategoryName: string;
  imageGameCategory?: string;
}

interface GameCategoryContextType {
  selectedCategory: GameCategoryData | null;
  setSelectedCategory: (category: GameCategoryData) => void;
  clearSelectedCategory: () => void;
}

const GameCategoryContext = createContext<GameCategoryContextType | undefined>(
  undefined
);

export function GameCategoryProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategoryState] =
    useState<GameCategoryData | null>(null);

  const setSelectedCategory = useCallback((category: GameCategoryData) => {
    setSelectedCategoryState(category);
  }, []);

  const clearSelectedCategory = useCallback(() => {
    setSelectedCategoryState(null);
  }, []);

  return (
    <GameCategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        clearSelectedCategory,
      }}
    >
      {children}
    </GameCategoryContext.Provider>
  );
}

export function useGameCategory() {
  const context = useContext(GameCategoryContext);
  if (context === undefined) {
    throw new Error(
      "useGameCategory must be used within a GameCategoryProvider"
    );
  }
  return context;
}
