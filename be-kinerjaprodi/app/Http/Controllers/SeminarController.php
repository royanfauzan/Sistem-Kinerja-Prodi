<?php

namespace App\Http\Controllers;

use App\Models\relasi_seminarmhs;
use App\Models\Seminar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeminarController extends Controller
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
            'all_seminar' => Seminar::with(['anggotaMahasiswas'])->get(),
        ]);
    }

    public function tampilrelasi($id)
    {
        return response()->json([
            'success' => true,
            'all_relasi' => relasi_seminarmhs::with('seminar','mahasiswa')->where('seminar_id',$id)->get(),
        ]);
        
    }

    public function deletemahasiswa($id)
    {
        $seminar = relasi_seminarmhs::find($id);
        $seminar->delete();

        if (!$seminar) {
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
        $luaran = Seminar::where('id', $id)->first();
        $dataluaran = $request->only('mahasiswa_id', 'seminar_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'mahasiswa_id' => 'required',
            'seminar_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $relasimahasiswa = relasi_seminarmhs::create(
            [
                'mahasiswa_id' => $request->mahasiswa_id,
                'seminar_id' => $request->seminar_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'mahasiswa_id' => $request->mahasiswa_id,
            'seminar_id' => $request->seminar_id,
            'keanggotaan' => $request->keanggotaan,
            'all_seminar' => Seminar::all()
        ]);
    }

    public function searchseminar($search)
    {
        return response()->json([
            'success' => true,
            'searchseminar' => Seminar::with('mahasiswa')
                ->whereRelation('mahasiswa', 'nama','LIKE', "%{$search}%")
                ->orwhere('judul_kegiatan', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('penyelenggara', 'LIKE', "%{$search}%")
                ->orwhere('kategori_seminar', 'LIKE', "%{$search}%")
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
        $dataseminar = $request->only('tahun', 'judul_kegiatan', 'penyelenggara', 'kategori_seminar', 'mahasiswa_id');

        //valid credential
        $validator = Validator::make($dataseminar, [
            'tahun' => 'required',
            'judul_kegiatan' => 'required',
            'penyelenggara' => 'required',
            'kategori_seminar' => 'required',
            'mahasiswa_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $dataseminar = Seminar::create(
            [
                'tahun' => $request->tahun,
                'judul_kegiatan' => $request->judul_kegiatan,
                'penyelenggara' => $request->penyelenggara,
                'kategori_seminar' => $request->kategori_seminar,
                'mahasiswa_id' => $request->mahasiswa_id
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'judul_kegiatan' => $request->judul_kegiatan,
            'penyelenggara' => $request->penyelenggara,
            'kategori_seminar' => $request->kategori_seminar,
            'mahasiswa_id' => $request->mahasiswa_id,
            'all_seminar' => Seminar::all()
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
            'all_seminar' => Seminar::find($id),
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
        $seminar = Seminar::where('id', $id)->first();
        $dataseminar = $request->only('tahun', 'judul_kegiatan', 'penyelenggara', 'kategori_seminar', 'mahasiswa_id');

        //valid credential
        $validator = Validator::make($dataseminar, [
            'tahun' => 'required',
            'judul_kegiatan' => 'required',
            'penyelenggara' => 'required',
            'kategori_seminar' => 'required',
            'mahasiswa_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $seminar->tahun = $request->tahun;
        $seminar->judul_kegiatan = $request->judul_kegiatan;
        $seminar->penyelenggara = $request->penyelenggara;
        $seminar->kategori_seminar = $request->kategori_seminar;
        $seminar->mahasiswa_id = $request->mahasiswa_id;
        $seminar->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'judul_kegiatan' => $request->judul_kegiatan,
            'penyelenggara' => $request->penyelenggara,
            'kategori_seminar' => $request->kategori_seminar,
            'mahasiswa_id' => $request->mahasiswa_id,
            'all_seminar' => Seminar::all()
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
        $seminar = Seminar::find($id);
        $seminar->delete();

        if (!$seminar) {
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
