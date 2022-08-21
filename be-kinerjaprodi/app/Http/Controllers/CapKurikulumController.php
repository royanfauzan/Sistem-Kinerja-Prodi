<?php

namespace App\Http\Controllers;

use App\Models\CapKurikulum;
use App\Models\Mahasiswa;
use App\Models\RelasiCapMatkul;
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
            'all_capkurikulum' => CapKurikulum::with(['matkul', 'prodi', 'anggotaMatkuls'])->get(),
        ]);
    }

    public function relasiCapMatkul($id)
    {
        return response()->json([ //ngirim ke front end
            'success' => true,
            'all_relasi' => RelasiCapMatkul::with('matkul')->where('cap_kurikulum_id', $id)->get(),
        ]);
    }

    public function searchcapkurikulum($search)
    {


        return response()->json([
            'success' => true,
            'searchcapkurikulum' =>  CapKurikulum::with('matkul', 'prodi')
                ->whereRelation('matkul', 'nama_matkul', 'LIKE', "%{$search}%")
                ->orWhereRelation('prodi', 'prodi', 'LIKE', "%{$search}%")
                ->orWhereRelation('prodi', 'nama_prodi', 'LIKE', "%{$search}%")
                ->orwhere('semester', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('mata_kuliah_kompetensi', 'LIKE', "%{$search}%")
                ->orwhere('kuliah_responsi_tutorial', 'LIKE', "%{$search}%")
                ->orwhere('seminar', 'LIKE', "%{$search}%")
                ->orwhere('praktikum', 'LIKE', "%{$search}%")
                ->orwhere('konversi_kredit_jam', 'LIKE', "%{$search}%")
                ->orwhere('pengetahuan', 'LIKE', "%{$search}%")
                ->orwhere('ketrampilan_umum', 'LIKE', "%{$search}%")
                ->orwhere('ketrampilan_khusus', 'LIKE', "%{$search}%")
                ->orwhere('dok_ren_pembelajaran', 'LIKE', "%{$search}%")
                ->orwhere('unit_penyelenggara', 'LIKE', "%{$search}%")
                ->get()

        ]);
    }

    public function searchhapus($search)
    {


        return response()->json([
            'success' => true,
            'searchhapus' =>  RelasiCapMatkul::with('matkul')
            ->whereRelation('matkul', 'nama_matkul', 'LIKE', "%{$search}%")
            ->orWhereRelation('matkul', 'kode_matkul', 'LIKE', "%{$search}%")     
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
        $datacapkurikulum = $request->only('semester', 'tahun', 'mata_kuliah_kompetensi', 'kuliah_responsi_tutorial', 'seminar', 'praktikum', 'konversi_kredit_jam', 'sikap', 'pengetahuan', 'ketrampilan_umum', 'ketrampilan_khusus', 'dok_ren_pembelajaran', 'unit_penyelenggara', 'prodi_ID', 'matkul_ID');
        //valid credential
        $validator = Validator::make($datacapkurikulum, [
            'semester' => 'required',
            'tahun' => 'required',
            'kuliah_responsi_tutorial' => 'required',
            'seminar' => 'required',
            'praktikum' => 'required',
            'konversi_kredit_jam' => 'required',
            'unit_penyelenggara' => 'required',
            'prodi_ID' => 'required',
            'matkul_ID' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $mata_kuliah_kompetensi = '';
        if($request->mata_kuliah_kompetensi){
            $mata_kuliah_kompetensi = $request->mata_kuliah_kompetensi;
        }

        $sikap = '';
        if($request->sikap){
            $sikap = $request->sikap;
        }

        $pengetahuan = '';
        if($request->pengetahuan){
            $pengetahuan = $request->pengetahuan;
        }

        $ketrampilan_umum = '';
        if($request->ketrampilan_umum){
            $ketrampilan_umum = $request->ketrampilan_umum;
        }

        $ketrampilan_khusus = '';
        if($request->ketrampilan_khusus){
            $ketrampilan_khusus = $request->ketrampilan_khusus;
        }

        $dok_ren_pembelajaran = '';
        if($request->dok_ren_pembelajaran){
            $dok_ren_pembelajaran = $request->dok_ren_pembelajaran;
        }


        $datacapkurikulum = CapKurikulum::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'semester' => $request->semester,
                'mata_kuliah_kompetensi'=> $mata_kuliah_kompetensi,
                'tahun' => $request->tahun,
                'kuliah_responsi_tutorial' => $request->kuliah_responsi_tutorial,
                'seminar' => $request->seminar,
                'praktikum' => $request->praktikum,
                'konversi_kredit_jam' => $request->konversi_kredit_jam,
                'sikap'=> $sikap,
                'pengetahuan'=> $pengetahuan,
                'ketrampilan_umum'=> $ketrampilan_umum,
                'ketrampilan_khusus'=> $ketrampilan_khusus,
                'dok_ren_pembelajaran'=> $dok_ren_pembelajaran,
                'unit_penyelenggara' => $request->unit_penyelenggara,
                'prodi_ID' => $request->prodi_ID,
                'matkul_ID' => $request->matkul_ID
            ]
        );

        // if(!is_numeric($request->sikap) && !is_numeric($request->mata_kuliah_kompetensi)){
        //     return response()->json(['error' => collect(['mata_kuliah_kompetensi'=>'Pilih PkM', 'sikap'=>'Pilih Penelitian'])], 400);
        // }

        

        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true,
            'semester' => $request->semester,
            'tahun' => $request->tahun,
            'kuliah_responsi_tutorial' => $request->kuliah_responsi_tutorial,
            'seminar' => $request->seminar,
            'praktikum' => $request->praktikum,
            'konversi_kredit_jam' => $request->konversi_kredit_jam,
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
        return response()->json([
            'success' => true,
            'all_capkurikulum' => CapKurikulum::with(['matkul', 'prodi', 'anggotaMatkuls'])->where('id', $id)->first(),
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
        $capkurikulum = CapKurikulum::where('id', $id)->first();
        $datamhs = $request->only('semester', 'tahun', 'mata_kuliah_kompetensi', 'kuliah_responsi_tutorial', 'seminar', 'praktikum', 'konversi_kredit_jam', 'sikap', 'pengetahuan', 'ketrampilan_umum', 'ketrampilan_khusus', 'dok_ren_pembelajaran', 'unit_penyelenggara', 'prodi_ID', 'matkul_ID');

        //valid credential
        $validator = Validator::make($datamhs, [
            'semester' => 'required',
            'tahun' => 'required',
            'kuliah_responsi_tutorial' => 'required',
            'seminar' => 'required',
            'praktikum' => 'required',
            'konversi_kredit_jam' => 'required',
            'unit_penyelenggara' => 'required',
            'prodi_ID' => 'required',
            'matkul_ID' => 'required'
        ]);

        

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $mata_kuliah_kompetensi = '';
        if($request->mata_kuliah_kompetensi){
            $mata_kuliah_kompetensi = $request->mata_kuliah_kompetensi;
        }

        $sikap = '';
        if($request->sikap){
            $sikap = $request->sikap;
        }

        $pengetahuan = '';
        if($request->pengetahuan){
            $pengetahuan = $request->pengetahuan;
        }

        $ketrampilan_umum = '';
        if($request->ketrampilan_umum){
            $ketrampilan_umum = $request->ketrampilan_umum;
        }

        $ketrampilan_khusus = '';
        if($request->ketrampilan_khusus){
            $ketrampilan_khusus = $request->ketrampilan_khusus;
        }

        $dok_ren_pembelajaran = '';
        if($request->dok_ren_pembelajaran){
            $dok_ren_pembelajaran = $request->dok_ren_pembelajaran;
        }


        $capkurikulum->semester = $request->semester;
        $capkurikulum->tahun = $request->tahun;
        $capkurikulum->mata_kuliah_kompetensi = $mata_kuliah_kompetensi;
        $capkurikulum->kuliah_responsi_tutorial = $request->kuliah_responsi_tutorial;
        $capkurikulum->seminar = $request->seminar;
        $capkurikulum->praktikum = $request->praktikum;
        $capkurikulum->konversi_kredit_jam = $request->konversi_kredit_jam;
        $capkurikulum->sikap = $sikap;
        $capkurikulum->pengetahuan  = $pengetahuan;
        $capkurikulum->ketrampilan_umum = $ketrampilan_umum;
        $capkurikulum->ketrampilan_khusus = $ketrampilan_khusus;
        $capkurikulum->dok_ren_pembelajaran = $dok_ren_pembelajaran;
        $capkurikulum->unit_penyelenggara = $request->unit_penyelenggara;
        $capkurikulum->prodi_ID = $request->prodi_ID;
        $capkurikulum->matkul_ID = $request->matkul_ID;
        $capkurikulum->save();


        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true,
            'semester' => $request->semester,
            'tahun' => $request->tahun,
            'kuliah_responsi_tutorial' => $request->kuliah_responsi_tutorial,
            'seminar' => $request->seminar,
            'praktikum' => $request->praktikum,
            'konversi_kredit_jam' => $request->konversi_kredit_jam,
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
        $capkurikulum = CapKurikulum::find($id);
        $capkurikulum->delete();

        if (!$capkurikulum) {
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

    public function pilihmatkul(Request $request, $id)
    {
        $matkul = CapKurikulum::where('id', $id)->first();
        $datacapkurikulum = $request->only('matkul_id', 'cap_kurikulum_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($datacapkurikulum, [
            'matkul_id' => 'required',
            'cap_kurikulum_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $relasimatkul = RelasiCapMatkul::create(
            [
                'matkul_id' => $request->matkul_id,
                'cap_kurikulum_id' => $request->cap_kurikulum_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'matkul_id' => $request->matkul_id,
            'cap_kurikulum_id' => $request->cap_kurikulum_id,
            'keanggotaan' => $request->keanggotaan,
            'all_capkurikulum' => CapKurikulum::all()
        ]);
    }

    public function deletematkul($id)
    {
        $capkurikulum = RelasiCapMatkul::find($id);
        $capkurikulum->delete();

        if (!$capkurikulum) {
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
