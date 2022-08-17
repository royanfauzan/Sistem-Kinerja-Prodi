<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagelaran extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaMahasiswas()
    {
        return $this->belongsToMany(Mahasiswa::class, 'relasi_pagelaran_mhs', 'pagelaran_id', 'mahasiswa_id')->withPivot('keanggotaan');
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class,'prodi_id','id');
    }
}
