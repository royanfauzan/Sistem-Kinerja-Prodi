<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pagelarandos extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaDosens()
    {
        return $this->belongsToMany(profilDosen::class,'relasi_pag_dos','pagelarandos_id','profil_dosen_id')->withPivot('keanggotaan','id');
    }
}
