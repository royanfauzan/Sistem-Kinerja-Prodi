<?php

namespace App\Http\Controllers;

use App\Models\Tempat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempatController extends Controller
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
        $datatempat = $request->only('lokal', 'nasional', 'multinasional', 'kepuasan_id');

        //valid credential
        $validator = Validator::make($datatempat, [
            'lokal' => 'required',
            'nasional' => 'required',
            'multinasional' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datatempat = Tempat::create(
            [
                'lokal' => $request->lokal,
                'nasional' => $request->nasional,
                'multinasional' => $request->multinasional,
                'kepuasan_id' => $request->kepuasan_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'lokal' => $request->lokal,
            'nasional' => $request->nasional,
            'multinasional' => $request->multinasional,
            'kepuasan_id' => $request->kepuasan_id,
            'all_prodi' => Tempat::all()
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
        $tempat = Tempat::where('id', $id)->first();
        $datatempat = $request->only('lokal', 'nasional', 'multinasional', 'kepuasan_id');


        // valid credential
        $validator = Validator::make($datatempat, [
            'lokal' => 'required',
            'nasional' => 'required',
            'multinasional' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $tempat->lokal = $request->lokal;
        $tempat->nasional = $request->nasional;
        $tempat->multinasional = $request->multinasional;
        $tempat->kepuasan_id = $request->kepuasan_id;
        $tempat->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'lokal' => $request->lokal,
            'nasional' => $request->nasional,
            'multinasional' => $request->multinasional,
            'kepuasan_id' => $request->kepuasan_id,
            'all_prodi' => Tempat::all()
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
