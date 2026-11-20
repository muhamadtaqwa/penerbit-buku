<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'avatar_url',
        'tagline',
        'bio',
        'awards',
        'website',
        'instagram',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
