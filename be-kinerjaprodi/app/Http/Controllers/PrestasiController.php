<?php

namespace App\Http\Controllers;

use App\Models\Prestasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrestasiController extends Controller
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
            'all_prestasi' => Prestasi::with('prodi')->get(),
        ]);
    }

    // Serach
    public function searchprestasi($search)
    {
        return response()->json([
            'success' => true,
            'searchprestasi' =>  Prestasi::with('prodi')
                ->whereRelation('prodi', 'prodi','LIKE', "%{$search}%")
                ->orWhereRelation('prodi','nama_prodi', 'LIKE', "%{$search}%")
                ->orwhere('nm_kegiatan', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('tingkat', 'LIKE', "%{$search}%")
                ->orwhere('prestasi_dicapai', 'LIKE', "%{$search}%")
                ->orwhere('kategori', 'LIKE', "%{$search}%")
                ->get()
        ]);
    }

    public function searchakademik($search)
    {
        if(!strcmp($search,'non')){
            $search = 'Non Akademik';
        }
        return response()->json([
            'success' => true,
            'searchakademik' =>  Prestasi:: where('kategori', $search)
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
        $dataprestasi = $request->only('nm_kegiatan', 'tahun', 'tingkat', 'prestasi_dicapai', 'kategori', 'prodi_id');

        //valid credential
        $validator = Validator::make($dataprestasi, [
            'nm_kegiatan' =>"required",
            'tahun' => 'required',
            'tingkat' => 'required',
            'prestasi_dicapai' => 'required',
            'kategori' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dataprestasi = Prestasi::create(
            [
                'nm_kegiatan' => $request->nm_kegiatan,
                'tahun' => $request->tahun,
                'tingkat' => $request->tingkat,
                'prestasi_dicapai' => $request->prestasi_dicapai,
                'kategori' => $request->kategori,
                'prodi_id' => $request->prodi_id,
            ]
        );

        if (!$dataprestasi) {
            return response()->json([
                'success' => false,
                'message' => "Gagal"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil"
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
            'all_prestasi' => Prestasi::find($id),
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
        $prestasi = Prestasi::where('id', $id)->first();
        $dataprestasi = $request->only('nm_kegiatan', 'tahun', 'tingkat', 'prestasi_dicapai', 'kategori', 'prodi_id');

        //valid credential
        $validator = Validator::make($dataprestasi, [
            'nm_kegiatan' => 'required',
            'tahun' => 'required',
            'tingkat' => 'required',
            'prestasi_dicapai' => 'required',
            'kategori' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $prestasi->tahun = $request->tahun;
        $prestasi->nm_kegiatan = $request->nm_kegiatan;
        $prestasi->tingkat = $request->tingkat;
        $prestasi->prestasi_dicapai = $request->prestasi_dicapai;
        $prestasi->kategori = $request->kategori;
        $prestasi->prodi_id = $request->prodi_id;
        $prestasi->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'nm_kegiatan' => $request->nm_kegiatan,
            'tahun' => $request->tahun,
            'tingkat' => $request->tingkat,
            'prestasi_dicapai' => $request->prestasi_dicapai,
            'kategori' => $request->kategori,
            'prodi_id' => $request->prodi_id,
            'all_prestasi' => Prestasi::all()
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
        $prestasi = Prestasi::find($id);
        $prestasi->delete();

        if (!$prestasi) {
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
