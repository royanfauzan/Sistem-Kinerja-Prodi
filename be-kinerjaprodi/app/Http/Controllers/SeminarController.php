<?php

namespace App\Http\Controllers;

use App\Models\Seminar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeminarController extends Controller
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
        $dataseminar = $request->only('tahun', 'judul_kegiatan', 'penyelenggara', 'kategori_seminar', 'seminar_id');

        //valid credential
        $validator = Validator::make($dataseminar, [
            'tahun' => 'required',
            'judul_kegiatan' => 'required',
            'penyelenggara' => 'required',
            'kategori_seminar' => 'required',
            'seminar_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $dataseminar = Seminar::create(
            [
                'tahun' => $request->tahun,
                'judul_kegiatan' => $request->judul_kegiatan,
                'penyelenggara' => $request->penyelenggara,
                'kategori_seminar' => $request->kategori_seminar,
                'seminar_id' => $request->seminar_id
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'judul_kegiatan' => $request->judul_kegiatan,
            'penyelenggara' => $request->penyelenggara,
            'kategori_seminar' => $request->kategori_seminar,
            'seminar_id' => $request->seminar_id,
            'all_prodi' => Seminar::all()
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
        $seminar = Seminar::where('id', $id)->first();
        $dataseminar = $request->only('tahun', 'judul_kegiatan', 'penyelenggara', 'kategori_seminar', 'seminar_id');

        //valid credential
        $validator = Validator::make($dataseminar, [
            'tahun' => 'required',
            'judul_kegiatan' => 'required',
            'penyelenggara' => 'required',
            'kategori_seminar' => 'required',
            'seminar_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $seminar->tahun = $request->tahun;
        $seminar->judul_kegiatan = $request->judul_kegiatan;
        $seminar->penyelenggara = $request->penyelenggara;
        $seminar->kategori_seminar = $request->kategori_seminar;
        $seminar->seminar_id = $request->seminar_id;
        $seminar->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'judul_kegiatan' => $request->judul_kegiatan,
            'penyelenggara' => $request->penyelenggara,
            'kategori_seminar' => $request->kategori_seminar,
            'seminar_id' => $request->seminar_id,
            'all_prodi' => Seminar::all()
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
