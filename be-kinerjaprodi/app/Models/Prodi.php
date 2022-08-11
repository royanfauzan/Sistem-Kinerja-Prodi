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

    public function matkuls()
    {
        return $this->hasMany(Matkul::class,'prodi_id','id');
    }

    public function bimbingans()
    {
        return $this->hasMany(Bimbingan::class,'prodi_id','id');
    }
}
