<?php

namespace App\Http\Controllers;

use App\Models\Pkm;
use App\Models\RelasiPkmDos;
use App\Models\RelasiPkmMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PKMController extends Controller
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
            'all_pkm' => Pkm::with(['anggotaDosens', 'anggotaMahasiswas'])->get(),
        ]);
    }

    public function searchpkm($search)
    {


        return response()->json([
            'success' => true,
            'searchpkm' =>  Pkm::with('anggotaDosens', 'anggotaMahasiswas')
                ->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
                ->orwhereRelation('anggotaMahasiswas', 'nama', 'LIKE', "%{$search}%")
                ->orwhere('tema_sesuai_roadmap', 'LIKE', "%{$search}%")
                ->orwhere('judul_kegiatan', 'LIKE', "%{$search}%")
                ->orwhere('lokasi', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('sumber_dana_PT_mandiri', 'LIKE', "%{$search}%")
                ->orwhere('dana_PT_Mandiri', 'LIKE', "%{$search}%")
                ->orwhere('sumber_dalam_negri', 'LIKE', "%{$search}%")
                ->orwhere('dana_dalam_negri', 'LIKE', "%{$search}%")
                ->orwhere('sumber_luar_negri', 'LIKE', "%{$search}%")
                ->orwhere('dana_luar_negri', 'LIKE', "%{$search}%")
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
        $datapkm = $request->only('tema_sesuai_roadmap', 'judul_kegiatan', 'lokasi', 'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

        //valid credential
        $validator = Validator::make($datapkm, [
            'tema_sesuai_roadmap' => 'required',
            'judul_kegiatan' => 'required',
            'lokasi' => 'required',
            'tahun' => 'required',
            'sumber_dana_PT_mandiri' => 'required',
            'dana_PT_Mandiri' => 'required',
            'sumber_dalam_negri' => 'required',
            'dana_dalam_negri' => 'required',
            'sumber_luar_negri' => 'required',
            'dana_luar_negri' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $datapkm = Pkm::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'tema_sesuai_roadmap' => $request->tema_sesuai_roadmap,
                'nama_matkul' => $request->nama_matkul,
                'judul_kegiatan' => $request->judul_kegiatan,
                'lokasi' => $request->lokasi,
                'tahun' => $request->tahun,
                'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri,
                'dana_PT_Mandiri' => $request->dana_PT_Mandiri,
                'sumber_dalam_negri' => $request->sumber_dalam_negri,
                'dana_dalam_negri' => $request->dana_dalam_negri,
                'sumber_luar_negri' => $request->sumber_luar_negri,
                'dana_luar_negri' => $request->dana_luar_negri,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true,
            'tema_sesuai_roadmap' => $request->tema_sesuai_roadmap,
            'nama_matkul' => $request->nama_matkul,
            'judul_kegiatan' => $request->judul_kegiatan,
            'lokasi' => $request->lokasi,
            'tahun' => $request->tahun,
            'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri,
            'dana_PT_Mandiri' => $request->dana_PT_Mandiri,
            'sumber_dalam_negri' => $request->sumber_dalam_negri,
            'dana_dalam_negri' => $request->dana_dalam_negri,
            'sumber_luar_negri' => $request->sumber_luar_negri,
            'dana_luar_negri' => $request->dana_luar_negri,
            'all_pkm' => Pkm::all()
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
            'all_pkm' => Pkm::with(['anggotaDosens', 'anggotaMahasiswas'])->where('id', $id)->first(),
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
        $pkm = PKM::where('id', $id)->first();
        $datapkm = $request->only('tema_sesuai_roadmap', 'judul_kegiatan', 'lokasi', 'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

        // valid credential
        $validator = Validator::make($datapkm, [
            'tema_sesuai_roadmap' => 'required',
            'judul_kegiatan' => 'required',
            'lokasi' => 'required',
            'tahun' => 'required',
            'sumber_dana_PT_mandiri' => 'required',
            'dana_PT_Mandiri' => 'required',
            'sumber_dalam_negri' => 'required',
            'dana_dalam_negri' => 'required',
            'sumber_luar_negri' => 'required',
            'dana_luar_negri' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $pkm->tema_sesuai_roadmap = $request->tema_sesuai_roadmap;
        $pkm->judul_kegiatan = $request->judul_kegiatan;
        $pkm->lokasi = $request->lokasi;
        $pkm->tahun = $request->tahun;
        $pkm->sumber_dana_PT_mandiri = $request->sumber_dana_PT_mandiri;
        $pkm->dana_PT_Mandiri = $request->dana_PT_Mandiri;
        $pkm->sumber_dalam_negri = $request->sumber_dalam_negri;
        $pkm->dana_dalam_negri = $request->dana_dalam_negri;
        $pkm->sumber_luar_negri = $request->sumber_luar_negri;
        $pkm->dana_luar_negri = $request->dana_luar_negri;
        $pkm->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tema_sesuai_roadmap' => $request->tema_sesuai_roadmap,
            'judul_kegiatan' => $request->judul_kegiatan,
            'lokasi' => $request->lokasi,
            'tahun' => $request->tahun,
            'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri,
            'dana_PT_Mandiri' => $request->dana_PT_Mandiri,
            'sumber_dalam_negri' => $request->sumber_dalam_negri,
            'dana_dalam_negri' => $request->dana_dalam_negri,
            'sumber_luar_negri' => $request->sumber_luar_negri,
            'dana_luar_negri' => $request->dana_luar_negri,
            'all_pkm' => PKM::all()
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
        $pkm = PKM::find($id);
        $pkm->delete();

        if (!$pkm) {
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

    public function listtahun(Request $request)
    {
        //
        $allpenelitians = Pkm::all()->groupBy('tahun');
        $arrTahun = array();
        foreach ($allpenelitians as $key => $ewmp) {
            $arrTahun[] = $ewmp[0]->tahun;
        }
        return response()->json([
            'success' => true,
            'tahunpenelitians' => $arrTahun,
        ]);
    }

    public function pilihdosen(Request $request, $id)
    {
        $luaran = Pkm::where('id', $id)->first();
        $datapkm = $request->only('profil_dosen_id', 'pkm_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($datapkm, [
            'profil_dosen_id' => 'required',
            'pkm_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $relasimahasiswa = RelasiPkmDos::create(
            [
                'profil_dosen_id' => $request->profil_dosen_id,
                'pkm_id' => $request->pkm_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'profil_dosen_id' => $request->profil_dosen_id,
            'pkm_id' => $request->pkm_id,
            'keanggotaan' => $request->keanggotaan,
            'all_pkm' => Pkm::all()
        ]);
    }
    public function pilihmhs(Request $request, $id)
    {
        $luaran = Pkm::where('id', $id)->first();
        $datapkm = $request->only('mahasiswa_id', 'pkm_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($datapkm, [
            'mahasiswa_id' => 'required',
            'pkm_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $relasimahasiswa = RelasiPkmMhs::create(
            [
                'mahasiswa_id' => $request->mahasiswa_id,
                'pkm_id' => $request->pkm_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'mahasiswa_id' => $request->mahasiswa_id,
            'pkm_id' => $request->pkm_id,
            'keanggotaan' => $request->keanggotaan,
            'all_pkm' => Pkm::all()
        ]);
    }
}
