<?php

use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\MatkulController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdiController;
use App\Http\Controllers\KepuasanMHSController;
use App\Http\Controllers\ProdukMHSController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\DetaildosenController;
use App\Http\Controllers\MitraController;
use App\Http\Controllers\KerjasamaController;
use App\Http\Controllers\MahasiswaAsingController;
use App\Http\Controllers\PendidikanController;
use App\Http\Controllers\PenelitianController;
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
Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('testmid', [ApiController::class, 'tester']);
    Route::post('penelitiandosens', [PenelitianController::class, 'store']);
    Route::post('pengabdiandosens', [PengabdianController::class, 'store']);
});

Route::group(['middleware' => ['adminonly']], function () {
    Route::get('testadmin', [ApiController::class, 'tester']);
    Route::post('profildosens', [ProfildosenController::class, 'store']);
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