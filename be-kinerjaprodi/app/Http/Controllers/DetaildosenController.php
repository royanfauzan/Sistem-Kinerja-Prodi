<?php

namespace App\Http\Controllers;

use App\Models\Detaildosen;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DetaildosenController extends Controller
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
        $data = $request->only('profil_dosen_id', 'bidangKeahlian', 'kesesuaian', 'noSertifPendidik');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|string',
            'bidangKeahlian' => 'required|string',
            'kesesuaian' => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $finalPathdokumen = "";
        if ($request->file('fileBukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('fileBukti'),["fileBukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/detaildosen/";

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
        }

        $dtDosen = Detaildosen::create([
            'profil_dosen_id' => $request->profil_dosen_id,
            'bidangKeahlian' => $request->bidangKeahlian,
            'kesesuaian' => $request->kesesuaian,
            'noSertifPendidik' => $request->noSertifPendidik,
        ]);

        if ($request->perusahaan) {
            $dtDosen->perusahaan = $request->perusahaan;
        }

        if ($request->file('fileBukti')) {
            $dtDosen->fileBukti = $finalPathdokumen;
        }
        $dtDosen->save();

        return response()->json([
            'success' => true,
            'detilDosen' => $dtDosen,
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
        $detail = Detaildosen::with('profilDosen')->find($id);
        return response()->json([
            'success' => true,
            'datadetail' => $detail,
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
        $data = $request->only('profil_dosen_id', 'bidangKeahlian', 'kesesuaian', 'noSertifPendidik');
        $validator = Validator::make($data, [
            'profil_dosen_id' => 'required|string',
            'bidangKeahlian' => 'required|string',
            'kesesuaian' => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dtDosen = Detaildosen::find($id);

        if ($request->file('fileBukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('fileBukti'),["fileBukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/detaildosen/";

                $dokumen = $request->file('fileBukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;

                $filedihapus = File::exists(public_path($dtDosen->fileBukti));

                if ($filedihapus) {
                    File::delete(public_path($dtDosen->fileBukti));
                }

                $dtDosen->fileBukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }

        $dtDosen->profil_dosen_id = $request->profil_dosen_id;
        $dtDosen->bidangKeahlian = $request->bidangKeahlian;
        $dtDosen->kesesuaian = $request->kesesuaian;
        $dtDosen->noSertifPendidik = $request->noSertifPendidik;
        
        $perusahaan = " ";
        if ($request->perusahaan) {
            $dtDosen->perusahaan = $perusahaan;
        }
        
        $dtDosen->save();

        return response()->json([
            'success' => true,
            'detailDosen' => $dtDosen,
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
        $dtDosen = Detaildosen::find($id);
        $filedihapus = File::exists(public_path($dtDosen->fileBukti));

        if ($filedihapus) {
            File::delete(public_path($dtDosen->fileBukti));
        }

        $dtDosen->delete();

        return response()->json([
            'success' => true,
            'detilDosen' => $dtDosen,
        ]);
    }
}
