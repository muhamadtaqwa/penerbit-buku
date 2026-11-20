import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    CheckCircle2, 
    Copy, 
    Check, 
    Package, 
    Truck, 
    Printer, 
    ArrowRight, 
    QrCode, 
    Building2,
    Calendar,
    MapPin
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Order } from '@/types';
import { formatRupiah, formatDateIndo } from '@/lib/utils';

interface OrderSuccessProps {
    order: Order;
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PublicLayout>
            <Head title={`Faktur Pesanan ${order.order_number} - Pustaka Aksara Press`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Confirmation Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sky-100 shadow-xl space-y-8">
                    {/* Header */}
                    <div className="text-center pb-8 border-b border-sky-100">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                            Pembayaran Berhasil Diverifikasi
                        </span>
                        <h1 className="text-3xl font-serif font-bold text-[#0F2942] mt-3">
                            Faktur & Bukti Pemesanan Buku
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Pesanan Anda sedang dipersiapkan oleh tim logistik Pustaka Aksara.
                        </p>
                    </div>

                    {/* Order Metadata Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#EDF4FC] border border-sky-100 text-xs">
                        <div>
                            <span className="text-slate-400 block mb-1">Nomor Pesanan</span>
                            <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-slate-900">{order.order_number}</span>
                                <button
                                    onClick={() => handleCopy(order.order_number)}
                                    className="p-1 hover:bg-sky-200 rounded text-slate-500"
                                    title="Salin Nomor Pesanan"
                                >
                                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <span className="text-slate-400 block mb-1">Tanggal Transaksi</span>
                            <span className="font-semibold text-slate-800">{formatDateIndo(order.created_at)}</span>
                        </div>

                        <div>
                            <span className="text-slate-400 block mb-1">Metode Pembayaran</span>
                            <span className="font-semibold text-slate-800">{order.payment_method}</span>
                        </div>

                        <div>
                            <span className="text-slate-400 block mb-1">Nomor Resi Pengiriman</span>
                            <span className="font-mono font-bold text-sky-700">{order.tracking_code || 'Dalam Proses'}</span>
                        </div>
                    </div>

                    {/* Items table */}
                    <div>
                        <h2 className="font-serif font-bold text-base text-[#0F2942] mb-4">
                            Daftar Buku yang Dipesan
                        </h2>
                        <div className="border border-sky-100 rounded-2xl overflow-hidden divide-y divide-sky-50">
                            {order.items?.map((item) => (
                                <div key={item.id} className="p-4 flex items-center justify-between text-xs gap-4 bg-white">
                                    <div className="flex items-center gap-3">
                                        {item.book?.cover_image && (
                                            <div className="w-10 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                                                <img src={item.book.cover_image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{item.book?.title}</h4>
                                            <p className="text-slate-500">Penulis: {item.book?.author?.name} • Format: {item.book?.format}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-slate-500">{item.quantity} x {formatRupiah(item.price)}</p>
                                        <p className="font-bold text-slate-900 text-sm">{formatRupiah(item.subtotal)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping and Totals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="p-5 rounded-2xl bg-[#EDF4FC] border border-sky-100 text-xs space-y-2">
                            <h3 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                                <MapPin className="w-4 h-4 text-sky-600" />
                                <span>Alamat Tujuan Pengiriman</span>
                            </h3>
                            <p className="font-bold text-slate-900 text-sm mt-1">{order.customer_name}</p>
                            <p className="text-slate-600">{order.customer_phone}</p>
                            <p className="text-slate-600 mt-1 leading-relaxed">
                                {order.shipping_address}, {order.city}, {order.postal_code}
                            </p>
                            <div className="pt-2 text-slate-500">
                                Ekspedisi: <span className="font-semibold text-slate-800">{order.courier}</span>
                            </div>
                        </div>

                        <div className="space-y-3 text-xs">
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-slate-500">Subtotal Buku:</span>
                                <span className="font-bold text-slate-900">{formatRupiah(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-slate-500">Ongkos Kirim:</span>
                                <span className="font-bold text-slate-900">{formatRupiah(order.shipping_cost)}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b-2 border-sky-900 text-sm">
                                <span className="font-bold text-slate-900">Total Dibayar:</span>
                                <span className="font-serif font-bold text-sky-700 text-lg">
                                    {formatRupiah(order.total_amount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Next action buttons */}
                    <div className="pt-8 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link
                            href={route('orders.track', { search: order.order_number })}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition"
                        >
                            <Package className="w-4 h-4" />
                            <span>Lacak Progres Pengiriman Paket</span>
                        </Link>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => window.print()}
                                className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-sky-200 hover:bg-sky-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
                            >
                                <Printer className="w-4 h-4" />
                                <span>Cetak Faktur</span>
                            </button>
                            <Link
                                href={route('books.index')}
                                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#0F2942] hover:bg-slate-800 text-white text-xs font-semibold text-center transition"
                            >
                                Belanja Lagi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
