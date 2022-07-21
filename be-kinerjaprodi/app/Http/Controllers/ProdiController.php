<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prodi;
use Illuminate\Support\Facades\Validator;

class ProdiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function tampilprodi()
    {
        
        return response()->json([
            'success' => true,
            'Prodi' => Prodi::all(),
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
    public function store(Request $request) //untuk input data dari form ke database
    {
        //data prodi menampung data dari request yang di dapat dari form yang berisi data dari field prodi & nama prodi
        $dataprodi = $request->only('prodi', 'nama_prodi');

        //valid credential
        $validator = Validator::make($dataprodi, [
            'prodi' => 'required',
            'nama_prodi' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $dataprodi = Prodi::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'prodi' => $request->prodi,
                'nama_prodi' => $request->nama_prodi,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true, 
            'prodi' => $request->prodi,
            'nama_prodi' => $request->nama_prodi,
            'all_prodi' => Prodi::all()
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
        $prodi = Prodi::where('id', $id)->first();
        $dataprodi = $request->only('prodi', 'nama_prodi');

        // valid credential
        $validator = Validator::make($dataprodi, [
            'prodi' => 'required',
            'nama_prodi' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $prodi->prodi = $request->prodi;
        $prodi->nama_prodi = $request->nama_prodi;
        $prodi->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'prodi' => $request->prodi,
            'nama_prodi' => $request->nama_prodi,
            'all_prodi' => Prodi::all()
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
