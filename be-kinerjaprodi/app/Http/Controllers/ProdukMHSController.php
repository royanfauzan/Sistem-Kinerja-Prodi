<?php

namespace App\Http\Controllers;

use App\Models\Produk_mhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProdukMHSController extends Controller
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
            'all_produk' => Produk_MHS::all()
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
        $dataprodukmhs = $request->only('nama_produk', 'deskripsi', 'tahun', 'deskripsi_bukti', 'file_bukti');

        //valid credential
        $validator = Validator::make($dataprodukmhs, [
            'nama_produk' => 'required',
            'deskripsi' => 'required',
            'tahun' => 'required',
            'deskripsi_bukti' => 'required',
            'file_bukti' => "required|mimetypes:application/pdf|max:10000",
        ]);
 
        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/produkmhs/";
 
            $dokumen = $request->file('file_bukti');
 
            $namaFiledokumen = $dokumen->getClientOriginalName();
 
            $dokumen->move($folderdokumen, $namaFiledokumen);
 
            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen".$th,
            ], 400);
        }
 
        $dataprodukmhs = Produk_MHS::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'nama_produk' => $request->nama_produk,
                'deskripsi' => $request->deskripsi,
                'tahun' => $request->tahun,
                'deskripsi_bukti' => $request->deskripsi_bukti,
                'file_bukti' => $finalPathdokumen, 
            ]
        );
 
        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true, 
            'nama_produk' => $request->nama_produk,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'deskripsi_bukti' => $request->deskripsi_bukti,
            'file_bukti' => $finalPathdokumen, 
            'all_produk' => Produk_MHS::all()
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
        return response()->json([
            'success' => true,
            'all_produk' => Produk_MHS::find($id),
            'id' => $id
        ]);
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
        $produkmhs = Produk_MHS::where('id', $id)->first();
        $dataprodukmhs = $request->only('nama_produk', 'deskripsi', 'tahun', 'deskripsi_bukti', 'file_bukti');

        // valid credential
        $validator = Validator::make($dataprodukmhs, [
            'nama_produk' => 'required',
            'deskripsi' => 'required',
            'tahun' => 'required',
            'deskripsi_bukti' => 'required',
            'file_bukti' => "required|mimetypes:application/pdf|max:10000",
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/produkmhs/";
 
            $dokumen = $request->file('file_bukti');
 
            $namaFiledokumen = $dokumen->getClientOriginalName();
 
            $dokumen->move($folderdokumen, $namaFiledokumen);
 
            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen".$th,
            ], 400);
        }

        $produkmhs->nama_produk = $request->nama_produk;
        $produkmhs->deskripsi = $request->deskripsi;
        $produkmhs->tahun = $request->tahun;
        $produkmhs->deskripsi_bukti = $request->deskripsi_bukti;
        $produkmhs->file_bukti = $finalPathdokumen;
        $produkmhs->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nama_produk' => $request->nama_produk,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'deskripsi_bukti' => $request->deskripsi_bukti,
            'file_bukti' => $finalPathdokumen,
            'all_produk' => Produk_MHS::all()
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
