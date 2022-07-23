<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mitra extends Model
{
    use HasFactory;
    protected $fillable = [
        'namamitra',
        'alamat',
        'no_telepon',
        'nama_cp',
        'no_telp_cp',
        'email_cp',
        'bidang',
    ];

    public function kerjasama() {
        return $this->hasMany(Kerjasama::class);
    }
}
