<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = ['display_name', 'hashed_name', 'cover_photo', 'album_id', 'user_id'];
    
    public function album()
    {
        return $this->belongsTo(Album::class, 'album_id', 'album_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function listens()
    {
        return $this->hasMany(Listen::class);
    }
}
