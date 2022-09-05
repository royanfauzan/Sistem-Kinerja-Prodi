<?php

namespace App\Http\Controllers;

use App\Models\Penelitian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\PenggunaanDana;
use App\Models\Prodi;
use App\Models\Pkm;
use Illuminate\Support\Arr;

class PenggunaanDanaController extends Controller

{
    // untuk tampil tabel
    public function tampil_penggunaan_dana()
    {


        return response()->json([
            'success' => true,
            'tampil_penggunaan_dana' => PenggunaanDana::with('prodi')->orderBy('Tahun', 'desc')->get()
        ]);
    }

    // function untuk menghitung rata-rata penggunaan dana
    public function rata_export($tahun)
    {


        if ($tahun != null) {
            // delklarasi variable array tahun
            $tahunn = array();
            $tahunn[] = $tahun;
            $tahunn[] = $tahun - 1;
            $tahunn[] = $tahun - 2;

            $danaarray = array();
            $pkmarray = array();
            $penelitianarray = array();

            // mencari data mahasiswa seleksi berdasarkan tahun dan disimpan ke variable array
            foreach ($tahunn as  $th) {
                array_push($danaarray, PenggunaanDana::with('prodi')->where('Tahun', $th)->first());
                array_push($pkmarray, Pkm::where('tahun', $th)->first());
                array_push($penelitianarray, Penelitian::where('tahun', $th)->first());
            }
        } else {
            // untuk mengambil nilai 3 tahun teratas dan disimpan ke dalam array
            $danaarray = array();
            $pkmarray = array();
            $penelitianarray = array();
            $dana = PenggunaanDana::with('prodi')->orderBy('Tahun', 'desc')->get();
            $pkm = Pkm::orderBy('tahun', 'desc')->get();
            $penelitian = Penelitian::orderBy('tahun', 'desc')->get();
            for ($i = 0; $i < 3; $i++) {
                array_push($danaarray, $dana[$i]);
                array_push($pkmarray, $pkm[$i]);
                array_push($penelitianarray, $penelitian[$i]);
            }
        }


        // deklarasi variable untuk menyimpan nilai rata-rata
        $jumlah_biaya_dsn_upps = 0;
        $jumlah_biaya_dsn_prodi = 0;
        $jumlah_biaya_tenaga_pendidkan_upps = 0;
        $jumlah_biaya_tenaga_pendidkan_prodi = 0;
        $jumlah_biaya_operasional_pembelajaran_upps = 0;
        $jumlah_biaya_operasional_pembelajaran_prodi = 0;
        $jumlah_biaya_operasional_tidaklangsung_upps = 0;
        $jumlah_biaya_operasional_tidaklangsung_prodi = 0;
        $jumlah_biaya_operasional_kemahasiswaan_upps = 0;
        $jumlah_biaya_operasional_kemahasiswaan_prodi = 0;
        $jumlah_biaya_investasi_sdm_prodi = 0;
        $jumlah_biaya_investasi_sdm_upps = 0;
        $jumlah_biaya_investasi_sarana_upps = 0;
        $jumlah_biaya_investasi_sarana_prodi = 0;
        $jumlah_biaya_investasi_prasarana_upps = 0;
        $jumlah_biaya_investasi_prasarana_prodi = 0;
        $jumlah_biaya_pkm_upps = 0;
        $jumlah_biaya_pkm_prodi = 0;
        $jumlah_biaya_penelitian_upps = 0;
        $jumlah_biaya_penelitian_prodi = 0;



        // perulangan unutk hitung rata - rata tabel penelitian
        for ($i = 0; $i < 3; $i++) {
            if ($penelitianarray[$i] == null) {
            } else {
                $jumlah_biaya_penelitian_upps += $penelitianarray[$i]->dana_PT_Mandiri;
                $jumlah_biaya_penelitian_prodi += $penelitianarray[$i]->dana_PT_Mandiri;
            }
        }


        // perulangan unutk hitung rata - rata tabel pkm
        for ($i = 0; $i < 3; $i++) {
            if ($pkmarray[$i] == null) {
            } else {
                $jumlah_biaya_pkm_upps += $pkmarray[$i]->dana_PT_Mandiri;
                $jumlah_biaya_pkm_prodi += $pkmarray[$i]->dana_PT_Mandiri;
            }
        }

        // perulangan unutk hitung rata - rata tabel penggunaan dana
        for ($i = 0; $i < 3; $i++) {

            if ($danaarray[$i] == null) {
            } else {
                $jumlah_biaya_dsn_upps += $danaarray[$i]->Biaya_Dosen_UPPS;
                $jumlah_biaya_dsn_prodi += $danaarray[$i]->Biaya_Dosen_Prodi;

                $jumlah_biaya_tenaga_pendidkan_upps += $danaarray[$i]->Biaya_Tenaga_Kependidikan_UPPS;
                $jumlah_biaya_tenaga_pendidkan_prodi += $danaarray[$i]->Biaya_Tenaga_Kependidikan_Prodi;

                $jumlah_biaya_operasional_pembelajaran_upps += $danaarray[$i]->Biaya_Operasional_Pembelajaran_UPPS;
                $jumlah_biaya_operasional_pembelajaran_prodi += $danaarray[$i]->Biaya_Operasional_Pembelajaran_Prodi;

                $jumlah_biaya_operasional_tidaklangsung_upps += $danaarray[$i]->Biaya_Operasional_TidakLangsung_UPPS;
                $jumlah_biaya_operasional_tidaklangsung_prodi += $danaarray[$i]->Biaya_Operasional_TidakLangsung_Prodi;

                $jumlah_biaya_operasional_kemahasiswaan_upps += $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_UPPS;
                $jumlah_biaya_operasional_kemahasiswaan_prodi += $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_Prodi;

                $jumlah_biaya_investasi_sdm_upps += $danaarray[$i]->Biaya_Investasi_SDM_UPPS;
                $jumlah_biaya_investasi_sdm_prodi += $danaarray[$i]->Biaya_Investasi_SDM_Prodi;

                $jumlah_biaya_investasi_sarana_upps += $danaarray[$i]->Biaya_Investasi_Sarana_UPPS;
                $jumlah_biaya_investasi_sarana_prodi += $danaarray[$i]->Biaya_Investasi_Sarana_Prodi;

                $jumlah_biaya_investasi_prasarana_upps += $danaarray[$i]->Biaya_Investasi_Prasarana_UPPS;
                $jumlah_biaya_investasi_prasarana_prodi += $danaarray[$i]->Biaya_Investasi_Prasarana_Prodi;
            }
        }

        // memasukkan nilai rata-rata ke dalam array
        $rataarray = [];
        array_push($rataarray, [
            'bdsn_upps' => $jumlah_biaya_dsn_upps / 3, 'bdsn_prodi' => $jumlah_biaya_dsn_prodi / 3,
            'btenaga_upps' => $jumlah_biaya_tenaga_pendidkan_upps / 3, 'btenaga_prodi' => $jumlah_biaya_tenaga_pendidkan_prodi / 3,
            'boperasional_pmbljrn_upps' => $jumlah_biaya_operasional_pembelajaran_upps / 3,    'boperasional_pmbljrn_prodi' => $jumlah_biaya_operasional_pembelajaran_prodi / 3,
            'boperasional_tdklgsg_upps' => $jumlah_biaya_operasional_tidaklangsung_upps / 3, 'boperasional_tdklgsg_prodi' => $jumlah_biaya_operasional_tidaklangsung_prodi / 3,
            'boperasional_mhs_upps' => $jumlah_biaya_operasional_kemahasiswaan_upps / 3, 'boperasional_mhs_prodi' => $jumlah_biaya_operasional_kemahasiswaan_prodi / 3,
            'binvestasi_sdm_upps' => $jumlah_biaya_investasi_sdm_upps / 3,   'binvestasi_sdm_prodi' => $jumlah_biaya_investasi_sdm_prodi / 3,
            'binvestasi_sarana_upps' => $jumlah_biaya_investasi_sarana_upps / 3,   'binvestasi_sarana_prodi' => $jumlah_biaya_investasi_sarana_prodi / 3,
            'binvestasi_prasarana_upps' => $jumlah_biaya_investasi_prasarana_upps / 3,   'binvestasi_prasarana_prodi' => $jumlah_biaya_investasi_prasarana_prodi / 3,
            'bpkm_upps' => $jumlah_biaya_pkm_upps / 3, 'bpkm_prodi' => $jumlah_biaya_pkm_prodi / 3,
            'bpenelitian_upps' => $jumlah_biaya_penelitian_upps / 3, 'bpenelitian_prodi' => $jumlah_biaya_penelitian_prodi / 3,

        ]);

        return $rataarray;
    }

    // function untuk menghitung jumlah penggunaan dana
    public function jumlah_export($tahun)
    {


        if ($tahun != null) {
            // delklarasi variable array tahun
            $tahunn = array();
            $tahunn[] = $tahun;
            $tahunn[] = $tahun - 1;
            $tahunn[] = $tahun - 2;

            $danaarray = array();
            $pkmarray = array();
            $penelitianarray = array();

            // mencari data mahasiswa seleksi berdasarkan tahun dan disimpan ke variable array
            foreach ($tahunn as  $th) {
                array_push($danaarray, PenggunaanDana::with('prodi')->where('Tahun', $th)->first());
                array_push($pkmarray, Pkm::where('tahun', $th)->first());
                array_push($penelitianarray, Penelitian::where('tahun', $th)->first());
            }
        } else {
            // untuk mengambil nilai 3 tahun teratas dan disimpan ke dalam array
            $danaarray = array();
            $pkmarray = array();
            $penelitianarray = array();
            $pkm = Pkm::orderBy('tahun', 'desc')->get();
            $penelitian = Penelitian::orderBy('tahun', 'desc')->get();
            $dana = PenggunaanDana::with('prodi')->orderBy('Tahun', 'desc')->get();
            for ($i = 0; $i < 3; $i++) {
                array_push($danaarray, $dana[$i]);
                array_push($pkmarray, $pkm[$i]);
                array_push($penelitianarray, $penelitian[$i]);
            }
        }



        // deklarasi variabel jumlah ts2,ts1,ts upps dan prodi 
        $jumlah_ts2_bo_upps = 0;
        $jumlah_ts1_bo_upps = 0;
        $jumlah_ts_bo_upps = 0;
        $jumlah_ts2_bo_prodi = 0;
        $jumlah_ts1_bo_prodi = 0;
        $jumlah_ts_bo_prodi = 0;

        $jumlah_ts_pp_upps = 0;
        $jumlah_ts1_pp_upps = 0;
        $jumlah_ts2_pp_upps = 0;
        $jumlah_ts_pp_prodi = 0;
        $jumlah_ts1_pp_prodi = 0;
        $jumlah_ts2_pp_prodi = 0;

        $jumlah_ts_investasi_upps = 0;
        $jumlah_ts1_investasi_upps = 0;
        $jumlah_ts2_investasi_upps = 0;
        $jumlah_ts_investasi_prodi = 0;
        $jumlah_ts1_investasi_prodi = 0;
        $jumlah_ts2_investasi_prodi = 0;


        // untuk menghitung jumlah pkm dan penlitian
        for ($i = 0; $i < 3; $i++) {
            if ($pkmarray[$i] == null && $penelitianarray[$i] != null) {
                if ($i == 0) {
                    $jumlah_ts_pp_upps +=  $penelitianarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts_pp_prodi += $penelitianarray[$i]->dana_PT_Mandiri;
                } elseif ($i == 1) {
                    $jumlah_ts1_pp_upps +=  $penelitianarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts1_pp_prodi += $penelitianarray[$i]->dana_PT_Mandiri;
                } else {
                    $jumlah_ts2_pp_upps +=  $penelitianarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts2_pp_prodi += $penelitianarray[$i]->dana_PT_Mandiri;
                }
            } elseif ($pkmarray[$i] != null && $penelitianarray[$i] == null) {
                if ($i == 0) {
                    $jumlah_ts_pp_upps +=  $pkmarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts_pp_prodi += $pkmarray[$i]->dana_PT_Mandiri;
                } elseif ($i == 1) {
                    $jumlah_ts1_pp_upps +=  $pkmarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts1_pp_prodi += $pkmarray[$i]->dana_PT_Mandiri;
                } else {
                    $jumlah_ts2_pp_upps +=  $pkmarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts2_pp_prodi += $pkmarray[$i]->dana_PT_Mandiri;
                }
            } elseif ($pkmarray[$i] != null && $penelitianarray[$i] != null) {
                if ($i == 0) {
                    $jumlah_ts_pp_upps +=  $pkmarray[$i]->dana_PT_Mandiri +  $penelitianarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts_pp_prodi += $pkmarray[$i]->dana_PT_Mandiri + $penelitianarray[$i]->dana_PT_Mandiri;
                } elseif ($i == 1) {
                    $jumlah_ts1_pp_upps +=  $pkmarray[$i]->dana_PT_Mandiri +  $penelitianarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts1_pp_prodi += $pkmarray[$i]->dana_PT_Mandiri + $penelitianarray[$i]->dana_PT_Mandiri;
                } else {
                    $jumlah_ts2_pp_upps +=  $pkmarray[$i]->dana_PT_Mandiri +  $penelitianarray[$i]->dana_PT_Mandiri;
                    $jumlah_ts2_pp_prodi += $pkmarray[$i]->dana_PT_Mandiri + $penelitianarray[$i]->dana_PT_Mandiri;
                }
            }
        }

        // untuk menghitung jumlah pengunaan dana
        for ($i = 0; $i < 3; $i++) {

            if ($danaarray[$i] == null) {
            } else {
                if ($i == 0) {
                    $jumlah_ts_bo_upps += $danaarray[$i]->Biaya_Dosen_UPPS + $danaarray[$i]->Biaya_Tenaga_Kependidikan_UPPS
                        + $danaarray[$i]->Biaya_Operasional_Pembelajaran_UPPS + $danaarray[$i]->Biaya_Operasional_TidakLangsung_UPPS
                        + $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_UPPS;

                    $jumlah_ts_bo_prodi += $danaarray[$i]->Biaya_Dosen_Prodi + $danaarray[$i]->Biaya_Tenaga_Kependidikan_Prodi
                        + $danaarray[$i]->Biaya_Operasional_Pembelajaran_Prodi + $danaarray[$i]->Biaya_Operasional_TidakLangsung_Prodi
                        + $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_Prodi;

                    $jumlah_ts_investasi_upps += $danaarray[$i]->Biaya_Investasi_SDM_UPPS + $danaarray[$i]->Biaya_Investasi_Sarana_UPPS
                        + $danaarray[$i]->Biaya_Investasi_Prasarana_UPPS;

                    $jumlah_ts_investasi_prodi += $danaarray[$i]->Biaya_Investasi_SDM_Prodi + $danaarray[$i]->Biaya_Investasi_Sarana_Prodi
                        + $danaarray[$i]->Biaya_Investasi_Prasarana_Prodi;
                } else if ($i == 1) {
                    $jumlah_ts1_bo_upps += $danaarray[$i]->Biaya_Dosen_UPPS + $danaarray[$i]->Biaya_Tenaga_Kependidikan_UPPS
                        + $danaarray[$i]->Biaya_Operasional_Pembelajaran_UPPS + $danaarray[$i]->Biaya_Operasional_TidakLangsung_UPPS
                        + $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_UPPS;

                    $jumlah_ts1_bo_prodi += $danaarray[$i]->Biaya_Dosen_Prodi + $danaarray[$i]->Biaya_Tenaga_Kependidikan_Prodi
                        + $danaarray[$i]->Biaya_Operasional_Pembelajaran_Prodi + $danaarray[$i]->Biaya_Operasional_TidakLangsung_Prodi
                        + $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_Prodi;


                    $jumlah_ts1_investasi_upps += $danaarray[$i]->Biaya_Investasi_SDM_UPPS + $danaarray[$i]->Biaya_Investasi_Sarana_UPPS
                        + $danaarray[$i]->Biaya_Investasi_Prasarana_UPPS;

                    $jumlah_ts1_investasi_prodi += $danaarray[$i]->Biaya_Investasi_SDM_Prodi + $danaarray[$i]->Biaya_Investasi_Sarana_Prodi
                        + $danaarray[$i]->Biaya_Investasi_Prasarana_Prodi;
                } else {
                    $jumlah_ts2_bo_upps += $danaarray[$i]->Biaya_Dosen_UPPS + $danaarray[$i]->Biaya_Tenaga_Kependidikan_UPPS
                        + $danaarray[$i]->Biaya_Operasional_Pembelajaran_UPPS + $danaarray[$i]->Biaya_Operasional_TidakLangsung_UPPS
                        + $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_UPPS;

                    $jumlah_ts2_bo_prodi += $danaarray[$i]->Biaya_Dosen_Prodi + $danaarray[$i]->Biaya_Tenaga_Kependidikan_Prodi
                        + $danaarray[$i]->Biaya_Operasional_Pembelajaran_Prodi + $danaarray[$i]->Biaya_Operasional_TidakLangsung_Prodi
                        + $danaarray[$i]->Biaya_Operasional_Kemahasiswaan_Prodi;


                    $jumlah_ts2_investasi_upps += $danaarray[$i]->Biaya_Investasi_SDM_UPPS + $danaarray[$i]->Biaya_Investasi_Sarana_UPPS
                        + $danaarray[$i]->Biaya_Investasi_Prasarana_UPPS;

                    $jumlah_ts2_investasi_prodi += $danaarray[$i]->Biaya_Investasi_SDM_Prodi + $danaarray[$i]->Biaya_Investasi_Sarana_Prodi
                        + $danaarray[$i]->Biaya_Investasi_Prasarana_Prodi;
                }
            }
        }

        $jumlaharray = [];




        array_push($jumlaharray, [
            'jmlh_bo_ts_upps' => $jumlah_ts_bo_upps, 'jmlh_bo_ts1_upps' => $jumlah_ts1_bo_upps,
            'jmlh_bo_ts2_upps' => $jumlah_ts2_bo_upps,  'jmlh_bo_ts_prodi' => $jumlah_ts_bo_prodi,
            'jmlh_bo_ts1_prodi' => $jumlah_ts1_bo_prodi, 'jmlh_bo_ts2_prodi' => $jumlah_ts2_bo_prodi,
            'jmlh_investasi_ts_upps' => $jumlah_ts_investasi_upps, 'jmlh_investasi_ts1_upps' => $jumlah_ts1_investasi_upps,
            'jmlh_investasi_ts2_upps' => $jumlah_ts2_investasi_upps,
            'jmlh_investasi_ts_prodi' => $jumlah_ts_investasi_prodi, 'jmlh_investasi_ts1_prodi' => $jumlah_ts1_investasi_prodi,
            'jmlh_investasi_ts2_prodi' => $jumlah_ts2_investasi_prodi,
            'jmlh_pp_ts_upps' => $jumlah_ts_pp_upps, 'jmlh_pp_ts1_upps' => $jumlah_ts1_pp_upps, 'jmlh_pp_ts2_upps' => $jumlah_ts2_pp_upps,
            'jmlh_pp_ts_prodi' => $jumlah_ts_pp_prodi, 'jmlh_pp_ts1_prodi' => $jumlah_ts1_pp_prodi, 'jmlh_pp_ts2_prodi' => $jumlah_ts2_pp_upps,
        ]);

        return $jumlaharray;
    }


    // untuk tampil default export
    public function tampil_export_penggunaan_dana()
    {
        $getrata = $this->rata_export('');
        $getjumlah = $this->jumlah_export('');
        return response()->json([
            'success' => true,
            'rata' => $getrata,
            'jumlah' => $getjumlah,
            'tampil_penggunaan_dana' => PenggunaanDana::with('prodi')->orderBy('Tahun', 'desc')->get(),
            'tampil_pkm' => Pkm::orderBy('tahun', 'desc')->get(),
            'tampil_penelitian' => Penelitian::orderBy('tahun', 'desc')->get(),
        ]);
    }

    // function untuk menampilkan data penggunaan dana berdasarkan tahun
    public function export_penggunaan_dana($tahun)
    {
        // delklarasi variable array tahun
        $tahunn = array();
        $tahunn[] = $tahun;
        $tahunn[] = $tahun - 1;
        $tahunn[] = $tahun - 2;

        $danaarray = array();
        $pkmarray = array();
        $penelitianarray = array();

        // mencari data mahasiswa seleksi berdasarkan tahun dan disimpan ke variable array
        foreach ($tahunn as  $th) {
            array_push($danaarray, PenggunaanDana::with('prodi')->where('Tahun', $th)->first());
            array_push($pkmarray, Pkm::where('tahun', $th)->first());
            array_push($penelitianarray, Penelitian::where('tahun', $th)->first());
        }
        $getrata = $this->rata_export($tahun);
        $getjumlah = $this->jumlah_export($tahun);
        return response()->json([
            'success' => true,
            'rata' => $getrata,
            'jumlah' => $getjumlah,
            'tampil_penggunaan_dana' => $danaarray,
            'tampil_pkm' => $pkmarray,
            'tampil_penelitian' => $penelitianarray,
        ]);
    }

    // function untuk menampilkan data pada tabel berdasarkan kata kunci
    public function search_penggunaandana($search)
    {


        return response()->json([
            'success' => true,
            'searchdana' => PenggunaanDana::with('prodi')->whereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Dosen_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Dosen_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Investasi_Prasarana_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Investasi_Prasarana_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Investasi_Sarana_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Investasi_Sarana_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Investasi_SDM_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Investasi_SDM_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Operasional_Kemahasiswaan_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Operasional_Kemahasiswaan_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Operasional_Pembelajaran_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Operasional_Pembelajaran_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Operasional_TidakLangsung_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Operasional_TidakLangsung_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Tenaga_Kependidikan_Prodi', 'LIKE', "%{$search}%")
                ->orWhere('Biaya_Tenaga_Kependidikan_UPPS', 'LIKE', "%{$search}%")
                ->orWhere('Tahun', 'LIKE', "%{$search}%")->get()
        ]);
    }





    public function tampil_edit_dana($id)
    {
        //
        return response()->json([
            'success' => true,
            'tampil_dana' => PenggunaanDana::with('prodi')->where('id', $id)->first(),

        ]);
    }

    public function insert_penggunaan_dana(Request $request)
    {
        $credentials = $request->only(
            'Biaya_Dosen_Prodi',
            'Biaya_Dosen_UPPS',
            'Biaya_Investasi_Prasarana_Prodi',
            'Biaya_Investasi_Prasarana_UPPS',
            'Biaya_Investasi_Sarana_Prodi',
            'Biaya_Investasi_Sarana_UPPS',
            'Biaya_Investasi_SDM_Prodi',
            'Biaya_Investasi_SDM_UPPS',
            'Biaya_Operasional_Kemahasiswaan_Prodi',
            'Biaya_Operasional_Kemahasiswaan_UPPS',
            'Biaya_Operasional_Pembelajaran_Prodi',
            'Biaya_Operasional_Pembelajaran_UPPS',
            'Biaya_Operasional_TidakLangsung_Prodi',
            'Biaya_Operasional_TidakLangsung_UPPS',
            'Biaya_Tenaga_Kependidikan_Prodi',
            'Biaya_Tenaga_Kependidikan_UPPS',
            'Prodi_Id',
            'Tahun'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'Biaya_Dosen_Prodi' => 'required',
            'Biaya_Dosen_UPPS' => 'required',
            'Biaya_Investasi_Prasarana_Prodi' => 'required',
            'Biaya_Investasi_Prasarana_UPPS' => 'required',
            'Biaya_Investasi_Sarana_Prodi' => 'required',
            'Biaya_Investasi_Sarana_UPPS' => 'required',
            'Biaya_Investasi_SDM_Prodi' => 'required',
            'Biaya_Investasi_SDM_UPPS' => 'required',
            'Biaya_Operasional_Kemahasiswaan_Prodi' => 'required',
            'Biaya_Operasional_Kemahasiswaan_UPPS' => 'required',
            'Biaya_Operasional_Pembelajaran_Prodi' => 'required',
            'Biaya_Operasional_Pembelajaran_UPPS' => 'required',
            'Biaya_Operasional_TidakLangsung_Prodi' => 'required',
            'Biaya_Operasional_TidakLangsung_UPPS' => 'required',
            'Biaya_Tenaga_Kependidikan_Prodi' => 'required',
            'Biaya_Tenaga_Kependidikan_UPPS' => 'required',
            'Prodi_Id' => 'required',
            'Tahun' => 'required',


        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $model = PenggunaanDana::create([
            'Biaya_Dosen_Prodi' => $request->Biaya_Dosen_Prodi,
            'Biaya_Dosen_UPPS' => $request->Biaya_Dosen_UPPS,
            'Biaya_Investasi_Prasarana_Prodi' => $request->Biaya_Investasi_Prasarana_Prodi,
            'Biaya_Investasi_Prasarana_UPPS' => $request->Biaya_Investasi_Prasarana_UPPS,
            'Biaya_Investasi_Sarana_Prodi' => $request->Biaya_Investasi_Sarana_Prodi,
            'Biaya_Investasi_Sarana_UPPS' => $request->Biaya_Investasi_Sarana_UPPS,
            'Biaya_Investasi_SDM_Prodi' => $request->Biaya_Investasi_SDM_Prodi,
            'Biaya_Investasi_SDM_UPPS' => $request->Biaya_Investasi_SDM_UPPS,
            'Biaya_Operasional_Kemahasiswaan_Prodi' => $request->Biaya_Operasional_Kemahasiswaan_Prodi,
            'Biaya_Operasional_Kemahasiswaan_UPPS' => $request->Biaya_Operasional_Kemahasiswaan_UPPS,
            'Biaya_Operasional_Pembelajaran_Prodi' => $request->Biaya_Operasional_Pembelajaran_Prodi,
            'Biaya_Operasional_Pembelajaran_UPPS' => $request->Biaya_Operasional_Pembelajaran_UPPS,
            'Biaya_Operasional_TidakLangsung_Prodi' => $request->Biaya_Operasional_TidakLangsung_Prodi,
            'Biaya_Operasional_TidakLangsung_UPPS' => $request->Biaya_Operasional_TidakLangsung_UPPS,
            'Biaya_Tenaga_Kependidikan_Prodi' => $request->Biaya_Tenaga_Kependidikan_Prodi,
            'Biaya_Tenaga_Kependidikan_UPPS' => $request->Biaya_Tenaga_Kependidikan_UPPS,
            'Prodi_Id' => $request->Prodi_Id,
            'Tahun' => $request->Tahun


        ]);

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menambahkan Data Penggunaan Dana"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Menambahkan Data Penggunaan Dana"
        ]);
    }


    public function edit_penggunaan_dana(Request $request, $id)
    {
        $credentials = $request->only(
            'Biaya_Dosen_Prodi',
            'Biaya_Dosen_UPPS',
            'Biaya_Investasi_Prasarana_Prodi',
            'Biaya_Investasi_Prasarana_UPPS',
            'Biaya_Investasi_Sarana_Prodi',
            'Biaya_Investasi_Sarana_UPPS',
            'Biaya_Investasi_SDM_Prodi',
            'Biaya_Investasi_SDM_UPPS',
            'Biaya_Operasional_Kemahasiswaan_Prodi',
            'Biaya_Operasional_Kemahasiswaan_UPPS',
            'Biaya_Operasional_Pembelajaran_Prodi',
            'Biaya_Operasional_Pembelajaran_UPPS',
            'Biaya_Operasional_TidakLangsung_Prodi',
            'Biaya_Operasional_TidakLangsung_UPPS',
            'Biaya_Tenaga_Kependidikan_Prodi',
            'Biaya_Tenaga_Kependidikan_UPPS',
            'Prodi_Id',
            'Tahun'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'Biaya_Dosen_Prodi' => 'required',
            'Biaya_Dosen_UPPS' => 'required',
            'Biaya_Investasi_Prasarana_Prodi' => 'required',
            'Biaya_Investasi_Prasarana_UPPS' => 'required',
            'Biaya_Investasi_Sarana_Prodi' => 'required',
            'Biaya_Investasi_Sarana_UPPS' => 'required',
            'Biaya_Investasi_SDM_Prodi' => 'required',
            'Biaya_Investasi_SDM_UPPS' => 'required',
            'Biaya_Operasional_Kemahasiswaan_Prodi' => 'required',
            'Biaya_Operasional_Kemahasiswaan_UPPS' => 'required',
            'Biaya_Operasional_Pembelajaran_Prodi' => 'required',
            'Biaya_Operasional_Pembelajaran_UPPS' => 'required',
            'Biaya_Operasional_TidakLangsung_Prodi' => 'required',
            'Biaya_Operasional_TidakLangsung_UPPS' => 'required',
            'Biaya_Tenaga_Kependidikan_Prodi' => 'required',
            'Biaya_Tenaga_Kependidikan_UPPS' => 'required',
            'Prodi_Id' => 'required',
            'Tahun' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }


        $model = PenggunaanDana::find($id);

        $model->Biaya_Dosen_Prodi = $request->Biaya_Dosen_Prodi;
        $model->Biaya_Dosen_UPPS = $request->Biaya_Dosen_UPPS;
        $model->Biaya_Investasi_Prasarana_Prodi = $request->Biaya_Investasi_Prasarana_Prodi;
        $model->Biaya_Investasi_Prasarana_UPPS = $request->Biaya_Investasi_Prasarana_UPPS;
        $model->Biaya_Investasi_Sarana_Prodi = $request->Biaya_Investasi_Sarana_Prodi;
        $model->Biaya_Investasi_Sarana_UPPS = $request->Biaya_Investasi_Sarana_UPPS;
        $model->Biaya_Investasi_SDM_Prodi =  $request->Biaya_Investasi_SDM_Prodi;
        $model->Biaya_Investasi_SDM_UPPS = $request->Biaya_Investasi_SDM_UPPS;
        $model->Biaya_Operasional_Kemahasiswaan_Prodi = $request->Biaya_Operasional_Kemahasiswaan_Prodi;
        $model->Biaya_Operasional_Pembelajaran_Prodi = $request->Biaya_Operasional_Pembelajaran_Prodi;
        $model->Biaya_Operasional_Pembelajaran_UPPS = $request->Biaya_Operasional_Pembelajaran_UPPS;
        $model->Biaya_Operasional_TidakLangsung_Prodi = $request->Biaya_Operasional_TidakLangsung_Prodi;
        $model->Biaya_Operasional_TidakLangsung_UPPS = $request->Biaya_Operasional_TidakLangsung_UPPS;
        $model->Biaya_Tenaga_Kependidikan_Prodi = $request->Biaya_Tenaga_Kependidikan_Prodi;
        $model->Biaya_Tenaga_Kependidikan_UPPS = $request->Biaya_Tenaga_Kependidikan_UPPS;
        $model->Prodi_Id = $request->Prodi_Id;
        $model->Tahun = $request->Tahun;

        $model->save();

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Update Data Penggunaan Dana"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Update Data Penggunaan Dana"
        ]);
    }

    public function delete_penggunaan_dana($id)
    {
        $model = PenggunaanDana::find($id);
        $model->delete();

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus"
        ]);
    }
}
