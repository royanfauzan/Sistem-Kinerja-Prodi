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
            'all_integrasi' => Integrasi::with(['profil_dosen', 'penelitian', 'pkm', 'matkul', 'anggotaDosens', 'anggotaMatkuls'])->get(),
        ]);
    }

    public function searchintegrasi($search)
    {


        return response()->json([
            'success' => true,
            'searchintegrasi' =>  Integrasi::with('profil_dosen', 'penelitian', 'pkm', 'matkul')
                ->whereRelation('profil_dosen', 'NamaDosen', 'LIKE', "%{$search}%")
                ->orWhereRelation('penelitian', 'judul', 'LIKE', "%{$search}%")
                ->orWhereRelation('pkm', 'judul_kegiatan', 'LIKE', "%{$search}%")
                ->orWhereRelation('matkul', 'nama_matkul', 'LIKE', "%{$search}%")
                ->orwhere('bentuk_integrasi', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('file_bukti', 'LIKE', "%{$search}%")
                ->get()

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
            'matkul_id' => 'required'

        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/integrasi/";

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

        $dataintegrasi = Integrasi::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'bentuk_integrasi' => $request->bentuk_integrasi,
                'tahun' => $request->tahun,
                'file_bukti' => $finalPathdokumen,
                'dosen_id' => $request->dosen_id,
                'matkul_id' => $request->matkul_id

            ]
        );

        if(!is_numeric($request->penelitian_id) && !is_numeric($request->PkM_id)){
            return response()->json(['error' => collect(['PkM_id'=>'Pilih PkM', 'penelitian_id'=>'Pilih Penelitian'])], 400);
        }

        if (is_numeric($request->penelitian_id) ) {
            $dataintegrasi->penelitian_id = $request->penelitian_id;
            $dataintegrasi->PkM_id = null;
        }

        if (is_numeric($request->PkM_id)) {
            $dataintegrasi->PkM_id = $request->PkM_id;
            $dataintegrasi->penelitian_id = null;
        }
        $dataintegrasi->save();

        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true,
            'bentuk_integrasi' => $request->bentuk_integrasi,
            'tahun' => $request->tahun,
            'file_bukti' => $finalPathdokumen,
            'dosen_id' => $request->dosen_id,
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
        return response()->json([
            'success' => true,
            'all_integrasi' => Integrasi::with(['profil_dosen', 'penelitian', 'pkm', 'matkul', 'anggotaDosens', 'anggotaMatkuls'])->where('id', $id)->first(),
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
        $integrasi = Integrasi::where('id', $id)->first();
        $dataintegrasi = $request->only('bentuk_integrasi', 'tahun', 'file_bukti', 'dosen_id', 'penelitian_id', 'PkM_id', 'matkul_id');

        //valid credential
        $validator = Validator::make($dataintegrasi, [
            'bentuk_integrasi' => 'required',
            'tahun' => 'required',
            'dosen_id' => 'required',
            'matkul_id' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $dtintegrasi = Integrasi::find($id);

        if ($request->file('file_bukti')) {
            $finalPathdokumen = "";
            $validasiFile = Validator::make($request->only('file_bukti'),["file_bukti" => "mimetypes:application/pdf|max:10000",]);
            if ($validasiFile->fails()) {
                return response()->json(['error' => $validasiFile->errors()], 400);
            }
            try {
                $folderdokumen = "storage/integrasi/";

                $dokumen = $request->file('file_bukti');

                $namaFiledokumen = preg_replace('/\s+/', '_', trim(explode(".", $dokumen->getClientOriginalName(), 2)[0])) . "-" . time() . "." . $dokumen->getClientOriginalExtension();

                $dokumen->move($folderdokumen, $namaFiledokumen);

                $finalPathdokumen = $folderdokumen . $namaFiledokumen;

                $filedihapus = File::exists(public_path($dtintegrasi->file_bukti));

                if ($filedihapus) {
                    File::delete(public_path($dtintegrasi->file_bukti));
                }

                $dtintegrasi->file_bukti = $finalPathdokumen;
            } catch (\Throwable $th) {
                return response()->json([
                    'success' => false,
                    'message' => "Gagal Menyimpan Dokumen" . $th,
                ], 400);
            }
        }

        if ($request->penelitian_id) {
            $integrasi->penelitian_id = $request->penelitian_id;
            $integrasi->PkM_id = null;
        }

        if ($request->PkM_id) {
            $integrasi->PkM_id = $request->PkM_id;
            $integrasi->penelitian_id = null;
        }

        $integrasi->bentuk_integrasi = $request->bentuk_integrasi;
        $integrasi->tahun = $request->tahun;
        $integrasi->dosen_id = $request->dosen_id;
        $integrasi->matkul_id = $request->matkul_id;
        $integrasi->save();


        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true,
            'bentuk_integrasi' => $request->bentuk_integrasi,
            'tahun' => $request->tahun,
            'dosen_id' => $request->dosen_id,
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
        $integrasi = Integrasi::find($id);
        $integrasi->delete();

        if (!$integrasi) {
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