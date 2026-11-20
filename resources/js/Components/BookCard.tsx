import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Book } from '@/types';
import { formatRupiah } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import SampleReaderModal from '@/Components/SampleReaderModal';

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {
    const { addToCart } = useCart();
    const [isReaderOpen, setIsReaderOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(book, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const hasDiscount = book.discount_price && book.discount_price < book.price;
    const discountPercentage = hasDiscount
        ? Math.round(((book.price - (book.discount_price || 0)) / book.price) * 100)
        : 0;

    return (
        <>
            <div className="group relative flex flex-col bg-white rounded-3xl p-4 border border-sky-100/90 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 transition-all duration-300">
                {/* Book Cover Container */}
                <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-2xl bg-[#EDF4FC] flex items-center justify-center book-cover-3d mb-4">
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        className="h-full w-full object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500 book-spine-effect"
                        loading="lazy"
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-20">
                        {book.is_bestseller && (
                            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-sm">
                                Bestseller
                            </span>
                        )}
                        {book.is_new_release && (
                            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-600 text-white rounded-full shadow-sm">
                                Rilis Baru
                            </span>
                        )}
                        {hasDiscount && (
                            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-full shadow-sm">
                                Hemat {discountPercentage}%
                            </span>
                        )}
                    </div>

                    {/* Quick Preview Hover Button */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
                        <button
                            type="button"
                            onClick={() => setIsReaderOpen(true)}
                            className="p-3 bg-white/95 text-slate-800 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white rounded-full shadow-lg transform translate-y-3 group-hover:translate-y-0 transition duration-300 text-xs font-semibold flex items-center gap-1.5"
                            title="Baca Sampel Bab"
                        >
                            <Eye className="w-4 h-4" />
                            <span>Baca Sampel</span>
                        </button>
                    </div>
                </div>

                {/* Book Details */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        {/* Category & Format */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                            <span className="text-sky-600 font-semibold uppercase tracking-wide line-clamp-1">
                                {book.category?.name || 'Literatur'}
                            </span>
                            <span className="px-2 py-0.5 bg-[#EDF4FC] rounded text-slate-600 font-medium">
                                {book.format}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif font-bold text-[#0F2942] group-hover:text-sky-600 transition-colors line-clamp-2 text-base leading-snug">
                            <Link href={route('books.show', book.slug)}>
                                {book.title}
                            </Link>
                        </h3>

                        {/* Author */}
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                            oleh{' '}
                            {book.author ? (
                                <Link
                                    href={route('authors.show', book.author.slug)}
                                    className="hover:underline text-slate-700 font-medium"
                                >
                                    {book.author.name}
                                </Link>
                            ) : (
                                'Redaksi Aksara'
                            )}
                        </p>
                    </div>

                    {/* Rating & Pricing */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                        {/* Rating */}
                        <div className="flex items-center gap-1 text-xs text-amber-500 mb-2">
                            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                            <span className="font-bold text-slate-800">{book.rating_avg}</span>
                            <span className="text-slate-400 text-[11px]">({book.reviews_count} ulasan)</span>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                {hasDiscount ? (
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 line-through">
                                            {formatRupiah(book.price)}
                                        </span>
                                        <span className="text-base font-bold text-rose-600">
                                            {formatRupiah(book.discount_price!)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-base font-bold text-[#0F2942]">
                                        {formatRupiah(book.price)}
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className={`p-2.5 rounded-2xl transition duration-300 flex items-center justify-center ${
                                    isAdded
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md shadow-sky-500/25'
                                }`}
                                title="Tambah ke Keranjang"
                            >
                                {isAdded ? (
                                    <Check className="w-4 h-4 animate-in zoom-in" />
                                ) : (
                                    <ShoppingBag className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Radix UI Reader Modal */}
            <SampleReaderModal
                book={book}
                isOpen={isReaderOpen}
                onClose={() => setIsReaderOpen(false)}
            />
        </>
    );
}
