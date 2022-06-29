<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePengabdiansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pengabdians', function (Blueprint $table) {
            $table->id();
            $table->string("tema");
            $table->string("judul");
            $table->string("lokasi");
            $table->string("tahun");
            $table->string("sdn_pt_mandiri")->nullable();
            $table->bigInteger('jml_pt_mandiri')->nullable();
            $table->string("sdn_negri")->nullable();
            $table->bigInteger('jml_negri')->nullable();
            $table->string("sdn_luar")->nullable();
            $table->bigInteger('jml_luar')->nullable();
            $table->foreignId('mitra_id');
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
        Schema::dropIfExists('pengabdians');
    }
}
