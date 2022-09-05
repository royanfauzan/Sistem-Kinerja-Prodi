<?php

namespace App\Http\Controllers;

use App\Models\Masastudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MasastudiController extends Controller
{
    private function tahuntsgenerator($tahun, $tipe = 'biasa')
    {
        $tslist = collect();
        $thnInt = intval($tahun);
        $tslist->ts2 = '' . ($thnInt -2);
        $tslist->ts3 = '' . ($thnInt - 3);
        $tslist->ts4 = '' . ($thnInt - 4);
        
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
            'all_masastudi' => Masastudi::with('prodi')->get(),
        ]);
    }

    public function searchmasastudi($search)
    {
        return response()->json([
            'success' => true,
            'searchmasastudi' =>  Masastudi::with('prodi')
                ->whereRelation('prodi', 'prodi','LIKE', "%{$search}%")
                ->orWhereRelation('prodi','nama_prodi', 'LIKE', "%{$search}%")
                ->orwhere('tahun_masuk', 'LIKE', "%{$search}%")
                ->orwhere('jmlh_mhs', 'LIKE', "%{$search}%")
                ->orwhere('lulus_thn_1', 'LIKE', "%{$search}%")
                ->orwhere('lulus_thn_2', 'LIKE', "%{$search}%")
                ->orwhere('lulus_thn_3', 'LIKE', "%{$search}%")
                ->orwhere('lulus_thn_4', 'LIKE', "%{$search}%")
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
        $datamasastudi = $request->only('tahun_masuk', 'jmlh_mhs', 'lulus_thn_1', 'lulus_thn_2', 'lulus_thn_3', 'lulus_thn_4', 'prodi_id');

        //valid credential
        $validator = Validator::make($datamasastudi, [
            'tahun_masuk' => 'required',
            'jmlh_mhs' => 'required',
            'lulus_thn_1' => 'required',
            'lulus_thn_2' => 'required',
            'lulus_thn_3' => 'required',
            'lulus_thn_4' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $datamasastudi = Masastudi::create(
            [
                'tahun_masuk' => $request->tahun_masuk,
                'jmlh_mhs' => $request->jmlh_mhs,
                'lulus_thn_1' => $request->lulus_thn_1,
                'lulus_thn_2' => $request->lulus_thn_2,
                'lulus_thn_3' => $request->lulus_thn_3,
                'lulus_thn_4' => $request->lulus_thn_4,
                'prodi_id' => $request->prodi_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun_masuk' => $request->tahun_masuk,
            'jmlh_mhs' => $request->jmlh_mhs,
            'lulus_thn_1' => $request->lulus_thn_1,
            'lulus_thn_2' => $request->lulus_thn_2,
            'lulus_thn_3' => $request->lulus_thn_3,
            'lulus_thn_4' => $request->lulus_thn_4,
            'prodi_id' => $request->prodi_id,
            'all_masastudi' => Masastudi::all()
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
            'all_masastudi' => Masastudi::find($id),
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
        $masastudi = Masastudi::where('id', $id)->first();
        $datamasastudi = $request->only('tahun_masuk', 'jmlh_mhs', 'lulus_thn_1', 'lulus_thn_2', 'lulus_thn_3', 'lulus_thn_4', 'prodi_id');

        //valid credential
        $validator = Validator::make($datamasastudi, [
            'tahun_masuk' => 'required',
            'jmlh_mhs' => 'required',
            'lulus_thn_1' => 'required',
            'lulus_thn_2' => 'required',
            'lulus_thn_3' => 'required',
            'lulus_thn_4' => 'required',
            'prodi_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $masastudi->tahun_masuk = $request->tahun_masuk;
        $masastudi->jmlh_mhs = $request->jmlh_mhs;
        $masastudi->lulus_thn_1 = $request->lulus_thn_1;
        $masastudi->lulus_thn_2 = $request->lulus_thn_2;
        $masastudi->lulus_thn_3 = $request->lulus_thn_3;
        $masastudi->lulus_thn_4 = $request->lulus_thn_4;
        $masastudi->prodi_id = $request->prodi_id;
        $masastudi->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tahun_masuk' => $request->tahun_masuk,
            'jmlh_mhs' => $request->jmlh_mhs,
            'lulus_thn_1' => $request->lulus_thn_1,
            'lulus_thn_2' => $request->lulus_thn_2,
            'lulus_thn_3' => $request->lulus_thn_3,
            'lulus_thn_4' => $request->lulus_thn_4,
            'prodi_id' => $request->prodi_id,
            'all_masastudi' => Masastudi::all()
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
        $masastudi = Masastudi::find($id);
        $masastudi->delete();

        if (!$masastudi) {
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

    public function exportmasastudi(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $masastudits = collect([]);


        $masastudis = Masastudi::where('tahun_masuk', $tahunlist->ts2)
            ->orWhere('tahun_masuk', $tahunlist->ts3)
            ->orWhere('tahun_masuk', $tahunlist->ts4)
            ->get();

        $arrTahun = [$tahunlist->ts2, $tahunlist->ts3, $tahunlist->ts4];

        foreach ($arrTahun as $key => $th) {
            $listmasastudits = $masastudis->where('tahun_masuk', $th)->first();

            $sementara = collect(['masastudits' . $key => $listmasastudits, 'ts' => $th]);
            $masastudits->push(collect($sementara));
        }

        return response()->json([
            'success' => true,
            'all_masastudi' => $masastudis,
            'masastudi_ts' => $masastudits,
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $allmasastudi = Masastudi::all()->groupBy('tahun_masuk');
        $arrTahun = array();
        foreach ($allmasastudi as $key => $masastudithn) {
            $arrTahun[] = $masastudithn[0]->tahun_masuk;
        }
        return response()->json([
            'success' => true,
            'tahunmasastudis' => $arrTahun,
        ]);
    }
}
