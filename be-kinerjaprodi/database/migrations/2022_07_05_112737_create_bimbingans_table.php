<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBimbingansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bimbingans', function (Blueprint $table) {
            $table->id();
            $table->string('tahun_akademik');
            $table->string('judul_ta');
            $table->string('fileBukti');
            $table->foreignId('profil_dosen_id')->references('id')
                ->on('profil_dosens')
                ->onDelete('cascade');
            $table->foreignId('prodi_id')->references('id')
                ->on('prodis')
                ->onDelete('cascade');
            $table->foreignId('mahasiswa_id')->references('id')
                ->on('mahasiswas');
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
        Schema::dropIfExists('bimbingans');
    }
}
