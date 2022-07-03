<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIntegrasisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('integrasis', function (Blueprint $table) {
            $table->id();
            $table->string('bentuk_integrasi');
            $table->string('tahun');
            $table->string('file_bukti');
            $table->foreignId('dosen_id');
            $table->foreignId('penelitian_id');
            $table->foreignId('PkM_id');
            $table->foreignId('matkul_id');
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
        Schema::dropIfExists('integrasis');
    }
}
