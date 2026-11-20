import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { 
    Search, 
    Filter, 
    SlidersHorizontal, 
    X, 
    ChevronLeft, 
    ChevronRight,
    BookOpen,
    ArrowUpDown
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BookCard from '@/Components/BookCard';
import { Book, Category } from '@/types';

interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedBooks {
    data: Book[];
    current_page: number;
    last_page: number;
    total: number;
    links: PaginationLinks[];
}

interface BooksIndexProps {
    books: PaginatedBooks;
    categories: Category[];
    filters?: {
        search?: string;
        category?: string;
        format?: string;
        sort?: string;
    };
}

export default function BooksIndex({ books, categories, filters }: BooksIndexProps) {
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || '');
    const [selectedFormat, setSelectedFormat] = useState(filters?.format || '');
    const [selectedSort, setSelectedSort] = useState(filters?.sort || 'latest');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const applyFilters = (overrides = {}) => {
        const queryParams = {
            search: search.trim() || undefined,
            category: selectedCategory || undefined,
            format: selectedFormat || undefined,
            sort: selectedSort !== 'latest' ? selectedSort : undefined,
            ...overrides,
        };

        router.get(route('books.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const handleCategoryClick = (slug: string) => {
        const newCat = selectedCategory === slug ? '' : slug;
        setSelectedCategory(newCat);
        applyFilters({ category: newCat || undefined });
    };

    const handleFormatClick = (fmt: string) => {
        const newFmt = selectedFormat === fmt ? '' : fmt;
        setSelectedFormat(newFmt);
        applyFilters({ format: newFmt || undefined });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSelectedSort(newSort);
        applyFilters({ sort: newSort });
    };

    const clearAllFilters = () => {
        setSearch('');
        setSelectedCategory('');
        setSelectedFormat('');
        setSelectedSort('latest');
        router.get(route('books.index'));
    };

    const hasActiveFilters = Boolean(search || selectedCategory || selectedFormat || selectedSort !== 'latest');

    return (
        <PublicLayout>
            <SEO 
                title="Katalog Buku - Koleksi Sastra, Filosofi & Pengembangan Diri"
                description="Jelajahi seluruh katalog buku terbitan Pustaka Aksara. Tersedia format paperback hardcover dan ebook dengan kurasi terbaik sastra Indonesia dan dunia."
                keywords="katalog buku, novel sastra, buku fiksi, buku filosofi, beli buku online, daftar buku indonesia, pustaka aksara"
            />

            {/* Header Banner (Deep Navy #0F2942 with Cyan Highlights) */}
            <div className="bg-[#0F2942] text-white py-12 border-b border-sky-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                        Koleksi Literatur & Arsip Pustaka
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-1">
                        Katalog Buku Terbitan
                    </h1>
                    <p className="text-slate-300 text-sm mt-2 max-w-xl">
                        Jelajahi karya sastra, buku refleksi, geopolitik, sains teknologi, dan karya pemikiran terbaik dari para penulis Nusantara.
                    </p>
                </div>
            </div>

            {/* Catalog Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-3xl p-6 border border-sky-100 shadow-sm sticky top-28 space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2 font-serif font-bold text-[#0F2942]">
                                <Filter className="w-4 h-4 text-sky-600" />
                                <span>Filter Katalog</span>
                            </div>
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-xs text-rose-600 hover:underline font-medium"
                                >
                                    Reset Semua
                                </button>
                            )}
                        </div>

                        {/* Search in sidebar */}
                        <div>
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                                Kata Kunci
                            </label>
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Judul, penulis, ISBN..."
                                    className="w-full pl-9 pr-3 py-2 bg-[#EDF4FC] border-transparent rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-sky-500 focus:bg-white"
                                />
                                <Search className="w-3.5 h-3.5 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </form>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                                Kategori / Genre
                            </label>
                            <div className="space-y-1">
                                <button
                                    onClick={() => handleCategoryClick('')}
                                    className={`w-full text-left px-3 py-2 rounded-2xl text-xs font-medium flex items-center justify-between transition ${
                                        selectedCategory === ''
                                            ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-md shadow-sky-500/20'
                                            : 'text-slate-600 hover:bg-[#EDF4FC]'
                                    }`}
                                >
                                    <span>Semua Kategori</span>
                                    <span className="text-[10px] opacity-75">Semua</span>
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat.slug)}
                                        className={`w-full text-left px-3 py-2 rounded-2xl text-xs font-medium flex items-center justify-between transition ${
                                            selectedCategory === cat.slug
                                                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-md shadow-sky-500/20'
                                                : 'text-slate-600 hover:bg-[#EDF4FC]'
                                        }`}
                                    >
                                        <span className="line-clamp-1">{cat.name}</span>
                                        <span className="text-[10px] opacity-70">({cat.books_count || 0})</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Format Filter */}
                        <div>
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                                Format Buku
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Paperback', 'Hardcover'].map((fmt) => (
                                    <button
                                        key={fmt}
                                        onClick={() => handleFormatClick(fmt)}
                                        className={`px-3 py-2 rounded-2xl text-xs font-medium text-center transition ${
                                            selectedFormat === fmt
                                                ? 'bg-[#0F2942] text-white shadow-sm'
                                                : 'bg-[#EDF4FC] text-slate-700 hover:bg-sky-100'
                                        }`}
                                    >
                                        {fmt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Book Listing Area */}
                    <div className="flex-1 w-full">
                        {/* Control Bar: Sorting & Results Count */}
                        <div className="bg-white rounded-3xl p-4 border border-sky-100 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-xs text-slate-500 font-medium">
                                Menampilkan <span className="font-bold text-slate-900">{books.total}</span> judul buku
                                {selectedCategory && (
                                    <span> dalam kategori <span className="text-sky-600 font-semibold">{categories.find(c => c.slug === selectedCategory)?.name}</span></span>
                                )}
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                                {/* Mobile filter trigger button */}
                                <button
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="lg:hidden px-3 py-2 rounded-2xl border border-sky-200 bg-[#EDF4FC] text-xs font-semibold flex items-center gap-1.5"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
                                    <span>Filter</span>
                                </button>

                                {/* Sort dropdown */}
                                <div className="flex items-center gap-2">
                                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                                    <select
                                        value={selectedSort}
                                        onChange={handleSortChange}
                                        className="text-xs bg-[#EDF4FC] border-transparent rounded-2xl py-2 pl-3 pr-8 focus:ring-1 focus:ring-sky-500 focus:bg-white"
                                    >
                                        <option value="latest">Terbaru Ditambahkan</option>
                                        <option value="bestseller">Paling Laris (Bestseller)</option>
                                        <option value="rating">Rating Tertinggi</option>
                                        <option value="price_low">Harga: Rendah ke Tinggi</option>
                                        <option value="price_high">Harga: Tinggi ke Rendah</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Active Filter Tags */}
                        {hasActiveFilters && (
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="text-xs text-slate-400">Filter Aktif:</span>
                                {search && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs border border-sky-200">
                                        Pencarian: "{search}"
                                        <button onClick={() => { setSearch(''); applyFilters({ search: undefined }); }}>
                                            <X className="w-3 h-3 hover:text-sky-600" />
                                        </button>
                                    </span>
                                )}
                                {selectedCategory && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs border border-sky-200">
                                        {categories.find(c => c.slug === selectedCategory)?.name}
                                        <button onClick={() => handleCategoryClick(selectedCategory)}>
                                            <X className="w-3 h-3 hover:text-sky-600" />
                                        </button>
                                    </span>
                                )}
                                {selectedFormat && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 text-sky-800 rounded-full text-xs border border-sky-200">
                                        Format: {selectedFormat}
                                        <button onClick={() => handleFormatClick(selectedFormat)}>
                                            <X className="w-3 h-3 hover:text-sky-600" />
                                        </button>
                                    </span>
                                )}
                                <button
                                    onClick={clearAllFilters}
                                    className="text-xs text-rose-600 hover:underline font-semibold ml-2"
                                >
                                    Bersihkan Semua
                                </button>
                            </div>
                        )}

                        {/* Books Grid */}
                        {books.data.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {books.data.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-sky-100 max-w-lg mx-auto my-8 shadow-sm">
                                <div className="w-16 h-16 rounded-3xl bg-[#EDF4FC] text-sky-600 flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-slate-900">
                                    Tidak Ada Buku Ditemukan
                                </h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Kami tidak menemukan buku yang cocok dengan kriteria pencarian atau filter yang Anda terapkan.
                                </p>
                                <button
                                    onClick={clearAllFilters}
                                    className="mt-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-semibold shadow-md transition"
                                >
                                    Lihat Semua Buku
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {books.last_page > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2">
                                {books.links.map((link, idx) => {
                                    if (link.label.includes('Previous')) {
                                        return link.url ? (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                className="p-2.5 rounded-2xl border border-sky-100 bg-white hover:bg-[#EDF4FC] text-slate-700 transition"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </Link>
                                        ) : null;
                                    }
                                    if (link.label.includes('Next')) {
                                        return link.url ? (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                className="p-2.5 rounded-2xl border border-sky-100 bg-white hover:bg-[#EDF4FC] text-slate-700 transition"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        ) : null;
                                    }
                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            className={`w-10 h-10 rounded-2xl text-xs font-bold flex items-center justify-center transition ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                                                    : 'bg-white border border-sky-100 text-slate-700 hover:bg-[#EDF4FC]'
                                            }`}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filters Drawer */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
                    <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <h3 className="font-serif font-bold text-slate-900">Filter Katalog</h3>
                                <button onClick={() => setIsMobileFilterOpen(false)}>
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            {/* Categories */}
                            <div>
                                <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Kategori</h4>
                                <div className="space-y-1">
                                    {categories.map((c) => (
                                        <button
                                            key={c.id}
                                            onClick={() => {
                                                handleCategoryClick(c.slug);
                                                setIsMobileFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${
                                                selectedCategory === c.slug ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-600'
                                            }`}
                                        >
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                            <button
                                onClick={clearAllFilters}
                                className="w-full py-2.5 rounded-2xl bg-[#EDF4FC] text-xs font-semibold text-slate-700"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
