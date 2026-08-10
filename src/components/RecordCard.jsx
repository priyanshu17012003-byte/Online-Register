import { Link } from 'react-router-dom';
import Spinner from './Spinner';

export default function RecordCard({ user, onEdit, onDelete, deleting }) {
  const letter = (user.name || '?').trim().charAt(0).toUpperCase();

  return (
    <article
      data-letter={letter}
      className="record-tab relative flex flex-col gap-2.5 bg-card border border-cardline rounded-md shadow-card
        hover:shadow-card-hover hover:-translate-y-0.5 transition-all px-5 pt-[22px] pb-[18px]"
    >
      <Link
        to={`/users/${user.id}`}
        className="font-display text-xl font-semibold mt-1.5 text-ink no-underline hover:text-teal"
      >
        {user.name}
      </Link>
      <div className="font-mono text-xs text-teal -mt-1.5 mb-1">@{user.username}</div>

      <div className="flex gap-2 text-[13px] text-ink-soft">
        <span className="font-mono text-[10px] uppercase tracking-wide text-stone-400 w-[52px] shrink-0 pt-0.5">
          Email
        </span>
        <span>{user.email}</span>
      </div>
      <div className="flex gap-2 text-[13px] text-ink-soft">
        <span className="font-mono text-[10px] uppercase tracking-wide text-stone-400 w-[52px] shrink-0 pt-0.5">
          Phone
        </span>
        <span>{user.phone}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-dashed border-cardline flex gap-2 flex-wrap">
        <Link
          to={`/users/${user.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-[7px] rounded-sm border border-ink text-ink no-underline hover:bg-ink hover:text-paper transition"
        >
          View
        </Link>
        <button
          type="button"
          onClick={() => onEdit(user)}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-[7px] rounded-sm bg-teal text-paper hover:bg-teal-deep transition"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(user)}
          disabled={deleting}
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-[7px] rounded-sm border border-brick text-brick hover:bg-brick hover:text-white transition disabled:opacity-55 disabled:cursor-not-allowed"
        >
          {deleting ? <Spinner /> : 'Delete'}
        </button>
      </div>
    </article>
  );
}
