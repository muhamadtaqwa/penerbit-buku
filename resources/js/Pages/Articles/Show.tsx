import React from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { ChevronRight, Clock, Calendar, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Article } from '@/types';
import { formatDateIndo } from '@/lib/utils';

interface ArticleShowProps {
    article: Article;
    relatedArticles: Article[];
}

export default function ArticleShow({ article, relatedArticles }: ArticleShowProps) {
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.title,
        'image': article.cover_image,
        'author': {
            '@type': 'Person',
            'name': article.author_name
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Pustaka Aksara'
        },
        'datePublished': article.created_at,
        'description': article.excerpt
    };

    return (
        <PublicLayout>
            <SEO 
                title={`${article.title}`}
                description={article.excerpt}
                keywords={`artikel literasi, wawasan penulis, ${article.category}, ${article.title}, pustaka aksara`}
                image={article.cover_image}
                type="article"
                author={article.author_name}
                publishedTime={article.created_at}
                schema={articleSchema}
            />

            {/* Breadcrumb */}
            <div className="bg-white border-b border-stone-200 py-3.5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs text-stone-500">
                        <Link href={route('home')} className="hover:text-amber-800 transition">Beranda</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link href={route('articles.index')} className="hover:text-amber-800 transition">Artikel</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-stone-900 font-semibold line-clamp-1">{article.title}</span>
                    </nav>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Meta Header */}
                <div className="space-y-4 mb-8">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                        {article.category}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2 border-b border-stone-200 pb-4">
                        <span className="font-semibold text-stone-800">{article.author_name}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.read_time} waktu baca</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDateIndo(article.created_at)}</span>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                {article.cover_image && (
                    <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden mb-10 shadow-lg">
                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Excerpt Lead */}
                <div className="p-6 bg-amber-50/60 rounded-2xl border-l-4 border-amber-700 text-stone-800 text-base font-serif italic mb-8 leading-relaxed">
                    "{article.excerpt}"
                </div>

                {/* Body Content */}
                <div className="prose prose-stone max-w-none text-stone-800 font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-6">
                    {article.content}
                </div>

                {/* Back Link */}
                <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between">
                    <Link
                        href={route('articles.index')}
                        className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Indeks Artikel</span>
                    </Link>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-stone-200">
                        <h3 className="font-serif font-bold text-xl text-stone-900 mb-6">
                            Artikel Menarik Lainnya
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={route('articles.show', rel.slug)}
                                    className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                                            {rel.category}
                                        </span>
                                        <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-2">
                                            {rel.title}
                                        </h4>
                                    </div>
                                    <span className="text-[11px] text-stone-400 mt-4 block">
                                        {rel.read_time}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </PublicLayout>
    );
}
