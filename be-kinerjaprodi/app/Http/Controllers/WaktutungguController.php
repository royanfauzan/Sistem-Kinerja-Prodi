<?php

namespace App\Http\Controllers;

use App\Models\KP_lulus;
use App\Models\waktutunggu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WaktutungguController extends Controller
{
    private function tahuntsgenerator($tahun, $tipe = 'biasa')
    {
        $tslist = collect();
        $thnInt = intval($tahun);
        $tslist->ts2 = '' . ($thnInt - 2);
        $tslist->ts3 = '' . ($thnInt - 3);
        $tslist->ts4 = '' . ($thnInt - 4);

       
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
            'all_waktu' => Waktutunggu::with('kepuasan')->get(),
        ]);
    }

    public function searchwaktutunggu($search)
    {
        return response()->json([
            'success' => true,
            'searchwaktu' =>  Waktutunggu::with('kepuasan')
                ->whereRelation('kepuasan', 'tahun','LIKE', "%{$search}%")
                ->orwhere('jmlh_lls_dipesan', 'LIKE', "%{$search}%")
                ->orwhere('jmlh_tunggu_lls_3bln', 'LIKE', "%{$search}%")
                ->orwhere('jmlh_tunggu_lls_6bln', 'LIKE', "%{$search}%")
                ->orwhere('jmlh_tunggu_lls_lebih_6bln', 'LIKE', "%{$search}%")
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
            return response()->json(['error' => $validator->errors()], 400);
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
            'all_waktu' => Waktutunggu::all()
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
            'all_waktu' => Waktutunggu::find($id),
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
            'all_waktu' => Waktutunggu::all()
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
        $waktutunggu = Waktutunggu::find($id);
        $waktutunggu->delete();

        if (!$waktutunggu) {
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

    public function exportwaktutunggu(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $waktuts = collect([]);


        $waktus = KP_lulus::with('waktu')->where('tahun', $tahunlist->ts2)
            ->orWhere('tahun', $tahunlist->ts3)
            ->orWhere('tahun', $tahunlist->ts4)
            ->get();

        $arrTahun = [$tahunlist->ts2, $tahunlist->ts3, $tahunlist->ts4];

        foreach ($arrTahun as $key => $th) {
            $listwaktuts = $waktus->where('tahun', $th)->first();

            $sementara = collect(['waktuts' . $key => $listwaktuts, 'ts' => $th]);
            $waktuts->push(collect($sementara));
        }

        return response()->json([
            'success' => true,
            'all_waktu' => $waktus,
            'waktu_ts' => $waktuts,
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $allwaktu = KP_lulus::all()->groupBy('tahun');
        $arrTahun = array();
        foreach ($allwaktu as $key => $waktuthn) {
            $arrTahun[] = $waktuthn[0]->tahun;
        }
        return response()->json([
            'success' => true,
            'tahunwaktus' => $arrTahun,
        ]);
    }
}
