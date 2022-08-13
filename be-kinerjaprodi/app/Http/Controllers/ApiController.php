<?php

namespace App\Http\Controllers;

use App\Models\Bbjurnaldos;
use App\Models\Ewmp;
use App\Models\profilDosen;
use App\Models\User;
use App\Models\Mitra;
use App\Models\Kerjasama;
use App\Models\Pagelarandos;
use App\Models\Seminardos;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiController extends Controller
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
    //
    // public function register(Request $request)
    // {
    // 	//Validate data
    //     $data = $request->only('name', 'email', 'password');
    //     $validator = Validator::make($data, [
    //         'name' => 'required|string',
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required|string|min:6|max:50'
    //     ]);

    //     //Send failed response if request is not valid
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => $validator->errors(),
    //         ], 400);
    //     }

    //     //Request is valid, create new user
    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => bcrypt($request->password)
    //     ]);

    //     //User created, return success response
    //     return response()->json([
    //         'success' => true,
    //         'message' => 'User created successfully',
    //         'data' => $user
    //     ], Response::HTTP_OK);
    // }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('NIDK', 'password');

        //valid credential
        $validator = Validator::make($credentials, [
            'NIDK' => 'required',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        //Request is validated
        //Crean token   
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Login credentials are invalid.',
                ], 400);
            }
        } catch (JWTException $e) {
            return $credentials;
            return response()->json([
                'success' => false,
                'message' => 'Could not create token.',
            ], 500);
        }

        $user = User::where('NIDK', $request->NIDK)->first();

        //Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $user,
            'userProfile' => $user->profilDosen
        ]);
    }

    public function logout(Request $request)
    {
        //valid credential
        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

    	//Request is validated, do logout        
        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User has been logged out'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function get_user(Request $request)
    {
        // $this->validate($request, [
        //     'token' => 'required'
        // ]);

        $user = JWTAuth::authenticate($request->bearerToken());

        return response()->json(['user' => $user]);
    }

    public function get_alluser()
    {
        return response()->json(['userdosen' => User::with('profilDosen')->get()]);
    }

    public function get_dashboardAdmin()
    {
        $tahunlistAkademik = $this->tahuntsgenerator(date('Y'),'akademik');
        $jumlah_dtps = profilDosen::where('StatusDosen','Dosen Tetap')->count();
        $jumlah_ewmp_ts = Ewmp::where('tahun_akademik',$tahunlistAkademik->ts)->count();
        $jumlah_ewmp_ts1 = Ewmp::where('tahun_akademik',$tahunlistAkademik->ts1)->count();
        $jumlah_ewmp_ts2 = Ewmp::where('tahun_akademik',$tahunlistAkademik->ts2)->count();
        $totalEwmp = $jumlah_ewmp_ts + $jumlah_ewmp_ts1 + $jumlah_ewmp_ts2;
        $progres = 0;
        if ($totalEwmp>0) {
            $progres =round(($totalEwmp/($jumlah_dtps*3*2))*100,1);
        }

        if ($progres>100) {
            $progres=100;
        }

        $tahunlist = $this->tahuntsgenerator(date('Y'));

        $JurnalDosens = Bbjurnaldos::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->get();
        $jmlJurnal = $JurnalDosens->count();
        $jmlSitasi = Bbjurnaldos::where('tahun', $tahunlist->ts)
        ->orWhere('tahun', $tahunlist->ts1)
        ->orWhere('tahun', $tahunlist->ts2)
        ->sum('sitasi');

        $SeminarDosens = Seminardos::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->count();

        $PagelaranDosens = Pagelarandos::where('tahun', $tahunlist->ts)
            ->orWhere('tahun', $tahunlist->ts1)
            ->orWhere('tahun', $tahunlist->ts2)
            ->count();
        
        $totalPublikasi = $jmlJurnal+$SeminarDosens+$PagelaranDosens;

        return response()->json([
            'jumlah_dtps' => $jumlah_dtps,
            'jumlah_ewmp_ts' => $jumlah_ewmp_ts,
            'jumlah_ewmp_ts1' => $jumlah_ewmp_ts1,
            'jumlah_ewmp_ts2' => $jumlah_ewmp_ts2,
            'progres_ewmp' => $progres,
            'jumlah_publikasi_jurnal' => $jmlJurnal,
            'jumlah_sitasi_jurnal' => $jmlSitasi,
            'jumlah_publikasi_seminar' => $SeminarDosens,
            'jumlah_publikasi_pagelaran' => $PagelaranDosens,
            'total_publikasi' => $totalPublikasi,
        ]);
    }

}
