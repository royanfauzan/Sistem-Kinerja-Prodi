<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seminar extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function anggotaMahasiswas()
    {
        return $this->belongsToMany(Mahasiswa::class, 'relasi_seminarmhs', 'seminar_id', 'mahasiswa_id')->withPivot('keanggotaan');
    }
}
