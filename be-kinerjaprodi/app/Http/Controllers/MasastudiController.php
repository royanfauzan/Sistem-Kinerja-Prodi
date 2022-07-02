<?php

namespace App\Http\Controllers;

use App\Models\Masastudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MasastudiController extends Controller
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
        $datamasastudi = $request->only('tahun_masuk', 'jmlh_mhs', 'lulus_thn_1', 'lulus_thn_2', 'lulus_thn_3', 'lulus_thn_4', 'prodi_id');

        //valid credential
        $validator = Validator::make($datamasastudi, [
            'tahun_masuk' => 'required',
            'jmlh_mhs' => 'required',
            'lulus_thn_1' => 'required',
            'lulus_thn_2' => 'required',
            'lulus_thn_3' => 'required',
            'lulus_thn_4' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datamasastudi = Masastudi::create(
            [
                'tahun_masuk' => $request->tahun_masuk,
                'jmlh_mhs' => $request->jmlh_mhs,
                'lulus_thn_1' => $request->lulus_thn_1,
                'lulus_thn_2' => $request->lulus_thn_2,
                'lulus_thn_3' => $request->lulus_thn_3,
                'lulus_thn_4' => $request->lulus_thn_4,
                'prodi_id' => $request->prodi_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun_masuk' => $request->tahun_masuk,
            'jmlh_mhs' => $request->jmlh_mhs,
            'lulus_thn_1' => $request->lulus_thn_1,
            'lulus_thn_2' => $request->lulus_thn_2,
            'lulus_thn_3' => $request->lulus_thn_3,
            'lulus_thn_4' => $request->lulus_thn_4,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => Masastudi::all()
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
        $masastudi = Masastudi::where('id', $id)->first();
        $datamasastudi = $request->only('tahun_masuk', 'jmlh_mhs', 'lulus_thn_1', 'lulus_thn_2', 'lulus_thn_3', 'lulus_thn_4', 'prodi_id');

        //valid credential
        $validator = Validator::make($datamasastudi, [
            'tahun_masuk' => 'required',
            'jmlh_mhs' => 'required',
            'lulus_thn_1' => 'required',
            'lulus_thn_2' => 'required',
            'lulus_thn_3' => 'required',
            'lulus_thn_4' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $masastudi->tahun_masuk = $request->tahun_masuk;
        $masastudi->jmlh_mhs = $request->jmlh_mhs;
        $masastudi->lulus_thn_1 = $request->lulus_thn_1;
        $masastudi->lulus_thn_2 = $request->lulus_thn_2;
        $masastudi->lulus_thn_3 = $request->lulus_thn_3;
        $masastudi->lulus_thn_4 = $request->lulus_thn_4;
        $masastudi->prodi_id = $request->prodi_id;
        $masastudi->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun_masuk' => $request->tahun_masuk,
            'jmlh_mhs' => $request->jmlh_mhs,
            'lulus_thn_1' => $request->lulus_thn_1,
            'lulus_thn_2' => $request->lulus_thn_2,
            'lulus_thn_3' => $request->lulus_thn_3,
            'lulus_thn_4' => $request->lulus_thn_4,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => Masastudi::all()
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
    }
}
