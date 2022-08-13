<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KP_lulus extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function prodi()
    {
        return $this->belongsTo(Prodi::class,'prodi_id','id');
    }

    public function kesesuaian()
    {
        return $this->hasOne(Kasesuaian::class,'kepuasan_id','id');
    }

    public function tempat()
    {
        return $this->hasOne(Tempat::class,'kepuasan_id','id');
    }

    public function waktu()
    {
        return $this->hasOne(Waktutunggu::class,'kepuasan_id','id');
    }
}
