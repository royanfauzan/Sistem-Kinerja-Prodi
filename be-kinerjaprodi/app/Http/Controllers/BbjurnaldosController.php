<?php

namespace App\Http\Controllers;

use App\Models\Bbjurnaldos;
use App\Models\profilDosen;
use App\Models\RelasiJurDos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class BbjurnaldosController extends Controller
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
        $databuku = $request->only('profil_dosen_id', 'judul', 'kategori_jurnal', 'nm_jurnal', 'keterangan', 'volume', 'tahun', 'nomor', 'halaman', 'sitasi');

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

        

        $databuku = Bbjurnaldos::create(
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

        $anggotaBaru = RelasiJurDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'bbjurnaldos_id' => $databuku->id,
            'keanggotaan' => 'Ketua',
        ]);

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
            'all_buku' => Bbjurnaldos::all()
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
        $jurnal = Bbjurnaldos::with('anggotaDosens')->find($id);

        $listanggota = RelasiJurDos::where('bbjurnaldos_id',$id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();
        return response()->json([
            'success' => true,
            'datajurnal' => $jurnal,
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
        $databuku = $request->only('profil_dosen_id', 'judul', 'kategori_jurnal', 'nm_jurnal', 'keterangan', 'volume', 'tahun', 'nomor', 'halaman', 'sitasi');

        //valid credential
        $validator = Validator::make($databuku, [
            'profil_dosen_id' => 'required',
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

        $databuku = Bbjurnaldos::find($id);

        $databuku->judul = $request->judul;
        $databuku->kategori_jurnal = $request->kategori_jurnal;
        $databuku->nm_jurnal = $request->nm_jurnal;
        $databuku->keterangan = $request->keterangan;
        $databuku->volume = $request->volume;
        $databuku->tahun = $request->tahun;
        $databuku->nomor = $request->nomor;
        $databuku->halaman = $request->halaman;
        $databuku->sitasi = $request->sitasi;
        $databuku->save();


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
            'all_buku' => Bbjurnaldos::all()
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
        $jurnal = Bbjurnaldos::find($id);
        $jurnal->delete();

        return response()->json([
            'success' => true,
            'jurnalDosen' => $jurnal,
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

        $anggotaBaru = RelasiJurDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'bbjurnaldos_id' => $id,
        ]);

        $databuku = Bbjurnaldos::find($id);

        

        $listanggota = RelasiJurDos::where('bbjurnaldos_id', $id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $jurnal = Bbjurnaldos::with('anggotaDosens')->find($id);

        return response()->json([
            'success' => true,
            'datajurnal' => $jurnal,
            'profildosens' => $profilDosens,
        ]);
    }

    public function hapusAnggota($id)
    {
        //
        $anggotaHapus = RelasiJurDos::find($id);

        $jurnal_id = $anggotaHapus->bbjurnaldos_id;

        $anggotaHapus->delete();

        $listanggota = RelasiJurDos::where('bbjurnaldos_id', $jurnal_id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $jurnal = Bbjurnaldos::with('anggotaDosens')->find($jurnal_id);

        return response()->json([
            'success' => true,
            'datajurnal' => $jurnal,
            'profildosens' => $profilDosens,
        ]);
    }


    public function searchjurnal(Request $request, $search)
    {
        //

        $jurnals = Bbjurnaldos::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orWhere('kategori_jurnal', 'LIKE', "%{$search}%")
            ->orWhere('nm_jurnal', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrjurnal = array();
        foreach ($jurnals as $key => $jurnal) {
            $arrjurnal[] = $jurnal;
        }
        return response()->json([
            'success' => true,
            'datajurnals' => $arrjurnal,
        ]);
    }

    public function alljurnal(Request $request)
    {
        //

        $jurnals = Bbjurnaldos::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrjurnal = array();
        foreach ($jurnals as $key => $jurnal) {
            $arrjurnal[] = $jurnal;
        }
        return response()->json([
            'success' => true,
            'datajurnals' => $arrjurnal,
        ]);
    }


    public function searchjurnaldsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $jurnals = Bbjurnaldos::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orWhere('kategori_jurnal', 'LIKE', "%{$search}%")
            ->orWhere('nm_jurnal', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrjurnal = array();
        foreach ($jurnals as $key => $jurnal) {
            foreach ($jurnal->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrjurnal[] = $jurnal;
                }
            }
        }

        return response()->json([
            'success' => true,
            'datajurnals' => $arrjurnal,
        ]);
    }

    public function alljurnaldsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $jurnals = Bbjurnaldos::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
      
        $arrjurnal = array();
        foreach ($jurnals as $key => $jurnal) {
            foreach ($jurnal->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrjurnal[] = $jurnal;
                }
            }
        }
        return response()->json([
            'success' => true,
            'datajurnals' => $arrjurnal,
        ]);
    }
}
