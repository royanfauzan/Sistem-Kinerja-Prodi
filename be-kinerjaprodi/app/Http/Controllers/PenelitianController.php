<?php

namespace App\Http\Controllers;

use App\Models\Penelitian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PenelitianController extends Controller
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

        $data = $request->only('tema', 'judul', 'tahun');
        $validator = Validator::make($data, [
            'tema'=>'required|string',
            'judul'=>'required|string',
            'tahun'=>"required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        $penelitian = Penelitian::create([
            'tema'=>$request->tema,
            'judul'=>$request->judul,
            'tahun'=>$request->tahun,
        ]);

        if (isset($request->sdn_pt_mandiri)) {
            $penelitian->sdn_pt_mandiri = $request->sdn_pt_mandiri;
            $penelitian->jml_pt_mandiri = $request->jml_pt_mandiri;
        }

        if (isset($request->sdn_negri)) {
            $penelitian->sdn_negri = $request->sdn_negri;
            $penelitian->jml_negri = $request->jml_negri;
        }

        if (isset($request->sdn_luar)) {
            $penelitian->sdn_luar = $request->sdn_luar;
            $penelitian->jml_luar = $request->jml_luar;
        }

        if (isset($request->mitra_id)) {
            $penelitian->mitra_id = $request->mitra_id;
        }

        $penelitian->save();

        return response()->json([
            'success' => true,
            'penelitian' => $penelitian ,
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
