<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapKurikulum extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    
    public function matkul()
    {
        return $this->belongsTo(Matkul::class,'matkul_ID','id'); //matkul_ID salah satu kolom digunakan sebagai penghubung antara cap kurikulum &matkul 
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class,'prodi_ID','id');
    }

    
}
