import React from 'react';
import { useForm } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Contact() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <SEO 
                title="Hubungi Kami - Kantor Redaksi & Layanan Penulis Pustaka Aksara"
                description="Hubungi dewan redaksi, tim pemasaran, dan layanan royalti Pustaka Aksara. Tersedia layanan konsultasi naskah dan distribusi buku."
                keywords="kontak penerbit pustaka aksara, alamat penerbit buku jakarta, nomor telepon penerbit, email redaksi buku"
            />

            {/* Banner */}
            <div className="bg-[#241D18] text-white py-16 border-b border-stone-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Ruang Komunikasi Literasi
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
                        Hubungi Kantor Redaksi
                    </h1>
                    <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                        Punya pertanyaan seputar buku, pemesanan jumlah besar (bulk order), kerja sama lisensi, atau penerbitan? Tim kami siap berdiskusi dengan Anda.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                                Kantor Utama & Galeri Buku
                            </span>
                            <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                                Sanggar Pustaka Aksara
                            </h2>
                            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                                Anda dipersilakan berkunjung ke galeri buku dan ruang diskusi redaksi kami pada jam operasional kerja.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="text-xs">
                                    <h4 className="font-bold text-stone-900 text-sm">Kantor Pusat Redaksi</h4>
                                    <p className="text-stone-600 mt-1 leading-relaxed">
                                        Jl. Kaliurang Km. 8,5 No. 12, Ngaglik, Sleman, Daerah Istimewa Yogyakarta 55581
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="text-xs">
                                    <h4 className="font-bold text-stone-900 text-sm">Surel Korespondensi</h4>
                                    <p className="text-stone-600 mt-1">redaksi@pustaka-aksara.id (Naskah)</p>
                                    <p className="text-stone-600">kerjasama@pustaka-aksara.id (Distribusi)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div className="text-xs">
                                    <h4 className="font-bold text-stone-900 text-sm">Jam Layanan Redaksi</h4>
                                    <p className="text-stone-600 mt-1">Senin – Jumat: 08.30 – 17.00 WIB</p>
                                    <p className="text-stone-600">Sabtu – Minggu / Libur Nasional: Tutup</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Interactive Contact Form */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-lg">
                        <div className="border-b border-stone-100 pb-4 mb-6">
                            <h3 className="text-xl font-serif font-bold text-stone-900">
                                Kirim Pesan Langsung
                            </h3>
                            <p className="text-xs text-stone-500 mt-1">
                                Tim kami akan menjawab melalui surel dalam waktu 1x24 jam kerja.
                            </p>
                        </div>

                        {recentlySuccessful && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                <span>Pesan Anda berhasil dikirim! Tim redaksi akan segera membalas surel Anda.</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama Anda"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                    {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                                        Alamat Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@domain.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                    {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-stone-700 mb-1">
                                    Subjek Pesan *
                                </label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="Contoh: Pemesanan Buku untuk Perpustakaan Kampus"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                    required
                                />
                                {errors.subject && <p className="text-xs text-rose-600 mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-stone-700 mb-1">
                                    Isi Pesan *
                                </label>
                                <textarea
                                    rows={5}
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Tuliskan pesan atau pertanyaan Anda secara rinci..."
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                    required
                                />
                                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                <span>{processing ? 'Mengirim...' : 'Kirim Pesan ke Redaksi'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
