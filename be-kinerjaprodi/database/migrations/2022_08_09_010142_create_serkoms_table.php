<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSerkomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('serkoms', function (Blueprint $table) {
            $table->id();
            $table->string('nama_sertifikat');
            $table->text('keterangan');
            $table->string('file_bukti');
            $table->foreignId('detaildosen_id')
                    ->references('id')
                    ->on('detaildosens')
                    ->onDelete('cascade');
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
        Schema::dropIfExists('serkoms');
    }
}
