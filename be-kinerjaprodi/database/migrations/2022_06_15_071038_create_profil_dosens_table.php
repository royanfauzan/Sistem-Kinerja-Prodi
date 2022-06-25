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
            $table->foreignId('NIDK');
            $table->string('NamaDosen');
            $table->string('NIK');
            $table->string('TempatLahir');
            $table->string('TanggalLahir');
            $table->string('JenisKelamin');
            $table->string('StatusPerkawinan');
            $table->string('Agama');
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
