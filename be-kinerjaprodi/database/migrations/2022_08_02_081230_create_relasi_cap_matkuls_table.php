<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelasiCapMatkulsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relasi_cap_matkuls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('matkul_id');
            $table->foreignId('cap_kurikulum_id');
            $table->string('keanggotaan');
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
        Schema::dropIfExists('relasi_cap_matkuls');
    }
}
