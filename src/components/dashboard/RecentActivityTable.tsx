import { Lead } from '@/services/ghl-data';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';

interface RecentActivityTableProps {
    data: Lead[];
}

const statusStyles = {
    New: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Won: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Lost: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Open: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Contacted: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export function RecentActivityTable({ data }: RecentActivityTableProps) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-100">Recent Activity</h3>
                <button className="text-sm text-emerald-500 hover:text-emerald-400 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950/50 text-slate-400 font-medium border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4">Lead Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {data.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-slate-200">{lead.name}</span>
                                        <span className="text-xs text-slate-500">{lead.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-medium border",
                                        statusStyles[lead.status] || statusStyles.Open
                                    )}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-400">{lead.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
