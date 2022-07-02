<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKasesuaiansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kasesuaians', function (Blueprint $table) {
            $table->id();
            $table->integer('rendah');
            $table->integer('sedang');
            $table->integer('tinggi');
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
        Schema::dropIfExists('kasesuaians');
    }
}
