<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Luaranlainnya extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaMahasiswas()
    {
        return $this->belongsToMany(Mahasiswa::class, 'relasi_luaran_mhs', 'luaranlainnya_id', 'mahasiswa_id')->withPivot('keanggotaan');
    }
}
