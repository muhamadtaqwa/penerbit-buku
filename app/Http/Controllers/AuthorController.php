<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    public function index(): Response
    {
        $authors = Author::withCount('books')
            ->orderBy('is_featured', 'desc')
            ->orderBy('name')
            ->get();

        return Inertia::render('Authors/Index', [
            'authors' => $authors,
        ]);
    }

    public function show(string $slug): Response
    {
        $author = Author::with(['books.category'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Authors/Show', [
            'author' => $author,
        ]);
    }
}
