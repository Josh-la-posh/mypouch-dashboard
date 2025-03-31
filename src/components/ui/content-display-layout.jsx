import { RefreshCcw } from "lucide-react";
import TextButton from "./textButton";
import ErrorLayout from "./error_page";

export default function ContentDisplayLayout ({title, value, loading, error, onRefresh, className}) {
    return (
      <div className={`rounded-sm ${className}`}>
        <div className="bg-[#F1F8FF] flex items-center justify-between py-2 px-4">
            <p className="text-primary font-[600] text-sm">{title}</p>
            <TextButton onClick={onRefresh}>
              <RefreshCcw  size='15px'/>
            </TextButton>
        </div>
        <div className="bg-primary-light/25 py-8 px-5 space-y-3">
          {
            loading ? <div className="dark:text-white">Loading ...</div> 
            : error ? <ErrorLayout onRefresh={onRefresh} errMsg={error} /> 
            : <>{value}</>
          }
        </div>
    </div>
    )
}