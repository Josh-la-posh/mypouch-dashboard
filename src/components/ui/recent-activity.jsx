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
            <div key={data.id} className="bg-white text-primary text-xs px-2 flex justify-between items-center">
              <div className="h-6 flex items-center gap-3 ">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <p>{data?.description ?? (data?.activityType[0].toUpperCase() + data?.activityType.slice(1))}</p>
              </div>
              <p>{dateFormatter(data?.createdDate)}</p>
            </div>
          ))) : (
            <div>No recent activities available</div>
          )
        }
      />
    )
}