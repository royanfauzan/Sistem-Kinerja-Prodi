<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaDosens()
    {
        return $this->belongsToMany(profilDosen::class,'relasi_dos_prods','produk_id','profil_dosen_id')->withPivot('keanggotaan','id');
    }

    public function ketuaProduk()
    {
        return $this->belongsToMany(profilDosen::class,'relasi_dos_prods','produk_id','profil_dosen_id')->withPivot('keanggotaan')->wherePivot('keanggotaan','ketua')->latest();
    }
}
