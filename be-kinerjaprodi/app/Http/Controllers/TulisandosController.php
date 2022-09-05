<?php

namespace App\Http\Controllers;

use App\Models\Tulisandos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;

class TulisandosController extends Controller
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
        // $user = JWTAuth::parseToken()->authenticate();
        $dosenId = null;

        $datatulisan = $request->only('judul', 'tahun', 'nm_media', 'ruang_lingkup', 'file_bukti', 'profil_dosen_id');

        //valid credential
        $validator = Validator::make($datatulisan, [
            'judul' => 'required|string',
            'tahun' => 'required|string',
            'nm_media' => 'required|string',
            'ruang_lingkup' => 'required|string',
            'file_bukti' => 'required|mimetypes:application/pdf|max:10000',
            'profil_dosen_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dosenId = $request->profil_dosen_id;

        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('file_bukti'), ["file_bukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/tulisandosen/";

                $dokumen = $request->file('file_bukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }


        $tulisan = Tulisandos::create(
            [
                'judul' => $request->judul,
                'tahun' => $request->tahun,
                'nm_media' => $request->nm_media,
                'ruang_lingkup' => $request->ruang_lingkup,
                'file_bukti' => $finalPathdokumen,
                'profil_dosen_id' => $request->profil_dosen_id,
            ]
        );


        return response()->json([
            'success' => true,
            'tulisan' => $tulisan,
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
        $tulisandos = Tulisandos::with('profilDosen')->find($id);
        return response()->json([
            'success' => true,
            'datatulisan' => $tulisandos,
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

        $datatulisan = $request->only('judul', 'tahun', 'nm_media', 'ruang_lingkup', 'profil_dosen_id');

        //valid credential
        $validator = Validator::make($datatulisan, [
            'judul' => 'required',
            'tahun' => 'required',
            'nm_media' => 'required',
            'ruang_lingkup' => 'required',
            'profil_dosen_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dosenId = $request->profil_dosen_id;

        $tulisan = Tulisandos::find($id);

        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('file_bukti'), ["file_bukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/tulisandosen/";

                $dokumen = $request->file('file_bukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $filedihapus = File::exists(public_path($tulisan->file_bukti));

                if ($filedihapus) {
                    File::delete(public_path($tulisan->file_bukti));
                }

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;
                $tulisan->file_bukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }


        $tulisan->judul = $request->judul;
        $tulisan->tahun = $request->tahun;
        $tulisan->nm_media = $request->nm_media;
        $tulisan->ruang_lingkup = $request->ruang_lingkup;
        $tulisan->profil_dosen_id = $request->profil_dosen_id;
        $tulisan->save();


        return response()->json([
            'success' => true,
            'tulisan' => $tulisan,
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
        $tulisandos = Tulisandos::find($id);

        $filedihapus = File::exists(public_path($tulisandos->file_bukti));

        if ($filedihapus) {
            File::delete(public_path($tulisandos->file_bukti));
        }

        $tulisandos->delete();

        if (!$tulisandos) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus",
            'datatulisans' => Tulisandos::with('profilDosen')->orderBy('tahun', 'DESC')->get()
        ]);
    }

    public function searchtulisan(Request $request, $search)
    {
        //

        $tulisandoss = Tulisandos::with('profilDosen')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('nm_media', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('ruang_lingkup', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();
        return response()->json([
            'success' => true,
            'datatulisans' => $tulisandoss,
        ]);
    }

    public function alltulisan(Request $request)
    {
        //

        $tulisandoss = Tulisandos::with('profilDosen')
            ->orderBy('tahun', 'DESC')
            ->get();
        return response()->json([
            'success' => true,
            'datatulisans' => $tulisandoss,
        ]);
    }

    public function searchtulisandsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $tulisandoss = Tulisandos::with('profilDosen')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('nm_media', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('ruang_lingkup', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrtulisandos = array();
        foreach ($tulisandoss as $key => $tulisandos) {
            if ($tulisandos->profil_dosen_id == $dosenId) {
                $arrtulisandos[] = $tulisandos;
            }
        }

        return response()->json([
            'success' => true,
            'datatulisans' => $arrtulisandos,
        ]);
    }

    public function alltulisandsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $tulisandoss = Tulisandos::where('profil_dosen_id', $dosenId)->with('profilDosen')
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrtulisandos = array();
        foreach ($tulisandoss as $key => $tulisandos) {
            if ($tulisandos->profil_dosen_id == $dosenId) {
                $arrtulisandos[] = $tulisandos;
            }
        }
        return response()->json([
            'success' => true,
            'datatulisans' => $arrtulisandos,
        ]);
    }
}
