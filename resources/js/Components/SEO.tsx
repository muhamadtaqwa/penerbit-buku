import React from 'react';
import { Head } from '@inertiajs/react';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'book' | 'article' | 'profile';
    author?: string;
    publishedTime?: string;
    schema?: Record<string, any> | Record<string, any>[];
}

export default function SEO({
    title,
    description = 'Pustaka Aksara adalah penerbit buku independen yang kuratif, berdedikasi menerbitkan karya sastra, filosofi, sains, dan pemikiran nusantara berkualitas tinggi.',
    keywords = 'penerbit buku, beli buku online, sastra indonesia, novel terbaik, kirim naskah, terbitkan buku, royalti penulis, pustaka aksara',
    image = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200',
    url,
    type = 'website',
    author,
    publishedTime,
    schema,
}: SEOProps) {
    const siteTitle = title.includes('Pustaka Aksara') ? title : `${title} | Pustaka Aksara`;
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <Head title={siteTitle}>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:site_name" content="Pustaka Aksara" />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
            {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
            {author ? <meta property="article:author" content={author} /> : null}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data for Google Rich Snippets */}
            {schema ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ) : null}
        </Head>
    );
}
