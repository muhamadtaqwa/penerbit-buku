import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { 
    BookOpen, 
    Sparkles, 
    ArrowRight, 
    Star, 
    ShoppingBag, 
    Eye, 
    Feather, 
    Award, 
    ShieldCheck, 
    Truck, 
    CheckCircle2, 
    Clock, 
    ChevronRight,
    TrendingUp,
    Cpu,
    Landmark,
    Palette,
    Smile
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BookCard from '@/Components/BookCard';
import SampleReaderModal from '@/Components/SampleReaderModal';
import { Book, Category, Author, Article } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface HomeProps {
    featuredBooks: Book[];
    bestsellers: Book[];
    newReleases: Book[];
    categories: Category[];
    featuredAuthors: Author[];
    latestArticles: Article[];
    stats: {
        total_books: number;
        total_authors: number;
        total_categories: number;
        satisfied_readers: string;
        literary_awards: string;
    };
}

export default function Home({
    featuredBooks,
    bestsellers,
    newReleases,
    categories,
    featuredAuthors,
    latestArticles,
    stats,
}: HomeProps) {
    const { addToCart } = useCart();
    const [heroBook] = useState<Book>(featuredBooks[0]);
    const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);

    const getCategoryIcon = (slug: string) => {
        switch (slug) {
            case 'sastra-fiksi': return BookOpen;
            case 'pengembangan-diri': return Sparkles;
            case 'bisnis-ekonomi': return TrendingUp;
            case 'sains-teknologi': return Cpu;
            case 'sejarah-budaya': return Landmark;
            case 'puisi-seni': return Palette;
            default: return Smile;
        }
    };

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://pustaka-aksara.id/#organization',
                'name': 'Pustaka Aksara',
                'url': 'https://pustaka-aksara.id',
                'logo': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600',
                'description': 'Penerbit buku sastra, filosofi, dan pemikiran nusantara berkualitas tinggi.',
                'foundingDate': '2018',
                'sameAs': [
                    'https://instagram.com/pustakaaksara',
                    'https://twitter.com/pustakaaksara'
                ]
            },
            {
                '@type': 'WebSite',
                '@id': 'https://pustaka-aksara.id/#website',
                'url': 'https://pustaka-aksara.id',
                'name': 'Pustaka Aksara',
                'potentialAction': {
                    '@type': 'SearchAction',
                    'target': 'https://pustaka-aksara.id/katalog?search={search_term_string}',
                    'query-input': 'required name=search_term_string'
                }
            }
        ]
    };

    return (
        <PublicLayout>
            <SEO 
                title="Pustaka Aksara - Penerbit Buku Sastra, Filosofi & Pemikiran Nusantara"
                description="Temukan buku sastra, filosofi, dan pengembangan diri terbaik Indonesia di Pustaka Aksara. Nikmati fitur baca sampel gratis, pembelian mudah, dan layanan penerbitan naskah profesional."
                keywords="penerbit buku indonesia, novel sastra nusantara, buku filosofi, beli buku online, kirim naskah novel, pustaka aksara"
                schema={organizationSchema}
            />

            {/* HERO SECTION (Deep Navy & Sky Cyan Ambient Glow) */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#0F2942] via-[#163657] to-[#0F2942] text-white py-16 lg:py-24">
                {/* Decorative background glows */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Hero Text */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Karya Utama Pilihan Redaksi Bulan Ini</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                                Menghidupkan Gagasan, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-200">
                                    Mengabadikan Kata.
                                </span>
                            </h1>

                            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                                Pustaka Aksara menerbitkan karya-karya bermutu tinggi: dari fiksi mendalam yang mengguncang jiwa, hingga buku refleksi dan sains yang memandu peradaban manusia masa depan.
                            </p>

                            {/* Book Highlights in Hero */}
                            {heroBook && (
                                <div className="p-5 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md max-w-xl space-y-3 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase">
                                            {heroBook.category?.name}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-amber-400">
                                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                                            <span className="font-bold">{heroBook.rating_avg}</span>
                                            <span className="text-slate-300">({heroBook.reviews_count} ulasan)</span>
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-serif font-bold text-white line-clamp-1">
                                        {heroBook.title}
                                    </h2>
                                    <p className="text-xs text-slate-300 line-clamp-2">
                                        {heroBook.synopsis}
                                    </p>
                                </div>
                            )}

                            {/* CTAs */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <Link
                                    href={route('books.index')}
                                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm shadow-xl shadow-sky-500/30 flex items-center gap-2 group transition duration-300"
                                >
                                    <span>Jelajahi Katalog Buku</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {heroBook && (
                                    <button
                                        type="button"
                                        onClick={() => setIsReaderModalOpen(true)}
                                        className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition backdrop-blur-sm"
                                    >
                                        <Eye className="w-4 h-4 text-cyan-300" />
                                        <span>Baca Sampel Bab</span>
                                    </button>
                                )}
                            </div>

                            {/* Trust metrics */}
                            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
                                <div>
                                    <p className="text-2xl font-bold font-serif text-white">{stats.total_books}+</p>
                                    <p className="text-xs text-slate-300">Judul Terbit</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold font-serif text-white">{stats.satisfied_readers}</p>
                                    <p className="text-xs text-slate-300">Pembaca Puas</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold font-serif text-white">{stats.literary_awards}</p>
                                    <p className="text-xs text-slate-300">Penghargaan Sastra</p>
                                </div>
                            </div>
                        </div>

                        {/* Hero 3D Book Visual Spotlight */}
                        <div className="lg:col-span-5 flex justify-center">
                            {heroBook && (
                                <div className="relative group">
                                    {/* Ambient Glow */}
                                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-500" />
                                    
                                    {/* 3D Book Cover Presentation */}
                                    <div className="relative aspect-[3/4.4] w-64 sm:w-80 rounded-3xl overflow-hidden shadow-2xl border-2 border-sky-400/40 bg-slate-900 book-cover-card">
                                        <img
                                            src={heroBook.cover_image}
                                            alt={heroBook.title}
                                            className="w-full h-full object-cover book-spine-effect"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-6">
                                            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                                                Edisi Kolektor
                                            </span>
                                            <h3 className="text-lg font-serif font-bold text-white leading-snug">
                                                {heroBook.title}
                                            </h3>
                                            <p className="text-xs text-slate-300 mt-1">
                                                {heroBook.author?.name}
                                            </p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-base font-bold text-cyan-300">
                                                    {formatRupiah(heroBook.discount_price ?? heroBook.price)}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(heroBook, 1)}
                                                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-500/30 transition"
                                                >
                                                    <ShoppingBag className="w-3.5 h-3.5" />
                                                    <span>Beli Sekarang</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST BADGES BAR */}
            <section className="bg-white border-y border-sky-100 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                        <div className="flex items-center gap-3.5 justify-center md:justify-start">
                            <div className="p-2.5 rounded-2xl bg-[#EDF4FC] text-sky-600">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Kurasi Naskah Ketat</h4>
                                <p className="text-xs text-slate-500">Mutu literatur terjamin standar IKAPI</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 justify-center md:justify-start">
                            <div className="p-2.5 rounded-2xl bg-[#EDF4FC] text-sky-600">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">100% Buku Asli</h4>
                                <p className="text-xs text-slate-500">Cetak resmi ber-ISBN dari Perpusnas</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 justify-center md:justify-start">
                            <div className="p-2.5 rounded-2xl bg-[#EDF4FC] text-sky-600">
                                <Truck className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Pengiriman Seluruh Nusantara</h4>
                                <p className="text-xs text-slate-500">Kemasan ekstra aman bubble wrap</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3.5 justify-center md:justify-start">
                            <div className="p-2.5 rounded-2xl bg-[#EDF4FC] text-sky-600">
                                <Feather className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Royalti Penulis Adil</h4>
                                <p className="text-xs text-slate-500">Laporan penjualan transparan & cepat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GENRE / CATEGORIES EXPLORER */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                                Klasifikasi Pustaka
                            </span>
                            <h2 className="text-3xl font-serif font-bold text-[#0F2942] mt-1">
                                Jelajahi Berdasarkan Kategori
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Temukan karya yang sesuai dengan minat dan pencarian intelektual Anda.
                            </p>
                        </div>
                        <Link
                            href={route('books.index')}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline"
                        >
                            <span>Lihat Semua Kategori</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat) => {
                            const Icon = getCategoryIcon(cat.slug);
                            return (
                                <Link
                                    key={cat.id}
                                    href={route('books.index', { category: cat.slug })}
                                    className="group p-5 rounded-3xl bg-white border border-sky-100 shadow-sm hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col items-center text-center space-y-3"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#EDF4FC] text-sky-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                                            {cat.name}
                                        </h3>
                                        <span className="text-[11px] text-slate-400 mt-0.5 block">
                                            {cat.books_count || 0} Judul Buku
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* BESTSELLERS SECTION */}
            <section className="py-16 bg-white border-y border-sky-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                                Paling Banyak Dibaca
                            </span>
                            <h2 className="text-3xl font-serif font-bold text-[#0F2942] mt-1">
                                Buku Terlaris (Bestsellers)
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Karya sastra dan non-fiksi yang memikat ribuan pembaca di seluruh Indonesia.
                            </p>
                        </div>
                        <Link
                            href={route('books.index', { sort: 'bestseller' })}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline"
                        >
                            <span>Lihat Semua Bestseller</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {bestsellers.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </section>

            {/* AUTHOR SPOTLIGHT */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#F0F7FD] to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                            Pilar Kreativitas
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F2942] mt-1">
                            Para Penulis & Pemikir Kami
                        </h2>
                        <p className="text-sm text-slate-500 mt-2">
                            Pena-pena tajam yang berkolaborasi bersama Pustaka Aksara untuk melahirkan karya literatur berpengaruh.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredAuthors.map((author) => (
                            <div 
                                key={author.id}
                                className="bg-white rounded-3xl p-6 border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-sky-400 p-1">
                                    <img
                                        src={author.avatar_url}
                                        alt={author.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-slate-900 hover:text-sky-600 transition">
                                    <Link href={route('authors.show', author.slug)}>
                                        {author.name}
                                    </Link>
                                </h3>
                                <p className="text-xs text-sky-600 font-medium mt-1">
                                    {author.tagline}
                                </p>
                                <p className="text-xs text-slate-500 mt-3 line-clamp-3 leading-relaxed">
                                    {author.bio}
                                </p>
                                <div className="mt-5 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs">
                                    <span className="text-slate-400">
                                        {author.books_count || 0} Karya Terbit
                                    </span>
                                    <Link
                                        href={route('authors.show', author.slug)}
                                        className="text-sky-600 font-bold hover:underline flex items-center gap-1"
                                    >
                                        <span>Profil & Buku</span>
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href={route('authors.index')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F2942] text-white hover:bg-sky-700 text-sm font-semibold transition shadow-md"
                        >
                            <span>Lihat Semua Penulis Pustaka Aksara</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* NEW RELEASES SECTION */}
            <section className="py-16 bg-white border-b border-sky-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                                Segar dari Percetakan
                            </span>
                            <h2 className="text-3xl font-serif font-bold text-[#0F2942] mt-1">
                                Rilisan Terbaru
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Judul-judul buku anyar yang siap memperkaya koleksi perpustakaan pribadi Anda.
                            </p>
                        </div>
                        <Link
                            href={route('books.index', { sort: 'latest' })}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline"
                        >
                            <span>Lihat Semua Rilisan Baru</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {newReleases.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION: SUBMIT MANUSCRIPT */}
            <section className="py-16 bg-gradient-to-r from-[#0F2942] via-[#163B60] to-[#0F2942] text-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/10 border border-white/15 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
                        <div className="space-y-4 max-w-2xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-semibold">
                                <Feather className="w-3.5 h-3.5" />
                                <span>Panggilan Terbuka untuk Penulis Nusantara</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                                Punya Naskah yang Siap Mencerahkan Dunia?
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                                Jangan biarkan gagasan berharga Anda tersimpan di laci meja kerja. Kirimkan draf naskah fiksi maupun non-fiksi Anda secara langsung kepada dewan redaksi kami melalui portal pengajuan digital.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start text-xs text-slate-300">
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Kurasi Transparan
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Distribusi Nasional
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Hak Cipta Penulis Terlindungi
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
                            <Link
                                href={route('manuscripts.create')}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 hover:from-sky-300 hover:to-cyan-300 text-[#0F2942] font-bold text-sm shadow-xl shadow-cyan-500/25 transition duration-300 flex items-center gap-2"
                            >
                                <Feather className="w-4 h-4" />
                                <span>Kirim Naskah Sekarang</span>
                            </Link>
                            <Link
                                href={route('services')}
                                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
                            >
                                <span>Pelajari Skema Penerbitan</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* LATEST ARTICLES & LITERARY NEWS */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                                Kabar & Resensi
                            </span>
                            <h2 className="text-3xl font-serif font-bold text-[#0F2942] mt-1">
                                Warta Literasi & Esai Redaksi
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                Diskusi tren perbukuan, tips menulis naskah, dan wawancara eksklusif bersama para sastrawan.
                            </p>
                        </div>
                        <Link
                            href={route('articles.index')}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline"
                        >
                            <span>Lihat Semua Artikel</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {latestArticles.map((article) => (
                            <div
                                key={article.id}
                                className="group bg-white rounded-3xl overflow-hidden border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col"
                            >
                                {article.cover_image && (
                                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={article.cover_image}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs text-sky-600 font-semibold mb-2">
                                            <span>{article.category}</span>
                                            <span>•</span>
                                            <span className="text-slate-400 font-normal">{article.read_time}</span>
                                        </div>
                                        <h3 className="font-serif font-bold text-lg text-[#0F2942] group-hover:text-sky-600 transition-colors line-clamp-2">
                                            <Link href={route('articles.show', article.slug)}>
                                                {article.title}
                                            </Link>
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                        <span>Oleh {article.author_name}</span>
                                        <Link
                                            href={route('articles.show', article.slug)}
                                            className="text-sky-600 font-bold hover:underline flex items-center gap-1"
                                        >
                                            <span>Baca</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Radix UI Reader Modal for Hero Book */}
            {heroBook && (
                <SampleReaderModal
                    book={heroBook}
                    isOpen={isReaderModalOpen}
                    onClose={() => setIsReaderModalOpen(false)}
                />
            )}
        </PublicLayout>
    );
}
