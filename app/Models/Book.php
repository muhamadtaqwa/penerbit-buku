<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'category_id',
        'author_id',
        'isbn',
        'synopsis',
        'description',
        'cover_image',
        'price',
        'discount_price',
        'stock',
        'page_count',
        'publication_date',
        'language',
        'publisher',
        'format',
        'dimensions',
        'weight',
        'rating_avg',
        'reviews_count',
        'is_featured',
        'is_bestseller',
        'is_new_release',
        'sample_content',
    ];

    protected $casts = [
        'price' => 'float',
        'discount_price' => 'float',
        'stock' => 'integer',
        'page_count' => 'integer',
        'weight' => 'integer',
        'rating_avg' => 'float',
        'reviews_count' => 'integer',
        'is_featured' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_new_release' => 'boolean',
        'publication_date' => 'date',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class)->latest();
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
