import type { GameAccount } from "@/types/game-account.type";

export interface FilterOption {
  label: string;
  value: string;
}

export function getFilterOptions() {
  return {
    sortOptions: [
      { label: "Mặc định", value: "default" },
      { label: "Giá thấp đến cao", value: "price-asc" },
      { label: "Giá cao đến thấp", value: "price-desc" },
      { label: "Mới nhất", value: "newest" },
    ],
    priceFilterOptions: [
      { label: "Tất cả mức giá", value: "all" },
      { label: "Dưới $10", value: "0-10" },
      { label: "$10 - $20", value: "10-20" },
      { label: "$20 - $50", value: "20-50" },
      { label: "$50 - $100", value: "50-100" },
      { label: "Trên $100", value: "100-999999" },
    ],
    statusFilterOptions: [
      { label: "Tất cả trạng thái", value: "all" },
      { label: "Sẵn có", value: "available" },
      { label: "Đã đặt", value: "reserved" },
    ],
  };
}

export function filterByPrice(accounts: GameAccount[], priceFilter: string) {
  if (priceFilter === "all") return accounts;
  const [min, max] = priceFilter.split("-").map(Number);
  return accounts.filter(
    (acc) => Number(acc.currentPrice) >= min && Number(acc.currentPrice) <= max
  );
}

export function filterByStatus(accounts: GameAccount[], statusFilter: string) {
  if (statusFilter === "all") return accounts;
  return accounts.filter((acc) => acc.status === statusFilter);
}

export function sortAccounts(accounts: GameAccount[], sortBy: string) {
  const sorted = [...accounts];
  switch (sortBy) {
    case "price-asc":
      return sorted.sort(
        (a, b) => Number(a.currentPrice) - Number(b.currentPrice)
      );
    case "price-desc":
      return sorted.sort(
        (a, b) => Number(b.currentPrice) - Number(a.currentPrice)
      );
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    default:
      return sorted;
  }
}

export function applyFilters(
  accounts: GameAccount[],
  priceFilter: string,
  statusFilter: string,
  sortBy: string,
  searchQuery?: string
): GameAccount[] {
  let filtered = [...accounts];

  if (searchQuery?.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((acc) =>
      acc.description?.toLowerCase().includes(query)
    );
  }

  filtered = filterByPrice(filtered, priceFilter);
  filtered = filterByStatus(filtered, statusFilter);
  filtered = sortAccounts(filtered, sortBy);

  return filtered;
}
