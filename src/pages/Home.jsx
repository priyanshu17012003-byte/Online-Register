import { useState } from 'react';
import { useUsersContext } from '../context/UsersContext';
import RecordCard from '../components/RecordCard';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';
import SkeletonGrid from '../components/SkeletonGrid';

export default function Home() {
  const {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    editUser,
    removeUser,
  } = useUsersContext();

  const [modalMode, setModalMode] = useState(null); 
  const [activeUser, setActiveUser] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function openCreate() {
    setActiveUser(null);
    setModalMode('create');
  }

  function openEdit(user) {
    setActiveUser(user);
    setModalMode('edit');
  }

  function closeModal() {
    setModalMode(null);
    setActiveUser(null);
  }

  async function handleCreate(payload) {
    await addUser(payload);
    closeModal();
    flashSuccess('New record added to the roster.');
  }

  async function handleEdit(payload) {
    await editUser(activeUser.id, payload);
    closeModal();
    flashSuccess('Record updated.');
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `Remove ${user.name} from the roster? This can't be undone.`
    );

    if (!confirmed) return;

    setDeletingId(user.id);
    setDeleteError(null);

    try {
      await removeUser(user.id);
      flashSuccess(`${user.name} was removed from the roster.`);
    } catch (err) {
      setDeleteError(
        `Could not remove ${user.name}. Please try again.`
      );
    } finally {
      setDeletingId(null);
    }
  }

  function flashSuccess(message) {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3500);
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
              Card Index · {users.length} record
              {users.length === 1 ? '' : 's'}
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-ink">
             Online Register
            </h1>

            <p className="mt-2 text-sm text-ink-soft">
              
            </p>
          </div>

          <button
            type="button"
            onClick={openCreate}
            className="w-fit rounded-md bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal/90"
          >
            + New Record
          </button>
        </div>

        
        {successMessage && (
          <div
            role="status"
            className="mb-4 flex items-start gap-2 rounded-sm border border-teal/20 bg-teal-light px-3.5 py-3 text-[13px] text-teal"
          >
            {successMessage}
          </div>
        )}

        
        {deleteError && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-sm border border-red-200 bg-brick-light px-3.5 py-3 text-[13px] text-brick"
          >
            {deleteError}
          </div>
        )}

        
        {error && (
          <div
            role="alert"
            className="mb-4 flex items-center gap-2 rounded-sm border border-red-200 bg-brick-light px-3.5 py-3 text-[13px] text-brick"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={loadUsers}
              className="ml-2 rounded-sm border border-brick px-3 py-[7px] text-xs font-semibold text-brick transition hover:bg-brick hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        
        {loading && <SkeletonGrid />}

        
        {!loading && !error && users.length === 0 && (
          <div className="rounded-md border border-dashed border-cardline bg-white/70 px-6 py-10 text-center text-sm text-ink-soft">
            The roster is empty. Add the first record to get started.
          </div>
        )}

        
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-[22px]">
            {users.map((user) => (
              <RecordCard
                key={user.id}
                user={user}
                onEdit={openEdit}
                onDelete={handleDelete}
                deleting={deletingId === user.id}
              />
            ))}
          </div>
        )}

       
        {modalMode === 'create' && (
          <Modal title="New Record" onClose={closeModal}>
            <UserForm
              initialUser={null}
              onSubmit={handleCreate}
              onCancel={closeModal}
              submitLabel="Add to roster"
              pendingLabel="Adding…"
            />
          </Modal>
        )}

        
        {modalMode === 'edit' && activeUser && (
          <Modal
            title={`Edit ${activeUser.name}`}
            onClose={closeModal}
          >
            <UserForm
              initialUser={activeUser}
              onSubmit={handleEdit}
              onCancel={closeModal}
              submitLabel="Save changes"
              pendingLabel="Saving…"
            />
          </Modal>
        )}

      </div>
    </div>
  );
}