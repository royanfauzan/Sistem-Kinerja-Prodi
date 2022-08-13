<?php

namespace App\Http\Controllers;

use App\Models\waktutunggu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WaktutungguController extends Controller
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
        $datamasastudi = $request->only('jmlh_lls_dipesan', 'jmlh_tunggu_lls_3bln', 'jmlh_tunggu_lls_6bln', 'jmlh_tunggu_lls_lebih_6bln', 'kepuasan_id');

        //valid credential
        $validator = Validator::make($datamasastudi, [
            'jmlh_lls_dipesan' => 'required',
            'jmlh_tunggu_lls_3bln' => 'required',
            'jmlh_tunggu_lls_6bln' => 'required',
            'jmlh_tunggu_lls_lebih_6bln' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datamasastudi = Waktutunggu::create(
            [
                'jmlh_lls_dipesan' => $request->jmlh_lls_dipesan,
                'jmlh_tunggu_lls_3bln' => $request->jmlh_tunggu_lls_3bln,
                'jmlh_tunggu_lls_6bln' => $request->jmlh_tunggu_lls_6bln,
                'jmlh_tunggu_lls_lebih_6bln' => $request->jmlh_tunggu_lls_lebih_6bln,
                'kepuasan_id' => $request->kepuasan_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'jmlh_lls_dipesan' => $request->jmlh_lls_dipesan,
            'jmlh_tunggu_lls_3bln' => $request->jmlh_tunggu_lls_3bln,
            'jmlh_tunggu_lls_6bln' => $request->jmlh_tunggu_lls_6bln,
            'jmlh_tunggu_lls_lebih_6bln' => $request->jmlh_tunggu_lls_lebih_6bln,
            'kepuasan_id' => $request->kepuasan_id,
            'all_prodi' => Waktutunggu::all()
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
        $waktutunggu = Waktutunggu::where('id', $id)->first();
        $datawaktutunggu = $request->only('jmlh_lls_dipesan', 'jmlh_tunggu_lls_3bln', 'jmlh_tunggu_lls_6bln', 'jmlh_tunggu_lls_lebih_6bln', 'kepuasan_id');

        //valid credential
        $validator = Validator::make($datawaktutunggu, [
            'jmlh_lls_dipesan' => 'required',
            'jmlh_tunggu_lls_3bln' => 'required',
            'jmlh_tunggu_lls_6bln' => 'required',
            'jmlh_tunggu_lls_lebih_6bln' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $waktutunggu->jmlh_lls_dipesan = $request->jmlh_lls_dipesan;
        $waktutunggu->jmlh_tunggu_lls_3bln = $request->jmlh_tunggu_lls_3bln;
        $waktutunggu->jmlh_tunggu_lls_6bln = $request->jmlh_tunggu_lls_6bln;
        $waktutunggu->jmlh_tunggu_lls_lebih_6bln = $request->jmlh_tunggu_lls_lebih_6bln;
        $waktutunggu->kepuasan_id = $request->kepuasan_id;
        $waktutunggu->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'jmlh_lls_dipesan' => $request->jmlh_lls_dipesan,
            'jmlh_tunggu_lls_3bln' => $request->jmlh_tunggu_lls_3bln,
            'jmlh_tunggu_lls_6bln' => $request->jmlh_tunggu_lls_6bln,
            'jmlh_tunggu_lls_lebih_6bln' => $request->jmlh_tunggu_lls_lebih_6bln,
            'kepuasan_id' => $request->kepuasan_id,
            'all_prodi' => Waktutunggu::all()
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
