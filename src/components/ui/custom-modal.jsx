const CustomModal = ({ isOpen, title, onClose, children }) => {
  // If modal is not open, render null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 h-[95%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md text-primary">{title}</h2>
          <button
            className="text-gray-500 text-2xl hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
