<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->default('BookOpen');
            $table->boolean('is_popular')->default(true);
            $table->timestamps();
        });

        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('avatar_url')->nullable();
            $table->string('tagline')->nullable();
            $table->text('bio')->nullable();
            $table->text('awards')->nullable();
            $table->string('website')->nullable();
            $table->string('instagram')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });

        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->foreignId('author_id')->constrained('authors')->cascadeOnDelete();
            $table->string('isbn')->unique();
            $table->text('synopsis');
            $table->longText('description')->nullable();
            $table->string('cover_image');
            $table->decimal('price', 12, 2);
            $table->decimal('discount_price', 12, 2)->nullable();
            $table->integer('stock')->default(50);
            $table->integer('page_count')->default(250);
            $table->date('publication_date')->nullable();
            $table->string('language')->default('Bahasa Indonesia');
            $table->string('publisher')->default('Pustaka Aksara Press');
            $table->string('format')->default('Paperback'); // Hardcover, Paperback, E-Book
            $table->string('dimensions')->default('13.5 x 20 cm');
            $table->integer('weight')->default(280); // in grams
            $table->decimal('rating_avg', 3, 2)->default(4.8);
            $table->integer('reviews_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_bestseller')->default(false);
            $table->boolean('is_new_release')->default(false);
            $table->longText('sample_content')->nullable();
            $table->timestamps();
        });

        Schema::create('manuscripts', function (Blueprint $table) {
            $table->id();
            $table->string('author_name');
            $table->string('author_email');
            $table->string('author_phone');
            $table->string('title');
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('genre')->nullable();
            $table->string('target_audience')->nullable();
            $table->text('synopsis');
            $table->longText('sample_chapter');
            $table->string('status')->default('pending'); // pending, reviewing, accepted, revision, rejected
            $table->text('editor_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->text('shipping_address');
            $table->string('city');
            $table->string('postal_code');
            $table->string('courier')->default('JNE Reguler');
            $table->string('payment_method')->default('qris');
            $table->string('payment_status')->default('paid'); // paid, unpaid, cancelled
            $table->string('order_status')->default('processing'); // processing, packaged, shipped, delivered
            $table->string('tracking_code')->nullable();
            $table->decimal('subtotal', 12, 2);
            $table->decimal('shipping_cost', 12, 2)->default(15000);
            $table->decimal('total_amount', 12, 2);
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
            $table->integer('quantity')->default(1);
            $table->decimal('price', 12, 2);
            $table->decimal('subtotal', 12, 2);
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Kabar Literasi');
            $table->text('excerpt');
            $table->longText('content');
            $table->string('cover_image')->nullable();
            $table->string('author_name')->default('Redaksi Pustaka Aksara');
            $table->string('read_time')->default('5 menit');
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
            $table->string('user_name');
            $table->integer('rating')->default(5);
            $table->text('comment');
            $table->boolean('is_verified')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('manuscripts');
        Schema::dropIfExists('books');
        Schema::dropIfExists('authors');
        Schema::dropIfExists('categories');
    }
};
