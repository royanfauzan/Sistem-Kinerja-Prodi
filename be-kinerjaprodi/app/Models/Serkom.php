<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Serkom extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function detailDosen()
    {
        return $this->belongsTo(Detaildosen::class,'detaildosen_id','id');
    }
}
