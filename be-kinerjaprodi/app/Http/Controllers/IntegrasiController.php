<?php

namespace App\Http\Controllers;

use App\Models\Integrasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IntegrasiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([ //ngirim ke front end
            'success' => true, 
            'all_integrasi' => Integrasi::with(['profil_dosen', 'penelitian', 'pkm', 'matkul'])->get(),
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
        $dataintegrasi = $request->only('bentuk_integrasi', 'tahun', 'file_bukti', 'dosen_id', 'penelitian_id', 'PkM_id', 'matkul_id');

       //valid credential
       $validator = Validator::make($dataintegrasi, [
        'bentuk_integrasi' => 'required', 
        'tahun' => 'required', 
        'file_bukti' => "required|mimetypes:application/pdf|max:10000", 
        'dosen_id' => 'required', 
        'penelitian_id' => 'required', 
        'PkM_id' => 'required', 
        'matkul_id' => 'required'
           
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $finalPathdokumen = "";
       try {
           $folderdokumen = "storage/integrasi/";

           $dokumen = $request->file('file_bukti');

           $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".",$dokumen->getClientOriginalName(),2)[0])) . "-". time() . "." . $dokumen->getClientOriginalExtension();

           $dokumen->move($folderdokumen, $namaFiledokumen);

           $finalPathdokumen = $folderdokumen . $namaFiledokumen;
       } catch (\Throwable $th) {
           return response()->json([
               'success' => false,
               'message' => "Gagal Menyimpan Dokumen".$th,
           ], 400);
       }

       $dataintegrasi = Integrasi::create( //ngirim ke database
           [
               //yg kiri dari form, kanan dari database
               'bentuk_integrasi' => $request->bentuk_integrasi, 
                'tahun' => $request->tahun, 
                'file_bukti' => $finalPathdokumen, 
                'dosen_id' => $request->dosen_id, 
                'penelitian_id' => $request->penelitian_id, 
                'PkM_id'=> $request->PkM_id, 
                'matkul_id' => $request->matkul_id
               
           ]
       );

       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
                'bentuk_integrasi' => $request->bentuk_integrasi, 
                'tahun' => $request->tahun, 
                'file_bukti' => $finalPathdokumen, 
                'dosen_id' => $request->dosen_id, 
                'penelitian_id' => $request->penelitian_id, 
                'PkM_id'=> $request->PkM_id, 
                'matkul_id' => $request->matkul_id,
           'all_integrasi' => Integrasi::all()
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
        $integrasi = Integrasi::where('id', $id)->first();
        $dataintegrasi = $request->only('bentuk_integrasi', 'tahun', 'file_bukti', 'dosen_id', 'penelitian_id', 'PkM_id', 'matkul_id');

       //valid credential
       $validator = Validator::make($dataintegrasi, [
        'bentuk_integrasi' => 'required', 
        'tahun' => 'required', 
        'file_bukti' => 'required', 
        'dosen_id' => 'required', 
        'penelitian_id' => 'required', 
        'PkM_id' => 'required', 
        'matkul_id' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $integrasi-> bentuk_integrasi = $request->bentuk_integrasi; 
       $integrasi-> tahun = $request->tahun;
       $integrasi-> file_bukti = $request->file_bukti;
       $integrasi-> dosen_id = $request->dosen_id;
       $integrasi-> penelitian_id = $request->penelitian_id;
       $integrasi-> PkM_id = $request->PkM_id;
       $integrasi-> matkul_id = $request->matkul_id;
       $integrasi->save();

       
       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'bentuk_integrasi' => $request->bentuk_integrasi, 
                'tahun' => $request->tahun, 
                'file_bukti' => $request->file_bukti, 
                'dosen_id' => $request->dosen_id, 
                'penelitian_id' => $request->penelitian_id, 
                'PkM_id'=> $request->PkM_id, 
                'matkul_id' => $request->matkul_id,
           'all_integrasi' => Integrasi::all()
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
    }
}
