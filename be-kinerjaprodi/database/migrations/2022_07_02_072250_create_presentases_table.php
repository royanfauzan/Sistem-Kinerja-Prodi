<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePresentasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('presentases', function (Blueprint $table) {
            $table->id();
            $table->integer('etika_4');
            $table->integer('etika_3');
            $table->integer('etika_2');
            $table->integer('etika_1');
            $table->string('tindak_etika');
            $table->integer('keahlian_bidang_4');
            $table->integer('keahlian_bidang_3');
            $table->integer('keahlian_bidang_2');
            $table->integer('keahlian_bidang_1');
            $table->string('tindak_bidang');
            $table->integer('bhs_asing_4');
            $table->integer('bhs_asing_3');
            $table->integer('bhs_asing_2');
            $table->integer('bhs_asing_1');
            $table->string('tindak_bhs');
            $table->integer('penggunaan_ti_4');
            $table->integer('penggunaan_ti_3');
            $table->integer('penggunaan_ti_2');
            $table->integer('penggunaan_ti_1');
            $table->string('tindak_ti');
            $table->integer('komunikasi_4');
            $table->integer('komunikasi_3');
            $table->integer('komunikasi_2');
            $table->integer('komunikasi_1');
            $table->string('tindak_komunikasi');
            $table->integer('kerjasama_4');
            $table->integer('kerjasama_3');
            $table->integer('kerjasama_2');
            $table->integer('kerjasama_1');
            $table->string('tindak_kerjasama');
            $table->integer('pengembangan_diri_4');
            $table->integer('pengembangan_diri_3');
            $table->integer('pengembangan_diri_2');
            $table->integer('pengembangan_diri_1');
            $table->string('tindak_pengembangan');
            $table->foreignId('kepuasan_id');
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
        Schema::dropIfExists('presentases');
    }
}
