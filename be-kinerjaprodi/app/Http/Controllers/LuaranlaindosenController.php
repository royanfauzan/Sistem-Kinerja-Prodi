<?php

namespace App\Http\Controllers;

use App\Models\Luaranlaindosen;
use App\Models\profilDosen;
use App\Models\RelLuarDos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LuaranlaindosenController extends Controller
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
        $dataluaran = $request->only('judul', 'keterangan', 'tahun', 'jenis_luaran','profil_dosen_id');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'judul' => 'required',
            'keterangan' => 'required',
            'tahun' => 'required',
            'jenis_luaran' => 'required',
            'profil_dosen_id' => 'required',
        ]);

        

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dataluaran = Luaranlaindosen::create(
            [
                'judul' => $request->judul,
                'keterangan' => $request->keterangan,
                'tahun' => $request->tahun,
                'jenis_luaran' => $request->jenis_luaran,
            ]
        );

        $anggotaBaru = RelLuarDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'luaranlaindosen_id' => $dataluaran->id,
            'keanggotaan' => 'Ketua',
        ]);

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'keterangan' => $request->keterangan,
            'tahun' => $request->tahun,
            'jenis_luaran' => $request->jenis_luaran,
            'all_luaran' => Luaranlaindosen::all()
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
        $luaran = Luaranlaindosen::with('anggotaDosens')->find($id);

        $listanggota = RelLuarDos::where('luaranlaindosen_id',$id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();
        return response()->json([
            'success' => true,
            'dataluaran' => $luaran,
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

        $dataluaran = $request->only('judul', 'keterangan', 'tahun', 'jenis_luaran','profil_dosen_id');

        //valid credential
        $validator = Validator::make($dataluaran, [
            'judul' => 'required',
            'keterangan' => 'required',
            'tahun' => 'required',
            'jenis_luaran' => 'required',
            'profil_dosen_id' => 'required',
        ]); 

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $luaran = Luaranlaindosen::find($id);

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
            'all_luaran' => Luaranlaindosen::all()
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
        $luaran = Luaranlaindosen::find($id);
        $luaran->delete();

        return response()->json([
            'success' => true,
            'luaranDosen' => $luaran,
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

        $anggotaBaru = RelLuarDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'luaranlaindosen_id' => $id,
        ]);

        $databuku = Luaranlaindosen::find($id);



        $listanggota = RelLuarDos::where('luaranlaindosen_id', $id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $luaran = Luaranlaindosen::with('anggotaDosens')->find($id);

        return response()->json([
            'success' => true,
            'dataluaran' => $luaran,
            'profildosens' => $profilDosens,
        ]);
    }

    public function hapusAnggota($id)
    {
        //
        $anggotaHapus = RelLuarDos::find($id);

        $luaranlaindosen_id = $anggotaHapus->luaranlaindosen_id;

        $anggotaHapus->delete();

        $listanggota = RelLuarDos::where('luaranlaindosen_id', $luaranlaindosen_id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $luaran = Luaranlaindosen::with('anggotaDosens')->find($luaranlaindosen_id);

        return response()->json([
            'success' => true,
            'dataluaran' => $luaran,
            'profildosens' => $profilDosens,
        ]);
    }

    
    public function searchluaran(Request $request, $search)
    {
        //

        $luarans = Luaranlaindosen::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orWhere('jenis_luaran', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrluaran = array();
        foreach ($luarans as $key => $luaran) {
            $arrluaran[] = $luaran;
        }
        return response()->json([
            'success' => true,
            'dataluarans' => $arrluaran,
        ]);
    }

    public function allluaran(Request $request)
    {
        //

        $luarans = Luaranlaindosen::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrluaran = array();
        foreach ($luarans as $key => $luaran) {
            $arrluaran[] = $luaran;
        }
        return response()->json([
            'success' => true,
            'dataluarans' => $arrluaran,
        ]);
    }


    public function searchluarandsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $luarans = Luaranlaindosen::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orWhere('jenis_luaran', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrluaran = array();
        foreach ($luarans as $key => $luaran) {
            foreach ($luaran->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrluaran[] = $luaran;
                }
            }
        }

        return response()->json([
            'success' => true,
            'dataluarans' => $arrluaran,
        ]);
    }

    public function allluarandsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $luarans = Luaranlaindosen::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
      
        $arrluaran = array();
        foreach ($luarans as $key => $luaran) {
            foreach ($luaran->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrluaran[] = $luaran;
                }
            }
        }
        return response()->json([
            'success' => true,
            'dataluarans' => $arrluaran,
        ]);
    }
}
