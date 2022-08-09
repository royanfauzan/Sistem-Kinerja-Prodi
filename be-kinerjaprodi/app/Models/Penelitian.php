<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penelitian extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaDosens()
    {
        return $this->belongsToMany(profilDosen::class,'relasi_dos_pens','penelitian_id','profil_dosen_id')->withPivot('keanggotaan');
    }

    public function anggotaMahasiswas()
    {
        return $this->belongsToMany(Mahasiswa::class, 'relasi_pen_mhs', 'penelitian_id', 'mahasiswa_id')->withPivot('keanggotaan');
    }
}
