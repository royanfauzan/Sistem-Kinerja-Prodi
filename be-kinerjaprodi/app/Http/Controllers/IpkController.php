<?php

namespace App\Http\Controllers;

use App\Models\Ipk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IpkController extends Controller
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
            'all_ipk' => Ipk::with('prodi')->get(),
        ]);
    }

    public function searchipk($search)
    {
        return response()->json([
            'success' => true,
            'searchipk' =>  Ipk::with('prodi')
                ->whereRelation('prodi', 'prodi','LIKE', "%{$search}%")
                ->orWhereRelation('prodi','nama_prodi', 'LIKE', "%{$search}%")
                ->orwhere('jmlh_lulusan', 'LIKE', "%{$search}%")
                ->orwhere('ipk_min', 'LIKE', "%{$search}%")
                ->orwhere('ipk_max', 'LIKE', "%{$search}%")
                ->orwhere('ipk_avg', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
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
        $dataipk = $request->only('tahun', 'jmlh_lulusan', 'ipk_max', 'ipk_avg', 'ipk_min', 'prodi_id');

        //valid credential
        $validator = Validator::make($dataipk, [
            'tahun' => 'required',
            'jmlh_lulusan' => 'required',
            'ipk_max' => 'required',
            'ipk_avg' => 'required',
            'ipk_min' => 'required',
            'prodi_id' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $dataipk = Ipk::create(
            [
                'tahun' => $request->tahun,
                'jmlh_lulusan' => $request->jmlh_lulusan,
                'ipk_min' => $request->ipk_max,
                'ipk_avg' => $request->ipk_avg,
                'ipk_max' => $request->ipk_min,
                'prodi_id' => $request->prodi_id,
            ]
        );

        if (!$dataipk) {
            return response()->json([
                'success' => false,
                'message' => "Gagal"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil"
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
            'all_ipk' => Ipk::find($id),
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
        $ipk = Ipk::where('id', $id)->first();
        $dataipk = $request->only('tahun', 'jmlh_lulusan', 'ipk_max', 'ipk_avg', 'ipk_min', 'prodi_id');

        //valid credential
        $validator = Validator::make($dataipk, [
            'tahun' => 'required',
            'jmlh_lulusan' => 'required',
            'ipk_max' => 'required',
            'ipk_avg' => 'required',
            'ipk_min' => 'required',
            'prodi_id' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $ipk->tahun = $request->tahun;
        $ipk->jmlh_lulusan = $request->jmlh_lulusan;
        $ipk->ipk_min = $request->ipk_min;
        $ipk->ipk_avg = $request->ipk_avg;
        $ipk->ipk_max = $request->ipk_max;
        $ipk->prodi_id = $request->prodi_id;
        $ipk->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun' => $request->tahun,
            'jmlh_lulusan' => $request->jmlh_lulusan,
            'ipk_min' => $request->ipk_max,
            'ipk_avg' => $request->ipk_avg,
            'ipk_max' => $request->ipk_min,
            'prodi_id' => $request->prodi_id,
            'all_prodi' => Ipk::all()
        ]);
    }

    public function exportpendos(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $penelitiants = collect([]);


        $ipks = Ipk::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        foreach ($arrTahun as $key => $th) {
            $listpenelitiants = $ipks->where('tahun', $th)->first();

            $sementara = collect(['ipkts' . $key => $listpenelitiants, 'ts' => $th]);
            $penelitiants->push(collect($sementara));
        }

        return response()->json([
            'success' => true,
            'all_ipk' => $ipks,
            'penelitian_ts' => $penelitiants,
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $allipk = Ipk::all()->groupBy('tahun');
        $arrTahun = array();
        foreach ($allipk as $key => $ipkthn) {
            $arrTahun[] = $ipkthn[0]->tahun;
        }
        return response()->json([
            'success' => true,
            'tahunipks' => $arrTahun,
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
        $ipk = Ipk::find($id);
        $ipk->delete();

        if (!$ipk) {
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
