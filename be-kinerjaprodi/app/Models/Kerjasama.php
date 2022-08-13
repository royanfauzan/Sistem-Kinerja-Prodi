<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kerjasama extends Model
{
    use HasFactory;
    protected $fillable = [
        'mitra_id',
        'tingkat',
        'judul_kegiatan',
        'manfaat',
        'tanggal_kegiatan',
        'lama_kegiatan',
        'bukti_kerjasama',
        'tahun_berakhir',
        'bidang',
        'file_bukti'
    ];
    public function Mitra() {
        return $this->belongsTo(Mitra::class,'mitra_id','id');
    }
}
