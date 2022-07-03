<?php

namespace App\Http\Controllers;

use App\Models\Luaranlainnya;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LuaranlainnyaController extends Controller
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
        $dataluaran = $request->only('judul', 'keterangan', 'tahun', 'jenis_luaran');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'judul' => 'required',
            'keterangan' => 'required',
            'tahun' => 'required',
            'jenis_luaran' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $dataluaran = Luaranlainnya::create(
            [
                'judul' => $request->judul,
                'keterangan' => $request->keterangan,
                'tahun' => $request->tahun,
                'jenis_luaran' => $request->jenis_luaran,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'keterangan' => $request->keterangan,
            'tahun' => $request->tahun,
            'jenis_luaran' => $request->jenis_luaran,
            'all_prodi' => Luaranlainnya::all()
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
        $luaran = Luaranlainnya::where('id', $id)->first();
        $dataluaran = $request->only('judul', 'keterangan', 'tahun', 'jenis_luaran');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'judul' => 'required',
            'keterangan' => 'required',
            'tahun' => 'required',
            'jenis_luaran' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $luaran->judul = $request->judul;
        $luaran->keterangan = $request->keterangan;
        $luaran->tahun = $request->tahun;
        $luaran->jenis_luaran = $request->jenis_luaran;
        $luaran->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'keterangan' => $request->keterangan,
            'tahun' => $request->tahun,
            'jenis_luaran' => $request->jenis_luaran,
            'all_prodi' => Luaranlainnya::all()
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
