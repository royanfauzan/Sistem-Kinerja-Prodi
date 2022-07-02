<?php

namespace App\Http\Controllers;

use App\Models\Presentase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PresentaseController extends Controller
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
        $datapresentase = $request->only(
            'etika_4',
            'etika_3',
            'etika_2',
            'etika_1',
            'tindak_etika',
            'keahlian_bidang_4',
            'keahlian_bidang_3',
            'keahlian_bidang_2',
            'keahlian_bidang_1',
            'tindak_bidang',
            'bhs_asing_4',
            'bhs_asing_3',
            'bhs_asing_2',
            'bhs_asing_1',
            'tindak_bhs',
            'penggunaan_ti_4',
            'penggunaan_ti_3',
            'penggunaan_ti_2',
            'penggunaan_ti_1',
            'tindak_ti',
            'komunikasi_4',
            'komunikasi_3',
            'komunikasi_2',
            'komunikasi_1',
            'tindak_komunikasi',
            'kerjasama_4',
            'kerjasama_3',
            'kerjasama_2',
            'kerjasama_1',
            'tindak_kerjasama',
            'pengembangan_diri_4',
            'pengembangan_diri_3',
            'pengembangan_diri_2',
            'pengembangan_diri_1',
            'tindak_pengembangan',
            'kepuasan_id'
        );

        //valid credential
        $validator = Validator::make($datapresentase, [
            'etika_4' => 'required',
            'etika_3' => 'required',
            'etika_2' => 'required',
            'etika_1' => 'required',
            'tindak_etika' => 'required',
            'keahlian_bidang_4' => 'required',
            'keahlian_bidang_3' => 'required',
            'keahlian_bidang_2' => 'required',
            'keahlian_bidang_1' => 'required',
            'tindak_bidang' => 'required',
            'bhs_asing_4' => 'required',
            'bhs_asing_3' => 'required',
            'bhs_asing_2' => 'required',
            'bhs_asing_1' => 'required',
            'tindak_bhs' => 'required',
            'penggunaan_ti_4' => 'required',
            'penggunaan_ti_3' => 'required',
            'penggunaan_ti_2' => 'required',
            'penggunaan_ti_1' => 'required',
            'tindak_ti' => 'required',
            'komunikasi_4' => 'required',
            'komunikasi_3' => 'required',
            'komunikasi_2' => 'required',
            'komunikasi_1' => 'required',
            'tindak_komunikasi' => 'required',
            'kerjasama_4' => 'required',
            'kerjasama_3' => 'required',
            'kerjasama_2' => 'required',
            'kerjasama_1' => 'required',
            'tindak_kerjasama' => 'required',
            'pengembangan_diri_4' => 'required',
            'pengembangan_diri_3' => 'required',
            'pengembangan_diri_2' => 'required',
            'pengembangan_diri_1' => 'required',
            'tindak_pengembangan' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datapresentase = Presentase::create(
            [
                'etika_4' => $request->etika_4,
                'etika_3' => $request->etika_3,
                'etika_2' => $request->etika_2,
                'etika_1' => $request->etika_1,
                'tindak_etika' => $request->tindak_etika,
                'keahlian_bidang_4' => $request->keahlian_bidang_4,
                'keahlian_bidang_3' => $request->keahlian_bidang_3,
                'keahlian_bidang_2' => $request->keahlian_bidang_2,
                'keahlian_bidang_1' => $request->keahlian_bidang_1,
                'tindak_bidang' => $request->tindak_bidang,
                'bhs_asing_4' => $request->bhs_asing_4,
                'bhs_asing_3' => $request->bhs_asing_3,
                'bhs_asing_2' => $request->bhs_asing_2,
                'bhs_asing_1' => $request->bhs_asing_1,
                'tindak_bhs' => $request->tindak_bhs,
                'penggunaan_ti_4' => $request->penggunaan_ti_4,
                'penggunaan_ti_3' => $request->penggunaan_ti_3,
                'penggunaan_ti_2' => $request->penggunaan_ti_2,
                'penggunaan_ti_1' => $request->penggunaan_ti_1,
                'tindak_ti' => $request->tindak_ti,
                'komunikasi_4' => $request->komunikasi_4,
                'komunikasi_3' => $request->komunikasi_3,
                'komunikasi_2' => $request->komunikasi_2,
                'komunikasi_1' => $request->komunikasi_1,
                'tindak_komunikasi' => $request->tindak_komunikasi,
                'kerjasama_4' => $request->kerjasama_4,
                'kerjasama_3' => $request->kerjasama_3,
                'kerjasama_2' => $request->kerjasama_2,
                'kerjasama_1' => $request->kerjasama_1,
                'tindak_kerjasama' => $request->tindak_kerjasama,
                'pengembangan_diri_4' => $request->pengembangan_diri_4,
                'pengembangan_diri_3' => $request->pengembangan_diri_3,
                'pengembangan_diri_2' => $request->pengembangan_diri_2,
                'pengembangan_diri_1' => $request->pengembangan_diri_1,
                'tindak_pengembangan' => $request->tindak_pengembangan,
                'kepuasan_id' => $request->kepuasan_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'etika_4' => $request->etika_4,
            'etika_3' => $request->etika_3,
            'etika_2' => $request->etika_2,
            'etika_1' => $request->etika_1,
            'tindak_etika' => $request->tindak_etika,
            'keahlian_bidang_4' => $request->keahlian_bidang_4,
            'keahlian_bidang_3' => $request->keahlian_bidang_3,
            'keahlian_bidang_2' => $request->keahlian_bidang_2,
            'keahlian_bidang_1' => $request->keahlian_bidang_1,
            'tindak_bidang' => $request->tindak_bidang,
            'bhs_asing_4' => $request->bhs_asing_4,
            'bhs_asing_3' => $request->bhs_asing_3,
            'bhs_asing_2' => $request->bhs_asing_2,
            'bhs_asing_1' => $request->bhs_asing_1,
            'tindak_bhs' => $request->tindak_bhs,
            'penggunaan_ti_4' => $request->penggunaan_ti_4,
            'penggunaan_ti_3' => $request->penggunaan_ti_3,
            'penggunaan_ti_2' => $request->penggunaan_ti_2,
            'penggunaan_ti_1' => $request->penggunaan_ti_1,
            'tindak_ti' => $request->tindak_ti,
            'komunikasi_4' => $request->komunikasi_4,
            'komunikasi_3' => $request->komunikasi_3,
            'komunikasi_2' => $request->komunikasi_2,
            'komunikasi_1' => $request->komunikasi_1,
            'tindak_komunikasi' => $request->tindak_komunikasi,
            'kerjasama_4' => $request->kerjasama_4,
            'kerjasama_3' => $request->kerjasama_3,
            'kerjasama_2' => $request->kerjasama_2,
            'kerjasama_1' => $request->kerjasama_1,
            'tindak_kerjasama' => $request->tindak_kerjasama,
            'pengembangan_diri_4' => $request->pengembangan_diri_4,
            'pengembangan_diri_3' => $request->pengembangan_diri_3,
            'pengembangan_diri_2' => $request->pengembangan_diri_2,
            'pengembangan_diri_1' => $request->pengembangan_diri_1,
            'tindak_pengembangan' => $request->tindak_pengembangan,
            'kepuasan_id' => $request->kepuasan_id,
            'all_tabel' => Presentase::all()
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
        $presentase = Presentase::where('id', $id)->first();
        $datapresentase = $request->only(
            'etika_4',
            'etika_3',
            'etika_2',
            'etika_1',
            'tindak_etika',
            'keahlian_bidang_4',
            'keahlian_bidang_3',
            'keahlian_bidang_2',
            'keahlian_bidang_1',
            'tindak_bidang',
            'bhs_asing_4',
            'bhs_asing_3',
            'bhs_asing_2',
            'bhs_asing_1',
            'tindak_bhs',
            'penggunaan_ti_4',
            'penggunaan_ti_3',
            'penggunaan_ti_2',
            'penggunaan_ti_1',
            'tindak_ti',
            'komunikasi_4',
            'komunikasi_3',
            'komunikasi_2',
            'komunikasi_1',
            'tindak_komunikasi',
            'kerjasama_4',
            'kerjasama_3',
            'kerjasama_2',
            'kerjasama_1',
            'tindak_kerjasama',
            'pengembangan_diri_4',
            'pengembangan_diri_3',
            'pengembangan_diri_2',
            'pengembangan_diri_1',
            'tindak_pengembangan',
            'kepuasan_id'
        );

        //valid credential
        $validator = Validator::make($datapresentase, [
            'etika_4' => 'required',
            'etika_3' => 'required',
            'etika_2' => 'required',
            'etika_1' => 'required',
            'tindak_etika' => 'required',
            'keahlian_bidang_4' => 'required',
            'keahlian_bidang_3' => 'required',
            'keahlian_bidang_2' => 'required',
            'keahlian_bidang_1' => 'required',
            'tindak_bidang' => 'required',
            'bhs_asing_4' => 'required',
            'bhs_asing_3' => 'required',
            'bhs_asing_2' => 'required',
            'bhs_asing_1' => 'required',
            'tindak_bhs' => 'required',
            'penggunaan_ti_4' => 'required',
            'penggunaan_ti_3' => 'required',
            'penggunaan_ti_2' => 'required',
            'penggunaan_ti_1' => 'required',
            'tindak_ti' => 'required',
            'komunikasi_4' => 'required',
            'komunikasi_3' => 'required',
            'komunikasi_2' => 'required',
            'komunikasi_1' => 'required',
            'tindak_komunikasi' => 'required',
            'kerjasama_4' => 'required',
            'kerjasama_3' => 'required',
            'kerjasama_2' => 'required',
            'kerjasama_1' => 'required',
            'tindak_kerjasama' => 'required',
            'pengembangan_diri_4' => 'required',
            'pengembangan_diri_3' => 'required',
            'pengembangan_diri_2' => 'required',
            'pengembangan_diri_1' => 'required',
            'tindak_pengembangan' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $presentase->etika_4 = $request->etika_4;
        $presentase->etika_3 = $request->etika_3;
        $presentase->etika_2 = $request->etika_2;
        $presentase->etika_1 = $request->etika_1;
        $presentase->tindak_etika = $request->tindak_etika;
        $presentase->keahlian_bidang_4 = $request->keahlian_bidang_4;
        $presentase->keahlian_bidang_3 = $request->keahlian_bidang_3;
        $presentase->keahlian_bidang_2 = $request->keahlian_bidang_2;
        $presentase->keahlian_bidang_1 = $request->keahlian_bidang_1;
        $presentase->tindak_bidang = $request->tindak_bidang;
        $presentase->bhs_asing_4 = $request->bhs_asing_4;
        $presentase->bhs_asing_3 = $request->bhs_asing_3;
        $presentase->bhs_asing_2 = $request->bhs_asing_2;
        $presentase->bhs_asing_1 = $request->bhs_asing_1;
        $presentase->tindak_bhs = $request->tindak_bhs;
        $presentase->penggunaan_ti_4 = $request->penggunaan_ti_4;
        $presentase->penggunaan_ti_3 = $request->penggunaan_ti_3;
        $presentase->penggunaan_ti_2 = $request->penggunaan_ti_2;
        $presentase->penggunaan_ti_1 = $request->penggunaan_ti_1;
        $presentase->tindak_ti = $request->tindak_ti;
        $presentase->komunikasi_4 = $request->komunikasi_4;
        $presentase->komunikasi_3 = $request->komunikasi_3;
        $presentase->komunikasi_2 = $request->komunikasi_2;
        $presentase->komunikasi_1 = $request->komunikasi_1;
        $presentase->tindak_komunikasi = $request->tindak_komunikasi;
        $presentase->kerjasama_4 = $request->kerjasama_4;
        $presentase->kerjasama_3 = $request->kerjasama_3;
        $presentase->kerjasama_2 = $request->kerjasama_2;
        $presentase->kerjasama_1 = $request->kerjasama_1;
        $presentase->tindak_kerjasama = $request->tindak_kerjasama;
        $presentase->pengembangan_diri_4 = $request->pengembangan_diri_4;
        $presentase->pengembangan_diri_3 = $request->pengembangan_diri_3;
        $presentase->pengembangan_diri_2 = $request->pengembangan_diri_2;
        $presentase->pengembangan_diri_1 = $request->pengembangan_diri_1;
        $presentase->tindak_pengembangan = $request->tindak_pengembangan;
        $presentase->kepuasan_id = $request->kepuasan_id;
        $presentase->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'etika_4' => $request->etika_4,
            'etika_3' => $request->etika_3,
            'etika_2' => $request->etika_2,
            'etika_1' => $request->etika_1,
            'tindak_etika' => $request->tindak_etika,
            'keahlian_bidang_4' => $request->keahlian_bidang_4,
            'keahlian_bidang_3' => $request->keahlian_bidang_3,
            'keahlian_bidang_2' => $request->keahlian_bidang_2,
            'keahlian_bidang_1' => $request->keahlian_bidang_1,
            'tindak_bidang' => $request->tindak_bidang,
            'bhs_asing_4' => $request->bhs_asing_4,
            'bhs_asing_3' => $request->bhs_asing_3,
            'bhs_asing_2' => $request->bhs_asing_2,
            'bhs_asing_1' => $request->bhs_asing_1,
            'tindak_bhs' => $request->tindak_bhs,
            'penggunaan_ti_4' => $request->penggunaan_ti_4,
            'penggunaan_ti_3' => $request->penggunaan_ti_3,
            'penggunaan_ti_2' => $request->penggunaan_ti_2,
            'penggunaan_ti_1' => $request->penggunaan_ti_1,
            'tindak_ti' => $request->tindak_ti,
            'komunikasi_4' => $request->komunikasi_4,
            'komunikasi_3' => $request->komunikasi_3,
            'komunikasi_2' => $request->komunikasi_2,
            'komunikasi_1' => $request->komunikasi_1,
            'tindak_komunikasi' => $request->tindak_komunikasi,
            'kerjasama_4' => $request->kerjasama_4,
            'kerjasama_3' => $request->kerjasama_3,
            'kerjasama_2' => $request->kerjasama_2,
            'kerjasama_1' => $request->kerjasama_1,
            'tindak_kerjasama' => $request->tindak_kerjasama,
            'pengembangan_diri_4' => $request->pengembangan_diri_4,
            'pengembangan_diri_3' => $request->pengembangan_diri_3,
            'pengembangan_diri_2' => $request->pengembangan_diri_2,
            'pengembangan_diri_1' => $request->pengembangan_diri_1,
            'tindak_pengembangan' => $request->tindak_pengembangan,
            'kepuasan_id' => $request->kepuasan_id,
            'all_tabel' => Presentase::all()
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
