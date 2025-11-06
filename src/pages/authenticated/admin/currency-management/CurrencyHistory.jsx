import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import Spinner from '../../../../components/ui/spinner';
import ErrorLayout from '../../../../components/ui/error_page';
import Button from '../../../../components/ui/button';
import TextButton from '../../../../components/ui/textButton';
import { dateAndTimeFormatter } from '../../../../utils/dateFormatter';

const CURRENCY_OPTIONS = ['USD','NGN','GBP','CAD','EUR'];

const CurrencyHistory = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const adminService = useMemo(()=> new AdminService(axiosPrivate), [axiosPrivate]);
  const { currencyHistory, currencyHistoryLoading, currencyHistoryError, currencyHistoryPage, currencyHistoryTotalPages, currencyHistoryPayloadSize, currencyHistoryHasNext, currencyHistoryTotalRecords } = useSelector(s=>s.admin);

  const [filters, setFilters] = useState({ fromCurrency:'', toCurrency:'', startDate:'', endDate:'', page:1, limit:10 });

  const loadHistory = useCallback(() => {
    adminService.fetchExchangeRateHistory(filters, dispatch);
  }, [adminService, filters, dispatch]);

  useEffect(()=>{ loadHistory(); }, [loadHistory]);

  const onFilterSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page:1 }));
    loadHistory();
  };

  const updateFilter = (field, value) => setFilters(prev => ({ ...prev, [field]: value }));

  const nextPage = () => filters.page < currencyHistoryTotalPages && setFilters(p=>({...p,page:p.page+1}));
  const prevPage = () => filters.page > 1 && setFilters(p=>({...p,page:p.page-1}));

  const onRefresh = () => loadHistory();

  if (currencyHistoryError) return <ErrorLayout errMsg={currencyHistoryError} handleRefresh={onRefresh} />;

  return (
    <div className='space-y-6'>
      <form onSubmit={onFilterSubmit} className='grid md:grid-cols-6 gap-4 items-end'>
        <div className='space-y-1'>
          <p className='text-[10px] font-semibold'>From Currency</p>
          <select value={filters.fromCurrency} onChange={e=>updateFilter('fromCurrency', e.target.value)} className='border rounded-sm px-2 py-1 text-xs'>
            <option value=''>All</option>
            {CURRENCY_OPTIONS.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className='space-y-1'>
          <p className='text-[10px] font-semibold'>To Currency</p>
          <select value={filters.toCurrency} onChange={e=>updateFilter('toCurrency', e.target.value)} className='border rounded-sm px-2 py-1 text-xs'>
            <option value=''>All</option>
            {CURRENCY_OPTIONS.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className='space-y-1'>
          <p className='text-[10px] font-semibold'>Start Date</p>
            <input type='date' value={filters.startDate} onChange={e=>updateFilter('startDate', e.target.value)} className='border rounded-sm px-2 py-1 text-xs' />
        </div>
        <div className='space-y-1'>
          <p className='text-[10px] font-semibold'>End Date</p>
            <input type='date' value={filters.endDate} onChange={e=>updateFilter('endDate', e.target.value)} className='border rounded-sm px-2 py-1 text-xs' />
        </div>
        {/* Page size moved to pagination section; keep placeholder space for consistent grid alignment on md */}
        <div className='hidden md:block'></div>
        <div className='flex gap-2'>
          <Button type='submit' variant='primary' className='text-xs px-4'>Filter</Button>
          <TextButton type='button' onClick={()=>{setFilters({ fromCurrency:'', toCurrency:'', startDate:'', endDate:'', page:1, limit:10 });}}>Reset</TextButton>
        </div>
      </form>

      <div className='border rounded-sm overflow-x-auto'>
        <table className='min-w-[1040px] w-full text-xs'>
          <thead className='bg-primary/10 dark:bg-white/10'>
            <tr className='text-left'>
              <th className='p-2'>From</th>
              <th className='p-2'>To</th>
              <th className='p-2'>Old Rate</th>
              <th className='p-2'>New Rate</th>
              <th className='p-2'>Δ Change</th>
              <th className='p-2'>% Change</th>
              <th className='p-2'>Created</th>
              <th className='p-2'>Updated</th>
            </tr>
          </thead>
          <tbody>
            {currencyHistoryLoading && currencyHistory.length === 0 && (
              <tr><td colSpan={9} className='p-4'><div className='flex justify-center'><Spinner /></div></td></tr>
            )}
            {!currencyHistoryLoading && currencyHistory.length === 0 && (
              <tr><td colSpan={9} className='p-4 italic'>No history found.</td></tr>
            )}
            {currencyHistory.map(item => {
              const oldRate = item.oldRate ?? item.previousRate ?? item.rateBefore ?? item.rate; // fallback chain
              const newRate = item.newRate ?? item.rateAfter ?? item.rate;
              const change = (newRate != null && oldRate != null) ? (Number(newRate) - Number(oldRate)) : null;
              const pctChange = (change != null && Number(oldRate) !== 0) ? (change / Number(oldRate)) * 100 : null;
              // const adminName = item.adminName || [item.adminFirstName, item.adminLastName].filter(Boolean).join(' ') || item.adminEmail || '—';
              return (
                <tr key={item.id || `${item.fromCurrency}-${item.toCurrency}-${oldRate}-${item.createdDate || item.createdAt}` } className='border-t'>
                  <td className='p-2 font-medium'>{item.fromCurrency}</td>
                  <td className='p-2'>{item.toCurrency}</td>
                  <td className='p-2'>{oldRate}</td>
                  <td className='p-2'>{newRate}</td>
                  <td className='p-2'>{change != null ? change.toFixed(4) : '—'}</td>
                  <td className='p-2'>{pctChange != null ? pctChange.toFixed(2)+'%' : '—'}</td>
                  <td className='p-2'>{dateAndTimeFormatter(item.createdDate || item.createdAt)}</td>
                  <td className='p-2'>{dateAndTimeFormatter(item.lastModifiedDate || item.updatedAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[11px]'>
        <div className='flex items-center gap-4 flex-wrap'>
          <p>Page {currencyHistoryPage} of {currencyHistoryTotalPages} {currencyHistoryHasNext ? '(more)' : ''}</p>
          <p>Showing {currencyHistoryPayloadSize} of {currencyHistoryTotalRecords} records</p>
          <div className='flex items-center gap-1'>
            <span className='font-medium'>Page size:</span>
            <select
              value={filters.limit}
              onChange={e=>setFilters(prev=>({ ...prev, limit:Number(e.target.value), page:1 }))}
              className='border rounded-sm px-2 py-1 text-[11px] bg-white dark:bg-transparent'
            >
              {[5,10,20,50].map(sz=> <option key={sz} value={sz}>{sz}</option>)}
            </select>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='secondary' disabled={filters.page <=1} onClick={prevPage} className='text-[11px] px-3 py-1'>Prev</Button>
          <Button variant='secondary' disabled={filters.page >= currencyHistoryTotalPages} onClick={nextPage} className='text-[11px] px-3 py-1'>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyHistory;
