import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, 
    Package, 
    Truck, 
    CheckCircle2, 
    Clock, 
    MapPin, 
    AlertCircle, 
    ArrowRight 
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Order } from '@/types';
import { formatRupiah, formatDateIndo } from '@/lib/utils';

interface TrackOrderProps {
    order: Order | null;
    searchTerm: string;
}

export default function TrackOrder({ order, searchTerm }: TrackOrderProps) {
    const [search, setSearch] = useState(searchTerm);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.get(route('orders.track'), { search: search.trim() }, { preserveState: true });
        }
    };

    const steps = [
        { key: 'processing', title: 'Pesanan Dikonfirmasi', desc: 'Pembayaran terverifikasi, faktur diterbitkan' },
        { key: 'packaged', title: 'Sedang Dikemas', desc: 'Buku dilapisi bubble wrap dan disegel rapi' },
        { key: 'shipped', title: 'Dalam Pengiriman', desc: 'Paket diserahkan ke kurir ekspedisi' },
        { key: 'delivered', title: 'Tiba di Tujuan', desc: 'Buku telah diterima oleh pembeli' },
    ];

    const getStepStatus = (stepKey: string, currentStatus: string) => {
        const orderWeight: Record<string, number> = {
            processing: 1,
            packaged: 2,
            shipped: 3,
            delivered: 4,
        };
        const currentWeight = orderWeight[currentStatus] || 1;
        const thisWeight = orderWeight[stepKey] || 1;

        if (thisWeight < currentWeight) return 'completed';
        if (thisWeight === currentWeight) return 'current';
        return 'upcoming';
    };

    return (
        <PublicLayout>
            <Head title="Lacak Pesanan Buku - Pustaka Aksara Press" />

            {/* Header */}
            <div className="bg-[#0F2942] text-white py-14 border-b border-sky-950">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                        Transparansi Logistik Pustaka
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-2">
                        Lacak Status Pengiriman Buku
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                        Masukkan Nomor Pesanan (contoh: AKSAR-202611-0001) atau Nomor Resi untuk memeriksa posisi paket Anda secara langsung.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto flex gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Nomor Pesanan atau No. Resi..."
                                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-300 text-xs sm:text-sm focus:bg-white focus:text-slate-900 focus:outline-none"
                            />
                            <Search className="w-4 h-4 text-cyan-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-[#0F2942] font-bold text-xs shadow-lg transition flex items-center gap-1.5"
                        >
                            <span>Lacak</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {order ? (
                    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-xl space-y-8">
                        {/* Top Summary */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                            <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    Informasi Pesanan
                                </span>
                                <h2 className="text-2xl font-serif font-bold text-[#0F2942] mt-0.5">
                                    {order.order_number}
                                </h2>
                                <p className="text-xs text-slate-500 mt-1">
                                    Penerima: <span className="font-semibold text-slate-800">{order.customer_name}</span> ({order.city})
                                </p>
                            </div>

                            <div className="text-left sm:text-right">
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 inline-block mb-1">
                                    Status: {order.order_status}
                                </span>
                                <p className="text-xs text-slate-500">
                                    Resi Ekspedisi: <span className="font-mono font-bold text-slate-900">{order.tracking_code || 'Menunggu input kurir'}</span>
                                </p>
                            </div>
                        </div>

                        {/* Visual Progress Stepper */}
                        <div>
                            <h3 className="font-serif font-bold text-base text-[#0F2942] mb-6">
                                Riwayat Perjalanan Paket
                            </h3>
                            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-sky-200">
                                {steps.map((st) => {
                                    const status = getStepStatus(st.key, order.order_status);
                                    return (
                                        <div key={st.key} className="relative flex items-start gap-4">
                                            {/* Step dot */}
                                            <div className={`absolute -left-6 sm:-left-8 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                                                status === 'completed'
                                                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                                                    : status === 'current'
                                                    ? 'bg-sky-500 text-white ring-4 ring-sky-100 animate-pulse'
                                                    : 'bg-slate-200 text-slate-500'
                                            }`}>
                                                {status === 'completed' ? (
                                                    <CheckCircle2 className="w-4 h-4" />
                                                ) : (
                                                    <span className="w-2 h-2 rounded-full bg-current" />
                                                )}
                                            </div>

                                            <div>
                                                <h4 className={`text-sm font-bold ${
                                                    status === 'upcoming' ? 'text-slate-400' : 'text-slate-900'
                                                }`}>
                                                    {st.title}
                                                </h4>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {st.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Items in this order */}
                        <div className="pt-6 border-t border-slate-100">
                            <h4 className="font-serif font-bold text-sm text-[#0F2942] mb-3">
                                Buku dalam Paket Ini:
                            </h4>
                            <div className="space-y-2">
                                {order.items?.map((it) => (
                                    <div key={it.id} className="p-3 bg-[#EDF4FC] rounded-2xl flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <Package className="w-4 h-4 text-sky-600" />
                                            <span className="font-semibold text-slate-800">{it.book?.title}</span>
                                        </div>
                                        <span className="text-slate-500">{it.quantity} eksemplar</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery address footer */}
                        <div className="p-4 bg-sky-50/80 rounded-2xl border border-sky-200 flex items-start gap-3 text-xs text-sky-950">
                            <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="font-bold">Alamat Pengantaran:</span> {order.shipping_address}, {order.city}, {order.postal_code}
                            </div>
                        </div>
                    </div>
                ) : searchTerm ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-sky-100 max-w-lg mx-auto shadow-sm">
                        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                        <h3 className="font-serif font-bold text-lg text-slate-900">
                            Pesanan Tidak Ditemukan
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Kami tidak dapat menemukan data pesanan dengan nomor <span className="font-mono font-bold text-slate-800">"{searchTerm}"</span>. Pastikan Anda mengetik nomor pesanan atau resi dengan benar.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-sky-100 max-w-lg mx-auto shadow-sm">
                        <Truck className="w-12 h-12 text-sky-600 mx-auto mb-3" />
                        <h3 className="font-serif font-bold text-lg text-slate-900">
                            Pantau Perjalanan Buku Anda
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Silakan masukkan nomor pesanan yang tertera pada faktur atau email konfirmasi Anda pada kotak di atas.
                        </p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
