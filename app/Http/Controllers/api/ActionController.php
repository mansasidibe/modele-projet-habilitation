<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Action;
use App\Http\Resources\Action\ActionResource;
use App\Http\Resources\Action\ActionCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;

class ActionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
       return new ActionCollection(Action::where('statut','=',1)->orderBy('position','ASC')->get());

    }

    public function store(Request $request)
    {

       try{

        $max_position= DB::table('actions')->max('position'); //Get last positions of entries
        $messages = array(
            'libelle_fr.required' => __('error.required'),
            'libelle_fr.unique' => __('error.unique'),
            'libelle_en.required' => __('error.required'),
            'libelle_en.unique' => __('error.unique'),
        );

        $action = new Action;
        $action->libelle_fr=$request->libelle_fr;
        $action->libelle_en=$request->libelle_en;
        $action->position=intval($max_position)+1;
        $action->icon=$request->icon;
        $action->statut=1;
        $action->created_user=Auth::id();
        $action->save();
        return response()->json(new ActionResource($action),201);

        }catch(\Exception $e) {
            return response()->json([
                'error'=>$e->getMessage(),
                'message'=>'Something went wrong in ActionController.store'
            ]);
        }


    }

    public function show(Request $request)
    {
          $action =Action::find($request->id);

          if($action){
            return response()->json(new ActionResource(Action::find($request->id)),201);
          }else{
            return response()->json([
                'result'=>false,
                 "message"=>"Cette action n'existe pas"
            ]);
          }

    }

    public function update(Request $request, Action $action)
    {
        $messages = array(
            'id.required' => __('error.required'),
        );

        $record =Action::find($request->id);
        $current =Carbon::now();
        $data=[];
        if($record){
                $data=[
                    'libelle_fr' => $request->libelle_fr ??  $record->libelle_fr,
                    'libelle_en'=>$request->libelle_en ??  $record->libelle_en,
                    'position'=>$request->position ??  $record->position,
                    'icon'=>$request->icon ??  $record->icon,
                    'statut'=>$request->statut ??  $record->statut,
                    'updated_user' =>Auth::id(),
                    'updated_at'=>$current
                ];
              Action::where('id',$request->id)->update($data);
              return response()->json(new ActionResource(Action::find($request->id)),201);
        }else{
                return response()->json([
                    'result'=>false,
                    "message"=>"Cette action n'existe pas"
                ]);
        }

    }

    public function destroy(Request $request)
    {
        $messages = array(
            'id.required' => __('error.required'),
        );
       
        $record =Action::where('id' , $request->id)->get();
        $current =Carbon::now();


        if(count($record) >0){
            Action::where('id',$request->id)->update([
                'deleted_at'=>$current,
                'deleted_user'=>Auth::id()
            ]);
            return response()->json( new ActionCollection( Action::withTrashed()->where('id' , $request->id)->get()),201);
        }else{
            return response()->json([
                'result'=>false,
                "message"=>"Cette action n'existe pas"
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
        $record =Action::withTrashed()->where('id' , $request->id)->get();
        if(count($record) >0){

            DB::table('actions')->where('id', $request->id)->delete();
            return response()->json([
                'result'=>true,
                "message"=>"Action supprimée avec succès"
            ]);
        }else{
            return response()->json([
                'result'=>false,
                "message"=>"Cette action n'existe pas"
            ]);
        }

    }
}
