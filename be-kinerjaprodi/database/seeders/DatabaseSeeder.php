<?php

namespace Database\Seeders;

use App\Models\Bbjurnaldos;
use App\Models\CapKurikulum;
use App\Models\Ewmp;
use App\Models\Kepuasan_MHS;
use App\Models\Mahasiswa;
use App\Models\Matkul;
use App\Models\Mitra;
use App\Models\Penelitian;
use App\Models\Pkm;
use App\Models\Prodi;
use App\Models\profilDosen;
use App\Models\RelasiCapMatkul;
use App\Models\RelasiDosPen;
use App\Models\RelasiIntDos;
use App\Models\RelasiIntMatkul;
use App\Models\RelasiPenMhs;
use App\Models\RelasiPkmDos;
use App\Models\RelasiPkmMhs;
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
        // DATA PRODI
        Prodi::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'prodi' => 'D3',
                'nama_prodi' => 'Manajemen Informatika',
            ]
        );

        Prodi::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'prodi' => 'D3',
                'nama_prodi' => 'Teknik Listrik',
            ]
        );

        Prodi::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'prodi' => 'D4',
                'nama_prodi' => 'Teknik Otomasi',
            ]
        );
        // \App\Models\User::factory(10)->create();
        User::create([
            'NIDK' => '12345678',
            'role' => 'admin',
            'level_akses' => 3,
            'password' => bcrypt('12345678'),
        ]);
        
        User::create([
            'NIDK' => '87654321',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        User::create([
            'NIDK' => '11111111',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        User::create([
            'NIDK' => '22222222',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        User::create([
            'NIDK' => '33333333',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        User::create([
            'NIDK' => '44444444',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        User::create([
            'NIDK' => '55555555',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '87654321',
            'NamaDosen' => 'royanF',
            'NIK' => "12345678",
            'TempatLahir' => 'Tabanan',
            'TanggalLahir' => '2000-12-25',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Belum Kawin',
            'JabatanAkademik'=>'Lektor Kepala',
            'Agama' => 'Kristen',
        ]);

        profilDosen::create([
            'NIDK' => '11111111',
            'NamaDosen' => 'nama 111',
            'NIK' => "911111111",
            'TempatLahir' => 'Singaraja',
            'TanggalLahir' => '1998-12-25',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor Kepala',
            'Agama' => 'Hindu',
        ]);

        profilDosen::create([
            'NIDK' => '22222222',
            'NamaDosen' => 'nama 222',
            'NIK' => "922222222",
            'TempatLahir' => 'Singaraja',
            'TanggalLahir' => '1998-12-25',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor Kepala',
            'Agama' => 'Hindu',
        ]);

        profilDosen::create([
            'NIDK' => '33333333',
            'NamaDosen' => 'nama 333',
            'NIK' => "933333333",
            'TempatLahir' => 'Singaraja',
            'TanggalLahir' => '1998-12-25',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor Kepala',
            'Agama' => 'Hindu',
        ]);

        profilDosen::create([
            'NIDK'=>'44444444',
            'NamaDosen'=>'nama 444',
            'NIK'=>"944444444",
            'TempatLahir'=>'Singaraja',
            'TanggalLahir'=>'1998-12-25',
            'JenisKelamin'=>'Laki-Laki',
            'StatusPerkawinan'=>'Kawin',
            'Agama'=>'Hindu',
        ]);

        Ewmp::create([
            'dtps' => true,
            'profil_dosen_id' => 1,
            'tahun_akademik' => '2019/2020',
            'semester' => "Genap",
            'sks_ps_akreditasi' => 8,
            'sks_ps_lain_pt' => 4,
            'sks_ps_luar_pt' => 0,
            'sks_penelitian' => 4,
            'sks_pengabdian' => 4,
            'sks_tugas' => 4,
        ]);

        Ewmp::create([
            'dtps' => true,
            'profil_dosen_id' => 1,
            'tahun_akademik' => '2019/2020',
            'semester' => "Ganjil",
            'sks_ps_akreditasi' => 8,
            'sks_ps_lain_pt' => 4,
            'sks_ps_luar_pt' => 0,
            'sks_penelitian' => 4,
            'sks_pengabdian' => 4,
            'sks_tugas' => 4,
        ]);

        Ewmp::create([
            'dtps' => true,
            'profil_dosen_id' => 1,
            'tahun_akademik' => '2020/2021',
            'semester' => "Genap",
            'sks_ps_akreditasi' => 8,
            'sks_ps_lain_pt' => 4,
            'sks_ps_luar_pt' => 0,
            'sks_penelitian' => 4,
            'sks_pengabdian' => 4,
            'sks_tugas' => 4,
        ]);

        Ewmp::create([
            'dtps' => true,
            'profil_dosen_id' => 1,
            'tahun_akademik' => '2020/2021',
            'semester' => "Ganjil",
            'sks_ps_akreditasi' => 10,
            'sks_ps_lain_pt' => 4,
            'sks_ps_luar_pt' => 0,
            'sks_penelitian' => 4,
            'sks_pengabdian' => 4,
            'sks_tugas' => 4,
        ]);

        Ewmp::create([
            'dtps' => true,
            'profil_dosen_id' => 2,
            'tahun_akademik' => '2020/2021',
            'semester' => "Genap",
            'sks_ps_akreditasi' => 8,
            'sks_ps_lain_pt' => 4,
            'sks_ps_luar_pt' => 0,
            'sks_penelitian' => 4,
            'sks_pengabdian' => 4,
            'sks_tugas' => 4,
        ]);

        Ewmp::create([
            'dtps' => true,
            'profil_dosen_id' => 2,
            'tahun_akademik' => '2020/2021',
            'semester' => "Ganjil",
            'sks_ps_akreditasi' => 10,
            'sks_ps_lain_pt' => 4,
            'sks_ps_luar_pt' => 0,
            'sks_penelitian' => 4,
            'sks_pengabdian' => 4,
            'sks_tugas' => 4,
        ]);

        Mitra::create([
            'namamitra' => 'Pilar Kreatif Teknologi',
            'alamat' => 'Denpasar',
            'no_telepon' => '085123123123',
            'nama_cp' => 'JOse v2',
            'no_telp_cp' => '089123123242',
            'email_cp' => 'jose2@gmail.com',
            'bidang' => 'Teknologi',
        ]);

        Mitra::create([
            'namamitra' => 'Avatar Solution',
            'alamat' => 'Badung',
            'no_telepon' => '085123123123',
            'nama_cp' => 'Doni ',
            'no_telp_cp' => '089123123242',
            'email_cp' => 'Doni@gmail.com',
            'bidang' => 'Teknologi',
        ]);

        //capaian kurikulum
        CapKurikulum::create([
            'semester' => 'I',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 4,
        ]);

        CapKurikulum::create([
            'semester' => 'I',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 5,
        ]);

        CapKurikulum::create([
            'semester' => 'II',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 11,
        ]);

        CapKurikulum::create([
            'semester' => 'II',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 12,
        ]);

        CapKurikulum::create([
            'semester' => 'III',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 16,
        ]);

        CapKurikulum::create([
            'semester' => 'III',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 17,
        ]);

        CapKurikulum::create([
            'semester' => 'IV',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 21,
        ]);

        CapKurikulum::create([
            'semester' => 'IV',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => 'V',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 0,
            'praktikum' => 3,
            'konversi_kredit_jam' => 7,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 22,
        ]);

        CapKurikulum::create([
            'semester' => 'V',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => '',
            'kuliah_responsi_tutorial' => 0,
            'seminar' => 0,
            'praktikum' => 6,
            'konversi_kredit_jam' => 4,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 28,
        ]);

        CapKurikulum::create([
            'semester' => 'V',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => '',
            'kuliah_responsi_tutorial' => 0,
            'seminar' => 0,
            'praktikum' => 6,
            'konversi_kredit_jam' => 6,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 29,
        ]);

        CapKurikulum::create([
            'semester' => 'VI',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => '',
            'kuliah_responsi_tutorial' => 2,
            'seminar' => 0,
            'praktikum' => 0,
            'konversi_kredit_jam' => 2,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 32,
        ]);

        CapKurikulum::create([
            'semester' => 'VI',
            'tahun' => '2021',
            'mata_kuliah_kompetensi' => '',
            'kuliah_responsi_tutorial' => 1,
            'seminar' => 1,
            'praktikum' => 0,
            'konversi_kredit_jam' => 3,
            'sikap' => 'V',
            'pengetahuan' => 'V',
            'ketrampilan_umum' => 'V',
            'ketrampilan_khusus' => 'V',
            'dok_ren_pembelajaran' => 'V',
            'unit_penyelenggara' => 'JTE MI',
            'prodi_ID' => 1,
            'matkul_ID' => 33,
        ]);

        // Sumber mandiri/pt
        
        // Penelitian::create(
        //     [
        //         'tema_sesuai_roadmap' => 'kelistrikan',
        //         'judul' => 'Membuat pembangkit listrik',
        //         'tahun' => '2021',
        //         'sumber_dana_PT_mandiri' => 'mandiri',
        //         'dana_PT_Mandiri' => 500000,
        //         'sumber_dalam_negri' => '',
        //         'dana_dalam_negri' => 0,
        //         'sumber_luar_negri' => '',
        //         'dana_luar_negri' => 0,
        //     ]
        // );

        // Penelitian::create( 
        //     [
        //         'tema_sesuai_roadmap'=> 'kelistrikan 2',
        //         'judul' => 'Membuat pembangkit listrik 2', 
        //         'tahun' => '2020', 
        //         'sumber_dana_PT_mandiri' => 'mandiri', 
        //         'dana_PT_Mandiri' => 500000, 
        //         'sumber_dalam_negri' => '', 
        //         'dana_dalam_negri' => 0, 
        //         'sumber_luar_negri' => '', 
        //         'dana_luar_negri' => 0,
        //     ]
        // );

        // Penelitian::create( 
        //     [
        //         'tema_sesuai_roadmap'=> 'kelistrikan 3',
        //         'judul' => 'Membuat pembangkit listrik 3', 
        //         'tahun' => '2019', 
        //         'sumber_dana_PT_mandiri' => 'mandiri', 
        //         'dana_PT_Mandiri' => 500000, 
        //         'sumber_dalam_negri' => '', 
        //         'dana_dalam_negri' => 0, 
        //         'sumber_luar_negri' => '', 
        //         'dana_luar_negri' => 0,
        //     ]
        // );


        // Seeder SDM
        $this->call([
            SdmSeeder::class,
            // PostSeeder::class,
            // CommentSeeder::class,
        ]);
                

        RelasiDosPen::create(
            [
                'profil_dosen_id' => 3,
                'penelitian_id' => 1,
                'keanggotaan' => 'anggota',
            ]
        );

        // Pkm::create(
        //     [
        //         'tema_sesuai_roadmap' => 'webinar',
        //         'judul_kegiatan' => 'kegiatan webinar',
        //         'lokasi' => 'singapadu',
        //         'tahun' => '2022',
        //         'sumber_dana_PT_mandiri' => 'mandiri',
        //         'dana_PT_Mandiri' => 500000,
        //         'sumber_dalam_negri' => 'dalam',
        //         'dana_dalam_negri' => 70000,
        //         'sumber_luar_negri' => 'luar',
        //         'dana_luar_negri' => 9000000,
        //     ]
        // );

        RelasiPkmDos::create(
            [
                'profil_dosen_id' => 1,
                'pkm_id' => 1,
                'keanggotaan' => 'Dika',
            ]
        );

        RelasiPkmMhs::create(
            [
                'mahasiswa_id' => 1,
                'pkm_id' => 1,
                'keanggotaan' => 'Eva',
            ]
        );

        RelasiCapMatkul::create(
            [
                'matkul_id' => 1,
                'cap_kurikulum_id' => 1,
                'keanggotaan' => 'Deva',
            ]
        );

        Prodi::create(
            [
                'prodi' => 'D-3',
                'nama_prodi' => 'Manaejemen Informatika',
            ]
        );

        RelasiIntDos::create(
            [
                'profil_dosen_id' => 1,
                'integrasi_id' => 1,
                'keanggotaan' => 'devira',
            ]
        );

        RelasiIntMatkul::create(
            [
                'matkul_id' => 1,
                'integrasi_id' => 1,
                'keanggotaan' => 'devano',
            ]
        );

        RelasiPenMhs::create(
            [
                'mahasiswa_id' => 1,
                'penelitian_id' => 1,
                'keanggotaan' => 'devano',
            ]
        );

        Kepuasan_MHS::create(
            [
                'tahun' => '2021',
                'keandalan_4' => '21.99',
                'keandalan_3' => '75.42',
                'keandalan_2' => '1.99',
                'keandalan_1' => '0.6',
                'tl_keandalan' => 'Kehandalan peralatan praktikum sudah baik, namun dengan meningkatkannya proses pembelajaran akan menjadi semakin optimal',
                'dayatanggap_4' => '20.23',
                'dayatanggap_3' => '76.94',
                'dayatanggap_2' => '2.27',
                'dayatanggap_1' =>'0.57',
                'tl_dayatanggap' => 'Daya tanggap (responsible) dosen sudah sangat baik, untuk menjamin mutu tersebut penting untuk di ditingkatkan perhatian pada aspek daya serap mahasiswa',
                'kepastian_4' => '28.75',
                'kepastian_3' => '65.43',
                'kepastian_2' => '4.59',
                'kepastian_1' => '1.23',
                'tl_kepastian' => 'Optimalitas pembelajaran sudah baik dengan menjaga keterjaminan mutu penyelenggaraan sampai dengan pengumuman hasil proses pembelajaran kepada mahasiswa ',
                'empati_4' => '27.91',
                'empati_3' => '67.27',
                'empati_2' => '0.6',
                'empati_1' => '4.22',
                'tl_empati' => 'Optimalitas proses belajar mengajar akan menjadi lebih efektif dengan memberikan perhatian lebih kepada mahasiswa yang di anggap kurang mampu mengikuti proses belajar mengajar',
                'tangible_4' => '21.99',
                'tangible_3' => '75.42',
                'tangible_2' => '1.99',
                'tangible_1' => '0.6',
                'tl_tangible' => 'Upaya untuk mengingkatkan fasilitas pembelajaran merupakan salah satu bentuk optimalitas pembelajaran',      
                'prodi_id' => 1,
                ]
        );

    }
}
