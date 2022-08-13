<?php

namespace App\Http\Controllers;

use App\Models\Pagelaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PagelaranController extends Controller
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
            'all_pagelaran' => Pagelaran::all()
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
        $datapagelaran = $request->only('judul', 'tahun', 'penyelenggara', 'ruang_lingkup', 'file_bukti');

        //valid credential
        $validator = Validator::make($datapagelaran, [
            'judul' => 'required',
            'tahun' => 'required',
            'penyelenggara' => 'required',
            'ruang_lingkup' => 'required',
            'file_bukti' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/pagelaran/";

            $dokumen = $request->file('file_bukti');

            $namaFiledokumen = $dokumen->getClientOriginalName();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen" . $th,
            ], 400);
        }

        $datapagelaran = Pagelaran::create(
            [
                'judul' => $request->judul,
                'tahun' => $request->tahun,
                'penyelenggara' => $request->penyelenggara,
                'ruang_lingkup' => $request->ruang_lingkup,
                'file_bukti' => $finalPathdokumen,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'penyelenggara' => $request->penyelenggara,
            'ruang_lingkup' => $request->ruang_lingkup,
            'file_bukti' => $finalPathdokumen,
            'all_pagelaran' => Pagelaran::all()
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
        return response()->json([
            'success' => true,
            'all_pagelaran' => Pagelaran::find($id),
            'id' => $id
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
        $pagelaran = Pagelaran::where('id', $id)->first();
        $datapagelaran = $request->only('judul', 'tahun', 'penyelenggara', 'ruang_lingkup', 'file_bukti');

        //valid credential
        $validator = Validator::make($datapagelaran, [
            'judul' => 'required',
            'tahun' => 'required',
            'penyelenggara' => 'required',
            'ruang_lingkup' => 'required',
            'file_bukti' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/pagelaran/";

            $dokumen = $request->file('file_bukti');

            $namaFiledokumen = $dokumen->getClientOriginalName();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen" . $th,
            ], 400);
        }

        $pagelaran->judul = $request->judul;
        $pagelaran->tahun = $request->tahun;
        $pagelaran->penyelenggara = $request->penyelenggara;
        $pagelaran->ruang_lingkup = $request->ruang_lingkup;
        $pagelaran->file_bukti = $finalPathdokumen;;
        $pagelaran->save();


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'penyelenggara' => $request->penyelenggara,
            'ruang_lingkup' => $request->ruang_lingkup,
            'file_bukti' => $finalPathdokumen,
            'all_pagelaran' => Pagelaran::all()
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
        $pagelaran = Pagelaran::find($id);
        $pagelaran->delete();

        if (!$pagelaran) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus"
        ]);
    }
}
