<?php

namespace App\Http\Controllers;

use App\Models\Rekognisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class RekognisiController extends Controller
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

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = null;
        if ($user->profilDosen) {
            $dosenId=$user->profilDosen->id;
        }else{
            $dosenId = $request->dosenId;
        }

        $data = $request->only('rekognisi', 'bidang', 'tingkat', 'tahun', 'noSertifPendidik', 'fileBukti','deskripsi');
        $validator = Validator::make($data, [
            'rekognisi'=>'required|string',
            'bidang'=>'required|string',
            'tingkat'=>"required|string",
            'tahun'=>'required|string',
            'deskripsi'=>'required|string',
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
            $folderdokumen = "storage/rekognisidosen/";

            $dokumen = $request->file('fileBukti');

            $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".",$dokumen->getClientOriginalName(),2)[0])) . "-". time() . "." . $dokumen->getClientOriginalExtension();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen".$th,
            ], 400);
        }

        $rekognisi = Rekognisi::create([
            'rekognisi'=>$request->rekognisi,
            'bidang'=>$request->rekognisi,
            'tingkat'=>$request->rekognisi,
            'tahun'=>$request->rekognisi,
            'deskripsi'=>$request->rekognisi,
            "fileBukti" => $finalPathdokumen,
            'profil_dosen_id' => $dosenId
        ]);

        return response()->json([
            'success' => true,
            'rekognisi' => $rekognisi ,
            'dosenId'=> $dosenId
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
