function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border bg-white p-5 shadow-lg">
      <div className="h-52 rounded-2xl bg-gray-200"></div>

      <div className="mt-5 h-6 w-3/4 rounded bg-gray-200"></div>

      <div className="mt-3 h-4 w-1/2 rounded bg-gray-200"></div>

      <div className="mt-6 flex items-center justify-between">
        <div className="h-6 w-20 rounded bg-gray-200"></div>

        <div className="h-11 w-28 rounded-xl bg-gray-200"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;