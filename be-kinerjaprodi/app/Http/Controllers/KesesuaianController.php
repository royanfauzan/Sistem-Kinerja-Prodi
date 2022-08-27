<?php

namespace App\Http\Controllers;

use App\Models\Kasesuaian;
use App\Models\KP_lulus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KesesuaianController extends Controller
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
            'all_kesesuaian' => Kasesuaian::with('kepuasan')->get(),
        ]);
    }

    public function searchbidang($search)
    {
        return response()->json([
            'success' => true,
            'searchbidang' =>  Kasesuaian::with('kepuasan')
                ->whereRelation('kepuasan', 'tahun','LIKE', "%{$search}%")
                ->orwhere('rendah', 'LIKE', "%{$search}%")
                ->orwhere('sedang', 'LIKE', "%{$search}%")
                ->orwhere('tinggi', 'LIKE', "%{$search}%")
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
        $datakesesuaian = $request->only('rendah', 'jmlh_lulusan', 'sedang', 'tinggi', 'kepuasan_id');

        //valid credential
        $validator = Validator::make($datakesesuaian, [
            'rendah' => 'required',
            'sedang' => 'required',
            'tinggi' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $datakesesuaian = Kasesuaian::with('kepuasan')->create(
            [
                'rendah'=> $request->rendah,
                'sedang' => $request->sedang,
                'tinggi' => $request->tinggi,
                'kepuasan_id' => $request->kepuasan_id
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'rendah' => $request->rendah,
            'sedang' => $request->sedang,
            'tinggi' => $request->tinggi,
            'kepuasan_id' => $request->kepuasan_id,
            'all_kesesuaian' => Kasesuaian::all()
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
            'all_kesesuaian' => Kasesuaian::find($id),
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
        $kesesuaian = Kasesuaian::where('id', $id)->first();
        $datakesesuaian = $request->only('rendah', 'sedang', 'tinggi', 'kepuasan_id');

        //valid credential
        $validator = Validator::make($datakesesuaian, [
            'rendah' => 'required',
            'sedang' => 'required',
            'tinggi' => 'required',
            'kepuasan_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $kesesuaian->rendah = $request->rendah;
        $kesesuaian->sedang = $request->sedang;
        $kesesuaian->tinggi = $request->tinggi;
        $kesesuaian->kepuasan_id = $request->kepuasan_id;
        $kesesuaian->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'rendah' => $request->rendah,
            'sedang' => $request->sedang,
            'tinggi' => $request->tinggi,
            'kepuasan_id' => $request->kepuasan_id,
            'all_kesesuaian' => Kasesuaian::all()
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
        $kesesuaian = Kasesuaian::find($id);
        $kesesuaian->delete();

        if (!$kesesuaian) {
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

    public function exportbidang(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $bidangts = collect([]);


        $bidangs = KP_lulus::with('kesesuaian')->where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        foreach ($arrTahun as $key => $th) {
            $listbidangts = $bidangs->where('tahun', $th)->first();

            $sementara = collect(['bidangts' . $key => $listbidangts, 'ts' => $th]);
            $bidangts->push(collect($sementara));
        }

        return response()->json([
            'success' => true,
            'all_bidang' => $bidangs,
            'bidang_ts' => $bidangts,
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $allbidang = KP_lulus::all()->groupBy('tahun');
        $arrTahun = array();
        foreach ($allbidang as $key => $bidangthn) {
            $arrTahun[] = $bidangthn[0]->tahun;
        }
        return response()->json([
            'success' => true,
            'tahunbidangs' => $arrTahun,
        ]);
    }
}
