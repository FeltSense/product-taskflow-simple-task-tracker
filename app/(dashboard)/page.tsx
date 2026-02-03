import { Card, CardContent, CardHeader } from '@/components/ui/card';

const stats = [
  { label: 'Total Users', value: '2,543', change: '+12%' },
  { label: 'Active Projects', value: '145', change: '+5%' },
  { label: 'Revenue', value: '$12,430', change: '+18%' },
  { label: 'Conversion Rate', value: '3.2%', change: '+2%' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Welcome back! Here&apos;s what&apos;s happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="text-sm text-neutral-600">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-neutral-100 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-primary-500" />
                  <div className="flex-1">
                    <p className="text-sm text-neutral-900">New user signed up</p>
                    <p className="text-xs text-neutral-500">{i} hour{i > 1 ? 's' : ''} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg border border-neutral-200 hover:border-primary-500 transition-colors text-left">
                <span className="text-2xl mb-2 block">📊</span>
                <span className="text-sm font-medium">View Analytics</span>
              </button>
              <button className="p-4 rounded-lg border border-neutral-200 hover:border-primary-500 transition-colors text-left">
                <span className="text-2xl mb-2 block">➕</span>
                <span className="text-sm font-medium">Create Project</span>
              </button>
              <button className="p-4 rounded-lg border border-neutral-200 hover:border-primary-500 transition-colors text-left">
                <span className="text-2xl mb-2 block">👥</span>
                <span className="text-sm font-medium">Invite Team</span>
              </button>
              <button className="p-4 rounded-lg border border-neutral-200 hover:border-primary-500 transition-colors text-left">
                <span className="text-2xl mb-2 block">⚙️</span>
                <span className="text-sm font-medium">Settings</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
