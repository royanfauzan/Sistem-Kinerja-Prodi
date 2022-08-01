<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMahasiswaAsingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mahasiswa_asings', function (Blueprint $table) {
            $table->id();
            $table->string('Tahun_Akademik');
            $table->string('Mahasiswa_Aktif');
            $table->string('Mahasiswa_Aktif_Fulltime');
            $table->string('Mahasiswa_Aktif_Parttime');
            $table->foreignId('Program_Studi_Prodi_Id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mahasiswa_asings');
    }
}
