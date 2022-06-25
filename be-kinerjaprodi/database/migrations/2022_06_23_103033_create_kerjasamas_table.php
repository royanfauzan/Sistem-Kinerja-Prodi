<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKerjasamasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kerjasamas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mitra_id');
            $table->string('tingkat');
            $table->string('judul_kegiatan');
            $table->string('manfaat');
            $table->string('tanggal_kegiatan');
            $table->string('lama_kegiatan');
            $table->string('bukti_kerjasama');
            $table->string('tahun_berakhir');
            $table->string('bidang');
            $table->string('file_bukti');
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
        Schema::dropIfExists('kerjasamas');
    }
}
