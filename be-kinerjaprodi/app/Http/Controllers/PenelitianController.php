<?php

namespace App\Http\Controllers;

use App\Models\Penelitian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PenelitianController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([ //ngirim ke front end
            'success' => true, 
            'all_penelitian' => Penelitian::all()
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
        $datapenelitian = $request->only('tema_sesuai_roadmap', 'judul', 'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

       //valid credential
       $validator = Validator::make($datapenelitian, [
        'tema_sesuai_roadmap' => 'required',
        'judul' => 'required', 
        'tahun' => 'required', 
        'sumber_dana_PT_mandiri' => 'required', 
        'dana_PT_Mandiri' => 'required', 
        'sumber_dalam_negri' => 'required', 
        'dana_dalam_negri' => 'required', 
        'sumber_luar_negri' => 'required', 
        'dana_luar_negri' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $datapenelitian = Penelitian::create( //ngirim ke database
           [
               //yg kiri dari form, kanan dari database
               'tema_sesuai_roadmap'=> $request->tema_sesuai_roadmap,
               'nama_matkul' => $request->nama_matkul,
               'judul' => $request->judul, 
               'tahun' => $request->tahun, 
               'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri, 
               'dana_PT_Mandiri' => $request->dana_PT_Mandiri, 
               'sumber_dalam_negri' => $request->sumber_dalam_negri, 
               'dana_dalam_negri' => $request->dana_dalam_negri, 
               'sumber_luar_negri' => $request->sumber_luar_negri, 
               'dana_luar_negri' => $request->dana_luar_negri,
           ]
       );

       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'tema_sesuai_roadmap'=> $request->tema_sesuai_roadmap,
           'nama_matkul' => $request->nama_matkul,
           'judul' => $request->judul, 
           'tahun' => $request->tahun, 
           'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri, 
           'dana_PT_Mandiri' => $request->dana_PT_Mandiri, 
           'sumber_dalam_negri' => $request->sumber_dalam_negri, 
           'dana_dalam_negri' => $request->dana_dalam_negri, 
           'sumber_luar_negri' => $request->sumber_luar_negri, 
           'dana_luar_negri' => $request->dana_luar_negri,
           'all_penelitian' => Penelitian::all()
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
        $penelitian = Penelitian::where('id', $id)->first();
        $datapenelitian = $request->only('tema_sesuai_roadmap', 'judul',  'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

        // valid credential
        $validator = Validator::make($datapenelitian, [
            'tema_sesuai_roadmap' => 'required',
            'judul' => 'required', 
            'tahun' => 'required', 
            'sumber_dana_PT_mandiri' => 'required', 
            'dana_PT_Mandiri' => 'required', 
            'sumber_dalam_negri' => 'required', 
            'dana_dalam_negri' => 'required', 
            'sumber_luar_negri' => 'required', 
            'dana_luar_negri' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $penelitian-> tema_sesuai_roadmap = $request->tema_sesuai_roadmap;
        $penelitian->judul = $request->judul; 
        $penelitian-> tahun = $request->tahun; 
        $penelitian-> sumber_dana_PT_mandiri = $request->sumber_dana_PT_mandiri;
        $penelitian-> dana_PT_Mandiri = $request->dana_PT_Mandiri;
        $penelitian-> sumber_dalam_negri = $request->sumber_dalam_negri;
        $penelitian-> dana_dalam_negri = $request->dana_dalam_negri; 
        $penelitian-> sumber_luar_negri = $request->sumber_luar_negri; 
        $penelitian-> dana_luar_negri = $request->dana_luar_negri;
        $penelitian->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tema_sesuai_roadmap'=> $request->tema_sesuai_roadmap,
           'judul' => $request->judul, 
           'tahun' => $request->tahun, 
           'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri, 
           'dana_PT_Mandiri' => $request->dana_PT_Mandiri, 
           'sumber_dalam_negri' => $request->sumber_dalam_negri, 
           'dana_dalam_negri' => $request->dana_dalam_negri, 
           'sumber_luar_negri' => $request->sumber_luar_negri, 
           'dana_luar_negri' => $request->dana_luar_negri,
            'all_penelitian' => Penelitian::all()
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
