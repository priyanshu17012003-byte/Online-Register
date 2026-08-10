import { useEffect } from 'react';

export default function Modal({ title, onClose, children }) {
 
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-ink/55 flex items-start justify-center p-4 md:p-12 overflow-y-auto z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-[560px]">
        <div className="flex justify-between items-center mb-2.5">
          <h2 className="font-display text-xl text-paper m-0">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-xs font-semibold px-3 py-[7px] rounded-sm border border-paper text-paper hover:bg-paper hover:text-ink transition"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
