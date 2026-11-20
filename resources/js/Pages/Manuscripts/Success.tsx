import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Feather, ArrowRight, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Manuscript } from '@/types';

interface ManuscriptSuccessProps {
    manuscript: Manuscript;
}

export default function ManuscriptSuccess({ manuscript }: ManuscriptSuccessProps) {
    return (
        <PublicLayout>
            <Head title="Pengajuan Naskah Diterima - Pustaka Aksara Press" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-xl text-center">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                        Pengajuan Berhasil Diterima
                    </span>

                    <h1 className="text-3xl font-serif font-bold text-stone-900 mt-4">
                        Terima Kasih, {manuscript.author_name}!
                    </h1>

                    <p className="text-stone-600 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
                        Naskah Anda berjudul <span className="font-bold text-stone-900">"{manuscript.title}"</span> telah terdaftar dalam sistem antrean kurasi Dewan Redaksi Pustaka Aksara.
                    </p>

                    {/* Reference Card */}
                    <div className="my-8 p-6 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-3">
                        <div className="flex items-center justify-between text-xs border-b border-stone-200 pb-2">
                            <span className="text-stone-500">Nomor Registrasi Naskah:</span>
                            <span className="font-mono font-bold text-stone-900 text-sm">
                                REG-NSK-{String(manuscript.id).padStart(5, '0')}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-b border-stone-200 pb-2">
                            <span className="text-stone-500">Email Konfirmasi:</span>
                            <span className="font-semibold text-stone-900">{manuscript.author_email}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs border-b border-stone-200 pb-2">
                            <span className="text-stone-500">Kategori:</span>
                            <span className="font-semibold text-stone-900">{manuscript.category?.name || manuscript.genre}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-stone-500">Status Saat Ini:</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px] uppercase">
                                Dalam Antrean Kurasi (Pending)
                            </span>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="text-left space-y-4 mb-8">
                        <h3 className="font-serif font-bold text-base text-stone-900">
                            Apa Langkah Selanjutnya?
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
                            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                                <span className="font-bold text-amber-900 block mb-1">1. Seleksi Administratif</span>
                                <p>Pemeriksaan kelengkapan sinopsis dan format naskah dalam 1-3 hari kerja.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                                <span className="font-bold text-amber-900 block mb-1">2. Penilaian Dewan Kurator</span>
                                <p>Evaluasi kekuatan narasi, gaya bahasa, dan potensi pasar literatur.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/50">
                                <span className="font-bold text-amber-900 block mb-1">3. Surat Keputusan Resmi</span>
                                <p>Pemberitahuan tertulis dikirimkan langsung ke email Anda beserta draf kontrak kerja sama.</p>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={route('home')}
                            className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-amber-800 text-xs font-semibold transition"
                        >
                            Kembali ke Beranda
                        </Link>
                        <Link
                            href={route('books.index')}
                            className="w-full sm:w-auto px-6 py-3 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition"
                        >
                            Jelajahi Buku Lain
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
