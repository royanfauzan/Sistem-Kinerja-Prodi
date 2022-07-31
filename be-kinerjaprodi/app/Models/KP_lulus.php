<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KP_lulus extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
<<<<<<< HEAD
    public function prodi()
    {
        return $this->belongsTo(Prodi::class,'prodi_id','id');
    }
=======
>>>>>>> 616928e (validasi)
}
