"use client";

import Link from "next/link";
import { MOCK_ACCOUNTS, MOCK_ACCOUNT_TYPES, MOCK_ACCOUNT_CATEGORIES } from "@/mockData";
import { AccountTypeCard } from "@/components/cards/account-type.card";

function ListGameHomeSection() {
  const getAccountCountByType = (typeId: string) => {
    return MOCK_ACCOUNTS.filter(acc => acc.typeId === typeId).length;
  };

  return (
    <div className="w-full flex flex-col justify-center py-8">
      <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8">
        {MOCK_ACCOUNT_CATEGORIES.map((category) => {
          const categoryTypes = MOCK_ACCOUNT_TYPES.filter(type => type.categoryId === category._id);

          return (
            <div key={category._id} className="mb-12">
              <div className="mb-8 text-center relative">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1132b4] dark:text-blue-400 uppercase inline-block pb-1 border-b-4 border-[#1132b4] dark:border-blue-400 transition-colors duration-300">
                  {category.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryTypes.map((type) => (
                 <AccountTypeCard key={type._id} type={type} getAccountCountByType={getAccountCountByType} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListGameHomeSection;

