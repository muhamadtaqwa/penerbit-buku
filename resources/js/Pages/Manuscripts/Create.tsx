import React from 'react';
import { useForm } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { 
    Feather, 
    BookCheck, 
    Clock, 
    ShieldCheck, 
    AlertCircle, 
    CheckCircle2, 
    Sparkles, 
    Send,
    HelpCircle
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Category } from '@/types';

interface ManuscriptCreateProps {
    categories: Category[];
}

export default function ManuscriptCreate({ categories }: ManuscriptCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        author_name: '',
        author_email: '',
        author_phone: '',
        title: '',
        category_id: categories[0]?.id ? String(categories[0].id) : '',
        genre: '',
        target_audience: '',
        synopsis: '',
        sample_chapter: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('manuscripts.store'));
    };

    return (
        <PublicLayout>
            <SEO 
                title="Kirim Naskah ke Dewan Redaksi - Pustaka Aksara Press"
                description="Kirimkan draf novel, naskah sastra, karya ilmiah populer, atau buku pengembangan diri Anda kepada dewan kurasi Pustaka Aksara. Dapatkan nomor pelacakan registrasi naskah instan."
                keywords="kirim naskah novel, penerbitan buku gratis, cara submit naskah buku, penerbit buku mayor, pustaka aksara"
            />

            {/* Header */}
            <div className="bg-[#0F2942] text-white py-14 border-b border-sky-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                        Pintu Gerbang Menjadi Penulis Buku
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
                        Portal Kirim Naskah Digital
                    </h1>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                        Kami mengundang para penulis di seluruh Indonesia untuk mengajukan draf karya fiksi maupun non-fiksi bermutu. Seluruh naskah yang masuk dievaluasi secara adil oleh Dewan Redaksi Pustaka Aksara.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Guidelines Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-5 rounded-3xl bg-white border border-sky-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-[#EDF4FC] text-sky-600 flex-shrink-0">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-slate-900">Waktu Kurasi 14 Hari</h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Tim kurasi kami memberikan keputusan awal dalam 14 hari kerja sejak naskah diajukan.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-sky-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-[#EDF4FC] text-sky-600 flex-shrink-0">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-slate-900">Hak Cipta 100% Milik Anda</h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Keaslian ide dilindungi hukum hak cipta. Redaksi kami terikat kode etik kerahasiaan naskah.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-sky-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 rounded-2xl bg-[#EDF4FC] text-sky-600 flex-shrink-0">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-slate-900">Dukungan Promosi Penuh</h3>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Naskah terpilih mendapatkan tata letak profesional, desain sampul eksklusif, dan peluncuran media.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Submission Form */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sky-100 shadow-xl">
                    <div className="border-b border-slate-100 pb-6 mb-8">
                        <h2 className="text-2xl font-serif font-bold text-[#0F2942]">
                            Formulir Pengajuan Naskah
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Lengkapi data diri dan gambaran naskah Anda sebaik mungkin agar memudahkan dewan kurator kami memahami potensi karya Anda.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Profil Penulis */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#EDF4FC] text-sky-700 text-xs flex items-center justify-center font-bold">1</span>
                                Informasi Penulis
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Nama Lengkap / Nama Pena *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.author_name}
                                        onChange={(e) => setData('author_name', e.target.value)}
                                        placeholder="Contoh: Raden Ayu Wardhani"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                                        required
                                    />
                                    {errors.author_name && <p className="text-xs text-rose-600 mt-1">{errors.author_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Alamat Email Aktif *
                                    </label>
                                    <input
                                        type="email"
                                        value={data.author_email}
                                        onChange={(e) => setData('author_email', e.target.value)}
                                        placeholder="email@anda.com"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                                        required
                                    />
                                    {errors.author_email && <p className="text-xs text-rose-600 mt-1">{errors.author_email}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Nomor WhatsApp / Kontak *
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.author_phone}
                                        onChange={(e) => setData('author_phone', e.target.value)}
                                        placeholder="08123456789"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                                        required
                                    />
                                    {errors.author_phone && <p className="text-xs text-rose-600 mt-1">{errors.author_phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Info Naskah */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#EDF4FC] text-sky-700 text-xs flex items-center justify-center font-bold">2</span>
                                Karakteristik Naskah
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Judul Naskah Buku *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Arsitektur Jiwa di Tengah Badai"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                    {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Kategori Pustaka *
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500"
                                        required
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Genre Spesifik *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.genre}
                                        onChange={(e) => setData('genre', e.target.value)}
                                        placeholder="Contoh: Roman Psikologis, Esai Filosofis"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                    {errors.genre && <p className="text-xs text-rose-600 mt-1">{errors.genre}</p>}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Target Pembaca & Daya Tarik Buku *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.target_audience}
                                        onChange={(e) => setData('target_audience', e.target.value)}
                                        placeholder="Contoh: Dewasa muda usia 20-35 tahun, profesional urban, penikmat fiksi historis"
                                        className="w-full px-4 py-2.5 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                    {errors.target_audience && <p className="text-xs text-rose-600 mt-1">{errors.target_audience}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Sinopsis & Bab Pembuka */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-700 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-[#EDF4FC] text-sky-700 text-xs flex items-center justify-center font-bold">3</span>
                                Sinopsis & Bab Sampel Pembuka
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Sinopsis Lengkap (Jelaskan premis utama, konflik, dan resolusi akhir) *
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.synopsis}
                                        onChange={(e) => setData('synopsis', e.target.value)}
                                        placeholder="Tuliskan ringkasan alur cerita atau tesis utama naskah Anda secara terstruktur..."
                                        className="w-full px-4 py-3 rounded-2xl bg-[#EDF4FC] border-transparent text-sm focus:bg-white focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                    {errors.synopsis && <p className="text-xs text-rose-600 mt-1">{errors.synopsis}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Teks Bab Sampel (Bab 1 & Bab 2) *
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={data.sample_chapter}
                                        onChange={(e) => setData('sample_chapter', e.target.value)}
                                        placeholder="Salin dan tempelkan teks bab pembuka naskah Anda di sini..."
                                        className="w-full px-4 py-3 rounded-2xl bg-[#EDF4FC] border-transparent text-sm font-serif leading-relaxed focus:bg-white focus:ring-1 focus:ring-sky-500"
                                        required
                                    />
                                    {errors.sample_chapter && <p className="text-xs text-rose-600 mt-1">{errors.sample_chapter}</p>}
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        Minimal 100 karakter. Dewan redaksi akan membaca gaya penulisan Anda dari bagian ini.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Agreement & Submit button */}
                        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-xs text-slate-500 text-center sm:text-left">
                                Dengan mengirimkan naskah ini, Anda menyatakan bahwa karya ini adalah orisinal karya Anda dan belum pernah diterbitkan penerbit lain.
                            </p>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-xl shadow-sky-500/25 transition flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                <span>{processing ? 'Mengirimkan Naskah...' : 'Ajukan Naskah ke Redaksi'}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}
