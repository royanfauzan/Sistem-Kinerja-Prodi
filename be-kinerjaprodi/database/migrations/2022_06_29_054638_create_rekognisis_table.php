<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRekognisisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rekognisis', function (Blueprint $table) {
            $table->id();
            $table->string("rekognisi");
            $table->string("bidang");
            $table->string("tingkat");
            $table->string("tahun");
            $table->text("deskripsi");
            $table->string("fileBukti");
            $table->foreignId('profil_dosen_id');
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
        Schema::dropIfExists('rekognisis');
    }
}
