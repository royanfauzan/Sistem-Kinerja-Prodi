<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBbjurnaldosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bbjurnaldos', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('kategori_jurnal');
            $table->string('nm_jurnal')->default('');
            $table->string('keterangan')->default('');
            $table->string('volume');
            $table->string('tahun');
            $table->string('nomor')->default('');
            $table->string('halaman');
            $table->integer('sitasi')->default(0);
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
        Schema::dropIfExists('bbjurnaldos');
    }
}
