"use client";

import { useState, useMemo } from "react";
import AccountCard from "@/components/cards/account.card";
import FilterDropdown from "@/components/ui/filter-dropdown";
import { Account } from "@/types/index.type";
import { getFilterOptions, applyFilters } from "@/utils/accounts.util";

interface ListAccountSectionProps {
  accounts: Account[];
  parentSlug: string;
}

export default function ListAccountSection({
  accounts,
  parentSlug,
}: ListAccountSectionProps) {
  const { sortOptions, priceFilterOptions, statusFilterOptions } =
    getFilterOptions();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAccounts = useMemo(() => {
    const availableAccounts = accounts.filter(
      (acc) => acc.status === "AVAILABLE"
    );
    return applyFilters(
      availableAccounts,
      priceFilter,
      statusFilter,
      sortBy,
      searchQuery
    );
  }, [accounts, priceFilter, statusFilter, sortBy, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    sortBy !== "default" ||
    priceFilter !== "all" ||
    statusFilter !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortBy("default");
    setPriceFilter("all");
    setStatusFilter("all");
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="mb-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl p-5 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-xs mb-2 font-medium">
              Tìm kiếm
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập ID hoặc từ khóa..."
              className="w-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200 text-sm border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:border-blue-500 rounded-lg px-4 h-[42px] focus:outline-none transition-all"
            />
          </div>

          {/* Sort */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-xs mb-2 font-medium">
              Sắp xếp theo
            </label>
            <FilterDropdown
              label="Chọn cách sắp xếp"
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-xs mb-2 font-medium">
              Mức giá
            </label>
            <FilterDropdown
              label="Chọn mức giá"
              options={priceFilterOptions}
              value={priceFilter}
              onChange={setPriceFilter}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-xs mb-2 font-medium">
              Trạng thái
            </label>
            <FilterDropdown
              label="Chọn trạng thái"
              options={statusFilterOptions}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300 dark:border-gray-800">
          <div className="text-gray-400 text-sm">
            Đang hiển thị{" "}
            <span className="text-blue-400 font-semibold">
              {filteredAccounts.length}
            </span>{" "}
            tài khoản sẵn có
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg transition-all flex items-center gap-2 text-sm"
            >
              ✖ Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account._id}
              account={account}
              parentSlug={parentSlug}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-xl transition-colors duration-300">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg mb-2">Không tìm thấy kết quả</p>
          <p className="text-gray-500 text-sm mb-4">
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn
          </p>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Xóa tất cả bộ lọc
            </button>
          )}
        </div>
      )}
    </>
  );
}
