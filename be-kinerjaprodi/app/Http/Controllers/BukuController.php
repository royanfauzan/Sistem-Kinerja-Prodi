<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\relasi_bukumhs;
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
        return response()->json([
            'success' => true,
            'all_buku' => Buku::with(['anggotaMahasiswas'])->get(),
        ]);
    }

    public function tampilrelasi($id)
    {
        return response()->json([
            'success' => true,
            'all_relasi' => relasi_bukumhs::with('mahasiswa')->where('buku_id',$id)->get(),
        ]);
        
    }

    public function searchbuku($search)
    {
        return response()->json([
            'success' => true,
            'searchbuku' => Buku::with('anggotaMahasiswas')
                ->whereRelation('anggotaMahasiswas', 'nama','LIKE', "%{$search}%")
                ->orwhere('judul', 'LIKE', "%{$search}%")
                ->orwhere('kategori_jurnal', 'LIKE', "%{$search}%")
                ->orwhere('nm_jurnal', 'LIKE', "%{$search}%")
                ->orwhere('keterangan', 'LIKE', "%{$search}%")
                ->orwhere('volume', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('nomor', 'LIKE', "%{$search}%")
                ->orwhere('halaman', 'LIKE', "%{$search}%")
                ->orwhere('sitasi', 'LIKE', "%{$search}%")
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
            return response()->json(['error' => $validator->errors()], 400);
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
            'all_buku' => Buku::all()
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
            'all_buku' => Buku::find($id),
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
            'all_buku' => Buku::all()
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
        $buku = Buku::find($id);
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
        $buku = Buku::where('id', $id)->first();
        $databuku = $request->only('mahasiswa_id', 'buku_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($databuku, [
            'mahasiswa_id' => 'required',
            'buku_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $relasimahasiswa = relasi_bukumhs::create(
            [
                'mahasiswa_id' => $request->mahasiswa_id,
                'buku_id' => $request->buku_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'mahasiswa_id' => $request->mahasiswa_id,
            'buku_id' => $request->buku_id,
            'keanggotaan' => $request->keanggotaan,
            'all_buku' => Buku::all()
        ]);
    }

    public function deletemahasiswa($id)
    {
        $luaran = relasi_bukumhs::find($id);
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
