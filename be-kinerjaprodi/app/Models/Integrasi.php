<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Integrasi extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    

    public function profil_dosen()
    {
        return $this->belongsTo(profilDosen::class,'dosen_id','id');
    }
    
    public function penelitian()
    {
        return $this->belongsTo(Penelitian::class,'penelitian_id','id');
    }

    public function pkm()
    {
        return $this->belongsTo(Pkm::class,'PkM_id','id');
    }
    public function matkul()
    {
        return $this->belongsTo(Matkul::class,'matkul_id','id');
    }
}
