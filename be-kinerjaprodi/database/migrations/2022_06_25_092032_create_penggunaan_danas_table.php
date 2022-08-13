<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenggunaanDanasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penggunaan_danas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('Biaya_Dosen_Prodi');
            $table->bigInteger('Biaya_Dosen_UPPS');
            $table->bigInteger('Biaya_Investasi_Prasarana_Prodi');
            $table->bigInteger('Biaya_Investasi_Prasarana_UPPS');
            $table->bigInteger('Biaya_Investasi_Sarana_Prodi');
            $table->bigInteger('Biaya_Investasi_Sarana_UPPS');
            $table->bigInteger('Biaya_Investasi_SDM_Prodi');
            $table->bigInteger('Biaya_Investasi_SDM_UPPS');
            $table->bigInteger('Biaya_Operasional_Kemahasiswaan_Prodi');
            $table->bigInteger('Biaya_Operasional_Kemahasiswaan_UPPS');
            $table->bigInteger('Biaya_Operasional_Pembelajaran_Prodi');
            $table->bigInteger('Biaya_Operasional_Pembelajaran_UPPS');
            $table->bigInteger('Biaya_Operasional_TidakLangsung_Prodi');
            $table->bigInteger('Biaya_Operasional_TidakLangsung_UPPS');
            $table->bigInteger('Biaya_Tenaga_Kependidikan_Prodi');
            $table->bigInteger('Biaya_Tenaga_Kependidikan_UPPS');
            $table->foreignId('Prodi_Id');
            $table->string('Tahun');
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
        Schema::dropIfExists('penggunaan_danas');
    }
}
