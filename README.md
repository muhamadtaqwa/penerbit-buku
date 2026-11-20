# 📚 Pustaka Aksara - Website Penerbit Buku Modern

> Platform web penerbit buku independen kuratif yang berfokus pada karya sastra, filosofi, sains, dan pemikiran nusantara berkualitas tinggi.

Dibuat dengan arsitektur modern berbasis **Laravel 12 + Inertia.js v2 + React 18 + TypeScript + Tailwind CSS + Radix UI + Lucide React + SQLite**.

---

## 🌟 Fitur Utama

- **🎨 Desain Elegan & Harmonis**: Menggunakan palet *Soft Sky Blue* & *Deep Navy* dengan kombinasi 2 font kurasi: **Poppins** (sans-serif) dan **Playfair Display** (literary serif).
- **📖 Pembaca Sampel Buku (Sample Reader Modal)**: Pratinjau bab 1 interaktif berbasis Radix UI Dialog dengan fitur pengatur ukuran font (zoom in/out) dan 3 tema baca (Parchment, White, Dark).
- **🛒 E-Commerce & Keranjang Belanja**: Keranjang belanja modular (*persisted LocalStorage*), multi-kurir (JNE, SiCepat, J&T, Pos Indonesia), pilihan metode pembayaran (BCA, Mandiri, BRI, QRIS), nota invoice resmi, dan fitur **Lacak Pesanan** dengan timeline pengiriman 4 tahap.
- **✍️ Portal Pengajuan Naskah Digital**: Formulir pengajuan naskah bagi para penulis dengan kode registrasi instan untuk memantau status naskah.
- **💰 Kalkulator Royalti Interaktif & FAQ**: Simulasi penghitungan royalti transparan bagi calon penulis dan FAQ berbasis Radix UI Accordion.
- **📰 Warta & Esai Literasi**: Publikasi artikel, wawancara kurator, serta wawasan kepenulisan.
- **🛡️ Dashboard Editorial Admin**: Manajemen katalog buku (tambah, edit, hapus), kurasi naskah masuk (terima, revisi, tolak), dan pembaruan nomor resi pesanan.
- **🚀 SEO & Google Rich Snippets**: Skema terstruktur Schema.org JSON-LD (`@type: Book`, `@type: Organization`, `@type: FAQPage`, `@type: Article`), Open Graph WhatsApp/Twitter cards, dan dynamic XML sitemap otomatis di `/sitemap.xml`.

---

## 🛠️ Tech Stack

* **Backend**: Laravel 12 (PHP 8.2+)
* **Database**: SQLite
* **Bridge**: Inertia.js v2
* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS v3
* **UI Primitives**: Radix UI (`Dialog`, `Accordion`, `DropdownMenu`, `Tabs`)
* **Icons**: Lucide React

---

## 🚀 Instalasi & Menjalankan Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/muhamadtaqwa/penerbit-buku.git
   cd penerbit-buku
   ```

2. **Install dependensi PHP & JavaScript**:
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Migrasi Database & Seeder**:
   ```bash
   php artisan migrate --seed
   ```

5. **Build Asset Frontend**:
   ```bash
   npm run build
   # atau untuk mode pengembangan: npm run dev
   ```

6. **Jalankan Server Lokal**:
   ```bash
   php artisan serve --port=8009
   ```

Buka peramban di [http://localhost:8009](http://localhost:8009).

---

## 📜 Lisensi

Proyek ini dirilis di bawah lisensi [MIT](LICENSE).
