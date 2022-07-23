<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penerimaan extends Model
{
    use HasFactory;
    protected $fillable = [
        'Tahun_Akademik',
        'Daya_Tampung',
        'Pendaftaran',
        'Lulus_Seleksi',
        'Maba_Reguler',
        'Maba_Transfer',
        'Mahasiswa_Aktif_Reguler',
        'Mahasiswa_Aktif_Transfer',
        'Program_Studi_Prodi_Id'
    ];
    public function prodi() {
        return $this->belongsTo(Prodi::class,'Program_Studi_Prodi_Id','id');
    }
}
