<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredBooks = Book::with(['author', 'category'])
            ->where('is_featured', true)
            ->take(5)
            ->get();

        $bestsellers = Book::with(['author', 'category'])
            ->where('is_bestseller', true)
            ->take(6)
            ->get();

        $newReleases = Book::with(['author', 'category'])
            ->where('is_new_release', true)
            ->take(6)
            ->get();

        $categories = Category::withCount('books')
            ->orderBy('is_popular', 'desc')
            ->take(6)
            ->get();

        $featuredAuthors = Author::withCount('books')
            ->where('is_featured', true)
            ->take(4)
            ->get();

        $latestArticles = Article::where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        $stats = [
            'total_books' => Book::count(),
            'total_authors' => Author::count(),
            'total_categories' => Category::count(),
            'satisfied_readers' => '150.000+',
            'literary_awards' => '18+',
        ];

        return Inertia::render('Home', [
            'featuredBooks' => $featuredBooks,
            'bestsellers' => $bestsellers,
            'newReleases' => $newReleases,
            'categories' => $categories,
            'featuredAuthors' => $featuredAuthors,
            'latestArticles' => $latestArticles,
            'stats' => $stats,
        ]);
    }

    public function about(): Response
    {
        $stats = [
            'books_published' => '500+',
            'authors_partnered' => '120+',
            'cities_reached' => '95 Kota',
            'years_experience' => '12 Tahun',
        ];

        return Inertia::render('About', [
            'stats' => $stats,
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('Services');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'required|string|max:150',
            'message' => 'required|string|max:2000',
        ]);

        return redirect()->back()->with('success', 'Pesan Anda berhasil terkirim! Tim redaksi Pustaka Aksara akan merespons dalam 1x24 jam kerja.');
    }

    public function sitemap()
    {
        $baseUrl = url('/');

        $books = Book::all();
        $authors = Author::all();
        $articles = Article::where('is_published', true)->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // Static Pages
        $staticPages = [
            ['loc' => $baseUrl, 'priority' => '1.0', 'changefreq' => 'daily'],
            ['loc' => $baseUrl . '/katalog', 'priority' => '0.9', 'changefreq' => 'daily'],
            ['loc' => $baseUrl . '/penulis', 'priority' => '0.8', 'changefreq' => 'weekly'],
            ['loc' => $baseUrl . '/artikel', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['loc' => $baseUrl . '/layanan-penerbitan', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/kirim-naskah', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/tentang-kami', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['loc' => $baseUrl . '/kontak', 'priority' => '0.5', 'changefreq' => 'monthly'],
        ];

        foreach ($staticPages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($page['loc']) . '</loc>';
            $xml .= '<changefreq>' . $page['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $page['priority'] . '</priority>';
            $xml .= '</url>';
        }

        // Books
        foreach ($books as $book) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($baseUrl . '/katalog/' . $book->slug) . '</loc>';
            $xml .= '<lastmod>' . ($book->updated_at ? $book->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }

        // Authors
        foreach ($authors as $author) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($baseUrl . '/penulis/' . $author->slug) . '</loc>';
            $xml .= '<lastmod>' . ($author->updated_at ? $author->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.7</priority>';
            $xml .= '</url>';
        }

        // Articles
        foreach ($articles as $article) {
            $xml .= '<url>';
            $xml .= '<loc>' . htmlspecialchars($baseUrl . '/artikel/' . $article->slug) . '</loc>';
            $xml .= '<lastmod>' . ($article->updated_at ? $article->updated_at->toAtomString() : now()->toAtomString()) . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.7</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
