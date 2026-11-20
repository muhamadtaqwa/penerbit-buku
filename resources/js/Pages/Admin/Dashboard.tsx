import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    BookOpen, 
    FileText, 
    ShoppingBag, 
    TrendingUp, 
    Clock, 
    CheckCircle2, 
    ArrowRight, 
    Users, 
    Plus 
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Order, Manuscript } from '@/types';
import { formatRupiah, formatDateIndo } from '@/lib/utils';

interface AdminDashboardProps {
    stats: {
        total_books: number;
        total_orders: number;
        total_revenue: number;
        pending_manuscripts: number;
        total_authors: number;
    };
    recentOrders: Order[];
    recentManuscripts: Manuscript[];
}

export default function AdminDashboard({
    stats,
    recentOrders,
    recentManuscripts,
}: AdminDashboardProps) {
    const statCards = [
        { label: 'Total Judul Buku', value: stats.total_books, icon: BookOpen, color: 'bg-amber-600', link: route('admin.books') },
        { label: 'Naskah Masuk (Pending)', value: stats.pending_manuscripts, icon: FileText, color: 'bg-rose-600', link: route('admin.manuscripts') },
        { label: 'Total Pesanan Buku', value: stats.total_orders, icon: ShoppingBag, color: 'bg-blue-600', link: route('admin.orders') },
        { label: 'Total Omzet Penjualan', value: formatRupiah(stats.total_revenue), icon: TrendingUp, color: 'bg-emerald-600', link: route('admin.orders') },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-800';
            case 'reviewing': return 'bg-blue-100 text-blue-800';
            case 'accepted': return 'bg-emerald-100 text-emerald-800';
            case 'revision': return 'bg-purple-100 text-purple-800';
            case 'rejected': return 'bg-rose-100 text-rose-800';
            default: return 'bg-stone-100 text-stone-800';
        }
    };

    return (
        <AdminLayout title="Ringkasan Kinerja Penerbit">
            <Head title="Admin Dashboard - Pustaka Aksara Press" />

            <div className="space-y-8">
                {/* Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <Link
                                key={idx}
                                href={card.link}
                                className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm hover:shadow-md transition flex items-center justify-between group"
                            >
                                <div>
                                    <span className="text-xs text-stone-500 font-medium">{card.label}</span>
                                    <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                                        {card.value}
                                    </h3>
                                </div>
                                <div className={`w-12 h-12 rounded-2xl ${card.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Two Column Grid: Recent Manuscripts & Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Recent Manuscripts to Review */}
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                            <div>
                                <h2 className="font-serif font-bold text-lg text-stone-900">
                                    Naskah Masuk Terbaru
                                </h2>
                                <p className="text-xs text-stone-500">Draf naskah yang diajukan para penulis</p>
                            </div>
                            <Link
                                href={route('admin.manuscripts')}
                                className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
                            >
                                <span>Lihat Semua</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="divide-y divide-stone-100">
                            {recentManuscripts.map((m) => (
                                <div key={m.id} className="py-3.5 flex items-start justify-between gap-4">
                                    <div>
                                        <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1">
                                            {m.title}
                                        </h4>
                                        <p className="text-xs text-stone-500 mt-0.5">
                                            Penulis: <span className="font-semibold text-stone-700">{m.author_name}</span> • {m.category?.name || m.genre}
                                        </p>
                                        <p className="text-[11px] text-stone-400 mt-0.5">
                                            Diajukan: {formatDateIndo(m.created_at)}
                                        </p>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(m.status)}`}>
                                        {m.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Recent Book Orders */}
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                            <div>
                                <h2 className="font-serif font-bold text-lg text-stone-900">
                                    Pesanan Buku Terbaru
                                </h2>
                                <p className="text-xs text-stone-500">Aktivitas pembelian dari pembaca</p>
                            </div>
                            <Link
                                href={route('admin.orders')}
                                className="text-xs font-bold text-amber-800 hover:underline flex items-center gap-1"
                            >
                                <span>Lihat Semua</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="divide-y divide-stone-100">
                            {recentOrders.map((o) => (
                                <div key={o.id} className="py-3.5 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="font-mono text-xs font-bold text-amber-900">
                                            {o.order_number}
                                        </span>
                                        <h4 className="font-medium text-xs text-stone-800 mt-0.5">
                                            {o.customer_name} ({o.city})
                                        </h4>
                                        <p className="text-[11px] text-stone-400">
                                            {formatDateIndo(o.created_at)} • {o.courier.split(' ')[0]}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-xs text-stone-900 block">
                                            {formatRupiah(o.total_amount)}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mt-1">
                                            {o.order_status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
