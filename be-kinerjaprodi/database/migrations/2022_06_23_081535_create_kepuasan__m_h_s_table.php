<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKepuasanMHSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kepuasan__m_h_s', function (Blueprint $table) {
            $table->id();
            $table->string('tahun');
            $table->CHAR('keandalan_4');
            $table->CHAR('keandalan_3');
            $table->CHAR('keandalan_2');
            $table->CHAR('keandalan_1');
            $table->string('tl_keandalan');
            $table->CHAR('dayatanggap_4');
            $table->CHAR('dayatanggap_3');
            $table->CHAR('dayatanggap_2');
            $table->CHAR('dayatanggap_1');
            $table->string('tl_dayatanggap');
            $table->CHAR('kepastian_4');
            $table->CHAR('kepastian_3');
            $table->CHAR('kepastian_2');
            $table->CHAR('kepastian_1');
            $table->string('tl_kepastian');
            $table->CHAR('empati_4');
            $table->CHAR('empati_3');
            $table->CHAR('empati_2');
            $table->CHAR('empati_1');
            $table->string('tl_empati');
            $table->CHAR('tangible_4');
            $table->CHAR('tangible_3');
            $table->CHAR('tangible_2');
            $table->CHAR('tangible_1');
            $table->string('tl_tangible');
            $table->foreignId('prodi_id');
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
        Schema::dropIfExists('kepuasan__m_h_s');
    }
}
