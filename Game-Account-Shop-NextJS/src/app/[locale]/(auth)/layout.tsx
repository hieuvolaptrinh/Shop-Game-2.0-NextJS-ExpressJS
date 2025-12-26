"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/contexts/auth.context";
import LayoutDefault from "@/layouts/layout.default";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) return null;

  return (
    <LayoutDefault>
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-4 bg-gray-50 py-12">
        <div className="w-full">{children}</div>
      </div>
    </LayoutDefault>
  );
}
