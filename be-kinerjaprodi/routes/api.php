<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\IpkController;
use App\Http\Controllers\KepuasanController;
use App\Http\Controllers\KesesuaianController;
use App\Http\Controllers\LuaranlainnyaController;
use App\Http\Controllers\MasastudiController;
use App\Http\Controllers\PagelaranController;
use App\Http\Controllers\PresentaseController;
use App\Http\Controllers\PrestasiController;
use App\Http\Controllers\ProdiController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\SeminarController;
use App\Http\Controllers\TempatController;
use App\Http\Controllers\TulisanController;
use App\Http\Controllers\WaktutungguController;

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