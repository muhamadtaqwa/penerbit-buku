<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ManuscriptController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public Front-Facing Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/sitemap.xml', [HomeController::class, 'sitemap'])->name('sitemap');
Route::get('/tentang-kami', [HomeController::class, 'about'])->name('about');
Route::get('/layanan-penerbitan', [HomeController::class, 'services'])->name('services');
Route::get('/kontak', [HomeController::class, 'contact'])->name('contact');
Route::post('/kontak', [HomeController::class, 'submitContact'])->name('contact.submit');

// Catalog & Books
Route::get('/katalog', [BookController::class, 'index'])->name('books.index');
Route::get('/katalog/{slug}', [BookController::class, 'show'])->name('books.show');

// Authors
Route::get('/penulis', [AuthorController::class, 'index'])->name('authors.index');
Route::get('/penulis/{slug}', [AuthorController::class, 'show'])->name('authors.show');

// Manuscripts Submission
Route::get('/kirim-naskah', [ManuscriptController::class, 'create'])->name('manuscripts.create');
Route::post('/kirim-naskah', [ManuscriptController::class, 'store'])->name('manuscripts.store');
Route::get('/kirim-naskah/sukses/{id}', [ManuscriptController::class, 'success'])->name('manuscripts.success');

// News & Articles
Route::get('/artikel', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/artikel/{slug}', [ArticleController::class, 'show'])->name('articles.show');

// Shopping & Checkout
Route::get('/keranjang', [OrderController::class, 'cart'])->name('cart');
Route::get('/checkout', [OrderController::class, 'checkout'])->name('checkout');
Route::post('/checkout', [OrderController::class, 'store'])->name('orders.store');
Route::get('/pesanan/{orderNumber}', [OrderController::class, 'show'])->name('orders.show');
Route::get('/lacak-pesanan', [OrderController::class, 'track'])->name('orders.track');

// User Dashboard & Profile (Standard Breeze)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Panel (Accessible for publisher team, auth optional or open for quick demo inspection)
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/buku', [AdminController::class, 'books'])->name('books');
    Route::post('/buku', [AdminController::class, 'storeBook'])->name('books.store');
    Route::put('/buku/{id}', [AdminController::class, 'updateBook'])->name('books.update');
    Route::delete('/buku/{id}', [AdminController::class, 'destroyBook'])->name('books.destroy');
    Route::get('/naskah', [AdminController::class, 'manuscripts'])->name('manuscripts');
    Route::patch('/naskah/{id}', [AdminController::class, 'updateManuscript'])->name('manuscripts.update');
    Route::get('/pesanan', [AdminController::class, 'orders'])->name('orders');
    Route::patch('/pesanan/{id}', [AdminController::class, 'updateOrder'])->name('orders.update');
});

require __DIR__.'/auth.php';
