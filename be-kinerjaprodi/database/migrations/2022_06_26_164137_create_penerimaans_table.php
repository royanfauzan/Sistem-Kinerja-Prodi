<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenerimaansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penerimaans', function (Blueprint $table) {
            $table->id();
            $table->string('Tahun_Akademik');
            $table->string('Daya_Tampung');
            $table->string('Pendaftaran');
            $table->string('Lulus_Seleksi');
            $table->string('Maba_Reguler');
            $table->string('Maba_Transfer');
            $table->string( 'Mahasiswa_Aktif_Reguler');
            $table->string( 'Mahasiswa_Aktif_Transfer');
            $table->foreignId('Program_Studi_Prodi_Id');
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
        Schema::dropIfExists('penerimaans');
    }
}
