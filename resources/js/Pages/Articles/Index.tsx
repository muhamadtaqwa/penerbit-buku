import React from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { BookOpen, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Article } from '@/types';
import { formatDateIndo } from '@/lib/utils';

interface ArticlesIndexProps {
    articles: {
        data: Article[];
        current_page: number;
        last_page: number;
        total: number;
    };
    categories: string[];
    selectedCategory: string;
}

export default function ArticlesIndex({ articles, categories, selectedCategory }: ArticlesIndexProps) {
    return (
        <PublicLayout>
            <SEO 
                title="Warta & Esai Literasi - Berita Perbukuan & Wawasan Menulis"
                description="Kumpulan artikel, esai sastra, wawancara kurator dan penulis, serta tips kepenulisan kreatif dari dewan redaksi Pustaka Aksara."
                keywords="esai sastra, berita perbukuan, tips menulis novel, bedah buku, jurnal literasi indonesia, pustaka aksara"
            />

            {/* Banner */}
            <div className="bg-[#241D18] text-white py-14 border-b border-stone-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Catatan & Diskursus Redaksi
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
                        Warta & Esai Literasi
                    </h1>
                    <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                        Membahas geliat industri perbukuan, ulasan karya sastra, wawancara bersama para penulis, dan panduan kreatif kepenulisan.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    <Link
                        href={route('articles.index')}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                            !selectedCategory
                                ? 'bg-amber-800 text-white shadow-sm'
                                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                        }`}
                    >
                        Semua Topik
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            href={route('articles.index', { category: cat })}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                                selectedCategory === cat
                                ? 'bg-amber-800 text-white shadow-sm'
                                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                            }`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.data.map((art) => (
                        <article
                            key={art.id}
                            className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                {art.cover_image && (
                                    <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
                                        <img
                                            src={art.cover_image}
                                            alt={art.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold mb-2">
                                        <span>{art.category}</span>
                                        <span>•</span>
                                        <span className="text-stone-400 font-normal">{art.read_time}</span>
                                    </div>
                                    <h2 className="font-serif font-bold text-xl text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2">
                                        <Link href={route('articles.show', art.slug)}>
                                            {art.title}
                                        </Link>
                                    </h2>
                                    <p className="text-xs text-stone-600 mt-2.5 line-clamp-3 leading-relaxed">
                                        {art.excerpt}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 mt-4">
                                <span>{art.author_name}</span>
                                <Link
                                    href={route('articles.show', art.slug)}
                                    className="text-amber-800 font-bold hover:underline flex items-center gap-1"
                                >
                                    <span>Baca Lengkap</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
