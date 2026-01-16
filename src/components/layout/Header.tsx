'use client';

import { Bell, Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 md:left-64 z-20">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="hidden md:flex items-center border border-slate-700 rounded-full px-3 py-1.5 bg-slate-800/50">
                    <Search className="w-4 h-4 text-slate-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-600 w-48"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border border-slate-900"></span>
                </button>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px]">
                    <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                        <span className="text-xs font-bold text-emerald-500">JD</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
