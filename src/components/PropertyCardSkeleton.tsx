export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="aspect-video w-full animate-pulse bg-gray-200" />
      <div className="p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-5 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-5 w-16 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
