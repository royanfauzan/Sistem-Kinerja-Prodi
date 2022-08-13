<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mitra;
use Illuminate\Support\Facades\Validator;

class MitraController extends Controller
{
    public function tampil_mitra()
    {
        //
        return response()->json([
            'success' => true,
            'tampil_mitras' => Mitra::all(),
        ]);
    }
    public function tampil_editmitra($id)
    {
        //
        return response()->json([
            'success' => true,
            'tampil_mitras' => Mitra::find($id),
            'id' => $id
        ]);
    }

    public function searchmitra($search)
    {


        return response()->json([
            'success' => true,
            'searchmitra' =>  Mitra::where('namamitra', 'LIKE', "%{$search}%")
                ->orwhere('alamat', 'LIKE', "%{$search}%")
                ->orwhere('no_telepon', 'LIKE', "%{$search}%")
                ->orwhere('nama_cp', 'LIKE', "%{$search}%")
                ->orwhere('no_telp_cp', 'LIKE', "%{$search}%")
                ->orwhere('email_cp', 'LIKE', "%{$search}%")
                ->orwhere('bidang', 'LIKE', "%{$search}%")
                ->get()

        ]);
    }

    public function tester(Request $request)
    {
        return response()->json(['Sukses' => true]);
    }



    public function insertmitra(Request $request)
    {
        $credentials = $request->only(
            'namamitra',
            'alamat',
            'no_telepon',
            'nama_cp',
            'no_telp_cp',
            'email_cp',
            'bidang',
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'namamitra' => 'required|string|min:6',
            'alamat' => 'required|string|',
            'no_telepon' => 'required|string|',
            'nama_cp' => 'required|string|',
            'no_telp_cp' => 'required|string|',
            'email_cp' => 'required|string|',
            'bidang' => 'required|string|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $model = Mitra::create([
            'namamitra' => $request->namamitra,
            'alamat' => $request->alamat,
            'no_telepon' => $request->no_telepon,
            'nama_cp' => $request->nama_cp,
            'no_telp_cp' => $request->no_telp_cp,
            'email_cp' => $request->email_cp,
            'bidang' => $request->bidang,
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


    public function editmitra(Request $request, $id)
    {
        $credentials = $request->only(
            'namamitra',
            'alamat',
            'no_telepon',
            'nama_cp',
            'no_telp_cp',
            'email_cp',
            'bidang',
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'namamitra' => 'required|string|min:6',
            'alamat' => 'required|string|',
            'no_telepon' => 'required|string|',
            'nama_cp' => 'required|string|',
            'no_telp_cp' => 'required|string|',
            'email_cp' => 'required|string|',
            'bidang' => 'required|string|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        $model = Mitra::find($id);
        $model->namamitra = $request->namamitra;
        $model->alamat = $request->alamat;
        $model->no_telepon = $request->no_telepon;
        $model->nama_cp = $request->nama_cp;
        $model->no_telp_cp = $request->no_telp_cp;
        $model->email_cp =  $request->email_cp;
        $model->bidang = $request->bidang;
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
    public function deletemitra($id)
    {
        $model = Mitra::find($id);
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
