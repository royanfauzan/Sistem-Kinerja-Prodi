<?php

namespace App\Http\Controllers;

use App\Models\Pagelarandos;
use App\Models\profilDosen;
use App\Models\RelasiPagDos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;

class PagelarandosController extends Controller
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
        $dosenId = null;

        $datapagelaran = $request->only('judul', 'tahun', 'penyelenggara', 'ruang_lingkup', 'file_bukti', 'profil_dosen_id');

        //valid credential
        $validator = Validator::make($datapagelaran, [
            'judul' => 'required|string',
            'tahun' => 'required|string',
            'penyelenggara' => 'required|string',
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
                $folderdokumen = "storage/pagelarandosen/";

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

        $pagelaran = Pagelarandos::create(
            [
                'judul' => $request->judul,
                'tahun' => $request->tahun,
                'penyelenggara' => $request->penyelenggara,
                'ruang_lingkup' => $request->ruang_lingkup,
                'file_bukti' => $finalPathdokumen,
            ]
        );

        $anggotaBaru = RelasiPagDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'keanggotaan' => 'Ketua',
            'pagelarandos_id' => $pagelaran->id,
        ]);


        return response()->json([
            'success' => true,
            'pagelaran' => $pagelaran,
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
        $pagelaran = Pagelarandos::with('anggotaDosens')->find($id);

        $listanggota = RelasiPagDos::where('pagelarandos_id',$id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();
        return response()->json([
            'success' => true,
            'datapagelaran' => $pagelaran,
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
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = null;

        $datapagelaran = $request->only('judul', 'tahun', 'penyelenggara', 'ruang_lingkup', 'profil_dosen_id');

        //valid credential
        $validator = Validator::make($datapagelaran, [
            'judul' => 'required',
            'tahun' => 'required',
            'penyelenggara' => 'required',
            'ruang_lingkup' => 'required',
            'profil_dosen_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dosenId = $request->profil_dosen_id;

        $pagelaran = Pagelarandos::find($id);

        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('file_bukti'), ["file_bukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/pagelarandosen/";

                $dokumen = $request->file('file_bukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $filedihapus = File::exists(public_path($pagelaran->file_bukti));

                if ($filedihapus) {
                    File::delete(public_path($pagelaran->file_bukti));
                }

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;
                $pagelaran->file_bukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }


        $pagelaran->judul = $request->judul;
        $pagelaran->tahun = $request->tahun;
        $pagelaran->penyelenggara = $request->penyelenggara;
        $pagelaran->ruang_lingkup = $request->ruang_lingkup;
        $pagelaran->save();


        return response()->json([
            'success' => true,
            'pagelaran' => $pagelaran,
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
        $pagelarandos = Pagelarandos::find($id);

        $filedihapus = File::exists(public_path($pagelarandos->file_bukti));

        if ($filedihapus) {
            File::delete(public_path($pagelarandos->file_bukti));
        }

        $pagelarandos->delete();

        if (!$pagelarandos) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus",
            'datapagelarandoss' => Pagelarandos::with('anggotaDosens')->orderBy('tahun', 'DESC')->get()
        ]);
    }

    
    public function tambahAnggota(Request $request, $id)
    {
        //
        $datapagelaran = $request->only('profil_dosen_id');

        //valid credential
        $validator = Validator::make($datapagelaran, [
            'profil_dosen_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $anggotaBaru = RelasiPagDos::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'pagelarandos_id' => $id,
        ]);

        $datapagelaran = Pagelarandos::find($id);



        $listanggota = RelasiPagDos::where('pagelarandos_id', $id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $pagelaran = Pagelarandos::with('anggotaDosens')->find($id);

        return response()->json([
            'success' => true,
            'datapagelaran' => $pagelaran,
            'profildosens' => $profilDosens,
        ]);
    }

    public function hapusAnggota($id)
    {
        //
        $anggotaHapus = RelasiPagDos::find($id);

        $pagelaran_id = $anggotaHapus->pagelarandos_id;

        $anggotaHapus->delete();

        $listanggota = RelasiPagDos::where('pagelarandos_id', $pagelaran_id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $pagelaran = Pagelarandos::with('anggotaDosens')->find($pagelaran_id);

        return response()->json([
            'success' => true,
            'datapagelaran' => $pagelaran,
            'profildosens' => $profilDosens,
        ]);
    }

    public function searchpagelaran(Request $request, $search)
    {
        //

        $pagelarans = Pagelarandos::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orWhere('penyelenggara', 'LIKE', "%{$search}%")
            ->orWhere('ruang_lingkup', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrpagelaran = array();
        foreach ($pagelarans as $key => $pagelaran) {
            $arrpagelaran[] = $pagelaran;
        }
        return response()->json([
            'success' => true,
            'datapagelarans' => $arrpagelaran,
        ]);
    }

    public function allpagelaran(Request $request)
    {
        //

        $pagelarans = Pagelarandos::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrpagelaran = array();
        foreach ($pagelarans as $key => $pagelaran) {
            $arrpagelaran[] = $pagelaran;
        }
        return response()->json([
            'success' => true,
            'datapagelarans' => $arrpagelaran,
        ]);
    }


    public function searchpagelarandsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $pagelarans = Pagelarandos::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('judul', 'LIKE', "%{$search}%")
            ->orWhere('penyelenggara', 'LIKE', "%{$search}%")
            ->orWhere('ruang_lingkup', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrpagelaran = array();
        foreach ($pagelarans as $key => $pagelaran) {
            foreach ($pagelaran->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrpagelaran[] = $pagelaran;
                }
            }
        }

        return response()->json([
            'success' => true,
            'datapagelarans' => $arrpagelaran,
        ]);
    }

    public function allpagelarandsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $pagelarans = Pagelarandos::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
      
        $arrpagelaran = array();
        foreach ($pagelarans as $key => $pagelaran) {
            foreach ($pagelaran->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrpagelaran[] = $pagelaran;
                }
            }
        }
        return response()->json([
            'success' => true,
            'datapagelarans' => $arrpagelaran,
        ]);
    }
}
