<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\profilDosen;
use App\Models\RelasiDosProd;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProdukController extends Controller
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
            'all_produk' => Produk::with(['anggotaMahasiswas'])->get(),
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
        $dataproduk = $request->only('profil_dosen_id','nm_produk', 'deskripsi', 'tahun', 'deskripsi_bukti', 'file_bukti');

        //valid credential
        $validator = Validator::make($dataproduk, [
            'nm_produk' => 'required',
            'deskripsi' => 'required',
            'tahun' => 'required',
            'deskripsi_bukti' => 'required',
            'profil_dosen_id' => 'required',
            "file_bukti" => "required|mimetypes:application/pdf|max:10000",
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $finalPathdokumen = "";
        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            
            try {
                $folderdokumen = "storage/detailproduk/";

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

        $dataproduk = Produk::create(
            [
                'nm_produk' => $request->nm_produk,
                'deskripsi' => $request->deskripsi,
                'tahun' => $request->tahun,
                'deskripsi_bukti' => $request->deskripsi_bukti,
                'file_bukti' => $finalPathdokumen,
            ]
        );

        $anggotaBaru = RelasiDosProd::create(
            [
                'profil_dosen_id'=> $request->profil_dosen_id,
                'produk_id' => $dataproduk->id,
                'keanggotaan' => 'Ketua', 
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_produk' => $request->nm_produk,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'deskripsi_bukti' => $request->deskripsi_bukti,
            'file_bukti' => $finalPathdokumen,
            'all_tabel' => Produk::all()
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
        $produk = Produk::with('anggotaDosens')->find($id);

        $listanggota = RelasiDosProd::where('produk_id',$id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();
        return response()->json([
            'success' => true,
            'dataproduk' => $produk,
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
        $produk = Produk::find($id);
        $dataproduk = $request->only('nm_produk', 'deskripsi', 'tahun', 'deskripsi_bukti','profil_dosen_id');

        //valid credential
        $validator = Validator::make($dataproduk, [
            'nm_produk' => 'required',
            'deskripsi' => 'required',
            'tahun' => 'required',
            'deskripsi_bukti' => 'required',
            'profil_dosen_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('file_bukti'), ["file_bukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/detailproduk/";

                $dokumen = $request->file('file_bukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $filedihapus = File::exists(public_path($produk->file_bukti));

                if ($filedihapus) {
                    File::delete(public_path($produk->file_bukti));
                }

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;
                $produk->file_bukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }

        $produk->nm_produk = $request->nm_produk;
        $produk->deskripsi = $request->deskripsi;
        $produk->tahun = $request->tahun;
        $produk->deskripsi_bukti = $request->deskripsi_bukti;
        $produk->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_produk' => $request->nm_produk,
            'deskripsi' => $request->deskripsi,
            'tahun' => $request->tahun,
            'deskripsi_bukti' => $request->deskripsi_bukti,
            'file_bukti' => $request->file_bukti,
            'all_tabel' => Produk::all()
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
        $produkdos = Produk::find($id);

        $filedihapus = File::exists(public_path($produkdos->file_bukti));

        if ($filedihapus) {
            File::delete(public_path($produkdos->file_bukti));
        }

        $produkdos->delete();

        if (!$produkdos) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus",
            'dataproduks' => Produk::with('anggotaDosens')->orderBy('tahun', 'DESC')->get()
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

        $anggotaBaru = RelasiDosProd::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'produk_id' => $id,
        ]);

        $databuku = Produk::find($id);



        $listanggota = RelasiDosProd::where('produk_id', $id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $produk = Produk::with('anggotaDosens')->find($id);

        return response()->json([
            'success' => true,
            'dataproduk' => $produk,
            'profildosens' => $profilDosens,
        ]);
    }

    public function hapusAnggota($id)
    {
        //
        $anggotaHapus = RelasiDosProd::find($id);

        $produk_id = $anggotaHapus->produk_id;

        $anggotaHapus->delete();

        $listanggota = RelasiDosProd::where('produk_id', $produk_id)->get();

        $idtags = array();
        foreach ($listanggota as $anggota) {
            $idtags[] = $anggota->profil_dosen_id;
        }

        $profilDosens = profilDosen::whereNotIn('id', $idtags)->get();

        $produk = Produk::with('anggotaDosens')->find($produk_id);

        return response()->json([
            'success' => true,
            'dataproduk' => $produk,
            'profildosens' => $profilDosens,
        ]);
    }


    public function searchproduk(Request $request, $search)
    {
        //

        $produks = Produk::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('nm_produk', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrproduk = array();
        foreach ($produks as $key => $produk) {
            $arrproduk[] = $produk;
        }
        return response()->json([
            'success' => true,
            'dataproduks' => $arrproduk,
        ]);
    }

    public function allproduk(Request $request)
    {
        //

        $produks = Produk::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
        $arrproduk = array();
        foreach ($produks as $key => $produk) {
            $arrproduk[] = $produk;
        }
        return response()->json([
            'success' => true,
            'dataproduks' => $arrproduk,
        ]);
    }


    public function searchprodukdsn(Request $request, $search)
    {
        //

        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $produks = Produk::with('anggotaDosens')->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('tahun', 'LIKE', "%{$search}%")
            ->orWhere('nm_produk', 'LIKE', "%{$search}%")
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrproduk = array();
        foreach ($produks as $key => $produk) {
            foreach ($produk->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrproduk[] = $produk;
                }
            }
        }

        return response()->json([
            'success' => true,
            'dataproduks' => $arrproduk,
        ]);
    }

    public function allprodukdsn(Request $request)
    {
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = $user->profilDosen->id;

        $produks = Produk::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();
      
        $arrproduk = array();
        foreach ($produks as $key => $produk) {
            foreach ($produk->anggotaDosens as $key2 => $anggota) {
                if ($anggota->id == $dosenId) {
                    $arrproduk[] = $produk;
                }
            }
        }
        return response()->json([
            'success' => true,
            'dataproduks' => $arrproduk,
        ]);
    }
}
