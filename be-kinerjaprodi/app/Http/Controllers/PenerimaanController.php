<?php

namespace App\Http\Controllers;

use App\Models\Penerimaan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class PenerimaanController extends Controller
{
    public function tampilexport_penerimaan($tahun)
    {

        // delklarasi variable array tahun
        $tahunn = array();
        $tahunn[] = $tahun;
        $tahunn[] = $tahun - 1;
        $tahunn[] = $tahun - 2;
        $tahunn[] = $tahun - 3;
        $tahunn[] = $tahun - 4;

        $mhsarray = array();

        // mencari data mahasiswa seleksi berdasarkan tahun dan disimpan ke variable array
        foreach ($tahunn as $key => $th) {
            array_push($mhsarray, Penerimaan::with('prodi')->where('Tahun_Akademik', $th)->first());
        }

        $jmlh_pendaftaran = 0;
        $jmlh_lulus = 0;
        $jmlh_reguler_baru = 0;
        $jmlh_transfer_baru = 0;
        $jmlh_transfer_aktif = 0;
        $jmlh_reguler_aktif = 0;

        $jumlaharay = array();
        // menghitung jumlah total calon mhs, mhs baru, mhs aktif
        for ($i = 0; $i < 5; $i++) {
            if ($mhsarray[$i] == null) {
            } else {
                $jmlh_pendaftaran += $mhsarray[$i]->Pendaftaran;
                $jmlh_lulus += $mhsarray[$i]->Lulus_Seleksi;
                $jmlh_reguler_baru += $mhsarray[$i]->Maba_Reguler;
                $jmlh_transfer_baru += $mhsarray[$i]->Maba_Transfer;
                $jmlh_reguler_aktif += $mhsarray[$i]->Mahasiswa_Aktif_Reguler;
                $jmlh_transfer_aktif += $mhsarray[$i]->Mahasiswa_Aktif_Transfer;
            }
        }
        array_push($jumlaharay, [
            'jmlh_pendaftaran' => $jmlh_pendaftaran, 'jmlh_lulus' => $jmlh_lulus, 'jmlh_reguler_baru' => $jmlh_reguler_baru, 'jmlh_transfer_baru' => $jmlh_transfer_baru,
            'jmlh_reguler_transfer_aktif' => $jmlh_reguler_aktif + $jmlh_transfer_aktif
        ]);
        return response()->json([
            'success' => true,
            'seleksi' => $mhsarray,
            'jumlah' => $jumlaharay

        ]);
    }
    public function tampilmahasiswa()
    {
        $jmlh_pendaftaran = 0;
        $jmlh_lulus = 0;
        $jmlh_reguler_baru = 0;
        $jmlh_transfer_baru = 0;
        $jmlh_transfer_aktif = 0;
        $jmlh_reguler_aktif = 0;

        $jumlaharay = array();
        $mhsarray = array();
        $mhs = Penerimaan::with('prodi')->orderBy('Tahun_Akademik', 'desc')->get();
        $count = count($mhs);
        for ($i = 0; $i < $count; $i++) {

            array_push($mhsarray, $mhs[$i]);
        }
        // menghitung jumlah total calon mhs, mhs baru, mhs aktif
        for ($i = 0; $i < $count; $i++) {

            $jmlh_pendaftaran += $mhsarray[$i]->Pendaftaran;
            $jmlh_lulus += $mhsarray[$i]->Lulus_Seleksi;
            $jmlh_reguler_baru += $mhsarray[$i]->Maba_Reguler;
            $jmlh_transfer_baru += $mhsarray[$i]->Maba_Transfer;
            $jmlh_reguler_aktif += $mhsarray[$i]->Mahasiswa_Aktif_Reguler;
            $jmlh_transfer_aktif += $mhsarray[$i]->Mahasiswa_Aktif_Transfer;
        }
        array_push($jumlaharay, [
            'jmlh_pendaftaran' => $jmlh_pendaftaran, 'jmlh_lulus' => $jmlh_lulus, 'jmlh_reguler_baru' => $jmlh_reguler_baru, 'jmlh_transfer_baru' => $jmlh_transfer_baru,
            'jmlh_reguler_transfer_aktif' => $jmlh_reguler_aktif + $jmlh_transfer_aktif
        ]);

        return response()->json([
            'success' => true,
            'Seleksi' => Penerimaan::with('prodi')->orderBy('Tahun_Akademik', 'desc')->get(),
            'Jumlah' => $jumlaharay
        ]);
    }
    public function searchmahasiswa($search)
    {
        return response()->json([
            'success' => true,
            'SearchMhs' => Penerimaan::with('prodi')
                ->whereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
                ->orWhere('Tahun_Akademik', 'LIKE', "%{$search}%")
                ->orWhere('Daya_Tampung', 'LIKE', "%{$search}%")
                ->orWhere('Pendaftaran', 'LIKE', "%{$search}%")
                ->orWhere('Maba_Reguler', 'LIKE', "%{$search}%")
                ->orWhere('Maba_Transfer', 'LIKE', "%{$search}%")
                ->orWhere('Mahasiswa_Aktif_Reguler', 'LIKE', "%{$search}%")
                ->orWhere('Mahasiswa_Aktif_Transfer', 'LIKE', "%{$search}%")
                ->orWhere('Lulus_Seleksi', 'LIKE', "%{$search}%")->get()
        ]);
    }
    public function tester(Request $request)
    {
        return response()->json(['Sukses' => true]);
    }

    public function tampil_edit_penerimaan($id)
    {
        //
        return response()->json([
            'success' => true,
            'tampil_penerimaan' => Penerimaan::with('prodi')->where('id', $id)->first(),
            'id' => $id
        ]);
    }

    public function insert_penerimaan_mahasiswa(Request $request)
    {
        $credentials = $request->only(
            'Tahun_Akademik',
            'Daya_Tampung',
            'Pendaftaran',
            'Lulus_Seleksi',
            'Maba_Reguler',
            'Maba_Transfer',
            'Mahasiswa_Aktif_Reguler',
            'Mahasiswa_Aktif_Transfer',
            'Program_Studi_Prodi_Id'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'Tahun_Akademik' => 'required',
            'Daya_Tampung' => 'required',
            'Pendaftaran' => 'required',
            'Lulus_Seleksi' => 'required',
            'Maba_Reguler' => 'required',
            'Maba_Transfer' => 'required',
            'Mahasiswa_Aktif_Reguler' => 'required',
            'Mahasiswa_Aktif_Transfer' => 'required',
            'Program_Studi_Prodi_Id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $model = Penerimaan::create([


            'Tahun_Akademik' => $request->Tahun_Akademik,
            'Daya_Tampung' => $request->Daya_Tampung,
            'Pendaftaran' => $request->Pendaftaran,
            'Lulus_Seleksi' => $request->Lulus_Seleksi,
            'Maba_Reguler' => $request->Maba_Reguler,
            'Maba_Transfer' => $request->Maba_Transfer,
            'Mahasiswa_Aktif_Reguler' => $request->Mahasiswa_Aktif_Reguler,
            'Mahasiswa_Aktif_Transfer' => $request->Mahasiswa_Aktif_Transfer,
            'Program_Studi_Prodi_Id' => $request->Program_Studi_Prodi_Id,

        ]);

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Tambah Data Penerimaan Mahasiswa"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Tambah Data Penerimaan Mahasiswa"
        ]);
    }


    public function edit_penerimaan_mahasiswa(Request $request, $id)
    {
        $credentials = $request->only(
            'Tahun_Akademik',
            'Daya_Tampung',
            'Pendaftaran',
            'Lulus_Seleksi',
            'Maba_Reguler',
            'Maba_Transfer',
            'Mahasiswa_Aktif_Reguler',
            'Mahasiswa_Aktif_Transfer',
            'Program_Studi_Prodi_Id'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'Tahun_Akademik' => 'required',
            'Daya_Tampung' => 'required',
            'Pendaftaran' => 'required',
            'Lulus_Seleksi' => 'required',
            'Maba_Reguler' => 'required',
            'Maba_Transfer' => 'required',
            'Mahasiswa_Aktif_Reguler' => 'required',
            'Mahasiswa_Aktif_Transfer' => 'required',
            'Program_Studi_Prodi_Id' => 'required'

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $model = Penerimaan::find($id);

        $model->Tahun_Akademik = $request->Tahun_Akademik;
        $model->Daya_Tampung = $request->Daya_Tampung;
        $model->Pendaftaran = $request->Pendaftaran;
        $model->Lulus_Seleksi = $request->Lulus_Seleksi;
        $model->Maba_Reguler = $request->Maba_Reguler;
        $model->Maba_Transfer =  $request->Maba_Transfer;
        $model->Mahasiswa_Aktif_Reguler =  $request->Mahasiswa_Aktif_Reguler;
        $model->Mahasiswa_Aktif_Transfer = $request->Mahasiswa_Aktif_Transfer;
        $model->Program_Studi_Prodi_Id =  $request->Program_Studi_Prodi_Id;
        $model->save();

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Update Data Mahasiswa Asing"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Update Data Mahasiswa Asing"
        ]);
    }
    public function delete_penerimaan_mahasiswa($id)
    {
        $model = Penerimaan::find($id);
        $model->delete();

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Data Mahasiswa Asing Gagal Gagal Dihapus"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Data Mahasiswa Asing Berhasil Dihapus"
        ]);
    }
}