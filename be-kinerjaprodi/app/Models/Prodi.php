<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodi extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function penggunaandana() {
        return $this->hasMany(PenggunaanDana::class);
    }

    public function penerimaan_mahasiswa() {
        return $this->hasMany(Penerimaan::class);
    }
}
