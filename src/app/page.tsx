import { fetchDashboardData } from '@/services/ghl-data';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentActivityTable } from '@/components/dashboard/RecentActivityTable';

export default async function DashboardPage() {
  const data = await fetchDashboardData();

  return (
    <DashboardShell>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-slate-400 mt-2">Welcome back, here's what's happening today.</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.kpis.map((kpi) => (
            <KPICard key={kpi.title} data={kpi} />
          ))}
        </div>

        {/* content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <RevenueChart data={data.revenue} />
          </div>

          {/* Recent Activity - Takes 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <RecentActivityTable data={data.recentLeads} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
