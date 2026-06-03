export interface StatsData {
  label: string;
  value: number;
  icon: string;
}

const StatsContainer = ({stat}: {stat: StatsData}) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
      </div>
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
        <span className="text-2xl">{stat.icon}</span>
      </div>
    </div>
  </div>
);

export default StatsContainer;
