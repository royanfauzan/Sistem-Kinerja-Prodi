<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelasiDosPen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function dosen()
    {
        return $this->belongsTo(profilDosen::class,'profil_dosen_id','id');
    }

    public function penelitian()
    {
        return $this->belongsTo(Penelitian::class,'penelitian_id','id');
    }
}
