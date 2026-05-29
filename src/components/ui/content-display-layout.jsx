import { RefreshCcw } from "lucide-react";
import TextButton from "./textButton";
import ErrorLayout from "./error_page";

export default function ContentDisplayLayout ({title, value, loading, error, onRefresh, className}) {
    return (
      <div className={`rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden ${className}`}>
        <div className="bg-slate-100 dark:bg-slate-800 flex items-center justify-between py-2 px-4">
            <p className="text-primary dark:text-slate-100 font-[600] text-sm">{title}</p>
            <TextButton onClick={onRefresh} className="dark:text-slate-200 dark:hover:text-white" aria-label={`Refresh ${title}`}>
              <RefreshCcw  size='15px'/>
            </TextButton>
        </div>
        <div className="bg-white dark:bg-slate-900 py-8 px-5 space-y-3">
          {
            loading ? <div className="text-slate-600 dark:text-slate-300">Loading ...</div> 
            : error ? <ErrorLayout onRefresh={onRefresh} errMsg={error} /> 
            : <>{value}</>
          }
        </div>
    </div>
    )
}
