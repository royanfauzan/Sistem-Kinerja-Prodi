<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search($search)
    {
        return response()->json([
            'success' => true,
            'search' => User::where('NIDK', 'LIKE', "%{$search}%")
                ->orwhere('role', 'LIKE', "%{$search}%")
                ->orwhere('level_akses', 'LIKE', "%{$search}%")->get()
        ]);
    }


    public function index()
    {
        //
        return response()->json([
            'success' => true,
            'tampil_user' => User::all(),
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
        $credentials = $request->only(
            'NIDK',
            'password',
            'role',
            'level_akses',
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'NIDK' => 'required|numeric|unique:users',
            'role' => 'required|string|',
            'password' => 'required|string|',
            'level_akses' => 'required|numeric|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $model = User::create([
            'NIDK' => $request->NIDK,
            'role' => $request->role,
            'password' => bcrypt($request->password),
            'level_akses' => $request->level_akses,
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return response()->json([
            'success' => true,
            'tampil_user' => User::find($id),
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
        $credentials = $request->only(
            'NIDK',
            'password',
            'role',
            'level_akses',
        );

        //valid credential
        $validator = Validator::make($credentials, [
            'NIDK' => 'required|string|unique',
            'role' => 'required|string|',
            'password' => 'required|Password::min(6)->mixedCase()|',
            'level_akses' => 'required|numeric|',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }




        $model = User::find($id);
        $model->NIDK = $request->NIDK;
        $model->role = $request->rollevel_aksese;
        $model->level_akses = $request->role;
        $model->password = bcrypt($request->password);
        $model->save();

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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $model = User::find($id);
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
