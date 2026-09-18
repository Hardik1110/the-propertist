"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import propertiesData from "@/data/properties.json";
import type { ListingType, Property, SortOption } from "@/types/property";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyCardSkeleton } from "@/components/PropertyCardSkeleton";

const properties = propertiesData as Property[];

function parseBhk(raw: string | null): number | "all" {
  const parsed = Number(raw);
  return raw && [1, 2, 3, 4].includes(parsed) ? parsed : "all";
}

function parseListingType(raw: string | null): ListingType | "all" {
  return raw === "buy" || raw === "rent" ? raw : "all";
}

function parseSort(raw: string | null): SortOption {
  return raw === "price-asc" || raw === "price-desc" ? raw : "relevance";
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [bhk, setBhk] = useState<number | "all">(() => parseBhk(searchParams.get("bhk")));
  const [listingType, setListingType] = useState<ListingType | "all">(() =>
    parseListingType(searchParams.get("type"))
  );
  const [sort, setSort] = useState<SortOption>(() => parseSort(searchParams.get("sort")));
  const [isLoading, setIsLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.trim()) params.set("q", debouncedQuery.trim());
    if (bhk !== "all") params.set("bhk", String(bhk));
    if (listingType !== "all") params.set("type", listingType);
    if (sort !== "relevance") params.set("sort", sort);

    const queryString = params.toString();
    router.replace(queryString ? `/?${queryString}` : "/", { scroll: false });
  }, [debouncedQuery, bhk, listingType, sort, router]);

  const filteredProperties = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    const matches = properties.filter((property) => {
      const matchesQuery =
        normalizedQuery === "" ||
        property.location.toLowerCase().includes(normalizedQuery) ||
        property.title.toLowerCase().includes(normalizedQuery);
      const matchesBhk = bhk === "all" || property.bhk === bhk;
      const matchesType = listingType === "all" || property.type === listingType;

      return matchesQuery && matchesBhk && matchesType;
    });

    if (sort === "price-asc") {
      return [...matches].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      return [...matches].sort((a, b) => b.price - a.price);
    }
    return matches;
  }, [debouncedQuery, bhk, listingType, sort]);

  const hasActiveFilters =
    query.trim() !== "" || bhk !== "all" || listingType !== "all" || sort !== "relevance";

  function clearFilters() {
    setQuery("");
    setBhk("all");
    setListingType("all");
    setSort("relevance");
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-8 text-white sm:px-8 sm:py-10">
        <h1 className="text-xl font-semibold sm:text-3xl">Find your next home</h1>
        <p className="mt-1 text-sm text-blue-100 sm:text-base">
          Handpicked apartments, villas, and studios to buy or rent across India.
        </p>

        <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={query} onChange={setQuery} />
          <FilterBar
            bhk={bhk}
            onBhkChange={setBhk}
            listingType={listingType}
            onListingTypeChange={setListingType}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {isLoading ? "Loading properties…" : `${filteredProperties.length} properties found`}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
          : filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
      </div>

      {!isLoading && filteredProperties.length === 0 && (
        <p className="mt-8 text-center text-gray-500">No properties match your filters.</p>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
