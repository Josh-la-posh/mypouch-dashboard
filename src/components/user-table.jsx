import PropTypes from 'prop-types';

  export function UserTable({ data, columns, drpp, totalPages, currentPage, setCurrentPage, rowsPerPage, setRowsPerPage }) {

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };
    
    const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // Number of pages before and after currentPage

    if (totalPages <= 7) {
      // If total pages are small, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always include first and last pages
    pages.push(1);

    // Show dots when skipping numbers
    if (currentPage > delta + 3) {
      pages.push("...");
    }

    // Pages around current page
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - (delta + 3)) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

    return (
        <>
            <div className="overflow-x-auto">
                <table className="divide-y divide-slate-200 dark:divide-slate-700 min-w-full border-collapse rounded-lg">
                    <thead className="bg-slate-100 dark:bg-slate-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 tracking-wider">S.No</th>
                            {columns.map((column, colIndex) => (
                                <th
                                    key={colIndex}
                                    className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700">
                    {
                        data?.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-center text-slate-500 dark:text-slate-300">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-slate-100 dark:hover:bg-slate-800/70">
                                    <td className="px-4 py-3 whitespace-nowrap text-xs md:text-sm text-slate-600 dark:text-slate-200">{rowIndex + 1}</td>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="px-4 py-3 whitespace-nowrap text-xs md:text-sm text-slate-600 dark:text-slate-200">
                                            {column.render
                                                ? column.render(row[column.accessor], row)
                                                : typeof row[column.accessor] === 'string' && row[column.accessor].length > 17
                                                    ? `${row[column.accessor].slice(0, 17)}...`
                                                    : row[column.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>
            </div>

            {drpp !== '' && (
                <div className="flex flex-col sm:flex-row sm:justify-between md:items-center mt-4 ml-3 gap-4">
                    <div className="text-[12px] lg:text-[13px] text-slate-500 dark:text-slate-300">
                        <span className="mr-2">Items per page:</span>
                        <select
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-700 dark:text-slate-200"
                        >
                            {[5, 10, 20].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`cursor-pointer px-2 py-1 lg:px-3 lg:py-2 text-xs md:text-sm text-slate-500 dark:text-slate-300 rounded-lg ${currentPage === 1 ? 'text-slate-300 dark:text-slate-600' : 'hover:text-primary'}`}
                        >
                            &lt;
                        </button>

                        {
                            pageNumbers.map((page, index) =>
                                page === "..." ? (
                                    <span key={index} className="px-3 py-2 text-slate-500 dark:text-slate-400">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(page)}
                                        className={`cursor-pointer text-xs md:text-xs px-2 py-1 lg:px-3 lg:py-2 ml-2 rounded-[5px] ${currentPage === page ? 'border border-primary text-primary dark:text-white dark:bg-slate-800' : 'bg-white dark:bg-transparent text-slate-600 dark:text-slate-300'} hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary`}
                                    >
                                        {page}
                                    </button>
                                )
                            )
                        }
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`cursor-pointer px-2 py-1 lg:px-3 lg:py-2 text-xs md:text-sm text-slate-500 dark:text-slate-300 rounded-lg ml-2 ${currentPage === totalPages ? 'text-slate-300 dark:text-slate-600' : 'hover:text-primary'}`}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}        
        </>
    )
};

UserTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        header: PropTypes.string.isRequired,
        accessor: PropTypes.string.isRequired,
        render: PropTypes.func,
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
