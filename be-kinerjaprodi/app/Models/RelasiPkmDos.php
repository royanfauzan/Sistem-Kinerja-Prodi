<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelasiPkmDos extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    
    public function dosen()
    {
        return $this->belongsTo(profilDosen::class,'profil_dosen_id','id');
    }

    public function pkm()
    {
        return $this->belongsTo(Pkm::class,'pkm_id','id');
    }
}
