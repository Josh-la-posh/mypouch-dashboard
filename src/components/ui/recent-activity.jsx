import { RefreshCcw } from "lucide-react";
import TextButton from "./textButton";

export default function RecentActivity ({data, onRefresh, className}) {
    return (
      <div className={`rounded-sm ${className}`}>
        <div className="bg-[#F1F8FF] flex items-center justify-between py-2 px-4">
            <p className="text-primary font-[600] text-sm">Recent Activities</p>
            <TextButton onClick={onRefresh}>
              <RefreshCcw  size='15px'/>
            </TextButton>
        </div>
        <div className="bg-primary-light/25 py-8 px-5 space-y-3">
          {data.map((data) => (
            <div key={data} className="h-6 w-full flex items-center gap-3 bg-white text-primary text-xs px-2">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              <p>Receipt 1242.pdf</p>
            </div>
          ))}
        </div>
    </div>
    )
}