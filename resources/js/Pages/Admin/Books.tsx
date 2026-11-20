import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
    BookOpen, 
    Plus, 
    Edit, 
    Trash2, 
    X, 
    Search, 
    Check, 
    Star, 
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Book, Author, Category } from '@/types';
import { formatRupiah } from '@/lib/utils';

interface AdminBooksProps {
    books: {
        data: Book[];
        current_page: number;
        last_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    authors: Author[];
    categories: Category[];
}

export default function AdminBooks({ books, authors, categories }: AdminBooksProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        subtitle: '',
        author_id: authors[0]?.id ? String(authors[0].id) : '',
        category_id: categories[0]?.id ? String(categories[0].id) : '',
        isbn: '',
        price: '',
        discount_price: '',
        stock: '50',
        page_count: '250',
        format: 'Paperback',
        cover_image: '',
        synopsis: '',
        sample_content: '',
        is_featured: false,
        is_bestseller: false,
        is_new_release: false,
    });

    const openCreateModal = () => {
        setEditingBook(null);
        reset();
        setData({
            title: '',
            subtitle: '',
            author_id: authors[0]?.id ? String(authors[0].id) : '',
            category_id: categories[0]?.id ? String(categories[0].id) : '',
            isbn: '978-623-' + Math.floor(1000 + Math.random() * 9000) + '-00-1',
            price: '95000',
            discount_price: '',
            stock: '50',
            page_count: '250',
            format: 'Paperback',
            cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
            synopsis: '',
            sample_content: '',
            is_featured: false,
            is_bestseller: false,
            is_new_release: true,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (book: Book) => {
        setEditingBook(book);
        setData({
            title: book.title,
            subtitle: book.subtitle || '',
            author_id: String(book.author_id),
            category_id: String(book.category_id),
            isbn: book.isbn,
            price: String(book.price),
            discount_price: book.discount_price ? String(book.discount_price) : '',
            stock: String(book.stock),
            page_count: String(book.page_count),
            format: book.format,
            cover_image: book.cover_image,
            synopsis: book.synopsis,
            sample_content: book.sample_content || '',
            is_featured: book.is_featured,
            is_bestseller: book.is_bestseller,
            is_new_release: book.is_new_release,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBook) {
            put(route('admin.books.update', editingBook.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.books.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus buku ini dari katalog?')) {
            router.delete(route('admin.books.destroy', id));
        }
    };

    return (
        <AdminLayout title="Kelola Katalog Buku">
            <Head title="Manajemen Buku - Admin Pustaka Aksara" />

            <div className="space-y-6">
                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                    <div className="text-xs text-stone-500 font-medium">
                        Total koleksi: <span className="font-bold text-stone-900">{books.total}</span> judul buku
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Judul Buku Baru</span>
                    </button>
                </div>

                {/* Books Table */}
                <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-stone-600">
                            <thead className="bg-stone-50 border-b border-stone-200 uppercase tracking-wider text-[11px] font-bold text-stone-700">
                                <tr>
                                    <th className="py-4 px-6">Buku & Cover</th>
                                    <th className="py-4 px-6">Penulis & Kategori</th>
                                    <th className="py-4 px-6">ISBN & Format</th>
                                    <th className="py-4 px-6">Harga & Diskon</th>
                                    <th className="py-4 px-6">Stok</th>
                                    <th className="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {books.data.map((book) => (
                                    <tr key={book.id} className="hover:bg-stone-50/50 transition">
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-14 rounded overflow-hidden bg-stone-100 flex-shrink-0 shadow-sm">
                                                    <img src={book.cover_image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{book.title}</h4>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        {book.is_bestseller && (
                                                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[9px] uppercase">
                                                                Bestseller
                                                            </span>
                                                        )}
                                                        {book.is_new_release && (
                                                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase">
                                                                Baru
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6">
                                            <p className="font-semibold text-stone-800">{book.author?.name}</p>
                                            <p className="text-[11px] text-stone-400">{book.category?.name}</p>
                                        </td>
                                        <td className="py-3 px-6 font-mono text-[11px]">
                                            <p>{book.isbn}</p>
                                            <span className="text-stone-400 font-sans">{book.format}</span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <p className="font-bold text-stone-900">{formatRupiah(book.price)}</p>
                                            {book.discount_price && (
                                                <p className="text-[11px] text-rose-600 font-bold">
                                                    Diskon: {formatRupiah(book.discount_price)}
                                                </p>
                                            )}
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                                book.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {book.stock} exp
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(book)}
                                                    className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition"
                                                    title="Ubah Buku"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(book.id)}
                                                    className="p-1.5 rounded-lg border border-stone-200 text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                                    title="Hapus Buku"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Radix UI Dialog: Add / Edit Book Modal */}
            <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                            <Dialog.Title className="font-serif font-bold text-xl text-stone-900">
                                {editingBook ? 'Ubah Data Buku' : 'Tambah Buku Baru ke Katalog'}
                            </Dialog.Title>
                            <Dialog.Close asChild>
                                <button className="p-2 text-stone-400 hover:text-stone-700 rounded-lg">
                                    <X className="w-5 h-5" />
                                </button>
                            </Dialog.Close>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Judul Buku *</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                    {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Penulis *</label>
                                    <select
                                        value={data.author_id}
                                        onChange={(e) => setData('author_id', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    >
                                        {authors.map((a) => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Kategori *</label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">ISBN Resmi *</label>
                                    <input
                                        type="text"
                                        value={data.isbn}
                                        onChange={(e) => setData('isbn', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Format *</label>
                                    <select
                                        value={data.format}
                                        onChange={(e) => setData('format', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                    >
                                        <option value="Paperback">Paperback</option>
                                        <option value="Hardcover">Hardcover</option>
                                        <option value="E-Book">E-Book</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Harga Normal (Rp) *</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Harga Diskon (Rp)</label>
                                    <input
                                        type="number"
                                        value={data.discount_price}
                                        onChange={(e) => setData('discount_price', e.target.value)}
                                        placeholder="Kosongkan jika tidak ada"
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Stok Tersedia *</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Jumlah Halaman *</label>
                                    <input
                                        type="number"
                                        value={data.page_count}
                                        onChange={(e) => setData('page_count', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">URL Gambar Sampul (Cover URL) *</label>
                                    <input
                                        type="url"
                                        value={data.cover_image}
                                        onChange={(e) => setData('cover_image', e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Sinopsis Singkat *</label>
                                    <textarea
                                        rows={3}
                                        value={data.synopsis}
                                        onChange={(e) => setData('synopsis', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-amber-500"
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-stone-700 mb-1">Teks Sampel Bab (Untuk Pratinjau Pembaca)</label>
                                    <textarea
                                        rows={4}
                                        value={data.sample_content}
                                        onChange={(e) => setData('sample_content', e.target.value)}
                                        placeholder="Teks bab 1 untuk modal baca sampel..."
                                        className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif focus:ring-1 focus:ring-amber-500"
                                    />
                                </div>

                                <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                                        <input
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={(e) => setData('is_featured', e.target.checked)}
                                            className="rounded text-amber-600 focus:ring-amber-500"
                                        />
                                        <span>Sorotan (Featured)</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                                        <input
                                            type="checkbox"
                                            checked={data.is_bestseller}
                                            onChange={(e) => setData('is_bestseller', e.target.checked)}
                                            className="rounded text-amber-600 focus:ring-amber-500"
                                        />
                                        <span>Bestseller</span>
                                    </label>

                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
                                        <input
                                            type="checkbox"
                                            checked={data.is_new_release}
                                            onChange={(e) => setData('is_new_release', e.target.checked)}
                                            className="rounded text-amber-600 focus:ring-amber-500"
                                        />
                                        <span>Rilis Baru</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-stone-100 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Buku'}
                                </button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </AdminLayout>
    );
}
