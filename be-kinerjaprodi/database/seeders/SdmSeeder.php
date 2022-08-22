<?php

namespace Database\Seeders;

use App\Models\Bbjurnaldos;
use App\Models\Bimbingan;
use App\Models\Detaildosen;
use App\Models\Luaranlaindosen;
use App\Models\Mahasiswa;
use App\Models\Matkul;
use App\Models\Mengajar;
use App\Models\Pagelarandos;
use App\Models\Pendidikan;
use App\Models\Penelitian;
use App\Models\Pkm;
use App\Models\Produk;
use App\Models\RelasiDosPen;
use App\Models\RelasiDosProd;
use App\Models\RelasiJurDos;
use App\Models\RelasiPagDos;
use App\Models\RelasiSemDos;
use App\Models\RelLuarDos;
use App\Models\Seminardos;
use App\Models\Serkom;
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
        // #####Tidak Terakreditasi
        Bbjurnaldos::create(
            [
                'judul' => 'Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'Jurnal Tidak Terakreditasi',
                'nm_jurnal' => 'JNNIM',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 0,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'Jurnal Tidak Terakreditasi',
                'nm_jurnal' => 'JNNIM',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2020',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 0,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '3Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'Jurnal Tidak Terakreditasi',
                'nm_jurnal' => 'JNNIM',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 0,
            ]
        );

        // ##### Nasional Terakreditasi
        Bbjurnaldos::create(
            [
                'judul' => ' nasional Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'Jurnal Nasional Terakreditasi',
                'nm_jurnal' => 'JNAS',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 8,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2 nasional Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'Jurnal Nasional Terakreditasi',
                'nm_jurnal' => 'JNAS',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2020',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 3,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2 nasional Sistem informasi penambahan siswa3',
                'kategori_jurnal' => 'Jurnal Nasional Terakreditasi',
                'nm_jurnal' => 'JNAS',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 2,
            ]
        );

        // ##### internasional
        Bbjurnaldos::create(
            [
                'judul' => 'inter Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'Jurnal Internasional',
                'nm_jurnal' => 'JINTER',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 3,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '2 inter Sistem informasi penambahan siswa2',
                'kategori_jurnal' => 'Jurnal Internasional',
                'nm_jurnal' => 'JINTER',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2020',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 3,
            ]
        );

        Bbjurnaldos::create(
            [
                'judul' => '3 inter Sistem informasi penambahan siswa3',
                'kategori_jurnal' => 'Jurnal Internasional',
                'nm_jurnal' => 'JINTER',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 3,
            ]
        );

        // ##### Internasional rep
        Bbjurnaldos::create(
            [
                'judul' => 'inter Sistem informasi penambahan siswa',
                'kategori_jurnal' => 'Jurnal Internasional Bereputasi',
                'nm_jurnal' => 'JINTERRep',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2021',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 3,
            ]
        );

        // Bbjurnaldos::create(
        //     [
        //         'judul' => '2 inter Sistem informasi penambahan siswa2',
        //         'kategori_jurnal' => 'Jurnal Internasional Bereputasi',
        //         'nm_jurnal' => 'JINTERRep',
        //         'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
        //         'volume' => 'VII',
        //         'tahun' => '2020',
        //         'nomor' => '6',
        //         'halaman' => '70-127',
        //         'sitasi' => 3,
        //     ]
        // );

        Bbjurnaldos::create(
            [
                'judul' => '3 inter Sistem informasi penambahan siswa3',
                'kategori_jurnal' => 'Jurnal Internasional Bereputasi',
                'nm_jurnal' => 'JINTERRep',
                'keterangan' => 'Penelitian mengenai sistem informasi yang dibuat ',
                'volume' => 'VII',
                'tahun' => '2019',
                'nomor' => '6',
                'halaman' => '70-127',
                'sitasi' => 3,
            ]
        );

        RelasiJurDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 1,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 2,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 2,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 3,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 3,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 4,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 4,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 5,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 2,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 6,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 3,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 7,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 4,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 8,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 9,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 2,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 10,
        ]);
        RelasiJurDos::create([
            'profil_dosen_id' => 3,
            'keanggotaan' => 'Ketua',
            'bbjurnaldos_id' => 11,
        ]);
        

        // #####wilayah
        Seminardos::create(
            [
                'tahun' => '2021',
                'judul_kegiatan' => 'judul wilayah 1',
                'penyelenggara' => 'penyelenggara wilayah 1',
                'kategori_seminar' => 'Wilayah',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2020',
                'judul_kegiatan' => 'judul wilayah 2',
                'penyelenggara' => 'penyelenggara wilayah 2',
                'kategori_seminar' => 'Wilayah',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2019',
                'judul_kegiatan' => 'judul wilayah 3',
                'penyelenggara' => 'penyelenggara wilayah 3',
                'kategori_seminar' => 'Wilayah',
            ]
        );

        // #####nasional
        Seminardos::create(
            [
                'tahun' => '2021',
                'judul_kegiatan' => 'judul nasional 1',
                'penyelenggara' => 'penyelenggara nasional 1',
                'kategori_seminar' => 'Nasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2020',
                'judul_kegiatan' => 'judul nasional 2',
                'penyelenggara' => 'penyelenggara nasional 2',
                'kategori_seminar' => 'Nasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2019',
                'judul_kegiatan' => 'judul nasional 3',
                'penyelenggara' => 'penyelenggara nasional 3',
                'kategori_seminar' => 'Nasional',
            ]
        );

        // #####internasional
        Seminardos::create(
            [
                'tahun' => '2021',
                'judul_kegiatan' => 'judul internasional 1',
                'penyelenggara' => 'penyelenggara internasional 1',
                'kategori_seminar' => 'Internasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2020',
                'judul_kegiatan' => 'judul internasional 2',
                'penyelenggara' => 'penyelenggara internasional 2',
                'kategori_seminar' => 'Internasional',
            ]
        );

        Seminardos::create(
            [
                'tahun' => '2019',
                'judul_kegiatan' => 'judul internasional 3',
                'penyelenggara' => 'penyelenggara internasional 3',
                'kategori_seminar' => 'Internasional',
            ]
        );

        RelasiSemDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 1,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 2,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 2,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 3,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 3,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 4,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 4,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 5,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 2,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 6,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 3,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 7,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 4,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 8,
        ]);
        RelasiSemDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'seminardos_id' => 9,
        ]);

        // wilayah
        Pagelarandos::create(
            [
                'judul' => 'judul pag wilayah 1',
                'tahun' => '2021',
                'penyelenggara' => 'penyelenggara wilayah 1',
                'ruang_lingkup' => 'Wilayah',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag wilayah 2',
                'tahun' => '2020',
                'penyelenggara' => 'penyelenggara wilayah 2',
                'ruang_lingkup' => 'Wilayah',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag wilayah 3',
                'tahun' => '2019',
                'penyelenggara' => 'penyelenggara wilayah 3',
                'ruang_lingkup' => 'Wilayah',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        // nasional
        Pagelarandos::create(
            [
                'judul' => 'judul pag nasional 1',
                'tahun' => '2021',
                'penyelenggara' => 'penyelenggara nasional 1',
                'ruang_lingkup' => 'Nasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag nasional 2',
                'tahun' => '2020',
                'penyelenggara' => 'penyelenggara nasional 2',
                'ruang_lingkup' => 'Nasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag nasional 3',
                'tahun' => '2019',
                'penyelenggara' => 'penyelenggara nasional 3',
                'ruang_lingkup' => 'Nasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        // internasional
        Pagelarandos::create(
            [
                'judul' => 'judul pag internasional 1',
                'tahun' => '2021',
                'penyelenggara' => 'penyelenggara internasional 1',
                'ruang_lingkup' => 'Internasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag internasional 2',
                'tahun' => '2020',
                'penyelenggara' => 'penyelenggara internasional 2',
                'ruang_lingkup' => 'Internasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        Pagelarandos::create(
            [
                'judul' => 'judul pag internasional 3',
                'tahun' => '2019',
                'penyelenggara' => 'penyelenggara internasional 3',
                'ruang_lingkup' => 'Internasional',
                'file_bukti' => 'storage/testarea/image.jpg',
            ]
        );

        RelasiPagDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 1,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 2,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 2,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 3,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 3,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 4,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 4,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 5,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 2,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 6,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 3,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 7,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 4,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 8,
        ]);
        RelasiPagDos::create([
            'profil_dosen_id' => 1,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => 9,
        ]);

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

        Luaranlaindosen::create(
            [
                'judul' => 'Speed Of Spatial Query Of Satellite Data On Various Database Storage Engine',
                'keterangan' => 'Keterangan 1',
                'tahun' => '2019',
                'jenis_luaran' => 'I',
            ]
        );

        Luaranlaindosen::create(
            [
                'judul' => 'Luaran 2',
                'keterangan' => 'Keterangan 2',
                'tahun' => '2020',
                'jenis_luaran' => 'II',
            ]
        );

        Luaranlaindosen::create(
            [
                'judul' => 'Luaran 3',
                'keterangan' => 'Keterangan 3',
                'tahun' => '2020',
                'jenis_luaran' => 'III',
            ]
        );

        Luaranlaindosen::create(
            [
                'judul' => 'Luaran 4',
                'keterangan' => 'Keterangan 4',
                'tahun' => '2020',
                'jenis_luaran' => 'IV',
            ]
        );

        Luaranlaindosen::create(
            [
                'judul' => 'Luaran 5',
                'keterangan' => 'Keterangan 5',
                'tahun' => '2020',
                'jenis_luaran' => 'I',
            ]
        );

        RelLuarDos::create(
            [
                'profil_dosen_id'=> 2,
                'luaranlaindosen_id' => 1,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelLuarDos::create(
            [
                'profil_dosen_id'=> 1,
                'luaranlaindosen_id' => 2,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelLuarDos::create(
            [
                'profil_dosen_id'=> 2,
                'luaranlaindosen_id' => 3,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelLuarDos::create(
            [
                'profil_dosen_id'=> 2,
                'luaranlaindosen_id' => 4,
                'keanggotaan' => 'Ketua', 
            ]
        );

        RelLuarDos::create(
            [
                'profil_dosen_id'=> 2,
                'luaranlaindosen_id' => 5,
                'keanggotaan' => 'Ketua', 
            ]
        );


        // Data Pendidikan
        #pendidikan profil 1
        Pendidikan::create([
            'tahun_lulus'=>'2017',
            'program_pendidikan'=>'S2',
            'perguruan_tinggi'=>'UNUD',
            'jurusan'=>'Elektro',
            'prodi'=>'IoT',
            'profil_dosen_id'=>1
        ]);
        
        Pendidikan::create([
            'tahun_lulus'=>'2019',
            'program_pendidikan'=>'S3',
            'perguruan_tinggi'=>'UNUD',
            'jurusan'=>'Elektro',
            'prodi'=>'Spesialis IoT',
            'profil_dosen_id'=>1
        ]);

        #pendidikan profil 2
        Pendidikan::create([
            'tahun_lulus'=>'2015',
            'program_pendidikan'=>'S2',
            'perguruan_tinggi'=>'UNUD',
            'jurusan'=>'Informatika',
            'prodi'=>'Sistem Informatika',
            'profil_dosen_id'=>2
        ]);

        #pendidikan profil 3
        Pendidikan::create([
            'tahun_lulus'=>'2012',
            'program_pendidikan'=>'S2',
            'perguruan_tinggi'=>'UGM',
            'jurusan'=>'Manajemen',
            'prodi'=>'Manajemen Bisnis',
            'profil_dosen_id'=>3
        ]);
        
        #pendidikan profil 4
        Pendidikan::create([
            'tahun_lulus'=>'2012',
            'program_pendidikan'=>'S2',
            'perguruan_tinggi'=>'UNUD',
            'jurusan'=>'Teknik',
            'prodi'=>'IoT',
            'profil_dosen_id'=>4
        ]);
        
        Pendidikan::create([
            'tahun_lulus'=>'2016',
            'program_pendidikan'=>'S3',
            'perguruan_tinggi'=>'UGM',
            'jurusan'=>'Elektro',
            'prodi'=>'Spesialis IoT',
            'profil_dosen_id'=>4
        ]);

        // Detail Dosen
        Detaildosen::create([
            'profil_dosen_id'=>1,
            'bidangKeahlian'=>'Teknik Elektro',
            'kesesuaian'=>'V',
            
            'noSertifPendidik'=>'SerDos(16100501000821)',
            "fileBukti" => 'storage/testarea/image.jpg',
        ]);

        Detaildosen::create([
            'profil_dosen_id'=>2,
            'bidangKeahlian'=>'Teknik Elektro',
            'kesesuaian'=>'V',
         
            'noSertifPendidik'=>'SerDos(11100501016334)',
            "fileBukti" => 'storage/testarea/image.jpg',
        ]);

        Detaildosen::create([
            'profil_dosen_id'=>3,
            'bidangKeahlian'=>'Manajemen',
            'kesesuaian'=>'V',
            
            'noSertifPendidik'=>'SerDos(11100501016999)',
            "fileBukti" => 'storage/testarea/image.jpg',
        ]);

        Detaildosen::create([
            'profil_dosen_id'=>4,
            'bidangKeahlian'=>'Pendidikan Matematika',
            'kesesuaian'=>'V',
           
            'noSertifPendidik'=>'SerDos(11100501016999)',
            "fileBukti" => 'storage/testarea/image.jpg',
        ]);

        // SertifikatKompetensi
        Serkom::create([
            'profil_dosen_id'=>1,
            'nama_skema'=>'SerKom(Operator PLC dan Sistem SCADA BNSP)',
            'nomor_sertifikat'=>'No Reg. ELM 21809175 2019',
            'tanggal_sertif'=>'2019-12-01',
            "file_bukti" => 'storage/testarea/image.jpg',
        ]);
        Serkom::create([
            'profil_dosen_id'=>1,
            'nama_skema'=>'SerKom(Maintainer Sistem SCADA BNSP)',
            'nomor_sertifikat'=>'No Reg. ELM 21809222 2020',
            'tanggal_sertif'=>'2020-06-01',
            "file_bukti" => 'storage/testarea/image.jpg',
        ]);
        Serkom::create([
            'profil_dosen_id'=>2,
            'nama_skema'=>'SerKom(Developer Sistem BNSP)',
            'nomor_sertifikat'=>'No Reg. ADB 21809222 2021',
            'tanggal_sertif'=>'2021-08-01',
            "file_bukti" => 'storage/testarea/image.jpg',
        ]);

        // Data Matkul
        Matkul::create(
            [
                'nama_matkul' => 'Bahasa Pemrograman',
                'kode_matkul' => 'MK09888',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create( 
            [
                'nama_matkul' => 'Pemrograman Berbasis Objek',
                'kode_matkul' => 'MK09777',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Pemrograman Dasar',
                'kode_matkul' => 'MK09666',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Pemrograman Visual',
                'kode_matkul' => 'MK09555',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        #id 5
        Matkul::create(
            [
                'nama_matkul' => 'Manajemen Bisnis',
                'kode_matkul' => 'MK09444',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Kewirausahaan',
                'kode_matkul' => 'MK09444',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        #id 7
        Matkul::create(
            [
                'nama_matkul' => 'Matematika Dasar',
                'kode_matkul' => 'MK09333',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        #id 8
        Matkul::create(
            [
                'nama_matkul' => 'Arsitektur Komputer',
                'kode_matkul' => 'MK08777',
                'sks' => 4,
                'prodi_id' => 3,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Elektronika',
                'kode_matkul' => 'MK08666',
                'sks' => 4,
                'prodi_id' => 3,
            ]
        );

        #id 10
        Matkul::create(
            [
                'nama_matkul' => 'Elektronika Daya',
                'kode_matkul' => 'MK08555',
                'sks' => 4,
                'prodi_id' => 3,
            ]
        );

        #id 11
        Matkul::create(
            [
                'nama_matkul' => 'Matematika Terapan 1',
                'kode_matkul' => 'MK08444',
                'sks' => 4,
                'prodi_id' => 3,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Matematika Terapan 2',
                'kode_matkul' => 'MK08333',
                'sks' => 4,
                'prodi_id' => 3,
            ]
        );

        // Data Pengalaman Mengajar
        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Ganjil',
            'matkul_id'=>1,
            'profil_dosen_id'=>1,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Genap',
            'matkul_id'=>1,
            'profil_dosen_id'=>1,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Genap',
            'matkul_id'=>2,
            'profil_dosen_id'=>1,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Ganjil',
            'matkul_id'=>3,
            'profil_dosen_id'=>2,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Genap',
            'matkul_id'=>4,
            'profil_dosen_id'=>2,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Ganjil',
            'matkul_id'=>8,
            'profil_dosen_id'=>2,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Genap',
            'matkul_id'=>9,
            'profil_dosen_id'=>2,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Ganjil',
            'matkul_id'=>5,
            'profil_dosen_id'=>3,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Genap',
            'matkul_id'=>6,
            'profil_dosen_id'=>3,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Ganjil',
            'matkul_id'=>7,
            'profil_dosen_id'=>4,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Genap',
            'matkul_id'=>11,
            'profil_dosen_id'=>4,
        ]);

        Mengajar::create([
            'tahun_akademik'=>'2020/2021',
            'semester'=>'Genap',
            'matkul_id'=>12,
            'profil_dosen_id'=>4,
        ]);

        // DATA BIMBINGAN
        Mahasiswa::factory(20)->create();

        Bimbingan::create([
            'tahun_akademik'=>'2020/2021',
            'judul_ta'=>'JUDUL TA 1',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>1,
            'profil_dosen_id'=>1,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2019/2020',
            'judul_ta'=>'JUDUL TA 2',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>2,
            'profil_dosen_id'=>1,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 3',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>3,
            'profil_dosen_id'=>1,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 4',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>4,
            'profil_dosen_id'=>1,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 5',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>5,
            'profil_dosen_id'=>1,
        ]);
        
        ###Bimbingan dos 2
        Bimbingan::create([
            'tahun_akademik'=>'2020/2021',
            'judul_ta'=>'JUDUL TA 6',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>6,
            'profil_dosen_id'=>2,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2019/2020',
            'judul_ta'=>'JUDUL TA 7',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>7,
            'profil_dosen_id'=>2,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 8',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>8,
            'profil_dosen_id'=>2,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 9',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>9,
            'profil_dosen_id'=>2,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 10',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>10,
            'profil_dosen_id'=>2,
        ]);

        ### BIMBINGAN DOSEN 3
        Bimbingan::create([
            'tahun_akademik'=>'2020/2021',
            'judul_ta'=>'JUDUL TA 11',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>11,
            'profil_dosen_id'=>3,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2019/2020',
            'judul_ta'=>'JUDUL TA 12',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>12,
            'profil_dosen_id'=>3,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 13',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>13,
            'profil_dosen_id'=>3,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 14',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>14,
            'profil_dosen_id'=>3,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 15',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>15,
            'profil_dosen_id'=>3,
        ]);
        
        ###Bimbingan dos 4
        Bimbingan::create([
            'tahun_akademik'=>'2020/2021',
            'judul_ta'=>'JUDUL TA 16',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>16,
            'profil_dosen_id'=>4,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2019/2020',
            'judul_ta'=>'JUDUL TA 17',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>17,
            'profil_dosen_id'=>4,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 18',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>1,
            'mahasiswa_id'=>18,
            'profil_dosen_id'=>4,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 19',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>19,
            'profil_dosen_id'=>4,
        ]);
        Bimbingan::create([
            'tahun_akademik'=>'2021/2022',
            'judul_ta'=>'JUDUL TA 20',
            'fileBukti'=>'storage/testarea/image.jpg',
            'prodi_id'=>2,
            'mahasiswa_id'=>20,
            'profil_dosen_id'=>4,
        ]);

    }
}
