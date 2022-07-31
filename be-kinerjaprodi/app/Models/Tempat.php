<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tempat extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
<<<<<<< HEAD

    public function kepuasan()
    {
        return $this->belongsTo(KP_lulus::class,'kepuasan_id','id');
    }
=======
>>>>>>> 616928e (validasi)
}
