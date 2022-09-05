<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bbjurnaldos extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaDosens()
    {
        return $this->belongsToMany(profilDosen::class,'relasi_jur_dos','bbjurnaldos_id','profil_dosen_id')->withPivot('keanggotaan','id');
    }

    public function ketuaJurnal()
    {
        return $this->belongsToMany(profilDosen::class,'relasi_jur_dos','bbjurnaldos_id','profil_dosen_id')->withPivot('keanggotaan')->wherePivot('keanggotaan','ketua')->latest();
    }
}
