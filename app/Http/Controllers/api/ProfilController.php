<?php

namespace App\Http\Controllers\api;

use Carbon\Carbon;
use App\Models\Profil;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Profil\ProfilResource;
use App\Http\Resources\Profil\ProfilCollection;

class ProfilController extends Controller
{
    public function generateRandomCodeProfil($codPro)
    {
        $res = "";
        $tab = explode(' ', trim($codPro));
        foreach ($tab as $i) {
            if (strlen($i) <= 3)
                $res .= strtoupper($i);
            else {
                $res .= strtoupper(substr($i, 0, 3));
            }
        }
        return $res;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function generate_code(Request $request){
        return response()->json([
            'result'=>true,
             "data"=>$this->generateRandomCodeProfil($request->libelle_fr)
        ],201);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        //
       return new ProfilCollection(Profil::all());

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
        $messages = array(
            //'code.required' => __('error.required'),
            'code.unique' => __('error.unique'),
            'libelle_fr.required' => __('error.required'),
            'libelle_fr.unique' => __('error.unique'),
            'libelle_en.required' => __('error.required'),
            'libelle_en.unique' => __('error.unique'),
        );
        $validator = Validator::make($request->all(), [
            "code"=> "unique:profils",
            "libelle_fr"=> "required|unique:profils",
            "libelle_en"=>"required|unique:profils",

        ],$messages);

        if($validator->fails()){
            return response()->json($validator->errors());
        }


        $profil = new Profil;
        $profil->code=$this->generateRandomCodeProfil($request->libelle_fr);
        $profil->libelle_fr=$request->libelle_fr;
        $profil->libelle_en=$request->libelle_en;
        $profil->description_fr=$request->description_fr;
        $profil->description_en=$request->description_en;
        $profil->statut=1;
        $profil->created_user=Auth::id();
        $profil->save();
        return response()->json(new ProfilResource($profil),201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show(Request $request)
    {
        $profil=DB::table('profils')
        ->select('profils.*')
        ->where('profils.id',$request->id)
        ->get();

       $dataMenus=DB::table('menus')
       ->select('menus.*')
       ->where('menus.statut',1)
       ->orderBy('menus.position', 'ASC')
       ->get();

       $dataActions=DB::table('actions')
        ->select('actions.*')
        ->distinct('actions.id')
        ->where('actions.statut',1)
        ->orderBy('actions.position', 'ASC')
        ->get();

        $dataMenus=DB::table('menus')
        ->distinct('menus.id')
        ->where('menus.statut',1)
        //->where('menus.id',7)
        ->orderBy('menus.position', 'ASC')
        ->get();

        $dataActions=DB::table('actions')
        ->distinct('actions.id')
        ->where('actions.statut',1)
        ->orderBy('actions.position', 'ASC')
        ->get();
        $result=[];   
        $data=[];
        $dataPermissions=DB::table('permissions')
        ->select('permissions.*')
       ->where('permissions.profil_id',$request->id)
        ->get();

        if(count($profil) >0){
            $dataPermissions_ids = [];
            foreach ($dataPermissions as $permission) {
                if(isset($permission->menu_id) AND isset($permission->action_id) )
                    $dataPermissions_ids[] = [$permission->menu_id, $permission->action_id];
            }
            foreach ($dataMenus as $dataMenu) {
                  $id_menu=$dataMenu->id;
                  $lib_menu_fr=$dataMenu->libelle_fr;
                  $lib_menu_en=$dataMenu->libelle_en;
                  $res_action=[];
                foreach ($dataActions as $all_action) {
                    $id_action=$all_action->id;
                    $lib_action_fr=$all_action->libelle_fr;
                    $lib_action_en=$all_action->libelle_en;
                    $perm=false;
                    if(in_array(array($id_menu, $all_action->id), $dataPermissions_ids))
                        $perm=true;

                        $res_action[]=[
                            'id_action'=>$id_action,
                            'lib_action_fr'=>$lib_action_fr,
                            'lib_action_en'=>$lib_action_en,
                            'perm'=>$perm,
                        ];
                }
                $result[]=[
                    'id_menu'=>$id_menu,
                    'lib_menu_fr'=>$lib_menu_fr,
                    'lib_menu_en'=>$lib_menu_en,
                    'actions'=> array_diff_key($res_action)
               ];
            }
                $data[]=[
                    'id_profil'=>$profil[0]->id,
                    'code'=>$profil[0]->code,
                    'libelle_fr'=>$profil[0]->libelle_fr,
                    'libelle_en'=>$profil[0]->libelle_en,
                    'menus'=>$result
               ];


            return response()->json($data,201);

        }else{
          return response()->json([
              'result'=>false,
               "message"=>"Ce profil n'existe pas"
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
      * @param  \App\Models\Profil  $profil
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, Profil  $profil)
    {
        $messages = array(
            'id.required' => __('error.required'),
        );
        $validator = Validator::make($request->all(), [
            "id"=> "required",
        ], $messages);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $record =Profil::find($request->id);
        $current =Carbon::now();
        $data=[];
        if($record){
                $data=[
                    'code' => $request->code ??  $record->code,
                    'libelle_fr' => $request->libelle_fr ??  $record->libelle_fr,
                    'libelle_en'=>$request->libelle_en ??  $record->libelle_en,
                    'description_fr' => $request->description_fr ??  $record->description_fr,
                    'description_en'=>$request->description_en ??  $record->description_en,
                    'updated_user' => Auth::id(),
                    'updated_at'=>$current
                ];
              Profil::where('id',$request->id)->update($data);
              return response()->json(new ProfilResource(Profil::find($request->id)),201);
        }else{
                return response()->json([
                    'result'=>false,
                    "message"=>"Ce profil n'existe pas"
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
            "id"=> "required",
        ], $messages);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $record =Profil::where('id' , $request->id)->get();
        $current =Carbon::now();


        if(count($record) >0){
            Profil::where('id',$request->id)->update([
                'deleted_at'=>$current,
                'deleted_user'=>Auth::id()
            ]);
            return response()->json( new ProfilCollection( Profil::withTrashed()->where('id' , $request->id)->get()),201);
        }else{
            return response()->json([
                'result'=>false,
                "message"=>"Ce profil n'existe pas"
            ]);
        }
    }

    public function delete_hard(Request $request){

        $messages = array(
            'id.required' => __('error.required'),
        );
        $validator = Validator::make($request->all(), [
            "id"=> "required",
        ], $messages);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $record =Profil::withTrashed()->where('id' , $request->id)->get();
        if(count($record) >0){

            DB::table('profils')->where('id', $request->id)->delete();
            return response()->json([
                'result'=>true,
                "message"=>"Profil supprimé avec succès"
            ]);
        }else{
            return response()->json([
                'result'=>false,
                "message"=>"Ce Profil n'existe pas"
            ]);
        }

    }
}
