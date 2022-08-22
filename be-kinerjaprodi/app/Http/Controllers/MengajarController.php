<?php

namespace App\Http\Controllers;

use App\Models\Matkul;
use App\Models\Mengajar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class MengajarController extends Controller
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
        $user = JWTAuth::parseToken()->authenticate();
        // $dosenId = null;
        // if ($user->profilDosen) {
        //     $dosenId = $user->profilDosen->id;
        // } else {
        //     $dosenId = $request->dosenId;
        // }

        $data = $request->only('profil_dosen_id', 'matkul_id', 'tahun_akademik', 'semester');
        $validator = Validator::make($data, [
            'matkul_id' => 'required|numeric',
            'tahun_akademik' => 'required|string',
            'semester' => "required|string",
            'profil_dosen_id' => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors(),
            ], 400);
        }

        $mengajarExist = Mengajar::where([
            ['profil_dosen_id','=',$request->profil_dosen_id],
            ['matkul_id','=',$request->matkul_id],
            ['semester','=',$request->semester],
            ['tahun_akademik','=',$request->tahun_akademik],
            ])->count();

        if ($mengajarExist) {
            
                return response()->json([
                    'success' => false,
                    'message' => 'Data Sudah tersimpan',
                ], 400);
        
        }
        $mengajar = Mengajar::create([
            'tahun_akademik' => $request->tahun_akademik,
            'semester' => $request->semester,
            'matkul_id' => $request->matkul_id,
            'profil_dosen_id' => $request->profil_dosen_id,
        ]);

        if ($request->kesesuaian != 'V') {
            $mengajar->kesesuaian = '';
            $mengajar->save();
        }

        return response()->json([
            'success' => true,
            'mengajar' => $mengajar,
            'dosenId' => $request->profil_dosen_id
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
        $mengajar = Mengajar::with('profilDosen','matkul')->find($id);
        return response()->json([
            'success' => true,
            'datamengajar' => $mengajar,
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
        $user = JWTAuth::parseToken()->authenticate();
        // $dosenId = null;
        // if ($user->profilDosen) {
        //     $dosenId = $user->profilDosen->id;
        // } else {
        //     $dosenId = $request->dosenId;
        // }

        $data = $request->only('profil_dosen_id', 'matkul_id', 'tahun_akademik', 'semester', 'semester');
        $validator = Validator::make($data, [
            'matkul_id' => 'required|numeric',
            'tahun_akademik' => 'required|string',
            'semester' => "required|string",
            'profil_dosen_id' => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors(),
            ], 400);
        }

        $mengajarExist = Mengajar::where([
            ['profil_dosen_id','=',$request->profil_dosen_id],
            ['matkul_id','=',$request->matkul_id],
            ['semester','=',$request->semester],
            ['tahun_akademik','=',$request->tahun_akademik],
            ['id','<>',$id],
            ])->count();

        if ($mengajarExist) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data Sudah tersimpan',
                ], 400);
        }

        $mengajar = Mengajar::find($id);


        $mengajar->tahun_akademik = $request->tahun_akademik;
        $mengajar->semester = $request->semester;
        $mengajar->matkul_id = $request->matkul_id;
        $mengajar->profil_dosen_id = $request->profil_dosen_id;


        if ($request->kesesuaian != 'V') {
            $mengajar->kesesuaian = '';
        }

        $mengajar->save();

        return response()->json([
            'success' => true,
            'mengajar' => $mengajar,
            'dosenId' => $request->profil_dosen_id
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
        $mengajar = Mengajar::find($id);

        $mengajar->delete();

        return response()->json([
            'success' => true,
            'mengajarDosen' => $mengajar,
        ]);
    }

    public function searchmengajar(Request $request, $search)
    {
        //

        $mengajars = Mengajar::with('profilDosen', 'matkul')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhereRelation('matkul', 'kode_matkul', 'LIKE', "%{$search}%")
            ->orWhereRelation('matkul', 'nama_matkul', 'LIKE', "%{$search}%")
            ->orWhere('tahun_akademik', 'LIKE', "%{$search}%")
            ->orWhere('semester', 'LIKE', "%{$search}%")
            ->orderBy('tahun_akademik', 'DESC')
            ->get();
        $arrmengajar = array();
        foreach ($mengajars as $key => $mengajar) {
            $arrmengajar[] = $mengajar;
        }
        return response()->json([
            'success' => true,
            'datamengajars' => $arrmengajar,
        ]);
    }

    public function allmengajar(Request $request)
    {
        //

        $mengajars = Mengajar::with('profilDosen','matkul')
            ->orderBy('tahun_akademik', 'DESC')
            ->get();
        $arrmengajar = array();
        foreach ($mengajars as $key => $mengajar) {
            $arrmengajar[] = $mengajar;
        }
        return response()->json([
            'success' => true,
            'datamengajars' => $arrmengajar,
        ]);
    }


    public function searchmengajardsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $mengajars = Mengajar::with('profilDosen', 'matkul')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhereRelation('matkul', 'kode_matkul', 'LIKE', "%{$search}%")
            ->orWhereRelation('matkul', 'nama_matkul', 'LIKE', "%{$search}%")
            ->orWhere('tahun_akademik', 'LIKE', "%{$search}%")
            ->orWhere('semester', 'LIKE', "%{$search}%")
            ->orderBy('tahun_akademik', 'DESC')
            ->get();

        $arrmengajar = array();
        foreach ($mengajars as $key => $mengajar) {
            if ($mengajar->profil_dosen_id == $dosenId) {
                $arrmengajar[] = $mengajar;
            }
        }

        return response()->json([
            'success' => true,
            'datamengajars' => $arrmengajar,
        ]);
    }

    public function allmengajardsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $mengajars = Mengajar::where('profil_dosen_id', $dosenId)->with('profilDosen','matkul')
            ->orderBy('tahun_akademik', 'DESC')
            ->get();
        $arrmengajar = array();
        foreach ($mengajars as $key => $mengajar) {
            if ($mengajar->profil_dosen_id == $dosenId) {
                $arrmengajar[] = $mengajar;
            }
        }
        return response()->json([
            'success' => true,
            'datamengajars' => $arrmengajar,
        ]);
    }

    public function searchmatkulprodi(Request $request,$id)
    {
        //

        $matkuls = Matkul::where('prodi_id',$id)->get();
        $arrmatkul = array();
        foreach ($matkuls as $key => $matkul) {
            $arrmatkul[] = $matkul;
        }
        return response()->json([
            'success' => true,
            'all_matkul' => $arrmatkul,
        ]);
    }
}
