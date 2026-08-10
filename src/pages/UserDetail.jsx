import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUsersContext } from '../context/UsersContext';
import { fetchUserById } from '../api/users';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading: rosterLoading, editUser, removeUser } = useUsersContext();

  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRecord() {
      setFetching(true);
      setNotFound(false);

      const local = users.find((u) => u.id === Number(id));
      if (local) {
        if (!cancelled) {
          setUser(local);
          setFetching(false);
        }
        return;
      }
      if (rosterLoading) return;

      try {
        const data = await fetchUserById(id);
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setFetching(false);
      }
    }

    loadRecord();
    return () => {
      cancelled = true;
    };
  }, [id, users, rosterLoading]);

  async function handleEditSubmit(payload) {
    await editUser(user.id, payload);
    setUser((prev) => ({ ...prev, ...payload }));
    setEditing(false);
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Remove ${user.name} from the roster? This can't be undone.`);
    if (!confirmed) return;

    setDeleting(true);
    setDeleteError(null);
    try {
      await removeUser(user.id);
      navigate('/');
    } catch (err) {
      setDeleteError('Could not remove this record. Please try again.');
      setDeleting(false);
    }
  }

  const backLink = (
    <Link
      to="/"
      className="font-mono text-xs text-teal no-underline hover:underline inline-flex items-center gap-1.5 mb-4"
    >
      &larr; Back to roster
    </Link>
  );

  if (fetching || rosterLoading) {
    return (
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="relative h-[260px] max-w-[640px] rounded-md border border-cardline bg-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brass/[0.14] to-transparent bg-[length:200%_100%] animate-shimmer" />
        </div>
      </div>
    );
  }

  if (notFound || !user) {
    return (
      <div className="max-w-[1080px] mx-auto px-6">
        {backLink}
        <div className="border border-dashed border-cardline rounded-md py-10 px-6 text-center text-ink-soft text-sm">
          No record found for id &ldquo;{id}&rdquo;.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[1080px] mx-auto px-6">
        {backLink}

        {deleteError && (
          <div
            role="alert"
            className="rounded-sm px-3.5 py-3 text-[13px] mb-4 flex items-start gap-2 bg-brick-light text-brick border border-red-200"
          >
            {deleteError}
          </div>
        )}

        <div className="bg-card border border-cardline rounded-md shadow-card p-8 max-w-[640px]">
          <div className="flex justify-between items-start gap-4 border-b border-dashed border-cardline pb-4 mb-4">
            <div>
              <p className="font-mono text-[11px] tracking-wide uppercase text-teal mb-2">
                Record #{user.id}
              </p>
              <h2 className="font-display text-[26px] m-0 mb-1">{user.name}</h2>
              <span className="font-mono text-[13px] text-teal">@{user.username}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs font-semibold px-3 py-[7px] rounded-sm bg-teal text-paper hover:bg-teal-deep transition"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs font-semibold px-3 py-[7px] rounded-sm border border-brick text-brick hover:bg-brick hover:text-white transition disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {deleting ? 'Removing…' : 'Delete'}
              </button>
            </div>
          </div>

          <dl className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-3 text-sm">
            <dt className="font-mono text-[11px] uppercase tracking-wide text-stone-400 pt-0.5">
              Email
            </dt>
            <dd className="m-0 text-ink">{user.email}</dd>
            <dt className="font-mono text-[11px] uppercase tracking-wide text-stone-400 pt-0.5">
              Phone
            </dt>
            <dd className="m-0 text-ink">{user.phone}</dd>
            {user.website && (
              <>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-stone-400 pt-0.5">
                  Website
                </dt>
                <dd className="m-0 text-ink">{user.website}</dd>
              </>
            )}
            {user.company?.name && (
              <>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-stone-400 pt-0.5">
                  Company
                </dt>
                <dd className="m-0 text-ink">{user.company.name}</dd>
              </>
            )}
            {user.address?.city && (
              <>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-stone-400 pt-0.5">
                  City
                </dt>
                <dd className="m-0 text-ink">{user.address.city}</dd>
              </>
            )}
          </dl>
        </div>
      </div>

      {editing && (
        <Modal title={`Edit ${user.name}`} onClose={() => setEditing(false)}>
          <UserForm
            initialUser={user}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditing(false)}
            submitLabel="Save changes"
            pendingLabel="Saving…"
          />
        </Modal>
      )}
    </>
  );
}
