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
use App\Http\Controllers\SdmLaporanController;
use App\Http\Controllers\RelasiLuaranController;
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

// Kepuasan lulusan
Route::get('kepuasan', [KepuasanController::class, 'index']);
Route::post('kepuasan', [KepuasanController::class, 'store']);
Route::put('update_kepuasan/{id}', [KepuasanController::class, 'update']);

// Tempat kerja lulusan
Route::get('tempat', [TempatController::class, 'index']);
Route::post('tempat', [TempatController::class, 'store']);
Route::put('update_tempat/{id}', [TempatController::class, 'update']);
Route::get('show_tempat/{id}', [TempatController::class, 'show']);

// IPK
Route::get('ipk/laporan/{tahun}', [IpkController::class, 'exportpendos']);
Route::get('ipk', [IpkController::class, 'index']);
Route::post('ipk', [IpkController::class, 'store']);
Route::put('update_ipk/{id}', [IpkController::class, 'update']);
Route::get('show_ipk/{id}', [IpkController::class, 'show']);

//Prestasi
Route::get('prestasi', [PrestasiController::class, 'index']);
Route::post('prestasi', [PrestasiController::class, 'store']);
Route::put('edit_prestasi/{id}', [PrestasiController::class, 'update']);
Route::get('show_prestasi/{id}', [PrestasiController::class, 'show']);
Route::post('delete_prestasi/{id}', [PrestasiController::class, 'destroy']);

//Kesesuaian bidang kerja
Route::get('kesesuaian', [KesesuaianController::class, 'index']);
Route::post('kesesuaian', [KesesuaianController::class, 'store']);
Route::put('edit_kesesuaian/{id}', [KesesuaianController::class, 'update']);
Route::get('show_kesesuaian/{id}', [KesesuaianController::class, 'show']);
Route::post('delete_kesesuaian/{id}', [KesesuaianController::class, 'destroy']);

//Masa Studi
Route::get('masastudi', [MasastudiController::class, 'index']);
Route::post('masastudi', [MasastudiController::class, 'store']);
Route::put('edit_masastudi/{id}', [MasastudiController::class, 'update']);
Route::get('show_masastudi/{id}', [MasastudiController::class, 'show']);
Route::post('delete_masastudi/{id}', [MasastudiController::class, 'destroy']);

//Waktu tunggu
Route::get('waktutunggu', [WaktutungguController::class, 'index']);
Route::post('waktutunggu', [WaktutungguController::class, 'store']);
Route::put('edit_waktutunggu/{id}', [WaktutungguController::class, 'update']);
Route::get('show_waktutunggu/{id}', [WaktutungguController::class, 'show']);
Route::post('delete_waktutunggu/{id}', [WaktutungguController::class, 'destroy']);

//Luaran lainnya
Route::post('luaran_mhs/{id}', [LuaranlainnyaController::class, 'pilihmahasiswa']);
Route::get('luaran', [LuaranlainnyaController::class, 'index']);
Route::post('luaran', [LuaranlainnyaController::class, 'store']);
Route::put('edit_luaran/{id}', [LuaranlainnyaController::class, 'update']);
Route::get('show_luaran/{id}', [LuaranlainnyaController::class, 'show']);
Route::post('delete_luaran/{id}', [LuaranlainnyaController::class, 'destroy']);


//Pagelaran MHS
Route::get('pagelaran', [PagelaranController::class, 'index']);
Route::post('pagelaran', [PagelaranController::class, 'store']);
Route::put('edit_pagelaran/{id}', [PagelaranController::class, 'update']);
Route::get('show_pagelaran/{id}', [PagelaranController::class, 'show']);
Route::post('delete_pagelaran/{id}', [PagelaranController::class, 'destroy']);

//Tulisan MHS
Route::post('tulisan', [TulisanController::class, 'store']);
Route::put('tulisan/{id}', [TulisanController::class, 'update']);

//Seminar MHS
Route::get('seminar', [SeminarController::class, 'index']);
Route::post('seminar', [SeminarController::class, 'store']);
Route::put('edit_seminar/{id}', [SeminarController::class, 'update']);
Route::post('delete_seminar/{id}', [SeminarController::class, 'destroy']);
Route::get('show_seminar/{id}', [SeminarController::class, 'show']);

//Buku
Route::get('buku', [BukuController::class, 'index']);
Route::post('buku', [BukuController::class, 'store']);
Route::put('edit_buku/{id}', [BukuController::class, 'update']);
Route::post('delete_buku/{id}', [BukuController::class, 'destroy']);
Route::get('show_buku/{id}', [BukuController::class, 'show']);

//Produk
Route::post('produk', [ProdukController::class, 'store']);
Route::put('produk/{id}', [ProdukController::class, 'update']);

//Presentase kepuasan
Route::post('presentase', [PresentaseController::class, 'store']);
Route::put('presentase/{id}', [PresentaseController::class, 'update']);


Route::post('created', [MitraController::class, 'insertmitra']);
Route::get('read_mitra', [MitraController::class, 'tampil_mitra']);
Route::get('show_mitra/{id}', [MitraController::class, 'tampil_editmitra']);
Route::post('update_mitra/{id}', [MitraController::class, 'editmitra']);
Route::post('delete_mitra/{id}', [MitraController::class, 'deletemitra']);

Route::get('read_kjs', [KerjasamaController::class, 'tampilkerjasama']);
Route::get('read_bidang_kjs/{bidang}', [KerjasamaController::class, 'tampilkerjasamabidang']);
Route::get('read_kjs/{search}', [KerjasamaController::class, 'searchkerjasama']);
Route::post('create_kjs', [KerjasamaController::class, 'insertkerjasama']);
Route::get('show_kjs/{id}', [KerjasamaController::class, 'tampil_edit_kerjasama']);
Route::post('update_kjs/{id}', [KerjasamaController::class, 'editkerjasama']);
Route::post('delete_kjs/{id}', [KerjasamaController::class, 'delete_kjs']);


Route::post('create_penggunaan_dana', [PenggunaanDanaController::class, 'insert_penggunaan_dana']);
Route::get('read_penggunaan_dana', [PenggunaanDanaController::class, 'tampil_penggunaan_dana']);
Route::post('update_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'edit_penggunaan_dana']);
Route::get('export_penggunaan_dana/{tahun}', [PenggunaanDanaController::class, 'export_penggunaan_dana']);
Route::get('show_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'tampil_edit_dana']);
Route::post('delete_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'delete_penggunaan_dana']);

Route::post('create_mahasiswa_asing', [MahasiswaAsingController::class, 'insert_mahasiswa_asing']);
Route::get('read_mahasiswa_asing', [MahasiswaAsingController::class, 'tampil_mahasiswa_asing']);
Route::get('search_mahasiswa_asing/{search}', [MahasiswaAsingController::class, 'search_mahasiswa_asing']);
Route::get('export_mahasiswa_asing/{tahun}', [MahasiswaAsingController::class, 'tampilexport_mahasiswa_asing']);
Route::get('show_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'tampil_edit_mahasiswa_asing']);
Route::post('update_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'edit_mahasiswa_asing']);
Route::post('delete_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'delete_mahasiswa_asing']);


Route::post('create_penerimaan_mahasiswa', [PenerimaanController::class, 'insert_penerimaan_mahasiswa']);
Route::get('read_penerimaan_mahasiswa', [PenerimaanController::class, 'tampilmahasiswa']);
Route::get('search_penerimaan_mahasiswa/{search}', [PenerimaanController::class, 'searchmahasiswa']);
Route::get('show_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'tampil_edit_penerimaan']);
Route::post('update_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'edit_penerimaan_mahasiswa']);
Route::post('delete_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'delete_penerimaan_mahasiswa']);


Route::get('profildosens', [ProfildosenController::class, 'index']);
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

// Dev area EWMP
Route::get('ewmps', [EwmpController::class, 'index']);
// Dev area Laporan
Route::get('ewmplisttahun', [EwmpController::class, 'listtahun']);
Route::get('laporanewmp/{tahun}', [SdmLaporanController::class, 'exportewmp']);
Route::get('laporanpendos/{tahun}', [SdmLaporanController::class, 'exportpendos']);
Route::get('laporanpkmdos/{tahun}', [SdmLaporanController::class, 'exportpkmdos']);
Route::get('laporanpublikasidos/{tahun}', [SdmLaporanController::class, 'exportpublikasidos']);




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
// Route::get('Prodi', [ProdiController::class, 'index']);
Route::post('Prodi', [ProdiController::class, 'store']);
Route::put('Prodi/{id}', [ProdiController::class, 'update']);
Route::get('Prodi', [ProdiController::class, 'tampilprodi']);

//route mahasiswa
Route::get('tampil_Mahasiswa/{id}', [MahasiswaController::class, 'show']);
Route::get('Mahasiswa', [MahasiswaController::class, 'index']);
Route::post('Mahasiswa', [MahasiswaController::class, 'store']);
Route::put('Mahasiswa_Update/{id}', [MahasiswaController::class, 'update']);

//Relasi Luaran
Route::get('relasiluaran', [RelasiluaranController::class, 'index']);
Route::put('edit_relasiluaran/{id}', [RelasiluaranController::class, 'update']);
Route::post('relasiluaran', [RelasiLuaranController::class, 'store']);

//route matkul
Route::get('tampil_Matkul/{id}', [MatkulController::class, 'show']);
Route::get('Matkul', [MatkulController::class, 'index']);
Route::post('Matkul', [MatkulController::class, 'store']);
Route::put('Matkul_Update/{id}', [MatkulController::class, 'update']);
Route::post('Matkul_Delete/{id}', [MatkulController::class, 'destroy']);

//route kepuasan mahasiswa
Route::get('tampil_KepuasanMHS/{id}', [KepuasanMHSController::class, 'show']);
Route::get('KepuasanMHS', [KepuasanMHSController::class, 'index']);
Route::post('KepuasanMHS', [KepuasanMHSController::class, 'store']);
Route::put('KepuasanMHS_Update/{id}', [KepuasanMHSController::class, 'update']);

//route produk mahasiswa
Route::get('tampil_ProdukMHS/{id}', [ProdukMHSController::class, 'show']);
Route::get('ProdukMHS', [ProdukMHSController::class, 'index']);
Route::post('ProdukMHS', [ProdukMHSController::class, 'store']);
Route::put('ProdukMHS_Update/{id}', [ProdukMHSController::class, 'update']);
Route::post('ProdukMHS_Delete/{id}', [ProdukMHSController::class, 'destroy']);

//route data capaian kurikulum
Route::get('tampil_CapaianKurikulum/{id}', [CapKurikulumController::class, 'show']);
Route::get('CapaianKurikulum', [CapKurikulumController::class, 'index']);
Route::post('CapaianKurikulum', [CapKurikulumController::class, 'store']);
Route::put('CapaianKurikulum_Update/{id}', [CapKurikulumController::class, 'update']);
Route::post('CapaianKurikulum_Delete/{id}', [CapKurikulumController::class, 'destroy']);

//route data PKM
Route::get('tampil_PKM/{id}', [PKMController::class, 'show']);
Route::get('PKM', [PKMController::class, 'index']);
Route::post('PKM', [PKMController::class, 'store']);
Route::put('PKM_Update/{id}', [PKMController::class, 'update']);
Route::post('PKM_Delete/{id}', [PKMController::class, 'destroy']);

//route penelitian
Route::get('tampil_Penelitian/{id}', [PenelitianController::class, 'show']);
Route::get('Penelitian', [PenelitianController::class, 'index']);
Route::post('Penelitian', [PenelitianController::class, 'store']);
Route::put('Penelitian_Update/{id}', [PenelitianController::class, 'update']);

//route integrasi
Route::get('tampil_Integrasi/{id}', [IntegrasiController::class, 'show']);
Route::get('Integrasi', [IntegrasiController::class, 'index']);
Route::post('Integrasi', [IntegrasiController::class, 'store']);
Route::put('Integrasi_Update/{id}', [IntegrasiController::class, 'update']);
Route::post('Integrasi_Delete/{id}', [IntegrasiController::class, 'destroy']);

