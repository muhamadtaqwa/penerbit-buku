import React from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { Award, BookOpen, Globe, AtSign, ChevronRight, Feather } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BookCard from '@/Components/BookCard';
import { Author } from '@/types';

interface AuthorShowProps {
    author: Author;
}

export default function AuthorShow({ author }: AuthorShowProps) {
    const authorSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': author.name,
        'image': author.avatar_url,
        'description': author.bio,
        'jobTitle': 'Author / Penulis',
        'worksFor': {
            '@type': 'Organization',
            'name': 'Pustaka Aksara'
        }
    };

    return (
        <PublicLayout>
            <SEO 
                title={`${author.name} - Profil & Daftar Buku Karya Penulis`}
                description={author.bio?.slice(0, 160) || `Profil lengkap dan buku-buku terbitan ${author.name} di Pustaka Aksara.`}
                keywords={`${author.name}, penulis buku, karya ${author.name}, novel ${author.name}, biografi penulis, pustaka aksara`}
                image={author.avatar_url}
                type="profile"
                schema={authorSchema}
            />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-sky-100 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-slate-500">
                        <Link href={route('home')} className="hover:text-sky-600 transition">Beranda</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href={route('authors.index')} className="hover:text-sky-600 transition">Penulis</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-slate-900 font-semibold">{author.name}</span>
                    </nav>
                </div>
            </div>

            {/* Author Profile Header */}
            <div className="bg-gradient-to-b from-[#0F2942] to-[#163657] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* Avatar */}
                        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0">
                            <img
                                src={author.avatar_url}
                                alt={author.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Bio info */}
                        <div className="space-y-4 text-center md:text-left flex-1">
                            <div>
                                {author.is_featured && (
                                    <span className="px-3 py-1 bg-sky-500/20 text-cyan-300 text-xs font-bold rounded-full uppercase tracking-wider inline-block mb-2">
                                        Penulis Utama Pustaka Aksara
                                    </span>
                                )}
                                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                                    {author.name}
                                </h1>
                                <p className="text-cyan-300 text-sm font-medium mt-1">
                                    {author.tagline}
                                </p>
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed max-w-3xl font-light">
                                {author.bio}
                            </p>

                            {author.awards && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-2xl text-xs text-cyan-200 border border-white/10 backdrop-blur-sm">
                                    <Award className="w-4 h-4 text-cyan-300" />
                                    <span>{author.awards}</span>
                                </div>
                            )}

                            {/* External Links */}
                            <div className="flex items-center gap-4 pt-2 justify-center md:justify-start text-xs text-slate-300">
                                {author.website && (
                                    <a
                                        href={author.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-cyan-300 flex items-center gap-1.5 transition"
                                    >
                                        <Globe className="w-3.5 h-3.5" />
                                        <span>Website Resmi</span>
                                    </a>
                                )}
                                {author.instagram && (
                                    <span className="flex items-center gap-1.5 text-slate-400">
                                        <AtSign className="w-3.5 h-3.5 text-cyan-300" />
                                        <span>{author.instagram}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Books by this Author */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                        Bibliografi Terbitan
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2942] mt-1">
                        Karya {author.name} Bersama Pustaka Aksara
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                        Buku-buku resmi ber-ISBN yang telah diterbitkan dan didistribusikan secara nasional.
                    </p>
                </div>

                {author.books && author.books.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {author.books.map((book) => (
                            <BookCard key={book.id} book={{ ...book, author }} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-sky-100">
                        <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">
                            Naskah terbaru dari {author.name} sedang dalam proses produksi percetakan.
                        </p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
