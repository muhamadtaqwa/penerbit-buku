import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    ShoppingBag, 
    Trash2, 
    Minus, 
    Plus, 
    ArrowRight, 
    ShieldCheck, 
    Truck, 
    ArrowLeft 
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useCart } from '@/hooks/useCart';
import { formatRupiah } from '@/lib/utils';

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, clearCart, totalCount, subtotal } = useCart();
    const shippingEstimate = cart.length > 0 ? 15000 : 0;
    const totalEstimate = subtotal + shippingEstimate;

    return (
        <PublicLayout>
            <Head title="Keranjang Belanja - Pustaka Aksara Press" />

            {/* Banner */}
            <div className="bg-[#0F2942] text-white py-10 border-b border-sky-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-serif font-bold">Keranjang Belanja</h1>
                    <p className="text-slate-300 text-xs mt-1">
                        Periksa kembali buku pilihan Anda sebelum melanjutkan ke pembayaran.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* Cart items list */}
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-sky-100 text-xs text-slate-500 font-semibold uppercase">
                                <span>Item Buku ({totalCount})</span>
                                <button
                                    onClick={clearCart}
                                    className="text-rose-600 hover:underline normal-case font-medium"
                                >
                                    Kosongkan Keranjang
                                </button>
                            </div>

                            {cart.map((item) => {
                                const price = item.book.discount_price ?? item.book.price;
                                return (
                                    <div
                                        key={item.book.id}
                                        className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center gap-5 justify-between"
                                    >
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            {/* Cover */}
                                            <div className="w-16 h-22 aspect-[3/4.2] rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
                                                <img
                                                    src={item.book.cover_image}
                                                    alt={item.book.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Title & Author */}
                                            <div>
                                                <span className="text-[10px] font-bold text-sky-600 uppercase">
                                                    {item.book.category?.name}
                                                </span>
                                                <h3 className="font-serif font-bold text-[#0F2942] text-base line-clamp-1 hover:text-sky-600">
                                                    <Link href={route('books.show', item.book.slug)}>
                                                        {item.book.title}
                                                    </Link>
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    {item.book.author?.name} • {item.book.format}
                                                </p>
                                                <p className="text-sm font-bold text-[#0F2942] mt-1">
                                                    {formatRupiah(price)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quantity & Line Total */}
                                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                            <div className="flex items-center border border-sky-200 rounded-2xl bg-[#EDF4FC] p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                                                    className="p-1 rounded-xl text-slate-600 hover:bg-white transition"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold text-slate-900">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                                                    className="p-1 rounded-xl text-slate-600 hover:bg-white transition"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <span className="text-xs text-slate-400 block sm:hidden">Total:</span>
                                                <span className="text-sm font-bold text-sky-700">
                                                    {formatRupiah(price * item.quantity)}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.book.id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 transition"
                                                title="Hapus dari keranjang"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="pt-4">
                                <Link
                                    href={route('books.index')}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Lanjut Berbelanja Buku Lain</span>
                                </Link>
                            </div>
                        </div>

                        {/* Order summary sidebar */}
                        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl space-y-6">
                            <h2 className="font-serif font-bold text-lg text-[#0F2942] pb-3 border-b border-slate-100">
                                Ringkasan Pesanan
                            </h2>

                            <div className="space-y-3 text-xs text-slate-600">
                                <div className="flex items-center justify-between">
                                    <span>Total Harga Buku ({totalCount} item)</span>
                                    <span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Perkiraan Ongkir (JNE/SiCepat)</span>
                                    <span className="font-bold text-slate-900">{formatRupiah(shippingEstimate)}</span>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                                    <span className="font-bold text-slate-900">Total Pembayaran</span>
                                    <span className="font-bold text-sky-700 text-lg">{formatRupiah(totalEstimate)}</span>
                                </div>
                            </div>

                            <Link
                                href={route('checkout')}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition"
                            >
                                <span>Lanjutkan ke Pembayaran</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Transaksi aman bergaransi resmi Pustaka Aksara</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-sky-600" />
                                    <span>Buku dikemas aman dan siap kirim dalam 24 jam</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 text-center border border-sky-100 max-w-xl mx-auto shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-[#EDF4FC] text-sky-500 flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-serif font-bold text-slate-900">
                            Keranjang Belanja Anda Masih Kosong
                        </h2>
                        <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                            Belum ada buku yang Anda pilih. Silakan jelajahi katalog koleksi kami untuk menemukan bacaan favorit Anda.
                        </p>
                        <Link
                            href={route('books.index')}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-semibold shadow-md shadow-sky-500/20 transition"
                        >
                            <span>Mulai Jelajahi Katalog Buku</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
