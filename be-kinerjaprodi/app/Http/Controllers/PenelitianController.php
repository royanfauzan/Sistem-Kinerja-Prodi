<?php

namespace App\Http\Controllers;

use App\Models\Penelitian;
use App\Models\RelasiDosPen;
use App\Models\RelasiPenMhs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PenelitianController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([ //ngirim ke front end
            'success' => true,
            'all_penelitian' => Penelitian::with('anggotaDosens', 'anggotaMahasiswas')->get()
        ]);
    }

    public function relasipenmhs($id)
    {
        return response()->json([ //ngirim ke front end
            'success' => true,
            'all_relasi' => RelasiPenMhs::with('mahasiswa')->where('penelitian_id', $id)->get(),
        ]);
    }

    public function relasipendosen($id)
    {
        return response()->json([ //ngirim ke front end
            'success' => true,
            'all_relasi' => RelasiDosPen::with('dosen')->where('penelitian_id', $id)->get(),
        ]);
    }

    public function searchpenelitian($search)
    {


        return response()->json([
            'success' => true,
            'searchpenelitian' =>  Penelitian::with('anggotaDosens', 'anggotaMahasiswas')
                ->whereRelation('anggotaDosens', 'NamaDosen', 'LIKE', "%{$search}%")
                ->orwhereRelation('anggotaMahasiswas', 'nama', 'LIKE', "%{$search}%")
                ->orwhere('tema_sesuai_roadmap', 'LIKE', "%{$search}%")
                ->orwhere('judul', 'LIKE', "%{$search}%")
                ->orwhere('tahun', 'LIKE', "%{$search}%")
                ->orwhere('sumber_dana_PT_mandiri', 'LIKE', "%{$search}%")
                ->orwhere('dana_PT_Mandiri', 'LIKE', "%{$search}%")
                ->orwhere('sumber_dalam_negri', 'LIKE', "%{$search}%")
                ->orwhere('dana_dalam_negri', 'LIKE', "%{$search}%")
                ->orwhere('sumber_luar_negri', 'LIKE', "%{$search}%")
                ->orwhere('dana_luar_negri', 'LIKE', "%{$search}%")
                ->get()

        ]);
    }

    public function searchhapus($id,$search)
    {
        $datarelasi = RelasiDosPen::with('dosen')
        ->whereRelation('dosen', 'NamaDosen', 'LIKE', "%{$search}%")
        ->orWhereRelation('dosen', 'NIDK', 'LIKE', "%{$search}%")     
        ->get();

        $datafilter = $datarelasi->where('penelitian_id',$id);

        return response()->json([
            'success' => true,
            'searchhapus' =>  $datafilter,
            
        ]);
    }

    public function searchhapusmhs($id,$search)
    {
        $datarelasi = RelasiPenMhs::with('mahasiswa')
        ->whereRelation('mahasiswa', 'nama', 'LIKE', "%{$search}%")
        ->orWhereRelation('mahasiswa', 'nim', 'LIKE', "%{$search}%")     
        ->get();

        $datafilter = $datarelasi->where('penelitian_id',$id);

        return response()->json([
            'success' => true,
            'searchhapusmhs' =>  $datafilter,
            
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
        $datapenelitian = $request->only('tema_sesuai_roadmap', 'judul', 'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

        //valid credential
        $validator = Validator::make($datapenelitian, [
            'tema_sesuai_roadmap' => 'required',
            'judul' => 'required',
            'tahun' => 'required',
            'sumber_dana_PT_mandiri' => 'required',
            'dana_PT_Mandiri' => 'required',
            'sumber_dalam_negri' => 'required',
            'dana_dalam_negri' => 'required',
            'sumber_luar_negri' => 'required',
            'dana_luar_negri' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $datapenelitian = Penelitian::create( //ngirim ke database
            [
                //yg kiri dari form, kanan dari database
                'tema_sesuai_roadmap' => $request->tema_sesuai_roadmap,
                'nama_matkul' => $request->nama_matkul,
                'judul' => $request->judul,
                'tahun' => $request->tahun,
                'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri,
                'dana_PT_Mandiri' => $request->dana_PT_Mandiri,
                'sumber_dalam_negri' => $request->sumber_dalam_negri,
                'dana_dalam_negri' => $request->dana_dalam_negri,
                'sumber_luar_negri' => $request->sumber_luar_negri,
                'dana_luar_negri' => $request->dana_luar_negri,
            ]
        );

        //Token created, return with success response and jwt token
        return response()->json([ //ngirim ke front end
            'success' => true,
            'tema_sesuai_roadmap' => $request->tema_sesuai_roadmap,
            'nama_matkul' => $request->nama_matkul,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri,
            'dana_PT_Mandiri' => $request->dana_PT_Mandiri,
            'sumber_dalam_negri' => $request->sumber_dalam_negri,
            'dana_dalam_negri' => $request->dana_dalam_negri,
            'sumber_luar_negri' => $request->sumber_luar_negri,
            'dana_luar_negri' => $request->dana_luar_negri,
            'all_penelitian' => Penelitian::all()
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
            'all_penelitian' => Penelitian::with(['anggotaDosens', 'anggotaMahasiswas'])->where('id', $id)->first(),
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
        $penelitian = Penelitian::where('id', $id)->first();
        $datapenelitian = $request->only('tema_sesuai_roadmap', 'judul',  'tahun', 'sumber_dana_PT_mandiri', 'dana_PT_Mandiri', 'sumber_dalam_negri', 'dana_dalam_negri', 'sumber_luar_negri', 'dana_luar_negri');

        // valid credential
        $validator = Validator::make($datapenelitian, [
            'tema_sesuai_roadmap' => 'required',
            'judul' => 'required',
            'tahun' => 'required',
            'sumber_dana_PT_mandiri' => 'required',
            'dana_PT_Mandiri' => 'required',
            'sumber_dalam_negri' => 'required',
            'dana_dalam_negri' => 'required',
            'sumber_luar_negri' => 'required',
            'dana_luar_negri' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $penelitian->tema_sesuai_roadmap = $request->tema_sesuai_roadmap;
        $penelitian->judul = $request->judul;
        $penelitian->tahun = $request->tahun;
        $penelitian->sumber_dana_PT_mandiri = $request->sumber_dana_PT_mandiri;
        $penelitian->dana_PT_Mandiri = $request->dana_PT_Mandiri;
        $penelitian->sumber_dalam_negri = $request->sumber_dalam_negri;
        $penelitian->dana_dalam_negri = $request->dana_dalam_negri;
        $penelitian->sumber_luar_negri = $request->sumber_luar_negri;
        $penelitian->dana_luar_negri = $request->dana_luar_negri;
        $penelitian->save();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'tema_sesuai_roadmap' => $request->tema_sesuai_roadmap,
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'sumber_dana_PT_mandiri' => $request->sumber_dana_PT_mandiri,
            'dana_PT_Mandiri' => $request->dana_PT_Mandiri,
            'sumber_dalam_negri' => $request->sumber_dalam_negri,
            'dana_dalam_negri' => $request->dana_dalam_negri,
            'sumber_luar_negri' => $request->sumber_luar_negri,
            'dana_luar_negri' => $request->dana_luar_negri,
            'all_penelitian' => Penelitian::all()
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
        $penelitian = Penelitian::find($id);
        $penelitian->delete();

        if (!$penelitian) {
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

    public function listtahun(Request $request)
    {
        //
        $allpenelitians = Penelitian::all()->groupBy('tahun');
        $arrTahun = array();
        foreach ($allpenelitians as $key => $ewmp) {
            $arrTahun[] = $ewmp[0]->tahun;
        }
        return response()->json([
            'success' => true,
            'tahunpenelitians' => $arrTahun,
        ]);
    }

    public function pilihdosen(Request $request, $id)
    {
        $luaran = Penelitian::where('id', $id)->first();
        $datapenelitian = $request->only('profil_dosen_id', 'penelitian_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($datapenelitian, [
            'profil_dosen_id' => 'required',
            'penelitian_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $relasimahasiswa = RelasiDosPen::create(
            [
                'profil_dosen_id' => $request->profil_dosen_id,
                'penelitian_id' => $request->penelitian_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'profil_dosen_id' => $request->profil_dosen_id,
            'penelitian_id' => $request->penelitian_id,
            'keanggotaan' => $request->keanggotaan,
            'all_penelitian' => Penelitian::all()
        ]);
    }
    public function pilihmahasiswa(Request $request, $id)
    {
        $luaran = Penelitian::where('id', $id)->first();
        $datapenelitian = $request->only('mahasiswa_id', 'penelitian_id', 'keanggotaan');

        //valid credential
        $validator = Validator::make($datapenelitian, [
            'mahasiswa_id' => 'required',
            'penelitian_id' => 'required',
            'keanggotaan' => 'required',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $relasimahasiswa = RelasiPenMhs::create(
            [
                'mahasiswa_id' => $request->mahasiswa_id,
                'penelitian_id' => $request->penelitian_id,
                'keanggotaan' => $request->keanggotaan,
            ]
        );


        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'mahasiswa_id' => $request->mahasiswa_id,
            'penelitian_id' => $request->penelitian_id,
            'keanggotaan' => $request->keanggotaan,
            'all_penelitian' => Penelitian::all()
        ]);
    }

    public function deletemhs($id)
    {
        $penelitian = RelasiPenMhs::find($id);
        $penelitian->delete();

        if (!$penelitian) {
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

    public function deletedosen($id)
    {
        $penelitian = RelasiDosPen::find($id);
        $penelitian->delete();

        if (!$penelitian) {
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
