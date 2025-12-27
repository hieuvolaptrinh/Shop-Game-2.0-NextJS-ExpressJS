import { Topup } from "@/types/index.type";
import { MOCK_USERS } from "./users.mock";

export const MOCK_TOPUPS: Topup[] = [
  {
    _id: "tp1",
    userId: "u1",
    user: MOCK_USERS[0],
    amount: 1000000,
    method: "ATM",
    status: "SUCCESS",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    _id: "tp2",
    userId: "u2",
    user: MOCK_USERS[1],
    amount: 200000,
    method: "CARD",
    status: "FAILED",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
