import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { 
    Star, 
    ShoppingBag, 
    Eye, 
    Check, 
    BookOpen, 
    Calendar, 
    Globe, 
    Layers, 
    ShieldCheck, 
    Truck, 
    ChevronRight,
    Share2,
    Heart,
    Minus,
    Plus,
    CheckCircle2
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BookCard from '@/Components/BookCard';
import SampleReaderModal from '@/Components/SampleReaderModal';
import { Book, Review } from '@/types';
import { formatRupiah, formatDateIndo } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

interface BookShowProps {
    book: Book;
    relatedBooks: Book[];
}

export default function BookShow({ book, relatedBooks }: BookShowProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isReaderOpen, setIsReaderOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [activeTab, setActiveTab] = useState<'synopsis' | 'specs' | 'reviews'>('synopsis');

    const handleAddToCart = () => {
        addToCart(book, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2500);
    };

    const hasDiscount = book.discount_price && book.discount_price < book.price;
    const finalPrice = hasDiscount ? book.discount_price! : book.price;

    const bookSchema = {
        '@context': 'https://schema.org',
        '@type': 'Book',
        'name': book.title,
        'isbn': book.isbn,
        'numberOfPages': book.pages,
        'inLanguage': book.language || 'id',
        'bookFormat': book.format === 'ebook' ? 'https://schema.org/EBook' : 'https://schema.org/Paperback',
        'image': book.cover_image,
        'description': book.synopsis?.slice(0, 300) + '...',
        'author': {
            '@type': 'Person',
            'name': book.author?.name || 'Pustaka Aksara'
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Pustaka Aksara'
        },
        'datePublished': book.published_year ? `${book.published_year}-01-01` : undefined,
        'offers': {
            '@type': 'Offer',
            'price': finalPrice,
            'priceCurrency': 'IDR',
            'availability': book.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            'url': typeof window !== 'undefined' ? window.location.href : undefined
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': book.rating_avg || 4.8,
            'reviewCount': book.rating_count || 12,
            'bestRating': '5',
            'worstRating': '1'
        }
    };

    const cleanSynopsis = book.synopsis?.replace(/\r?\n|\r/g, ' ').slice(0, 160) || `Buku ${book.title} karya ${book.author?.name}. Terbitan resmi Pustaka Aksara.`;

    return (
        <PublicLayout>
            <SEO 
                title={`${book.title} - ${book.author?.name || 'Katalog Buku'}`}
                description={cleanSynopsis}
                keywords={`${book.title}, buku ${book.author?.name}, beli buku ${book.title}, novel sastra, pustaka aksara`}
                image={book.cover_image}
                type="book"
                author={book.author?.name}
                schema={bookSchema}
            />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-sky-100 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-slate-500">
                        <Link href={route('home')} className="hover:text-sky-600 transition">Beranda</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href={route('books.index')} className="hover:text-sky-600 transition">Katalog</Link>
                        {book.category && (
                            <>
                                <ChevronRight className="w-3.5 h-3.5" />
                                <Link 
                                    href={route('books.index', { category: book.category.slug })}
                                    className="hover:text-sky-600 transition"
                                >
                                    {book.category.name}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-slate-900 font-semibold line-clamp-1">{book.title}</span>
                    </nav>
                </div>
            </div>

            {/* Main Product Showcase */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left: Book Cover Presentation */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div className="relative w-full max-w-sm aspect-[3/4.4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 book-cover-3d group">
                            <img
                                src={book.cover_image}
                                alt={book.title}
                                className="w-full h-full object-cover rounded-2xl book-spine-effect transition-transform duration-500 group-hover:scale-105"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                                {book.is_bestseller && (
                                    <span className="px-3 py-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow">
                                        Bestseller
                                    </span>
                                )}
                                {book.is_new_release && (
                                    <span className="px-3 py-1 bg-cyan-600 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow">
                                        Rilisan Baru
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Interactive Sample Reading Trigger */}
                        <div className="w-full max-w-sm mt-6">
                            <button
                                type="button"
                                onClick={() => setIsReaderOpen(true)}
                                className="w-full py-3.5 px-4 rounded-2xl bg-[#EDF4FC] hover:bg-sky-100 border border-sky-200 text-sky-800 font-semibold text-sm flex items-center justify-center gap-2 transition duration-300 shadow-sm"
                            >
                                <Eye className="w-4 h-4 text-sky-600" />
                                <span>Buka & Baca Sampel Bab (Gratis)</span>
                            </button>
                        </div>

                        {/* Guarantee Badges */}
                        <div className="w-full max-w-sm mt-6 p-4 rounded-3xl bg-white border border-sky-100 space-y-3 text-xs text-slate-600 shadow-sm">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>100% Produk Original Ber-ISBN Resmi</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Truck className="w-4 h-4 text-sky-600" />
                                <span>Pengiriman Cepat & Kemasan Bubble Berlapis</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Book Details & Purchase Panel */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Category & Format */}
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
                                {book.category?.name || 'Sastra'}
                            </span>
                            <span className="px-2.5 py-1 rounded-xl bg-[#EDF4FC] text-slate-600 text-xs font-semibold">
                                {book.format} Edition
                            </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F2942] leading-tight">
                                {book.title}
                            </h1>
                            {book.subtitle && (
                                <p className="text-slate-500 text-base font-serif italic mt-1.5">
                                    {book.subtitle}
                                </p>
                            )}
                        </div>

                        {/* Author Link & Ratings */}
                        <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-sky-100">
                            {book.author && (
                                <Link 
                                    href={route('authors.show', book.author.slug)}
                                    className="flex items-center gap-2.5 group"
                                >
                                    {book.author.avatar_url && (
                                        <img
                                            src={book.author.avatar_url}
                                            alt={book.author.name}
                                            className="w-8 h-8 rounded-full object-cover border border-sky-300"
                                        />
                                    )}
                                    <span className="text-sm font-semibold text-slate-800 group-hover:text-sky-600 group-hover:underline">
                                        Karya {book.author.name}
                                    </span>
                                </Link>
                            )}

                            <div className="flex items-center gap-1.5 text-sm text-amber-500">
                                <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                                <span className="font-bold text-slate-900">{book.rating_avg}</span>
                                <span className="text-slate-400 text-xs">({book.reviews_count} ulasan pembaca)</span>
                            </div>
                        </div>

                        {/* Pricing Box */}
                        <div className="p-6 rounded-3xl bg-white border border-sky-100 shadow-md space-y-5">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold font-serif text-[#0F2942]">
                                    {formatRupiah(finalPrice)}
                                </span>
                                {hasDiscount && (
                                    <>
                                        <span className="text-base text-slate-400 line-through">
                                            {formatRupiah(book.price)}
                                        </span>
                                        <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">
                                            Hemat {formatRupiah(book.price - (book.discount_price || 0))}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Stock status */}
                            <div className="flex items-center gap-2 text-xs">
                                <span className={`w-2 h-2 rounded-full ${book.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                <span className="font-semibold text-slate-700">
                                    {book.stock > 0 ? `Tersedia (${book.stock} eksemplar dalam stok siap kirim)` : 'Stok Habis'}
                                </span>
                            </div>

                            {/* Quantity & Buy Actions */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                                {/* Quantity controller */}
                                <div className="flex items-center border border-sky-200 rounded-2xl bg-[#EDF4FC] p-1">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 rounded-xl text-slate-600 hover:bg-white hover:text-slate-900 transition"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm font-bold text-slate-900">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                                        className="p-2 rounded-xl text-slate-600 hover:bg-white hover:text-slate-900 transition"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className={`flex-1 w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition duration-300 shadow-xl ${
                                        isAdded
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-sky-500/25'
                                    }`}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Berhasil Ditambahkan!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-4 h-4" />
                                            <span>Tambah ke Keranjang</span>
                                        </>
                                    )}
                                </button>

                                {/* Direct Checkout Link */}
                                <Link
                                    href={route('checkout')}
                                    onClick={() => addToCart(book, quantity)}
                                    className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#0F2942] hover:bg-slate-800 text-white font-bold text-sm text-center shadow-lg transition"
                                >
                                    Beli Sekarang
                                </Link>
                            </div>
                        </div>

                        {/* Tabbed Info: Synopsis, Specs, Reviews */}
                        <div className="pt-6">
                            <div className="flex border-b border-sky-100 gap-6">
                                <button
                                    onClick={() => setActiveTab('synopsis')}
                                    className={`pb-3 text-sm font-serif font-bold transition border-b-2 ${
                                        activeTab === 'synopsis'
                                            ? 'border-sky-600 text-sky-700'
                                            : 'border-transparent text-slate-400 hover:text-slate-700'
                                    }`}
                                >
                                    Sinopsis Buku
                                </button>
                                <button
                                    onClick={() => setActiveTab('specs')}
                                    className={`pb-3 text-sm font-serif font-bold transition border-b-2 ${
                                        activeTab === 'specs'
                                            ? 'border-sky-600 text-sky-700'
                                            : 'border-transparent text-slate-400 hover:text-slate-700'
                                    }`}
                                >
                                    Detail & Spesifikasi
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className={`pb-3 text-sm font-serif font-bold transition border-b-2 ${
                                        activeTab === 'reviews'
                                            ? 'border-sky-600 text-sky-700'
                                            : 'border-transparent text-slate-400 hover:text-slate-700'
                                    }`}
                                >
                                    Ulasan Pembaca ({book.reviews?.length || 0})
                                </button>
                            </div>

                            <div className="py-6">
                                {activeTab === 'synopsis' && (
                                    <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                                        <p className="font-medium text-base text-slate-900">
                                            {book.synopsis}
                                        </p>
                                        {book.description && (
                                            <p className="whitespace-pre-line text-slate-600">
                                                {book.description}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'specs' && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                                        <div className="p-4 bg-white rounded-2xl border border-sky-100">
                                            <span className="text-slate-400 block mb-1">ISBN</span>
                                            <span className="font-bold text-slate-800 font-mono">{book.isbn}</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-sky-100">
                                            <span className="text-slate-400 block mb-1">Jumlah Halaman</span>
                                            <span className="font-bold text-slate-800">{book.page_count} Halaman</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-sky-100">
                                            <span className="text-slate-400 block mb-1">Bahasa</span>
                                            <span className="font-bold text-slate-800">{book.language}</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-sky-100">
                                            <span className="text-slate-400 block mb-1">Format Sampul</span>
                                            <span className="font-bold text-slate-800">{book.format}</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-sky-100">
                                            <span className="text-slate-400 block mb-1">Dimensi</span>
                                            <span className="font-bold text-slate-800">{book.dimensions}</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-sky-100">
                                            <span className="text-slate-400 block mb-1">Berat Buku</span>
                                            <span className="font-bold text-slate-800">{book.weight} gram</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-sky-100 col-span-2 sm:col-span-3">
                                            <span className="text-slate-400 block mb-1">Penerbit Resmi</span>
                                            <span className="font-bold text-slate-800">{book.publisher}</span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="space-y-4">
                                        {book.reviews && book.reviews.length > 0 ? (
                                            book.reviews.map((rev) => (
                                                <div key={rev.id} className="p-4 rounded-2xl bg-white border border-sky-100 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-xs text-slate-900">{rev.user_name}</span>
                                                            {rev.is_verified && (
                                                                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                                                    <CheckCircle2 className="w-3 h-3" /> Pembeli Terverifikasi
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-0.5 text-amber-400">
                                                            {[...Array(rev.rating)].map((_, i) => (
                                                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed">
                                                        "{rev.comment}"
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-slate-400 py-4 text-center">
                                                Belum ada ulasan untuk buku ini. Jadilah pembaca pertama yang memberikan ulasan!
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Books Section */}
                {relatedBooks.length > 0 && (
                    <div className="mt-20 pt-12 border-t border-sky-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                                    Rekomendasi Terkait
                                </span>
                                <h3 className="text-2xl font-serif font-bold text-[#0F2942] mt-1">
                                    Buku Lain yang Mungkin Anda Sukai
                                </h3>
                            </div>
                            <Link
                                href={route('books.index')}
                                className="text-xs font-bold text-sky-600 hover:underline"
                            >
                                Lihat Semua Buku
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedBooks.map((relBook) => (
                                <BookCard key={relBook.id} book={relBook} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Radix UI Reader Modal */}
            <SampleReaderModal
                book={book}
                isOpen={isReaderOpen}
                onClose={() => setIsReaderOpen(false)}
            />
        </PublicLayout>
    );
}
