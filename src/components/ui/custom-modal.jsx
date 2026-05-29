const CustomModal = ({ isOpen, title, onClose, children }) => {
  // If modal is not open, render null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-3" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl max-w-md w-full p-6 h-[95%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md text-primary font-semibold">{title}</h2>
          <button
            className="text-slate-500 dark:text-slate-300 text-2xl hover:text-slate-700 dark:hover:text-white"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-slate-700 dark:text-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
