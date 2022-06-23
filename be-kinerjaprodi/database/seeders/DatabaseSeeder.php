<?php

namespace Database\Seeders;

use App\Models\profilDosen;
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
    }
}
