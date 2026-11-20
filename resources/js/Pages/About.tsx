import React from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { BookOpen, Award, ShieldCheck, Heart, Users, Sparkles, Feather, ArrowRight } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

interface AboutProps {
    stats: {
        books_published: string;
        authors_partnered: string;
        cities_reached: string;
        years_experience: string;
    };
}

export default function About({ stats }: AboutProps) {
    const values = [
        {
            title: 'Integritas Kurasi',
            desc: 'Kami memilih naskah bukan semata berdasarkan tren pasar sesaat, melainkan kedalaman isi, orisinalitas gagasan, dan kontribusi intelektualnya.',
            icon: ShieldCheck,
        },
        {
            title: 'Keadilan untuk Penulis',
            desc: 'Penulis adalah mitra setara kami. Kami menerapkan royalti transparan, pembayaran tepat waktu, dan pelibatan aktif dalam perancangan buku.',
            icon: Feather,
        },
        {
            title: 'Kecermatan Estetika',
            desc: 'Buku fisik adalah karya seni. Mulai dari pemilihan tipografi yang ramah mata hingga jenis kertas dan jilid edisi kolektor dikerjakan penuh cinta.',
            icon: Sparkles,
        },
    ];

    const team = [
        {
            name: 'Damar Sasongko, M.Hum.',
            role: 'Pemimpin Redaksi (Editor-in-Chief)',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
            bio: 'Lebih dari 18 tahun menggeluti dunia filologi dan kurasi sastra kontemporer Indonesia.'
        },
        {
            name: 'Anindya Wulandari',
            role: 'Kepala Desain & Tata Letak Buku',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
            bio: 'Meraih penghargaan Best Book Cover Design di ajang Indonesia Graphic Design Awards.'
        },
        {
            name: 'Baskoro Aditya',
            role: 'Direktur Distribusi & Hak Cipta',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
            bio: 'Menjembatani karya-karya terbitan Pustaka Aksara dengan pameran buku internasional Frankfurt dan London Book Fair.'
        }
    ];

    return (
        <PublicLayout>
            <SEO 
                title="Tentang Kami - Visi & Sejarah Penerbit Pustaka Aksara"
                description="Mengenal lebih dekat Pustaka Aksara: rumah bagi para sastrawan, pemikir, dan pegiat literasi independen Indonesia sejak 2012."
                keywords="tentang pustaka aksara, penerbit buku independen, sejarah penerbit, tim redaksi, visi literasi indonesia"
            />

            {/* Banner */}
            <div className="bg-[#241D18] text-white py-16 border-b border-stone-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Sejarah & Visi Literasi
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold mt-2">
                        Tentang Pustaka Aksara
                    </h1>
                    <p className="text-stone-300 text-sm mt-3 leading-relaxed">
                        Lahir dari kecintaan mendalam terhadap dunia kata dan kekuatan ide untuk membentuk peradaban yang berakal budi.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-5">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                            Perjalanan Kami
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
                            Membangun Rumah bagi Kata-kata yang Bernyawa
                        </h2>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            Didirikan di Yogyakarta pada tahun 2014, Pustaka Aksara berawal dari sebuah sanggar redaksi kecil dengan satu keyakinan sederhana: bahwa buku yang baik tidak pernah kehilangan pembacanya, betapapun derasnya arus distraksi zaman digital.
                        </p>
                        <p className="text-stone-600 text-sm leading-relaxed">
                            Kini, setelah menerbitkan ratusan judul buku di bidang sastra, sains, filsafat, dan sejarah maritim Nusantara, komitmen kami tetap tidak berubah. Kami terus mendampingi para penulis mewujudkan mahakarya mereka ke dalam wujud fisik yang memikat dan bermartabat.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-200">
                            <div>
                                <p className="text-2xl font-serif font-bold text-amber-900">{stats.books_published}</p>
                                <p className="text-xs text-stone-500">Judul Buku</p>
                            </div>
                            <div>
                                <p className="text-2xl font-serif font-bold text-amber-900">{stats.authors_partnered}</p>
                                <p className="text-xs text-stone-500">Penulis Mitra</p>
                            </div>
                            <div>
                                <p className="text-2xl font-serif font-bold text-amber-900">{stats.cities_reached}</p>
                                <p className="text-xs text-stone-500">Jangkauan Kota</p>
                            </div>
                            <div>
                                <p className="text-2xl font-serif font-bold text-amber-900">{stats.years_experience}</p>
                                <p className="text-xs text-stone-500">Dedikasi</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                            <img
                                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                                alt="Perpustakaan Pustaka Aksara"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Editorial Values */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                            Prinsip Kami
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
                            Pilar Nilai Redaksi Pustaka Aksara
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <div key={i} className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-sm flex flex-col items-start space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-serif font-bold text-xl text-stone-900">
                                        {v.title}
                                    </h3>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        {v.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Team Section */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                            Dapur Redaksi
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
                            Dewan Redaksi & Manajemen
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((t, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm text-center flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-amber-600/30">
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-serif font-bold text-lg text-stone-900">{t.name}</h3>
                                <p className="text-xs text-amber-800 font-semibold mt-0.5">{t.role}</p>
                                <p className="text-xs text-stone-500 mt-3 leading-relaxed">{t.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
