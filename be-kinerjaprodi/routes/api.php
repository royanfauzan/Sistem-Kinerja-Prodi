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


Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('testmid', [ApiController::class, 'tester']);
});

Route::group(['middleware' => ['adminonly']], function () {
    Route::get('testadmin', [ApiController::class, 'tester']);
    Route::post('profildosens', [ProfildosenController::class, 'store']);
});

Route::group(['middleware' => ['dosenonly']], function () {
    Route::post('detildosens', [DetaildosenController::class, 'store']);
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