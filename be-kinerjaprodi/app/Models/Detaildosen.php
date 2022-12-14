<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detaildosen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function serkoms()
    {
        return $this->hasMany(Serkom::class,'detaildosen_id','id');
    }

    public function profilDosen()
    {
        return $this->belongsTo(profilDosen::class,'profil_dosen_id','id');
    }
}
