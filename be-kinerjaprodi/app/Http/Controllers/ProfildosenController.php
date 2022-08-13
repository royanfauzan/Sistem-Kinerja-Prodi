<?php

namespace App\Http\Controllers;

use App\Models\profilDosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfildosenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json([
            'success' => true,
            'profilDosens' => profilDosen::all(),
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
        //
        $data = $request->only('NIDK', 'NamaDosen', 'NIK', 'TempatLahir', 'TanggalLahir', 'JenisKelamin', 'StatusPerkawinan', 'Agama');
        $validator = Validator::make($data, [
            'NIDK'=>'required|string',
            'NamaDosen'=>'required|string',
            'NIK'=>"required|string",
            'TempatLahir'=>'required|string',
            'TanggalLahir'=>'required|string',
            'JenisKelamin'=>'required|string',
            'StatusPerkawinan'=>'required|string',
            'Agama'=>'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        if (profilDosen::where('NIDK',$request->NIDK)->first()) {
            return response()->json([
                'success' => false,
                'message' => "Profil Sudah Tersimpan",
            ], 400);
        }

        //Request is valid, create new profil
        $profil = profilDosen::create([
            'NIDK'=>$request->NIDK,
            'NamaDosen'=>$request->NamaDosen,
            'NIK'=>$request->NIK,
            'TempatLahir'=>$request->TempatLahir,
            'TanggalLahir'=>$request->TanggalLahir,
            'JenisKelamin'=>$request->JenisKelamin,
            'StatusPerkawinan'=>$request->StatusPerkawinan,
            'Agama'=>$request->Agama,
        ]);

        $profil->Golongan = isset($request->Golongan)?$request->Golongan:'';
        $profil->Pangkat = isset($request->Pangkat)?$request->Pangkat:'';
        $profil->JabatanAkademik = isset($request->JabatanAkademik)?$request->JabatanAkademik:'';
        $profil->Alamat = isset($request->Alamat)?$request->Alamat:'';
        $profil->NoTelepon = isset($request->NoTelepon)?$request->NoTelepon:'';
        $profil->Email = isset($request->Email)?$request->Email:'';

        $profil->save();


        return response()->json([
            'success' => true,
            'profil' => $profil,
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
        //
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
