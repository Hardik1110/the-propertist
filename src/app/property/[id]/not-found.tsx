import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Property not found</h1>
      <p className="mt-2 text-gray-500">
        This listing may have been sold, rented out, or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Back to listings
      </Link>
    </main>
  );
}
