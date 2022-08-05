<?php

namespace Database\Seeders;

use App\Models\Ewmp;
use App\Models\Mitra;
use App\Models\Penelitian;
use App\Models\profilDosen;
use App\Models\RelasiDosPen;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'NIDK'=>'12345678',
            'role'=>'admin',
            'level_akses'=>3,
            'password'=>bcrypt('12345678'),
        ]);
        User::create([
            'NIDK'=>'87654321',
            'role'=>'dosen',
            'level_akses'=>2,
            'password'=>bcrypt('12345678'),
        ]);

        User::create([
            'NIDK'=>'11111111',
            'role'=>'dosen',
            'level_akses'=>2,
            'password'=>bcrypt('12345678'),
        ]);

        User::create([
            'NIDK'=>'22222222',
            'role'=>'dosen',
            'level_akses'=>2,
            'password'=>bcrypt('12345678'),
        ]);

        User::create([
            'NIDK'=>'33333333',
            'role'=>'dosen',
            'level_akses'=>2,
            'password'=>bcrypt('12345678'),
        ]);

        User::create([
            'NIDK'=>'44444444',
            'role'=>'dosen',
            'level_akses'=>2,
            'password'=>bcrypt('12345678'),
        ]);

        User::create([
            'NIDK'=>'55555555',
            'role'=>'dosen',
            'level_akses'=>2,
            'password'=>bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK'=>'87654321',
            'NamaDosen'=>'royanF',
            'NIK'=>"12345678",
            'TempatLahir'=>'Tabanan',
            'TanggalLahir'=>'2000-12-25',
            'JenisKelamin'=>'L',
            'StatusPerkawinan'=>'Belum Kawin',
            'Agama'=>'Kristen',
        ]);

        profilDosen::create([
            'NIDK'=>'11111111',
            'NamaDosen'=>'nama 111',
            'NIK'=>"911111111",
            'TempatLahir'=>'Singaraja',
            'TanggalLahir'=>'1998-12-25',
            'JenisKelamin'=>'L',
            'StatusPerkawinan'=>'Kawin',
            'Agama'=>'Hindu',
        ]);

        profilDosen::create([
            'NIDK'=>'22222222',
            'NamaDosen'=>'nama 222',
            'NIK'=>"922222222",
            'TempatLahir'=>'Singaraja',
            'TanggalLahir'=>'1998-12-25',
            'JenisKelamin'=>'L',
            'StatusPerkawinan'=>'Kawin',
            'Agama'=>'Hindu',
        ]);

        profilDosen::create([
            'NIDK'=>'33333333',
            'NamaDosen'=>'nama 333',
            'NIK'=>"933333333",
            'TempatLahir'=>'Singaraja',
            'TanggalLahir'=>'1998-12-25',
            'JenisKelamin'=>'L',
            'StatusPerkawinan'=>'Kawin',
            'Agama'=>'Hindu',
        ]);

        Ewmp::create([
            'dtps'=>true,
            'profil_dosen_id'=>1,
            'tahun_akademik'=>'2019/2020',
            'semester'=>"genap",
            'sks_ps_akreditasi'=>8,
            'sks_ps_lain_pt'=>4,
            'sks_ps_luar_pt'=>0,
            'sks_penelitian'=>4,
            'sks_pengabdian'=>4,
            'sks_tugas'=>4,
        ]);

        Ewmp::create([
            'dtps'=>true,
            'profil_dosen_id'=>1,
            'tahun_akademik'=>'2019/2020',
            'semester'=>"ganjil",
            'sks_ps_akreditasi'=>8,
            'sks_ps_lain_pt'=>4,
            'sks_ps_luar_pt'=>0,
            'sks_penelitian'=>4,
            'sks_pengabdian'=>4,
            'sks_tugas'=>4,
        ]);

        Ewmp::create([
            'dtps'=>true,
            'profil_dosen_id'=>1,
            'tahun_akademik'=>'2020/2021',
            'semester'=>"genap",
            'sks_ps_akreditasi'=>8,
            'sks_ps_lain_pt'=>4,
            'sks_ps_luar_pt'=>0,
            'sks_penelitian'=>4,
            'sks_pengabdian'=>4,
            'sks_tugas'=>4,
        ]);

        Ewmp::create([
            'dtps'=>true,
            'profil_dosen_id'=>1,
            'tahun_akademik'=>'2020/2021',
            'semester'=>"ganjil",
            'sks_ps_akreditasi'=>10,
            'sks_ps_lain_pt'=>4,
            'sks_ps_luar_pt'=>0,
            'sks_penelitian'=>4,
            'sks_pengabdian'=>4,
            'sks_tugas'=>4,
        ]);

        Ewmp::create([
            'dtps'=>true,
            'profil_dosen_id'=>2,
            'tahun_akademik'=>'2020/2021',
            'semester'=>"genap",
            'sks_ps_akreditasi'=>8,
            'sks_ps_lain_pt'=>4,
            'sks_ps_luar_pt'=>0,
            'sks_penelitian'=>4,
            'sks_pengabdian'=>4,
            'sks_tugas'=>4,
        ]);

        Ewmp::create([
            'dtps'=>true,
            'profil_dosen_id'=>2,
            'tahun_akademik'=>'2020/2021',
            'semester'=>"ganjil",
            'sks_ps_akreditasi'=>10,
            'sks_ps_lain_pt'=>4,
            'sks_ps_luar_pt'=>0,
            'sks_penelitian'=>4,
            'sks_pengabdian'=>4,
            'sks_tugas'=>4,
        ]);

        Mitra::create([
                'namamitra'=>'Pilar Kreatif Teknologi',
                'alamat'=>'Denpasar',
                'no_telepon'=>'085123123123',
                'nama_cp'=>'JOse v2',
                'no_telp_cp'=>'089123123242',
                'email_cp'=>'jose2@gmail.com',
                'bidang'=>'Teknologi',
        ]);

        Mitra::create([
            'namamitra'=>'Avatar Solution',
            'alamat'=>'Badung',
            'no_telepon'=>'085123123123',
            'nama_cp'=>'Doni ',
            'no_telp_cp'=>'089123123242',
            'email_cp'=>'Doni@gmail.com',
            'bidang'=>'Teknologi',
        ]);

        // Sumber mandiri/pt
        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'kelistrikan',
                'judul' => 'Membuat pembangkit listrik', 
                'tahun' => '2021', 
                'sumber_dana_PT_mandiri' => 'mandiri', 
                'dana_PT_Mandiri' => 500000, 
                'sumber_dalam_negri' => '', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '', 
                'dana_luar_negri' => 0,
            ]
        );

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'kelistrikan 2',
                'judul' => 'Membuat pembangkit listrik 2', 
                'tahun' => '2020', 
                'sumber_dana_PT_mandiri' => 'mandiri', 
                'dana_PT_Mandiri' => 500000, 
                'sumber_dalam_negri' => '', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '', 
                'dana_luar_negri' => 0,
            ]
        );

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'kelistrikan 3',
                'judul' => 'Membuat pembangkit listrik 3', 
                'tahun' => '2019', 
                'sumber_dana_PT_mandiri' => 'mandiri', 
                'dana_PT_Mandiri' => 500000, 
                'sumber_dalam_negri' => '', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '', 
                'dana_luar_negri' => 0,
            ]
        );


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
    }
}
