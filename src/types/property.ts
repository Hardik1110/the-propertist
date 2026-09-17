export type ListingType = "buy" | "rent";

export type SortOption = "relevance" | "price-asc" | "price-desc";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bhk: number;
  type: ListingType;
  image: string;
  description: string;
}
