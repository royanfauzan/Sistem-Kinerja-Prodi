<?php

namespace App\Http\Controllers;

use App\Models\Tulisan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TulisanController extends Controller
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
        $datatulisan = $request->only('judul', 'tahun', 'nm_media', 'ruang_lingkup', 'file_bukti', 'dosen_id');

        //valid credential
        $validator = Validator::make($datatulisan, [
            'judul' => 'required',
            'tahun' => 'required',
            'nm_media' => 'required',
            'ruang_lingkup' => 'required',
            'file_bukti' => 'required',
            'dosen_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datatulisan = Tulisan::create(
            [
                'judul' => $request->judul,
                'tahun' => $request->tahun,
                'nm_media' => $request->nm_media,
                'ruang_lingkup' => $request->ruang_lingkup,
                'file_bukti' => $request->file_bukti,
                'dosen_id' => $request->dosen_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'nm_media' => $request->nm_media,
            'ruang_lingkup' => $request->ruang_lingkup,
            'file_bukti' => $request->file_bukti,
            'dosen_id' => $request->dosen_id,
            'all_prodi' => Tulisan::all()
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
        $tulisan = Tulisan::where('id', $id)->first();
        $datatulisan = $request->only('judul', 'tahun', 'nm_media', 'ruang_lingkup', 'file_bukti', 'dosen_id');

        //valid credential
        $validator = Validator::make($datatulisan, [
            'judul' => 'required',
            'tahun' => 'required',
            'nm_media' => 'required',
            'ruang_lingkup' => 'required',
            'file_bukti' => 'required',
            'dosen_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $tulisan->judul = $request->judul;
        $tulisan->tahun = $request->tahun;
        $tulisan->nm_media = $request->nm_media;
        $tulisan->ruang_lingkup = $request->ruang_lingkup;
        $tulisan->file_bukti = $request->file_bukti;
        $tulisan->dosen_id = $request->dosen_id;
        $tulisan->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'nm_media' => $request->nm_media,
            'ruang_lingkup' => $request->ruang_lingkup,
            'file_bukti' => $request->file_bukti,
            'dosen_id' => $request->dosen_id,
            'all_prodi' => Tulisan::all()
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
