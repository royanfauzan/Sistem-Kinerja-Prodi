<?php

namespace App\Http\Controllers;

use App\Models\Pendidikan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PendidikanController extends Controller
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

        $data = $request->only('tahun_lulus', 'program_pendidikan', 'perguruan_tinggi', 'jurusan', 'prodi');
        $validator = Validator::make($data, [
            'tahun_lulus'=>'required|string',
            'program_pendidikan'=>'required|string',
            'perguruan_tinggi'=>"required|string",
            'jurusan'=>"required|string",
            'prodi'=>"required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        $pendidikan = Pendidikan::create([
            'tahun_lulus'=>$request->tahun_lulus,
            'program_pendidikan'=>$request->program_pendidikan,
            'perguruan_tinggi'=>$request->perguruan_tinggi,
            'jurusan'=>$request->jurusan,
            'prodi'=>$request->prodi,
            'profil_dosen_id'=>$dosenId
        ]);

        return response()->json([
            'success' => true,
            'rekognisi' => $pendidikan,
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
