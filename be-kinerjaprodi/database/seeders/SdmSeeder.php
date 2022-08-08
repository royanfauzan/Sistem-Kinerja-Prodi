<?php

namespace Database\Seeders;

use App\Models\Bbjurnaldos;
use App\Models\Pagelarandos;
use App\Models\Penelitian;
use App\Models\Pkm;
use App\Models\Produk;
use App\Models\RelasiDosPen;
use App\Models\RelasiDosProd;
use App\Models\Seminardos;
use Illuminate\Database\Seeder;

class SdmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // Sumber dalam negri
        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'keuangan',
                'judul' => 'Membuat sistem bank', 
                'tahun' => '2021', 
                'sumber_dana_PT_mandiri' => '', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => 'Bank Bri', 
                'dana_dalam_negri' => 10000000, 
                'sumber_luar_negri' => '', 
                'dana_luar_negri' => 0,
            ]
        );

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'keuangan 2',
                'judul' => 'Membuat sistem bank 2', 
                'tahun' => '2019', 
                'sumber_dana_PT_mandiri' => '', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => 'Bank Bri', 
                'dana_dalam_negri' => 10000000, 
                'sumber_luar_negri' => '', 
                'dana_luar_negri' => 0,
            ]
        );

        // Sumber Luar negri
        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'teknologi',
                'judul' => 'Membuat sistem bank Dunia', 
                'tahun' => '2021', 
                'sumber_dana_PT_mandiri' => '', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => '', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => 'Bank Dunia', 
                'dana_luar_negri' => 10000000,
            ]
        );

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'teknologi 2',
                'judul' => 'Membuat sistem bank Dunia 2', 
                'tahun' => '2020', 
                'sumber_dana_PT_mandiri' => '', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => '', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => 'Bank Dunia', 
                'dana_luar_negri' => 10000000,
            ]
        );

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'teknologi 3',
                'judul' => 'Membuat sistem bank Dunia 3', 
                'tahun' => '2019', 
                'sumber_dana_PT_mandiri' => '', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => '', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => 'Bank Dunia', 
                'dana_luar_negri' => 10000000,
            ]
        );

        RelasiDosPen::create(
            [
                'profil_dosen_id'=> 1,
                'penelitian_id' => 1,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelasiDosPen::create(
            [
                'profil_dosen_id'=> 2,
                'penelitian_id' => 1,
                'keanggotaan' => 'anggota', 
            ]
        );

        RelasiDosPen::create(
            [
                'profil_dosen_id'=> 3,
                'penelitian_id' => 1,
                'keanggotaan' => 'anggota', 
            ]
        );


        // Seeed untuk 3B4-2
        // #####tidak terakreditasi
        Bbjurnaldos::create(
            [
                'judul' => 'Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'tidak terakreditasi',
                'nm_jurnal' => 'JNNIM',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 0,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'tidak terakreditasi',
                'nm_jurnal' => 'JNNIM',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2020',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 0,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '3Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'tidak terakreditasi',
                'nm_jurnal' => 'JNNIM',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 0,
            ]
        );

        // ##### nasional terakreditasi
        Bbjurnaldos::create(
            [
                'judul' => ' nasional Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'nasional terakreditasi',
                'nm_jurnal' => 'JNAS',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 8,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2 nasional Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'nasional terakreditasi',
                'nm_jurnal' => 'JNAS',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2020',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 3,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2 nasional Sistem informasi penambahan siswa3',
                'kategori_jurnal' => 'nasional terakreditasi',
                'nm_jurnal' => 'JNAS',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 2,
            ]
        );

        // ##### internasional
        Bbjurnaldos::create(
            [
                'judul' => 'inter Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'internasional',
                'nm_jurnal' => 'JINTER',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 3,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2 inter Sistem informasi penambahan siswa2',
                'kategori_jurnal' => 'internasional',
                'nm_jurnal' => 'JINTER',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2020',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 3,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '3 inter Sistem informasi penambahan siswa3',
                'kategori_jurnal' => 'internasional',
                'nm_jurnal' => 'JINTER',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 3,
            ]
        );

        // ##### internasional rep
        Bbjurnaldos::create(
            [
                'judul' => 'inter Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'internasional bereputasi',
                'nm_jurnal' => 'JINTERRep',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 3,
            ]
        );

        // Bbjurnaldos::create(
        //     [
        //         'judul' => '2 inter Sistem informasi penambahan siswa2',
        //         'kategori_jurnal' => 'internasional bereputasi',
        //         'nm_jurnal' => 'JINTERRep',
        //         'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
        //         'volume' => 'VII',
        //         'tahun' => '2020',
        //         'nomor' => '6',
        //         'halaman' => '127',
        //         'sitasi' => 3,
        //     ]
        // );

        Bbjurnaldos::create(
            [
                'judul' => '3 inter Sistem informasi penambahan siswa3',
                'kategori_jurnal' => 'internasional bereputasi',
                'nm_jurnal' => 'JINTERRep',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '127',
                'sitasi' => 3,
            ]
        );

        // #####wilayah
        Seminardos::create(
            [
                'tahun' => '2021',
                'judul_kegiatan' => 'judul wilayah 1',
                'penyelenggara' => 'penyelenggara wilayah 1',
                'kategori_seminar' => 'wilayah',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2020',
                'judul_kegiatan' => 'judul wilayah 2',
                'penyelenggara' => 'penyelenggara wilayah 2',
                'kategori_seminar' => 'wilayah',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2019',
                'judul_kegiatan' => 'judul wilayah 3',
                'penyelenggara' => 'penyelenggara wilayah 3',
                'kategori_seminar' => 'wilayah',
            ]
        );

        // #####nasional
        Seminardos::create(
            [
                'tahun' => '2021',
                'judul_kegiatan' => 'judul nasional 1',
                'penyelenggara' => 'penyelenggara nasional 1',
                'kategori_seminar' => 'nasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2020',
                'judul_kegiatan' => 'judul nasional 2',
                'penyelenggara' => 'penyelenggara nasional 2',
                'kategori_seminar' => 'nasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2019',
                'judul_kegiatan' => 'judul nasional 3',
                'penyelenggara' => 'penyelenggara nasional 3',
                'kategori_seminar' => 'nasional',
            ]
        );

        // #####internasional
        Seminardos::create(
            [
                'tahun' => '2021',
                'judul_kegiatan' => 'judul internasional 1',
                'penyelenggara' => 'penyelenggara internasional 1',
                'kategori_seminar' => 'internasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2020',
                'judul_kegiatan' => 'judul internasional 2',
                'penyelenggara' => 'penyelenggara internasional 2',
                'kategori_seminar' => 'internasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2019',
                'judul_kegiatan' => 'judul internasional 3',
                'penyelenggara' => 'penyelenggara internasional 3',
                'kategori_seminar' => 'internasional',
            ]
        );

        // wilayah
        Pagelarandos::create(
            [
                'judul' => 'judul pag wilayah 1',
                'tahun' => '2021',
                'penyelenggara' => 'penyelenggara wilayah 1',
                'ruang_lingkup' => 'wilayah',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag wilayah 2',
                'tahun' => '2020',
                'penyelenggara' => 'penyelenggara wilayah 2',
                'ruang_lingkup' => 'wilayah',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag wilayah 3',
                'tahun' => '2019',
                'penyelenggara' => 'penyelenggara wilayah 3',
                'ruang_lingkup' => 'wilayah',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        // nasional
        Pagelarandos::create(
            [
                'judul' => 'judul pag nasional 1',
                'tahun' => '2021',
                'penyelenggara' => 'penyelenggara nasional 1',
                'ruang_lingkup' => 'nasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag nasional 2',
                'tahun' => '2020',
                'penyelenggara' => 'penyelenggara nasional 2',
                'ruang_lingkup' => 'nasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag nasional 3',
                'tahun' => '2019',
                'penyelenggara' => 'penyelenggara nasional 3',
                'ruang_lingkup' => 'nasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        // internasional
        Pagelarandos::create(
            [
                'judul' => 'judul pag internasional 1',
                'tahun' => '2021',
                'penyelenggara' => 'penyelenggara internasional 1',
                'ruang_lingkup' => 'internasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag internasional 2',
                'tahun' => '2020',
                'penyelenggara' => 'penyelenggara internasional 2',
                'ruang_lingkup' => 'internasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag internasional 3',
                'tahun' => '2019',
                'penyelenggara' => 'penyelenggara internasional 3',
                'ruang_lingkup' => 'internasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Produk::create(
            [
                'nm_produk' => 'nama produk 1',
                'deskripsi' => 'deskripsi produk 1',
                'tahun' => '2021',
                'deskripsi_bukti' => 'foto produk',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Produk::create(
            [
                'nm_produk' => 'nama produk 2',
                'deskripsi' => 'deskripsi produk 2',
                'tahun' => '2020',
                'deskripsi_bukti' => 'foto produk',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Produk::create(
            [
                'nm_produk' => 'nama produk 3',
                'deskripsi' => 'deskripsi produk 3',
                'tahun' => '2019',
                'deskripsi_bukti' => 'foto produk',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Produk::create(
            [
                'nm_produk' => 'nama produk 4',
                'deskripsi' => 'deskripsi produk 4',
                'tahun' => '2019',
                'deskripsi_bukti' => 'foto produk',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        RelasiDosProd::create(
            [
                'profil_dosen_id'=> 1,
                'produk_id' => 1,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelasiDosProd::create(
            [
                'profil_dosen_id'=> 2,
                'produk_id' => 2,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelasiDosProd::create(
            [
                'profil_dosen_id'=> 3,
                'produk_id' => 3,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelasiDosProd::create(
            [
                'profil_dosen_id'=> 4,
                'produk_id' => 4,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelasiDosProd::create(
            [
                'profil_dosen_id'=> 1,
                'produk_id' => 2,
                'keanggotaan' => 'anggota', 
            ]
        );

        RelasiDosProd::create(
            [
                'profil_dosen_id'=> 2,
                'produk_id' => 1,
                'keanggotaan' => 'anggota', 
            ]
        );


    }
}
