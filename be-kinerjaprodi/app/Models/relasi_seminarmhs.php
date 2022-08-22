<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class relasi_seminarmhs extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    
    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class,'mahasiswa_id','id');
    }

    public function seminar()
    {
        return $this->belongsTo(Seminar::class,'seminar_id','id');
    }
}
