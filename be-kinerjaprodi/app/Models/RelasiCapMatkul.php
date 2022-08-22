<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelasiCapMatkul extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public function capkurikulum()
    {
        return $this->belongsTo(CapKurikulum::class, 'cap_kurikulum_id', 'id');
    }

    public function matkul()
    {
        return $this->belongsTo(Matkul::class, 'matkul_id', 'id');
    }
}