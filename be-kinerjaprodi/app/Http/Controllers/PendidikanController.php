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
        // $dosenId = null;
        // if ($user->profilDosen) {
        //     $dosenId=$user->profilDosen->id;
        // }else{
        //     $dosenId = $request->dosenId;
        // }

        $data = $request->only('profil_dosen_id', 'tahun_lulus', 'program_pendidikan', 'perguruan_tinggi', 'jurusan', 'prodi');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|string',
            'tahun_lulus' => 'required|string',
            'program_pendidikan' => 'required|string',
            'perguruan_tinggi' => "required|string",
            'jurusan' => "required|string",
            'prodi' => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }


        $pendidikan = Pendidikan::create([
            'tahun_lulus' => $request->tahun_lulus,
            'program_pendidikan' => $request->program_pendidikan,
            'perguruan_tinggi' => $request->perguruan_tinggi,
            'jurusan' => $request->jurusan,
            'prodi' => $request->prodi,
            'profil_dosen_id' => $request->profil_dosen_id
        ]);

        return response()->json([
            'success' => true,
            'pendidikans' => $pendidikan,
            'dosenId' => $request->profil_dosen_id
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
        $pendidikan = Pendidikan::with('profilDosen')->find($id);
        return response()->json([
            'success' => true,
            'datapendidikan' => $pendidikan,
            // 'dosenId'=> $dosenId
        ]);
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
        $data = $request->only('profil_dosen_id', 'tahun_lulus', 'program_pendidikan', 'perguruan_tinggi', 'jurusan', 'prodi');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|string',
            'tahun_lulus' => 'required|string',
            'program_pendidikan' => 'required|string',
            'perguruan_tinggi' => "required|string",
            'jurusan' => "required|string",
            'prodi' => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        $pendidikan = Pendidikan::find($id);

        $pendidikan->tahun_lulus = $request->tahun_lulus;
        $pendidikan->program_pendidikan = $request->program_pendidikan;
        $pendidikan->perguruan_tinggi = $request->perguruan_tinggi;
        $pendidikan->jurusan = $request->jurusan;
        $pendidikan->prodi = $request->prodi;
        $pendidikan->profil_dosen_id = $request->profil_dosen_id;
        $pendidikan->save();


        return response()->json([
            'success' => true,
            'pendidikans' => $pendidikan,
            'dosenId' => $request->profil_dosen_id
        ]);
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
        $pendidikan = Pendidikan::find($id);

        $pendidikan->delete();

        return response()->json([
            'success' => true,
            'pendidikanDosen' => $pendidikan,
        ]);
    }
}
