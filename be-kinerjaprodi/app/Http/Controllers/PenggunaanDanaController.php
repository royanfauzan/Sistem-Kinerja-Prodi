<?php

namespace App\Http\Controllers;

<<<<<<< HEAD
=======
use App\Models\Penelitian;
>>>>>>> 616928e (validasi)
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\PenggunaanDana;
use App\Models\Prodi;
<<<<<<< HEAD
=======
use App\Models\Pkm;
>>>>>>> 616928e (validasi)

class PenggunaanDanaController extends Controller

{
    public function tampil_penggunaan_dana()
    {
        //
<<<<<<< HEAD
       
=======

>>>>>>> 616928e (validasi)
        return response()->json([
            'success' => true,
            'tampil_penggunaan_dana' => PenggunaanDana::with('prodi')->get()
        ]);
    }
<<<<<<< HEAD
=======
    public function export_penggunaan_dana($tahun)
    {
        //// memecah isi data menjadi array
        $delimiter = ',';
        $words = explode($delimiter, $tahun);
        $tahunn = array();

        foreach ($words as $word) {
            $tahunn[] = $word;
        }

        return response()->json([
            'success' => true,
            'tampil_ts1' => PenggunaanDana::where('Tahun', $tahunn[0])->first(),
            'tampil_ts2' => PenggunaanDana::where('Tahun', $tahunn[1])->first(),
            'tampil_ts3' => PenggunaanDana::where('Tahun', $tahunn[2])->first(),
            'dana_pkm1' => Pkm::where('tahun', $tahunn[0])->first(),
            'dana_pkm2' => Pkm::where('tahun', $tahunn[1])->first(),
            'dana_pkm3' => Pkm::where('tahun', $tahunn[2])->first(),
            'dana_penelitian1' => Penelitian::where('tahun', $tahunn[0])->first(),
            'dana_penelitian2' => Penelitian::where('tahun', $tahunn[1])->first(),
            'dana_penelitian3' => Penelitian::where('tahun', $tahunn[2])->first(),
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
>>>>>>> 616928e (validasi)

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
<<<<<<< HEAD
            'Biaya_Investasi_Prasarana_Prodi'=> 'required',
            'Biaya_Investasi_Prasarana_UPPS'=> 'required',
=======
            'Biaya_Investasi_Prasarana_Prodi' => 'required',
            'Biaya_Investasi_Prasarana_UPPS' => 'required',
>>>>>>> 616928e (validasi)
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
            return response()->json(['error' => $validator->errors()], 200);
        }

        $model = PenggunaanDana::create([
<<<<<<< HEAD
            'Biaya_Dosen_Prodi'=>$request->Biaya_Dosen_Prodi,
            'Biaya_Dosen_UPPS'=>$request->Biaya_Dosen_UPPS,
            'Biaya_Investasi_Prasarana_Prodi'=>$request->Biaya_Investasi_Prasarana_Prodi,
            'Biaya_Investasi_Prasarana_UPPS'=>$request->Biaya_Investasi_Prasarana_UPPS,
            'Biaya_Investasi_Sarana_Prodi'=>$request->Biaya_Investasi_Sarana_Prodi,
            'Biaya_Investasi_Sarana_UPPS'=>$request->Biaya_Investasi_Sarana_UPPS,
            'Biaya_Investasi_SDM_Prodi'=>$request->Biaya_Investasi_SDM_Prodi,
            'Biaya_Investasi_SDM_UPPS' =>$request->Biaya_Investasi_SDM_UPPS,
            'Biaya_Operasional_Kemahasiswaan_Prodi'=>$request->Biaya_Operasional_Kemahasiswaan_Prodi,
            'Biaya_Operasional_Kemahasiswaan_UPPS'=>$request->Biaya_Operasional_Kemahasiswaan_UPPS,
            'Biaya_Operasional_Pembelajaran_Prodi'=>$request->Biaya_Operasional_Pembelajaran_Prodi,
            'Biaya_Operasional_Pembelajaran_UPPS'=>$request->Biaya_Operasional_Pembelajaran_UPPS,
            'Biaya_Operasional_TidakLangsung_Prodi'=>$request->Biaya_Operasional_TidakLangsung_Prodi,
            'Biaya_Operasional_TidakLangsung_UPPS'=>$request->Biaya_Operasional_TidakLangsung_UPPS,
            'Biaya_Tenaga_Kependidikan_Prodi'=>$request->Biaya_Tenaga_Kependidikan_Prodi,
            'Biaya_Tenaga_Kependidikan_UPPS'=>$request->Biaya_Tenaga_Kependidikan_UPPS,
            'Prodi_Id'=>$request->Prodi_Id,
            'Tahun'=>$request->Tahun
           
=======
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

>>>>>>> 616928e (validasi)

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
            return response()->json(['error' => $validator->errors()], 200);
        }

<<<<<<< HEAD
       
        $model = PenggunaanDana::find($id);
       
=======

        $model = PenggunaanDana::find($id);

>>>>>>> 616928e (validasi)
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
<<<<<<< HEAD
        $model->Biaya_Operasional_TidakLangsung_UPPS= $request->Biaya_Operasional_TidakLangsung_UPPS;
=======
        $model->Biaya_Operasional_TidakLangsung_UPPS = $request->Biaya_Operasional_TidakLangsung_UPPS;
>>>>>>> 616928e (validasi)
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
