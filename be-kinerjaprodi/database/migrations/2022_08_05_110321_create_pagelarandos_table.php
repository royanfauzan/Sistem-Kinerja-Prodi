<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagelarandosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pagelarandos', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('tahun');
            $table->string('penyelenggara');
            $table->string('ruang_lingkup');
            $table->string('file_bukti');
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
        Schema::dropIfExists('pagelarandos');
    }
}
