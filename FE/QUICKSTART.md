# Quick Start Guide

## 🚀 Cài Đặt

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 📁 Cấu Trúc Dự Án

```
src/
├── app/              # Next.js App Router
├── components/       # React components
│   ├── ui/          # UI components
│   └── features/    # Feature components
├── lib/             # Fetch API + utilities
├── services/        # API service layer
├── hooks/           # Custom hooks
├── contexts/        # React contexts
├── types/           # TypeScript types
├── constants/       # Constants + routes
├── utils/           # Helper functions
└── middleware.ts    # Route protection
```

## 🔐 Authentication

### Login

```typescript
import { useLogin } from "@/hooks/useAuth";

const loginMutation = useLogin();
await loginMutation.mutateAsync({ email, password });
```

### Get Current User

```typescript
import { useAuth } from "@/hooks/useAuth";

const { user, isAuthenticated } = useAuth();
```

### Logout

```typescript
import { useLogout } from "@/hooks/useAuth";

const logoutMutation = useLogout();
await logoutMutation.mutateAsync();
```

## 📡 API Calls

### Client Components

```typescript
import { api } from "@/lib/fetch";

// GET with cache
const accounts = await api.get("/accounts", {
  revalidate: 60, // Cache 60s
  tags: ["accounts"],
});

// POST (no cache)
const account = await api.post("/accounts", data);
```

### Server Components

```typescript
import { fetchWithCache } from "@/lib/fetch";

const accounts = await fetchWithCache("/accounts", {
  revalidate: 60,
  tags: ["accounts"],
});
```

### Using Services

```typescript
import { accountService } from "@/services/account.service";

// Get accounts
const result = await accountService.getAccounts({
  page: 1,
  limit: 20,
  typeId: "game-type-id",
});

// Get by ID
const account = await accountService.getAccountById(id);

// Create (admin)
const newAccount = await accountService.createAccount(data);
```

## 🎨 Components

### Protected Route

```typescript
"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) redirect("/login");

  return <div>Protected Content</div>;
}
```

### With React Query

```typescript
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/services/account.service";

const { data, isLoading } = useQuery({
  queryKey: ["accounts", { page: 1 }],
  queryFn: () => accountService.getAccounts({ page: 1 }),
});
```

## 🔄 Cache Revalidation

### On-demand (Server Actions)

```typescript
"use server";

import { revalidateTag, revalidatePath } from "@/lib/fetch";

export async function createAccount(data) {
  await api.post("/accounts", data);

  revalidateTag("accounts");
  revalidatePath("/accounts");
}
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME="Game Account Shop"
```

## 🛠️ Commands

```bash
npm run dev          # Development
npm run build        # Build
npm run start        # Production
npm run lint         # Lint
npm run lint:fix     # Lint + fix
npm run format       # Format code
npm run type-check   # Type check
```

## 📚 Thêm Thông Tin

- [SECURITY.md](./SECURITY.md) - Security implementation
- [README.md](./README.md) - Full documentation
- [Biome Docs](https://biomejs.dev/)
- [Next.js Docs](https://nextjs.org/docs)
