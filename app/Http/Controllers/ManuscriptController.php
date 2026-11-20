<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Manuscript;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ManuscriptController extends Controller
{
    public function create(): Response
    {
        $categories = Category::all();

        return Inertia::render('Manuscripts/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'author_name' => 'required|string|max:150',
            'author_email' => 'required|email|max:150',
            'author_phone' => 'required|string|max:30',
            'title' => 'required|string|max:200',
            'category_id' => 'nullable|exists:categories,id',
            'genre' => 'required|string|max:100',
            'target_audience' => 'required|string|max:150',
            'synopsis' => 'required|string|min:50|max:5000',
            'sample_chapter' => 'required|string|min:100|max:20000',
        ]);

        $manuscript = Manuscript::create($validated);

        return redirect()->route('manuscripts.success', $manuscript->id)
            ->with('success', 'Naskah Anda berhasil dikirimkan ke Dewan Redaksi Pustaka Aksara!');
    }

    public function success(int $id): Response
    {
        $manuscript = Manuscript::with('category')->findOrFail($id);

        return Inertia::render('Manuscripts/Success', [
            'manuscript' => $manuscript,
        ]);
    }
}
