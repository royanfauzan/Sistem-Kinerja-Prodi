<?php

namespace App\Http\Controllers;

use App\Models\Detaildosen;
use App\Models\profilDosen;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfildosenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json([
            'success' => true,
            'profilDosens' => profilDosen::all(),
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
        $data = $request->only('NIDK', 'NamaDosen', 'NIK', 'TempatLahir', 'TanggalLahir', 'StatusDosen', 'JenisKelamin', 'StatusPerkawinan', 'Agama', 'kesesuaian', 'bidangKeahlian');
        $validator = Validator::make($data, [
            'NIDK' => 'required|string',
            'NamaDosen' => 'required|string',
            'NIK' => "required|string",
            'StatusDosen' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        if (profilDosen::where('NIDK', $request->NIDK)->first()) {
            return response()->json([
                'success' => false,
                'message' => "Profil Sudah Tersimpan",
            ], 400);
        }

        $userBaru = User::create([
            'NIDK' => '' . $request->NIDK,
            'role' => 'dosen',
            'level_akses' => 2,
            'password' => bcrypt('dosen123'),
        ]);

        //Request is valid, create new profil
        $profil = profilDosen::create([
            'NIDK' => $request->NIDK,
            'NamaDosen' => $request->NamaDosen,
            'NIK' => $request->NIK,
            'StatusDosen' => $request->StatusDosen,
        ]);

        $kesesuaian = ' ';
        if ($request->kesesuaian) {
            $kesesuaian = $request->kesesuaian;
        }


        $bidangKeahlian = 'Teknik Elektro';
        if ($request->bidangKeahlian) {
            $bidangKeahlian = $request->bidangKeahlian;
        }
        $detailDosen = Detaildosen::create([
            'profil_dosen_id' => $profil->id,
            'kesesuaian' => $kesesuaian,
            'bidangKeahlian' => $bidangKeahlian
        ]);

        $perusahaan = ' ';
        if ($request->perusahaan && $profil->StatusDosen == 'Dosen Industri') {
            $perusahaan = $request->perusahaan;
            $detailDosen->perusahaan = $perusahaan;
            $detailDosen->save();
        }



        $profil->Golongan = isset($request->Golongan) ? $request->Golongan : '';
        $profil->Pangkat = isset($request->Pangkat) ? $request->Pangkat : '';
        $profil->JabatanAkademik = isset($request->JabatanAkademik) ? $request->JabatanAkademik : '';
        $profil->Alamat = isset($request->Alamat) ? $request->Alamat : '';
        $profil->NoTelepon = isset($request->NoTelepon) ? $request->NoTelepon : '';
        $profil->Email = isset($request->Email) ? $request->Email : '';

        $profil->TempatLahir = isset($request->TempatLahir) ? $request->TempatLahir : '';
        $profil->TanggalLahir = isset($request->TanggalLahir) ? $request->TanggalLahir : '';
        $profil->JenisKelamin = isset($request->JenisKelamin) ? $request->JenisKelamin : '';
        $profil->StatusPerkawinan = isset($request->StatusPerkawinan) ? $request->StatusPerkawinan : '';
        $profil->bidangKeahlian = isset($request->bidangKeahlian) ? $request->bidangKeahlian : '';
        $profil->Agama = isset($request->Agama) ? $request->Agama : '';

        $profil->save();


        return response()->json([
            'success' => true,
            'profil' => $profil,
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
            'profil_dosen' => profilDosen::with('detaildosen')->find($id),
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
        //
        $profilDosen = profilDosen::find($id);
        $data = $request->only('NamaDosen', 'NIK', 'TempatLahir', 'TanggalLahir', 'StatusDosen', 'JenisKelamin', 'StatusPerkawinan', 'Agama', 'bidangKeahlian');
        $validator = Validator::make($data, [
            'NamaDosen' => 'required|string',
            'NIK' => "required|string",
            'StatusDosen' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $kesesuaian = ' ';
        if ($request->kesesuaian) {
            $kesesuaian = $request->kesesuaian;
        }

        if ($profilDosen->detaildosen) {
            $detailDosen = Detaildosen::find($profilDosen->detaildosen->id);
            $detailDosen->bidangKeahlian = $request->bidangKeahlian;
            $detailDosen->kesesuaian = $kesesuaian;
            $detailDosen->save();
        } else {
            $bidangKeahlian = 'Teknik Elektro';
            if ($request->bidangKeahlian) {
                $bidangKeahlian = $request->bidangKeahlian;
            }
            $detailDosen = Detaildosen::create([
                'profil_dosen_id' => $profilDosen->id,
                'kesesuaian' => $kesesuaian,
                'bidangKeahlian' => $bidangKeahlian
            ]);
        }

        $perusahaan = ' ';
        if ($request->perusahaan && $profilDosen->StatusDosen == 'Dosen Industri') {
            $perusahaan = $request->perusahaan;
            $detailDosen->perusahaan = $perusahaan;
            $detailDosen->save();
        }



        $profilDosen->NamaDosen = $request->NamaDosen;
        $profilDosen->NIK = $request->NIK;
        $profilDosen->TempatLahir = $request->TempatLahir;
        $profilDosen->TanggalLahir = $request->TanggalLahir;
        $profilDosen->JenisKelamin = $request->JenisKelamin;
        $profilDosen->StatusPerkawinan = $request->StatusPerkawinan;
        $profilDosen->Agama = $request->Agama;
        $profilDosen->StatusDosen = $request->StatusDosen;

        $profilDosen->Golongan = isset($request->Golongan) ? $request->Golongan : '';
        $profilDosen->Pangkat = isset($request->Pangkat) ? $request->Pangkat : '';
        $profilDosen->JabatanAkademik = isset($request->JabatanAkademik) ? $request->JabatanAkademik : '';
        $profilDosen->Alamat = isset($request->Alamat) ? $request->Alamat : '';
        $profilDosen->NoTelepon = isset($request->NoTelepon) ? $request->NoTelepon : '';
        $profilDosen->Email = isset($request->Email) ? $request->Email : '';

        $profilDosen->TempatLahir = isset($request->TempatLahir) ? $request->TempatLahir : '';
        $profilDosen->TanggalLahir = isset($request->TanggalLahir) ? $request->TanggalLahir : '';
        $profilDosen->JenisKelamin = isset($request->JenisKelamin) ? $request->JenisKelamin : '';
        $profilDosen->StatusPerkawinan = isset($request->StatusPerkawinan) ? $request->StatusPerkawinan : '';
        $profilDosen->bidangKeahlian = isset($request->bidangKeahlian) ? $request->bidangKeahlian : '';
        $profilDosen->Agama = isset($request->Agama) ? $request->Agama : '';

        $profilDosen->save();


        return response()->json([
            'success' => true,
            'profil' => $profilDosen,
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
        $profilDosen = profilDosen::find($id);
        $profilDosen->delete();

        if (!$profilDosen) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Dihapus"
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "Berhasil Dihapus",
            'profilDosens' => profilDosen::all(),
        ]);
    }

    public function listtahun(Request $request)
    {
        //
        $alldtps = profilDosen::with('mengajars')->get();
        $arrTahun = array();
        foreach ($alldtps as $key => $dtps) {
            foreach ($dtps->mengajars as $key1 => $mengajar) {
                $arrTahun[] = $mengajar->tahun_akademik;
            }
        }
        return response()->json([
            'success' => true,
            'tahundtpss' => array_unique($arrTahun),
        ]);
    }

    public function allprofil()
    {
        //
        return response()->json([
            'success' => true,
            'profilDosens' => profilDosen::all(),
        ]);
    }

    public function searchprofil(Request $request, $search)
    {
        //
        $profilDosens = profilDosen::where('NamaDosen', 'LIKE', "%{$search}%")
            ->orWhere('NIDK', 'LIKE', "%{$search}%")
            ->orWhere('StatusDosen', 'LIKE', "%{$search}%")
            ->orWhere('Golongan', 'LIKE', "%{$search}%")
            ->orWhere('Pangkat', 'LIKE', "%{$search}%")
            ->orWhere('JabatanAkademik', 'LIKE', "%{$search}%")
            ->get();
        return response()->json([
            'success' => true,
            'profilDosens' => $profilDosens,
        ]);
    }

    public function get_dtps(Request $request)
    {
        //
        $profilDosens = profilDosen::where('StatusDosen', "Dosen Tetap")
            ->get();
        return response()->json([
            'success' => true,
            'profilDosens' => $profilDosens,
        ]);
    }

    public function get_profil(Request $request, $nidk)
    {
        //
        $profilDosen = profilDosen::where('NIDK', $nidk)
            ->first();
        return response()->json([
            'success' => true,
            'profilDosen' => $profilDosen,
        ]);
    }

    public function profil_lengkap(Request $request, $nidk)
    {
        //
        $profilDosen = profilDosen::where('NIDK', $nidk)->with('detaildosen', 'serkoms', 'pendidikans')
            ->first();
        return response()->json([
            'success' => true,
            'profilDosen' => $profilDosen,
        ]);
    }
}
