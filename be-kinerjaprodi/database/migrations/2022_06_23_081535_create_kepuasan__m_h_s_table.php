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
            $table->integer('keandalan_4');
            $table->integer('keandalan_3');
            $table->integer('keandalan_2');
            $table->integer('keandalan_1');
            $table->string('tl_keandalan');
            $table->integer('dayatanggap_4');
            $table->integer('dayatanggap_3');
            $table->integer('dayatanggap_2');
            $table->integer('dayatanggap_1');
            $table->string('tl_dayatanggap');
            $table->integer('kepastian_4');
            $table->integer('kepastian_3');
            $table->integer('kepastian_2');
            $table->integer('kepastian_1');
            $table->string('tl_kepastian');
            $table->integer('empati_4');
            $table->integer('empati_3');
            $table->integer('empati_2');
            $table->integer('empati_1');
            $table->string('tl_empati');
            $table->integer('tangible_4');
            $table->integer('tangible_3');
            $table->integer('tangible_2');
            $table->integer('tangible_1');
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
