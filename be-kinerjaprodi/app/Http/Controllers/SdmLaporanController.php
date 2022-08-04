<?php

namespace App\Http\Controllers;

use App\Models\Ewmp;
use App\Models\Penelitian;
use Illuminate\Http\Request;

class SdmLaporanController extends Controller
{
    //
    private function tahuntsgenerator($tahun,$tipe = 'biasa'){
        $tslist = collect();
        $thnInt = intval($tahun);
        $tslist->ts = ''.($thnInt);
        $tslist->ts1 = ''.($thnInt-1);
        $tslist->ts2 = ''.($thnInt-2);
        if (!strcmp($tipe,'akademik')) {
            $tslist->ts = "".($thnInt-1)."/".($thnInt);
            $tslist->ts1 = "".($thnInt-2)."/".($thnInt-1);
            $tslist->ts2 = "".($thnInt-3)."/".($thnInt-2);
        }
        return $tslist;
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

    public function exportpendos(Request $request,$tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $penelitiants = collect([]);
        
        
        $penelitianDosens = Penelitian::where('tahun',$tahunlist->ts)
        ->orWhere('tahun',$tahunlist->ts1)
        ->orWhere('tahun',$tahunlist->ts2)
        ->get();

        $arrTahun = [$tahunlist->ts,$tahunlist->ts1,$tahunlist->ts2];
        $counter = 0;

        $listBesar = $penelitianDosens->where('tahun',$tahun);

        $arrmandiri = [];
        $arrdalam = [];
        $arrluar = [];

        foreach ($arrTahun as $key => $th) {
            $listpenelitiants = $penelitianDosens->where('tahun',$th);
            $listpen = $listpenelitiants;
            $mandiri = $listpenelitiants->where('dana_PT_Mandiri','>',0)->count();
            $dalam = $listpenelitiants->where('dana_dalam_negri','>',0)->count();
            $luar = $listpenelitiants->where('dana_luar_negri','>',0)->count();

            $arrmandiri[] = $mandiri;
            $arrdalam[] = $dalam;
            $arrluar[] = $luar;
            $jumlahts = $mandiri+$dalam+$luar;
            $sementara = collect(['mandiript'=>$mandiri,'dalam'=>$dalam,'luar'=>$luar,'jumlahts'=>$jumlahts,'listpen'=>$listpen,'ts'=>$th]);
            $penelitiants->push(collect($sementara));
        }

        $jml_mandiri = array_sum($arrmandiri);
        $jml_dalam = array_sum($arrdalam);
        $jml_luar = array_sum($arrluar);
        $jml_total = $jml_mandiri+$jml_dalam+$jml_luar;


        return response()->json([
            'success' => true,
            'all_penelitian' => $penelitianDosens,
            'penelitian_ts' => $penelitiants,
            'jumlah_mandiri' => $jml_mandiri,
            'jumlah_dalam' => $jml_dalam,
            'jumlah_luar' => $jml_luar,
            'jumlah_total' => $jml_total,
            // 'penelitian_ts1' => $insideCounter,
            // 'penelitian_ts2' => $index,
            // 'jml_mandiri' => $index,
            // 'jml_dalam' => $index,
            // 'jml_luar' => $index,
            // 'jml_total' => $index,
        ]);
    }
}
