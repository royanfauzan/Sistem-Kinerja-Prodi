<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penelitian extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function penelitian()
    {
        return $this->belongsToMany(ProfilDosen::class, 'NamaDosen');
    }
}
