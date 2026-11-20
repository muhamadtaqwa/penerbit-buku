<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Manuscript;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Users
        $admin = User::create([
            'name' => 'Dewan Redaksi Aksara',
            'email' => 'admin@pustaka-aksara.id',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        $reader = User::create([
            'name' => 'Andi Pratama',
            'email' => 'pembaca@aksara.id',
            'password' => Hash::make('password123'),
            'role' => 'user',
        ]);

        // 2. Categories
        $categoriesData = [
            [
                'name' => 'Sastra & Fiksi Kontemporer',
                'slug' => 'sastra-fiksi',
                'description' => 'Karya sastra pilihan yang memikat, narasi mendalam, dan fiksi kontemporer dengan gaya bertutur kelas dunia.',
                'icon' => 'BookOpen',
                'is_popular' => true,
            ],
            [
                'name' => 'Pengembangan Diri & Filosofi',
                'slug' => 'pengembangan-diri',
                'description' => 'Eksplorasi ketenangan batin, produktivitas bermakna, kecerdasan emosional, dan hikmah filosofis.',
                'icon' => 'Sparkles',
                'is_popular' => true,
            ],
            [
                'name' => 'Bisnis, Ekonomi & Karier',
                'slug' => 'bisnis-ekonomi',
                'description' => 'Wawasan strategis kepemimpinan, tren finansial global, investasi, dan inovasi kewirausahaan masa depan.',
                'icon' => 'TrendingUp',
                'is_popular' => true,
            ],
            [
                'name' => 'Sains, Teknologi & Masa Depan',
                'slug' => 'sains-teknologi',
                'description' => 'Menjelajahi horizon kecerdasan buatan, eksplorasi semesta, komputasi kuantum, dan evolusi digital.',
                'icon' => 'Cpu',
                'is_popular' => true,
            ],
            [
                'name' => 'Sejarah, Sosial & Budaya',
                'slug' => 'sejarah-budaya',
                'description' => 'Dokumentasi otentik peradaban Nusantara, jejak maritim, antropologi, dan dinamika sosial masyarakat modern.',
                'icon' => 'Landmark',
                'is_popular' => true,
            ],
            [
                'name' => 'Puisi, Seni & Kreativitas',
                'slug' => 'puisi-seni',
                'description' => 'Antologi sajak penuh rasa, eksplorasi estetika visual, esai kurasi seni, dan percikan imajinasi puitis.',
                'icon' => 'Palette',
                'is_popular' => false,
            ],
            [
                'name' => 'Anak & Remaja Pintar',
                'slug' => 'anak-remaja',
                'description' => 'Kisah petualangan penuh nilai budi pekerti, ensiklopedia bergambar ceria, dan fiksi pembangun karakter.',
                'icon' => 'Smile',
                'is_popular' => false,
            ],
        ];

        $categories = [];
        foreach ($categoriesData as $cat) {
            $categories[$cat['slug']] = Category::create($cat);
        }

        // 3. Authors
        $authorsData = [
            [
                'name' => 'Raden Ayu Wardhani',
                'slug' => 'raden-ayu-wardhani',
                'avatar_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
                'tagline' => 'Sastrawan Peraih Anugerah Sastra Asia Tenggara',
                'bio' => 'Raden Ayu Wardhani telah menulis lebih dari 12 novel berlatar sejarah Nusantara yang diterjemahkan ke dalam 8 bahasa. Karyanya dikenal dengan riset arsip kolonial yang sangat akurat dan bahasa puitis yang memikat.',
                'awards' => 'Pemenang Kusala Sastra Khatulistiwa 2023, SEA Write Award 2025',
                'website' => 'https://wardhani-literary.id',
                'instagram' => '@wardhani_author',
                'is_featured' => true,
            ],
            [
                'name' => 'Dr. Irfan Wicaksana',
                'slug' => 'dr-irfan-wicaksana',
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                'tagline' => 'Doktor Neurosains & Penggagas Gerakan "Mindful Living"',
                'bio' => 'Alumnus University of Oxford yang mendedikasikan risetnya pada neuroplastisitas dan ketahanan mental manusia modern di era distorsi teknologi. Buku-bukunya telah menjadi pegangan ratusan ribu profesional muda.',
                'awards' => 'National Science & Humanity Award 2024',
                'website' => 'https://irfanwicaksana.com',
                'instagram' => '@dr.irfan_wicaksana',
                'is_featured' => true,
            ],
            [
                'name' => 'Maya Kartika Dewi',
                'slug' => 'maya-kartika-dewi',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
                'tagline' => 'Novelis Bestseller & Pemenang Pilihan Pembaca Indonesia',
                'bio' => 'Maya memikat pembaca generasi muda dengan novel-novel bercita rasa misteri urban, psikologi keluarga, dan relasi emosional yang autentik. Sering menjadi narasumber festival literasi internasional.',
                'awards' => 'Indonesia Reader Choice Award 2025',
                'website' => 'https://mayakartika.id',
                'instagram' => '@mayakartikadewi',
                'is_featured' => true,
            ],
            [
                'name' => 'Prof. Budi Hartono, Ph.D.',
                'slug' => 'prof-budi-hartono',
                'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
                'tagline' => 'Guru Besar Ekonomi Kebijakan Publik & Sejarawan Maritim',
                'bio' => 'Menulis analisis mendalam mengenai peta geopolitik ekonomi regional dan sejarah perdagangan jalur rempah Nusantara yang membentuk identitas peradaban bangsa.',
                'awards' => 'Lifetime Academic Achievement Award 2022',
                'website' => 'https://budihartono.org',
                'instagram' => '@prof_budihartono',
                'is_featured' => false,
            ],
            [
                'name' => 'Kirana Larasati',
                'slug' => 'kirana-larasati',
                'avatar_url' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
                'tagline' => 'Penyair Kontemporer & Kurator Seni Rupa',
                'bio' => 'Kirana menghadirkan lanskap puitis yang intim antara keterasingan urban, alam pegunungan, dan spiritualitas Jawa kontemporer.',
                'awards' => 'Kusala Sastra Kategori Puisi 2024',
                'website' => 'https://kiranalarasati.art',
                'instagram' => '@kiranapoetry',
                'is_featured' => true,
            ],
            [
                'name' => 'Kevin Alamsyah',
                'slug' => 'kevin-alamsyah',
                'avatar_url' => 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
                'tagline' => 'AI Researcher & Penulis Masa Depan Komputasi',
                'bio' => 'Praktisi teknologi yang menjembatani sains mutakhir dengan realitas masyarakat sehari-hari lewat tulisan yang cerdas, reflektif, dan membuka cakrawala masa depan.',
                'awards' => 'Tech Communicator of the Year 2025',
                'website' => 'https://kevinalamsyah.tech',
                'instagram' => '@kevinalamsyah',
                'is_featured' => false,
            ],
        ];

        $authors = [];
        foreach ($authorsData as $auth) {
            $authors[$auth['slug']] = Author::create($auth);
        }

        // 4. Books
        $booksData = [
            [
                'title' => 'Bayang-bayang di Ujung Senja',
                'slug' => 'bayang-bayang-di-ujung-senja',
                'subtitle' => 'Sebuah Roman Misteri tentang Luka, Rahasia Keluarga, dan Penebusan',
                'category_id' => $categories['sastra-fiksi']->id,
                'author_id' => $authors['maya-kartika-dewi']->id,
                'isbn' => '978-623-8891-01-2',
                'synopsis' => 'Di sebuah vila tua di lereng Kaliurang yang diselimuti kabut, sebuah surat tanpa nama membuka kembali misteri hilangnya seorang pelukis tiga puluh tahun silam.',
                'description' => 'Ketika Nadira kembali ke kediaman mendiang kakeknya di Yogyakarta, ia hanya berniat merapikan barang-barang peninggalan keluarga. Namun sebuah ruang tersembunyi di balik rak perpustakaan menyingkap catatan harian bertanggal tahun 1994 dengan lukisan-lukisan potret yang belum pernah dipamerkan. Bersama seorang jurnalis investigasi independen, Nadira menyusuri jejak-jejak masa lalu yang membawa mereka pada dilema moral antara mengungkap kebenaran yang menghancurkan atau menjaga kehormatan sebuah dinasti keluarga.',
                'cover_image' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
                'price' => 115000,
                'discount_price' => 95000,
                'stock' => 140,
                'page_count' => 368,
                'publication_date' => '2026-02-15',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Paperback',
                'dimensions' => '13.5 x 20.5 cm',
                'weight' => 310,
                'rating_avg' => 4.9,
                'reviews_count' => 128,
                'is_featured' => true,
                'is_bestseller' => true,
                'is_new_release' => true,
                'sample_content' => "BAB SATU: KABUT DI LERENG MERAPI\n\nKabut selalu punya cara sendiri menyembunyikan masa lalu. Ia merayap perlahan dari rimbun pohon cemara, menelan jalan setapak berbatu, lalu mengetuk jendela kaca vila dengan embun yang dingin.\n\nNadira memegang kunci tembaga itu erat-erat. Gigitannya pada gerigi kunci masih tajam, seolah tiga puluh tahun tak mengurangi kekokohannya. Ayahnya pernah berpesan, 'Ada pintu yang sebaiknya dibiarkan terkunci, Nadira. Bukan karena di dalamnya ada monster, melainkan karena kebenaran terkadang lebih melukai daripada kebohongan yang manis.'\n\nNamun sore itu, aroma cat minyak dan tumpukan kertas tua dari balik pintu di lantai dua terlalu kuat untuk diabaikan. Ketika engsel berderit parau, cahaya senja yang temaram menembus tirai robek, menari di atas kanvas raksasa berdebu: potret seorang wanita bergaun sutra putih dengan tatapan mata yang seolah menatap langsung ke relung jiwanya.",
            ],
            [
                'title' => 'Arsitektur Ketenangan',
                'slug' => 'arsitektur-ketenangan',
                'subtitle' => 'Seni Menata Jiwa & Menemukan Keheningan di Tengah Dunia yang Bising',
                'category_id' => $categories['pengembangan-diri']->id,
                'author_id' => $authors['dr-irfan-wicaksana']->id,
                'isbn' => '978-623-8891-02-9',
                'synopsis' => 'Panduan berbasis neurosains dan kebijaksanaan kuno untuk melepaskan beban overthinking, mengendalikan arus dopamin, dan membangun ruang damai dalam benak Anda.',
                'description' => 'Kita hidup di era di mana perhatian kita diperjualbelikan setiap detik. Notifikasi, tuntutan produktivitas tanpa henti, dan perbandingan sosial di media maya telah mengikis ketenangan alami manusia. Dr. Irfan Wicaksana membedah bagaimana otak merespons stimuli modern, mengapa kita rentan lelah secara psikis, dan bagaimana menyusun kembali ritme hidup harian secara sistematis.',
                'cover_image' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
                'price' => 128000,
                'discount_price' => 108000,
                'stock' => 85,
                'page_count' => 296,
                'publication_date' => '2026-01-10',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Hardcover',
                'dimensions' => '14 x 21 cm',
                'weight' => 380,
                'rating_avg' => 4.95,
                'reviews_count' => 210,
                'is_featured' => true,
                'is_bestseller' => true,
                'is_new_release' => false,
                'sample_content' => "PENDAHULUAN: KEBISINGAN YANG TIDAK KITA SADARI\n\nJika Anda bertanya pada generasi kakek kita apa yang paling berharga di dunia, jawabannya mungkin emas atau tanah. Namun jika Anda bertanya pada generasi sekarang, jawaban yang paling jujur namun paling sulit diucapkan adalah: keheningan.\n\nKeheningan bukan berarti tiadanya suara secara fisik. Keheningan adalah kondisi mental di mana pikiran Anda tidak disandera oleh masa lalu yang tak bisa diubah atau masa depan yang belum tentu terjadi.\n\nDalam laboratorium kognitif kami, kami mengamati aktivasi korteks prefrontal pada individu yang terpapar bombardir pesan singkat selama 4 jam berturut-turut. Hasilnya mengejutkan: tingkat kecemasan seluler otak mereka menyamai orang yang sedang menghadapi ancaman predator di alam liar. Mari kita pelajari bagaimana mengembalikan kendali itu ke tangan Anda.",
            ],
            [
                'title' => 'Nusantara 2045: Menavigasi Badai Geopolitik',
                'slug' => 'nusantara-2045-geopolitik',
                'subtitle' => 'Kedaulatan Maritim, Disrupsi Energi Hijau, dan Kebangkitan Asia Tenggara',
                'category_id' => $categories['bisnis-ekonomi']->id,
                'author_id' => $authors['prof-budi-hartono']->id,
                'isbn' => '978-623-8891-03-6',
                'synopsis' => 'Analisis geopolitik dan ekonomi makro komprehensif mengenai posisi tawar strategis Indonesia menuju peringatan satu abad kemerdekaan.',
                'description' => 'Dunia sedang bergerak dari unipolaritas menuju tatanan multipolar yang rumit. Di tengah gesekan kekuatan maritim pasifik dan pergeseran rantai pasok global semikonduktor serta mineral kritis, kepulauan Indonesia berdiri di titik silang krusial peradaban. Prof. Budi Hartono menyajikan cetak biru kebijakan ekonomi, ketahanan energi terbarukan, dan diplomasi pertahanan yang realistis.',
                'cover_image' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
                'price' => 145000,
                'discount_price' => 125000,
                'stock' => 60,
                'page_count' => 420,
                'publication_date' => '2026-03-01',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Hardcover',
                'dimensions' => '15 x 23 cm',
                'weight' => 520,
                'rating_avg' => 4.85,
                'reviews_count' => 95,
                'is_featured' => true,
                'is_bestseller' => false,
                'is_new_release' => true,
                'sample_content' => "BAB I: PINTU GERBANG SAMUDRA HINDIA DAN PASIFIK\n\nLebih dari empat puluh persen perdagangan energi maritim dunia melintasi selat-selat sempit di perairan Nusantara setiap hari. Fakta geografis ini bukan kebetulan sejarah; ini adalah takdir geopolitik yang menjadi kekuatan sekaligus kerentanan terbesar bangsa kita.\n\nDalam dua dekade ke depan, perlombaan penguasaan rute logistik hijau dan pelabuhan pintar akan mendikte negara mana yang memimpin rantai nilai dunia...",
            ],
            [
                'title' => 'Lembayung Mataram',
                'slug' => 'lembayung-mataram',
                'subtitle' => 'Balada Cinta dan Pengkhianatan di Balik Megahnya Benteng Keraton',
                'category_id' => $categories['sastra-fiksi']->id,
                'author_id' => $authors['raden-ayu-wardhani']->id,
                'isbn' => '978-623-8891-04-3',
                'synopsis' => 'Kisah epik perseteruan dua bangsawan kembar dan seorang penari bedhaya pusaka di era senjakala kejayaan Mataram Islam.',
                'description' => 'Di tengah desas-desus kedatangan kapal-kapal kompeni di pesisir utara Jawa, suasana istana Mataram memanas akibat perebutan takhta terselubung. Sekar Arum, penari bedhaya yang memegang rahasia keris pusaka sang Prabu, terjebak dalam dilema antara sumpah kesetiaan pada tanah kelahirannya atau menyelamatkan lelaki yang telah menawan hatinya.',
                'cover_image' => 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=700&q=80',
                'price' => 135000,
                'discount_price' => null,
                'stock' => 90,
                'page_count' => 456,
                'publication_date' => '2025-11-20',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Paperback',
                'dimensions' => '13.5 x 20.5 cm',
                'weight' => 390,
                'rating_avg' => 4.92,
                'reviews_count' => 174,
                'is_featured' => false,
                'is_bestseller' => true,
                'is_new_release' => false,
                'sample_content' => "PROLOG: BUNYI GENDANG TERAKHIR\n\nGamelan bergaung menggetarkan lantai marmer pendopo agung. Langkah Sekar Arum seringan kapas yang diembus angin barat, namun dadanya berdegup bagai derap kuda perang di lembah Progo...",
            ],
            [
                'title' => 'Kidung Sang Pengelana',
                'slug' => 'kidung-sang-pengelana',
                'subtitle' => 'Antologi Sajak Kesunyian, Perjalanan Malam, dan Kerinduan Ilahi',
                'category_id' => $categories['puisi-seni']->id,
                'author_id' => $authors['kirana-larasati']->id,
                'isbn' => '978-623-8891-05-0',
                'synopsis' => 'Kumpulan 99 sajak puitis yang mengajak pembaca menyelami sunyi sebagai kawan karib jiwa dan ruang penyembuhan rohani.',
                'description' => 'Kirana Larasati merajut kata-kata dengan ritme yang menghipnotis. Buku ini dilengkapi ilustrasi sketsa tinta bambu yang dirancang eksklusif, menjadikannya koleksi literatur yang sangat indah untuk dinikmati di malam hari.',
                'cover_image' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
                'price' => 88000,
                'discount_price' => 75000,
                'stock' => 50,
                'page_count' => 160,
                'publication_date' => '2026-01-25',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Paperback',
                'dimensions' => '13 x 19 cm',
                'weight' => 210,
                'rating_avg' => 4.88,
                'reviews_count' => 64,
                'is_featured' => false,
                'is_bestseller' => false,
                'is_new_release' => true,
                'sample_content' => "SAJAK KELIMA: PADA SEBUAH KOTA YANG TIDAK TIDUR\n\nDi trotoar yang basah oleh sisa gerimis,\naku menghitung lampu jalan yang enggan redup.\nSemua orang terburu-buru mengejar esok,\nsedang aku masih meraba bekas jemarimu\ndi tepi mantel hujan yang kian lapuk.\n\nSunyi tidak pernah pergi, kawan.\nIa hanya menunggu hingga semua keramaian menyerah pada lelah.",
            ],
            [
                'title' => 'Kecerdasan Buatan dan Manusia Terakhir',
                'slug' => 'kecerdasan-buatan-dan-manusia-terakhir',
                'subtitle' => 'Refleksi Etika, Kesadaran Mesin, dan Masa Depan Eksistensi Kemanusiaan',
                'category_id' => $categories['sains-teknologi']->id,
                'author_id' => $authors['kevin-alamsyah']->id,
                'isbn' => '978-623-8891-06-7',
                'synopsis' => 'Ketika algoritma mampu menggubah simfoni, mendiagnosis penyakit, dan meniru empati manusia: apa yang tersisa dari keunikan kemanusiaan kita?',
                'description' => 'Kevin Alamsyah mengajak pembaca melompat ke garis depan perkembangan kecerdasan artifisial (AGI) dan bio-teknologi. Ditulis tanpa jargon yang membingungkan, buku ini memicu diskursus esensial mengenai pendidikan anak, pasar kerja masa depan, dan batas etis penciptaan entitas otonom.',
                'cover_image' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
                'price' => 119000,
                'discount_price' => 99000,
                'stock' => 110,
                'page_count' => 312,
                'publication_date' => '2026-02-01',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Paperback',
                'dimensions' => '14 x 21 cm',
                'weight' => 340,
                'rating_avg' => 4.87,
                'reviews_count' => 88,
                'is_featured' => true,
                'is_bestseller' => true,
                'is_new_release' => true,
                'sample_content' => "BAB I: KETIKA CERMIN BERBICARA KEPADA KITA\n\nSepanjang sejarahnya, cermin manusia hanyalah permukaan kaca atau riak air tenang yang memantulkan rupa fisik kita. Namun hari ini, untuk pertama kalinya dalam sejarah spesies homo sapiens, cermin itu mulai menjawab pertanyaan kita dengan kalimat yang logis dan bernada empati...",
            ],
            [
                'title' => 'Jejak Langkah di Bumi Rempah',
                'slug' => 'jejak-langkah-bumi-rempah',
                'subtitle' => 'Sejarah Perdagangan Maritim Nusantara yang Mengubah Peta Dunia',
                'category_id' => $categories['sejarah-budaya']->id,
                'author_id' => $authors['prof-budi-hartono']->id,
                'isbn' => '978-623-8891-07-4',
                'synopsis' => 'Mengungkap fakta sejarah bagaimana pala dari Banda dan cengkih dari Maluku menjadi magnet imperium-imperium besar dunia melayari samudra.',
                'description' => 'Buku referensi sejarah yang disusun dengan gaya bertutur naratif yang hidup, dilengkapi peta kuno beresolusi tinggi, dokumentasi arsip Bataviaasch Genootschap, dan wawancara dengan para pelaut tradisional di Ternate dan Tidore.',
                'cover_image' => 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=700&q=80',
                'price' => 150000,
                'discount_price' => 135000,
                'stock' => 70,
                'page_count' => 480,
                'publication_date' => '2025-09-14',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Hardcover',
                'dimensions' => '15 x 23 cm',
                'weight' => 580,
                'rating_avg' => 4.94,
                'reviews_count' => 112,
                'is_featured' => false,
                'is_bestseller' => false,
                'is_new_release' => false,
                'sample_content' => "BAB SATU: AROMA DI TENGAH GELOMBANG LAUT BANDA\n\nPala adalah permata hitam samudra. Di abad keenam belas, satu karung biji pala di dermaga Amsterdam bisa ditukar dengan sebuah rumah bertingkat di tepi kanal...",
            ],
            [
                'title' => 'Petualangan Bintang Kecil',
                'slug' => 'petualangan-bintang-kecil',
                'subtitle' => 'Menjelajahi Planet dan Galaksi Bersama Luna & Robot Kiko',
                'category_id' => $categories['anak-remaja']->id,
                'author_id' => $authors['dr-irfan-wicaksana']->id,
                'isbn' => '978-623-8891-08-1',
                'synopsis' => 'Buku sains bergambar penuh warna yang menumbuhkan rasa ingin tahu dan kecintaan anak terhadap astronomi dan kepedulian pada bumi.',
                'description' => 'Disertai aktivitas eksperimen sains sederhana di rumah dan fakta-fakta unik mengenai cincin Saturnus, badai Jupiter, hingga misteri lubang hitam.',
                'cover_image' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
                'price' => 95000,
                'discount_price' => 82000,
                'stock' => 120,
                'page_count' => 96,
                'publication_date' => '2026-01-05',
                'language' => 'Bahasa Indonesia',
                'publisher' => 'Pustaka Aksara Press',
                'format' => 'Hardcover',
                'dimensions' => '20 x 20 cm',
                'weight' => 310,
                'rating_avg' => 4.96,
                'reviews_count' => 76,
                'is_featured' => false,
                'is_bestseller' => false,
                'is_new_release' => true,
                'sample_content' => "Halo teman-teman! Namaku Luna, dan ini temanku, Robot Kiko. Hari ini kita akan menyalakan mesin pesawat antariksa kita menuju planet Mars!",
            ],
        ];

        $books = [];
        foreach ($booksData as $bData) {
            $books[$bData['slug']] = Book::create($bData);
        }

        // 5. Reviews
        $reviewsData = [
            [
                'book_id' => $books['bayang-bayang-di-ujung-senja']->id,
                'user_name' => 'Fauzan Nugroho',
                'rating' => 5,
                'comment' => 'Plot twist di bab 18 benar-benar tidak terduga! Pilihan kata Mbak Maya sangat elegan dan bikin larut sampai halaman terakhir. Sangat layak menjadi buku terbaik tahun ini.',
                'is_verified' => true,
            ],
            [
                'book_id' => $books['bayang-bayang-di-ujung-senja']->id,
                'user_name' => 'Siti Nurhaliza M.',
                'rating' => 5,
                'comment' => 'Kualitas cetakan dan kertas Pustaka Aksara luar biasa nyaman di mata. Aromanya khas buku mewah. Ceritanya menyentuh batin tentang ikatan orang tua dan anak.',
                'is_verified' => true,
            ],
            [
                'book_id' => $books['arsitektur-ketenangan']->id,
                'user_name' => 'Rian Hidayat',
                'rating' => 5,
                'comment' => 'Buku yang menyelamatkan saya dari burnout tahun ini. Dr. Irfan menjelaskan aspek neurologi dengan sangat renyah dan aplikatif. Latihan napasnya langsung saya terapkan setiap pagi.',
                'is_verified' => true,
            ],
            [
                'book_id' => $books['arsitektur-ketenangan']->id,
                'user_name' => 'Clara Anindita',
                'rating' => 5,
                'comment' => 'Hardcover edition-nya mewah sekali, cocok untuk kado sahabat atau koleksi pribadi di meja kerja.',
                'is_verified' => true,
            ],
            [
                'book_id' => $books['kecerdasan-buatan-dan-manusia-terakhir']->id,
                'user_name' => 'Bagas Wicaksono',
                'rating' => 5,
                'comment' => 'Buku AI berbahasa Indonesia paling berbobot yang pernah saya baca. Tidak sekadar optimisme buta, tapi ada renungan filosofis mendalam tentang masa depan anak cucu kita.',
                'is_verified' => true,
            ],
        ];

        foreach ($reviewsData as $rev) {
            Review::create($rev);
        }

        // 6. Manuscripts (Kirim Naskah simulation)
        Manuscript::create([
            'author_name' => 'Tari Kusumaningrum',
            'author_email' => 'tari.kusuma@gmail.com',
            'author_phone' => '081298765432',
            'title' => 'Menyulam Benang di Tepi Danau Toba',
            'category_id' => $categories['sastra-fiksi']->id,
            'genre' => 'Fiksi Budaya & Roman',
            'target_audience' => 'Pembaca dewasa muda dan penikmat sastra tradisi',
            'synopsis' => 'Kisah seorang penenun ulos muda yang berjuang mempertahankan filosofi motif leluhur di tengah arus komersialisasi pabrik tekstil modern.',
            'sample_chapter' => 'Suara ketukan alat tenun gedogan kayu itu mengalun bagai degup jantung Ompung... Setiap helai benang merah melambangkan keberanian, sedangkan benang hitam adalah kesabaran menahan duka.',
            'status' => 'reviewing',
            'editor_notes' => 'Gaya bahasa kuat, narasi tradisi sangat kental. Tim kurasi menyarankan diskusi lanjutan mengenai pemadatan bab awal.',
        ]);

        Manuscript::create([
            'author_name' => 'Dr. Hendra Gunawan',
            'author_email' => 'hendra.gunawan@techinst.ac.id',
            'author_phone' => '081345678901',
            'title' => 'Ekonomi Sirkular di Desa Nusantara',
            'category_id' => $categories['bisnis-ekonomi']->id,
            'genre' => 'Manajemen Lingkungan & Bisnis',
            'target_audience' => 'Pelaku UMKM desa, pembuat kebijakan, dan pegiat lingkungan hidup',
            'synopsis' => 'Model pengelolaan limbah organik pertanian terintegrasi menjadi sumber energi biogas dan pupuk hayati bernilai ekspor tinggi.',
            'sample_chapter' => 'Desa tidak boleh lagi diposisikan sebagai objek pasif penerima subsidi, melainkan produsen mandiri siklus nutrisi dan energi...',
            'status' => 'accepted',
            'editor_notes' => 'Disetujui untuk masuk tahap penyuntingan naskah (copyediting) terbitan kuartal ke-3.',
        ]);

        Manuscript::create([
            'author_name' => 'Anisa Rahmawati',
            'author_email' => 'anisa.rahma@outlook.com',
            'author_phone' => '087712345678',
            'title' => 'Catatan Kecil Guru di Pelosok Alor',
            'category_id' => $categories['pengembangan-diri']->id,
            'genre' => 'Memoar Inspiratif',
            'target_audience' => 'Pendidik, mahasiswa keguruan, dan masyarakat umum',
            'synopsis' => 'Catatan harian tiga tahun mengajar anak-anak pesisir di pulau terluar Nusa Tenggara Timur tanpa jaringan listrik dan buku pelajaran yang layak.',
            'sample_chapter' => 'Anak-anak itu berlari tanpa alas kaki menyeberangi muara ketika air surut hanya untuk mengejar jam masuk sekolah pukul tujuh pagi...',
            'status' => 'pending',
            'editor_notes' => null,
        ]);

        // 7. Orders & Order Items
        $order1 = Order::create([
            'order_number' => 'AKSAR-202611-0001',
            'user_id' => $reader->id,
            'customer_name' => 'Andi Pratama',
            'customer_email' => 'pembaca@aksara.id',
            'customer_phone' => '081234567890',
            'shipping_address' => 'Jl. Senopati Raya No. 42, Kebayoran Baru',
            'city' => 'Jakarta Selatan',
            'postal_code' => '12190',
            'courier' => 'JNE Reguler',
            'payment_method' => 'QRIS',
            'payment_status' => 'paid',
            'order_status' => 'shipped',
            'tracking_code' => 'JNE-AKS-88291039',
            'subtotal' => 203000,
            'shipping_cost' => 15000,
            'total_amount' => 218000,
            'notes' => 'Tolong berikan bookmark edisi khusus ya min. Terima kasih!',
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'book_id' => $books['bayang-bayang-di-ujung-senja']->id,
            'quantity' => 1,
            'price' => 95000,
            'subtotal' => 95000,
        ]);

        OrderItem::create([
            'order_id' => $order1->id,
            'book_id' => $books['arsitektur-ketenangan']->id,
            'quantity' => 1,
            'price' => 108000,
            'subtotal' => 108000,
        ]);

        $order2 = Order::create([
            'order_number' => 'AKSAR-202611-0002',
            'user_id' => null,
            'customer_name' => 'Dewi Anggraini',
            'customer_email' => 'dewi.ang@gmail.com',
            'customer_phone' => '085611223344',
            'shipping_address' => 'Jl. Dago Asri No. 18, Coblong',
            'city' => 'Bandung',
            'postal_code' => '40135',
            'courier' => 'SiCepat BEST',
            'payment_method' => 'BCA Virtual Account',
            'payment_status' => 'paid',
            'order_status' => 'processing',
            'tracking_code' => null,
            'subtotal' => 135000,
            'shipping_cost' => 18000,
            'total_amount' => 153000,
            'notes' => 'Bungkus dengan bubble wrap tebal ya.',
        ]);

        OrderItem::create([
            'order_id' => $order2->id,
            'book_id' => $books['lembayung-mataram']->id,
            'quantity' => 1,
            'price' => 135000,
            'subtotal' => 135000,
        ]);

        // 8. Articles
        Article::create([
            'title' => 'Panduan Lengkap Mengirim Naskah ke Penerbit Pustaka Aksara (Edisi 2026)',
            'slug' => 'panduan-lengkap-kirim-naskah-2026',
            'category' => 'Tips Menulis',
            'excerpt' => 'Pelajari kriteria kurasi dewan redaksi kami, format proposal penerbitan yang memikat, hingga tahapan evaluasi naskah fiksi maupun non-fiksi.',
            'content' => "Setiap bulan, dewan redaksi Pustaka Aksara menerima ratusan draf naskah dari para penulis di penjuru Nusantara. Naskah yang paling cepat mencuri perhatian redaksi bukan hanya yang memiliki ide brilian, melainkan naskah yang rapi secara struktur dan memiliki suara unik (authentic author voice).\n\nBerikut langkah-langkah persiapan sebelum mengunggah draf Anda melalui portal Kirim Naskah kami:\n\n1. Pastikan Naskah Selesai Secara Utuh\nBanyak penulis pemula mengirimkan draf bab satu saja. Redaksi kami membutuhkan sinopsis lengkap hingga akhir bab dan minimal 3 bab sampel pertama.\n\n2. Kenali Target Pembaca Anda\nJelaskan siapa yang akan membaca buku Anda. Apa keresahan yang dijawab oleh karya Anda?\n\n3. Uji Keterbacaan\nLakukan self-editing teliti sebelum mengirim naskah. Periksa konsistensi sudut pandang (POV) dan logika karakterisasi.",
            'cover_image' => 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80',
            'author_name' => 'Dewan Redaksi Aksara',
            'read_time' => '6 menit',
            'is_published' => true,
        ]);

        Article::create([
            'title' => 'Wawancara Eksklusif dengan Maya Kartika Dewi: Di Balik Bayang-bayang Kaliurang',
            'slug' => 'wawancara-maya-kartika-dewi',
            'category' => 'Wawancara Penulis',
            'excerpt' => 'Mengapa lereng Gunung Merapi dipilih sebagai latar novel terbarunya? Simak cerita riset mendalam Maya selama 6 bulan di museum dan desa-desa lereng gunung.',
            'content' => "Bagi Maya Kartika Dewi, sebuah tempat bukan sekadar latar belakang pemandangan, melainkan karakter yang hidup dan bernapas.\n\n'Ketika saya berkendara ke Kaliurang di kala senja dan kabut mulai turun perlahan, saya merasakan atmosfer magis yang seolah berbisik menuntut untuk diceritakan,' tutur Maya dalam sesi bincang hangat di Galeri Pustaka Aksara.\n\nNovel ini memadukan riset arsip lukisan era kolonial dengan dinamika psikologi modern, menjadikannya salah satu karya sastra paling dibicarakan tahun ini.",
            'cover_image' => 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=700&q=80',
            'author_name' => 'Tim Media Aksara',
            'read_time' => '4 menit',
            'is_published' => true,
        ]);

        Article::create([
            'title' => 'Mengapa Buku Fisik Kembali Menjadi Primadona Generasi Muda?',
            'slug' => 'mengapa-buku-fisik-kembali-dicintai',
            'category' => 'Kabar Literasi',
            'excerpt' => 'Di tengah kejenuhan terhadap layar gawai (screen fatigue), generasi digital justru menemukan ketenangan dan kenikmatan estetika dalam lembaran kertas beraroma harum.',
            'content' => "Data penjualan penerbit menunjukkan tren kenaikan stabil pada buku bersampul keras (hardcover) dan edisi kolektor dengan tata letak artistik. Membaca buku fisik kini bukan hanya tentang menyerap informasi, tetapi sebuah ritual mindfulness untuk melambatkan waktu.",
            'cover_image' => 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=700&q=80',
            'author_name' => 'Dr. Irfan Wicaksana',
            'read_time' => '5 menit',
            'is_published' => true,
        ]);
    }
}
