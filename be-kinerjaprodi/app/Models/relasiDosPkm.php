<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class profilDosen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function profil_dosen()
    {
        return $this->belongsTo(profilDosen::class, 'profil_dosen_id', 'id');
    }

    public function penelitian()
    {
        return $this->belongsTo(Penelitian::class, 'penelitian_id', 'id');
    }
}
