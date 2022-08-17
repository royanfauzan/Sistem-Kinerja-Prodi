<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelasiPkmMhs extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    
    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class,'mahasiswa_id','id');
    }

    public function pkm()
    {
        return $this->belongsTo(Pkm::class,'pkm_id','id');
    }
}

