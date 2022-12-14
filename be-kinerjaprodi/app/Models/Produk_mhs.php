<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk_mhs extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaMahasiswas()
    {
        return $this->belongsToMany(Mahasiswa::class, 'relasi_produkmhs', 'produk_id', 'mahasiswa_id')->withPivot('keanggotaan');
    }
}
