<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Manuscript;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(): Response
    {
        $stats = [
            'total_books' => Book::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::sum('total_amount'),
            'pending_manuscripts' => Manuscript::where('status', 'pending')->count(),
            'total_authors' => Author::count(),
        ];

        $recentOrders = Order::with('items.book')
            ->latest()
            ->take(5)
            ->get();

        $recentManuscripts = Manuscript::with('category')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'recentManuscripts' => $recentManuscripts,
        ]);
    }

    public function books(): Response
    {
        $books = Book::with(['author', 'category'])->latest()->paginate(10);
        $authors = Author::orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Admin/Books', [
            'books' => $books,
            'authors' => $authors,
            'categories' => $categories,
        ]);
    }

    public function storeBook(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'subtitle' => 'nullable|string|max:250',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'isbn' => 'required|string|unique:books,isbn',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'page_count' => 'required|integer|min:1',
            'format' => 'required|string',
            'cover_image' => 'required|url',
            'synopsis' => 'required|string',
            'sample_content' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_new_release' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . rand(100, 999);
        Book::create($validated);

        return redirect()->back()->with('success', 'Buku baru berhasil ditambahkan ke katalog!');
    }

    public function updateBook(Request $request, int $id)
    {
        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'subtitle' => 'nullable|string|max:250',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'isbn' => 'required|string|unique:books,isbn,' . $book->id,
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'page_count' => 'required|integer|min:1',
            'format' => 'required|string',
            'cover_image' => 'required|url',
            'synopsis' => 'required|string',
            'sample_content' => 'nullable|string',
            'is_featured' => 'boolean',
            'is_bestseller' => 'boolean',
            'is_new_release' => 'boolean',
        ]);

        $book->update($validated);

        return redirect()->back()->with('success', 'Data buku berhasil diperbarui!');
    }

    public function destroyBook(int $id)
    {
        $book = Book::findOrFail($id);
        $book->delete();

        return redirect()->back()->with('success', 'Buku berhasil dihapus dari katalog.');
    }

    public function manuscripts(): Response
    {
        $manuscripts = Manuscript::with('category')->latest()->paginate(10);

        return Inertia::render('Admin/Manuscripts', [
            'manuscripts' => $manuscripts,
        ]);
    }

    public function updateManuscript(Request $request, int $id)
    {
        $manuscript = Manuscript::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,reviewing,accepted,revision,rejected',
            'editor_notes' => 'nullable|string',
        ]);

        $manuscript->update($validated);

        return redirect()->back()->with('success', 'Status naskah berhasil diperbarui!');
    }

    public function orders(): Response
    {
        $orders = Order::with('items.book')->latest()->paginate(10);

        return Inertia::render('Admin/Orders', [
            'orders' => $orders,
        ]);
    }

    public function updateOrder(Request $request, int $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'order_status' => 'required|in:processing,packaged,shipped,delivered,cancelled',
            'tracking_code' => 'nullable|string',
        ]);

        $order->update($validated);

        return redirect()->back()->with('success', 'Status pesanan berhasil diperbarui!');
    }
}
