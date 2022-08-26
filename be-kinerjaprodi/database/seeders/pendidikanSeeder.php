<?php

namespace Database\Seeders;

use App\Models\Bbjurnaldos;
use App\Models\Bimbingan;
use App\Models\Detaildosen;
use App\Models\Kepuasan_MHS;
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
use App\Models\RelasiPenMhs;
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

        // Mahasiswa::create(
        //     [
        //         'nim' => '1615323039',
        //         'nama' => 'KOMANG ANOM SUANDI',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1715323002',
        //         'nama' => 'NI PANDE PUTU YUNI ANTARI',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1715323006',
        //         'nama' => 'I PUTU AGUS GUNAWAN',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1815323054',
        //         'nama' => 'NARENDRA BRILLIAN AL-GHIFARI',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1815323057',
        //         'nama' => 'GUSTI AYU NYOMAN SITA WAHANA MURTI',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1815323065',
        //         'nama' => 'NI NYOMAN LENI  ARIDANI',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1815323072',
        //         'nama' => 'MADE GEDE ARYA ANDIKA DHARMA KRISNA',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1815323074',
        //         'nama' => 'PUTU KHRISVANA VHARIYANA',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1815323084',
        //         'nama' => 'I PUTU YUDHA PRATAMA',
        //     ]
        // );

        // Mahasiswa::create(
        //     [
        //         'nim' => '1915323069',
        //         'nama' => 'MUHAMMAD ALIEVYO RAMADHANI',
        //     ]
        // );

        // //kepuasan mahasiswa
        // Kepuasan_MHS::create(
        //     [
        //         'tahun' => '2022',
        //         'prodi_id' => 1,
        //         'keandalan_4' => 21, 99,
        //         'keandalan_3' => 75, 42,
        //         'keandalan_2' => 1, 99,
        //         'keandalan_1' => 0, 6,
        //         'tl_keandalan' => 'Kehandalan peralatan praktikum sudah baik, namun dengan meningkatkannya proses pembelajaran akan menjadi semakin optimal',
        //         'dayatanggap_4' => 20, 23,
        //         'dayatanggap_3' => 76, 94,
        //         'dayatanggap_2' => 2, 27,
        //         'dayatanggap_1' => 0, 57,
        //         'tl_dayatanggap' => 'Daya tanggap (responsible) dosen sudah sangat baik, untuk menjamin mutu tersebut penting untuk di ditingkatkan perhatian pada aspek daya serap mahasiswa',
        //         'kepastian_4' => 28, 75,
        //         'kepastian_3' => 65, 43,
        //         'kepastian_2' => 4, 59,
        //         'kepastian_1' => 1, 23,
        //         'tl_kepastian' => 'Optimalitas pembelajaran sudah baik dengan menjaga keterjaminan mutu penyelenggaraan sampai dengan pengumuman hasil proses pembelajaran kepada mahasiswa ',
        //         'empati_4' => 27, 91,
        //         'empati_3' => 67, 27,
        //         'empati_2' => 0, 6,
        //         'empati_1' => 4, 22,
        //         'tl_empati' => 'Optimalitas proses belajar mengajar akan menjadi lebih efektif dengan memberikan perhatian lebih kepada mahasiswa yang di anggap kurang mampu mengikuti proses belajar mengajar',
        //         'tangible_4' => 21, 99,
        //         'tangible_3' => 75, 42,
        //         'tangible_2' => 1, 99,
        //         'tangible_1' => 0, 6,
        //         'tl_tangible' => 'Upaya untuk mengingkatkan fasilitas pembelajaran merupakan salah satu bentuk optimalitas pembelajaran.',
        //     ]
        // );



        //
        // Sumber dalam negri
        // Penelitian::create( 
        //     [
        //         'tema_sesuai_roadmap'=> 'keuangan',
        //         'judul' => 'Membuat sistem bank', 
        //         'tahun' => '2021', 
        //         'sumber_dana_PT_mandiri' => '', 
        //         'dana_PT_Mandiri' => 0, 
        //         'sumber_dalam_negri' => 'Bank Bri', 
        //         'dana_dalam_negri' => 10000000, 
        //         'sumber_luar_negri' => '', 
        //         'dana_luar_negri' => 0,
        //     ]
        // );

        // Penelitian::create( 
        //     [
        //         'tema_sesuai_roadmap'=> 'keuangan 2',
        //         'judul' => 'Membuat sistem bank 2', 
        //         'tahun' => '2019', 
        //         'sumber_dana_PT_mandiri' => '', 
        //         'dana_PT_Mandiri' => 0, 
        //         'sumber_dalam_negri' => 'Bank Bri', 
        //         'dana_dalam_negri' => 10000000, 
        //         'sumber_luar_negri' => '', 
        //         'dana_luar_negri' => 0,
        //     ]
        // );

        // // Sumber Luar negri
        // Penelitian::create( 
        //     [
        //         'tema_sesuai_roadmap'=> 'teknologi',
        //         'judul' => 'Membuat sistem bank Dunia', 
        //         'tahun' => '2021', 
        //         'sumber_dana_PT_mandiri' => '', 
        //         'dana_PT_Mandiri' => 0, 
        //         'sumber_dalam_negri' => '', 
        //         'dana_dalam_negri' => 0, 
        //         'sumber_luar_negri' => 'Bank Dunia', 
        //         'dana_luar_negri' => 10000000,
        //     ]
        // );

        // Penelitian::create( 
        //     [
        //         'tema_sesuai_roadmap'=> 'teknologi 2',
        //         'judul' => 'Membuat sistem bank Dunia 2', 
        //         'tahun' => '2020', 
        //         'sumber_dana_PT_mandiri' => '', 
        //         'dana_PT_Mandiri' => 0, 
        //         'sumber_dalam_negri' => '', 
        //         'dana_dalam_negri' => 0, 
        //         'sumber_luar_negri' => 'Bank Dunia', 
        //         'dana_luar_negri' => 10000000,
        //     ]
        // );

        // Penelitian::create( 
        //     [
        //         'tema_sesuai_roadmap'=> 'teknologi 3',
        //         'judul' => 'Membuat sistem bank Dunia 3', 
        //         'tahun' => '2019', 
        //         'sumber_dana_PT_mandiri' => '', 
        //         'dana_PT_Mandiri' => 0, 
        //         'sumber_dalam_negri' => '', 
        //         'dana_dalam_negri' => 0, 
        //         'sumber_luar_negri' => 'Bank Dunia', 
        //         'dana_luar_negri' => 10000000,
        //     ]
        // );

        RelasiDosPen::create(
            [
                'profil_dosen_id' => 1,
                'penelitian_id' => 1,
                'keanggotaan' => 'Ketua',
            ]
        );

        RelasiDosPen::create(
            [
                'profil_dosen_id' => 2,
                'penelitian_id' => 1,
                'keanggotaan' => 'anggota',
            ]
        );

        RelasiDosPen::create(
            [
                'profil_dosen_id' => 3,
                'penelitian_id' => 1,
                'keanggotaan' => 'anggota',
            ]
        );
        
        RelasiPenMhs::create(
            [
                'mahasiswa_id' => 1,
                'penelitian_id' => 1,
                'keanggotaan' => 'anggota',
            ]
        );

    }
}
