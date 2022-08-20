<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSerkomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('serkoms', function (Blueprint $table) {
            $table->id();
            $table->string('nama_skema');
            $table->text('nomor_sertifikat');
            $table->string('tanggal_sertif');
            $table->string('lembaga_sertifikasi')->default('');
            $table->string('dikeluarkan_oleh')->default('');
            $table->string('file_bukti');
            $table->foreignId('profil_dosen_id')
                    ->references('id')
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
        Schema::dropIfExists('serkoms');
    }
}
