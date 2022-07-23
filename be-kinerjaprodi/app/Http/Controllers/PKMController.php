<?php

namespace App\Http\Controllers;

use App\Models\Pkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PKMController extends Controller
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
            'all_pkm' => Pkm::all()
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
        $datapkm = $request->only('tema_sesuai_roadmap', 'judul_kegiatan', 'lokasi', 'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

       //valid credential
       $validator = Validator::make($datapkm, [
        'tema_sesuai_roadmap' => 'required',
        'judul_kegiatan' => 'required', 
        'lokasi' => 'required', 
        'tahun' => 'required', 
        'sumber_dana_PT_mandiri' => 'required', 
        'dana_PT_Mandiri' => 'required', 
        'sumber_dalam_negri' => 'required', 
        'dana_dalam_negri' => 'required', 
        'sumber_luar_negri' => 'required', 
        'dana_luar_negri' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $datapkm = Pkm::create( //ngirim ke database
           [
               //yg kiri dari form, kanan dari database
               'tema_sesuai_roadmap'=> $request->tema_sesuai_roadmap,
               'nama_matkul' => $request->nama_matkul,
               'judul_kegiatan' => $request->judul_kegiatan, 
               'lokasi' => $request->lokasi, 
               'tahun' => $request->tahun, 
               'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri, 
               'dana_PT_Mandiri' => $request->dana_PT_Mandiri, 
               'sumber_dalam_negri' => $request->sumber_dalam_negri, 
               'dana_dalam_negri' => $request->dana_dalam_negri, 
               'sumber_luar_negri' => $request->sumber_luar_negri, 
               'dana_luar_negri' => $request->dana_luar_negri,
           ]
       );

       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'tema_sesuai_roadmap'=> $request->tema_sesuai_roadmap,
           'nama_matkul' => $request->nama_matkul,
           'judul_kegiatan' => $request->judul_kegiatan, 
           'lokasi' => $request->lokasi, 
           'tahun' => $request->tahun, 
           'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri, 
           'dana_PT_Mandiri' => $request->dana_PT_Mandiri, 
           'sumber_dalam_negri' => $request->sumber_dalam_negri, 
           'dana_dalam_negri' => $request->dana_dalam_negri, 
           'sumber_luar_negri' => $request->sumber_luar_negri, 
           'dana_luar_negri' => $request->dana_luar_negri,
           'all_pkm' => Pkm::all()
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
        $pkm = PKM::where('id', $id)->first();
        $datapkm = $request->only('tema_sesuai_roadmap', 'judul_kegiatan', 'lokasi', 'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

        // valid credential
        $validator = Validator::make($datapkm, [
            'tema_sesuai_roadmap' => 'required',
            'judul_kegiatan' => 'required', 
            'lokasi' => 'required', 
            'tahun' => 'required', 
            'sumber_dana_PT_mandiri' => 'required', 
            'dana_PT_Mandiri' => 'required', 
            'sumber_dalam_negri' => 'required', 
            'dana_dalam_negri' => 'required', 
            'sumber_luar_negri' => 'required', 
            'dana_luar_negri' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $pkm-> tema_sesuai_roadmap = $request->tema_sesuai_roadmap;
        $pkm->judul_kegiatan = $request->judul_kegiatan; 
        $pkm-> lokasi = $request->lokasi; 
        $pkm-> tahun = $request->tahun; 
        $pkm-> sumber_dana_PT_mandiri = $request->sumber_dana_PT_mandiri;
        $pkm-> dana_PT_Mandiri = $request->dana_PT_Mandiri;
        $pkm-> sumber_dalam_negri = $request->sumber_dalam_negri;
        $pkm-> dana_dalam_negri = $request->dana_dalam_negri; 
        $pkm-> sumber_luar_negri = $request->sumber_luar_negri; 
        $pkm-> dana_luar_negri = $request->dana_luar_negri;
        $pkm->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tema_sesuai_roadmap'=> $request->tema_sesuai_roadmap,
           'judul_kegiatan' => $request->judul_kegiatan, 
           'lokasi' => $request->lokasi, 
           'tahun' => $request->tahun, 
           'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri, 
           'dana_PT_Mandiri' => $request->dana_PT_Mandiri, 
           'sumber_dalam_negri' => $request->sumber_dalam_negri, 
           'dana_dalam_negri' => $request->dana_dalam_negri, 
           'sumber_luar_negri' => $request->sumber_luar_negri, 
           'dana_luar_negri' => $request->dana_luar_negri,
            'all_pkm' => PKM::all()
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
