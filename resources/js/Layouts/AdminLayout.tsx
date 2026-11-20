import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    BookOpen, 
    FileText, 
    ShoppingBag, 
    Globe, 
    LogOut, 
    Menu, 
    X,
    CheckCircle,
    BookCheck,
    Layers
} from 'lucide-react';
import { PageProps } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard, current: route().current('admin.dashboard') },
        { name: 'Kelola Buku', href: route('admin.books'), icon: BookOpen, current: route().current('admin.books*') },
        { name: 'Naskah Masuk', href: route('admin.manuscripts'), icon: FileText, current: route().current('admin.manuscripts*') },
        { name: 'Pesanan & Logistik', href: route('admin.orders'), icon: ShoppingBag, current: route().current('admin.orders*') },
    ];

    return (
        <div className="min-h-screen bg-[#F0F7FD] flex flex-col md:flex-row text-slate-800">
            {/* Mobile Header */}
            <div className="md:hidden bg-[#0F2942] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span className="font-serif font-bold text-lg">Pustaka Aksara Admin</span>
                </div>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 text-slate-300 hover:text-white"
                >
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#0F2942] text-slate-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col justify-between p-5">
                    <div>
                        {/* Logo */}
                        <div className="flex items-center gap-3 pb-6 border-b border-sky-900/60">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="font-serif font-bold text-white tracking-wide text-base">
                                    PUSTAKA AKSARA
                                </h2>
                                <p className="text-[11px] text-cyan-300 font-medium">
                                    Editorial & Admin Desk
                                </p>
                            </div>
                        </div>

                        {/* Navigation items */}
                        <nav className="mt-6 space-y-1.5">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                                            item.current
                                                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                                                : 'text-slate-300 hover:bg-sky-950/60 hover:text-white'
                                        }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Bottom Links */}
                    <div className="pt-6 border-t border-sky-900/60 space-y-2">
                        <Link
                            href={route('home')}
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-medium text-slate-300 hover:bg-sky-950/60 hover:text-cyan-300 transition"
                        >
                            <Globe className="w-4 h-4" />
                            <span>Lihat Website Publik</span>
                        </Link>
                        <div className="px-4 py-2 text-[11px] text-slate-400">
                            Masuk sebagai: <span className="text-white font-semibold">{auth.user?.name || 'Dewan Redaksi'}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top bar */}
                <header className="bg-white border-b border-sky-100 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold font-serif text-[#0F2942]">{title}</h1>
                        <p className="text-xs text-slate-400">Panel Manajemen Penerbit Pustaka Aksara</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('manuscripts.create')}
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#EDF4FC] hover:bg-sky-100 text-sky-800 transition"
                        >
                            <FileText className="w-3.5 h-3.5 text-sky-600" />
                            <span>Form Pengajuan Naskah</span>
                        </Link>
                        <Link
                            href={route('home')}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white transition shadow-md shadow-sky-500/20"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Buka Toko</span>
                        </Link>
                    </div>
                </header>

                {/* Flash message */}
                {flash?.success && (
                    <div className="bg-sky-50 border-b border-sky-200 text-sky-900 px-6 py-3 text-sm flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-sky-600 flex-shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Body Content */}
                <main className="p-6 md:p-8 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
