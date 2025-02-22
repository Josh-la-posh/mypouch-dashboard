import { RefreshCcw } from "lucide-react";
import TextButton from "./textButton";
import ErrorLayout from "./error_page";
import { dateFormatter } from "../../utils/dateFormatter";

export default function RecentActivity ({data, loading, error, onRefresh, className}) {
    return (
      <div className={`rounded-sm ${className}`}>
        <div className="bg-[#F1F8FF] flex items-center justify-between py-2 px-4">
            <p className="text-primary font-[600] text-sm">Recent Activities</p>
            <TextButton onClick={onRefresh}>
              <RefreshCcw  size='15px'/>
            </TextButton>
        </div>
        <div className="bg-primary-light/25 py-8 px-5 space-y-3">
          {
            loading ? <div className="dark:text-white">Loading ...</div> 
            : error ? <ErrorLayout onRefresh={onRefresh} errMsg={error} /> 
            : data.length > 0 && 
            (data.map((data) => (
              <div key={data.id} className="bg-white text-primary text-xs px-2 flex justify-between items-center">
                <div className="h-6 flex items-center gap-3 ">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <p>{data?.description ?? (data?.activityType[0].toUpperCase() + data?.activityType.slice(1))}</p>
                </div>
                <p>{dateFormatter(data?.createdDate)}</p>
              </div>
            )))
          }
        </div>
    </div>
    )
}