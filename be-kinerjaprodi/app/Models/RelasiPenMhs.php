<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelasiPenMhs extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class,'mahasiswa_id','id');
    }

    public function penelitian()
    {
        return $this->belongsTo(Penelitian::class,'penelitian_id','id');
    }
}

