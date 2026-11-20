<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Manuscript extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_name',
        'author_email',
        'author_phone',
        'title',
        'category_id',
        'genre',
        'target_audience',
        'synopsis',
        'sample_chapter',
        'status',
        'editor_notes',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
