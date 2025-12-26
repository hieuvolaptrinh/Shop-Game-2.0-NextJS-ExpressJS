"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/contexts/auth.context";
import LayoutDefault from "@/layouts/layout.default";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) return null;

  return (
    <LayoutDefault>
      <div className="min-h-screen flex items-center justify-center p-4 bg-background transition-colors duration-300 overflow-hidden">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </LayoutDefault>
  );
}
