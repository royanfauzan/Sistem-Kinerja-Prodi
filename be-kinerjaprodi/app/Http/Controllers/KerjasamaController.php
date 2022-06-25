<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Kerjasama;
use App\Models\Mitra;

class KerjasamaController extends Controller
{
    public function insertkerjasama(Request $request)
    {
        $credentials = $request->only(
            'namamitra',
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
            'namamitra' => 'required|string|min:6',
            'tingkat' => 'required|string|min:6',
            'judul_kegiatan' => 'required|string|',
            'manfaat' => 'required|string|',
            'tanggal_kegiatan' => 'required|string|',
            'lama_kegiatan' => 'required|string|',
            'bukti_kerjasama' => 'required|string|',
            'tahun_berakhir' => 'required|string|',
            'bidang' => 'required|string|',
            'file_bukti' => 'required|string|',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $mitra = Mitra::where('namamitra', $request->namamitra)->first();
        $model = Kerjasama::create([
            'mitra_id' => $mitra->id,
            'tingkat' => $request->tingkat,
            'judul_kegiatan' => $request->judul_kegiatan,
            'manfaat' => $request->manfaat,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
            'lama_kegiatan' => $request->lama_kegiatan,
            'bukti_kerjasama' => $request->bukti_kerjasama,
            'tahun_berakhir' => $request->tahun_berakhir,
            'bidang' => $request->bidang,
            'file_bukti' => $request->file_bukti,

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
            'namamitra',
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
            'namamitra' => 'required|string|min:6',
            'tingkat' => 'required|string|min:6',
            'judul_kegiatan' => 'required|string|',
            'manfaat' => 'required|string|',
            'tanggal_kegiatan' => 'required|string|',
            'lama_kegiatan' => 'required|string|',
            'bukti_kerjasama' => 'required|string|',
            'tahun_berakhir' => 'required|string|',
            'bidang' => 'required|string|',
            'file_bukti' => 'required|string|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $mitra = Mitra::where('namamitra', $request->namamitra)->first();
        $model = Kerjasama::find($id);
        $model->mitra_id = $mitra->id;
        $model->tingkat = $request->tingkat;
        $model->judul_kegiatan = $request->judul_kegiatan;
        $model->manfaat = $request->manfaat;
        $model->tanggal_kegiatan = $request->tanggal_kegiatan;
        $model->lama_kegiatan =  $request->lama_kegiatan;
        $model->bukti_kerjasama = $request->bukti_kerjasama;
        $model->tahun_berakhir = $request->tahun_berakhir;
        $model->bidang = $request->bidang;
        $model->file_bukti = $request->file_bukti;
        $model->save();

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
