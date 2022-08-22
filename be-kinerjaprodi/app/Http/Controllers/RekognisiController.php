<?php

namespace App\Http\Controllers;

use App\Models\Rekognisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;

class RekognisiController extends Controller
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
        $dosenId = null;
        // if ($user->profilDosen) {
        //     $dosenId=$user->profilDosen->id;
        // }else{
        //     $dosenId = $request->dosenId;
        // }

        $data = $request->only('profil_dosen_id', 'rekognisi', 'bidang', 'tingkat', 'tahun', 'noSertifPendidik', 'fileBukti', 'deskripsi');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|numeric',
            'rekognisi' => 'required|string',
            'bidang' => 'required|string',
            'tingkat' => "required|string",
            'tahun' => 'required|string',
            'deskripsi' => 'required|string',
            "fileBukti" => "required|mimetypes:application/pdf|max:10000",
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dosenId = $request->profil_dosen_id;

        // if ($validator->fails()) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => $validator->errors(),
        //     ], 400);
        // }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/rekognisidosen/";

            $dokumen = $request->file('fileBukti');

            $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen" . $th,
            ], 400);
        }

        $rekognisi = Rekognisi::create([
            'rekognisi' => $request->rekognisi,
            'bidang' => $request->bidang,
            'tingkat' => $request->tingkat,
            'tahun' => $request->tahun,
            'deskripsi' => $request->deskripsi,
            "fileBukti" => $finalPathdokumen,
            'profil_dosen_id' => $dosenId
        ]);

        return response()->json([
            'success' => true,
            'rekognisi' => $rekognisi,
            'dosenId' => $dosenId
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
        $Rekognisi = Rekognisi::with('profilDosen')->find($id);
        return response()->json([
            'success' => true,
            'datarekognisi' => $Rekognisi,
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
        $dosenId = null;
        // if ($user->profilDosen) {
        //     $dosenId=$user->profilDosen->id;
        // }else{
        //     $dosenId = $request->dosenId;
        // }

        $data = $request->only('profil_dosen_id', 'rekognisi', 'bidang', 'tingkat', 'tahun', 'noSertifPendidik', 'deskripsi');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|numeric',
            'rekognisi' => 'required|string',
            'bidang' => 'required|string',
            'tingkat' => "required|string",
            'tahun' => 'required|string',
            'deskripsi' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dosenId = $request->profil_dosen_id;

        // if ($validator->fails()) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => $validator->errors(),
        //     ], 400);
        // }

        $rekognisi = Rekognisi::find($id);

        if ($request->file('fileBukti')) {
            $finalPathdokumen = "";
            try {
                $folderdokumen = "storage/rekognisidosen/";

                $dokumen = $request->file('fileBukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $filedihapus = File::exists(public_path($rekognisi->fileBukti));

                if ($filedihapus) {
                    File::delete(public_path($rekognisi->fileBukti));
                }

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;
                $rekognisi->fileBukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }




        $rekognisi->rekognisi = $request->rekognisi;
        $rekognisi->bidang = $request->bidang;
        $rekognisi->tingkat = $request->tingkat;
        $rekognisi->tahun = $request->tahun;
        $rekognisi->deskripsi = $request->deskripsi;
        $rekognisi->profil_dosen_id = $dosenId;
        $rekognisi->save();

        return response()->json([
            'success' => true,
            'rekognisi' => $rekognisi,
            'dosenId' => $dosenId
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
        $rekognisi = Rekognisi::find($id);
        $rekognisi->delete();

        if (!$rekognisi) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus",
            'datarekognisis' => Rekognisi::with('profilDosen')->orderBy('tahun', 'DESC')->get()
        ]);
    }

    public function searchrekognisi(Request $request, $search)
    {
        //

        $rekognisis = Rekognisi::with('profilDosen')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('rekognisi', 'LIKE', "%{$search}%")
            ->orWhere('bidang', 'LIKE', "%{$search}%")
            ->orWhere('tingkat', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();
        return response()->json([
            'success' => true,
            'datarekognisis' => $rekognisis,
        ]);
    }

    public function allrekognisi(Request $request)
    {
        //

        $rekognisis = Rekognisi::with('profilDosen')
            ->orderBy('tahun', 'DESC')
            ->get();
        return response()->json([
            'success' => true,
            'datarekognisis' => $rekognisis,
        ]);
    }

    public function searchrekognisidsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $rekognisis = Rekognisi::with('profilDosen')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('rekognisi', 'LIKE', "%{$search}%")
            ->orWhere('bidang', 'LIKE', "%{$search}%")
            ->orWhere('tingkat', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrRekognisi = array();
        foreach ($rekognisis as $key => $Rekognisi) {
            if ($Rekognisi->profil_dosen_id == $dosenId) {
                $arrRekognisi[] = $Rekognisi;
            }
        }

        return response()->json([
            'success' => true,
            'datarekognisis' => $arrRekognisi,
        ]);
    }

    public function allrekognisidsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $rekognisis = Rekognisi::where('profil_dosen_id', $dosenId)->with('profilDosen')
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrRekognisi = array();
        foreach ($rekognisis as $key => $Rekognisi) {
            if ($Rekognisi->profil_dosen_id == $dosenId) {
                $arrRekognisi[] = $Rekognisi;
            }
        }
        return response()->json([
            'success' => true,
            'datarekognisis' => $arrRekognisi,
        ]);
    }
}
