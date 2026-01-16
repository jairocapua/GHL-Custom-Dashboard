import { LucideIcon, TrendingUp, TrendingDown, Minus, Users, Briefcase, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { KPIMetric } from '@/services/ghl-data';

// Map string icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
    Users: Users,
    TrendingUp: TrendingUp,
    Briefcase: Briefcase,
    DollarSign: DollarSign,
};

interface KPICardProps {
    data: KPIMetric;
}

export function KPICard({ data }: KPICardProps) {
    const Icon = iconMap[data.icon] || Users;
    const isPositive = data.trend === 'up';
    const isNeutral = data.trend === 'neutral';

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-400">{data.title}</p>
                    <h3 className="text-2xl font-bold text-slate-100 mt-2">{data.value}</h3>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg text-emerald-500">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                <span
                    className={cn(
                        "flex items-center font-medium",
                        isPositive ? "text-emerald-400" : isNeutral ? "text-slate-400" : "text-rose-400"
                    )}
                >
                    {isPositive ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                    ) : isNeutral ? (
                        <Minus className="w-4 h-4 mr-1" />
                    ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {data.change}
                </span>
                <span className="text-slate-500 ml-2">vs last month</span>
            </div>
        </div>
    );
}
