<?php

namespace App\Http\Controllers;

use App\Models\Serkom;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SerkomController extends Controller
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
        $data = $request->only('profil_dosen_id', 'nama_skema', 'nomor_sertifikat', 'tanggal_sertif', 'file_bukti');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|string',
            'nama_skema' => 'required|string',
            'nomor_sertifikat' => "required|string",
            'tanggal_sertif' => "required|string",
            "file_bukti" => "mimetypes:application/pdf|max:10000"
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $finalPathdokumen = "";
        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            try {
                $folderdokumen = "storage/serkoms/";

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

        $serkomDosen = Serkom::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'nama_skema' => $request->nama_skema,
            'nomor_sertifikat' => $request->nomor_sertifikat,
            'tanggal_sertif' => $request->tanggal_sertif,
            'file_bukti' => $finalPathdokumen,
        ]);

        if ($request->lembaga_sertifikasi) {
            $serkomDosen->lembaga_sertifikasi = $request->lembaga_sertifikasi;
        }

        if ($request->dikeluarkan_oleh) {
            $serkomDosen->dikeluarkan_oleh = $request->dikeluarkan_oleh;
        }

        $serkomDosen->save();

        return response()->json([
            'success' => true,
            'serkomDosen' => $serkomDosen,
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
        $serkom = Serkom::with('profilDosen')->find($id);
        return response()->json([
            'success' => true,
            'dataserkom' => $serkom,
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
        $data = $request->only('profil_dosen_id', 'nama_skema', 'nomor_sertifikat', 'tanggal_sertif', 'file_bukti');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|string',
            'nama_skema' => 'required|string',
            'nomor_sertifikat' => "required|string",
            'tanggal_sertif' => "required|string",

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $serkomDosen = Serkom::find($id);

        $finalPathdokumen = "";
        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('file_bukti'), ["file_bukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/serkoms/";

                $dokumen = $request->file('file_bukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;

                $filedihapus = File::exists(public_path($serkomDosen->file_bukti));

                if ($filedihapus) {
                    File::delete(public_path($serkomDosen->file_bukti));
                }

                $serkomDosen->file_bukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }

        $serkomDosen->profil_dosen_id = $request->profil_dosen_id;
        $serkomDosen->nama_skema = $request->nama_skema;
        $serkomDosen->nomor_sertifikat = $request->nomor_sertifikat;
        $serkomDosen->tanggal_sertif = $request->tanggal_sertif;


        if ($request->lembaga_sertifikasi) {
            $serkomDosen->lembaga_sertifikasi = $request->lembaga_sertifikasi;
        }

        if ($request->dikeluarkan_oleh) {
            $serkomDosen->dikeluarkan_oleh = $request->dikeluarkan_oleh;
        }

        $serkomDosen->save();

        return response()->json([
            'success' => true,
            'serkomDosen' => $serkomDosen,
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
        $serkom = Serkom::find($id);
        $filedihapus = File::exists(public_path($serkom->file_bukti));

        if ($filedihapus) {
            File::delete(public_path($serkom->file_bukti));
        }

        $serkom->delete();

        return response()->json([
            'success' => true,
            'serkomDosen' => $serkom,
        ]);
    }
}
