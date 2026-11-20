import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import * as Accordion from '@radix-ui/react-accordion';
import { 
    Feather, 
    Check, 
    BookOpen, 
    Award, 
    Sparkles, 
    Calculator, 
    ChevronDown, 
    ArrowRight, 
    ShieldCheck, 
    Printer, 
    Globe, 
    Layers 
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { formatRupiah } from '@/lib/utils';

export default function Services() {
    const [bookPrice, setBookPrice] = useState(115000);
    const [copiesSold, setCopiesSold] = useState(3000);
    const [royaltyRate, setRoyaltyRate] = useState(12);

    const calculatedRoyalty = (bookPrice * copiesSold * royaltyRate) / 100;

    const faqs = [
        {
            q: 'Apa perbedaan antara Jalur Mayor dan Jalur Penerbitan Mandiri?',
            a: 'Jalur Mayor melalui seleksi ketat dewan redaksi di mana seluruh biaya produksi, cetak, dan distribusi ditanggung sepenuhnya oleh Pustaka Aksara dengan sistem royalti 10-15%. Sedangkan Jalur Mandiri ditujukan bagi penulis yang ingin menerbitkan buku dengan kendali penuh atas hak cipta dan jumlah cetakan dengan pendampingan profesional dari tim editor kami.'
        },
        {
            q: 'Apakah buku yang diterbitkan pasti mendapatkan ISBN resmi?',
            a: 'Ya, seluruh buku yang diterbitkan oleh Pustaka Aksara terdaftar resmi di Perpustakaan Nasional Republik Indonesia (Perpusnas) lengkap dengan Barcode ISBN dan hak cipta terdaftar.'
        },
        {
            q: 'Berapa lama proses dari naskah disetujui hingga buku terbit di toko buku?',
            a: 'Untuk Jalur Mayor biasanya memakan waktu antara 2 hingga 4 bulan, mencakup proses copyediting, proofreading, tata letak interior, desain sampul, pengurusan ISBN, pencetakan massal, dan distribusi ke jaringan toko buku nasional.'
        },
        {
            q: 'Bagaimana sistem pembayaran dan pelaporan royalti penulis?',
            a: 'Laporan penjualan buku diterbitkan secara berkala setiap 6 bulan (dua kali setahun) secara transparan melalui portal dashboard penulis, dan royalti ditransfer langsung ke rekening bank Anda.'
        }
    ];

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(item => ({
            '@type': 'Question',
            'name': item.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.a
            }
        }))
    };

    return (
        <PublicLayout>
            <SEO 
                title="Layanan Penerbitan Buku & Kalkulator Royalti Penulis"
                description="Pelajari skema penerbitan mayor dan self-publishing di Pustaka Aksara. Hitung simulasi royalti penulis secara transparan dengan kalkulator royalti interaktif kami."
                keywords="layanan penerbitan buku, cara terbitkan buku, royalti penulis, penerbit mayor, self publishing indonesia, isbn perpusnas"
                schema={faqSchema}
            />

            {/* Banner */}
            <div className="bg-[#0F2942] text-white py-16 border-b border-sky-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                        Dedikasi untuk Dunia Literasi
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
                        Skema & Layanan Penerbitan
                    </h1>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                        Kami menyediakan ekosistem terpadu untuk menerbitkan buku dengan standar kualitas tertinggi, dari penyuntingan bahasa yang cermat hingga distribusi nasional.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                {/* 2 Main Publishing Pathways */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                            Pilihan Jalur Terbit
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-[#0F2942] mt-1">
                            Dua Skema Penerbitan Buku
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Jalur Mayor */}
                        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-sky-500 shadow-xl shadow-sky-500/10 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                                Pilihan Utama
                            </div>
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-[#EDF4FC] text-sky-600 flex items-center justify-center mb-6">
                                    <Award className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif font-bold text-2xl text-[#0F2942]">
                                    Penerbitan Jalur Mayor (Seleksi Redaksi)
                                </h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Naskah dikurasi secara ketat oleh dewan editor. Seluruh biaya produksi, pencetakan, dan pemasaran ditanggung sepenuhnya oleh Pustaka Aksara.
                                </p>

                                <div className="mt-6 space-y-3 text-xs text-slate-700">
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>Bebas Biaya:</strong> Penulis tidak dipungut biaya sepeser pun</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>Royalti Kompetitif:</strong> 10% hingga 15% dari harga jual buku</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>Distribusi Nasional:</strong> Masuk ke 95+ toko buku fisik dan marketplace</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>Promosi Media:</strong> Bedah buku, siaran pers, dan wawancara sastra</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-slate-100">
                                <Link
                                    href={route('manuscripts.create')}
                                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition"
                                >
                                    <Feather className="w-4 h-4" />
                                    <span>Ajukan Naskah ke Dewan Redaksi</span>
                                </Link>
                            </div>
                        </div>

                        {/* Jalur Mandiri Premium */}
                        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sky-100 shadow-md flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mb-6">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif font-bold text-2xl text-[#0F2942]">
                                    Penerbitan Kolaboratif & Mandiri
                                </h3>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Dirancang khusus untuk dosen, peneliti, instansi korporasi, atau penulis independen yang ingin menerbitkan buku dengan kendali jumlah oplah dan hak cipta eksklusif.
                                </p>

                                <div className="mt-6 space-y-3 text-xs text-slate-700">
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>ISBN Resmi & Barcode:</strong> Legalitas terdaftar di Perpusnas</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>Jasa Penyuntingan Ahli:</strong> Proofreading, tata letak interior, dan desain sampul</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>Fleksibilitas Cetak:</strong> Mulai dari 50 eksemplar hingga ribuan cetakan</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                        <span><strong>Keuntungan 100%:</strong> Seluruh laba penjualan menjadi milik penulis</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 mt-8 border-t border-slate-100">
                                <Link
                                    href={route('contact')}
                                    className="w-full py-3.5 px-6 rounded-2xl bg-[#0F2942] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                                >
                                    <span>Konsultasikan Paket Mandiri</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Royalty Calculator */}
                <div className="bg-[#EDF4FC] rounded-3xl p-8 sm:p-12 border border-sky-200 shadow-md">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white">
                                <Calculator className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-sky-700">
                                Alat Simulasi Penulis
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2942]">
                            Kalkulator Estimasi Royalti Buku
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Hitung potensi pendapatan royalti yang Anda peroleh berdasarkan proyeksi harga buku dan jumlah eksemplar yang terjual.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2">
                                    Harga Jual Buku (Rp)
                                </label>
                                <input
                                    type="number"
                                    step="5000"
                                    value={bookPrice}
                                    onChange={(e) => setBookPrice(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-sky-200 text-sm font-semibold focus:ring-1 focus:ring-sky-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2">
                                    Target Terjual (Eksemplar)
                                </label>
                                <input
                                    type="number"
                                    step="500"
                                    value={copiesSold}
                                    onChange={(e) => setCopiesSold(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-sky-200 text-sm font-semibold focus:ring-1 focus:ring-sky-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2">
                                    Persentase Royalti (%)
                                </label>
                                <select
                                    value={royaltyRate}
                                    onChange={(e) => setRoyaltyRate(Number(e.target.value))}
                                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-sky-200 text-sm font-semibold focus:ring-1 focus:ring-sky-500"
                                >
                                    <option value={10}>10% (Standar Non-Fiksi)</option>
                                    <option value={12}>12% (Koleksi Sastra Utama)</option>
                                    <option value={15}>15% (Edisi Khusus / Bestseller)</option>
                                </select>
                            </div>
                        </div>

                        {/* Calculated Result Box */}
                        <div className="mt-8 p-6 rounded-3xl bg-white border border-sky-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <span className="text-xs text-slate-400 block">Estimasi Total Royalti Bersih Anda:</span>
                                <span className="text-3xl font-serif font-bold text-sky-700 mt-1 block">
                                    {formatRupiah(calculatedRoyalty)}
                                </span>
                            </div>
                            <Link
                                href={route('manuscripts.create')}
                                className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-500/25 transition"
                            >
                                <Feather className="w-4 h-4" />
                                <span>Mulai Terbitkan Naskah</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Radix UI Accordion: FAQ */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                            Pertanyaan Umum
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F2942] mt-1">
                            Hal yang Kerap Ditanyakan
                        </h2>
                    </div>

                    <Accordion.Root type="single" collapsible className="space-y-4">
                        {faqs.map((f, idx) => (
                            <Accordion.Item
                                key={idx}
                                value={`item-${idx}`}
                                className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-sm transition"
                            >
                                <Accordion.Header>
                                    <Accordion.Trigger className="w-full p-5 text-left text-sm font-serif font-bold text-[#0F2942] flex items-center justify-between hover:text-sky-600 transition">
                                        <span>{f.q}</span>
                                        <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-50">
                                    {f.a}
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </div>
            </div>
        </PublicLayout>
    );
}
