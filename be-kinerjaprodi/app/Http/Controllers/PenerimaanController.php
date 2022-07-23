<?php

namespace App\Http\Controllers;
use App\Models\Penerimaan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class PenerimaanController extends Controller
{
    public function tampilmahasiswa(){
        return response()->json([
            'success' => true,
            'Seleksi' => Penerimaan::with('prodi')->get()
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
            'tampil_penerimaan' => Penerimaan::with('prodi')->where('id',$id)->first(),
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

            'Tahun_Akademik'=> 'required',
            'Daya_Tampung'=> 'required',
            'Pendaftaran'=> 'required',
            'Lulus_Seleksi'=> 'required',
            'Maba_Reguler'=> 'required',
            'Maba_Transfer'=> 'required',
            'Mahasiswa_Aktif_Reguler'=> 'required',
            'Mahasiswa_Aktif_Transfer'=> 'required',
            'Program_Studi_Prodi_Id'=> 'required'

          
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $model = Penerimaan::create([


            'Tahun_Akademik'=> $request->Tahun_Akademik,
            'Daya_Tampung'=> $request->Daya_Tampung,
            'Pendaftaran'=> $request->Pendaftaran,
            'Lulus_Seleksi'=> $request->Lulus_Seleksi,
            'Maba_Reguler'=> $request->Maba_Reguler,
            'Maba_Transfer'=> $request->Maba_Transfer,
            'Mahasiswa_Aktif_Reguler'=> $request->Mahasiswa_Aktif_Reguler,
            'Mahasiswa_Aktif_Transfer'=> $request->Mahasiswa_Aktif_Transfer,
            'Program_Studi_Prodi_Id'=> $request->Program_Studi_Prodi_Id,
           
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
            'Tahun_Akademik'=> 'required',
            'Daya_Tampung'=> 'required',
            'Pendaftaran'=> 'required',
            'Lulus_Seleksi'=> 'required',
            'Maba_Reguler'=> 'required',
            'Maba_Transfer'=> 'required',
            'Mahasiswa_Aktif_Reguler'=> 'required',
            'Mahasiswa_Aktif_Transfer'=> 'required',
            'Program_Studi_Prodi_Id'=> 'required'

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $model = Penerimaan::find($id);

        $model->Tahun_Akademik = $request->Tahun_Akademik;
        $model->Daya_Tampung = $request->Daya_Tampung;
        $model->Pendaftaran = $request->Pendaftaran;
        $model->Lulus_Seleksi = $request->Lulus_Seleksi;
        $model->Maba_Reguler= $request->Maba_Reguler;
        $model->Maba_Transfer =  $request->Maba_Transfer;
        $model->Mahasiswa_Aktif_Reguler=  $request->Mahasiswa_Aktif_Reguler;
        $model->Mahasiswa_Aktif_Transfer = $request-> Mahasiswa_Aktif_Transfer;
        $model->Program_Studi_Prodi_Id=  $request->Program_Studi_Prodi_Id;
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
