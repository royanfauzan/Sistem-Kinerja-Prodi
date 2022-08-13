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
        return $this->belongsTo(Matkul::class,'matkul_ID','id');
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class,'prodi_ID','id');
    }
}
