<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Article::where('is_published', true);

        if ($request->filled('category')) {
            $query->where('category', $request->input('category'));
        }

        $articles = $query->latest()->paginate(9)->withQueryString();
        $categories = Article::select('category')->distinct()->pluck('category');

        return Inertia::render('Articles/Index', [
            'articles' => $articles,
            'categories' => $categories,
            'selectedCategory' => $request->input('category', ''),
        ]);
    }

    public function show(string $slug): Response
    {
        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $relatedArticles = Article::where('id', '!=', $article->id)
            ->where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Articles/Show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
