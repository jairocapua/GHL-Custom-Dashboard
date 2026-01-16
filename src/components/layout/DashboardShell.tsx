'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Desktop fixed, Mobile slide-in */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <Sidebar />
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-2 text-slate-400 md:hidden"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Header & Main Content */}
            <div className="md:pl-64 flex flex-col min-h-screen">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24">
                    {children}
                </main>
            </div>
        </div>
    );
}
