<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTulisandosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tulisandos', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('tahun');
            $table->string('nm_media');
            $table->string('ruang_lingkup');
            $table->string('file_bukti');
            $table->foreignId('profil_dosen_id')->references('id')
                ->on('profil_dosens')
                ->onDelete('cascade');
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
        Schema::dropIfExists('tulisandos');
    }
}
