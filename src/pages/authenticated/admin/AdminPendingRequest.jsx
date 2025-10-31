import { useEffect, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSettingsTitle from '../../../services/hooks/useSettitngsTitle';
import useTitle from '../../../services/hooks/useTitle';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../services/api/adminApi';
import Spinner from '../../../components/ui/spinner';
import ErrorLayout from '../../../components/ui/error_page';
import Button from '../../../components/ui/button';
import { dateAndTimeFormatter } from '../../../utils/dateFormatter';
import { CustomTab } from '../../../components/ui/tabs';

function AdminPendingRequest() {
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const adminService = useMemo(()=> new AdminService(axiosPrivate), [axiosPrivate]);
  const { pendingManualFunding, pendingManualFundingLoading, pendingManualFundingError, isReviewingManualFunding, manualFundingReviewingId, manualFundingAll, manualFundingAllLoading, manualFundingAllError, manualFundingAllPage, manualFundingAllTotalPages } = useSelector(s => s.admin);

  const [activeTab, setActiveTab] = useState('pending');
  const [allFilters, setAllFilters] = useState({ search:'', currency:'', status:'', page:1, limit:10 });
  const CURRENCY_OPTIONS = ['','NGN','USD','GBP','EUR','CAD'];
  const STATUS_OPTIONS = ['', 'awaiting approval', 'approved', 'rejected'];

  useEffect(() => { setAppTitle('Admin'); }, [setAppTitle]);
  useEffect(() => { setSettingsTitle('Pending Request'); }, [setSettingsTitle]);

  const loadPending = useCallback(() => {
    adminService.fetchPendingManualFunding(dispatch);
  }, [adminService, dispatch]);

  const loadAll = useCallback(() => {
    adminService.fetchAllManualFunding(allFilters, dispatch);
  }, [adminService, allFilters, dispatch]);

  useEffect(() => { loadPending(); }, [loadPending]);
  useEffect(() => { if (activeTab === 'all') loadAll(); }, [activeTab, loadAll]);

  const onRefresh = () => loadPending();

  const onAllRefresh = () => loadAll();

  const TABS = [
    { value:'pending', label:'Pending Requests' },
    { value:'all', label:'All Requests' },
  ];

  return (
    <div className='pl-4 space-y-6'>
      <CustomTab TABS={TABS} activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'pending' && (
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <h2 className='text-sm font-semibold'>Pending Manual Funding</h2>
              <div className="w-fit">
                <Button variant='secondary' onClick={onRefresh} className='text-xs'>Refresh</Button>
              </div>
            </div>
            {pendingManualFundingError && <ErrorLayout errMsg={pendingManualFundingError} handleRefresh={onRefresh} />}
            {pendingManualFundingLoading && pendingManualFunding.length === 0 && <div className='flex justify-center py-8'><Spinner /></div>}
            {!pendingManualFundingLoading && pendingManualFunding.length === 0 && !pendingManualFundingError && <div className='text-xs italic'>No pending requests.</div>}
            {pendingManualFunding.length > 0 && (
              <div className='border rounded-sm overflow-x-auto'>
                <table className='w-full text-[11px] min-w-[760px]'>
                  <thead className='bg-primary/10 dark:bg-white/10 text-left'>
                    <tr>
                      <th className='p-2'>Amount</th>
                      <th className='p-2'>Provider</th>
                      <th className='p-2'>Funded By</th>
                      <th className='p-2'>Date</th>
                      <th className='p-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingManualFunding.map(item => {
                      const fundedBy = item.fundedBy || {};
                      const fullName = [fundedBy.firstName, fundedBy.lastName].filter(Boolean).join(' ') || fundedBy.email || '—';
                      const rowLoading = isReviewingManualFunding && manualFundingReviewingId === item.id;
                      return (
                        <tr key={item.id || item.transactionId || item.createdDate} className='border-t'>
                          <td className='p-2 font-medium'>{item.amount != null ? item.amount : '—'} {item.currency || ''}</td>
                          <td className='p-2'>{item.provider || '—'}</td>
                          <td className='p-2'>{fullName}</td>
                          <td className='p-2'>{dateAndTimeFormatter(item.createdDate || item.createdAt)}</td>
                          <td className='p-2'>
                            <div className='flex gap-2'>
                              <Button variant='primary' disabled={rowLoading} onClick={()=> adminService.reviewManualFunding(item.id, 'approve', dispatch)} className='text-[10px] px-2 py-1'>
                                {rowLoading ? '...' : 'Approve'}
                              </Button>
                              <Button variant='secondary' disabled={rowLoading} onClick={()=> adminService.reviewManualFunding(item.id, 'reject', dispatch)} className='text-[10px] px-2 py-1 !bg-red-500 !text-white hover:!bg-red-600'>
                                {rowLoading ? '...' : 'Reject'}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {activeTab === 'all' && (
          <div className='space-y-4'>
            <div className='grid md:grid-cols-3 gap-4 md:items-center'>
              <div className="md:col-span-2 flex gap-3">
                <div>
                  <p className='text-[10px] font-semibold'>Search</p>
                  <input value={allFilters.search} onChange={e=>setAllFilters(f=>({...f, search:e.target.value, page:1}))} className='border rounded-sm px-2 py-1 text-[11px]' placeholder='Name/Email/Ref' />
                </div>
                <div>
                  <p className='text-[10px] font-semibold'>Currency</p>
                  <select value={allFilters.currency} onChange={e=>setAllFilters(f=>({...f, currency:e.target.value, page:1}))} className='border rounded-sm px-2 py-1 text-[11px]'>
                    {CURRENCY_OPTIONS.map(c=> <option key={c} value={c}>{c || 'All'}</option>)}
                  </select>
                </div>
                <div>
                  <p className='text-[10px] font-semibold'>Status</p>
                  <select value={allFilters.status} onChange={e=>setAllFilters(f=>({...f, status:e.target.value, page:1}))} className='border rounded-sm px-2 py-1 text-[11px]'>
                    {STATUS_OPTIONS.map(s=> <option key={s} value={s}>{s || 'All'}</option>)}
                  </select>
                </div>
              </div>
              <div className='col-span-1 flex gap-2 flex-wrap'>
                <div className="w-fit">
                  <Button onClick={loadAll} className='text-xs'>Apply</Button>
                </div>
                <div className="w-fit">
                  <Button variant='secondary' onClick={()=>{setAllFilters({ search:'', currency:'', status:'', page:1, limit:allFilters.limit });}} className='text-xs'>Reset</Button>
                </div>
                <div className="w-fit">
                  <Button variant='secondary' onClick={onAllRefresh} className='text-[10px] px-2 py-1'>Refresh</Button>
                </div>
              </div>
            </div>
            {manualFundingAllError && <ErrorLayout errMsg={manualFundingAllError} handleRefresh={onAllRefresh} />}
            {manualFundingAllLoading && manualFundingAll.length === 0 && <div className='flex justify-center py-8'><Spinner /></div>}
            {!manualFundingAllLoading && manualFundingAll.length === 0 && !manualFundingAllError && <div className='text-xs italic'>No records.</div>}
            {manualFundingAll.length > 0 && (
              <div className='border rounded-sm overflow-x-auto'>
                <table className='w-full text-[11px] min-w-[760px]'>
                  <thead className='bg-primary/10 dark:bg-white/10 text-left'>
                    <tr>
                      <th className='p-2'>Amount</th>
                      <th className='p-2'>Provider</th>
                      <th className='p-2'>Funded By</th>
                      <th className='p-2'>Status</th>
                      <th className='p-2'>Date</th>
                      <th className='p-2'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {manualFundingAll.map(item => {
                      const fundedBy = item.fundedBy || {};
                      const fullName = [fundedBy.firstName, fundedBy.lastName].filter(Boolean).join(' ') || fundedBy.email || '—';
                      const rowLoading = isReviewingManualFunding && manualFundingReviewingId === item.id;
                      const actionable = (item.status || '').toLowerCase() === 'awaiting approval';
                      return (
                        <tr key={item.id || item.transactionId || item.createdDate} className='border-t'>
                          <td className='p-2 font-medium'>{item.amount != null ? item.amount : '—'} {item.currency || ''}</td>
                          <td className='p-2'>{item.provider || '—'}</td>
                          <td className='p-2'>{fullName}</td>
                          <td className='p-2 capitalize'>{item.status}</td>
                          <td className='p-2'>{dateAndTimeFormatter(item.createdDate || item.createdAt)}</td>
                          <td className='p-2'>
                            {actionable ? (
                              <div className='flex gap-2'>
                                <Button variant='primary' disabled={rowLoading} onClick={()=> adminService.reviewManualFunding(item.id, 'approve', dispatch)} className='text-[10px] px-2 py-1'>
                                  {rowLoading ? '...' : 'Approve'}
                                </Button>
                                <Button variant='secondary' disabled={rowLoading} onClick={()=> adminService.reviewManualFunding(item.id, 'reject', dispatch)} className='text-[10px] px-2 py-1 !bg-red-500 !text-white hover:!bg-red-600'>
                                  {rowLoading ? '...' : 'Reject'}
                                </Button>
                              </div>
                            ) : <span className='text-[10px] italic text-gray-500'>—</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <div className='flex flex-col gap-2 text-[11px]'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className="flex gap-3">
                  <p>Page {manualFundingAllPage} of {manualFundingAllTotalPages}</p>
                  <select value={allFilters.limit} onChange={e=>setAllFilters(f=>({...f, limit:Number(e.target.value), page:1}))} className='border rounded-sm px-2 py-1 text-[11px]'>
                    {[5,10,20,50].map(l=> <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className='flex gap-2'>
                  <Button variant='secondary' disabled={allFilters.page <=1} onClick={()=> setAllFilters(f=>({...f, page:f.page-1}))} className='text-[10px] px-3 py-1'>Prev</Button>
                  <Button variant='secondary' disabled={allFilters.page >= manualFundingAllTotalPages} onClick={()=> setAllFilters(f=>({...f, page:f.page+1}))} className='text-[10px] px-3 py-1'>Next</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomTab>
    </div>
  );
}

export default AdminPendingRequest;