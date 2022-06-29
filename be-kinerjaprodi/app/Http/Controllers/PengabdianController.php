<?php

namespace App\Http\Controllers;

use App\Models\Pengabdian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PengabdianController extends Controller
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

        $data = $request->only('tema', 'judul', 'tahun','lokasi','mitra_id');
        $validator = Validator::make($data, [
            'tema'=>'required|string',
            'judul'=>'required|string',
            'tahun'=>"required|string",
            'lokasi'=>"required|string",
            'mitra_id'=>"required|numeric",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        $pengabdian = Pengabdian::create([
            'tema'=>$request->tema,
            'judul'=>$request->judul,
            'tahun'=>$request->tahun,
            'lokasi'=>$request->lokasi,
            'mitra_id'=> $request->mitra_id
        ]);

        if (isset($request->sdn_pt_mandiri)) {
            $pengabdian->sdn_pt_mandiri = $request->sdn_pt_mandiri;
            $pengabdian->jml_pt_mandiri = $request->jml_pt_mandiri;
        }

        if (isset($request->sdn_negri)) {
            $pengabdian->sdn_negri = $request->sdn_negri;
            $pengabdian->jml_negri = $request->jml_negri;
        }

        if (isset($request->sdn_luar)) {
            $pengabdian->sdn_luar = $request->sdn_luar;
            $pengabdian->jml_luar = $request->jml_luar;
        }

        $pengabdian->save();

        return response()->json([
            'success' => true,
            'pengabdian' => $pengabdian ,
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
