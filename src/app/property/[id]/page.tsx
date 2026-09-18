import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import propertiesData from "@/data/properties.json";
import type { Property } from "@/types/property";

const properties = propertiesData as Property[];

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
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

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-8">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
        &larr; Back to listings
      </Link>

      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-gray-100 sm:aspect-[16/8]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          priority
          className="object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium capitalize text-white shadow-sm ${
            property.type === "rent" ? "bg-orange-500" : "bg-blue-600"
          }`}
        >
          {property.type}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{property.title}</h1>
        <p className="text-xl font-semibold text-blue-700">{formatPrice(property)}</p>
      </div>

      <p className="mt-1 text-gray-500">{property.location}</p>

      <p className="mt-3 inline-block rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
        {property.bhk} BHK
      </p>

      <p className="mt-6 leading-relaxed text-gray-700">{property.description}</p>
    </main>
  );
}
