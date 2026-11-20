import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { Award, BookOpen, Search, ArrowRight, Globe, AtSign } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Author } from '@/types';

interface AuthorsIndexProps {
    authors: Author[];
}

export default function AuthorsIndex({ authors }: AuthorsIndexProps) {
    const [search, setSearch] = useState('');

    const filteredAuthors = authors.filter(a => 
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        (a.tagline && a.tagline.toLowerCase().includes(search.toLowerCase())) ||
        (a.bio && a.bio.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <PublicLayout>
            <SEO 
                title="Direktori Penulis - Profil Tokoh & Sastrawan Mitra Pustaka Aksara"
                description="Temukan dan kenali para sastrawan, pemikir, cendekiawan, dan penulis berbakat Indonesia yang menerbitkan karya masterpiece-nya di Pustaka Aksara."
                keywords="penulis buku indonesia, pengarang novel, sastrawan nusantara, direktori penulis, pustaka aksara"
            />

            {/* Banner */}
            <div className="bg-[#0F2942] text-white py-14 border-b border-sky-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                        Pena Emas Nusantara
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
                        Direktori Penulis & Pemikir
                    </h1>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                        Mengenal lebih dekat para sastrawan, akademisi, dan pemikir yang mempercayakan naskah berharga mereka kepada Pustaka Aksara.
                    </p>

                    {/* Search bar */}
                    <div className="mt-8 max-w-md mx-auto relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama penulis atau bidang keilmuan..."
                            className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-300 text-sm focus:bg-white focus:text-slate-900 focus:outline-none transition shadow-lg"
                        />
                        <Search className="w-4 h-4 text-cyan-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* Authors Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAuthors.map((author) => (
                        <div
                            key={author.id}
                            className="bg-white rounded-3xl p-7 border border-sky-100 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-sky-400 p-0.5">
                                        <img
                                            src={author.avatar_url}
                                            alt={author.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                    <div>
                                        {author.is_featured && (
                                            <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                                                Penulis Utama
                                            </span>
                                        )}
                                        <h2 className="font-serif font-bold text-xl text-[#0F2942] hover:text-sky-600 transition">
                                            <Link href={route('authors.show', author.slug)}>
                                                {author.name}
                                            </Link>
                                        </h2>
                                        <p className="text-xs text-sky-600 font-medium line-clamp-1 mt-0.5">
                                            {author.tagline}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                                    {author.bio}
                                </p>

                                {author.awards && (
                                    <div className="p-3 bg-[#EDF4FC] rounded-2xl border border-sky-100 mb-5 flex items-start gap-2 text-[11px] text-slate-700">
                                        <Award className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                                        <span className="line-clamp-2">{author.awards}</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-400">
                                    {author.books_count || 0} Karya Terbit
                                </span>
                                <Link
                                    href={route('authors.show', author.slug)}
                                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition"
                                >
                                    <span>Lihat Profil & Karya</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
