<?php

namespace App\Http\Controllers;

use App\Models\Bimbingan;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;

class BimbinganController extends Controller
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
        //     $dosenId=$user->profilDosen->id;
        // }else{
        //     $dosenId = $request->dosenId;
        // }

        $data = $request->only('profil_dosen_id', 'prodi_id', 'tahun_akademik', 'judul_ta', 'nim_mhs', 'nama_mhs', 'fileBukti');
        $validator = Validator::make($data, [
            'prodi_id' => 'required|numeric',
            'profil_dosen_id' => 'required|numeric',
            'tahun_akademik' => 'required|string',
            'judul_ta' => "required|string",
            'nama_mhs' => "required|string",
            'nim_mhs' => "required|numeric",
            "fileBukti" => "required|mimetypes:application/pdf|max:10000",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors(),
            ], 400);
        }

        $finalPathdokumen = "";
        if ($request->file('fileBukti')) {
            $finalPathdokumen = "";
            try {
                $folderdokumen = "storage/tugasakhir/";

                $dokumen = $request->file('fileBukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);
                $finalPathdokumen = $folderdokumen . $namaFiledokumen;

                // $filedihapus = File::exists(public_path($bimbingan->fileBukti));

                // if ($filedihapus) {
                //     File::delete(public_path($bimbingan->fileBukti));
                // }


                // $bimbingan->fileBukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }

        $mhs_id = null;
        $mhs_skrg = Mahasiswa::where('nim', $request->nim_mhs)->first();

        if ($mhs_skrg) {
            $mhs_id = $mhs_skrg->id;
            $bimbinganMhs = Bimbingan::where('mahasiswa_id',$mhs_id)->first();
            if ($bimbinganMhs) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mahasiswa '.$request->nama_mhs.' Dibimbing '.$bimbinganMhs->profilDosen->NamaDosen,
                ], 400);
            }
        } else {
            $mahasiswaCreate = Mahasiswa::create([
                'nim' => $request->nim_mhs,
                'nama' => $request->nama_mhs,
            ]);
            $mhs_id = $mahasiswaCreate->id;
        }

        $bimbingan = Bimbingan::create([
            'tahun_akademik' => $request->tahun_akademik,
            'judul_ta' => $request->judul_ta,
            'fileBukti' => $finalPathdokumen,
            'prodi_id' => $request->prodi_id,
            'mahasiswa_id' => $mhs_id,
            'profil_dosen_id' => $request->profil_dosen_id,
        ]);


        return response()->json([
            'success' => true,
            'bimbingan' => $bimbingan,
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
        $bimbingan = Bimbingan::with('profilDosen','mahasiswa','prodi')->find($id);
        return response()->json([
            'success' => true,
            'databimbingan' => $bimbingan,
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
        $data = $request->only('profil_dosen_id', 'prodi_id', 'tahun_akademik', 'judul_ta', 'nim_mhs', 'nama_mhs');
        $validator = Validator::make($data, [
            'prodi_id' => 'required|numeric',
            'profil_dosen_id' => 'required|numeric',
            'tahun_akademik' => 'required|string',
            'judul_ta' => "required|string",
            'nama_mhs' => "required|string",
            'nim_mhs' => "required|numeric",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors(),
            ], 400);
        }

        $bimbingan = Bimbingan::find($id);

        $finalPathdokumen = "";
        if ($request->file('fileBukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('filBukti'), ["fileBukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/tugasakhir/";

                $dokumen = $request->file('fileBukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;

                $filedihapus = File::exists(public_path($bimbingan->fileBukti));

                if ($filedihapus) {
                    File::delete(public_path($bimbingan->fileBukti));
                }

                $bimbingan->fileBukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }

        $mhs_id = null;
        $mhs_skrg = Mahasiswa::where('nim', $request->nim_mhs)->first();

        if ($mhs_skrg) {
            $bimbinganMhs = Bimbingan::where([['mahasiswa_id','=',$mhs_skrg->id],['id','<>',$id]])->first();
            if ($bimbinganMhs) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mahasiswa '.$request->nama_mhs.' Dibimbing '.$bimbinganMhs->profilDosen->NamaDosen,
                ], 400);
            }
            $mhs_id = $mhs_skrg->id;
            $mhs_skrg->nama = $request->nama_mhs;
            $mhs_skrg->save();
        } else {
            $mahasiswaCreate = Mahasiswa::create([
                'nim' => $request->nim_mhs,
                'nama' => $request->nama_mhs,
            ]);
            $mhs_id = $mahasiswaCreate->id;
        }


        $bimbingan->tahun_akademik = $request->tahun_akademik;
        $bimbingan->judul_ta = $request->judul_ta;
        $bimbingan->prodi_id = $request->prodi_id;
        $bimbingan->mahasiswa_id = $mhs_id;
        $bimbingan->profil_dosen_id = $request->profil_dosen_id;
        $bimbingan->save();



        return response()->json([
            'success' => true,
            'bimbingan' => $bimbingan,
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
        $bimbingan = Bimbingan::find($id);
        $filedihapus = File::exists(public_path($bimbingan->fileBukti));

        if ($filedihapus) {
            File::delete(public_path($bimbingan->fileBukti));
        }

        $bimbingan->delete();

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $bimbingans = Bimbingan::where('profil_dosen_id', $dosenId)->with('profilDosen', 'mahasiswa','prodi')
            ->orderBy('tahun_akademik', 'DESC')
            ->get();
        $arrbimbingan = array();
        foreach ($bimbingans as $key => $bimbingan) {
            if ($bimbingan->profil_dosen_id == $dosenId) {
                $arrbimbingan[] = $bimbingan;
            }
        }

        return response()->json([
            'success' => true,
            'databimbingans' => $bimbingans,
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $allbimbingans = Bimbingan::all()->groupBy('tahun_akademik');
        $arrTahun = array();
        foreach ($allbimbingans as $key => $bimbingan) {
            $arrTahun[] = $bimbingan[0]->tahun_akademik;
        }
        return response()->json([
            'success' => true,
            'tahunbimbingans' => array_unique($arrTahun),
        ]);
    }

    public function searchbimbingan(Request $request, $search)
    {
        //

        $bimbingans = Bimbingan::with('profilDosen', 'mahasiswa','prodi')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhereRelation('mahasiswa', 'nama', 'LIKE', "%{$search}%")
            ->orWhereRelation('mahasiswa', 'nim', 'LIKE', "%{$search}%")
            ->orWhereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
            ->orWhere('tahun_akademik', 'LIKE', "%{$search}%")
            ->orWhere('judul_ta', 'LIKE', "%{$search}%")
            ->orderBy('tahun_akademik', 'DESC')
            ->get();
        $arrbimbingan = array();
        foreach ($bimbingans as $key => $bimbingan) {
            $arrbimbingan[] = $bimbingan;
        }
        return response()->json([
            'success' => true,
            'databimbingans' => $arrbimbingan,
        ]);
    }

    public function allbimbingan(Request $request)
    {
        //

        $bimbingans = Bimbingan::with('profilDosen', 'mahasiswa','prodi')
            ->orderBy('tahun_akademik', 'DESC')
            ->get();
        $arrbimbingan = array();
        foreach ($bimbingans as $key => $bimbingan) {
            $arrbimbingan[] = $bimbingan;
        }
        return response()->json([
            'success' => true,
            'databimbingans' => $arrbimbingan,
        ]);
    }


    public function searchbimbingandsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $bimbingans = Bimbingan::with('profilDosen', 'mahasiswa','prodi')->whereRelation('profilDosen', 'NamaDosen', 'LIKE', "%{$search}%")
        ->orWhereRelation('mahasiswa', 'nama', 'LIKE', "%{$search}%")
        ->orWhereRelation('mahasiswa', 'nim', 'LIKE', "%{$search}%")
        ->orWhereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
        ->orWhere('tahun_akademik', 'LIKE', "%{$search}%")
        ->orWhere('judul_ta', 'LIKE', "%{$search}%")
        ->orderBy('tahun_akademik', 'DESC')
        ->get();

        $arrbimbingan = array();
        foreach ($bimbingans as $key => $bimbingan) {
            if ($bimbingan->profil_dosen_id == $dosenId) {
                $arrbimbingan[] = $bimbingan;
            }
        }

        return response()->json([
            'success' => true,
            'databimbingans' => $arrbimbingan,
        ]);
    }

    public function allbimbingandsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $bimbingans = Bimbingan::where('profil_dosen_id', $dosenId)->with('profilDosen', 'mahasiswa','prodi')
            ->orderBy('tahun_akademik', 'DESC')
            ->get();
        $arrbimbingan = array();
        foreach ($bimbingans as $key => $bimbingan) {
            if ($bimbingan->profil_dosen_id == $dosenId) {
                $arrbimbingan[] = $bimbingan;
            }
        }
        return response()->json([
            'success' => true,
            'databimbingans' => $arrbimbingan,
        ]);
    }
}
