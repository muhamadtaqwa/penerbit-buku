import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
    FileText, 
    X, 
    Check, 
    Eye, 
    Clock, 
    User, 
    Mail, 
    Phone, 
    Send 
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Manuscript } from '@/types';
import { formatDateIndo } from '@/lib/utils';

interface AdminManuscriptsProps {
    manuscripts: {
        data: Manuscript[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function AdminManuscripts({ manuscripts }: AdminManuscriptsProps) {
    const [selectedManuscript, setSelectedManuscript] = useState<Manuscript | null>(null);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const { data, setData, patch, processing, reset } = useForm({
        status: 'pending' as Manuscript['status'],
        editor_notes: '',
    });

    const openReviewModal = (m: Manuscript) => {
        setSelectedManuscript(m);
        setData({
            status: m.status,
            editor_notes: m.editor_notes || '',
        });
        setIsReviewModalOpen(true);
    };

    const handleUpdateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedManuscript) return;

        patch(route('admin.manuscripts.update', selectedManuscript.id), {
            onSuccess: () => {
                setIsReviewModalOpen(false);
            },
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-900 border-amber-300';
            case 'reviewing': return 'bg-blue-100 text-blue-900 border-blue-300';
            case 'accepted': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
            case 'revision': return 'bg-purple-100 text-purple-900 border-purple-300';
            case 'rejected': return 'bg-rose-100 text-rose-900 border-rose-300';
            default: return 'bg-stone-100 text-stone-900 border-stone-300';
        }
    };

    return (
        <AdminLayout title="Evaluasi & Kurasi Naskah Masuk">
            <Head title="Kurasi Naskah - Admin Pustaka Aksara" />

            <div className="space-y-6">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm text-xs text-stone-600">
                    Menampilkan total <span className="font-bold text-stone-900">{manuscripts.total}</span> naskah yang diajukan oleh penulis. Klik tombol <strong>Review</strong> untuk membaca sinopsis, bab pembuka, dan menentukan keputusan redaksi.
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-stone-600">
                            <thead className="bg-stone-50 border-b border-stone-200 uppercase tracking-wider text-[11px] font-bold text-stone-700">
                                <tr>
                                    <th className="py-4 px-6">ID & Judul Naskah</th>
                                    <th className="py-4 px-6">Penulis & Kontak</th>
                                    <th className="py-4 px-6">Genre / Kategori</th>
                                    <th className="py-4 px-6">Status Kurasi</th>
                                    <th className="py-4 px-6">Tanggal Masuk</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {manuscripts.data.map((m) => (
                                    <tr key={m.id} className="hover:bg-stone-50/50 transition">
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-[10px] text-stone-400 block">
                                                NSK-{String(m.id).padStart(4, '0')}
                                            </span>
                                            <h4 className="font-serif font-bold text-stone-900 text-sm">{m.title}</h4>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="font-semibold text-stone-900">{m.author_name}</p>
                                            <p className="text-[11px] text-stone-400">{m.author_email} • {m.author_phone}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-stone-800">{m.category?.name || m.genre}</span>
                                            <p className="text-[11px] text-stone-400">Target: {m.target_audience}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(m.status)}`}>
                                                {m.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-stone-500">
                                            {formatDateIndo(m.created_at)}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => openReviewModal(m)}
                                                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold inline-flex items-center gap-1.5 transition"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>Review Naskah</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Radix UI Dialog: Review & Decision Modal */}
            <Dialog.Root open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                        {selectedManuscript && (
                            <div>
                                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                                    <div>
                                        <span className="text-xs font-mono text-stone-400">
                                            REG-NSK-{String(selectedManuscript.id).padStart(5, '0')}
                                        </span>
                                        <Dialog.Title className="font-serif font-bold text-2xl text-stone-900 mt-0.5">
                                            {selectedManuscript.title}
                                        </Dialog.Title>
                                        <p className="text-xs text-stone-500">
                                            Karya {selectedManuscript.author_name} ({selectedManuscript.author_email} • {selectedManuscript.author_phone})
                                        </p>
                                    </div>
                                    <Dialog.Close asChild>
                                        <button className="p-2 text-stone-400 hover:text-stone-700 rounded-lg">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </Dialog.Close>
                                </div>

                                <div className="py-6 space-y-6">
                                    {/* Synopsis Box */}
                                    <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                                        <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                                            Sinopsis Naskah:
                                        </h4>
                                        <p className="text-xs text-stone-800 leading-relaxed whitespace-pre-line">
                                            {selectedManuscript.synopsis}
                                        </p>
                                    </div>

                                    {/* Sample Chapter Excerpt */}
                                    <div className="p-5 rounded-2xl bg-[#FBF8F2] border border-amber-200/80">
                                        <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                                            Bab Sampel yang Diajukan:
                                        </h4>
                                        <div className="max-h-60 overflow-y-auto pr-2 text-xs font-serif text-stone-800 leading-relaxed whitespace-pre-line">
                                            {selectedManuscript.sample_chapter}
                                        </div>
                                    </div>

                                    {/* Editorial Decision Form */}
                                    <form onSubmit={handleUpdateStatus} className="space-y-4 pt-4 border-t border-stone-200">
                                        <h4 className="font-serif font-bold text-base text-stone-900">
                                            Keputusan Dewan Kurator Redaksi
                                        </h4>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-stone-700 mb-1">
                                                    Status Naskah *
                                                </label>
                                                <select
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value as Manuscript['status'])}
                                                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:ring-1 focus:ring-amber-500"
                                                >
                                                    <option value="pending">Pending (Menunggu Evaluasi)</option>
                                                    <option value="reviewing">Sedang Direview Tim Ahli</option>
                                                    <option value="accepted">Diterima Terbit (Accepted)</option>
                                                    <option value="revision">Perlu Revisi Penulis</option>
                                                    <option value="rejected">Belum Sesuai (Ditolak)</option>
                                                </select>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="block text-xs font-semibold text-stone-700 mb-1">
                                                    Catatan / Masukan Editor untuk Penulis
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={data.editor_notes}
                                                    onChange={(e) => setData('editor_notes', e.target.value)}
                                                    placeholder="Contoh: Bab awal sangat memikat. Disarankan untuk memadatkan dialog pada adegan klimaks..."
                                                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 pt-3">
                                            <button
                                                type="button"
                                                onClick={() => setIsReviewModalOpen(false)}
                                                className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                                            >
                                                Tutup
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-5 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition disabled:opacity-50"
                                            >
                                                {processing ? 'Menyimpan...' : 'Perbarui Status Naskah'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </AdminLayout>
    );
}
