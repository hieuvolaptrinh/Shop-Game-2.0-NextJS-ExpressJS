"use client";

import { AuthProvider } from "./auth.provider";
import { GameCategoryProvider } from "@/contexts/game-category.context";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AuthProvider>
      <GameCategoryProvider>{children}</GameCategoryProvider>
    </AuthProvider>
  );
}
