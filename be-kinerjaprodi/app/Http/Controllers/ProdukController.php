<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Produk_mhs;
use App\Models\relasi_produkmhs;
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
        return response()->json([
            'success' => true,
            'all_produk' => Produk::with(['anggotaMahasiswas'])->get(),
        ]);
    }

    public function tampilrelasi($id)
    {
        return response()->json([
            'success' => true,
            'all_relasi' => relasi_produkmhs::with('mahasiswa')->where('produk_id',$id)->get(),
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
        $dataproduk = $request->only('nm_produk', 'deskripsi', 'tahun', 'deskripsi_bukti', 'file_bukti');

        //valid credential
        $validator = Validator::make($dataproduk, [
            'nm_produk' => 'required',
            'deskripsi' => 'required',
            'tahun' => 'required',
            'deskripsi_bukti' => 'required',
            "file_bukti" => "required|mimetypes:application/pdf|max:10000",
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/detailproduk/";

            $dokumen = $request->file('file_bukti');

            $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".",$dokumen->getClientOriginalName(),2)[0])) . "-". time() . "." . $dokumen->getClientOriginalExtension();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen".$th,
            ], 400);
        }

        $dataproduk = Produk::create(
            [
                'nm_produk' => $request->nm_produk,
                'deskripsi' => $request->deskripsi,
                'tahun' => $request->tahun,
                'deskripsi_bukti' => $request->deskripsi_bukti,
                'file_bukti' => $finalPathdokumen,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_produk' => $request->nm_produk,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'deskripsi_bukti' => $request->deskripsi_bukti,
            'file_bukti' => $finalPathdokumen,
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
        return response()->json([
            'success' => true,
            'all_produk' => Produk_mhs::find($id),
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
        $buku = Produk_mhs::find($id);
        $buku->delete();

        if (!$buku) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus"
        ]);
    }

    public function pilihmahasiswa(Request $request, $id)
    {
        $buku = Produk_mhs::where('id', $id)->first();
        $databuku = $request->only('mahasiswa_id', 'produk_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($databuku, [
            'mahasiswa_id' => 'required',
            'produk_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $relasimahasiswa = relasi_produkmhs::create(
            [
                'mahasiswa_id' => $request->mahasiswa_id,
                'produk_id' => $request->buku_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'mahasiswa_id' => $request->mahasiswa_id,
            'produk_id' => $request->buku_id,
            'keanggotaan' => $request->keanggotaan,
            'all_buku' => Produk_mhs::all()
        ]);
    }

    public function deletemahasiswa($id)
    {
        $luaran = relasi_produkmhs::find($id);
        $luaran->delete();

        if (!$luaran) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus"
        ]);
    }
}
