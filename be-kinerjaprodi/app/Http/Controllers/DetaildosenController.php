<?php

namespace App\Http\Controllers;

use App\Models\Detaildosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DetaildosenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = $request->only('profil_dosen_id', 'bidangKeahlian', 'kesesuaian', 'jabatanAkademik', 'noSertifPendidik', 'fileBukti');
        $validator = Validator::make($data, [
            'profil_dosen_id'=>'required|string',
            'bidangKeahlian'=>'required|string',
            'kesesuaian'=>"required|string",
            'jabatanAkademik'=>'required|string',
            'noSertifPendidik'=>'required|string',
            "fileBukti" => "required|mimetypes:application/pdf|max:10000",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/detaildosen/";

            $dokumen = $request->file('fileBukti');

            $namaFiledokumen = preg_replace('/\s+/', '_', trim($dokumen->getClientOriginalName())) . "-". time() . "." . $dokumen->getClientOriginalExtension();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Gambar".$th,
            ], 400);
        }

        $dtDosen = Detaildosen::create([
            'profil_dosen_id'=>$request->profil_dosen_id,
            'bidangKeahlian'=>$request->profil_dosen_id,
            'kesesuaian'=>$request->profil_dosen_id,
            'jabatanAkademik'=>$request->profil_dosen_id,
            'noSertifPendidik'=>$request->profil_dosen_id,
            "fileBukti" => $finalPathdokumen,
        ]);

        return response()->json([
            'success' => false,
            'detilDosen' => $dtDosen ,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
