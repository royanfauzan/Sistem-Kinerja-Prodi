<?php

namespace App\Http\Controllers;

use App\Models\Prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrestasiController extends Controller
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
        $dataprestasi = $request->only('nm_kegiatan', 'tahun', 'tingkat', 'prestasi_dicapai', 'kategori', 'prodi_id');

        //valid credential
        $validator = Validator::make($dataprestasi, [
            'nm_kegiatan' => 'required',
            'tahun' => 'required',
            'tingkat' => 'required',
            'prestasi_dicapai' => 'required',
            'kategori' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datatempat = Prestasi::create(
            [
                'nm_kegiatan' => $request->nm_kegiatan,
                'tahun' => $request->tahun,
                'tingkat' => $request->tingkat,
                'prestasi_dicapai' => $request->prestasi_dicapai,
                'kategori' => $request->kategori,
                'prodi_id' => $request->prodi_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_kegiatan' => $request->nm_kegiatan,
            'tahun' => $request->tahun,
            'tingkat' => $request->tingkat,
            'prestasi_dicapai' => $request->prestasi_dicapai,
            'kategori' => $request->kategori,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => Prestasi::all()
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
        $prestasi = Prestasi::where('id', $id)->first();
        $dataprestasi = $request->only('nm_kegiatan', 'tahun', 'tingkat', 'prestasi_dicapai', 'kategori', 'prodi_id');

        //valid credential
        $validator = Validator::make($dataprestasi, [
            'nm_kegiatan' => 'required',
            'tahun' => 'required',
            'tingkat' => 'required',
            'prestasi_dicapai' => 'required',
            'kategori' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $prestasi->tahun = $request->tahun;
        $prestasi->nm_kegiatan = $request->nm_kegiatan;
        $prestasi->tingkat = $request->tingkat;
        $prestasi->prestasi_dicapai = $request->prestasi_dicapai;
        $prestasi->kategori = $request->kategori;
        $prestasi->prodi_id = $request->prodi_id;
        $prestasi->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_kegiatan' => $request->nm_kegiatan,
            'tahun' => $request->tahun,
            'tingkat' => $request->tingkat,
            'prestasi_dicapai' => $request->prestasi_dicapai,
            'kategori' => $request->kategori,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => Prestasi::all()
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
