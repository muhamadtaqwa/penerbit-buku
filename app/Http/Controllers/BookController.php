<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Book::with(['author', 'category']);

        // Search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%")
                  ->orWhere('isbn', 'like', "%{$search}%")
                  ->orWhereHas('author', function ($authorQuery) use ($search) {
                      $authorQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Category filter
        if ($request->filled('category')) {
            $catSlug = $request->input('category');
            $query->whereHas('category', function ($q) use ($catSlug) {
                $q->where('slug', $catSlug);
            });
        }

        // Format filter
        if ($request->filled('format')) {
            $query->where('format', $request->input('format'));
        }

        // Sorting
        $sort = $request->input('sort', 'latest');
        switch ($sort) {
            case 'popular':
                $query->orderBy('reviews_count', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating_avg', 'desc');
                break;
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'bestseller':
                $query->where('is_bestseller', true)->latest();
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        $books = $query->paginate(12)->withQueryString();
        $categories = Category::withCount('books')->get();

        return Inertia::render('Books/Index', [
            'books' => $books,
            'categories' => $categories,
            'filters' => [
                'search' => $request->query('search', ''),
                'category' => $request->query('category', ''),
                'format' => $request->query('format', ''),
                'sort' => $request->query('sort', 'latest'),
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $book = Book::with(['author', 'category', 'reviews'])
            ->where('slug', $slug)
            ->firstOrFail();

        $relatedBooks = Book::with(['author', 'category'])
            ->where('id', '!=', $book->id)
            ->where(function ($q) use ($book) {
                $q->where('category_id', $book->category_id)
                  ->orWhere('author_id', $book->author_id);
            })
            ->take(4)
            ->get();

        return Inertia::render('Books/Show', [
            'book' => $book,
            'relatedBooks' => $relatedBooks,
        ]);
    }
}
