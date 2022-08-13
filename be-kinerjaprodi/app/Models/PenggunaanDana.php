<?php

namespace App\Models;

use Brick\Math\BigInteger;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PenggunaanDana extends Model
{
    use HasFactory;
    protected $fillable = [
    'Biaya_Dosen_Prodi',
    'Biaya_Dosen_UPPS',
    'Biaya_Investasi_Prasarana_Prodi',
    'Biaya_Investasi_Prasarana_UPPS',
    'Biaya_Investasi_Sarana_Prodi',
    'Biaya_Investasi_Sarana_UPPS',
    'Biaya_Investasi_SDM_Prodi',
    'Biaya_Investasi_SDM_UPPS',
    'Biaya_Operasional_Kemahasiswaan_Prodi',
    'Biaya_Operasional_Kemahasiswaan_UPPS',
    'Biaya_Operasional_Pembelajaran_Prodi',
    'Biaya_Operasional_Pembelajaran_UPPS',
    'Biaya_Operasional_TidakLangsung_Prodi',
    'Biaya_Operasional_TidakLangsung_UPPS',
    'Biaya_Tenaga_Kependidikan_Prodi',
    'Biaya_Tenaga_Kependidikan_UPPS',
    'Guna_Dana_Id',
    'Prodi_Id',
    'Tahun'
];
public function prodi() {
    return $this->belongsTo(Prodi::class,'Prodi_Id','id');
}
}
