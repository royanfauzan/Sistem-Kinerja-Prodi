<?php

namespace App\Http\Controllers;
use App\Models\MahasiswaAsing;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class MahasiswaAsingController extends Controller
{
    public function tampil_mahasiswa_asing(){
        return response()->json([
            'success' => true,
            'mahasiswa_asing' => MahasiswaAsing::with('prodi')->get()
        ]);
    }
    public function tester(Request $request)
    {
        return response()->json(['Sukses' => true]);
    }

    public function insert_mahasiswa_asing(Request $request)
    {
        $credentials = $request->only(
        'Tahun_Akademik',
        'Program_Studi',
        'Mahasiswa_Aktif',
        'Mahasiswa_Aktif_Fulltime',
        'Mahasiswa_Aktif_Parttime',
        'Program_Studi_Prodi_Id'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'Tahun_Akademik'=> 'required',
            'Program_Studi'=> 'required',
            'Mahasiswa_Aktif'=> 'required',
            'Mahasiswa_Aktif_Fulltime'=> 'required',
            'Mahasiswa_Aktif_Parttime'=> 'required',
            'Program_Studi_Prodi_Id'=> 'required'

          
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $model = MahasiswaAsing::create([
            'Tahun_Akademik'=> $request->Tahun_Akademik,
            'Program_Studi'=> $request->Program_Studi,
            'Mahasiswa_Aktif'=> $request->Mahasiswa_Aktif,
            'Mahasiswa_Aktif_Fulltime'=> $request->Mahasiswa_Aktif_Fulltime,
            'Mahasiswa_Aktif_Parttime'=> $request->Mahasiswa_Aktif_Parttime,
            'Program_Studi_Prodi_Id'=> $request->Program_Studi_Prodi_Id
           
        ]);

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Tambah Data Mahasiswa Asing"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Tambah Data Mahasiswa Asing"
        ]);
    }


    public function edit_mahasiswa_asing(Request $request, $id)
    {
        $credentials = $request->only(
            'Tahun_Akademik',
            'Program_Studi',
            'Mahasiswa_Aktif',
            'Mahasiswa_Aktif_Fulltime',
            'Mahasiswa_Aktif_Parttime',
            'Program_Studi_Prodi_Id'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'Tahun_Akademik'=> 'required',
            'Program_Studi'=> 'required',
            'Mahasiswa_Aktif'=> 'required',
            'Mahasiswa_Aktif_Fulltime'=> 'required',
            'Mahasiswa_Aktif_Parttime'=> 'required',
            'Program_Studi_Prodi_Id'=> 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $model = MahasiswaAsing::find($id);
        $model->Tahun_Akademik = $request->Tahun_Akademik;
        $model->Program_Studi = $request->Program_Studi;
        $model->Mahasiswa_Aktif = $request->Mahasiswa_Aktif;
        $model->Mahasiswa_Aktif_Fulltime = $request->Mahasiswa_Aktif_Fulltime;
        $model->Mahasiswa_Aktif_Parttime = $request->Mahasiswa_Aktif_Parttime;
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
    public function delete_mahasiswa_asing($id)
    {
        $model = MahasiswaAsing::find($id);
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
