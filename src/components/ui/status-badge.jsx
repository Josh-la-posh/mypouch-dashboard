function StatusBadge({ status }) {
    const isActive = (status.toLowerCase() === "active" || status.toLowerCase() === 'successful' || status.toLowerCase() === 'deposit');
    const isInactive = (status.toLowerCase() === "inactive" || status.toLowerCase() === 'failed' || status.toLowerCase() === 'withdrew');
    return (
      <span
        className={`
        px-4 py-1 rounded-full text-sm font-medium
        ${isActive 
          ? "bg-green-100 text-green-600" 
          : isInactive 
          ? "bg-red-100 text-red-600" 
          : "bg-black text-white"}
      `}
      >
        {status}
      </span>
    )
  }

  export default StatusBadge;