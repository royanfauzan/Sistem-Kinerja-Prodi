<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MahasiswaController extends Controller
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
            'all_mhs' => Mahasiswa::all()
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
       $datamhs = $request->only('nim', 'nama');

       //valid credential
       $validator = Validator::make($datamhs, [
           'nim' => 'required',
           'nama' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $dataprodi = Mahasiswa::create( //ngirim ke database
           [
               //yg kiri dari form, kanan dari database
               'nim' => $request->nim,
               'nama' => $request->nama,
           ]
       );

       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'nim' => $request->nim,
           'nama' => $request->nama,
           'all_mhs' => Mahasiswa::all()
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
        $mahasiswa = Mahasiswa::where('id', $id)->first();
        $datamhs = $request->only('nim', 'nama');

       //valid credential
       $validator = Validator::make($datamhs, [
           'nim' => 'required',
           'nama' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $mahasiswa->nim = $request->nim;
        $mahasiswa->nama = $request->nama;
        $mahasiswa->save();

       
       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'nim' => $request->nim,
           'nama' => $request->nama,
           'all_mhs' => Mahasiswa::all()
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
