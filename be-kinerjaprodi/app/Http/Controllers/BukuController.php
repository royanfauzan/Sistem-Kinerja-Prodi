<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BukuController extends Controller
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
        $databuku = $request->only('judul', 'kategori_jurnal', 'nm_jurnal', 'keterangan', 'volume', 'tahun', 'nomor', 'halaman', 'sitasi');

        //valid credential
        $validator = Validator::make($databuku, [
            'judul' => 'required',
            'kategori_jurnal' => 'required',
            'nm_jurnal' => 'required',
            'keterangan' => 'required',
            'volume' => 'required',
            'tahun' => 'required',
            'nomor' => 'required',
            'halaman' => 'required',
            'sitasi' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $databuku = Buku::create(
            [
                'judul' => $request->judul,
                'kategori_jurnal' => $request->kategori_jurnal,
                'nm_jurnal' => $request->nm_jurnal,
                'keterangan' => $request->keterangan,
                'volume' => $request->volume,
                'tahun' => $request->tahun,
                'nomor' => $request->nomor,
                'halaman' => $request->halaman,
                'sitasi' => $request->sitasi,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
                'kategori_jurnal' => $request->kategori_jurnal,
                'nm_jurnal' => $request->nm_jurnal,
                'keterangan' => $request->keterangan,
                'volume' => $request->volume,
                'tahun' => $request->tahun,
                'nomor' => $request->nomor,
                'halaman' => $request->halaman,
                'sitasi' => $request->sitasi,
            'all_tabel' => Buku::all()
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
        $buku = Buku::where('id', $id)->first();
        $databuku = $request->only('judul', 'kategori_jurnal', 'nm_jurnal', 'keterangan', 'volume', 'tahun', 'nomor', 'halaman', 'sitasi');

        //valid credential
        $validator = Validator::make($databuku, [
            'judul' => 'required',
            'kategori_jurnal' => 'required',
            'nm_jurnal' => 'required',
            'keterangan' => 'required',
            'volume' => 'required',
            'tahun' => 'required',
            'nomor' => 'required',
            'halaman' => 'required',
            'sitasi' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $buku->judul = $request->judul;
        $buku->kategori_jurnal = $request->kategori_jurnal;
        $buku->nm_jurnal = $request->nm_jurnal;
        $buku->keterangan = $request->keterangan;
        $buku->volume = $request->volume;
        $buku->tahun = $request->tahun;
        $buku->nomor = $request->nomor;
        $buku->halaman = $request->halaman;
        $buku->sitasi = $request->sitasi;
        $buku->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
                'kategori_jurnal' => $request->kategori_jurnal,
                'nm_jurnal' => $request->nm_jurnal,
                'keterangan' => $request->keterangan,
                'volume' => $request->volume,
                'tahun' => $request->tahun,
                'nomor' => $request->nomor,
                'halaman' => $request->halaman,
                'sitasi' => $request->sitasi,
            'all_tabel' => Buku::all()
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
