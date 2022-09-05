<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bimbingan extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function prodi()
    {
        return $this->belongsTo(Prodi::class,'prodi_id','id');
    }

    public function profilDosen()
    {
        return $this->belongsTo(profilDosen::class,'profil_dosen_id','id');
    }

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class,'mahasiswa_id','id');
    }
}
