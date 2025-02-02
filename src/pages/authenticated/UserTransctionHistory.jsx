import React from "react";
import { UserTable } from "../../components/user-table";
import StatusBadge from "../../components/ui/status-badge";
import { Printer } from "lucide-react";

const UserTransactionHistory = () => {
  const columns = [
    {
        header: 'Status',
        accessor: 'status',
        render: (status) => (
          <div 
            className="flex items-center gap-1">
            <div className={`
                w-2 h-2 rounded-full ${status === 'Completed' ? 'bg-green-600' : status === 'Pending' ? 'bg-yellow-600' : 'bg-black'}
            `}></div>
            {status}
          </div>
        ),
    },
    {
        header: 'Date',
        accessor: 'date',
    },
    {
        header: 'Category',
        accessor: 'category',
        render: (category) => (
          <StatusBadge status={category} />
        ),
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: '',
        accessor: '',
        render: (category) => (
          <Printer size='14px' />
        )
    },
  ];

  const data = [
    {
      status: "Completed",
      date: "Today 1:45pm",
      category: "Deposit",
      amount: "200,000",
      currency: "NGN"
    },
    {
      status: "Pending",
      date: "Today 1:45pm",
      category: "Swapped",
      amount: "200,000",
      currency: "CAD"
    },
    {
      status: "Completed",
      date: "Today 1:45pm",
      category: "Withdrew",
      amount: "200,000",
      currency: "NGN"
    }
  ];

  return (
    <div className="space-y-6">
        <p className="text-primary text-lg font-[600]">
            Transaction History
        </p>
        <UserTable
            data={data}
            columns={columns}
            rowsPerPageOptions={[10, 20, 50]}
        />
    </div>
  );
};

export default UserTransactionHistory;