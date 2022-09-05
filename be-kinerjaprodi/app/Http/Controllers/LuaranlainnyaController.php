<?php

namespace App\Http\Controllers;

use App\Models\Luaranlainnya;
use App\Models\relasi_luaran_mhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LuaranlainnyaController extends Controller
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
            'all_luaran' => Luaranlainnya::with(['anggotaMahasiswas'])->get(),
        ]);
    }

    public function tampilrelasi($id)
    {
        return response()->json([
            'success' => true,
            'all_relasi' => relasi_luaran_mhs::with('mahasiswa','luaran')->where('luaranlainnya_id',$id)->get(),
        ]);
        
    }

    public function searchluaran($search)
    {
        return response()->json([
            'success' => true,
            'searchluaran' => Luaranlainnya::with('anggotaMahasiswas')
                ->whereRelation('anggotaMahasiswas', 'nama','LIKE', "%{$search}%")
                ->orwhere('judul', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('keterangan', 'LIKE', "%{$search}%")
                ->orwhere('jenis_luaran', 'LIKE', "%{$search}%")
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
        $dataluaran = $request->only('judul', 'keterangan', 'tahun', 'jenis_luaran');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'judul' => 'required',
            'keterangan' => 'required',
            'tahun' => 'required',
            'jenis_luaran' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dataluaran = Luaranlainnya::create(
            [
                'judul' => $request->judul,
                'keterangan' => $request->keterangan,
                'tahun' => $request->tahun,
                'jenis_luaran' => $request->jenis_luaran,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'keterangan' => $request->keterangan,
            'tahun' => $request->tahun,
            'jenis_luaran' => $request->jenis_luaran,
            'all_luaran' => Luaranlainnya::all()
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
            'all_luaran' => Luaranlainnya::with(['anggotaMahasiswas'])->where('id', $id)->first(),
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
        $luaran = Luaranlainnya::where('id', $id)->first();
        $dataluaran = $request->only('judul', 'keterangan', 'tahun', 'jenis_luaran');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'judul' => 'required',
            'keterangan' => 'required',
            'tahun' => 'required',
            'jenis_luaran' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $luaran->judul = $request->judul;
        $luaran->keterangan = $request->keterangan;
        $luaran->tahun = $request->tahun;
        $luaran->jenis_luaran = $request->jenis_luaran;
        $luaran->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'keterangan' => $request->keterangan,
            'tahun' => $request->tahun,
            'jenis_luaran' => $request->jenis_luaran,
            'all_luaran' => Luaranlainnya::all()
        ]);
    }

    public function pilihmahasiswa(Request $request, $id)
    {
        $luaran = Luaranlainnya::where('id', $id)->first();
        $dataluaran = $request->only('mahasiswa_id', 'luaranlainnya_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'mahasiswa_id' => 'required',
            'luaranlainnya_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $relasimahasiswa = relasi_luaran_mhs::create(
            [
                'mahasiswa_id' => $request->mahasiswa_id,
                'luaranlainnya_id' => $request->luaranlainnya_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'mahasiswa_id' => $request->mahasiswa_id,
            'luaranlainnya_id' => $request->luaranlainnya_id,
            'keanggotaan' => $request->keanggotaan,
            'all_luaran' => Luaranlainnya::all()
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
        $luaran = Luaranlainnya::find($id);
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

    public function deletemahasiswa($id)
    {
        $luaran = relasi_luaran_mhs::find($id);
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

    public function listjenis(Request $request)
    {
        //
        $allluaran = Luaranlainnya::all()->groupBy('jenis_luaran');
        $arrjenis = array();
        foreach ($allluaran as $key => $luaranjns) {
            $arrjenis[] = $luaranjns[0]->jenis_luaran;
        }
        return response()->json([
            'success' => true,
            'jenisluarans' => $arrjenis,
        ]);
    }
}
