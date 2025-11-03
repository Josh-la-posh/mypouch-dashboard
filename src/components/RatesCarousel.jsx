import { useEffect, useState, useRef, useCallback } from 'react';
import Spinner from './ui/spinner';
import Button from './ui/button';
import TextButton from './ui/textButton';
import { RefreshCcw } from 'lucide-react';

/*
Props:
  rates: Array<{ productAlias, pair, value, fee, feeCurrency, fetchedAt }>
  loading: boolean
  error: string | null
  onRefresh: () => void
  onRetry: () => void
Options:
  autoplay (default true), interval (ms, default 5000)
*/
const RatesCarousel = ({ rates = [], loading, error, onRefresh, onRetry, interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const total = rates.length;

  const next = useCallback(() => setIndex(i => (i + 1) % (total || 1)), [total]);

  useEffect(() => {
    if (total > 1) {
      timerRef.current = setTimeout(next, interval);
    }
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [index, total, interval, next]);

  useEffect(() => {
    setIndex(0);
  }, [total]);

  if (loading) {
    return <div className='flex items-center justify-center h-40'><Spinner /></div>;
  }

  if (error) {
    return (
      <div className='space-y-4 flex flex-col items-center my-6'>
        <p className='text-black/70 dark:text-white/60 text-xs'>Unable to load rates</p>
        <div className='flex gap-2'>
          <Button variant='primary' className='text-[11px]' onClick={onRetry}>Retry</Button>
          <TextButton onClick={onRefresh}><RefreshCcw size={14} /></TextButton>
        </div>
      </div>
    );
  }

  if (!loading && total === 0) {
    return <p className='text-[11px] italic opacity-70 text-center'>No rates available.</p>;
  }

  const current = rates[index];

  return (
    <div className='space-y-3 w-full flex flex-col items-center'>
      {/* <div className='flex items-center justify-between w-full max-w-sm'>
        <div className='flex items-center gap-2'>
          <TextButton onClick={prev} disabled={total <= 1}><ChevronLeft size={16} /></TextButton>
          <TextButton onClick={next} disabled={total <= 1}><ChevronRight size={16} /></TextButton>
        </div>
        <div className='flex items-center gap-2'>
          <TextButton onClick={() => setIsPlaying(p => !p)} disabled={total <= 1}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </TextButton>
          <TextButton onClick={onRefresh}><RefreshCcw size={14} /></TextButton>
        </div>
      </div> */}

      {current && (
        <div className='flex flex-col gap-2 text-xs bg-primary dark:bg-white px-4 py-3 rounded-md w-full max-w-sm shadow-sm'>
          <div className='flex items-center justify-between'>
            <p className='text-white dark:text-primary-dark font-semibold'>{current.productAlias}</p>
            {/* <p className='text-[10px] flex items-center gap-1 text-white/80 dark:text-primary-dark/70'><Clock size={12}/> {timeStr}</p> */}
            <div className='flex justify-end text-[9px] text-white/60 dark:text-primary-dark/60'>
                {index + 1} / {total}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-white dark:text-primary-dark'>{current.pair}</p>
            <p className='text-white dark:text-primary-dark font-medium'>{current.value}</p>
          </div>
          {current.fee !== null && (
            <div className='flex items-center justify-between'>
              <p className='text-white dark:text-primary-dark'>Fee</p>
              <p className='text-white dark:text-primary-dark'>{current.fee} {current.feeCurrency}</p>
            </div>
          )}          
        </div>
      )}

      {/* Dots */}
      <div className='flex items-center gap-2'>
        {rates.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-primary dark:bg-primary-light' : 'bg-primary/40 dark:bg-primary-dark/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RatesCarousel;

import PropTypes from 'prop-types';
RatesCarousel.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.shape({
    productAlias: PropTypes.string,
    pair: PropTypes.string,
    value: PropTypes.number,
    fee: PropTypes.number,
    feeCurrency: PropTypes.string,
    fetchedAt: PropTypes.string
  })),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onRefresh: PropTypes.func,
  onRetry: PropTypes.func,
  autoplay: PropTypes.bool,
  interval: PropTypes.number,
};
