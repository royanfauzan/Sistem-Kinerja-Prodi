<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelasiDosProdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relasi_dos_prods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profil_dosen_id')
                ->references('id')
                ->on('profil_dosens')
                ->onDelete('cascade');
            $table->foreignId('produk_id')->references('id')
                ->on('produks')
                ->onDelete('cascade');
            $table->string('keanggotaan')->default('anggota');
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
        Schema::dropIfExists('relasi_dos_prods');
    }
}
