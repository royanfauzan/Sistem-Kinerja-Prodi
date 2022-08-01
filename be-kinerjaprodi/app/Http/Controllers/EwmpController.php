<?php

namespace App\Http\Controllers;

use App\Models\Ewmp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class EwmpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //

        $idsDosens=Ewmp::select('profil_dosen_id')->where('tahun_akademik','2020/2021')->get();
        $iddoss = array();
        foreach($idsDosens as $idsDosen){
            $iddoss[]=$idsDosen->profil_dosen_id;
        }

        $iddoss=array_unique($iddoss);

        $allewmps = Ewmp::with('profilDosen')->where('tahun_akademik','2020/2021')->get()->groupBy('profil_dosen_id');

        // $hitunganewmp = collect([]);
        // $hitungIndex = 0;
        // $index = 0;
        // $previddosen=$allewmp[0]->profil_dosen_id;


        $hitunganewmp = collect([]);
        $index = 0;
        $insideCounter=array();
        foreach($allewmps as $emps){
            $total = 0;
            $collectewmp = $emps[0];
            $collectewmp->profil_dosen = $emps[0]->profil_dosen;
            $sks_ps_akreditasi = 0;
            $sks_ps_lain_pt = 0;
            $sks_ps_luar_pt = 0;
            $sks_penelitian = 0;
            $sks_pengabdian = 0;
            $sks_tugas = 0;
            foreach ($emps as $key => $emp) {
                $sks_ps_akreditasi += $emp->sks_ps_akreditasi;
                $sks_ps_lain_pt += $emp->sks_ps_lain_pt;
                $sks_ps_luar_pt += $emp->sks_ps_luar_pt;
                $sks_penelitian += $emp->sks_penelitian;
                $sks_pengabdian += $emp->sks_pengabdian;
                $sks_tugas += $emp->sks_tugas;
            }
            
            $collectewmp->sks_ps_akreditasi = $sks_ps_akreditasi;
            $collectewmp->sks_ps_lain_pt = $sks_ps_lain_pt;
            $collectewmp->sks_ps_luar_pt = $sks_ps_luar_pt;
            $collectewmp->sks_penelitian = $sks_penelitian;
            $collectewmp->sks_pengabdian = $sks_pengabdian;
            $collectewmp->sks_tugas = $sks_tugas;

            $total = $collectewmp->sks_ps_akreditasi+$collectewmp->sks_ps_lain_pt+$collectewmp->sks_ps_luar_pt+$collectewmp->sks_penelitian+$collectewmp->sks_pengabdian+$collectewmp->sks_tugas;

            $avg = $total/2;
            $collectewmp->total = $total;
            $collectewmp->avg = $avg;
            $hitunganewmp->push($collectewmp);
            $index++;
        }

        // $index = 0;
        // foreach($allewmp as $emp){
        //     $total = 0;
        //     $total = $emp->sks_ps_akreditasi+$emp->sks_ps_lain_pt+$emp->sks_ps_luar_pt+$emp->sks_penelitian+$emp->sks_pengabdian+$emp->sks_tugas;
        //     $avg = $total/2;
        //     $allewmp[$index]->total = $total;
        //     $allewmp[$index]->avg = $avg;
        //     $index++;
        // }


        return response()->json([
            'success' => true,
            'ewmp' => $hitunganewmp,
            'insd' => $insideCounter,
            'luar' => $index,
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
        //
        $user = JWTAuth::parseToken()->authenticate();
        $dosenId = null;
        if ($user->profilDosen) {
            $dosenId=$user->profilDosen->id;
        }else{
            $dosenId = $request->dosenId;
        }

        $data = $request->only('dtps','tahun_akademik', 'semester', 'sks_ps_akreditasi', 'sks_ps_lain_pt', 'sks_ps_luar_pt', 'sks_penelitian', 'sks_pengabdian', 'sks_tugas');
        $validator = Validator::make($data, [
            'dtps'=>'sometimes|boolean',
            'tahun_akademik'=>'required|string',
            'semester'=>"required|string",
            'sks_ps_akreditasi'=>"sometimes|numeric",
            'sks_ps_lain_pt'=>"sometimes|numeric",
            'sks_ps_luar_pt'=>"sometimes|numeric",
            'sks_penelitian'=>"sometimes|numeric",
            'sks_pengabdian'=>"sometimes|numeric",
            'sks_tugas'=>"sometimes|numeric",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        $Ewmp = Ewmp::create([
            'tahun_akademik'=>$request->tahun_akademik,
            'semester'=>$request->semester,
            'profil_dosen_id'=>$dosenId,
        ]);

        if (isset($request->dtps)) {
            $Ewmp->dtps = $request->dtps;
        }

        if (isset($request->sks_ps_akreditasi)) {
            $Ewmp->sks_ps_akreditasi = $request->sks_ps_akreditasi;
        }

        if (isset($request->sks_ps_lain_pt)) {
            $Ewmp->sks_ps_lain_pt = $request->sks_ps_lain_pt;
        }

        if (isset($request->sks_ps_luar_pt)) {
            $Ewmp->sks_ps_luar_pt = $request->sks_ps_luar_pt;
        }

        if (isset($request->sks_penelitian)) {
            $Ewmp->sks_penelitian = $request->sks_penelitian;
        }

        if (isset($request->sks_pengabdian)) {
            $Ewmp->sks_pengabdian = $request->sks_pengabdian;
        }

        if (isset($request->sks_tugas)) {
            $Ewmp->sks_tugas = $request->sks_tugas;
        }

        $Ewmp->save();

        return response()->json([
            'success' => true,
            'ewmp' => $Ewmp,
            'dosenId'=> $dosenId
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
        //
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


    public function exportewmp(Request $request,$tahun)
    {
        $tahunint = intval($tahun);
        $tahun = "".($tahunint-1)."/".($tahunint);
        $idsDosens=Ewmp::select('profil_dosen_id')->where('tahun_akademik',$tahun)->get();
        $iddoss = array();
        foreach($idsDosens as $idsDosen){
            $iddoss[]=$idsDosen->profil_dosen_id;
        }

        $iddoss=array_unique($iddoss);

        $allewmps = Ewmp::with('profilDosen')->where('tahun_akademik',$tahun)->get()->groupBy('profil_dosen_id');

        // $hitunganewmp = collect([]);
        // $hitungIndex = 0;
        // $index = 0;
        // $previddosen=$allewmp[0]->profil_dosen_id;


        $hitunganewmp = collect([]);
        $index = 0;
        $insideCounter=array();
        foreach($allewmps as $emps){
            $total = 0;
            $collectewmp = $emps[0];
            $collectewmp->profil_dosen = $emps[0]->profil_dosen;
            $sks_ps_akreditasi = 0;
            $sks_ps_lain_pt = 0;
            $sks_ps_luar_pt = 0;
            $sks_penelitian = 0;
            $sks_pengabdian = 0;
            $sks_tugas = 0;
            foreach ($emps as $key => $emp) {
                $sks_ps_akreditasi += $emp->sks_ps_akreditasi;
                $sks_ps_lain_pt += $emp->sks_ps_lain_pt;
                $sks_ps_luar_pt += $emp->sks_ps_luar_pt;
                $sks_penelitian += $emp->sks_penelitian;
                $sks_pengabdian += $emp->sks_pengabdian;
                $sks_tugas += $emp->sks_tugas;
            }
            
            $collectewmp->sks_ps_akreditasi = $sks_ps_akreditasi;
            $collectewmp->sks_ps_lain_pt = $sks_ps_lain_pt;
            $collectewmp->sks_ps_luar_pt = $sks_ps_luar_pt;
            $collectewmp->sks_penelitian = $sks_penelitian;
            $collectewmp->sks_pengabdian = $sks_pengabdian;
            $collectewmp->sks_tugas = $sks_tugas;

            $total = $collectewmp->sks_ps_akreditasi+$collectewmp->sks_ps_lain_pt+$collectewmp->sks_ps_luar_pt+$collectewmp->sks_penelitian+$collectewmp->sks_pengabdian+$collectewmp->sks_tugas;

            $avg = $total/2;
            $collectewmp->total = $total;
            $collectewmp->avg = $avg;
            $hitunganewmp->push($collectewmp);
            $index++;
        }


        return response()->json([
            'success' => true,
            'ewmp' => $hitunganewmp,
            'insd' => $insideCounter,
            'luar' => $index,
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $allewmps = Ewmp::all()->groupBy('tahun_akademik');
        $arrTahun = array();
        foreach ($allewmps as $key => $ewmp) {
            $arrTahun[] = $ewmp[0]->tahun_akademik;
        }
        return response()->json([
            'success' => true,
            'tahunewmps' => $arrTahun,
        ]);
    }
}