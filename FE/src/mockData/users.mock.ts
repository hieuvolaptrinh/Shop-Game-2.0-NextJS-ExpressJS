import { User } from "@/types/index.type";

export const MOCK_USERS: User[] = [
  {
    _id: "u1",
    username: "hieuvolaptrinh",
    email: "hieu@example.com",
    balance: 1500000,
    role: "ADMIN",
    status: "ACTIVE",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hieu",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "u2",
    username: "gamer_pro_99",
    email: "gamer@example.com",
    balance: 50000,
    role: "USER",
    status: "ACTIVE",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pro",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "u3",
    username: "newbie_player",
    email: "newbie@example.com",
    balance: 0,
    role: "USER",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
