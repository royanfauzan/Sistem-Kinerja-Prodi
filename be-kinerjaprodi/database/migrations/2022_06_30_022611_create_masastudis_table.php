<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasastudisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('masastudis', function (Blueprint $table) {
            $table->id();
            $table->string('tahun_masuk');
            $table->integer('jmlh_mhs');
            $table->integer('lulus_thn_1');
            $table->integer('lulus_thn_2');
            $table->integer('lulus_thn_3');
            $table->integer('lulus_thn_4');
            $table->foreignId('prodi_id');
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
        Schema::dropIfExists('masastudis');
    }
}
