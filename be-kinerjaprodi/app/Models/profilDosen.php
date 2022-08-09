<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profilDosen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function produks()
    {
        return $this->belongsToMany(Produk::class,'relasi_dos_prods','profil_dosen_id','produk_id')->withPivot('keanggotaan');
    }

    public function mengajars()
    {
        return $this->hasMany(Mengajar::class,'profil_dosen_id','id');
    }

    public function pendidikans()
    {
        return $this->hasMany(Pendidikan::class,'profil_dosen_id','id');
    }
}
