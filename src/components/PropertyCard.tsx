import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatPrice(property: Property) {
  const formatted = priceFormatter.format(property.price);
  return property.type === "rent" ? `${formatted}/mo` : formatted;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/property/${property.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-1 text-xs font-medium capitalize text-white shadow-sm ${
            property.type === "rent" ? "bg-orange-500" : "bg-blue-600"
          }`}
        >
          {property.type}
        </span>
      </div>

      <div className="p-4">
        <h3 className="truncate font-semibold text-gray-900">{property.title}</h3>
        <p className="mt-1 text-lg font-semibold text-blue-700">{formatPrice(property)}</p>
        <p className="mt-1 truncate text-sm text-gray-500">{property.location}</p>
        <p className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
          {property.bhk} BHK
        </p>
      </div>
    </Link>
  );
}
