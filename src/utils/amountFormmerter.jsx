export const formatAmount = (amt) => {
    if (amt == null || amt === '') return '—';
    const num = Number(amt);
    if (isNaN(num)) return amt; // fallback for non-numeric
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};