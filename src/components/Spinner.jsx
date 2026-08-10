export default function Spinner({ light = false }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={
        light
          ? 'inline-block w-[18px] h-[18px] rounded-full border-2 border-white/35 border-t-white animate-spin'
          : 'inline-block w-[18px] h-[18px] rounded-full border-2 border-ink/20 border-t-ink animate-spin'
      }
    />
  );
}
