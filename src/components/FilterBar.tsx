"use client";

import type { ListingType, SortOption } from "@/types/property";

interface FilterBarProps {
  bhk: number | "all";
  onBhkChange: (bhk: number | "all") => void;
  listingType: ListingType | "all";
  onListingTypeChange: (type: ListingType | "all") => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const BHK_OPTIONS: Array<number | "all"> = ["all", 1, 2, 3, 4];

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function FilterBar({
  bhk,
  onBhkChange,
  listingType,
  onListingTypeChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={bhk}
        onChange={(e) =>
          onBhkChange(e.target.value === "all" ? "all" : Number(e.target.value))
        }
        aria-label="Filter by BHK"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
      >
        {BHK_OPTIONS.map((option) => (
          <option key={option} value={option} className="bg-white text-gray-900">
            {option === "all" ? "All BHK" : `${option} BHK`}
          </option>
        ))}
      </select>

      <div role="group" aria-label="Buy or rent" className="flex gap-1 rounded-lg border border-gray-300 bg-white p-1">
        {(["all", "buy", "rent"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onListingTypeChange(option)}
            aria-pressed={listingType === option}
            className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
              listingType === option
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        aria-label="Sort properties"
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} className="bg-white text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
