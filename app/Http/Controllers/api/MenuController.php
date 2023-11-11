<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MenuController extends Controller
{
    protected $menu;

    public function __construct(Menu $menu)
    {
        $this->menu = $menu;
    }

    public function index()
    {
        $menus = $this->menu->getsMenu();
        return response()->json(["data" => $menus]);
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

    public function store(Request $request)
    {
        $data = $request->validate([
            'libelle_fr' => '',
            'libelle_en' => '',
            'menu_id' => '',
            'code' => '',
            'position' => '',
            'statut' => '',
            'icone' => '',
            'target' => '',
            'typemenu' => '',
        ]);

        $menu = new Menu();
        $menu->typemenu = $data["typemenu"];
        $menu->libelle_fr = $data["libelle_fr"];
        $menu->libelle_en = $data["libelle_en"];
        $menu->code = $data["code"];
        $menu->position = $data["position"];
        $menu->statut = $data["statut"];
        $menu->icone = $data["icone"] ? $data["icone"] : 0;
        $menu->target = $data["target"];
        $menu->menu_id = $data["menu_id"];
        $menu->created_user = Auth::user()->id;
        $menu->save();

        return response()->json([
            'statut' => true
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $menu = Menu::with('menus', 'menu')->where('id', $id)->first();
        if ($menu) {
            return response()->json(['data' => $menu]);
        }
        return response()->json(["msg" => "menu introuvable"], 404);
    }

    public function edit($id)
    {
        $menu = Menu::with('menus', 'menu')->where('id', $id)->first();
        if ($menu) {
            return response()->json(['data' => $menu]);
        }
        return response()->json(["msg" => "menu introuvable"], 404);
    }

    public function update(Request $request, Menu  $menu)
    {
        try {
            $menu->libelle_fr = $request->libelle_fr != '' ? $request->libelle_fr : '';
            $menu->libelle_en = $request->libelle_en != '' ? $request->libelle_en : '';
            $menu->target = $request->target != '' ? $request->target : '';
            $menu->icone = $request->icone != '' ? $request->icone : '';
            $menu->code = $request->code != '' ? $request->code : '';
            $menu->position = $request->position != '' ? $request->position : '';
            $menu->statut = $request->statut;
            $menu->typemenu = $request->typemenu;
            $menu->menu_id = $request->menu_id;
            // $menu->updated_user = Auth::user()->id;
            $menu->save();
            return response()->json($menu);
        } catch (ModelNotFoundException $exception) {
            return response()->json(["msg" => 'introuvable'], 404);
        }
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return response()->json([
            'result' => true,
            "message" => "Menu supprimé avec succès"
        ]);
    }

    public function habilitation_user_menus()
    {

        $data = DB::table('menus')
            ->select('menus.menu_id', 'menus.typemenu', 'menus.id', 'menus.statut', 'libelle_fr', 'libelle_en', 'icone', 'target', 'code', 'position')
            ->distinct()
            ->join('permissions', 'permissions.menu_id', '=', 'menus.id')
            ->where('menus.statut', 1)
            ->where('menus.typemenu', 'SIDE')
            ->where('permissions.profil_id', Auth::user()->profil_id)
            ->orderBy('position', 'ASC')
            ->get();

        $para = DB::table('menus')
            ->select('menus.menu_id', 'menus.typemenu', 'menus.id', 'menus.statut', 'libelle_fr', 'libelle_en', 'icone', 'target', 'code', 'position')
            ->distinct()
            ->join('permissions', 'permissions.menu_id', '=', 'menus.id')
            ->where('menus.statut', 1)
            ->where('menus.typemenu', 'PARA')
            ->where('permissions.profil_id', Auth::user()->profil_id)
            ->orderBy('position', 'ASC')
            ->get();


        return response()->json([
            'data' => $data,
            'para' => $para,
        ]);
    }

    public function habilitation_user_menus2()
    {

        $data = DB::table('menus')
            ->select('menus.menu_id', 'menus.typemenu', 'menus.id', 'menus.statut', 'libelle_fr', 'libelle_en', 'icone', 'target', 'code', 'position')
            ->distinct()
            ->join('permissions', 'permissions.menu_id', '=', 'menus.id')
            ->where('menus.statut', 1)
            ->where('menus.typemenu', 'SIDE')
            ->where('permissions.profil_id', optional(Auth::user())->profil_id)
            ->orderBy('position', 'ASC')
            ->get();

        $para = DB::table('menus')
            ->select('menus.menu_id', 'menus.typemenu', 'menus.id', 'menus.statut', 'libelle_fr', 'libelle_en', 'icone', 'target', 'code', 'position')
            ->distinct()
            ->join('permissions', 'permissions.menu_id', '=', 'menus.id')
            ->where('menus.statut', 1)
            ->where('menus.typemenu', 'PARA')
            ->where('permissions.profil_id', optional(Auth::user())->profil_id) // Utilisation de optional() pour éviter une erreur si Auth::user() est null
            ->orderBy('position', 'ASC')
            ->get();


        // Récupérer les sous-sous-menus pour les menus SIDE
        $subSubMenusData = DB::table('menus')
            ->select('menus.menu_id', 'menus.typemenu', 'menus.id', 'menus.statut', 'libelle_fr', 'libelle_en', 'icone', 'target', 'code', 'position')
            ->distinct()
            ->join('permissions', 'permissions.menu_id', '=', 'menus.id')
            ->whereIn('menus.menu_id', $data->pluck('id'))
            ->where('menus.statut', 1)
            ->where('menus.typemenu', 'SIDE')
            ->where('permissions.profil_id', Auth::user()->profil_id)
            ->orderBy('position', 'ASC')
            ->get();

        return response()->json([
            'data' => $data,
            'para' => $para,
            'subSubMenusData' => $subSubMenusData,
        ]);
    }
}
