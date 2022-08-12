<?php

namespace App\Http\Controllers;

use App\Models\Ewmp;
use App\Models\KP_lulus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KepuasanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'all_prodi' => KP_lulus::with('prodi')->get(),
        ]);
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
        $datakepuasan = $request->only('tahun', 'jmlh_lulusan', 'jmlh_terlacak', 'prodi_id');

        //valid credential
        $validator = Validator::make($datakepuasan, [
            'tahun' => 'required',
            'jmlh_lulusan' => 'required',
            'jmlh_terlacak' => 'required',
            'prodi_id' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datakepuasan = KP_lulus::create(
            [
                'tahun' => $request->tahun,
                'jmlh_lulusan' => $request->jmlh_lulusan,
                'jmlh_terlacak' => $request->jmlh_terlacak,
                'prodi_id' => $request->prodi_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'jmlh_lulusan' => $request->jmlh_lulusan,
            'jmlh_terlacak' => $request->jmlh_terlacak,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => KP_lulus::all()
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
        $kepuasan = KP_lulus::where('id', $id)->first();
        $datakepuasan = $request->only('tahun', 'jmlh_lulusan', 'jmlh_terlacak', 'prodi_id');

        //valid credential
        $validator = Validator::make($datakepuasan, [
            'tahun' => 'required',
            'jmlh_lulusan' => 'required',
            'jmlh_terlacak' => 'required',
            'prodi_id' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $kepuasan->tahun = $request->tahun;
        $kepuasan->jmlh_lulusan = $request->jmlh_lulusan;
        $kepuasan->jmlh_terlacak = $request->jmlh_terlacak;
        $kepuasan->prodi_id = $request->prodi_id;
        $kepuasan->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'jmlh_lulusan' => $request->jmlh_lulusan,
            'jmlh_terlacak' => $request->jmlh_terlacak,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => KP_lulus::all()
        ]);
    }


    public function listtahun(Request $request)
    {
        //
        $allewmps = Ewmp::all()->groupBy('tahun_akademik');
        $arrTahun = array();
        foreach ($allewmps as $key => $ewmp) {
            $arrTahun[] = $ewmp[0]->tahun_akademik;
        }
        return response()->json([
            'success' => true,
            'tahunewmps' => $arrTahun,
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



