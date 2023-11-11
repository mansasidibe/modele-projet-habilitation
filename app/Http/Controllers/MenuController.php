<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Menu;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    protected $menu;

    public function __construct(Menu $menu){
        $this->menu = $menu;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Liste des menus
        $menus = $this->menu->getsMenu();
        return view('pages.menus.index', compact('menus'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $menus = Menu::where('menu_id', 0)->get();
        return view('pages.menus.create', compact('menus'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'typemenu' => 'required',
            'libelle_fr' => 'required',
            'libelle_en' => 'required',
            'code' => 'required',
            'position' => 'required',
            'statut' => 'required',
            'icone' => 'required',
            'target' => 'required',
            'menu_id' => 'required',
        ]);

        $menu = $this->menu->createMenu($request->all());
        $request->session()->flash('status', 'Le produit a été créé avec succès!');

        return redirect()->route('menu.index')->with('message', 'Menu enregistré avec succès.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $decode =base64_decode($id);
        $menu = $this->menu->getMenu($decode);

        if($menu){
            return view('pages.menus.show', compact('menu', 'decode'));
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
        $decode =base64_decode($id);
        $menu = Menu::findOrFail($decode);
        return view('pages.menus.edit', compact('menu', 'decode'));
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
        try {
            $menu = $this->menu->updateMenu($id, $request->all());
            return redirect()->route('menu.index')->with(['msg' => "mis à jour avec succès."]);
        }catch (ModelNotFoundException $exception){
            return response()->json(["msg"=>"erreur"],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Menu::where('id', $id)->update(['deleted_user'=> Auth::user()->id]);
        $menu = Menu::where('id' , $id)->delete();
		return response()->json(1);
    }
}
