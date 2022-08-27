<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilDosensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profil_dosens', function (Blueprint $table) {
            $table->id();
            $table->string('NIDK');
            $table->foreign('NIDK')->references('NIDK')
                ->on('users')->onUpdate('cascade');
            $table->string('NamaDosen');
            $table->string('NIK');
            $table->string('TempatLahir')->default('');
            $table->string('TanggalLahir')->default('1970-01-01');
            $table->string('JenisKelamin')->default('Laki-Laki');
            $table->string('StatusPerkawinan')->default('Kawin');
            $table->string('Agama')->default('');
            $table->string('StatusDosen')->default("Dosen Tetap");
            $table->string('Golongan')->default("");
            $table->string('Pangkat')->default("");
            $table->string('JabatanAkademik')->default("");
            $table->string('Alamat')->default("");
            $table->string('NoTelepon')->default("");
            $table->string('Email')->default("");
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
        Schema::dropIfExists('profil_dosens');
    }
}
