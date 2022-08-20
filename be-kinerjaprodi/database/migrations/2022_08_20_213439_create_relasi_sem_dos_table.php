<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelasiSemDosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relasi_sem_dos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seminardos_id')->references('id')
                ->on('seminardos')
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
        Schema::dropIfExists('relasi_sem_dos');
    }
}
