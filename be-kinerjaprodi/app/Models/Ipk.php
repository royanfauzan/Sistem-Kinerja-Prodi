<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ipk extends Model
{
    protected $guarded = ["id"];
    use HasFactory;
    
    public function prodi()
    {
        return $this->belongsTo(Prodi::class,'prodi_id','id');
    }
}
