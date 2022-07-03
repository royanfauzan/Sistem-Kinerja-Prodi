<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaktutunggusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('waktutunggus', function (Blueprint $table) {
            $table->id();
            $table->integer('jmlh_lls_dipesan');
            $table->integer('jmlh_tunggu_lls_3bln');
            $table->integer('jmlh_tunggu_lls_6bln');
            $table->integer('jmlh_tunggu_lls_lebih_6bln');
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
        Schema::dropIfExists('waktutunggus');
    }
}
