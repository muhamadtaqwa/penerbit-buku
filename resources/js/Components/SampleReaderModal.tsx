import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, BookOpen, ZoomIn, ZoomOut, Sun, Moon, Coffee } from 'lucide-react';
import { Book } from '@/types';

interface SampleReaderModalProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function SampleReaderModal({ book, isOpen, onClose }: SampleReaderModalProps) {
    const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
    const [theme, setTheme] = useState<'parchment' | 'white' | 'dark'>('parchment');

    if (!book) return null;

    const fontSizeClasses = {
        sm: 'text-sm leading-relaxed',
        base: 'text-base leading-relaxed',
        lg: 'text-lg leading-loose',
        xl: 'text-xl leading-loose',
    };

    const themeClasses = {
        parchment: 'bg-[#FBF6EE] text-[#2C241E] border-[#E8DEC8]',
        white: 'bg-white text-slate-800 border-slate-200',
        dark: 'bg-[#18181B] text-[#E4E4E7] border-zinc-800',
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
                    {/* Header Controls */}
                    <div className="flex items-center justify-between border-b px-6 py-4 bg-white/95 backdrop-blur dark:bg-zinc-900 border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-400">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <Dialog.Title className="text-base font-serif font-bold text-slate-900 dark:text-white line-clamp-1">
                                    {book.title}
                                </Dialog.Title>
                                <Dialog.Description className="text-xs text-slate-500 dark:text-zinc-400">
                                    Pratinjau Sampel Bab • {book.author?.name}
                                </Dialog.Description>
                            </div>
                        </div>

                        {/* Reading Tools */}
                        <div className="flex items-center gap-2">
                            {/* Font size adjustments */}
                            <div className="flex items-center bg-slate-100 dark:bg-zinc-800 rounded-lg p-1 text-slate-600 dark:text-zinc-300">
                                <button
                                    onClick={() => setFontSize(prev => prev === 'xl' ? 'lg' : prev === 'lg' ? 'base' : 'sm')}
                                    className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded transition"
                                    title="Kecilkan Font"
                                >
                                    <ZoomOut className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setFontSize(prev => prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'xl')}
                                    className="p-1.5 hover:bg-white dark:hover:bg-zinc-700 rounded transition"
                                    title="Besarkan Font"
                                >
                                    <ZoomIn className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Theme options */}
                            <div className="flex items-center bg-slate-100 dark:bg-zinc-800 rounded-lg p-1 text-slate-600 dark:text-zinc-300">
                                <button
                                    onClick={() => setTheme('parchment')}
                                    className={`p-1.5 rounded transition ${theme === 'parchment' ? 'bg-[#FBF6EE] text-amber-900 shadow-sm' : ''}`}
                                    title="Warna Kertas Sepia"
                                >
                                    <Coffee className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setTheme('white')}
                                    className={`p-1.5 rounded transition ${theme === 'white' ? 'bg-white text-slate-900 shadow-sm' : ''}`}
                                    title="Kertas Putih Bersih"
                                >
                                    <Sun className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`p-1.5 rounded transition ${theme === 'dark' ? 'bg-zinc-900 text-white shadow-sm' : ''}`}
                                    title="Mode Gelap"
                                >
                                    <Moon className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Close button */}
                            <Dialog.Close asChild>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>

                    {/* Book Text Reader Body */}
                    <div className={`p-8 md:p-12 overflow-y-auto flex-1 font-serif transition-colors duration-200 ${themeClasses[theme]}`}>
                        <div className="max-w-xl mx-auto space-y-6">
                            <div className="text-center pb-8 border-b border-current/10">
                                <span className="text-xs uppercase tracking-widest font-sans font-semibold opacity-70">
                                    Penerbit Pustaka Aksara
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold mt-2 font-serif tracking-tight">
                                    {book.title}
                                </h2>
                                <p className="text-sm italic opacity-80 mt-1">
                                    Karya {book.author?.name}
                                </p>
                            </div>

                            <div className={`whitespace-pre-line text-justify font-serif ${fontSizeClasses[fontSize]}`}>
                                {book.sample_content || "Sampel teks naskah untuk buku ini sedang disiapkan oleh tim redaksi kami. Anda dapat membaca sinopsis lengkap atau memesan buku sekarang untuk menikmati karya utuh."}
                            </div>

                            {/* Footer inside reader */}
                            <div className="pt-10 mt-8 border-t border-current/10 text-center font-sans">
                                <p className="text-sm opacity-75">
                                    Tertarik membaca kelanjutan kisah ini? Dapatkan edisi resmi ber-ISBN sekarang.
                                </p>
                                <div className="mt-4 flex items-center justify-center gap-3">
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2.5 rounded-full bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold shadow-md transition"
                                    >
                                        Beli Buku Lengkap
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
