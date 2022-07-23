<?php

namespace App\Http\Controllers;
use App\Models\Kepuasan_MHS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KepuasanMHSController extends Controller
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
            'all_mhs' => Kepuasan_MHS::with('prodi')->get(),
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
        $datakepuasanmhs = $request->only('tahun', 'keandalan_4', 'keandalan_3', 'keandalan_2', 'keandalan_1', 'tl_keandalan', 'dayatanggap_4', 'dayatanggap_3', 'dayatanggap_2', 'dayatanggap_1', 'tl_dayatanggap', 'kepastian_4', 'kepastian_3', 'kepastian_2', 'kepastian_1', 'tl_kepastian', 'empati_4', 'empati_3', 'empati_2', 'empati_1', 'tl_empati', 'tangible_4', 'tangible_3', 'tangible_2', 'tangible_1', 'tl_tangible', 'prodi_id');

       //valid credential
       $validator = Validator::make($datakepuasanmhs, [
           'tahun' => 'required',
           'keandalan_4' => 'required',
           'keandalan_3' => 'required',
           'keandalan_2' => 'required',
           'keandalan_1' => 'required',
           'tl_keandalan' => 'required',
           'dayatanggap_4' => 'required',
           'dayatanggap_3' => 'required',
           'dayatanggap_2' => 'required',
           'dayatanggap_1' => 'required',
           'tl_dayatanggap' => 'required',
           'kepastian_4' => 'required',
           'kepastian_3' => 'required',
           'kepastian_2' => 'required',
           'kepastian_1' => 'required',
           'tl_kepastian' => 'required',
           'empati_4' => 'required',
           'empati_3' => 'required',
           'empati_2' => 'required',
           'empati_1' => 'required',
           'tl_empati' => 'required',
           'tangible_4' => 'required',
           'tangible_3' => 'required',
           'tangible_2' => 'required',
           'tangible_1' => 'required',
           'tl_tangible' => 'required',
           'prodi_id' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $datakepuasanmhs = Kepuasan_MHS::create( //ngirim ke database
           [
               //yg kiri dari form, kanan dari database
               'tahun' => $request->tahun,
               'keandalan_4' => $request->keandalan_4,
               'keandalan_3' => $request->keandalan_3,
               'keandalan_2' => $request->keandalan_2,
               'keandalan_1' => $request->keandalan_1,
               'tl_keandalan' => $request->tl_keandalan,
               'dayatanggap_4' => $request->dayatanggap_4,
               'dayatanggap_3' => $request->dayatanggap_3,
               'dayatanggap_2' => $request->dayatanggap_2,
               'dayatanggap_1' => $request->dayatanggap_1,
               'tl_dayatanggap' => $request->tl_dayatanggap,
               'kepastian_4' => $request->kepastian_4,
               'kepastian_3' => $request->kepastian_3,
               'kepastian_2' => $request->kepastian_2,
               'kepastian_1' => $request->kepastian_1,
               'tl_kepastian' => $request->tl_kepastian,
               'empati_4' => $request->empati_4,
               'empati_3' => $request->empati_3,
               'empati_2' => $request->empati_2,
               'empati_1' => $request->empati_1,
               'tl_empati' => $request->tl_empati,
               'tangible_4' => $request->tangible_4,
               'tangible_3' => $request->tangible_3,
               'tangible_2' => $request->tangible_2,
               'tangible_1' => $request->tangible_1,
               'tl_tangible' => $request->tl_tangible,
               'prodi_id' => $request->prodi_id
           ]
       );

       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'tahun' => $request->tahun,
               'keandalan_4' => $request->keandalan_4,
               'keandalan_3' => $request->keandalan_3,
               'keandalan_2' => $request->keandalan_2,
               'keandalan_1' => $request->keandalan_1,
               'tl_keandalan' => $request->tl_keandalan,
               'dayatanggap_4' => $request->dayatanggap_4,
               'dayatanggap_3' => $request->dayatanggap_3,
               'dayatanggap_2' => $request->dayatanggap_2,
               'dayatanggap_1' => $request->dayatanggap_1,
               'tl_dayatanggap' => $request->tl_dayatanggap,
               'kepastian_4' => $request->kepastian_4,
               'kepastian_3' => $request->kepastian_3,
               'kepastian_2' => $request->kepastian_2,
               'kepastian_1' => $request->kepastian_1,
               'tl_kepastian' => $request->tl_kepastian,
               'empati_4' => $request->empati_4,
               'empati_3' => $request->empati_3,
               'empati_2' => $request->empati_2,
               'empati_1' => $request->empati_1,
               'tl_empati' => $request->tl_empati,
               'tangible_4' => $request->tangible_4,
               'tangible_3' => $request->tangible_3,
               'tangible_2' => $request->tangible_2,
               'tangible_1' => $request->tangible_1,
               'tl_tangible' => $request->tl_tangible,
               'prodi_id' => $request->prodi_id,
               'all_mhs' => Kepuasan_MHS::all()
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
        $kepuasan_mhs = Kepuasan_MHS::where('id', $id)->first();
        $datakepuasan_mhs = $request->only('tahun', 'keandalan_4', 'keandalan_3', 'keandalan_2', 'keandalan_1', 'tl_keandalan', 'dayatanggap_4', 'dayatanggap_3', 'dayatanggap_2', 'dayatanggap_1', 'tl_dayatanggap', 'kepastian_4', 'kepastian_3', 'kepastian_2', 'kepastian_1', 'tl_kepastian', 'empati_4', 'empati_3', 'empati_2', 'empati_1', 'tl_empati', 'tangible_4', 'tangible_3', 'tangible_2', 'tangible_1', 'tl_tangible', 'prodi_id');

       //valid credential
       $validator = Validator::make($datakepuasan_mhs, [
        'tahun' => 'required',
           'keandalan_4' => 'required',
           'keandalan_3' => 'required',
           'keandalan_2' => 'required',
           'keandalan_1' => 'required',
           'tl_keandalan' => 'required',
           'dayatanggap_4' => 'required',
           'dayatanggap_3' => 'required',
           'dayatanggap_2' => 'required',
           'dayatanggap_1' => 'required',
           'tl_dayatanggap' => 'required',
           'kepastian_4' => 'required',
           'kepastian_3' => 'required',
           'kepastian_2' => 'required',
           'kepastian_1' => 'required',
           'tl_kepastian' => 'required',
           'empati_4' => 'required',
           'empati_3' => 'required',
           'empati_2' => 'required',
           'empati_1' => 'required',
           'tl_empati' => 'required',
           'tangible_4' => 'required',
           'tangible_3' => 'required',
           'tangible_2' => 'required',
           'tangible_1' => 'required',
           'tl_tangible' => 'required',
           'prodi_id' => 'required'
       ]);

       //Send failed response if request is not valid
       if ($validator->fails()) {
           return response()->json(['error' => $validator->errors()], 200);
       }

       $kepuasan_mhs->tahun = $request->tahun;
       $kepuasan_mhs->keandalan_4 = $request->keandalan_4;
       $kepuasan_mhs->keandalan_3 = $request->keandalan_3;
       $kepuasan_mhs->keandalan_2 = $request->keandalan_2;
       $kepuasan_mhs->keandalan_1 = $request->keandalan_1;
       $kepuasan_mhs->tl_keandalan = $request->tl_keandalan;
       $kepuasan_mhs->dayatanggap_4 = $request->dayatanggap_4;
       $kepuasan_mhs->dayatanggap_3 = $request->dayatanggap_3;
       $kepuasan_mhs->dayatanggap_2 = $request->dayatanggap_2;
       $kepuasan_mhs->dayatanggap_1 = $request->dayatanggap_1;
       $kepuasan_mhs->tl_dayatanggap = $request->tl_dayatanggap;
       $kepuasan_mhs->kepastian_4 = $request->kepastian_4;
       $kepuasan_mhs->kepastian_3 = $request->kepastian_3;
       $kepuasan_mhs->kepastian_2 = $request->kepastian_2;
       $kepuasan_mhs->kepastian_1 = $request->kepastian_1;
       $kepuasan_mhs->tl_kepastian = $request->tl_kepastian;
       $kepuasan_mhs->empati_4 = $request->empati_4;
       $kepuasan_mhs->empati_3 = $request->empati_3;
       $kepuasan_mhs->empati_2 = $request->empati_2;
       $kepuasan_mhs->empati_1 = $request->empati_1;
       $kepuasan_mhs->tl_empati = $request->tl_empati;
       $kepuasan_mhs->tangible_4 = $request->tangible_4;
       $kepuasan_mhs->tangible_3 = $request->tangible_3;
       $kepuasan_mhs->tangible_2 = $request->tangible_2;
       $kepuasan_mhs->tangible_1 = $request->tangible_1;
       $kepuasan_mhs->tl_tangible = $request->tl_tangible;
       $kepuasan_mhs->prodi_id = $request->prodi_id;        
        $kepuasan_mhs->save();

       
       //Token created, return with success response and jwt token
       return response()->json([ //ngirim ke front end
           'success' => true, 
           'tahun' => $request->tahun,
           'keandalan_4' => $request->keandalan_4,
           'keandalan_3' => $request->keandalan_3,
           'keandalan_2' => $request->keandalan_2,
           'keandalan_1' => $request->keandalan_1,
           'tl_keandalan' => $request->tl_keandalan,
           'dayatanggap_4' => $request->dayatanggap_4,
           'dayatanggap_3' => $request->dayatanggap_3,
           'dayatanggap_2' => $request->dayatanggap_2,
           'dayatanggap_1' => $request->dayatanggap_1,
           'tl_dayatanggap' => $request->tl_dayatanggap,
           'kepastian_4' => $request->kepastian_4,
           'kepastian_3' => $request->kepastian_3,
           'kepastian_2' => $request->kepastian_2,
           'kepastian_1' => $request->kepastian_1,
           'tl_kepastian' => $request->tl_kepastian,
           'empati_4' => $request->empati_4,
           'empati_3' => $request->empati_3,
           'empati_2' => $request->empati_2,
           'empati_1' => $request->empati_1,
           'tl_empati' => $request->tl_empati,
           'tangible_4' => $request->tangible_4,
           'tangible_3' => $request->tangible_3,
           'tangible_2' => $request->tangible_2,
           'tangible_1' => $request->tangible_1,
           'tl_tangible' => $request->tl_tangible,
           'prodi_id' => $request->prodi_id,
           'all_mhs' => Mahasiswa::all()
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
