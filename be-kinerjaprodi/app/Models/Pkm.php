<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pkm extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    
    public function anggotaDosens()
    {
        return $this->belongsToMany(profilDosen::class,'relasi_pkm_dos','pkm_id','profil_dosen_id')->withPivot('keanggotaan');
    }

    public function anggotaMahasiswas()
    {
        return $this->belongsToMany(Mahasiswa::class, 'relasi_pkm_mhs', 'pkm_id', 'mahasiswa_id')->withPivot('keanggotaan');
    }
}
