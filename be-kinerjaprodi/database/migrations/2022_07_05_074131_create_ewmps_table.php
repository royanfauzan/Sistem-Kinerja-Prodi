<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEwmpsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ewmps', function (Blueprint $table) {
            $table->id();
            $table->boolean('dtps')->default(true);
            $table->integer('sks_ps_akreditasi')->default(0);
            $table->integer('sks_ps_lain_pt')->default(0);
            $table->integer('sks_ps_luar_pt')->default(0);
            $table->integer('sks_penelitian')->default(0);
            $table->integer('sks_pengabdian')->default(0);
            $table->integer('sks_tugas')->default(0);
            $table->string('tahun_akademik');
            $table->string('semester');
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
        Schema::dropIfExists('ewmps');
    }
}
