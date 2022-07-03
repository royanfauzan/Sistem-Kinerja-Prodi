<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenelitiansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penelitians', function (Blueprint $table) {
            $table->id();
            $table->string('tema_sesuai_roadmap');
            $table->string('judul');
            $table->string('tahun');
            $table->string('sumber_dana_PT_mandiri')->nullable();
            $table->bigInteger('dana_PT_Mandiri')->nullable();
            $table->string('sumber_dalam_negri')->nullable();
            $table->bigInteger('dana_dalam_negri')->nullable();
            $table->string('sumber_luar_negri')->nullable();
            $table->bigInteger('dana_luar_negri')->nullable();
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
        Schema::dropIfExists('penelitians');
    }
}
