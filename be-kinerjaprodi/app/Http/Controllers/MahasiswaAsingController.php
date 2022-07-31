<?php

namespace App\Http\Controllers;
<<<<<<< HEAD
=======

>>>>>>> 616928e (validasi)
use App\Models\MahasiswaAsing;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class MahasiswaAsingController extends Controller
{
<<<<<<< HEAD
    public function tampil_mahasiswa_asing(){
=======
    public function tampil_mahasiswa_asing()
    {
>>>>>>> 616928e (validasi)
        return response()->json([
            'success' => true,
            'mahasiswa_asing' => MahasiswaAsing::with('prodi')->get()
        ]);
    }
<<<<<<< HEAD
=======
    public function search_mahasiswa_asing($search)
    {
        return response()->json([
            'success' => true,
            'mahasiswa_asing' => MahasiswaAsing::with('prodi')
                ->whereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
                ->orWhere('Tahun_Akademik', 'LIKE', "%{$search}%")
                ->orWhere('Mahasiswa_Aktif', 'LIKE', "%{$search}%")
                ->orWhere('Mahasiswa_Aktif_Fulltime', 'LIKE', "%{$search}%")
                ->orWhere('Mahasiswa_Aktif_Parttime', 'LIKE', "%{$search}%")
                ->get()
        ]);
    }
    public function tampilexport_mahasiswa_asing($tahun)
    {

        // memecah isi data menjadi array
        $delimiter = ',';
        $words = explode($delimiter, $tahun);
        $tahunn = array();

        foreach ($words as $word) {
            $tahunn[] = $word;
        }
        return response()->json([
            'success' => true,
            'data' => $tahunn,
            'ts1' =>  MahasiswaAsing::with('prodi')->where('mahasiswa_asings.Tahun_Akademik', $tahunn[0])->first(),
            'ts2' =>  MahasiswaAsing::with('prodi')->where('mahasiswa_asings.Tahun_Akademik', $tahunn[1])->first(),
            'ts3' =>  MahasiswaAsing::with('prodi')->where('mahasiswa_asings.Tahun_Akademik', $tahunn[2])->first(),
        ]);
    }
>>>>>>> 616928e (validasi)
    public function tester(Request $request)
    {
        return response()->json(['Sukses' => true]);
    }

<<<<<<< HEAD
    public function insert_mahasiswa_asing(Request $request)
    {
        $credentials = $request->only(
        'Tahun_Akademik',
        'Program_Studi',
        'Mahasiswa_Aktif',
        'Mahasiswa_Aktif_Fulltime',
        'Mahasiswa_Aktif_Parttime',
        'Program_Studi_Prodi_Id'
=======
    public function tampil_edit_mahasiswa_asing($id)
    {
        //
        return response()->json([
            'success' => true,
            'tampil_mahasiswa_asing' => MahasiswaAsing::with('prodi')->where('id', $id)->first(),
            'id' => $id
        ]);
    }

    public function insert_mahasiswa_asing(Request $request)
    {
        $credentials = $request->only(
            'Tahun_Akademik',
            'Mahasiswa_Aktif',
            'Mahasiswa_Aktif_Fulltime',
            'Mahasiswa_Aktif_Parttime',
            'Program_Studi_Prodi_Id'
>>>>>>> 616928e (validasi)
        );

        //valid credential
        $validator = Validator::make($credentials, [
<<<<<<< HEAD
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
           
=======
            'Tahun_Akademik' => 'required',
            'Mahasiswa_Aktif' => 'required',
            'Mahasiswa_Aktif_Fulltime' => 'required',
            'Mahasiswa_Aktif_Parttime' => 'required',
            'Program_Studi_Prodi_Id' => 'required'


        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $model = MahasiswaAsing::create([
            'Tahun_Akademik' => $request->Tahun_Akademik,
            'Mahasiswa_Aktif' => $request->Mahasiswa_Aktif,
            'Mahasiswa_Aktif_Fulltime' => $request->Mahasiswa_Aktif_Fulltime,
            'Mahasiswa_Aktif_Parttime' => $request->Mahasiswa_Aktif_Parttime,
            'Program_Studi_Prodi_Id' => $request->Program_Studi_Prodi_Id

>>>>>>> 616928e (validasi)
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
<<<<<<< HEAD
            'Program_Studi',
=======
>>>>>>> 616928e (validasi)
            'Mahasiswa_Aktif',
            'Mahasiswa_Aktif_Fulltime',
            'Mahasiswa_Aktif_Parttime',
            'Program_Studi_Prodi_Id'
        );

        //valid credential
        $validator = Validator::make($credentials, [
<<<<<<< HEAD
            'Tahun_Akademik'=> 'required',
            'Program_Studi'=> 'required',
            'Mahasiswa_Aktif'=> 'required',
            'Mahasiswa_Aktif_Fulltime'=> 'required',
            'Mahasiswa_Aktif_Parttime'=> 'required',
            'Program_Studi_Prodi_Id'=> 'required'
=======
            'Tahun_Akademik' => 'required',
            'Mahasiswa_Aktif' => 'required',
            'Mahasiswa_Aktif_Fulltime' => 'required',
            'Mahasiswa_Aktif_Parttime' => 'required',
            'Program_Studi_Prodi_Id' => 'required'
>>>>>>> 616928e (validasi)
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $model = MahasiswaAsing::find($id);
        $model->Tahun_Akademik = $request->Tahun_Akademik;
<<<<<<< HEAD
        $model->Program_Studi = $request->Program_Studi;
=======
>>>>>>> 616928e (validasi)
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
<<<<<<< HEAD
   
=======
>>>>>>> 616928e (validasi)
}
