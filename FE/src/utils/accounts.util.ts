export interface FilterOption {
  label: string;
  value: string;
}

export const getFilterOptions = () => {
  return {
    sortOptions: [
      { label: "Mặc định", value: "default" },
      { label: "Giá thấp đến cao", value: "price_asc" },
      { label: "Giá cao đến thấp", value: "price_desc" },
    ],
    priceFilterOptions: [
      { label: "Tất cả mức giá", value: "all" },
      { label: "Dưới 100k", value: "0-100k" },
      { label: "100k - 500k", value: "100k-500k" },
      { label: "Trên 500k", value: "500k-plus" },
    ],
    statusFilterOptions: [
      { label: "Tất cả trạng thái", value: "all" },
      { label: "Sẵn có", value: "available" },
      { label: "Đã bán", value: "sold" },
    ],
  };
};

export const applyFilters = (
  accounts: any[],
  priceFilter: string,
  statusFilter: string,
  sortBy: string,
  searchQuery: string
) => {
  let filtered = [...accounts];

  if (searchQuery) {
    filtered = filtered.filter(
      (acc) =>
        acc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.rank?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy === "price_asc") {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === "price_desc") {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  return filtered;
};
