<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetaildosensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detaildosens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profil_dosen_id')
                    ->references('id')
                    ->on('profil_dosens')
                    ->onDelete('cascade');
            $table->string('bidangKeahlian');
            $table->string('kesesuaian');
            $table->string('perusahaan')->default('');
            $table->string('noSertifPendidik')->default('');
            $table->string('fileBukti')->default('');
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
        Schema::dropIfExists('detaildosens');
    }
}
