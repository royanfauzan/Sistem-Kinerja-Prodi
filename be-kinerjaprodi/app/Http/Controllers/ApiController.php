<?php

namespace App\Http\Controllers;

use App\Models\profilDosen;
use App\Models\User;
use App\Models\Mitra;
use App\Models\Kerjasama;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiController extends Controller
{
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

    // public function logout(Request $request)
    // {
    //     //valid credential
    //     $validator = Validator::make($request->only('token'), [
    //         'token' => 'required'
    //     ]);

    //     //Send failed response if request is not valid
    //     if ($validator->fails()) {
    //         return response()->json(['error' => $validator->errors()], 200);
    //     }

    // 	//Request is validated, do logout        
    //     try {
    //         JWTAuth::invalidate($request->token);

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'User has been logged out'
    //         ]);
    //     } catch (JWTException $exception) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Sorry, user cannot be logged out'
    //         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }

    // public function get_user(Request $request)
    // {
    //     // $this->validate($request, [
    //     //     'token' => 'required'
    //     // ]);

    //     $user = JWTAuth::authenticate($request->bearerToken());

    //     return response()->json(['user' => $user]);
    // }

    public function tester(Request $request)
    {
        return response()->json(['Sukses' => true]);
    }

    public function insertmitra(Request $request)
    {
        $credentials = $request->only(
            'namamitra',
            'alamat',
            'no_telepon',
            'nama_cp',
            'no_telp_cp',
            'email_cp',
            'bidang',
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'namamitra' => 'required|string|min:6',
            'alamat' => 'required|string|',
            'no_telepon' => 'required|string|',
            'nama_cp' => 'required|string|',
            'no_telp_cp' => 'required|string|',
            'email_cp' => 'required|string|',
            'bidang' => 'required|string|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $model = Mitra::create([
            'namamitra' => $request->namamitra,
            'alamat' => $request->alamat,
            'no_telepon' => $request->no_telepon,
            'nama_cp' => $request->nama_cp,
            'no_telp_cp' => $request->no_telp_cp,
            'email_cp' => $request->email_cp,
            'bidang' => $request->bidang,
        ]);

        if (!$model) {
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


    public function editmitra(Request $request, $id)
    {
        $credentials = $request->only(
            'namamitra',
            'alamat',
            'no_telepon',
            'nama_cp',
            'no_telp_cp',
            'email_cp',
            'bidang',
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'namamitra' => 'required|string|min:6',
            'alamat' => 'required|string|',
            'no_telepon' => 'required|string|',
            'nama_cp' => 'required|string|',
            'no_telp_cp' => 'required|string|',
            'email_cp' => 'required|string|',
            'bidang' => 'required|string|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }
        $model = Mitra::find($id);
        $model->namamitra = $request->namamitra;
        $model->alamat = $request->alamat;
        $model->no_telepon = $request->no_telepon;
        $model->nama_cp = $request->nama_cp;
        $model->no_telp_cp = $request->no_telp_cp;
        $model->email_cp =  $request->email_cp;
        $model->bidang = $request->bidang;
        $model->save();

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Update"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Update"
        ]);
    }
    public function deletemitra($id)
    {
        $model = Mitra::find($id);
        $model->delete();

        if (!$model) {
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


    public function insertkerjasama(Request $request)
    {
        $credentials = $request->only(
            'namamitra',
            'tingkat',
            'judul_kegiatan',
            'manfaat',
            'tanggal_kegiatan',
            'lama_kegiatan',
            'bukti_kerjasama',
            'tahun_berakhir',
            'bidang',
            'file_bukti'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'namamitra' => 'required|string|min:6',
            'tingkat' => 'required|string|min:6',
            'judul_kegiatan' => 'required|string|',
            'manfaat' => 'required|string|',
            'tanggal_kegiatan' => 'required|string|',
            'lama_kegiatan' => 'required|string|',
            'bukti_kerjasama' => 'required|string|',
            'tahun_berakhir' => 'required|string|',
            'bidang' => 'required|string|',
            'file_bukti' => 'required|string|',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $mitra = Mitra::where('namamitra', $request->namamitra)->first();
        $model = Kerjasama::create([
            'mitra_id' => $mitra->id,
            'tingkat' => $request->tingkat,
            'judul_kegiatan' => $request->judul_kegiatan,
            'manfaat' => $request->manfaat,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
            'lama_kegiatan' => $request->lama_kegiatan,
            'bukti_kerjasama' => $request->bukti_kerjasama,
            'tahun_berakhir' => $request->tahun_berakhir,
            'bidang' => $request->bidang,
            'file_bukti' => $request->file_bukti,

        ]);

        if (!$model) {
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


    public function editkerjasama(Request $request, $id)
    {
        $credentials = $request->only(
            'namamitra',
            'tingkat',
            'judul_kegiatan',
            'manfaat',
            'tanggal_kegiatan',
            'lama_kegiatan',
            'bukti_kerjasama',
            'tahun_berakhir',
            'bidang',
            'file_bukti'
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'namamitra' => 'required|string|min:6',
            'tingkat' => 'required|string|min:6',
            'judul_kegiatan' => 'required|string|',
            'manfaat' => 'required|string|',
            'tanggal_kegiatan' => 'required|string|',
            'lama_kegiatan' => 'required|string|',
            'bukti_kerjasama' => 'required|string|',
            'tahun_berakhir' => 'required|string|',
            'bidang' => 'required|string|',
            'file_bukti' => 'required|string|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        $mitra = Mitra::where('namamitra', $request->namamitra)->first();
        $model = Kerjasama::find($id);
        $model->mitra_id = $mitra->id;
        $model->tingkat = $request->tingkat;
        $model->judul_kegiatan = $request->judul_kegiatan;
        $model->manfaat = $request->manfaat;
        $model->tanggal_kegiatan = $request->tanggal_kegiatan;
        $model->lama_kegiatan =  $request->lama_kegiatan;
        $model->bukti_kerjasama = $request->bukti_kerjasama;
        $model->tahun_berakhir = $request->tahun_berakhir;
        $model->bidang = $request->bidang;
        $model->file_bukti = $request->file_bukti;
        $model->save();

        if (!$model) {
            return response()->json([
                'success' => false,
                'message' => "Gagal Update"
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => "Berhasil Update"
        ]);
    }

    public function delete_kjs($id)
    {
        $model = Kerjasama::find($id);
        $model->delete();

        if (!$model) {
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
