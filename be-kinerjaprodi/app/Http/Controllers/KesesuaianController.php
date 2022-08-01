<?php

namespace App\Http\Controllers;

use App\Models\Kasesuaian;
use App\Models\KP_lulus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KesesuaianController extends Controller
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
            'all_kesesuaian' => Kasesuaian::with('kepuasan')->get(),
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
        $datakesesuaian = $request->only('rendah', 'sedang', 'tinggi', 'kepuasan_id');

        //valid credential
        $validator = Validator::make($datakesesuaian, [
            'rendah' => 'required',
            'sedang' => 'required',
            'tinggi' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datakesesuaian = Kasesuaian::create(
            [
                'rendah' => $request->rendah,
                'sedang' => $request->sedang,
                'tinggi' => $request->tinggi,
                'kepuasan_id' => $request->kepuasan_id
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'rendah' => $request->rendah,
            'sedang' => $request->sedang,
            'tinggi' => $request->tinggi,
            'kepuasan_id' => $request->kepuasan_id,
            'all_kesesuaian' => Kasesuaian::all()
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
        return response()->json([
            'success' => true,
            'all_kesesuaian' => KP_lulus::find($id),
            'id' => $id
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
        $kesesuaian = Kasesuaian::where('id', $id)->first();
        $datakesesuaian = $request->only('rendah', 'sedang', 'tinggi', 'kepuasan_id');

        //valid credential
        $validator = Validator::make($datakesesuaian, [
            'rendah' => 'required',
            'sedang' => 'required',
            'tinggi' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $kesesuaian->rendah = $request->rendah;
        $kesesuaian->sedang = $request->sedang;
        $kesesuaian->tinggi = $request->tinggi;
        $kesesuaian->kepuasan_id = $request->kepuasan_id;
        $kesesuaian->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'rendah' => $request->rendah,
            'sedang' => $request->sedang,
            'tinggi' => $request->tinggi,
            'kepuasan_id' => $request->kepuasan_id,
            'all_kesesuaian' => Kasesuaian::all()
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
        $kesesuaian = KP_lulus::find($id);
        $kesesuaian->delete();

        if (!$kesesuaian) {
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
