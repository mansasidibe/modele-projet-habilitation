<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
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

        // return response()->json([
        //     'data' => $data,
        //     'para' => $para,
        //     'subSubMenusData' => $subSubMenusData,
        // ]);
        return view('home',compact("data", "para", "subSubMenusData"));
    }
}
