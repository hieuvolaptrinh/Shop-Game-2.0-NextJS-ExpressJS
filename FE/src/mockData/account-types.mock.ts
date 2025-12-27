import { AccountCategory, AccountType } from "@/types/index.type";

/**
 * MOCK LAYER 1: CATEGORIES (Mục lớn trên trang chủ)
 */
export const MOCK_ACCOUNT_CATEGORIES: AccountCategory[] = [
  {
    _id: "cat-reg",
    name: "ACC REG - TRẮNG THÔNG TIN",
    slug: "acc-reg",
    icon: "/images/icons/type_reg.png",
    image: "/types_account/type6.jpg",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "cat-rank",
    name: "ACC RANK - TRẮNG THÔNG TIN",
    slug: "acc-rank",
    icon: "/images/icons/type_rank.png",
    image: "/types_account/type3.jpg",
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "cat-lucky",
    name: "TÚI MÙ - THỬ VẬN MAY",
    slug: "tui-mu",
    icon: "/images/icons/type_lucky.png",
    image: "/types_account/type10.jpg",
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "cat-random",
    name: "ACC RANDOM",
    slug: "acc-random",
    icon: "/images/icons/type_random.png",
    image: "/types_account/type12.jpg",
    order: 4,
    createdAt: new Date().toISOString(),
  }
];

/**
 * MOCK LAYER 2: ACCOUNT TYPES (Các thẻ Card trong mục lớn)
 */
export const MOCK_ACCOUNT_TYPES: AccountType[] = [
  // Các loại thuộc ACC REG
  {
    _id: "type-reg-lq",
    categoryId: "cat-reg",
    name: "NIC REG LIÊN QUÂN TRẮNG",
    slug: "nick-reg-lien-quan",
    image: "/types_account/type6.jpg",
    createdAt: new Date().toISOString(),
  },

  // Các loại thuộc ACC RANK
  {
    _id: "type-rank-lq",
    categoryId: "cat-rank",
    name: "NICK RANK LIÊN QUÂN SIÊU CẤP",
    slug: "nick-rank-lien-quan",
    image: "/types_account/type3.jpg",
    createdAt: new Date().toISOString(),
  },

  // Các loại thuộc TÚI MÙ
  {
    _id: "type-lucky-lq",
    categoryId: "cat-lucky",
    name: "TÚI MÙ LIÊN QUÂN GIÁ RẺ",
    slug: "tui-mu-lien-quan",
    image: "/types_account/type10.jpg",
    createdAt: new Date().toISOString(),
  },

  // Các loại thuộc RANDOM
  {
    _id: "type-random-lq",
    categoryId: "cat-random",
    name: "RANDOM LIÊN QUÂN 9K 19K 50K",
    slug: "random-lien-quan",
    image: "/types_account/type12.jpg",
    createdAt: new Date().toISOString(),
  }
];
