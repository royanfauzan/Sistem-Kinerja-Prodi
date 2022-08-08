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
            return response()->json(['error' => $validator->errors()], 200);
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


        $penelitianDosens = Ipk::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        foreach ($arrTahun as $key => $th) {
            $listpenelitiants = $penelitianDosens->where('tahun', $th);

            $sementara = collect(['ipkts' . $key => $listpenelitiants, 'ts' => $th]);
            $penelitiants->push(collect($sementara));
        }


        return response()->json([
            'success' => true,
            'all_ipk' => $penelitianDosens,
            'penelitian_ts' => $penelitiants,
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
