<?php

namespace App\Http\Controllers;

use App\Models\profilDosen;
use App\Models\RelasiSemDos;
use App\Models\Seminardos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class SeminardosController extends Controller
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
        //
        $dataseminar = $request->only('profil_dosen_id', 'judul_kegiatan', 'penyelenggara', 'kategori_seminar', 'keterangan', 'tahun');

        //valid credential
        $validator = Validator::make($dataseminar, [
            'profil_dosen_id' => 'required|numeric',
            'tahun' => 'required|numeric',
            'judul_kegiatan' => 'required|string',
            'penyelenggara' => 'required|string',
            'kategori_seminar' => 'required|string',
        ]);


        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dataseminar = Seminardos::create(
            [
                'tahun' => $request->tahun,
                'judul_kegiatan' => $request->judul_kegiatan,
                'penyelenggara' => $request->penyelenggara,
                'kategori_seminar' => $request->kategori_seminar,
            ]
        );

        $anggotaBaru = RelasiSemDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'seminardos_id' => $dataseminar->id,
            'keanggotaan' => 'Ketua',
        ]);

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul_kegiatan,
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
        $seminar = Seminardos::with('anggotaDosens')->find($id);

        $listanggota = RelasiSemDos::where('seminardos_id',$id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();
        return response()->json([
            'success' => true,
            'dataseminar' => $seminar,
            'profildosens' => $profilDosens,
            // 'dosenId'=> $dosenId
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
        //
        $dataseminar = $request->only('profil_dosen_id', 'judul_kegiatan', 'penyelenggara', 'kategori_seminar', 'keterangan', 'tahun');

        //valid credential
        $validator = Validator::make($dataseminar, [
            'profil_dosen_id' => 'required|numeric',
            'tahun' => 'required|numeric',
            'judul_kegiatan' => 'required|string',
            'penyelenggara' => 'required|string',
            'kategori_seminar' => 'required|string',
        ]);


        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dataseminar = Seminardos::find($id);

        $dataseminar->tahun = $request->tahun;
        $dataseminar->judul_kegiatan = $request->judul_kegiatan;
        $dataseminar->penyelenggara = $request->penyelenggara;
        $dataseminar->kategori_seminar = $request->kategori_seminar;

        $dataseminar->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul_kegiatan,
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
        $seminar = Seminardos::find($id);
        $seminar->delete();

        return response()->json([
            'success' => true,
            'seminarDosen' => $seminar,
        ]);
    }

    public function tambahAnggota(Request $request, $id)
    {
        //
        $databuku = $request->only('profil_dosen_id');

        //valid credential
        $validator = Validator::make($databuku, [
            'profil_dosen_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $anggotaBaru = RelasiSemDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'seminardos_id' => $id,
        ]);

        $databuku = Seminardos::find($id);



        $listanggota = RelasiSemDos::where('seminardos_id', $id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $seminar = Seminardos::with('anggotaDosens')->find($id);

        return response()->json([
            'success' => true,
            'dataseminar' => $seminar,
            'profildosens' => $profilDosens,
        ]);
    }

    public function hapusAnggota($id)
    {
        //
        $anggotaHapus = RelasiSemDos::find($id);

        $seminar_id = $anggotaHapus->seminardos_id;

        $anggotaHapus->delete();

        $listanggota = RelasiSemDos::where('seminardos_id', $seminar_id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $seminar = Seminardos::with('anggotaDosens')->find($seminar_id);

        return response()->json([
            'success' => true,
            'dataseminar' => $seminar,
            'profildosens' => $profilDosens,
        ]);
    }

    
    public function searchseminar(Request $request, $search)
    {
        //

        $seminars = Seminardos::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul_kegiatan', 'LIKE', "%{$search}%")
            ->orWhere('penyelenggara', 'LIKE', "%{$search}%")
            ->orWhere('kategori_seminar', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrseminar = array();
        foreach ($seminars as $key => $seminar) {
            $arrseminar[] = $seminar;
        }
        return response()->json([
            'success' => true,
            'dataseminars' => $arrseminar,
        ]);
    }

    public function allseminar(Request $request)
    {
        //

        $seminars = Seminardos::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrseminar = array();
        foreach ($seminars as $key => $seminar) {
            $arrseminar[] = $seminar;
        }
        return response()->json([
            'success' => true,
            'dataseminars' => $arrseminar,
        ]);
    }


    public function searchseminardsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $seminars = Seminardos::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul_kegiatan', 'LIKE', "%{$search}%")
            ->orWhere('penyelenggara', 'LIKE', "%{$search}%")
            ->orWhere('kategori_seminar', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrseminar = array();
        foreach ($seminars as $key => $seminar) {
            foreach ($seminar->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrseminar[] = $seminar;
                }
            }
        }

        return response()->json([
            'success' => true,
            'dataseminars' => $arrseminar,
        ]);
    }

    public function allseminardsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $seminars = Seminardos::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
      
        $arrseminar = array();
        foreach ($seminars as $key => $seminar) {
            foreach ($seminar->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrseminar[] = $seminar;
                }
            }
        }
        return response()->json([
            'success' => true,
            'dataseminars' => $arrseminar,
        ]);
    }
}
