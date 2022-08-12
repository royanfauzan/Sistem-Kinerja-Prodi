<?php

namespace App\Http\Controllers;

use App\Models\KP_lulus;
use App\Models\Tempat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempatController extends Controller
{
    private function tahuntsgenerator($tahun, $tipe = 'biasa')
    {
        $tslist = collect();
        $thnInt = intval($tahun);
        $tslist->ts = '' . ($thnInt);
        $tslist->ts1 = '' . ($thnInt - 1);
        $tslist->ts2 = '' . ($thnInt - 2);

        if (!strcmp($tipe, 'akademik')) {
            $tslist->ts = "" . ($thnInt - 1) . "/" . ($thnInt);
            $tslist->ts1 = "" . ($thnInt - 2) . "/" . ($thnInt - 1);
            $tslist->ts2 = "" . ($thnInt - 3) . "/" . ($thnInt - 2);
        }
        return $tslist;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'all_tempat' => Tempat::with('kepuasan')->get(),
        ]);
    }

    public function searchtempat($search)
    {
        return response()->json([
            'success' => true,
            'searchtempat' =>  Tempat::with('kepuasan')
                ->whereRelation('kepuasan', 'tahun','LIKE', "%{$search}%")
                ->orwhere('lokal', 'LIKE', "%{$search}%")
                ->orwhere('nasional', 'LIKE', "%{$search}%")
                ->orwhere('multinasional', 'LIKE', "%{$search}%")
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
            return response()->json(['error' => $validator->errors()], 400);
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
            'all_tempat' => Tempat::all()
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
            'all_tempat' => Tempat::find($id),
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
            'all_tempat' => Tempat::all()
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
        $prestasi = Tempat::find($id);
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

    public function exporttempat(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $tempatts = collect([]);


        $tempats = KP_lulus::with('tempat')->where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        foreach ($arrTahun as $key => $th) {
            $listtempatts = $tempats->where('tahun', $th)->first();

            $sementara = collect(['tempatts' . $key => $listtempatts, 'ts' => $th]);
            $tempatts->push(collect($sementara));
        }

        return response()->json([
            'success' => true,
            'all_tempat' => $tempats,
            'tempat_ts' => $tempatts,
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $alltempat = KP_lulus::all()->groupBy('tahun');
        $arrTahun = array();
        foreach ($alltempat as $key => $tempatthn) {
            $arrTahun[] = $tempatthn[0]->tahun;
        }
        return response()->json([
            'success' => true,
            'tahuntempats' => $arrTahun,
        ]);
    }
}
