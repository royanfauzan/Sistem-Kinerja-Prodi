<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ewmp extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function profilDosen()
    {
        return $this->belongsTo(profilDosen::class, 'profil_dosen_id');
    }
}
