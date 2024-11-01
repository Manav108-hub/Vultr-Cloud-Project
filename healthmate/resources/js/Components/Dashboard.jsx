import { LineChart, Activity, Heart, Brain, Scale } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Health Dashboard</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Update Metrics
        </button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Heart className="h-6 w-6 text-red-500" />}
          title="Heart Rate"
          value="72 BPM"
          trend="+2%"
          trendUp={true}
        />
        <StatCard
          icon={<Activity className="h-6 w-6 text-green-500" />}
          title="Daily Steps"
          value="8,439"
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          icon={<Brain className="h-6 w-6 text-purple-500" />}
          title="Sleep Score"
          value="85%"
          trend="-5%"
          trendUp={false}
        />
        <StatCard
          icon={<Scale className="h-6 w-6 text-blue-500" />}
          title="Weight"
          value="68 kg"
          trend="-1%"
          trendUp={false}
        />
      </div>

      {/* Health Score */}
      <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Health Score</h2>
          <LineChart className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center">
          <div className="relative w-full h-4 bg-gray-200 rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
              style={{ width: '78%' }}
            ></div>
          </div>
          <span className="ml-4 text-2xl font-bold text-gray-900">78</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Your health score has improved by 3 points this week
        </p>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in-up">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
}

// StatCard component
function StatCard({ icon, title, value, trend, trendUp }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow transform hover:scale-105 transition duration-200 ease-in-out">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span
          className={`text-sm ${
            trendUp ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {trend}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

// Activity data
const activities = [
  {
    title: 'Morning Run',
    time: '07:30 AM',
    duration: '30 mins',
    calories: '320',
  },
  {
    title: 'Meditation',
    time: '09:00 AM',
    duration: '15 mins',
    calories: '30',
  },
  {
    title: 'Yoga Session',
    time: '05:00 PM',
    duration: '45 mins',
    calories: '180',
  },
];

// ActivityItem component
function ActivityItem({ title, time, duration, calories }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-md transform hover:scale-105 transition duration-200 ease-in-out">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{time}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{duration}</p>
        <p className="text-sm text-gray-600">{calories} cal</p>
      </div>
    </div>
  );
}

export default Dashboard;
