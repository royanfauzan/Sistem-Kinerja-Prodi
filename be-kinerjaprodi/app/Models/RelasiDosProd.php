<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelasiDosProd extends Model
{
    use HasFactory;

    public function profil_dosen()
    {
        return $this->belongsTo(profilDosen::class, 'profil_dosen_id', 'id');
    }

    public function penelitian()
    {
        return $this->belongsTo(Produk::class, 'produk_id', 'id');
    }
}
