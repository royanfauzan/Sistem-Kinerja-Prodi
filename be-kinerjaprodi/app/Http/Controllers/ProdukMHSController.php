<?php

namespace App\Http\Controllers;

use App\Models\Produk_mhs;
use App\Models\relasi_produkmhs;
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
        return response()->json([
            'success' => true,
            'all_produk' => Produk_mhs::with(['anggotaMahasiswas'])->get(),
        ]);
    }

    public function tampilrelasi($id)
    {
        return response()->json([
            'success' => true,
            'all_relasi' => relasi_produkmhs::with('mahasiswa')->where('produk_id', $id)->get(),
        ]);
    }

    public function searchprodukmhs($search)
    {
        return response()->json([
            'success' => true,
            'searchprodukmhs' =>  Produk_MHS::with('anggotaMahasiswas')
                ->whereRelation('anggotaMahasiswas', 'nama', 'LIKE', "%{$search}%")
                ->orwhere('nama_produk', 'LIKE', "%{$search}%")
                ->orwhere('deskripsi', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('deskripsi_bukti', 'LIKE', "%{$search}%")
                ->orwhere('file_bukti', 'LIKE', "%{$search}%")
                ->get()

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
            return response()->json(['error' => $validator->errors()], 400);
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
                'message' => "Gagal Menyimpan Dokumen" . $th,
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
                'message' => "Gagal Menyimpan Dokumen" . $th,
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
        $produkmhs = Produk_MHS::find($id);
        $produkmhs->delete();

        if (!$produkmhs) {
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
                'produk_id' => $request->produk_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'mahasiswa_id' => $request->mahasiswa_id,
            'produk_id' => $request->produk_id,
            'keanggotaan' => $request->keanggotaan,
            'all_produk' => Produk_mhs::all()
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
