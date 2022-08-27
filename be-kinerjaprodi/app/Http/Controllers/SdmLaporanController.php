<?php

namespace App\Http\Controllers;

use App\Models\Bbjurnaldos;
use App\Models\Ewmp;
use App\Models\Integrasi;
use App\Models\Luaranlaindosen;
use App\Models\Mengajar;
use App\Models\Pagelarandos;
use App\Models\Penelitian;
use App\Models\Pkm;
use App\Models\Produk;
use App\Models\profilDosen;
use App\Models\Rekognisi;
use App\Models\Seminardos;
use Illuminate\Http\Request;

class SdmLaporanController extends Controller
{
    //
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


    public function exportewmp(Request $request, $tahun)
    {
        $tahunint = intval($tahun);
        $tahun = "" . ($tahunint - 1) . "/" . ($tahunint);
        $idsDosens = Ewmp::select('profil_dosen_id')->where('tahun_akademik', $tahun)->get();
        $iddoss = array();
        foreach ($idsDosens as $idsDosen) {
            $iddoss[] = $idsDosen->profil_dosen_id;
        }

        $iddoss = array_unique($iddoss);

        $allewmps = Ewmp::with('profilDosen')->where('tahun_akademik', $tahun)->get()->groupBy('profil_dosen_id');

        // $hitunganewmp = collect([]);
        // $hitungIndex = 0;
        // $index = 0;
        // $previddosen=$allewmp[0]->profil_dosen_id;


        $hitunganewmp = collect([]);
        $index = 0;
        $insideCounter = array();
        foreach ($allewmps as $emps) {
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

            $total = $collectewmp->sks_ps_akreditasi + $collectewmp->sks_ps_lain_pt + $collectewmp->sks_ps_luar_pt + $collectewmp->sks_penelitian + $collectewmp->sks_pengabdian + $collectewmp->sks_tugas;

            $avg = $total / 2;
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

    public function exportpendos(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $penelitiants = collect([]);


        $penelitianDosens = Penelitian::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];
        $counter = 0;

        $listBesar = $penelitianDosens->where('tahun', $tahun);

        $arrmandiri = [];
        $arrdalam = [];
        $arrluar = [];

        foreach ($arrTahun as $key => $th) {
            $listpenelitiants = $penelitianDosens->where('tahun', $th);
            $listpen = $listpenelitiants;
            $mandiri = $listpenelitiants->where('dana_PT_Mandiri', '>', 0)->count();
            $dalam = $listpenelitiants->where('dana_dalam_negri', '>', 0)->count();
            $luar = $listpenelitiants->where('dana_luar_negri', '>', 0)->count();

            $arrmandiri[] = $mandiri;
            $arrdalam[] = $dalam;
            $arrluar[] = $luar;
            $jumlahts = $mandiri + $dalam + $luar;
            $sementara = collect(['mandiript' => $mandiri, 'dalam' => $dalam, 'luar' => $luar, 'jumlahts' => $jumlahts, 'listpen' => $listpen, 'ts' => $th]);
            $penelitiants->push(collect($sementara));
        }

        $jml_mandiri = array_sum($arrmandiri);
        $jml_dalam = array_sum($arrdalam);
        $jml_luar = array_sum($arrluar);
        $jml_total = $jml_mandiri + $jml_dalam + $jml_luar;


        return response()->json([
            'success' => true,
            'all_penelitian' => $penelitianDosens,
            'penelitian_ts' => $penelitiants,
            'jumlah_mandiri' => $jml_mandiri,
            'jumlah_dalam' => $jml_dalam,
            'jumlah_luar' => $jml_luar,
            'jumlah_total' => $jml_total,
        ]);
    }

    public function exportpkmdos(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $pengabdiants = collect([]);


        $pengabdianDosens = Pkm::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];
        $counter = 0;

        $listBesar = $pengabdianDosens->where('tahun', $tahun);

        $arrmandiri = [];
        $arrdalam = [];
        $arrluar = [];

        foreach ($arrTahun as $key => $th) {
            $listpengabdiants = $pengabdianDosens->where('tahun', $th);
            $listpen = $listpengabdiants;
            $mandiri = $listpengabdiants->where('dana_PT_Mandiri', '>', 0)->count();
            $dalam = $listpengabdiants->where('dana_dalam_negri', '>', 0)->count();
            $luar = $listpengabdiants->where('dana_luar_negri', '>', 0)->count();

            $arrmandiri[] = $mandiri;
            $arrdalam[] = $dalam;
            $arrluar[] = $luar;
            $jumlahts = $mandiri + $dalam + $luar;
            $sementara = collect(['mandiript' => $mandiri, 'dalam' => $dalam, 'luar' => $luar, 'jumlahts' => $jumlahts, 'listpen' => $listpen, 'ts' => $th]);
            $pengabdiants->push(collect($sementara));
        }

        $jml_mandiri = array_sum($arrmandiri);
        $jml_dalam = array_sum($arrdalam);
        $jml_luar = array_sum($arrluar);
        $jml_total = $jml_mandiri + $jml_dalam + $jml_luar;


        return response()->json([
            'success' => true,
            'all_pengabdian' => $pengabdianDosens,
            'pengabdian_ts' => $pengabdiants,
            'jumlah_mandiri' => $jml_mandiri,
            'jumlah_dalam' => $jml_dalam,
            'jumlah_luar' => $jml_luar,
            'jumlah_total' => $jml_total,
        ]);
    }


    public function exportpublikasidos(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $publikasits = collect([]);


        $JurnalDosens = Bbjurnaldos::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $SeminarDosens = Seminardos::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $PagelaranDosens = Pagelarandos::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        // Array Tahun
        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];
        $counter = 0;

        // Counter
        $arrJurnaltidakakreditasi = [];
        $arrJurnalnasional = [];
        $arrJurnalinternasional = [];
        $arrJurnalinternasionalreputasi = [];

        $arrSeminarwilayah = [];
        $arrSeminarnasional = [];
        $arrSeminarinter = [];

        $arrPagelaranwilayah = [];
        $arrPagelarannasional = [];
        $arrPagelaraninter = [];

        $arrdalam = [];
        $arrluar = [];

        foreach ($arrTahun as $key => $th) {
            $listjurnalts = $JurnalDosens->where('tahun', $th);
            $listjuranl = $listjurnalts;
            $tidakakreditasi = $listjurnalts->where('kategori_jurnal', 'Jurnal Tidak Terakreditasi')->count();
            $nasional = $listjurnalts->where('kategori_jurnal', 'Jurnal Nasional Terakreditasi')->count();
            $inter = $listjurnalts->where('kategori_jurnal', 'Jurnal Internasional')->count();
            $interrep = $listjurnalts->where('kategori_jurnal', 'Jurnal Internasional Bereputasi')->count();

            $listSeminarts = $SeminarDosens->where('tahun', $th);
            $listsmnrl = $listSeminarts;
            $SeminarWilayah = $listSeminarts->where('kategori_seminar', 'Wilayah')->count();
            $SeminarNasional = $listSeminarts->where('kategori_seminar', 'Nasional')->count();
            $SeminarInternasional = $listSeminarts->where('kategori_seminar', 'Internasional')->count();

            $listPagelarants = $PagelaranDosens->where('tahun', $th);
            $listpagelarl = $listPagelarants;
            $PagelaranWilayah = $listPagelarants->where('ruang_lingkup', 'Wilayah')->count();
            $PagelaranNasional = $listPagelarants->where('ruang_lingkup', 'Nasional')->count();
            $PagelaranInternasional = $listPagelarants->where('ruang_lingkup', 'Internasional')->count();


            $arrJurnaltidakakreditasi[] = $tidakakreditasi;
            $arrJurnalnasional[] = $nasional;
            $arrJurnalinternasional[] = $inter;
            $arrJurnalinternasionalreputasi[] = $interrep;
            $jumlahPublikasits = $tidakakreditasi + $nasional + $inter + $interrep;

            $arrSeminarwilayah[] = $SeminarWilayah;
            $arrSeminarnasional[] = $SeminarNasional;
            $arrSeminarinter[] = $SeminarInternasional;
            $jumlahSeminarts = $SeminarWilayah + $SeminarNasional + $SeminarInternasional;

            $arrPagelaranwilayah[] = $PagelaranWilayah;
            $arrPagelarannasional[] = $PagelaranNasional;
            $arrPagelaraninter[] = $PagelaranInternasional;
            $jumlahPagelarants = $PagelaranWilayah + $PagelaranNasional + $PagelaranInternasional;

            $jumlah_ts = $jumlahPublikasits + $jumlahPagelarants + $jumlahSeminarts;

            $sementara = collect(
                [
                    'jurnal_tidak_akreditasi' => $tidakakreditasi,
                    'jurnal_nasional' => $nasional,
                    'jurnal_internasional' => $inter,
                    'jurnal_internasional_bereputasi' => $interrep,
                    'jumlah_jurnal_ts' => $jumlahPublikasits,
                    'list_jurnal' => $listjuranl,
                    'seminar_wilayah' => $SeminarWilayah,
                    'seminar_nasional' => $SeminarNasional,
                    'seminar_internasional' => $SeminarInternasional,
                    'jumlah_seminar_ts' => $jumlahSeminarts,
                    'list_seminar' => $listsmnrl,
                    'pagelaran_wilayah' => $PagelaranWilayah,
                    'pagelaran_nasional' => $PagelaranNasional,
                    'pagelaran_internasional' => $PagelaranInternasional,
                    'jumlah_pagelaran_ts' => $jumlahPagelarants,
                    'list_pagelaran' => $listpagelarl,
                    'jml_ts' => $jumlah_ts,
                    'ts' => $th
                ]
            );
            $publikasits->push(collect($sementara));
        }

        $jmlJurnaltidakakreditasi = array_sum($arrJurnaltidakakreditasi);
        $jmlJurnalnasional = array_sum($arrJurnalnasional);
        $jmlJurnalinternasional = array_sum($arrJurnalinternasional);
        $jmlJurnalinternasionalreputasi = array_sum($arrJurnalinternasionalreputasi);

        $jmlSeminarwilayah = array_sum($arrSeminarwilayah);
        $jmlSeminarnasional = array_sum($arrSeminarnasional);
        $jmlSeminarinter = array_sum($arrSeminarinter);

        $jmlPagelaranwilayah = array_sum($arrPagelaranwilayah);
        $jmlPagelarannasional = array_sum($arrPagelarannasional);
        $jmlPagelaraninter = array_sum($arrPagelaraninter);

        $jml_total = $jmlJurnaltidakakreditasi +
            $jmlJurnalnasional +
            $jmlJurnalinternasional +
            $jmlJurnalinternasionalreputasi +
            $jmlSeminarwilayah +
            $jmlSeminarnasional +
            $jmlSeminarinter +
            $jmlPagelaranwilayah +
            $jmlPagelarannasional +
            $jmlPagelaraninter;


        return response()->json([
            'success' => true,
            // 'all_publikasi' => $publikasiDosens,
            'publikasi_ts' => $publikasits,
            'jumlah_publikasi_tidak_akreditasi' => $jmlJurnaltidakakreditasi,
            'jumlah_publikasi_nasional' => $jmlJurnalnasional,
            'jumlah_publikasi_internasional' => $jmlJurnalinternasional,
            'jumlah_publikasi_internasional_bereputasi' => $jmlJurnalinternasionalreputasi,
            'jumlah_seminar_wilayah' => $jmlSeminarwilayah,
            'jumlah_seminar_nasional' => $jmlSeminarnasional,
            'jumlah_seminar_internasional' => $jmlSeminarinter,
            'jumlah_pagelaran_wilayah' => $jmlPagelaranwilayah,
            'jumlah_pagelaran_nasional' => $jmlPagelarannasional,
            'jumlah_pagelaran_internasional' => $jmlPagelaraninter,

            'jumlah_total' => $jml_total,
        ]);
    }


    public function exportprodukdos(Request $request, $tahun)
    {

        $produks = Produk::with('anggotaDosens', 'ketuaProduk')->get();

        return response()->json([
            'success' => true,
            'all_produk' => $produks,
        ]);
    }

    public function exportjurnalsitasi(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);


        $listJurnalSitasi = Bbjurnaldos::where([['sitasi', '>', 0]])->with('anggotaDosens', 'ketuaJurnal')->orderBy('tahun')
            ->get();

        $urutanJurnal = $listJurnalSitasi->sortBy(function ($jrnl, $key) {
            return $jrnl->ketuaJurnal[0]->id;
        });

        $arrDataJurnal = array();
        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];
        $all_sitasi = 0;

        foreach ($urutanJurnal as $key => $jurnal) {
            if (in_array($jurnal->tahun, $arrTahun)) {
                $arrDataJurnal[] = $jurnal;
                $all_sitasi += $jurnal->sitasi;
            }
        }

        return response()->json([
            'success' => true,
            'all_jurnal' => $arrDataJurnal,
            'all_sitasi' => $all_sitasi
        ]);
    }

    public function exportprodukadopsith(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);

        $listProduk = Produk::with('anggotaDosens')
            ->where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->orderBy('tahun', 'DESC')
            ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];
        $all_sitasi = 0;

        return response()->json([
            'success' => true,
            'all_produk' => $listProduk,
        ]);
    }

    public function exportprodukadopsi(Request $request)
    {
        // $tahunlist = $this->tahuntsgenerator($tahun);

        $listProduk = Produk::with('anggotaDosens')
            ->orderBy('tahun', 'DESC')
            ->get();

        return response()->json([
            'success' => true,
            'all_produk' => $listProduk,
        ]);
    }

    public function exportLuaranLainth(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);

        $listProduk = Luaranlaindosen::with('anggotaDosens')
            ->where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->orderBy('tahun', 'DESC')
            ->get();

        $listLuaran1 = $listProduk->where('jenis_luaran','I');
        $listLuaran2 = $listProduk->where('jenis_luaran','II');
        $listLuaran3 = $listProduk->where('jenis_luaran','III');
        $listLuaran4 = $listProduk->where('jenis_luaran','IV');

        $arrLuaran1 = array();
        $arrLuaran2 = array();
        $arrLuaran3 = array();
        $arrLuaran4 = array();

        foreach ($listLuaran1 as $key => $luar1) {
            $arrLuaran1[]=$luar1;
        }
        foreach ($listLuaran2 as $key => $luar2) {
            $arrLuaran2[]=$luar2;
        }
        foreach ($listLuaran3 as $key => $luar3) {
            $arrLuaran3[]=$luar3;
        }
        foreach ($listLuaran4 as $key => $luar4) {
            $arrLuaran4[]=$luar4;
        }

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];
        $all_sitasi = 0;

        return response()->json([
            'success' => true,
            'all_Luaran' => $listProduk,
            'luaransatu'=>$arrLuaran1,
            'luarandua'=>$arrLuaran2,
            'luarantiga'=>$arrLuaran3,
            'luaranempat'=>$arrLuaran4,
        ]);
    }

    public function exportrekognisith(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $listRekognisi=array();

        // $listRekognisi = profilDosen::with(['rekognisis' => function ($q) {
        //     $q->orderBy('tahun', 'DESC');
        //   },'detaildosen'])
        //     ->whereRelation('rekognisis','tahun', $tahunlist->ts)
        //     ->orWhereRelation('rekognisis','tahun', $tahunlist->ts1)
        //     ->orWhereRelation('rekognisis','tahun', $tahunlist->ts2)
        //     ->get();

        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        $listDosen = profilDosen::with('detaildosen')->where('StatusDosen','Dosen Tetap')->get();
        $allRekognisi = Rekognisi::whereIn('tahun',$arrTahun)->orderBy('tahun','DESC')->get();


        foreach ($listDosen as $key => $ldsen) {
            $profilSementara = $ldsen;
            $rekogSementara = $allRekognisi->firstWhere('profil_dosen_id',$ldsen->id);
            
            $listRekognisi[] = collect(['profil_dosen'=>$profilSementara,'lastrekognisi'=>$rekogSementara]);
            
        }

        return response()->json([
            'success' => true,
            'all_rekognisis' => $listRekognisi,
        ]);
    }

    public function exportdtps(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun, 'akademik');

        $profildos = profilDosen::with('pendidikans', 'detaildosen', 'serkoms')->where('StatusDosen', 'Dosen Tetap')->get();

        $listDosen = array();
        $listMengajars = array();
        $listMengajarLuars = array();
        $dataSatuAdas2 = false;

        foreach ($profildos as $key => $profilds) {
            $profilSementara = $profilds;
            if (!strcmp($profilSementara->StatusDosen, 'Dosen Tetap')) {
                $callProfilSementara = collect($profilSementara);
                $profilmengajar = Mengajar::whereRelation('matkul', 'tahun_akademik', $tahunlist->ts)
                    ->orWhereRelation('matkul', 'tahun_akademik', $tahunlist->ts1)
                    ->orWhereRelation('matkul', 'tahun_akademik', $tahunlist->ts2)->get();
                $profilmengajar = $profilmengajar->where('profil_dosen_id', $profilSementara->id);
                $listMengajars[] = $profilmengajar->where('matkul.prodi_id', 1);
                $listMengajarLuars[] = $profilmengajar->where('matkul.prodi_id', '!=', 1);
                $mengajars = $listMengajars[$key];
                $mengajarLuars = $listMengajarLuars[$key];
                // $mengajars = $profilmengajar->filter(function ($mgj, $key) {
                //     return $mgj->matkul->prodi_id == 1;
                // });
                $mengajarUnique = collect($mengajars->unique('matkul.kode_matkul'));
                $mengajarLuarUnique = collect($mengajarLuars->unique('matkul.kode_matkul'));
                $arrMengajar = array();
                foreach ($mengajarUnique as $mUnikKey => $mUnik) {
                    if ($mUnik) {
                        $arrMengajar[] = $mUnik;
                    }
                }

                $pascasarjana = ['magister' => '', 'doktor' => ''];
                foreach ($profilds->pendidikans as $keypen => $pendidikan) {
                    if (!strcmp($pendidikan->program_pendidikan, 'S2')) {
                        $pascasarjana['magister'] = $pendidikan->program_pendidikan;
                    }
                    if (!strcmp($pendidikan->program_pendidikan, 'S3')) {
                        $pascasarjana['doktor'] = $pendidikan->program_pendidikan;
                    }
                }

                // if (!$dataSatuAdas2 && $callProfilSementara->contains('pendidikans.program_pendidikan','S2')) {
                //     $dataSatuAdas2 = true;
                // }

                $dataSatuAdas2 = $callProfilSementara->contains('pendidikans.program_pendidikan', 'S2');

                $arrMengajarLuar = array();
                foreach ($mengajarLuarUnique as $mUnikKey => $mLuarUnik) {
                    if ($mLuarUnik) {
                        $arrMengajarLuar[] = $mLuarUnik;
                    }
                }

                $profilSementara->mengajars = $arrMengajar;
                $profilSementara->mengajarUns = $arrMengajar;
                $profilSementara->mengajarLuar = $arrMengajarLuar;
                $profilSementara->pascasarjana = collect($pascasarjana);

                // $profilLengkap = collect($profilSementara);
                $listDosen[] = $profilSementara;
            }
        }

        return response()->json([
            'success' => true,
            'dtps' => $listDosen,
            'dataMengajar' => $listMengajars,
            'CEKS2' => $dataSatuAdas2,
        ]);
    }

    public function exporttidaktetap(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun, 'akademik');

        $profildos = profilDosen::with('pendidikans', 'detaildosen', 'serkoms')->where('StatusDosen', 'Dosen Tidak Tetap')->get();

        $listDosen = array();
        $listMengajars = array();
        $listMengajarLuars = array();
        $dataSatuAdas2 = false;

        foreach ($profildos as $key => $profilds) {
            $profilSementara = $profilds;
            if (!strcmp($profilSementara->StatusDosen, 'Dosen Tidak Tetap')) {
                $callProfilSementara = collect($profilSementara);
                $profilmengajar = Mengajar::whereRelation('matkul', 'tahun_akademik', $tahunlist->ts)
                    ->orWhereRelation('matkul', 'tahun_akademik', $tahunlist->ts1)
                    ->orWhereRelation('matkul', 'tahun_akademik', $tahunlist->ts2)->get();
                $profilmengajar = $profilmengajar->where('profil_dosen_id', $profilSementara->id);
                $listMengajars[] = $profilmengajar->where('matkul.prodi_id', 1);
                $listMengajarLuars[] = $profilmengajar->where('matkul.prodi_id', '!=', 1);
                $mengajars = $listMengajars[$key];
                $mengajarLuars = $listMengajarLuars[$key];
                // $mengajars = $profilmengajar->filter(function ($mgj, $key) {
                //     return $mgj->matkul->prodi_id == 1;
                // });
                $mengajarUnique = collect($mengajars->unique('matkul.kode_matkul'));
                $mengajarLuarUnique = collect($mengajarLuars->unique('matkul.kode_matkul'));
                $arrMengajar = array();
                foreach ($mengajarUnique as $mUnikKey => $mUnik) {
                    if ($mUnik) {
                        $arrMengajar[] = $mUnik;
                    }
                }

                $pascasarjana = ['magister' => '', 'doktor' => ''];
                foreach ($profilds->pendidikans as $keypen => $pendidikan) {
                    if (!strcmp($pendidikan->program_pendidikan, 'S2')) {
                        $pascasarjana['magister'] = $pendidikan->program_pendidikan;
                    }
                    if (!strcmp($pendidikan->program_pendidikan, 'S3')) {
                        $pascasarjana['doktor'] = $pendidikan->program_pendidikan;
                    }
                }

                // if (!$dataSatuAdas2 && $callProfilSementara->contains('pendidikans.program_pendidikan','S2')) {
                //     $dataSatuAdas2 = true;
                // }

                $dataSatuAdas2 = $callProfilSementara->contains('pendidikans.program_pendidikan', 'S2');

                $arrMengajarLuar = array();
                foreach ($mengajarLuarUnique as $mUnikKey => $mLuarUnik) {
                    if ($mLuarUnik) {
                        $arrMengajarLuar[] = $mLuarUnik;
                    }
                }

                $profilSementara->mengajars = $arrMengajar;
                $profilSementara->mengajarUns = $arrMengajar;
                $profilSementara->mengajarLuar = $arrMengajarLuar;
                $profilSementara->pascasarjana = collect($pascasarjana);

                // $profilLengkap = collect($profilSementara);
                $listDosen[] = $profilSementara;
            }
        }

        return response()->json([
            'success' => true,
            'dosentidaktetap' => $listDosen,
            'dataMengajar' => $listMengajars,
            'CEKS2' => $dataSatuAdas2,
        ]);
    }

    public function exportdosenindustri(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun, 'akademik');

        $profildos = profilDosen::with('pendidikans', 'detaildosen', 'serkoms')->where('StatusDosen', 'Dosen Industri')->get();

        $listDosen = array();
        $listMengajars = array();
        $listMengajarLuars = array();
        $dataSatuAdas2 = false;

        foreach ($profildos as $key => $profilds) {
            $profilSementara = $profilds;
            if (!strcmp($profilSementara->StatusDosen, 'Dosen Industri')) {
                $callProfilSementara = collect($profilSementara);
                $profilmengajar = Mengajar::whereRelation('matkul', 'tahun_akademik', $tahunlist->ts)
                    ->orWhereRelation('matkul', 'tahun_akademik', $tahunlist->ts1)
                    ->orWhereRelation('matkul', 'tahun_akademik', $tahunlist->ts2)->get();
                $profilmengajar = $profilmengajar->where('profil_dosen_id', $profilSementara->id);
                $listMengajars[] = $profilmengajar->where('matkul.prodi_id', 1);
                $listMengajarLuars[] = $profilmengajar->where('matkul.prodi_id', '!=', 1);
                $mengajars = $listMengajars[$key];
                $mengajarLuars = $listMengajarLuars[$key];
                // $mengajars = $profilmengajar->filter(function ($mgj, $key) {
                //     return $mgj->matkul->prodi_id == 1;
                // });
                $mengajarUnique = collect($mengajars->unique('matkul.kode_matkul'));
                $mengajarLuarUnique = collect($mengajarLuars->unique('matkul.kode_matkul'));
                $arrMengajar = array();
                $sks_sum = 0;
                foreach ($mengajarUnique as $mUnikKey => $mUnik) {
                    if ($mUnik) {
                        $arrMengajar[] = $mUnik;
                        $sks_sum += intval($mUnik->sks);
                    }
                }

                $pascasarjana = ['magister' => '', 'doktor' => ''];
                foreach ($profilds->pendidikans as $keypen => $pendidikan) {
                    if (!strcmp($pendidikan->program_pendidikan, 'S2')) {
                        $pascasarjana['magister'] = $pendidikan->program_pendidikan;
                    }
                    if (!strcmp($pendidikan->program_pendidikan, 'S3')) {
                        $pascasarjana['doktor'] = $pendidikan->program_pendidikan;
                    }
                }

                // if (!$dataSatuAdas2 && $callProfilSementara->contains('pendidikans.program_pendidikan','S2')) {
                //     $dataSatuAdas2 = true;
                // }

                $dataSatuAdas2 = $callProfilSementara->contains('pendidikans.program_pendidikan', 'S2');

                $arrMengajarLuar = array();
                foreach ($mengajarLuarUnique as $mUnikKey => $mLuarUnik) {
                    if ($mLuarUnik) {
                        $arrMengajarLuar[] = $mLuarUnik;
                    }
                }

                $profilSementara->mengajars = $arrMengajar;
                $profilSementara->mengajarUns = $arrMengajar;
                $profilSementara->mengajarLuar = $arrMengajarLuar;
                $profilSementara->sks_sum = $sks_sum;
                $profilSementara->pascasarjana = collect($pascasarjana);

                // $profilLengkap = collect($profilSementara);
                $listDosen[] = $profilSementara;
            }
        }

        return response()->json([
            'success' => true,
            'dosenindustri' => $listDosen,
            'dataMengajar' => $listMengajars,
            'CEKS2' => $dataSatuAdas2,
        ]);
    }

    public function exportbimbingan(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun, 'akademik');
        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        $profildos = profilDosen::with('bimbingans.prodi', 'bimbingans.mahasiswa')
            ->whereRelation('bimbingans', 'tahun_akademik', $tahunlist->ts)
            ->orWhereRelation('bimbingans', 'tahun_akademik', $tahunlist->ts1)
            ->orWhereRelation('bimbingans', 'tahun_akademik', $tahunlist->ts2)->get();

        $listDosen = array();
        $listMembimbing = array();
        $listMembimbingLuars = array();
        $dataSatuAdas2 = false;

        foreach ($profildos as $key => $profilds) {
            $profilSementara = $profilds;
            if (!strcmp($profilSementara->StatusDosen, 'Dosen Tetap')) {
                $callProfilSementara = collect($profilSementara);

                $profilmembimbing = $profilds->bimbingans;
                $listMembimbing[] = $profilmembimbing->where('prodi_id', 1);
                $listMembimbingLuars[] = $profilmembimbing->where('prodi_id', '!=', 1);
                $membimbing = $listMembimbing[$key];
                $membimbingLuar = $listMembimbingLuars[$key];

                $arrbimbinganProdi = array();
                $arrbimbinganLuarProdi = array();
                $listbimbinganTs = array();
                $totalBimbingan = 0;
                foreach ($arrTahun as $keyth => $th) {
                    $bimbinganTS = $membimbing->where('tahun_akademik', $th)->count();
                    $bimbinganTSluar = $membimbingLuar->where('tahun_akademik', $th)->count();

                    $arrbimbinganProdi[] = $bimbinganTS;
                    $arrbimbinganLuarProdi[] = $bimbinganTSluar;

                    $totTS = $bimbinganTS + $bimbinganTSluar;
                    $totalBimbingan += $totTS;

                    $listbimbinganTs[] = collect(['ts' . $keyth => $th, 'bimbingan_dalam' => $bimbinganTS, 'bimbingan_luar' => $bimbinganTSluar, 'totalbimbing' => $totTS]);
                }

                $totalDalam = array_sum($arrbimbinganProdi);
                $totalLuar = array_sum($arrbimbinganLuarProdi);
                $totalLuarDalam = $totalLuar + $totalDalam;

                $avgDalam = ($totalDalam > 0) ? round($totalDalam / 3, 1) : 0.0;
                $avgLuar = ($totalLuar > 0) ? round($totalLuar / 3, 1) : 0.0;
                $avgLuarDalam = ($totalLuarDalam > 0) ? round($totalLuarDalam / 6, 1) : 0.0;

                $profilSementara->listBimbing = $listbimbinganTs;
                $profilSementara->avgDalam = $avgDalam;
                $profilSementara->avgLuar = $avgLuar;
                $profilSementara->avgSemester = $avgLuarDalam;

                // $profilLengkap = collect($profilSementara);
                $listDosen[] = $profilSementara;
            }
        }

        return response()->json([
            'success' => true,
            'list_bimbingan' => $profildos,
            'LISTTAHUN' => $listDosen,
            // 'CEKS2' => $dataSatuAdas2,
        ]);
    }

    public function testambildata(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun, 'akademik');
        $arrTahun = [$tahunlist->ts, $tahunlist->ts1, $tahunlist->ts2];

        $profildos = profilDosen::with('bimbingans.prodi', 'bimbingans.mahasiswa')
            ->whereRelation('bimbingans', 'tahun_akademik', $tahunlist->ts)
            ->orWhereRelation('bimbingans', 'tahun_akademik', $tahunlist->ts1)
            ->orWhereRelation('bimbingans', 'tahun_akademik', $tahunlist->ts2)->get();

        $listDosen = array();
        $listMembimbing = array();
        $listMembimbingLuars = array();
        $dataSatuAdas2 = false;

        foreach ($profildos as $key => $profilds) {
            $profilSementara = $profilds;
            if (!strcmp($profilSementara->StatusDosen, 'Dosen Tetap')) {
                $callProfilSementara = collect($profilSementara);

                $profilmembimbing = $profilds->bimbingans;
                $listMembimbing[] = $profilmembimbing->where('prodi_id', 1);
                $listMembimbingLuars[] = $profilmembimbing->where('prodi_id', '!=', 1);
                $membimbing = $listMembimbing[$key];
                $membimbingLuar = $listMembimbingLuars[$key];

                $arrbimbinganProdi = array();
                $arrbimbinganLuarProdi = array();
                $listbimbinganTs = array();
                $totalBimbingan = 0;
                foreach ($arrTahun as $keyth => $th) {
                    $bimbinganTS = $membimbing->where('tahun_akademik', $th)->count();
                    $bimbinganTSluar = $membimbingLuar->where('tahun_akademik', $th)->count();

                    $arrbimbinganProdi[] = $bimbinganTS;
                    $arrbimbinganLuarProdi[] = $bimbinganTSluar;

                    $totTS = $bimbinganTS + $bimbinganTSluar;
                    $totalBimbingan += $totTS;

                    $listbimbinganTs[] = collect(['ts' . $keyth => $th, 'bimbingan_dalam' => $bimbinganTS, 'bimbingan_luar' => $bimbinganTSluar, 'totalbimbing' => $totTS]);
                }

                $totalDalam = array_sum($arrbimbinganProdi);
                $totalLuar = array_sum($arrbimbinganLuarProdi);
                $totalLuarDalam = $totalLuar + $totalDalam;

                $avgDalam = ($totalDalam > 0) ? round($totalDalam / 3, 1) : 0.0;
                $avgLuar = ($totalLuar > 0) ? round($totalLuar / 3, 1) : 0.0;
                $avgLuarDalam = ($totalLuarDalam > 0) ? round($totalLuarDalam / 6, 1) : 0.0;

                $profilSementara->listBimbing = $listbimbinganTs;
                $profilSementara->avgDalam = $avgDalam;
                $profilSementara->avgLuar = $avgLuar;
                $profilSementara->avgAll = $avgLuarDalam;

                // $profilLengkap = collect($profilSementara);
                $listDosen[] = $profilSementara;
            }
        }

        return response()->json([
            'success' => true,
            'all_data' => $profildos,
            'LISTTAHUN' => $listDosen,
            // 'CEKS2' => $dataSatuAdas2,
        ]);
    }
}
