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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
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