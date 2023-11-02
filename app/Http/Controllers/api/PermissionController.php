<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Permission\PermissionCollection;
use App\Http\Resources\Permission\PermissionResource;
use App\Models\Menu;
use App\Models\Permission;
use App\Services\Serpermission;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return new PermissionCollection(Permission::all());
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

        if (!empty($request->profil_id) and  $request->profil_id != null) {
            $this->delete_hard($request->profil_id);
        }

        $data_perm = [];

        foreach ($request->choices as $data) {
            $arr_splt = explode("|", $data);
            $menu_id = (int) $arr_splt[0];
            $action_id = (int) $arr_splt[1];
            //dump ((int) $arr_splt[0]);
            $data_perm[] = [
                'menu_id' => $menu_id,
                'profil_id' => (int) $request->profil_id,
                'action_id' => $action_id,
                'created_user' => Auth::id(),
                'created_at' => Carbon::now()
            ];
        }
        DB::table('permissions')->insert($data_perm);

        return response()->json([
            'result' => true,
            "message" => "succès",
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show(Request $request)
    {
        $permission = Permission::find($request->id);
        if ($permission) {
            return response()->json(new PermissionResource(Permission::find($request->id)), 201);
        } else {
            return response()->json([
                'result' => false,
                "message" => "Cette permission n'existe pas",
            ]);
        }
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

    public function update(Request $request)
    {
        $messages = array(
            'id.required' => __('error.required'),
        );
        $validator = Validator::make($request->all(), [
            "id" => "required",
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $record = Permission::find($request->id);
        $current = Carbon::now();
        $data = [];

        if ($record) {
            $data = [
                'menu_id' => $request->menu_id,
                'profil_id' => $request->profil_id,
                'action_id' => $request->action_id,
                'updated_user' => Auth::id(),
                'updated_at' => $current,
            ];
            Permission::where('id', $request->id)->update($data);
            return response()->json(new PermissionResource(Permission::find($request->id)), 201);
        } else {
            return response()->json([
                'result' => false,
                "message" => "Cette permission n'existe pas",
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy(Request $request)
    {

        $messages = array(
            'id.required' => __('error.required'),
        );
        $validator = Validator::make($request->all(), [
            "id" => "required",
        ], $messages);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $record = Permission::where('profil_id', $request->id)->get();
        $current = Carbon::now();

        if (count($record) > 0) {
            Permission::where('profil_id', $request->id)->update([
                'deleted_at' => $current,
                'deleted_user' => Auth::id(),
            ]);
            return response()->json(new PermissionCollection(Permission::withTrashed()->where('profil_id', $request->id)->get()), 201);
        } else {
            return response()->json([
                'result' => false,
                "message" => "Cette permission n'existe pas",
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function delete_hard($id)
    {
        $record = Permission::withTrashed()->where('profil_id', $id)->get();
        if (count($record) > 0) {

            DB::table('permissions')->where('profil_id', $id)->delete();
            return response()->json([
                'result' => true,
                "message" => "Permission supprimée avec succès",
            ]);
        } else {
            return response()->json([
                'result' => false,
                "message" => "Cette permission n'existe pas",
            ]);
        }
    }

    public function test_permission(Request $request)
    {
        try {
            $this->validate(
                $request,
                [
                    'profil_id' => 'required',
                    'menu_code' => 'required',
                ]
            );
            $id_profil = $request->profil_id;
            $menu_code = $request->menu_code;

            $rec_menu = Menu::where('code', $menu_code)->get();

            if ($rec_menu) {
                $id_menu = $rec_menu[0]->id;
                return (new Serpermission)->habilitation_user_action($id_profil, $id_menu);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Something went wrong in PermissionController.test_permission',
            ]);
        }
    }
}
