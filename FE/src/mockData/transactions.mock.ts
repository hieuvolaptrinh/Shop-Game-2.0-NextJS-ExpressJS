import { Transaction } from "@/types/index.type";
import { MOCK_USERS } from "./users.mock";
import { MOCK_ACCOUNTS } from "./accounts.mock";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    _id: "t1",
    userId: "u2",
    user: MOCK_USERS[1],
    accountId: "acc3",
    account: MOCK_ACCOUNTS[2],
    amount: 50000,
    paymentMethod: "BALANCE",
    status: "SUCCESS",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "t2",
    userId: "u1",
    user: MOCK_USERS[0],
    accountId: "acc1",
    account: MOCK_ACCOUNTS[0],
    amount: 450000,
    paymentMethod: "MOMO",
    status: "PENDING",
    createdAt: new Date().toISOString(),
  }
];
