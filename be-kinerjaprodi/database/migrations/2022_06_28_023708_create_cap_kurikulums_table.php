<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCapKurikulumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cap_kurikulums', function (Blueprint $table) {
            $table->id();
            $table->string('semester');
            $table->string('tahun');
            $table->string('mata_kuliah_kompetensi');
            $table->smallInteger('kuliah_responsi_tutorial');
            $table->smallInteger('seminar');
            $table->smallInteger('praktikum');
            $table->smallInteger('konversi_kredit_jam');
            $table->string('sikap');
            $table->string('pengetahuan');
            $table->string('ketrampilan_umum');
            $table->string('ketrampilan_khusus');
            $table->string('dok_ren_pembelajaran');
            $table->string('unit_penyelenggara');
            $table->foreignId('prodi_ID');
            $table->foreignId('matkul_ID');
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
        Schema::dropIfExists('cap_kurikulums');
    }
}
