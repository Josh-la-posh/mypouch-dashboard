import React, { useState } from "react";
import PropTypes from 'prop-types';

  export function UserTable({ data, columns, rowsPerPageOptions, drpp }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] || 10);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    const paginatedData = data?.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const totalPages = Math.ceil(data?.length / rowsPerPage);
    
    return (
        <>
            <div className="overflow-x-auto">
                <table className="divide-y-6 divide-white min-w-full border-collapse rounded-lg">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="px-4 py-3 text-left text-[9px] md:text-xs font-medium text-gray-500 tracking-wider">S.No</th>
                            {columns.map((column, colIndex) => (
                                <th
                                    key={colIndex}
                                    className="px-4 py-3 text-left text-[9px] md:text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-gray-300 border border-gray-300">
                    {
                        paginatedData?.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-200">
                                    <td className="px-4 py-3 whitespace-nowrap text-xs lg:text-sm text-gray-500">{rowIndex + 1}</td>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="px-4 py-3 whitespace-nowrap text-xs lg:text-sm text-gray-500">
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

                    {/* {data.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{user.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{user.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{user.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{user.mobile}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">{user.joinedDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                            <StatusBadge status={user.status} />
                        </td>
                        </tr>
                    ))} */}
                    </tbody>
                </table>
            </div>

            {drpp !== '' && (
                <div className="flex flex-col sm:flex-row sm:justify-between md:items-center mt-4 ml-3 gap-4">
                    <div className="text-[12px] lg:text-[13px] text-gray-500">
                        <span className="mr-2">Items per page:</span>
                        <select
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            className="bg-white border border-gray-300 rounded-lg p-2 text-gray-700"
                        >
                            {rowsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-2 py-1 lg:px-3 lg:py-2 text-xs md:text-sm text-gray-500 rounded-lg ${currentPage === 1 ? 'text-gray-300' : 'hover:border-primary hover:text-black'}`}
                        >
                            &lt;
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`text-xs md:text-xs px-2 py-1 lg:px-3 lg:py-2 ml-2 rounded-[5px] ${currentPage === index + 1 ? 'border border-priColor text-black' : 'bg-white text-gray-600'} hover:bg-priColor hover:text-white`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-2 py-1 lg:px-3 lg:py-2 text-xs md:text-sm text-gray-500 rounded-lg ml-2 ${currentPage === totalPages ? 'text-gray-300' : 'hover:border-blue-700 hover:text-black'}`}
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
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
};