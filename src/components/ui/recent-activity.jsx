import { dateFormatter } from "../../utils/dateFormatter";
import ContentDisplayLayout from "./content-display-layout";

export default function RecentActivity ({data, loading, error, onRefresh, className}) {
  const activities = Array.isArray(data) ? data : [];
    return (
      <ContentDisplayLayout
        title='Recent Activities'
        loading={loading}
        error={error}
        onRefresh={onRefresh}
        className={className}
        value={
          activities.length > 0 ? (activities.map((data) => (
            <div key={data.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs px-3 py-2 rounded-lg flex justify-between items-center">
              <div className="h-6 flex items-center gap-3 ">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <p>{data?.description ?? (data?.activityType[0].toUpperCase() + data?.activityType.slice(1))}</p>
              </div>
              <p className="text-slate-500 dark:text-slate-400">{dateFormatter(data?.createdDate)}</p>
            </div>
          ))) : (
            <div className="text-slate-500 dark:text-slate-400">No recent activities available</div>
          )
        }
      />
    )
}
