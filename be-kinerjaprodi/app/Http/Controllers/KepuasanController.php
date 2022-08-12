<?php

namespace App\Http\Controllers;

use App\Models\KP_lulus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KepuasanController extends Controller
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
            'all_prodi' => KP_lulus::with('prodi')->get(),
        ]);
    }

    public function searchkepuasan($search)
    {
        return response()->json([
            'success' => true,
            'searchkepuasan' =>  KP_lulus::with('prodi')
                ->whereRelation('prodi', 'prodi','LIKE', "%{$search}%")
                ->orWhereRelation('prodi', 'nama_prodi','LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('jmlh_lulusan', 'LIKE', "%{$search}%")
                ->orwhere('jmlh_terlacak', 'LIKE', "%{$search}%")
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
        $datakepuasan = $request->only('tahun', 'jmlh_lulusan', 'jmlh_terlacak', 'prodi_id');

        //valid credential
        $validator = Validator::make($datakepuasan, [
            'tahun' => 'required',
            'jmlh_lulusan' => 'required',
            'jmlh_terlacak' => 'required',
            'prodi_id' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $datakepuasan = KP_lulus::create(
            [
                'tahun' => $request->tahun,
                'jmlh_lulusan' => $request->jmlh_lulusan,
                'jmlh_terlacak' => $request->jmlh_terlacak,
                'prodi_id' => $request->prodi_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'jmlh_lulusan' => $request->jmlh_lulusan,
            'jmlh_terlacak' => $request->jmlh_terlacak,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => KP_lulus::all()
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
            'all_kepuasan' => KP_lulus::find($id),
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
        $kepuasan = KP_lulus::where('id', $id)->first();
        $datakepuasan = $request->only('tahun', 'jmlh_lulusan', 'jmlh_terlacak', 'prodi_id');

        //valid credential
        $validator = Validator::make($datakepuasan, [
            'tahun' => 'required',
            'jmlh_lulusan' => 'required',
            'jmlh_terlacak' => 'required',
            'prodi_id' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $kepuasan->tahun = $request->tahun;
        $kepuasan->jmlh_lulusan = $request->jmlh_lulusan;
        $kepuasan->jmlh_terlacak = $request->jmlh_terlacak;
        $kepuasan->prodi_id = $request->prodi_id;
        $kepuasan->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'jmlh_lulusan' => $request->jmlh_lulusan,
            'jmlh_terlacak' => $request->jmlh_terlacak,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => KP_lulus::all()
        ]);
    }


    // public function listtahun(Request $request)
    // {
    //     //
    //     $allewmps = Ewmp::all()->groupBy('tahun_akademik');
    //     $arrTahun = array();
    //     foreach ($allewmps as $key => $ewmp) {
    //         $arrTahun[] = $ewmp[0]->tahun_akademik;
    //     }
    //     return response()->json([
    //         'success' => true,
    //         'tahunewmps' => $arrTahun,
    //     ]);
    // }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $prestasi = KP_lulus::find($id);
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

    public function exportkepuasan(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $kepuasants = collect([]);


        $kepuasans = KP_lulus::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        foreach ($arrTahun as $key => $th) {
            $listkepuasants = $kepuasans->where('tahun', $th)->first();

            $sementara = collect(['kepuasants' . $key => $listkepuasants, 'ts' => $th]);
            $kepuasants->push(collect($sementara));
        }

        return response()->json([
            'success' => true,
            'all_kepuasan' => $kepuasans,
            'kepuasan_ts' => $kepuasants,
        ]);
    }

    public function listtahunkepuasan(Request $request)
    {
        //
        $allkepuasan = KP_lulus::all()->groupBy('tahun');
        $arrTahun = array();
        foreach ($allkepuasan as $key => $kepuasanthn) {
            $arrTahun[] = $kepuasanthn[0]->tahun;
        }
        return response()->json([
            'success' => true,
            'tahunkepuasans' => $arrTahun,
        ]);
    }

}
