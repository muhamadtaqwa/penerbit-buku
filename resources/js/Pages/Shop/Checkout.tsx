import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ShieldCheck, 
    Truck, 
    CreditCard, 
    QrCode, 
    Building2, 
    Check, 
    ArrowLeft, 
    ShoppingBag, 
    ChevronRight,
    MapPin
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useCart } from '@/hooks/useCart';
import { formatRupiah } from '@/lib/utils';

export default function Checkout() {
    const { cart, subtotal, totalCount, clearCart } = useCart();

    const [selectedCourier, setSelectedCourier] = useState('JNE Reguler (2-3 Hari)');
    const [courierCost, setCourierCost] = useState(15000);
    const [selectedPayment, setSelectedPayment] = useState('QRIS Instant (GoPay, OVO, Dana, ShopeePay)');

    const couriers = [
        { name: 'JNE Reguler (2-3 Hari)', cost: 15000 },
        { name: 'SiCepat BEST Express (1 Hari)', cost: 25000 },
        { name: 'J&T Express (2-3 Hari)', cost: 18000 },
    ];

    const paymentMethods = [
        { id: 'qris', name: 'QRIS Instant (GoPay, OVO, Dana, ShopeePay)', icon: QrCode, badge: 'Paling Cepat' },
        { id: 'bca_va', name: 'BCA Virtual Account', icon: Building2, badge: 'Otomatis' },
        { id: 'mandiri_va', name: 'Mandiri Virtual Account', icon: Building2, badge: 'Otomatis' },
        { id: 'bsi_va', name: 'Bank Syariah Indonesia (BSI)', icon: Building2, badge: 'Syariah' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        customer_name: 'Andi Pratama',
        customer_email: 'pembaca@aksara.id',
        customer_phone: '081234567890',
        shipping_address: 'Jl. Senopati Raya No. 42, Kebayoran Baru',
        city: 'Jakarta Selatan',
        postal_code: '12190',
        courier: selectedCourier,
        payment_method: selectedPayment,
        notes: '',
        items: [] as Array<{ book_id: number; quantity: number }>,
    });

    useEffect(() => {
        if (cart.length > 0) {
            setData('items', cart.map(i => ({ book_id: i.book.id, quantity: i.quantity })));
        }
    }, [cart]);

    const handleCourierChange = (cName: string, cost: number) => {
        setSelectedCourier(cName);
        setCourierCost(cost);
        setData('courier', cName);
    };

    const handlePaymentChange = (pName: string) => {
        setSelectedPayment(pName);
        setData('payment_method', pName);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.store'), {
            onSuccess: () => {
                clearCart();
            },
        });
    };

    const grandTotal = subtotal + courierCost;

    if (cart.length === 0) {
        return (
            <PublicLayout>
                <Head title="Checkout - Pustaka Aksara Press" />
                <div className="max-w-xl mx-auto px-4 py-24 text-center">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-serif font-bold text-slate-900">
                        Tidak Ada Buku untuk Dipesan
                    </h2>
                    <p className="text-xs text-slate-500 mt-2">
                        Silakan tambahkan buku ke keranjang Anda terlebih dahulu.
                    </p>
                    <Link
                        href={route('books.index')}
                        className="mt-6 inline-flex px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-semibold shadow-md"
                    >
                        Ke Katalog Buku
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Penyelesaian Pesanan (Checkout) - Pustaka Aksara Press" />

            {/* Banner */}
            <div className="bg-[#0F2942] text-white py-8 border-b border-sky-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-serif font-bold">Penyelesaian Pesanan</h1>
                        <p className="text-xs text-slate-300 mt-0.5">Lengkapi alamat pengiriman dan konfirmasi pembayaran Anda</p>
                    </div>
                    <Link
                        href={route('cart')}
                        className="text-xs text-cyan-300 hover:underline flex items-center gap-1"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Kembali ke Keranjang</span>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Left Form: Details, Courier, Payment */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Step 1: Customer & Shipping Details */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
                                <h2 className="font-serif font-bold text-lg text-[#0F2942] pb-3 border-b border-slate-100 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-sky-600" />
                                    <span>Alamat Pengiriman Buku</span>
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nama Lengkap Penerima *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.customer_name}
                                            onChange={(e) => setData('customer_name', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                            required
                                        />
                                        {errors.customer_name && <p className="text-xs text-rose-600 mt-1">{errors.customer_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Email Konfirmasi & Resi *
                                        </label>
                                        <input
                                            type="email"
                                            value={data.customer_email}
                                            onChange={(e) => setData('customer_email', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                            required
                                        />
                                        {errors.customer_email && <p className="text-xs text-rose-600 mt-1">{errors.customer_email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Nomor Telepon / WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.customer_phone}
                                            onChange={(e) => setData('customer_phone', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                            required
                                        />
                                        {errors.customer_phone && <p className="text-xs text-rose-600 mt-1">{errors.customer_phone}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Alamat Lengkap (Jalan, No. Rumah, RT/RW, Kecamatan) *
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={data.shipping_address}
                                            onChange={(e) => setData('shipping_address', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                            required
                                        />
                                        {errors.shipping_address && <p className="text-xs text-rose-600 mt-1">{errors.shipping_address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Kota / Kabupaten *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                            required
                                        />
                                        {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Kode Pos *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.postal_code}
                                            onChange={(e) => setData('postal_code', e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                            required
                                        />
                                        {errors.postal_code && <p className="text-xs text-rose-600 mt-1">{errors.postal_code}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Catatan Tambahan untuk Kurir / Pesan Khusus (Opsional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Contoh: Titipkan di pos satpam / minta pembatas buku ekstra"
                                            className="w-full px-3.5 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-xs text-slate-800 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 2: Courier Selection */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-4">
                                <h2 className="font-serif font-bold text-lg text-[#0F2942] pb-3 border-b border-slate-100 flex items-center gap-2">
                                    <Truck className="w-5 h-5 text-sky-600" />
                                    <span>Pilihan Layanan Ekspedisi & Ongkir</span>
                                </h2>

                                <div className="space-y-3">
                                    {couriers.map((c) => (
                                        <label
                                            key={c.name}
                                            onClick={() => handleCourierChange(c.name, c.cost)}
                                            className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                                                selectedCourier === c.name
                                                    ? 'border-sky-500 bg-sky-50/70 shadow-sm'
                                                    : 'border-slate-200 hover:border-sky-200'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="courier"
                                                    checked={selectedCourier === c.name}
                                                    onChange={() => handleCourierChange(c.name, c.cost)}
                                                    className="text-sky-600 focus:ring-sky-500"
                                                />
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900">{c.name}</p>
                                                    <p className="text-[11px] text-slate-500">Asuransi & Kemasan Pelindung Termasuk</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-sky-700">
                                                {formatRupiah(c.cost)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Payment Method */}
                            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-4">
                                <h2 className="font-serif font-bold text-lg text-[#0F2942] pb-3 border-b border-slate-100 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-sky-600" />
                                    <span>Metode Pembayaran Resmi</span>
                                </h2>

                                <div className="space-y-3">
                                    {paymentMethods.map((p) => {
                                        const Icon = p.icon;
                                        return (
                                            <label
                                                key={p.name}
                                                onClick={() => handlePaymentChange(p.name)}
                                                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                                                    selectedPayment === p.name
                                                        ? 'border-sky-500 bg-sky-50/70 shadow-sm'
                                                        : 'border-slate-200 hover:border-sky-200'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="payment_method"
                                                        checked={selectedPayment === p.name}
                                                        onChange={() => handlePaymentChange(p.name)}
                                                        className="text-sky-600 focus:ring-sky-500"
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <Icon className="w-4 h-4 text-sky-600" />
                                                        <span className="text-xs font-bold text-slate-900">{p.name}</span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDF4FC] text-sky-700">
                                                    {p.badge}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Summary Sticky Card */}
                        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6 sticky top-28">
                            <h2 className="font-serif font-bold text-lg text-[#0F2942] pb-3 border-b border-slate-100">
                                Rincian Belanja ({totalCount} Buku)
                            </h2>

                            {/* Books list preview */}
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                                {cart.map((item) => {
                                    const p = item.book.discount_price ?? item.book.price;
                                    return (
                                        <div key={item.book.id} className="flex items-center justify-between text-xs gap-3">
                                            <div className="flex items-center gap-2.5 line-clamp-1">
                                                <span className="w-5 h-5 rounded-md bg-[#EDF4FC] text-sky-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                                                    {item.quantity}x
                                                </span>
                                                <span className="font-medium text-slate-800 line-clamp-1">
                                                    {item.book.title}
                                                </span>
                                            </div>
                                            <span className="font-bold text-slate-900 flex-shrink-0">
                                                {formatRupiah(p * item.quantity)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Fee Calculation */}
                            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal Buku</span>
                                    <span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Ongkos Kirim ({selectedCourier.split(' ')[0]})</span>
                                    <span className="font-bold text-slate-900">{formatRupiah(courierCost)}</span>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-base">
                                    <span className="font-serif font-bold text-[#0F2942]">Total Pembayaran</span>
                                    <span className="font-serif font-bold text-sky-700 text-xl">
                                        {formatRupiah(grandTotal)}
                                    </span>
                                </div>
                            </div>

                            {/* Complete purchase button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Check className="w-4 h-4" />
                                <span>{processing ? 'Memproses Pesanan...' : 'Bayar Sekarang & Konfirmasi'}</span>
                            </button>

                            <p className="text-[11px] text-slate-400 text-center">
                                Pembayaran simulasi instant. Nomor resi dan faktur resmi akan otomatis diterbitkan.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
