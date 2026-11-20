import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
    ShoppingBag, 
    Truck, 
    X, 
    Check, 
    Edit, 
    Package, 
    MapPin, 
    Eye 
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Order } from '@/types';
import { formatRupiah, formatDateIndo } from '@/lib/utils';

interface AdminOrdersProps {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function AdminOrders({ orders }: AdminOrdersProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const { data, setData, patch, processing } = useForm({
        order_status: 'processing',
        tracking_code: '',
    });

    const openStatusModal = (order: Order) => {
        setSelectedOrder(order);
        setData({
            order_status: order.order_status,
            tracking_code: order.tracking_code || '',
        });
        setIsStatusModalOpen(true);
    };

    const handleUpdateOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedOrder) return;

        patch(route('admin.orders.update', selectedOrder.id), {
            onSuccess: () => {
                setIsStatusModalOpen(false);
            },
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'processing': return 'bg-amber-100 text-amber-900 border-amber-300';
            case 'packaged': return 'bg-blue-100 text-blue-900 border-blue-300';
            case 'shipped': return 'bg-purple-100 text-purple-900 border-purple-300';
            case 'delivered': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
            case 'cancelled': return 'bg-rose-100 text-rose-900 border-rose-300';
            default: return 'bg-stone-100 text-stone-900 border-stone-300';
        }
    };

    return (
        <AdminLayout title="Kelola Pesanan & Pengiriman Buku">
            <Head title="Manajemen Pesanan - Admin Pustaka Aksara" />

            <div className="space-y-6">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-xs text-stone-600">
                    Menampilkan total <span className="font-bold text-stone-900">{orders.total}</span> transaksi pesanan buku. Perbarui status pesanan dan masukkan resi ekspedisi untuk membantu pembeli melacak kiriman.
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-stone-600">
                            <thead className="bg-stone-50 border-b border-stone-200 uppercase tracking-wider text-[11px] font-bold text-stone-700">
                                <tr>
                                    <th className="py-4 px-6">No. Pesanan & Tanggal</th>
                                    <th className="py-4 px-6">Pembeli & Tujuan</th>
                                    <th className="py-4 px-6">Buku yang Dipesan</th>
                                    <th className="py-4 px-6">Total Pembayaran</th>
                                    <th className="py-4 px-6">Kurir & Resi</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="hover:bg-stone-50/50 transition">
                                        <td className="py-4 px-6">
                                            <span className="font-mono font-bold text-stone-900 text-xs block">
                                                {order.order_number}
                                            </span>
                                            <span className="text-[11px] text-stone-400">
                                                {formatDateIndo(order.created_at)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-semibold text-stone-900">{order.customer_name}</p>
                                            <p className="text-[11px] text-stone-400">{order.city} • {order.customer_phone}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-0.5 max-w-xs">
                                                {order.items?.map((it) => (
                                                    <p key={it.id} className="line-clamp-1 text-[11px]">
                                                        {it.quantity}x {it.book?.title}
                                                    </p>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-bold text-stone-900 text-xs">
                                                {formatRupiah(order.total_amount)}
                                            </span>
                                            <span className="block text-[10px] text-emerald-700 font-bold uppercase mt-0.5">
                                                {order.payment_method} ({order.payment_status})
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-semibold text-stone-800">{order.courier.split(' ')[0]}</p>
                                            <span className="font-mono text-[11px] text-amber-900">
                                                {order.tracking_code || 'Belum diisi'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(order.order_status)}`}>
                                                {order.order_status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => openStatusModal(order)}
                                                className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold inline-flex items-center gap-1.5 transition"
                                            >
                                                <Edit className="w-3.5 h-3.5" />
                                                <span>Update</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Radix UI Dialog: Update Order Status & Tracking Code */}
            <Dialog.Root open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl p-6">
                        {selectedOrder && (
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                                    <div>
                                        <Dialog.Title className="font-serif font-bold text-lg text-stone-900">
                                            Perbarui Status Pengiriman
                                        </Dialog.Title>
                                        <p className="text-xs text-stone-400 font-mono mt-0.5">
                                            {selectedOrder.order_number}
                                        </p>
                                    </div>
                                    <Dialog.Close asChild>
                                        <button className="p-2 text-stone-400 hover:text-stone-700 rounded-lg">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </Dialog.Close>
                                </div>

                                <form onSubmit={handleUpdateOrder} className="space-y-4 mt-5">
                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                                            Status Progres Pesanan *
                                        </label>
                                        <select
                                            value={data.order_status}
                                            onChange={(e) => setData('order_status', e.target.value)}
                                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-1 focus:ring-amber-500"
                                        >
                                            <option value="processing">Pesanan Diproses (Processing)</option>
                                            <option value="packaged">Sedang Dikemas (Packaged)</option>
                                            <option value="shipped">Dalam Pengiriman Kurir (Shipped)</option>
                                            <option value="delivered">Telah Diterima Pembeli (Delivered)</option>
                                            <option value="cancelled">Dibatalkan (Cancelled)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                                            Nomor Resi Pengiriman
                                        </label>
                                        <input
                                            type="text"
                                            value={data.tracking_code}
                                            onChange={(e) => setData('tracking_code', e.target.value)}
                                            placeholder="Contoh: JNE-AKS-88291039"
                                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:ring-1 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsStatusModalOpen(false)}
                                            className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition disabled:opacity-50"
                                        >
                                            {processing ? 'Menyimpan...' : 'Simpan Status'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </AdminLayout>
    );
}
