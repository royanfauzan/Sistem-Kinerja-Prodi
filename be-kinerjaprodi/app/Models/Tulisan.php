<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tulisan extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function dosen()
    {
        return $this->belongsTo(profilDosen::class,'dosen_id','id');
    }
}
