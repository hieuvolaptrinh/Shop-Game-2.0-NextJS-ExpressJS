import { GameCategoryProvider } from "@/contexts/game-category.context";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <GameCategoryProvider>{children}</GameCategoryProvider>
  );
}
