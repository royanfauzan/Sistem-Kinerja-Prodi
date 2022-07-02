<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProdukController extends Controller
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
        $dataproduk = $request->only('nm_produk', 'deskripsi', 'tahun', 'deskripsi_bukti', 'file_bukti');

        //valid credential
        $validator = Validator::make($dataproduk, [
            'nm_produk' => 'required',
            'deskripsi' => 'required',
            'tahun' => 'required',
            'deskripsi_bukti' => 'required',
            'file_bukti' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $dataproduk = Produk::create(
            [
                'nm_produk' => $request->nm_produk,
                'deskripsi' => $request->deskripsi,
                'tahun' => $request->tahun,
                'deskripsi_bukti' => $request->deskripsi_bukti,
                'file_bukti' => $request->file_bukti,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_produk' => $request->nm_produk,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'deskripsi_bukti' => $request->deskripsi_bukti,
            'file_bukti' => $request->file_bukti,
            'all_tabel' => Produk::all()
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
        $produk = Produk::where('id', $id)->first();
        $dataproduk = $request->only('nm_produk', 'deskripsi', 'tahun', 'deskripsi_bukti', 'file_bukti');

        //valid credential
        $validator = Validator::make($dataproduk, [
            'nm_produk' => 'required',
            'deskripsi' => 'required',
            'tahun' => 'required',
            'deskripsi_bukti' => 'required',
            'file_bukti' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $produk->nm_produk = $request->nm_produk;
        $produk->deskripsi = $request->deskripsi;
        $produk->tahun = $request->tahun;
        $produk->deskripsi_bukti = $request->deskripsi_bukti;
        $produk->file_bukti = $request->file_bukti;
        $produk->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_produk' => $request->nm_produk,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'deskripsi_bukti' => $request->deskripsi_bukti,
            'file_bukti' => $request->file_bukti,
            'all_tabel' => Produk::all()
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
