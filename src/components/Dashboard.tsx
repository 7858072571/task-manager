import { DashboardMetrics, Activity } from '../types';

interface DashboardProps {
  metrics: DashboardMetrics;
  activities: Activity[];
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  return `${diffInDays} days ago`;
}

export function Dashboard({ metrics, activities }: DashboardProps) {
  const cards = [
    {
      title: 'Total Tasks',
      value: metrics.totalTasks,
      color: 'bg-blue-500',
    },
    {
      title: 'Completed',
      value: metrics.completedTasks,
      color: 'bg-green-500',
    },
    {
      title: 'In Progress',
      value: metrics.inProgressTasks,
      color: 'bg-yellow-500',
    },
    {
      title: 'To Do',
      value: metrics.todoTasks,
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${card.color} mr-3`}></div>
              <div>
                <p className="text-sm text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Task "{activity.taskTitle}" {activity.action}</span>
                <span className="ml-auto">{getTimeAgo(activity.timestamp)}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
