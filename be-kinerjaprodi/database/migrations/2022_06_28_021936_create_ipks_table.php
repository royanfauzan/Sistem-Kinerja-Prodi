<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIpksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ipks', function (Blueprint $table) {
            $table->id();
            $table->string('tahun');
            $table->integer('jmlh_lulusan');
            $table->float('ipk_min');
            $table->float('ipk_avg');
            $table->float('ipk_max');
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
        Schema::dropIfExists('ipks');
    }
}
