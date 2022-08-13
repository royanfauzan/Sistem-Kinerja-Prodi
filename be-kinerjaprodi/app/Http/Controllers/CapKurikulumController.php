<?php

namespace App\Http\Controllers;

use App\Models\CapKurikulum;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CapKurikulumController extends Controller
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
            'all_capkurikulum' => CapKurikulum::with(['matkul', 'prodi'])->get(),
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
        $datacapkurikulum = $request->only('semester', 'tahun', 'mata_kuliah_kompetensi', 'kuliah_responsi_tutorial', 'seminar', 'praktikum', 'konversi_kredit_jam', 'sikap', 'pengetahuan', 'ketrampilan_umum', 'ketrampilan_khusus', 'dok_ren_pembelajaran', 'unit_penyelenggara', 'prodi_ID', 'matkul_ID');
        
        //valid credential
        $validator = Validator::make($datacapkurikulum, [
            'semester' => 'required',
            'tahun' => 'required',
            'mata_kuliah_kompetensi' => 'required',
            'kuliah_responsi_tutorial' => 'required',
            'seminar' => 'required',
            'praktikum' => 'required',
            'konversi_kredit_jam' => 'required', 
            'sikap' => 'required',
            'pengetahuan' => 'required', 
            'ketrampilan_umum' => 'required', 
            'ketrampilan_khusus' => 'required', 
            'dok_ren_pembelajaran' => 'required', 
            'unit_penyelenggara' => 'required',             
            'prodi_ID' => 'required',            
            'matkul_ID' => 'required'
        ]);
 
        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
 
        $datacapkurikulum = CapKurikulum::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'semester' => $request->semester,
                'tahun' => $request->tahun,
                'mata_kuliah_kompetensi' => $request->mata_kuliah_kompetensi, 
                'kuliah_responsi_tutorial' => $request->kuliah_responsi_tutorial, 
                'seminar' => $request->seminar, 
                'praktikum' => $request->praktikum, 
                'konversi_kredit_jam' => $request->konversi_kredit_jam, 
                'sikap' => $request->sikap, 
                'pengetahuan' => $request->pengetahuan, 
                'ketrampilan_umum' => $request->ketrampilan_umum, 
                'ketrampilan_khusus' => $request->ketrampilan_khusus, 
                'dok_ren_pembelajaran' => $request->dok_ren_pembelajaran, 
                'unit_penyelenggara' => $request->unit_penyelenggara, 
                'prodi_ID' => $request->prodi_ID,
                'matkul_ID' => $request->matkul_ID
            ]
        );
 
        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true, 
            'semester' => $request->semester,
            'tahun' => $request->tahun,
            'mata_kuliah_kompetensi' => $request->mata_kuliah_kompetensi, 
            'kuliah_responsi_tutorial' => $request->kuliah_responsi_tutorial, 
            'seminar' => $request->seminar, 
            'praktikum' => $request->praktikum, 
            'konversi_kredit_jam' => $request->konversi_kredit_jam, 
            'sikap' => $request->sikap, 
            'pengetahuan' => $request->pengetahuan, 
            'ketrampilan_umum' => $request->ketrampilan_umum, 
            'ketrampilan_khusus' => $request->ketrampilan_khusus, 
            'dok_ren_pembelajaran' => $request->dok_ren_pembelajaran, 
            'unit_penyelenggara' => $request->unit_penyelenggara, 
            'prodi_ID' => $request->prodi_ID,
            'matkul_ID' => $request->matkul_ID,
            'all_capkurikulum' => CapKurikulum::all()
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
        $capkurikulum = CapKurikulum::where('id', $id)->first();
        $datamhs = $request->only('semester', 'tahun', 'mata_kuliah_kompetensi', 'kuliah_responsi_tutorial', 'seminar', 'praktikum', 'konversi_kredit_jam', 'sikap', 'pengetahuan', 'ketrampilan_umum', 'ketrampilan_khusus', 'dok_ren_pembelajaran', 'unit_penyelenggara', 'prodi_ID', 'matkul_ID');

       //valid credential
       $validator = Validator::make($datamhs, [
        'semester' => 'required',
        'tahun' => 'required',
        'mata_kuliah_kompetensi' => 'required',
        'kuliah_responsi_tutorial' => 'required',
        'seminar' => 'required',
        'praktikum' => 'required',
        'konversi_kredit_jam' => 'required', 
        'sikap', 'pengetahuan' => 'required', 
        'ketrampilan_umum' => 'required', 
        'ketrampilan_khusus' => 'required', 
        'dok_ren_pembelajaran' => 'required', 
        'unit_penyelenggara' => 'required',             
        'prodi_ID' => 'required',            
        'matkul_ID' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }
       $capkurikulum-> semester = $request->semester;
       $capkurikulum-> tahun = $request->tahun;
       $capkurikulum-> mata_kuliah_kompetensi = $request->mata_kuliah_kompetensi;
       $capkurikulum-> kuliah_responsi_tutorial = $request->kuliah_responsi_tutorial;
       $capkurikulum-> seminar = $request->seminar;
       $capkurikulum-> praktikum = $request->praktikum;
       $capkurikulum-> konversi_kredit_jam = $request->konversi_kredit_jam;
       $capkurikulum-> sikap = $request->sikap;
       $capkurikulum-> pengetahuan  = $request->pengetahuan;
       $capkurikulum-> ketrampilan_umum = $request->ketrampilan_umum;
       $capkurikulum-> ketrampilan_khusus = $request->ketrampilan_khusus;
       $capkurikulum-> dok_ren_pembelajaran = $request->dok_ren_pembelajaran;
       $capkurikulum-> unit_penyelenggara = $request->unit_penyelenggara;
       $capkurikulum-> prodi_ID = $request->prodi_ID;
       $capkurikulum-> matkul_ID = $request->matkul_ID;
        $capkurikulum->save();

       
       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'semester' => $request->semester,
           'tahun' => $request->tahun,
           'mata_kuliah_kompetensi' => $request->mata_kuliah_kompetensi, 
           'kuliah_responsi_tutorial' => $request->kuliah_responsi_tutorial, 
           'seminar' => $request->seminar, 
           'praktikum' => $request->praktikum, 
           'konversi_kredit_jam' => $request->konversi_kredit_jam, 
           'sikap' => $request->sikap, 
           'pengetahuan' => $request->pengetahuan, 
           'ketrampilan_umum' => $request->ketrampilan_umum, 
           'ketrampilan_khusus' => $request->ketrampilan_khusus, 
           'dok_ren_pembelajaran' => $request->dok_ren_pembelajaran, 
           'unit_penyelenggara' => $request->unit_penyelenggara, 
           'prodi_ID' => $request->prodi_ID,
           'matkul_ID' => $request->matkul_ID,
           'all_capkurikulum' => CapKurikulum::all()
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
