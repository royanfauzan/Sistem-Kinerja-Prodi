<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelasiJurDosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relasi_jur_dos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bbjurnaldos_id')->references('id')
                ->on('bbjurnaldos')
                ->onDelete('cascade');
            $table->foreignId('profil_dosen_id')->references('id')
                ->on('profil_dosens')
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
        Schema::dropIfExists('relasi_jur_dos');
    }
}
