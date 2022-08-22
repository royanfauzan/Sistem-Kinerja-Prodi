<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelasiTulisanmhsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('relasi_tulisanmhs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tulisan_id');
            $table->foreignId('mahasiswa_id');
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
        Schema::dropIfExists('relasi_tulisanmhs');
    }
}
