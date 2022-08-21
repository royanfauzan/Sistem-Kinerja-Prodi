<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Seminar;
use App\Models\Tulisan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TulisanController extends Controller
{
    private function tahuntsgenerator($tahun, $tipe = 'biasa')
    {
        $tslist = collect();
        $thnInt = intval($tahun);
        $tslist->ts = '' . ($thnInt);
        $tslist->ts1 = '' . ($thnInt - 1);
        $tslist->ts2 = '' . ($thnInt - 2);
        
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
            'all_tulisan' => Tulisan::with('dosen')->get(),
        ]);
    }

    public function searchtulisan($search)
    {
        return response()->json([
            'success' => true,
            'searchtulisan' => Tulisan::with('dosen')
                ->whereRelation('dosen', 'NamaDosen','LIKE', "%{$search}%")
                ->orWhereRelation('dosen', 'NIDK','LIKE', "%{$search}%")
                ->orwhere('judul', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('nm_media', 'LIKE', "%{$search}%")
                ->orwhere('ruang_lingkup', 'LIKE', "%{$search}%")
                ->orwhere('file_bukti', 'LIKE', "%{$search}%")
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
        $datatulisan = $request->only('judul', 'tahun', 'nm_media', 'ruang_lingkup', 'file_bukti', 'dosen_id');

        //valid credential
        $validator = Validator::make($datatulisan, [
            'judul' => 'required',
            'tahun' => 'required',
            'nm_media' => 'required',
            'ruang_lingkup' => 'required',
            'file_bukti' => 'required',
            'dosen_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $finalPathdokumen = "";
        try {
            $folderdokumen = "storage/tulisan/";

            $dokumen = $request->file('file_bukti');

            $namaFiledokumen = $dokumen->getClientOriginalName();

            $dokumen->move($folderdokumen, $namaFiledokumen);

            $finalPathdokumen = $folderdokumen . $namaFiledokumen;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Menyimpan Dokumen" . $th,
            ], 400);
        }

        $datatulisan = Tulisan::create(
            [
                'judul' => $request->judul,
                'tahun' => $request->tahun,
                'nm_media' => $request->nm_media,
                'ruang_lingkup' => $request->ruang_lingkup,
                'file_bukti' => $finalPathdokumen,
                'dosen_id' => $request->dosen_id,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'nm_media' => $request->nm_media,
            'ruang_lingkup' => $request->ruang_lingkup,
            'file_bukti' => $finalPathdokumen,
            'dosen_id' => $request->dosen_id,
            'all_tulisan' => Tulisan::all()
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
            'all_tulisan' => Tulisan::find($id),
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
        $tulisan = Tulisan::where('id', $id)->first();
        $datatulisan = $request->only('judul', 'tahun', 'nm_media', 'ruang_lingkup', 'file_bukti', 'dosen_id');

        //valid credential
        $validator = Validator::make($datatulisan, [
            'judul' => 'required',
            'tahun' => 'required',
            'nm_media' => 'required',
            'ruang_lingkup' => 'required',
            'file_bukti' => 'required',
            'dosen_id' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $tulisan->judul = $request->judul;
        $tulisan->tahun = $request->tahun;
        $tulisan->nm_media = $request->nm_media;
        $tulisan->ruang_lingkup = $request->ruang_lingkup;
        $tulisan->file_bukti = $request->file_bukti;
        $tulisan->dosen_id = $request->dosen_id;
        $tulisan->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'nm_media' => $request->nm_media,
            'ruang_lingkup' => $request->ruang_lingkup,
            'file_bukti' => $request->file_bukti,
            'dosen_id' => $request->dosen_id,
            'all_tulisan' => Tulisan::all()
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
        $tulisan = Tulisan::find($id);
        $tulisan->delete();

        if (!$tulisan) {
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

    public function exportpublikasidos(Request $request, $tahun)
    {
        $tahunlist = $this->tahuntsgenerator($tahun);
        $publikasits = collect([]);


        $JurnalDosens = Buku::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $SeminarDosens = Seminar::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();

        $PagelaranDosens = Tulisan::where('tahun', $tahunlist->ts)
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
            $tidakakreditasi = $listjurnalts->where('kategori_jurnal', 'tidak terakreditasi')->count();
            $nasional = $listjurnalts->where('kategori_jurnal', 'nasional terakreditasi')->count();
            $inter = $listjurnalts->where('kategori_jurnal', 'internasional')->count();
            $interrep = $listjurnalts->where('kategori_jurnal', 'internasional bereputasi')->count();

            $listSeminarts = $SeminarDosens->where('tahun', $th);
            $listsmnrl = $listSeminarts;
            $SeminarWilayah = $listSeminarts->where('kategori_seminar', 'wilayah')->count();
            $SeminarNasional = $listSeminarts->where('kategori_seminar', 'nasional')->count();
            $SeminarInternasional = $listSeminarts->where('kategori_seminar', 'internasional')->count();

            $listPagelarants = $PagelaranDosens->where('tahun', $th);
            $listpagelarl = $listPagelarants;
            $PagelaranWilayah = $listPagelarants->where('ruang_lingkup', 'wilayah')->count();
            $PagelaranNasional = $listPagelarants->where('ruang_lingkup', 'nasional')->count();
            $PagelaranInternasional = $listPagelarants->where('ruang_lingkup', 'internasional')->count();


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

            $jml_ttl_ts =  $jumlahPublikasits + $jumlahSeminarts + $jumlahPagelarants;


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
                    'totalts' => $jml_ttl_ts,
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

    // public function listtahun(Request $request)
    // {
    //     //
    //     $allpagelaran = Pagelaran::all()->groupBy('tahun');
    //     $arrTahun = array();
    //     foreach ($allpagelaran as $key => $pagelaranthn) {
    //         $arrTahun[] = $pagelaranthn[0]->tahun;
    //     }
    //     return response()->json([
    //         'success' => true,
    //         'tahunpagelarans' => $arrTahun,
    //     ]);
    // }
}
