<?php

namespace App\Http\Controllers;

use App\Models\Matkul;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MatkulController extends Controller
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
            'all_matkul' => Matkul::all()
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
        $datamatkul = $request->only('nama_matkul', 'sks', 'prodi_id');

       //valid credential
       $validator = Validator::make($datamatkul, [
           'nama_matkul' => 'required',
           'sks' => 'required',
           'prodi_id' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $datamatkul = Matkul::create( //ngirim ke database
           [
               //yg kiri dari form, kanan dari database
               'nama_matkul' => $request->nama_matkul,
               'sks' => $request->sks,
               'prodi_id' => $request->prodi_id,
           ]
       );

       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'nama_matkul' => $request->nama_matkul,
           'sks' => $request->sks,
           'prodi_id' => $request->prodi_id,
           'all_matkul' => Matkul::all()
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
        $matkul = Matkul::where('id', $id)->first();
        $datamatkul = $request->only('nama_matkul', 'sks', 'prodi_id');

       //valid credential
       $validator = Validator::make($datamatkul, [
           'nama_matkul' => 'required',
           'sks' => 'required',
           'prodi_id' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $matkul->nama_matkul = $request->nama_matkul;
        $matkul->sks = $request->sks;
        $matkul->prodi_id = $request->prodi_id;
        $matkul->save();

       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'nama_matkul' => $request->nama_matkul,
           'sks' => $request->sks,
           'prodi_id' => $request->prodi_id,
           'all_mhs' => Matkul::all()
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
