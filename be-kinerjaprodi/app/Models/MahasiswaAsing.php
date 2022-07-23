<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MahasiswaAsing extends Model
{
    use HasFactory;
    protected $fillable = [
        'Tahun_Akademik',
        'Program_Studi',
        'Mahasiswa_Aktif',
        'Mahasiswa_Aktif_Fulltime',
        'Mahasiswa_Aktif_Parttime',
        'Program_Studi_Prodi_Id'
    ];
    public function prodi() {
        return $this->belongsTo(Prodi::class,'Program_Studi_Prodi_Id','id');
    }
}
