<?php

use App\Http\Controllers\CapKurikulumController;
use App\Http\Controllers\IntegrasiController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\MatkulController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdiController;
use App\Http\Controllers\KepuasanMHSController;
use App\Http\Controllers\PenelitianController;
use App\Http\Controllers\PKMController;
use App\Http\Controllers\ProdukMHSController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\BimbinganController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\IpkController;
use App\Http\Controllers\KepuasanController;
use App\Http\Controllers\KesesuaianController;
use App\Http\Controllers\LuaranlainnyaController;
use App\Http\Controllers\MasastudiController;
use App\Http\Controllers\PagelaranController;
use App\Http\Controllers\PresentaseController;
use App\Http\Controllers\PrestasiController;

use App\Http\Controllers\ProdukController;
use App\Http\Controllers\SeminarController;
use App\Http\Controllers\TempatController;
use App\Http\Controllers\TulisanController;
use App\Http\Controllers\WaktutungguController;

use App\Http\Controllers\DetaildosenController;
use App\Http\Controllers\EwmpController;
use App\Http\Controllers\MitraController;
use App\Http\Controllers\KerjasamaController;
use App\Http\Controllers\MahasiswaAsingController;
use App\Http\Controllers\MengajarController;
use App\Http\Controllers\PendidikanController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\PengabdianController;
use App\Http\Controllers\PenggunaanDanaController;
use App\Http\Controllers\ProfildosenController;
use App\Http\Controllers\RekognisiController;
use App\Models\MahasiswaAsing;
use App\Models\PenggunaanDana;
use App\Models\Rekognisi;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [ApiController::class, 'authenticate']);

// Prodi
Route::post('Prodi', [ProdiController::class, 'store']);
Route::put('Prodi/{id}', [ProdiController::class, 'update']);

// Kepuasan lulusan
Route::post('kepuasan', [KepuasanController::class, 'store']);

// Tempat kerja lulusan
Route::post('tempat', [TempatController::class, 'store']);
Route::put('tempat/{id}', [TempatController::class, 'update']);

// IPK
Route::post('ipk', [IpkController::class, 'store']);
Route::put('ipk/{id}', [IpkController::class, 'update']);

//Prestasi
Route::post('prestasi', [PrestasiController::class, 'store']);
Route::put('prestasi/{id}', [PrestasiController::class, 'update']);

//Kesesuaian bidang kerja
Route::post('kesesuaian', [KesesuaianController::class, 'store']);
Route::put('kesesuaian/{id}', [KesesuaianController::class, 'update']);

//Masa Studi
Route::post('masastudi', [MasastudiController::class, 'store']);
Route::put('masastudi/{id}', [MasastudiController::class, 'update']);

//Waktu tunggu
Route::post('waktutunggu', [WaktutungguController::class, 'store']);
Route::put('waktutunggu/{id}', [WaktutungguController::class, 'update']);

//Luaran lainnya
Route::post('luaran', [LuaranlainnyaController::class, 'store']);
Route::put('luaran/{id}', [LuaranlainnyaController::class, 'update']);

//Pagelaran MHS
Route::post('pagelaran', [PagelaranController::class, 'store']);
Route::put('pagelaran/{id}', [PagelaranController::class, 'update']);

//Tulisan MHS
Route::post('tulisan', [TulisanController::class, 'store']);
Route::put('tulisan/{id}', [TulisanController::class, 'update']);

//Seminar MHS
Route::post('seminar', [SeminarController::class, 'store']);
Route::put('seminar/{id}', [SeminarController::class, 'update']);

//Buku
Route::post('buku', [BukuController::class, 'store']);
Route::put('buku/{id}', [BukuController::class, 'update']);

//Produk
Route::post('produk', [ProdukController::class, 'store']);
Route::put('produk/{id}', [ProdukController::class, 'update']);

//Presentase kepuasan
Route::post('presentase', [PresentaseController::class, 'store']);
Route::put('presentase/{id}', [PresentaseController::class, 'update']);

Route::post('created', [MitraController::class, 'insertmitra']);
Route::post('updated/{id}', [MitraController::class, 'editmitra']);
Route::post('delete/{id}', [MitraController::class, 'deletemitra']);

Route::post('create_kjs', [KerjasamaController::class, 'insertkerjasama']);
Route::post('update_kjs/{id}', [KerjasamaController::class, 'editkerjasama']);
Route::post('delete_kjs/{id}', [KerjasamaController::class, 'delete_kjs']);


Route::post('create_penggunaan_dana', [PenggunaanDanaController::class, 'insert_penggunaan_dana']);
Route::post('update_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'edit_penggunaan_dana']);
Route::post('delete_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'delete_penggunaan_dana']);

Route::post('create_mahasiswa_asing', [MahasiswaAsingController::class, 'insert_mahasiswa_asing']);
Route::post('update_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'edit_mahasiswa_asing']);
Route::post('delete_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'delete_mahasiswa_asing']);

Route::post('create_penerimaan_mahasiswa', [PenerimaanController::class, 'insert_penerimaan_mahasiswa']);
Route::post('update_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'edit_penerimaan_mahasiswa']);
Route::post('delete_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'delete_penerimaan_mahasiswa']);


Route::get('testaxios', [ProfildosenController::class, 'index']);
Route::get('testuser', [ApiController::class, 'get_alluser']);
Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('testmid', [ApiController::class, 'tester']);
    Route::get('get_user', [ApiController::class, 'get_user']);
    Route::post('penelitiandosens', [PenelitianController::class, 'store']);
    Route::post('pengabdiandosens', [PengabdianController::class, 'store']);
    Route::post('ewmps', [EwmpController::class, 'store']);
    Route::post('mengajars', [MengajarController::class, 'store']);
    Route::post('bimbingans', [BimbinganController::class, 'store']);
});

Route::group(['middleware' => ['adminonly']], function () {
    Route::get('testadmin', [ApiController::class, 'tester']);
    Route::post('profildosens', [ProfildosenController::class, 'store']);
    Route::get('profildosens', [ProfildosenController::class, 'index']);
});

Route::group(['middleware' => ['dosenonly']], function () {
    Route::post('detildosens', [DetaildosenController::class, 'store']);
    Route::post('rekognisidosens', [RekognisiController::class, 'store']);
    Route::post('pendidikandosens', [PendidikanController::class, 'store']);
});
//route prodi
Route::post('Prodi', [ProdiController::class, 'store']);
Route::put('Prodi/{id}', [ProdiController::class, 'update']);

//route mahasiswa
Route::post('Mahasiswa', [MahasiswaController::class, 'store']);
Route::put('Mahasiswa/{id}', [MahasiswaController::class, 'update']);

//route matkul
Route::post('Matkul', [MatkulController::class, 'store']);
Route::put('Matkul/{id}', [MatkulController::class, 'update']);

//route kepuasan mahasiswa
Route::post('KepuasanMHS', [KepuasanMHSController::class, 'store']);
Route::put('KepuasanMHS/{id}', [KepuasanMHSController::class, 'update']);

//route produk mahasiswa
Route::post('ProdukMHS', [ProdukMHSController::class, 'store']);
Route::put('ProdukMHS/{id}', [ProdukMHSController::class, 'update']);

//route data capaian kurikulum
Route::post('CapaianKurikulum', [CapKurikulumController::class, 'store']);
Route::put('CapaianKurikulum/{id}', [CapKurikulumController::class, 'update']);

//route data PKM
Route::post('PKM', [PKMController::class, 'store']);
Route::put('PKM/{id}', [PKMController::class, 'update']);

//route penelitian
Route::post('Penelitian', [PenelitianController::class, 'store']);
Route::put('Penelitian/{id}', [PenelitianController::class, 'update']);

//route integrasi
Route::post('Integrasi', [IntegrasiController::class, 'store']);
Route::put('Integrasi/{id}', [IntegrasiController::class, 'update']);

