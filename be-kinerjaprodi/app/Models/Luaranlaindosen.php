<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Luaranlaindosen extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function anggotaDosens()
    {
        return $this->belongsToMany(profilDosen::class, 'rel_luar_dos', 'luaranlaindosen_id', 'profil_dosen_id')->withPivot('keanggotaan','id');
    }
}
