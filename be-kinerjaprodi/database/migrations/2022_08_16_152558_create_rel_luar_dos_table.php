<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRelLuarDosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rel_luar_dos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('luaranlaindosen_id');
            $table->foreignId('profil_dosen_id');
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
        Schema::dropIfExists('rel_luar_dos');
    }
}
