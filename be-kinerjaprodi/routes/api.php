<?php

use App\Http\Controllers\CapKurikulumController;
use App\Http\Controllers\IntegrasiController;
use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\MatkulController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdiController;
use App\Http\Controllers\KepuasanMHSController;
use App\Http\Controllers\PenelitianController;
use App\Http\Controllers\PKMController;
use App\Http\Controllers\ProdukMHSController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\BbjurnaldosController;
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
use App\Http\Controllers\LuaranlaindosenController;
use App\Http\Controllers\MahasiswaAsingController;
use App\Http\Controllers\MengajarController;
use App\Http\Controllers\PagelarandosController;
use App\Http\Controllers\PendidikanController;
use App\Http\Controllers\PenerimaanController;
use App\Http\Controllers\PengabdianController;
use App\Http\Controllers\PenggunaanDanaController;
use App\Http\Controllers\ProfildosenController;
use App\Http\Controllers\RekognisiController;
use App\Http\Controllers\SdmLaporanController;
use App\Http\Controllers\RelasiLuaranController;
use App\Http\Controllers\SeminardosController;
use App\Http\Controllers\SerkomController;
use App\Http\Controllers\TulisandosController;
use App\Models\Detaildosen;
use App\Models\MahasiswaAsing;
use App\Models\PenggunaanDana;
use App\Models\profilDosen;
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
Route::get('kepuasan/{search}', [KepuasanController::class, 'searchkepuasan']);
Route::get('kepuasan/laporan/{tahun}', [KepuasanController::class, 'exportkepuasan']);
Route::get('kepuasanlisttahun', [KepuasanController::class, 'listtahunkepuasan']);
Route::get('kepuasan', [KepuasanController::class, 'index']);
Route::post('kepuasan', [KepuasanController::class, 'store']);
Route::put('update_kepuasan/{id}', [KepuasanController::class, 'update']);
Route::get('show_kepuasan/{id}', [KepuasanController::class, 'show']);
Route::post('delete_kepuasan/{id}', [KepuasanController::class, 'destroy']);

// Tempat kerja lulusan
Route::get('tempat/{search}', [TempatController::class, 'searchtempat']);
Route::get('tempatlisttahun', [TempatController::class, 'listtahun']);
Route::get('tempat/laporan/{tahun}', [TempatController::class, 'exporttempat']);
Route::get('tempat', [TempatController::class, 'index']);
Route::post('tempat', [TempatController::class, 'store']);
Route::put('update_tempat/{id}', [TempatController::class, 'update']);
Route::get('show_tempat/{id}', [TempatController::class, 'show']);
Route::post('delete_tempat/{id}', [TempatController::class, 'destroy']);

// IPK
Route::get('ipk/laporan/{tahun}', [IpkController::class, 'exportpendos']);
Route::get('ipk', [IpkController::class, 'index']);
Route::post('ipk', [IpkController::class, 'store']);
Route::put('update_ipk/{id}', [IpkController::class, 'update']);
Route::get('show_ipk/{id}', [IpkController::class, 'show']);
Route::get('ipklisttahun', [IpkController::class, 'listtahun']);
Route::get('cari_ipk/{search}', [IpkController::class, 'searchipk']);
Route::post('ipk_delete/{id}', [IpkController::class, 'destroy']);

//Prestasi
Route::get('presakademik/{search}', [PrestasiController::class, 'searchakademik']);
Route::get('prestasi/{search}', [PrestasiController::class, 'searchprestasi']);
Route::get('prestasi', [PrestasiController::class, 'index']);
Route::post('prestasi', [PrestasiController::class, 'store']);
Route::put('edit_prestasi/{id}', [PrestasiController::class, 'update']);
Route::get('show_prestasi/{id}', [PrestasiController::class, 'show']);
Route::post('delete_prestasi/{id}', [PrestasiController::class, 'destroy']);

//Kesesuaian bidang kerja
Route::get('bidang/{search}', [KesesuaianController::class, 'searchbidang']);
Route::get('bidanglisttahun', [KesesuaianController::class, 'listtahun']);
Route::get('kesesuaian/laporan/{tahun}', [KesesuaianController::class, 'exportbidang']);
Route::get('kesesuaian', [KesesuaianController::class, 'index']);
Route::post('kesesuaian', [KesesuaianController::class, 'store']);
Route::put('edit_kesesuaian/{id}', [KesesuaianController::class, 'update']);
Route::get('show_kesesuaian/{id}', [KesesuaianController::class, 'show']);
Route::post('delete_kesesuaian/{id}', [KesesuaianController::class, 'destroy']);

//Masa Studi
Route::get('cari_masastudi/{search}', [MasastudiController::class, 'searchmasastudi']);
Route::get('masastudi/laporan/{tahun}', [MasastudiController::class, 'exportmasastudi']);
Route::get('masastudilisttahun', [MasastudiController::class, 'listtahun']);
Route::get('masastudi', [MasastudiController::class, 'index']);
Route::post('masastudi', [MasastudiController::class, 'store']);
Route::put('edit_masastudi/{id}', [MasastudiController::class, 'update']);
Route::get('show_masastudi/{id}', [MasastudiController::class, 'show']);
Route::post('delete_masastudi/{id}', [MasastudiController::class, 'destroy']);

//Waktu tunggu
Route::get('waktutunggu/{search}', [WaktutungguController::class, 'searchwaktutunggu']);
Route::get('waktutunggulisttahun', [WaktutungguController::class, 'listtahun']);
Route::get('waktutunggu/laporan/{tahun}', [WaktutungguController::class, 'exportwaktutunggu']);
Route::get('waktutunggu', [WaktutungguController::class, 'index']);
Route::post('waktutunggu', [WaktutungguController::class, 'store']);
Route::put('edit_waktutunggu/{id}', [WaktutungguController::class, 'update']);
Route::get('show_waktutunggu/{id}', [WaktutungguController::class, 'show']);
Route::post('delete_waktutunggu/{id}', [WaktutungguController::class, 'destroy']);

//Luaran lainnya
Route::get('cari_luaran/{search}', [LuaranlainnyaController::class, 'searchluaran']);
Route::post('luaran_mhs/{id}', [LuaranlainnyaController::class, 'pilihmahasiswa']);
Route::get('luaran', [LuaranlainnyaController::class, 'index']);
Route::get('tampil_relasi/{id}', [LuaranlainnyaController::class, 'tampilrelasi']);
Route::post('luaran', [LuaranlainnyaController::class, 'store']);
Route::put('edit_luaran/{id}', [LuaranlainnyaController::class, 'update']);
Route::get('show_luaran/{id}', [LuaranlainnyaController::class, 'show']);
Route::post('delete_luaran/{id}', [LuaranlainnyaController::class, 'destroy']);
Route::post('deletemahasiswa/{id}', [LuaranlainnyaController::class, 'deletemahasiswa']);


//Pagelaran MHS
Route::get('cari_pagelaran/{search}', [PagelaranController::class, 'searchpagelaran']);
Route::get('tampil_relasi_pagelaran/{id}', [PagelaranController::class, 'tampilrelasi']);
Route::post('pagelaran_mhs/{id}', [PagelaranController::class, 'pilihmahasiswa']);
Route::get('pagelaranlisttahun', [PagelaranController::class, 'listtahun']);
Route::get('tahun_pagelaran/{tahun}', [PagelaranController::class, 'exportpublikasidos']);
Route::get('pagelaran', [PagelaranController::class, 'index']);
Route::post('pagelaran', [PagelaranController::class, 'store']);
Route::put('edit_pagelaran/{id}', [PagelaranController::class, 'update']);
Route::get('show_pagelaran/{id}', [PagelaranController::class, 'show']);
Route::post('delete_pagelaran/{id}', [PagelaranController::class, 'destroy']);
Route::post('deletemahasiswa_pagelaran/{id}', [PagelaranController::class, 'deletemahasiswa']);

//Tulisan MHS
Route::get('cari_tulisan/{search}', [TulisanController::class, 'searchtulisan']);
Route::get('show_tulisan/{id}', [TulisanController::class, 'show']);
Route::get('tahun_tulisan/{tahun}', [TulisanController::class, 'exportpublikasidos']);
Route::get('tulisan', [TulisanController::class, 'index']);
Route::post('tulisan', [TulisanController::class, 'store']);
Route::put('edit_tulisan/{id}', [TulisanController::class, 'update']);
Route::post('delete_tulisan/{id}', [TulisanController::class, 'destroy']);

//Seminar MHS
Route::get('tampil_relasi_seminar/{id}', [SeminarController::class, 'tampilrelasi']);
Route::post('seminar_mhs/{id}', [SeminarController::class, 'pilihmahasiswa']);
Route::get('cari_seminar/{search}', [SeminarController::class, 'searchseminar']);
Route::get('seminar', [SeminarController::class, 'index']);
Route::post('seminar', [SeminarController::class, 'store']);
Route::put('edit_seminar/{id}', [SeminarController::class, 'update']);
Route::post('delete_seminar/{id}', [SeminarController::class, 'destroy']);
Route::get('show_seminar/{id}', [SeminarController::class, 'show']);
Route::post('deletemahasiswa_seminar/{id}', [SeminarController::class, 'deletemahasiswa']);

//Buku
Route::get('cari_buku/{search}', [BukuController::class, 'searchbuku']);
Route::post('buku_mhs/{id}', [BukuController::class, 'pilihmahasiswa']);
Route::get('tampil_relasi_buku/{id}', [BukuController::class, 'tampilrelasi']);
Route::get('buku', [BukuController::class, 'index']);
Route::post('buku', [BukuController::class, 'store']);
Route::put('edit_buku/{id}', [BukuController::class, 'update']);
Route::post('delete_buku/{id}', [BukuController::class, 'destroy']);
Route::get('show_buku/{id}', [BukuController::class, 'show']);
Route::post('deletemahasiswa_buku/{id}', [BukuController::class, 'deletemahasiswa']);

//Produk
// Route::post('produk', [ProdukController::class, 'store']);
// Route::put('produk/{id}', [ProdukController::class, 'update']);

//Presentase kepuasan
Route::get('presentase_Export/{tahun}', [PresentaseController::class, 'exporttahun']);
Route::get('presentaselisttahun', [PresentaseController::class, 'listtahun']);
Route::get('presentase/{search}', [PresentaseController::class, 'searchpresentase']);
Route::get('presentase', [PresentaseController::class, 'index']);
Route::post('presentase', [PresentaseController::class, 'store']);
Route::put('presentase/{id}', [PresentaseController::class, 'update']);
Route::post('delete_presentase/{id}', [PresentaseController::class, 'destroy']);
Route::get('show_presentase/{id}', [PresentaseController::class, 'show']);


Route::post('created', [MitraController::class, 'insertmitra']);
Route::get('read_mitra', [MitraController::class, 'tampil_mitra']);
Route::get('show_mitra/{id}', [MitraController::class, 'tampil_editmitra']);
Route::get('readMitra/{search}', [MitraController::class, 'searchmitra']);
Route::post('update_mitra/{id}', [MitraController::class, 'editmitra']);
Route::post('delete_mitra/{id}', [MitraController::class, 'deletemitra']);

Route::get('read_kjs', [KerjasamaController::class, 'tampilkerjasama']);
Route::get('read_bidang_kjs/{bidang}', [KerjasamaController::class, 'tampilkerjasamabidang']);
Route::get('read_kjs/{search}', [KerjasamaController::class, 'searchkerjasama']);
Route::post('create_kjs', [KerjasamaController::class, 'insertkerjasama']);
Route::get('show_kjs/{id}', [KerjasamaController::class, 'tampil_edit_kerjasama']);
Route::post('update_kjs/{id}', [KerjasamaController::class, 'editkerjasama']);
Route::post('delete_kjs/{id}', [KerjasamaController::class, 'delete_kjs']);


Route::get('read_user', [UserController::class, 'index']);
Route::get('search_user/{search}', [UserController::class, 'search']);
Route::get('read_user/{id}', [UserController::class, 'show']);
Route::post('store_user', [UserController::class, 'store']);
Route::post('update_user/{id}', [UserController::class, 'update']);
Route::post('delete_user/{id}', [UserController::class, 'destroy']);
Route::get('reset_user/{id}', [UserController::class, 'resetpassword']);
Route::post('change_password/', [UserController::class, 'changepassword']);

Route::post('create_penggunaan_dana', [PenggunaanDanaController::class, 'insert_penggunaan_dana']);
Route::get('read_penggunaan_dana', [PenggunaanDanaController::class, 'tampil_penggunaan_dana']);
Route::get('read_penggunaan_dana/{search}', [PenggunaanDanaController::class, 'search_penggunaandana']);
Route::post('update_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'edit_penggunaan_dana']);
Route::get('export_penggunaan_dana/{tahun}', [PenggunaanDanaController::class, 'export_penggunaan_dana']);
Route::get('tampil_export_penggunaan_dana/', [PenggunaanDanaController::class, 'tampil_export_penggunaan_dana']);
Route::get('show_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'tampil_edit_dana']);
Route::post('delete_penggunaan_dana/{id}', [PenggunaanDanaController::class, 'delete_penggunaan_dana']);

Route::post('create_mahasiswa_asing', [MahasiswaAsingController::class, 'insert_mahasiswa_asing']);
Route::get('read_mahasiswa_asing', [MahasiswaAsingController::class, 'tampil_mahasiswa_asing']);
Route::get('tampilprodi_mahasiswa_asing/{prodi}', [MahasiswaAsingController::class, 'tampilprodi_mahasiswa_asing']);
Route::get('search_mahasiswa_asing/{search}', [MahasiswaAsingController::class, 'search_mahasiswa_asing']);
Route::get('export_mahasiswa_asing/{tahun}', [MahasiswaAsingController::class, 'tampilexport_mahasiswa_asing']);
Route::get('show_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'tampil_edit_mahasiswa_asing']);
Route::post('update_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'edit_mahasiswa_asing']);
Route::post('delete_mahasiswa_asing/{id}', [MahasiswaAsingController::class, 'delete_mahasiswa_asing']);


Route::post('create_penerimaan_mahasiswa', [PenerimaanController::class, 'insert_penerimaan_mahasiswa']);
Route::get('read_penerimaan_mahasiswa', [PenerimaanController::class, 'tampilmahasiswa']);
Route::get('search_penerimaan_mahasiswa/{search}', [PenerimaanController::class, 'searchmahasiswa']);
Route::get('pilih_penerimaan_mahasiswa/{tahun}', [PenerimaanController::class, 'tampilexport_penerimaan']);
Route::get('show_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'tampil_edit_penerimaan']);
Route::post('update_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'edit_penerimaan_mahasiswa']);
Route::post('delete_penerimaan_mahasiswa/{id}', [PenerimaanController::class, 'delete_penerimaan_mahasiswa']);


Route::get('profildosens', [ProfildosenController::class, 'index']);
Route::get('search_profil/', [ProfildosenController::class, 'allprofil']);
Route::get('getprofil_dtps/', [ProfildosenController::class, 'get_dtps']);
Route::get('search_profil/{search}', [ProfildosenController::class, 'searchprofil']);
Route::get('tampil_profildosen/{id}', [ProfildosenController::class, 'show']);
Route::get('get_profildosen/{nidk}', [ProfildosenController::class, 'get_profil']);
Route::put('update_profildosen/{id}', [ProfildosenController::class, 'update']);
Route::post('delete_profildosen/{id}', [ProfildosenController::class, 'destroy']);
Route::get('testuser', [ApiController::class, 'get_alluser']);
Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('testmid', [ApiController::class, 'tester']);
    Route::get('get_user', [ApiController::class, 'get_user']);
    Route::post('penelitiandosens', [PenelitianController::class, 'store']);
    Route::post('pengabdiandosens', [PengabdianController::class, 'store']);

    // Route::post('mengajars', [MengajarController::class, 'store']);
    // Route::post('bimbingans', [BimbinganController::class, 'store']);
    Route::get('logout', [ApiController::class, 'logout']);
});

// Dev area EWMP
Route::get('ewmps', [EwmpController::class, 'index']);
Route::get('search_ewmp/', [EwmpController::class, 'allewmp']);
Route::get('search_ewmpdsn/', [EwmpController::class, 'allewmpdsn']);
Route::get('search_ewmp/{search}', [EwmpController::class, 'searchewmp']);
Route::get('search_ewmpdsn/{search}', [EwmpController::class, 'searchewmpdsn']);
Route::get('tampil_ewmp/{id}', [EwmpController::class, 'show']);
Route::put('update_ewmp/{id}', [EwmpController::class, 'update']);
Route::post('delete_ewmp/{id}', [EwmpController::class, 'destroy']);
Route::post('ewmps', [EwmpController::class, 'store']);

// Dev area Laporan
Route::get('ewmplisttahun', [EwmpController::class, 'listtahun']);
Route::get('dtpslisttahun', [ProfildosenController::class, 'listtahun']);
Route::get('penelitianlisttahun', [PenelitianController::class, 'listtahun']);
Route::get('pengabdianlisttahun', [PKMController::class, 'listtahun']);
Route::get('bimbinganlisttahun', [BimbinganController::class, 'listtahun']);
Route::get('laporanewmp/{tahun}', [SdmLaporanController::class, 'exportewmp']);
Route::get('laporandtps/{tahun}', [SdmLaporanController::class, 'exportdtps']);
Route::get('laporandosentidaktetap/{tahun}', [SdmLaporanController::class, 'exporttidaktetap']);
Route::get('laporandosenindustri/{tahun}', [SdmLaporanController::class, 'exportdosenindustri']);
Route::get('laporanpendos/{tahun}', [SdmLaporanController::class, 'exportpendos']);
Route::get('laporanpkmdos/{tahun}', [SdmLaporanController::class, 'exportpkmdos']);
Route::get('laporanjurnalsitasi/{tahun}', [SdmLaporanController::class, 'exportjurnalsitasi']);
Route::get('laporanluaranlain/{tahun}', [SdmLaporanController::class, 'exportLuaranLainth']);
Route::get('laporanrekognisith/{tahun}', [SdmLaporanController::class, 'exportrekognisith']);
Route::get('laporanprodukth/{tahun}', [SdmLaporanController::class, 'exportprodukadopsith']);
Route::get('laporanproduk/', [SdmLaporanController::class, 'exportprodukadopsi']);
Route::get('laporanpublikasidos/{tahun}', [SdmLaporanController::class, 'exportpublikasidos']);
Route::get('laporanprodukdos/{tahun}', [SdmLaporanController::class, 'exportprodukdos']);
Route::get('laporanbimbingan/{tahun}', [SdmLaporanController::class, 'exportbimbingan']);
Route::get('laporantestdata/{tahun}', [SdmLaporanController::class, 'testambildata']);
Route::get('data_dashboard', [ApiController::class, 'get_dashboardAdmin']);
Route::get('profillengkap/{nidk}', [ProfildosenController::class, 'profil_lengkap']);

// DetailDosen
Route::get('tampil_detail/{id}', [DetaildosenController::class, 'show']);
Route::put('update_detail/{id}', [DetaildosenController::class, 'update']);
Route::post('delete_detail/{id}', [DetaildosenController::class, 'destroy']);

// Serkom
Route::post('insert_serkom', [SerkomController::class, 'store']);
Route::get('tampil_serkom/{id}', [SerkomController::class, 'show']);
Route::put('update_serkom/{id}', [SerkomController::class, 'update']);
Route::post('delete_serkom/{id}', [SerkomController::class, 'destroy']);

// Pendidikan
Route::post('insert_pendidikan', [PendidikanController::class, 'store']);
Route::get('tampil_pendidikan/{id}', [PendidikanController::class, 'show']);
Route::put('update_pendidikan/{id}', [PendidikanController::class, 'update']);
Route::post('delete_pendidikan/{id}', [PendidikanController::class, 'destroy']);

// Bimbingan
Route::post('bimbingans', [BimbinganController::class, 'store']);
Route::get('search_bimbingan/', [BimbinganController::class, 'allbimbingan']);
Route::get('search_matkul_prodi/{id}', [BimbinganController::class, 'searchmatkulprodi']);
Route::get('search_bimbingandsn/', [BimbinganController::class, 'allbimbingandsn']);
Route::get('search_bimbingan/{search}', [BimbinganController::class, 'searchbimbingan']);
Route::get('search_bimbingandsn/{search}', [BimbinganController::class, 'searchbimbingandsn']);
Route::get('tampil_bimbingan/{id}', [BimbinganController::class, 'show']);
Route::put('update_bimbingan/{id}', [BimbinganController::class, 'update']);
Route::post('delete_bimbingan/{id}', [BimbinganController::class, 'destroy']);

// BbJurnaldos
Route::post('jurnals', [BbjurnaldosController::class, 'store']);
Route::get('search_jurnal/', [BbjurnaldosController::class, 'alljurnal']);
Route::get('search_jurnaldsn/', [BbjurnaldosController::class, 'alljurnaldsn']);
Route::get('search_jurnal/{search}', [BbjurnaldosController::class, 'searchjurnal']);
Route::get('search_jurnaldsn/{search}', [BbjurnaldosController::class, 'searchjurnaldsn']);
Route::get('tampil_jurnal/{id}', [BbjurnaldosController::class, 'show']);
Route::put('update_jurnal/{id}', [BbjurnaldosController::class, 'update']);
Route::post('delete_jurnal/{id}', [BbjurnaldosController::class, 'destroy']);
Route::post('hapusanggota_jurnal/{id}', [BbjurnaldosController::class, 'hapusAnggota']);
Route::post('tambahanggota_jurnal/{id}', [BbjurnaldosController::class, 'tambahAnggota']);

// Seminardos
Route::post('seminardoss', [SeminardosController::class, 'store']);
Route::get('search_seminardos/', [SeminardosController::class, 'allseminar']);
Route::get('search_seminardosdsn/', [SeminardosController::class, 'allseminardsn']);
Route::get('search_seminardos/{search}', [SeminardosController::class, 'searchseminar']);
Route::get('search_seminardosdsn/{search}', [SeminardosController::class, 'searchseminardsn']);
Route::get('tampil_seminardos/{id}', [SeminardosController::class, 'show']);
Route::put('update_seminardos/{id}', [SeminardosController::class, 'update']);
Route::post('delete_seminardos/{id}', [SeminardosController::class, 'destroy']);
Route::post('hapusanggota_seminardos/{id}', [SeminardosController::class, 'hapusAnggota']);
Route::post('tambahanggota_seminardos/{id}', [SeminardosController::class, 'tambahAnggota']);

// Pagelarandos
Route::post('pagelarandoss', [PagelarandosController::class, 'store']);
Route::get('search_pagelarandos/', [PagelarandosController::class, 'allpagelaran']);
Route::get('search_pagelarandosdsn/', [PagelarandosController::class, 'allpagelarandsn']);
Route::get('search_pagelarandos/{search}', [PagelarandosController::class, 'searchpagelaran']);
Route::get('search_pagelarandosdsn/{search}', [PagelarandosController::class, 'searchpagelarandsn']);
Route::get('tampil_pagelarandos/{id}', [PagelarandosController::class, 'show']);
Route::put('update_pagelarandos/{id}', [PagelarandosController::class, 'update']);
Route::post('delete_pagelarandos/{id}', [PagelarandosController::class, 'destroy']);
Route::post('hapusanggota_pagelarandos/{id}', [PagelarandosController::class, 'hapusAnggota']);
Route::post('tambahanggota_pagelarandos/{id}', [PagelarandosController::class, 'tambahAnggota']);


// Produkos
Route::post('produkdoss', [ProdukController::class, 'store']);
Route::get('search_produkdos/', [ProdukController::class, 'allproduk']);
Route::get('search_produkdosdsn/', [ProdukController::class, 'allprodukdsn']);
Route::get('search_produkdos/{search}', [ProdukController::class, 'searchproduk']);
Route::get('search_produkdosdsn/{search}', [ProdukController::class, 'searchprodukdsn']);
Route::get('tampil_produkdos/{id}', [ProdukController::class, 'show']);
Route::put('update_produkdos/{id}', [ProdukController::class, 'update']);
Route::post('delete_produkdos/{id}', [ProdukController::class, 'destroy']);
Route::post('hapusanggota_produkdos/{id}', [ProdukController::class, 'hapusAnggota']);
Route::post('tambahanggota_produkdos/{id}', [ProdukController::class, 'tambahAnggota']);

// Luarandos
Route::post('luarandoss', [LuaranlaindosenController::class, 'store']);
Route::get('search_luarandos/', [LuaranlaindosenController::class, 'allluaran']);
Route::get('search_luarandosdsn/', [LuaranlaindosenController::class, 'allluarandsn']);
Route::get('search_luarandos/{search}', [LuaranlaindosenController::class, 'searchluaran']);
Route::get('search_luarandosdsn/{search}', [LuaranlaindosenController::class, 'searchluarandsn']);
Route::get('tampil_luarandos/{id}', [LuaranlaindosenController::class, 'show']);
Route::put('update_luarandos/{id}', [LuaranlaindosenController::class, 'update']);
Route::post('delete_luarandos/{id}', [LuaranlaindosenController::class, 'destroy']);
Route::post('hapusanggota_luarandos/{id}', [LuaranlaindosenController::class, 'hapusAnggota']);
Route::post('tambahanggota_luarandos/{id}', [LuaranlaindosenController::class, 'tambahAnggota']);

Route::get('profildosens', [ProfildosenController::class, 'index']);
Route::group(['middleware' => ['adminonly']], function () {
    Route::get('testadmin', [ApiController::class, 'tester']);
    Route::post('profildosens', [ProfildosenController::class, 'store']);
});

// Rekognisi
Route::post('rekognisidosens', [RekognisiController::class, 'store']);
Route::get('search_rekognisi/', [RekognisiController::class, 'allrekognisi']);
Route::get('search_rekognisidsn/', [RekognisiController::class, 'allrekognisidsn']);
Route::get('search_rekognisi/{search}', [RekognisiController::class, 'searchrekognisi']);
Route::get('search_rekognisidsn/{search}', [RekognisiController::class, 'searchrekognisidsn']);
Route::get('tampil_rekognisi/{id}', [RekognisiController::class, 'show']);
Route::put('update_rekognisi/{id}', [RekognisiController::class, 'update']);
Route::post('delete_rekognisi/{id}', [RekognisiController::class, 'destroy']);

// Tulisan
Route::post('tulisandoss', [TulisandosController::class, 'store']);
Route::get('search_tulisandos/', [TulisandosController::class, 'alltulisan']);
Route::get('search_tulisandosdsn/', [TulisandosController::class, 'alltulisandsn']);
Route::get('search_tulisandos/{search}', [TulisandosController::class, 'searchtulisan']);
Route::get('search_tulisandosdsn/{search}', [TulisandosController::class, 'searchtulisandsn']);
Route::get('tampil_tulisandos/{id}', [TulisandosController::class, 'show']);
Route::put('update_tulisandos/{id}', [TulisandosController::class, 'update']);
Route::post('delete_tulisandos/{id}', [TulisandosController::class, 'destroy']);

// Mengajar
Route::post('mengajardosens', [MengajarController::class, 'store']);
Route::get('search_mengajar/', [MengajarController::class, 'allmengajar']);
Route::get('search_matkul_prodi/{id}', [MengajarController::class, 'searchmatkulprodi']);
Route::get('search_mengajardsn/', [MengajarController::class, 'allmengajardsn']);
Route::get('search_mengajar/{search}', [MengajarController::class, 'searchmengajar']);
Route::get('search_mengajardsn/{search}', [MengajarController::class, 'searchmengajardsn']);
Route::get('tampil_mengajar/{id}', [MengajarController::class, 'show']);
Route::put('update_mengajar/{id}', [MengajarController::class, 'update']);
Route::post('delete_mengajar/{id}', [MengajarController::class, 'destroy']);

Route::group(['middleware' => ['dosenonly']], function () {
    Route::post('detildosens', [DetaildosenController::class, 'store']);
    Route::post('pendidikandosens', [PendidikanController::class, 'store']);
});
//route prodi
// Route::get('Prodi', [ProdiController::class, 'index']);
Route::post('Prodi', [ProdiController::class, 'store']);
Route::put('Prodi/{id}', [ProdiController::class, 'update']);
Route::get('Prodi', [ProdiController::class, 'tampilprodi']);

//route mahasiswa
Route::get('Mahasiswa_search/{id}', [MahasiswaController::class, 'searchmahasiswa']);
Route::get('tampil_Mahasiswa/{id}', [MahasiswaController::class, 'show']);
Route::get('Mahasiswa', [MahasiswaController::class, 'index']);
Route::post('Mahasiswa', [MahasiswaController::class, 'store']);
Route::put('Mahasiswa_Update/{id}', [MahasiswaController::class, 'update']);
Route::post('Mahasiswa_Delete/{id}', [MahasiswaController::class, 'destroy']);

//Relasi Luaran
Route::get('relasiluaran', [RelasiluaranController::class, 'index']);
Route::put('edit_relasiluaran/{id}', [RelasiluaranController::class, 'update']);
Route::post('relasiluaran', [RelasiLuaranController::class, 'store']);

//route matkul
Route::get('Matkul_search/{id}', [MatkulController::class, 'searchmatkul']);
Route::get('tampil_Matkul/{id}', [MatkulController::class, 'show']);
Route::get('Matkul', [MatkulController::class, 'index']);
Route::post('Matkul', [MatkulController::class, 'store']);
Route::put('Matkul_Update/{id}', [MatkulController::class, 'update']);
Route::post('Matkul_Delete/{id}', [MatkulController::class, 'destroy']);

//route kepuasan mahasiswa
Route::get('KepuasanMHS_search/{id}', [KepuasanMHSController::class, 'searchkepuasanmhs']);
Route::get('tampil_KepuasanMHS/{id}', [KepuasanMHSController::class, 'show']);
Route::get('KepuasanMHS', [KepuasanMHSController::class, 'index']);
Route::post('KepuasanMHS', [KepuasanMHSController::class, 'store']);
Route::put('KepuasanMHS_Update/{id}', [KepuasanMHSController::class, 'update']);
Route::get('KepuasanMHS_Tahun', [KepuasanMHSController::class, 'listtahun']);
Route::get('KepuasanMHS_Export/{tahun}', [KepuasanMHSController::class, 'exporttahun']);
Route::post('KepuasanMHS_Delete/{id}', [KepuasanMHSController::class, 'destroy']);

//route produk mahasiswa
Route::get('cari_produk/{search}', [ProdukMHSController::class, 'searchprodukmhs']);
Route::post('produk_mhs/{id}', [ProdukMHSController::class, 'pilihmahasiswa']);
Route::get('tampil_relasi_produk/{id}', [ProdukMHSController::class, 'tampilrelasi']);
Route::get('tampil_ProdukMHS/{id}', [ProdukMHSController::class, 'show']);
Route::get('ProdukMHS', [ProdukMHSController::class, 'index']);
Route::post('ProdukMHS', [ProdukMHSController::class, 'store']);
Route::put('ProdukMHS_Update/{id}', [ProdukMHSController::class, 'update']);
Route::post('ProdukMHS_Delete/{id}', [ProdukMHSController::class, 'destroy']);
Route::post('deletemahasiswa_produk/{id}', [ProdukMHSController::class, 'deletemahasiswa']);

//route data capaian kurikulum
Route::get('CapaianKurikulum_relasisearch/{search}', [CapKurikulumController::class, 'searchhapus']);
Route::get('CapaianKurikulum_search/{id}', [CapKurikulumController::class, 'searchcapkurikulum']);
Route::get('tampil_CapaianKurikulum/{id}', [CapKurikulumController::class, 'show']);
Route::get('CapaianKurikulum', [CapKurikulumController::class, 'index']);
Route::post('CapaianKurikulum', [CapKurikulumController::class, 'store']);
Route::put('CapaianKurikulum_Update/{id}', [CapKurikulumController::class, 'update']);
Route::post('CapaianKurikulum_Delete/{id}', [CapKurikulumController::class, 'destroy']);
Route::get('CapaianKurikulum_relasimatkul/{id}', [CapKurikulumController::class, 'relasiCapMatkul']);
Route::post('CapaianKurikulum_matkul/{id}', [CapKurikulumController::class, 'pilihmatkul']);
Route::post('CapaianKurikulum_Deleterelasi_matkul/{id}', [CapKurikulumController::class, 'deletematkul']);

//route data PKM
Route::get('PKM_relasisearchmhs/{id}/{search}', [PKMController::class, 'searchhapusmhs']);
Route::get('PKM_relasisearch/{id}/{search}', [PKMController::class, 'searchhapus']);
Route::get('PKM_search/{id}', [PKMController::class, 'searchpkm']);
Route::get('tampil_PKM/{id}', [PKMController::class, 'show']);
Route::get('PKM', [PKMController::class, 'index']);
Route::post('PKM', [PKMController::class, 'store']);
Route::put('PKM_Update/{id}', [PKMController::class, 'update']);
Route::post('PKM_Delete/{id}', [PKMController::class, 'destroy']);
Route::post('PKM_dosen/{id}', [PKMController::class, 'pilihdosen']);
Route::post('PKM_mahasiswa/{id}', [PKMController::class, 'pilihmhs']);
Route::get('PKM_relasimhs/{id}', [PKMController::class, 'relasiPkmMhs']);
Route::get('PKM_relasidosen/{id}', [PKMController::class, 'relasipkmdosen']);
Route::post('PKM_Deleterelasi_dosen/{id}', [PKMController::class, 'deletedosen']);
Route::post('PKM_Deleterelasi_mhs/{id}', [PKMController::class, 'deletemhs']);

//route penelitian
Route::get('Penelitian_relasisearchmhs/{id}/{search}', [PenelitianController::class, 'searchhapusmhs']);
Route::get('Penelitian_relasisearch/{id}/{search}', [PenelitianController::class, 'searchhapus']);
Route::get('Penelitian_search/{id}', [PenelitianController::class, 'searchpenelitian']);
Route::post('Penelitian_dosen/{id}', [PenelitianController::class, 'pilihdosen']);
Route::post('Penelitian_mahasiswa/{id}', [PenelitianController::class, 'pilihmahasiswa']);
Route::get('tampil_Penelitian/{id}', [PenelitianController::class, 'show']);
Route::get('Penelitian', [PenelitianController::class, 'index']);
Route::post('Penelitian', [PenelitianController::class, 'store']);
Route::put('Penelitian_Update/{id}', [PenelitianController::class, 'update']);
Route::post('Penelitian_Delete/{id}', [PenelitianController::class, 'destroy']);
Route::post('Penelitian_DeleteMhs/{id}', [PenelitianController::class, 'deletemhs']);
Route::get('Penelitian_relasimhs/{id}', [PenelitianController::class, 'relasipenmhs']);
Route::get('Penelitian_relasidosen/{id}', [PenelitianController::class, 'relasipendosen']);
Route::post('Penelitian_Deleterelasi_dosen/{id}', [PenelitianController::class, 'deletedosen']);

//route integrasi
Route::get('Integrasi_search/{id}', [IntegrasiController::class, 'searchintegrasi']);
Route::get('tampil_Integrasi/{id}', [IntegrasiController::class, 'show']);
Route::get('Integrasi', [IntegrasiController::class, 'index']);
Route::post('Integrasi', [IntegrasiController::class, 'store']);
Route::put('Integrasi_Update/{id}', [IntegrasiController::class, 'update']);
Route::post('Integrasi_Delete/{id}', [IntegrasiController::class, 'destroy']);
