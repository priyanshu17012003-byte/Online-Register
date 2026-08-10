export default function SkeletonGrid({ count = 6 }) {
  return (
    <div
      className="grid gap-[22px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))]"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative h-[150px] rounded-md border border-cardline bg-card overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brass/[0.14] to-transparent bg-[length:200%_100%] animate-shimmer" />
        </div>
      ))}
    </div>
  );
}
