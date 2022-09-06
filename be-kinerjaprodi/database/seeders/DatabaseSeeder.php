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
            'NIDK' => '0010117504',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '0010117504',
            'NamaDosen' => 'I Wayan Suasnawa, ST.,MT.',
            'NIK' => "197511102001121002",
            'TempatLahir' => 'Denpasar',
            'TanggalLahir' => '1975-10-10',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor',
            'Agama' => 'Hindu',
        ]);

        User::create([
            'NIDK' => '0026067304',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '0026067304',
            'NamaDosen' => 'Sri Andriati Asri, ST., M.Kom',
            'NIK' => "197306261999032001",
            'TempatLahir' => 'Denpasar',
            'TanggalLahir' => '1973-06-26',
            'JenisKelamin' => 'Perempuan',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor Kepala',
            'Agama' => 'Islam',
        ]);

        // User::create([
        //     'NIDK' => '0014037205',
        //     'role' => 'dosen',
        //     'level_akses' => 2,
        //     'password' => bcrypt('12345678'),
        // ]);

        // profilDosen::create([
        //     'NIDK' => '0014037205',
        //     'NamaDosen' => 'Putu Gde Sukarata, ST.MT.',
        //     'NIK' => "197203142001121001",
        //     'TempatLahir' => 'Denpasar',
        //     'TanggalLahir' => '1972-03-14',
        //     'JenisKelamin' => 'Laki-Laki',
        //     'StatusPerkawinan' => 'Kawin',
        //     'JabatanAkademik'=>'Lektor',
        //     'Agama' => 'Hindu',
        // ]);

        User::create([
            'NIDK' => '00051971',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '00051971',
            'NamaDosen' => 'I Gusti Ngurah Bagus Caturbawa',
            'NIK' => "97111051999031002",
            'TempatLahir' => 'Singaraja',
            'TanggalLahir' => '1971-02-17',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor',
            'Agama' => 'Hindu',
        ]);

        User::create([
            'NIDK' => '0012026908',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '0012026908',
            'NamaDosen' => 'Dr. I Nyoman Gede Arya Astawa, ST., M.Kom',
            'NIK' => "196902121995121001 ",
            'TempatLahir' => 'Singaraja',
            'TanggalLahir' => '1969-02-12',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor Kepala',
            'Agama' => 'Hindu',
        ]);

        User::create([
            'NIDK' => '0805119002',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '0805119002',
            'NamaDosen' => 'I Komang Wiratama, S.Kom., M.Cs.',
            'NIK' => "199011052019031009 ",
            'TempatLahir' => 'Denpasar',
            'TanggalLahir' => '1990-10-05',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>' ',
            'Agama' => 'Hindu',
        ]);

        User::create([
            'NIDK' => '0006078502',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '0006078502',
            'NamaDosen' => 'Gusti Nyoman Ayu Sukerti, S.S.,M.Hum',
            'NIK' => "199011052019031009 ",
            'TempatLahir' => 'Bangli',
            'TanggalLahir' => '1985-07-06',
            'JenisKelamin' => 'Perempuan',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Lektor',
            'Agama' => 'Hindu',
        ]);

        User::create([
            'NIDK' => '0804049001',
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('12345678'),
        ]);

        profilDosen::create([
            'NIDK' => '0804049001',
            'NamaDosen' => 'I Made Riyan Adi Nugroho, S.S.I., M.T.',
            'NIK' => "199004042019031017",
            'TempatLahir' => 'Sukoharjo',
            'TanggalLahir' => '1990-04-04',
            'JenisKelamin' => 'Laki-Laki',
            'StatusPerkawinan' => 'Kawin',
            'JabatanAkademik'=>'Asisten Ahli',
            'Agama' => 'Hindu',
        ]);

        // User::create([
        //     'NIDK' => '11111111',
        //     'role' => 'dosen',
        //     'level_akses' => 2,
        //     'password' => bcrypt('12345678'),
        // ]);

        // User::create([
        //     'NIDK' => '22222222',
        //     'role' => 'dosen',
        //     'level_akses' => 2,
        //     'password' => bcrypt('12345678'),
        // ]);

        // User::create([
        //     'NIDK' => '33333333',
        //     'role' => 'dosen',
        //     'level_akses' => 2,
        //     'password' => bcrypt('12345678'),
        // ]);

        // User::create([
        //     'NIDK' => '44444444',
        //     'role' => 'dosen',
        //     'level_akses' => 2,
        //     'password' => bcrypt('12345678'),
        // ]);

        // User::create([
        //     'NIDK' => '55555555',
        //     'role' => 'dosen',
        //     'level_akses' => 2,
        //     'password' => bcrypt('12345678'),
        // ]);

        // profilDosen::create([
        //     'NIDK' => '87654321',
        //     'NamaDosen' => 'royanF',
        //     'NIK' => "12345678",
        //     'TempatLahir' => 'Tabanan',
        //     'TanggalLahir' => '2000-12-25',
        //     'JenisKelamin' => 'Laki-Laki',
        //     'StatusPerkawinan' => 'Belum Kawin',
        //     'JabatanAkademik'=>'Lektor Kepala',
        //     'Agama' => 'Kristen',
        // ]);

        // profilDosen::create([
        //     'NIDK' => '11111111',
        //     'NamaDosen' => 'nama 111',
        //     'NIK' => "911111111",
        //     'TempatLahir' => 'Singaraja',
        //     'TanggalLahir' => '1998-12-25',
        //     'JenisKelamin' => 'Laki-Laki',
        //     'StatusPerkawinan' => 'Kawin',
        //     'JabatanAkademik'=>'Lektor Kepala',
        //     'Agama' => 'Hindu',
        // ]);

        // profilDosen::create([
        //     'NIDK' => '22222222',
        //     'NamaDosen' => 'nama 222',
        //     'NIK' => "922222222",
        //     'TempatLahir' => 'Singaraja',
        //     'TanggalLahir' => '1998-12-25',
        //     'JenisKelamin' => 'Laki-Laki',
        //     'StatusPerkawinan' => 'Kawin',
        //     'JabatanAkademik'=>'Lektor Kepala',
        //     'Agama' => 'Hindu',
        // ]);

        // profilDosen::create([
        //     'NIDK' => '33333333',
        //     'NamaDosen' => 'nama 333',
        //     'NIK' => "933333333",
        //     'TempatLahir' => 'Singaraja',
        //     'TanggalLahir' => '1998-12-25',
        //     'JenisKelamin' => 'Laki-Laki',
        //     'StatusPerkawinan' => 'Kawin',
        //     'JabatanAkademik'=>'Lektor Kepala',
        //     'Agama' => 'Hindu',
        // ]);

        // profilDosen::create([
        //     'NIDK'=>'44444444',
        //     'NamaDosen'=>'nama 444',
        //     'NIK'=>"944444444",
        //     'TempatLahir'=>'Singaraja',
        //     'TanggalLahir'=>'1998-12-25',
        //     'JenisKelamin'=>'Laki-Laki',
        //     'StatusPerkawinan'=>'Kawin',
        //     'Agama'=>'Hindu',
        // ]);

        // Ewmp::create([
        //     'dtps' => true,
        //     'profil_dosen_id' => 1,
        //     'tahun_akademik' => '2019/2020',
        //     'semester' => "Genap",
        //     'sks_ps_akreditasi' => 8,
        //     'sks_ps_lain_pt' => 4,
        //     'sks_ps_luar_pt' => 0,
        //     'sks_penelitian' => 4,
        //     'sks_pengabdian' => 4,
        //     'sks_tugas' => 4,
        // ]);

        // Ewmp::create([
        //     'dtps' => true,
        //     'profil_dosen_id' => 1,
        //     'tahun_akademik' => '2019/2020',
        //     'semester' => "Ganjil",
        //     'sks_ps_akreditasi' => 8,
        //     'sks_ps_lain_pt' => 4,
        //     'sks_ps_luar_pt' => 0,
        //     'sks_penelitian' => 4,
        //     'sks_pengabdian' => 4,
        //     'sks_tugas' => 4,
        // ]);

        // Ewmp::create([
        //     'dtps' => true,
        //     'profil_dosen_id' => 1,
        //     'tahun_akademik' => '2020/2021',
        //     'semester' => "Genap",
        //     'sks_ps_akreditasi' => 8,
        //     'sks_ps_lain_pt' => 4,
        //     'sks_ps_luar_pt' => 0,
        //     'sks_penelitian' => 4,
        //     'sks_pengabdian' => 4,
        //     'sks_tugas' => 4,
        // ]);

        // Ewmp::create([
        //     'dtps' => true,
        //     'profil_dosen_id' => 1,
        //     'tahun_akademik' => '2020/2021',
        //     'semester' => "Ganjil",
        //     'sks_ps_akreditasi' => 10,
        //     'sks_ps_lain_pt' => 4,
        //     'sks_ps_luar_pt' => 0,
        //     'sks_penelitian' => 4,
        //     'sks_pengabdian' => 4,
        //     'sks_tugas' => 4,
        // ]);

        // Ewmp::create([
        //     'dtps' => true,
        //     'profil_dosen_id' => 2,
        //     'tahun_akademik' => '2020/2021',
        //     'semester' => "Genap",
        //     'sks_ps_akreditasi' => 8,
        //     'sks_ps_lain_pt' => 4,
        //     'sks_ps_luar_pt' => 0,
        //     'sks_penelitian' => 4,
        //     'sks_pengabdian' => 4,
        //     'sks_tugas' => 4,
        // ]);

        // Ewmp::create([
        //     'dtps' => true,
        //     'profil_dosen_id' => 2,
        //     'tahun_akademik' => '2020/2021',
        //     'semester' => "Ganjil",
        //     'sks_ps_akreditasi' => 10,
        //     'sks_ps_lain_pt' => 4,
        //     'sks_ps_luar_pt' => 0,
        //     'sks_penelitian' => 4,
        //     'sks_pengabdian' => 4,
        //     'sks_tugas' => 4,
        // ]);

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

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'Teknologi Informasi dan Komunikasi',
                'judul' => 'Analisis Sentimen Twitter terhadap Pelaksanaan Belajar Daring Selama Masa Pandemi', 
                'tahun' => '2021', 
                'sumber_dana_PT_mandiri' => 'Dipa PNB', 
                'dana_PT_Mandiri' => 14000000, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'Smart building',
                'judul' => 'Perancangan dan Implementasi Computer Vision Sebagai Kendali Lampu Pada Smart Home', 
                'tahun' => '2018', 
                'sumber_dana_PT_mandiri' => '-', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );

        // Sumber Luar negri
        Pkm::create( 
            [
                'tema_sesuai_roadmap'=> 'Mengabdi Desa',
                'judul_kegiatan' => 'Pelatihan Digital Marketing bagi UMKM di Desa Serangan Denpasar Bali', 
                'lokasi' => 'Desa Serangan, Denpasar', 
                'tahun' => '2021', 
                'sumber_dana_PT_mandiri' => 'Dana Mandiri', 
                'dana_PT_Mandiri' => 10000000, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '=', 
                'dana_luar_negri' => 0,
            ]
        );

        Pkm::create( 
            [
                'tema_sesuai_roadmap'=> 'Application of Information Technology and Internet of Think In Tourism',
                'judul_kegiatan' => 'Instalasi Jaringan Komputer dan Sosialisasi Sistem Informasi pada Desa Wisata Pinge, Kecamatan Marga, Kabupaten Tabanan, Bali', 
                'lokasi' => 'Desa Wisata Pinge, Kecamatan Marga, Kabupaten Tabanan, Bali', 
                'tahun' => '2019', 
                'sumber_dana_PT_mandiri' => '-', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );

        Pkm::create( 
            [
                'tema_sesuai_roadmap'=> 'Sistem Informasi',
                'judul_kegiatan' => 'PKM Pengelolaan Keuangan Banjar Adat', 
                'lokasi' => 'Banjar Sibang, Desa Sangeh', 
                'tahun' => '2018', 
                'sumber_dana_PT_mandiri' => '-', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => 'DRPM', 
                'dana_dalam_negri' => 41000000, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );


        // Seeder SDM
        // $this->call([
        //     SdmSeeder::class,
        //     // PostSeeder::class,
        //     // CommentSeeder::class,
        // ]);

        Mahasiswa::create(
            [
                'nim' => '1815323031',
                'nama' => 'Nurhakiki Putri Irawan',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323003',
                'nama' => 'Made Dwiki Satria Wibawa',
            ]
        );
        
        Mahasiswa::create(
            [
                'nim' => '1615323039',
                'nama' => 'KOMANG ANOM SUANDI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1715323002',
                'nama' => 'NI PANDE PUTU YUNI ANTARI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1715323006',
                'nama' => 'I PUTU AGUS GUNAWAN',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323054',
                'nama' => 'NARENDRA BRILLIAN AL-GHIFARI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323057',
                'nama' => 'GUSTI AYU NYOMAN SITA WAHANA MURTI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323065',
                'nama' => 'NI NYOMAN LENI  ARIDANI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323072',
                'nama' => 'MADE GEDE ARYA ANDIKA DHARMA KRISNA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323074',
                'nama' => 'PUTU KHRISVANA VHARIYANA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323084',
                'nama' => 'I PUTU YUDHA PRATAMA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323069',
                'nama' => 'MUHAMMAD ALIEVYO RAMADHANI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323056',
                'nama' => 'ALE AKBAR RIZKY',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323052',
                'nama' => 'JAKA WAHYU RAMADHAN',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323008',
                'nama' => 'I NYOMAN WAHYU ADITYA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323064',
                'nama' => 'HABIL HUSNA ADITYA HADI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323104',
                'nama' => 'PANDE KOMANG THEO ASTA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323049',
                'nama' => 'I KOMANG GEDE MAHA WIJASA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323013',
                'nama' => 'DEWA GEDE ADITYA PUTRA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323045',
                'nama' => 'I PUTU AGUS EKA CAHYADI',
            ]
        );
                

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

          //
        // Sumber dalam negri
        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'Teknologi Informasi dan Komunikasi',
                'judul' => 'Analisis Sentimen Twitter terhadap Pelaksanaan Belajar Daring Selama Masa Pandemi', 
                'tahun' => '2021', 
                'sumber_dana_PT_mandiri' => 'Dipa PNB', 
                'dana_PT_Mandiri' => 14000000, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );

        Penelitian::create( 
            [
                'tema_sesuai_roadmap'=> 'Smart building',
                'judul' => 'Perancangan dan Implementasi Computer Vision Sebagai Kendali Lampu Pada Smart Home', 
                'tahun' => '2018', 
                'sumber_dana_PT_mandiri' => '-', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );

        // Sumber Luar negri
        Pkm::create( 
            [
                'tema_sesuai_roadmap'=> 'Mengabdi Desa',
                'judul_kegiatan' => 'Pelatihan Digital Marketing bagi UMKM di Desa Serangan Denpasar Bali', 
                'lokasi' => 'Desa Serangan, Denpasar', 
                'tahun' => '2021', 
                'sumber_dana_PT_mandiri' => 'Dana Mandiri', 
                'dana_PT_Mandiri' => 10000000, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '=', 
                'dana_luar_negri' => 0,
            ]
        );

        Pkm::create( 
            [
                'tema_sesuai_roadmap'=> 'Application of Information Technology and Internet of Think In Tourism',
                'judul_kegiatan' => 'Instalasi Jaringan Komputer dan Sosialisasi Sistem Informasi pada Desa Wisata Pinge, Kecamatan Marga, Kabupaten Tabanan, Bali', 
                'lokasi' => 'Desa Wisata Pinge, Kecamatan Marga, Kabupaten Tabanan, Bali', 
                'tahun' => '2019', 
                'sumber_dana_PT_mandiri' => '-', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => '-', 
                'dana_dalam_negri' => 0, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );

        Pkm::create( 
            [
                'tema_sesuai_roadmap'=> 'Sistem Informasi',
                'judul_kegiatan' => 'PKM Pengelolaan Keuangan Banjar Adat', 
                'lokasi' => 'Banjar Sibang, Desa Sangeh', 
                'tahun' => '2018', 
                'sumber_dana_PT_mandiri' => '-', 
                'dana_PT_Mandiri' => 0, 
                'sumber_dalam_negri' => 'DRPM', 
                'dana_dalam_negri' => 41000000, 
                'sumber_luar_negri' => '-', 
                'dana_luar_negri' => 0,
            ]
        );

        RelasiDosPen::create(
            [
                'profil_dosen_id'=> 1,
                'penelitian_id' => 1,
                'keanggotaan' => 'Ketua', 
            ]);
            
        Mahasiswa::create(
            [
                'nim' => '1815323031',
                'nama' => 'Nurhakiki Putri Irawan',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323003',
                'nama' => 'Made Dwiki Satria Wibawa',
            ]
        );
        
        Mahasiswa::create(
            [
                'nim' => '1615323039',
                'nama' => 'KOMANG ANOM SUANDI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1715323002',
                'nama' => 'NI PANDE PUTU YUNI ANTARI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1715323006',
                'nama' => 'I PUTU AGUS GUNAWAN',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323054',
                'nama' => 'NARENDRA BRILLIAN AL-GHIFARI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323057',
                'nama' => 'GUSTI AYU NYOMAN SITA WAHANA MURTI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323065',
                'nama' => 'NI NYOMAN LENI  ARIDANI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323072',
                'nama' => 'MADE GEDE ARYA ANDIKA DHARMA KRISNA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323074',
                'nama' => 'PUTU KHRISVANA VHARIYANA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1815323084',
                'nama' => 'I PUTU YUDHA PRATAMA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323069',
                'nama' => 'MUHAMMAD ALIEVYO RAMADHANI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323056',
                'nama' => 'ALE AKBAR RIZKY',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323052',
                'nama' => 'JAKA WAHYU RAMADHAN',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323008',
                'nama' => 'I NYOMAN WAHYU ADITYA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323064',
                'nama' => 'HABIL HUSNA ADITYA HADI',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '2015323104',
                'nama' => 'PANDE KOMANG THEO ASTA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323049',
                'nama' => 'I KOMANG GEDE MAHA WIJASA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323013',
                'nama' => 'DEWA GEDE ADITYA PUTRA',
            ]
        );

        Mahasiswa::create(
            [
                'nim' => '1915323045',
                'nama' => 'I PUTU AGUS EKA CAHYADI',
            ]
        );
          // Data Matkul
          Matkul::create(
            [
                'nama_matkul' => 'Pendidikan Pancasila*',
                'kode_matkul' => 'MPK-132201',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create( 
            [
                'nama_matkul' => 'Bahasa Inggris I',
                'kode_matkul' => 'MPK-132202',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Interaksi Manusia Komputer',
                'kode_matkul' => 'MKK-132203',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Perancangan Basis Data*',
                'kode_matkul' => 'MKB-132204',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        #id 5
        Matkul::create(
            [
                'nama_matkul' => 'Algoritma dan Pemrograman Dasar*',
                'kode_matkul' => 'MKK-132205',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Desain Grafis',
                'kode_matkul' => 'MKB-132206',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        #id 7
        Matkul::create(
            [
                'nama_matkul' => 'Pengantar Teknologi  Informasi',
                'kode_matkul' => 'MKK-132207',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        #id 8
        Matkul::create(
            [
                'nama_matkul' => 'Statistika',
                'kode_matkul' => 'MKK-232201',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Bahasa Inggris II',
                'kode_matkul' => 'MPK-232202',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        #id 10
        Matkul::create(
            [
                'nama_matkul' => 'Jaringan Komputer I*',
                'kode_matkul' => 'MKB-232203',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        #id 11
        Matkul::create(
            [
                'nama_matkul' => 'Analisa dan Perancangan Sistem*',
                'kode_matkul' => 'MKB-232204',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Disain Web*',
                'kode_matkul' => 'MKB-232205',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Basis Data Terapan*',
                'kode_matkul' => 'MKB-232206',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Kewarganegaraan*',
                'kode_matkul' => 'MPK-332201',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'K3',
                'kode_matkul' => 'MPB-332202',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Pemrograman Berorientasi Objek*',
                'kode_matkul' => 'MKB-332203',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Sistem Informasi Manajemen',
                'kode_matkul' => 'MKK-332204',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Pemrograman Web 1*',
                'kode_matkul' => 'MKB-332205',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Jaringan Komputer II*',
                'kode_matkul' => 'MKB-332206',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Multimedia',
                'kode_matkul' => 'MKB-432201',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Mobile Programming*',
                'kode_matkul' => 'MKB-432202',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Teknologi Cloud',
                'kode_matkul' => 'MKB-432203',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Pemrograman Web 2*',
                'kode_matkul' => 'MKB-432204',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Bahasa Indonesia*',
                'kode_matkul' => 'MPK-432205',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Agama*',
                'kode_matkul' => 'MPK-432206',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Praktek Kerja Lapangan*',
                'kode_matkul' => 'MBB-532201',
                'sks' => 8,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Proyek*',
                'kode_matkul' => 'MPB-532202',
                'sks' => 4,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Kecakapan Personal*',
                'kode_matkul' => 'MPK-532203',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Dasar Manajemen Bisnis*',
                'kode_matkul' => 'MPB-532204',
                'sks' => 3,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Etika Profesi*',
                'kode_matkul' => 'MBB-532205',
                'sks' => 3,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Tugas Akhir*',
                'kode_matkul' => 'MPB-632201',
                'sks' => 6,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Metodelogi Penelitian',
                'kode_matkul' => 'MPB-632203',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Kewirausahaan',
                'kode_matkul' => 'MPB-632203',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

        Matkul::create(
            [
                'nama_matkul' => 'Digital marketing',
                'kode_matkul' => 'MKB-632204',
                'sks' => 2,
                'prodi_id' => 1,
            ]
        );

    }
}
