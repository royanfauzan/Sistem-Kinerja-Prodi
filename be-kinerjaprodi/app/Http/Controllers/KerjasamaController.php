<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Kerjasama;
use App\Models\Mitra;

<<<<<<< HEAD
class KerjasamaController extends Controller
{
    public function tampilkerjasama(){
=======


class KerjasamaController extends Controller
{
    public function tampilkerjasama()
    {
>>>>>>> 616928e (validasi)
        return response()->json([
            'success' => true,
            'tampilkerjasama' => Kerjasama::with('Mitra')->get()

        ]);
    }
<<<<<<< HEAD
=======
    public function tampilkerjasamabidang($bidang)
    {
        return response()->json([
            'success' => true,
            'tampilkerjasamabidang' => Kerjasama::with('Mitra')->where('bidang', $bidang)->get()

        ]);
    }
    public function searchkerjasama($search)
    {


        return response()->json([
            'success' => true,
            'searchkerjasama' =>  Kerjasama::with('Mitra')
                ->whereRelation('Mitra', 'namamitra', 'LIKE', "%{$search}%")
                ->orwhere('tingkat', 'LIKE', "%{$search}%")
                ->orwhere('judul_kegiatan', 'LIKE', "%{$search}%")
                ->orwhere('manfaat', 'LIKE', "%{$search}%")
                ->orwhere('tanggal_kegiatan', 'LIKE', "%{$search}%")
                ->orwhere('lama_kegiatan', 'LIKE', "%{$search}%")
                ->orwhere('bukti_kerjasama', 'LIKE', "%{$search}%")
                ->orwhere('tahun_berakhir', 'LIKE', "%{$search}%")
                ->orwhere('bidang', 'LIKE', "%{$search}%")
                ->get()

        ]);
    }
>>>>>>> 616928e (validasi)

    public function tampil_edit_kerjasama($id)
    {
        //
        return response()->json([
            'success' => true,
            'tampil_kerjasama' => Kerjasama::find($id),
            'id' => $id
        ]);
    }
    public function insertkerjasama(Request $request)
    {
        $credentials = $request->only(
            'idmitra',
            'tingkat',
            'judul_kegiatan',
            'manfaat',
            'tanggal_kegiatan',
            'lama_kegiatan',
            'bukti_kerjasama',
            'tahun_berakhir',
            'bidang',
            'file_bukti'
        );

        //valid credential
        $validator = Validator::make($credentials, [
<<<<<<< HEAD
            'idmitra' => 'required|string',
=======
            'idmitra' => 'required',
>>>>>>> 616928e (validasi)
            'tingkat' => 'required|string',
            'judul_kegiatan' => 'required|string|',
            'manfaat' => 'required|string|',
            'tanggal_kegiatan' => 'required|string|',
            'lama_kegiatan' => 'required|string|',
            'bukti_kerjasama' => 'required|string|',
            'tahun_berakhir' => 'required|string|',
            'bidang' => 'required|string|',
<<<<<<< HEAD
            'file_bukti' => ['required','mimes:pdf,docx','max:10048'],
=======
            'file_bukti' => ['required', 'mimes:pdf,docx', 'max:10048'],
>>>>>>> 616928e (validasi)

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/kerjasama/";

            $dokumen = $request->file('file_bukti');

<<<<<<< HEAD
            $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".",$dokumen->getClientOriginalName(),2)[0])) . "-". time() . "." . $dokumen->getClientOriginalExtension();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen".$th,
=======
            $namaFiledokumen =  $dokumen->getClientOriginalName();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            // $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen" . $th,
>>>>>>> 616928e (validasi)
            ], 400);
        }


<<<<<<< HEAD
        
=======

>>>>>>> 616928e (validasi)
        $model = Kerjasama::create([
            'mitra_id' => $request->idmitra,
            'tingkat' => $request->tingkat,
            'judul_kegiatan' => $request->judul_kegiatan,
            'manfaat' => $request->manfaat,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
            'lama_kegiatan' => $request->lama_kegiatan,
            'bukti_kerjasama' => $request->bukti_kerjasama,
            'tahun_berakhir' => $request->tahun_berakhir,
            'bidang' => $request->bidang,
<<<<<<< HEAD
            'file_bukti' => $finalPathdokumen,
=======
            'file_bukti' => $namaFiledokumen
>>>>>>> 616928e (validasi)

        ]);

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil"
        ]);
    }


    public function editkerjasama(Request $request, $id)
    {
        $credentials = $request->only(
            'idmitra',
            'tingkat',
            'judul_kegiatan',
            'manfaat',
            'tanggal_kegiatan',
            'lama_kegiatan',
            'bukti_kerjasama',
            'tahun_berakhir',
            'bidang',
            'file_bukti'
        );

<<<<<<< HEAD
    
        if(!$request->file('file_bukti') )
        {
                //valid credential
        $validator = Validator::make($credentials, [
            'idmitra' => 'required|string',
            'tingkat' => 'required|string',
            'judul_kegiatan' => 'required|string|',
            'manfaat' => 'required|string|',
            'tanggal_kegiatan' => 'required|string|',
            'lama_kegiatan' => 'required|string|',
            'bukti_kerjasama' => 'required|string|',
            'tahun_berakhir' => 'required|string|',
            'bidang' => 'required|string|',
           
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
=======

        if (!$request->file('file_bukti')) {
            //valid credential
            $validator = Validator::make($credentials, [
                'idmitra' => 'required|string',
                'tingkat' => 'required|string',
                'judul_kegiatan' => 'required|string|',
                'manfaat' => 'required|string|',
                'tanggal_kegiatan' => 'required|string|',
                'lama_kegiatan' => 'required|string|',
                'bukti_kerjasama' => 'required|string|',
                'tahun_berakhir' => 'required|string|',
                'bidang' => 'required|string|',

            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 200);
            }
>>>>>>> 616928e (validasi)

            $model = Kerjasama::find($id);
            $model->mitra_id = $request->idmitra;
            $model->tingkat = $request->tingkat;
            $model->judul_kegiatan = $request->judul_kegiatan;
            $model->manfaat = $request->manfaat;
            $model->tanggal_kegiatan = $request->tanggal_kegiatan;
            $model->lama_kegiatan =  $request->lama_kegiatan;
            $model->bukti_kerjasama = $request->bukti_kerjasama;
            $model->tahun_berakhir = $request->tahun_berakhir;
            $model->bidang = $request->bidang;
            $model->save();
<<<<<<< HEAD
        }
        else{
                       //valid credential
        $validator = Validator::make($credentials, [
            'idmitra' => 'required|string',
            'tingkat' => 'required|string',
            'judul_kegiatan' => 'required|string|',
            'manfaat' => 'required|string|',
            'tanggal_kegiatan' => 'required|string|',
            'lama_kegiatan' => 'required|string|',
            'bukti_kerjasama' => 'required|string|',
            'tahun_berakhir' => 'required|string|',
            'bidang' => 'required|string|',
            'file_bukti' => ['required','mimes:pdf,docx','max:10048'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
            $finalPathdokumen = "";
            
        try {
            $folderdokumen = "storage/kerjasama/";

            $dokumen = $request->file('file_bukti');

            $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".",$dokumen->getClientOriginalName(),2)[0])) . "-". time() . "." . $dokumen->getClientOriginalExtension();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen".$th,
            ], 400);
        }
        $model = Kerjasama::find($id);
        $model->mitra_id = $request->idmitra;
        $model->tingkat = $request->tingkat;
        $model->judul_kegiatan = $request->judul_kegiatan;
        $model->manfaat = $request->manfaat;
        $model->tanggal_kegiatan = $request->tanggal_kegiatan;
        $model->lama_kegiatan =  $request->lama_kegiatan;
        $model->bukti_kerjasama = $request->bukti_kerjasama;
        $model->tahun_berakhir = $request->tahun_berakhir;
        $model->bidang = $request->bidang;
        $model->file_bukti= $finalPathdokumen;
        $model->save();
        }

        
       
     
=======
        } else {
            //valid credential
            $validator = Validator::make($credentials, [
                'idmitra' => 'required|string',
                'tingkat' => 'required|string',
                'judul_kegiatan' => 'required|string|',
                'manfaat' => 'required|string|',
                'tanggal_kegiatan' => 'required|string|',
                'lama_kegiatan' => 'required|string|',
                'bukti_kerjasama' => 'required|string|',
                'tahun_berakhir' => 'required|string|',
                'bidang' => 'required|string|',
                'file_bukti' => ['required', 'mimes:pdf,docx', 'max:10048'],
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 200);
            }
            $finalPathdokumen = "";

            try {
                $folderdokumen = "storage/kerjasama/";

                $dokumen = $request->file('file_bukti');

                $namaFiledokumen = $dokumen->getClientOriginalName();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                // $finalPathdokumen = $folderdokumen . $namaFiledokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
            $model = Kerjasama::find($id);
            $model->mitra_id = $request->idmitra;
            $model->tingkat = $request->tingkat;
            $model->judul_kegiatan = $request->judul_kegiatan;
            $model->manfaat = $request->manfaat;
            $model->tanggal_kegiatan = $request->tanggal_kegiatan;
            $model->lama_kegiatan =  $request->lama_kegiatan;
            $model->bukti_kerjasama = $request->bukti_kerjasama;
            $model->tahun_berakhir = $request->tahun_berakhir;
            $model->bidang = $request->bidang;
            $model->file_bukti = $namaFiledokumen;
            $model->save();
        }




>>>>>>> 616928e (validasi)

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Update"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Update"
        ]);
    }

    public function delete_kjs($id)
    {
        $model = Kerjasama::find($id);
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
