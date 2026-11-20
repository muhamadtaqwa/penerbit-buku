import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    BookOpen, 
    ShoppingBag, 
    Menu, 
    X, 
    Search, 
    Feather, 
    Compass, 
    FileText, 
    Package, 
    Info, 
    Phone, 
    ShieldCheck, 
    Sparkles,
    LayoutDashboard,
    UserCheck,
    CheckCircle,
    ArrowRight
} from 'lucide-react';
import { PageProps } from '@/types';
import { useCart } from '@/hooks/useCart';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const { totalCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = route('books.index', { search: searchQuery.trim() });
        }
    };

    return (
        <div className="min-h-screen flex flex-col text-slate-800">
            {/* Top Bar Banner (Deep Navy with Cyan Accent) */}
            <div className="bg-[#0F2942] text-slate-300 text-xs py-2 px-4 border-b border-sky-900/50">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                        <p className="font-medium text-slate-200">
                            Penerimaan Naskah Periode 2026/2027 Telah Dibuka • Terbitkan Karya Anda Bersama Kami
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                        <Link href={route('orders.track')} className="hover:text-sky-300 transition flex items-center gap-1">
                            <Package className="w-3.5 h-3.5" />
                            <span>Lacak Pesanan</span>
                        </Link>
                        <span className="text-slate-600">|</span>
                        <Link href={route('contact')} className="hover:text-sky-300 transition flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            <span>Bantuan & Kontak</span>
                        </Link>
                        <span className="text-slate-600">|</span>
                        <Link href={route('admin.dashboard')} className="hover:text-sky-300 transition font-semibold text-sky-400 flex items-center gap-1">
                            <LayoutDashboard className="w-3.5 h-3.5" />
                            <span>Portal Redaksi</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Brand Logo */}
                        <Link href={route('home')} className="flex items-center gap-3 group">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform duration-300">
                                <BookOpen className="w-6 h-6 stroke-[2.2]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold tracking-wide text-[#0F2942] group-hover:text-sky-600 transition-colors">
                                    PUSTAKA AKSARA
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-sky-600 font-semibold -mt-1">
                                    Penerbit & Rumah Gagasan
                                </span>
                            </div>
                        </Link>

                        {/* Search Bar (Desktop) */}
                        <div className="hidden lg:flex flex-1 max-w-md mx-8">
                            <form onSubmit={handleSearchSubmit} className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari judul buku, nama penulis, atau ISBN..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#EDF4FC] border-transparent rounded-full text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition"
                                />
                                <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            </form>
                        </div>

                        {/* Navigation Links (Desktop) */}
                        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
                            <Link 
                                href={route('books.index')} 
                                className="hover:text-sky-600 transition"
                            >
                                Katalog Buku
                            </Link>
                            <Link 
                                href={route('authors.index')} 
                                className="hover:text-sky-600 transition"
                            >
                                Penulis
                            </Link>
                            <Link 
                                href={route('services')} 
                                className="hover:text-sky-600 transition"
                            >
                                Layanan Penerbitan
                            </Link>
                            <Link 
                                href={route('articles.index')} 
                                className="hover:text-sky-600 transition"
                            >
                                Warta & Artikel
                            </Link>
                            <Link 
                                href={route('manuscripts.create')} 
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-50 text-sky-700 border border-sky-200 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white hover:border-transparent transition shadow-sm"
                            >
                                <Feather className="w-4 h-4" />
                                <span>Kirim Naskah</span>
                            </Link>
                        </nav>

                        {/* Cart & Profile Actions */}
                        <div className="flex items-center gap-4">
                            {/* Cart Icon */}
                            <Link 
                                href={route('cart')} 
                                className="relative p-2.5 rounded-full bg-[#EDF4FC] hover:bg-sky-100 text-[#0F2942] hover:text-sky-600 transition"
                                title="Keranjang Belanja"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {totalCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-bold flex items-center justify-center animate-in zoom-in shadow-md shadow-sky-500/30">
                                        {totalCount}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-sky-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
                        <form onSubmit={handleSearchSubmit} className="relative mb-3">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari buku, penulis..."
                                className="w-full pl-10 pr-4 py-2 bg-[#EDF4FC] border-none rounded-xl text-sm"
                            />
                            <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </form>
                        <Link 
                            href={route('home')} 
                            className="block py-2 text-slate-800 font-semibold border-b border-slate-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link 
                            href={route('books.index')} 
                            className="block py-2 text-slate-800 font-semibold border-b border-slate-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Katalog Buku
                        </Link>
                        <Link 
                            href={route('authors.index')} 
                            className="block py-2 text-slate-800 font-semibold border-b border-slate-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Daftar Penulis
                        </Link>
                        <Link 
                            href={route('services')} 
                            className="block py-2 text-slate-800 font-semibold border-b border-slate-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Layanan Penerbitan
                        </Link>
                        <Link 
                            href={route('articles.index')} 
                            className="block py-2 text-slate-800 font-semibold border-b border-slate-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Warta & Artikel Literasi
                        </Link>
                        <Link 
                            href={route('manuscripts.create')} 
                            className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Feather className="w-4 h-4" />
                            <span>Kirim Naskah Sekarang</span>
                        </Link>
                    </div>
                )}
            </header>

            {/* Flash Message Toast Notification */}
            {flash?.success && (
                <div className="bg-sky-50 border-b border-sky-200 text-sky-900 px-4 py-3 text-sm flex items-center justify-center gap-2 animate-in fade-in">
                    <CheckCircle className="w-4 h-4 text-sky-600 flex-shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}

            {/* Main Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer (Deep Oceanic Navy #0F2942 with Sky Cyan highlights) */}
            <footer className="bg-[#0F2942] text-slate-300 pt-16 pb-12 border-t border-sky-950 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-sky-900/60">
                        {/* Column 1: Publisher Info */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <span className="font-serif text-2xl font-bold tracking-wide text-white">
                                    PUSTAKA AKSARA
                                </span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
                                Rumah penerbitan independen yang berdedikasi melahirkan karya sastra, sains, filsafat, dan pemikiran berbobot untuk mencerdaskan dan menginspirasi peradaban bangsa.
                            </p>
                            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 text-sky-300 border border-sky-800/60">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Anggota Resmi IKAPI</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 text-slate-300 border border-sky-800/60">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                    <span>Standar ISBN & Perpusnas</span>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Jelajahi */}
                        <div>
                            <h4 className="text-white font-serif font-bold text-base mb-4 tracking-wide">
                                Jelajahi Katalog
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-300">
                                <li>
                                    <Link href={route('books.index', { category: 'sastra-fiksi' })} className="hover:text-cyan-400 transition">
                                        Sastra & Fiksi
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('books.index', { category: 'pengembangan-diri' })} className="hover:text-cyan-400 transition">
                                        Pengembangan Diri
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('books.index', { category: 'bisnis-ekonomi' })} className="hover:text-cyan-400 transition">
                                        Bisnis & Ekonomi
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('books.index', { category: 'sains-teknologi' })} className="hover:text-cyan-400 transition">
                                        Sains & Masa Depan
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('books.index', { sort: 'bestseller' })} className="hover:text-cyan-400 transition font-medium text-sky-300">
                                        Buku Terlaris (Bestseller)
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Penulis & Penerbitan */}
                        <div>
                            <h4 className="text-white font-serif font-bold text-base mb-4 tracking-wide">
                                Untuk Penulis
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-300">
                                <li>
                                    <Link href={route('manuscripts.create')} className="hover:text-cyan-400 transition flex items-center gap-1 font-medium text-sky-300">
                                        <Feather className="w-3.5 h-3.5" />
                                        <span>Kirim Naskah Online</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('services')} className="hover:text-cyan-400 transition">
                                        Paket Penerbitan Buku
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('articles.show', 'panduan-lengkap-kirim-naskah-2026')} className="hover:text-cyan-400 transition">
                                        Panduan Kurasi Redaksi
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('authors.index')} className="hover:text-cyan-400 transition">
                                        Direktori Penulis Kami
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Informasi */}
                        <div>
                            <h4 className="text-white font-serif font-bold text-base mb-4 tracking-wide">
                                Informasi
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-300">
                                <li>
                                    <Link href={route('about')} className="hover:text-cyan-400 transition">
                                        Tentang Pustaka Aksara
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('contact')} className="hover:text-cyan-400 transition">
                                        Hubungi Kantor Redaksi
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('orders.track')} className="hover:text-cyan-400 transition">
                                        Status Pengiriman Buku
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('admin.dashboard')} className="hover:text-cyan-400 transition text-slate-400">
                                        Area Staf & Redaksi
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Credits */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
                        <p>© 2026 PT Pustaka Aksara Nusantara. Hak Cipta Dilindungi Undang-Undang.</p>
                        <div className="flex items-center gap-6">
                            <span>Yogyakarta • Jakarta • Bandung</span>
                            <span className="text-slate-600">|</span>
                            <span>Laravel 12 + Inertia + React + Tailwind</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
