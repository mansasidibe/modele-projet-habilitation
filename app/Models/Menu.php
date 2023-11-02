<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Menu extends Model
{
    use HasFactory, SoftDeletes;
    protected $table="menus";

    protected $fillable = [
        'libelle_fr',
        'libelle_en',
        'target',
        'icone',
        'code',
        'position',
        'typemenu',
        'menu_id',
        'statut',
        'created_user',
        'updated_user',
        'deleted_user',
    ];

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    /**
     * @param array $attributes
     * @return Menu
     */
    public function createMenu(array $attributes){
        $menu = new self();
        $menu->typemenu = $attributes["typemenu"];
        $menu->libelle_fr = $attributes["libelle_fr"];
        $menu->libelle_en = $attributes["libelle_en"];
        $menu->code = $attributes["code"];
        $menu->position = $attributes["position"];
        $menu->statut = $attributes["statut"];
        $menu->icone = $attributes["icone"];
        $menu->target = $attributes["target"];
        $menu->menu_id = $attributes["menu_id"];
        $menu->created_user = Auth::user()->id;
        $menu->save();
        return $menu;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function getMenu(int $id) {
        $menu = $this->where(["id" => $id, "statut" =>1])->first();
        return $menu;
    }

    /**
     * @return Menu[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getsMenu() {
        $menu = $this::with('menus')->orderBy('position', 'ASC')->get();
        return $menu;
    }

    /**
     * @param int $id
     * @param array $attributes
     * @return mixed
     */
    public function updateMenu(int $id, array $attributes){
        $menu = $this->getMenu($id);
        if($menu == null){
            throw new ModelNotFoundException("Menu introuvable");
        }
        $menu->typemenu = $attributes["typemenu"];
        $menu->libelle_fr = $attributes["libelle_fr"];
        $menu->libelle_en = $attributes["libelle_en"];
        $menu->code = $attributes["code"];
        $menu->position = $attributes["position"];
        $menu->statut = $attributes["statut"];
        $menu->icone = $attributes["icone"];
        $menu->target = $attributes["target"];
        $menu->menu_id = $attributes["menu_id"];
        $menu->updated_user = Auth::user()->id;
        $menu->save();
        return $menu;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function deleteMenu(int $id){
        $menu = $this->getMenu($id);
        if($menu == null){
            throw new ModelNotFoundException("Menu introuvable");
        }
        return $menu->delete();
    }

    public function menu_module()
    {
        return $this->hasMany(MenuModule::class);
    }

    public static function habilitation_user_menus($profil_id){

        $dataMenus = Menu::where('menu_id', 0)->get();
        $dataPermissions = Permission::where('profil_id','=',$profil_id)->get();

        $dataPermissions_ids = [];
        foreach ($dataPermissions as $permission) {
            $dataPermissions_ids[] = $permission['menu_id'];
        }

        foreach ($dataMenus as $all_menu) {
            $resultat = in_array($all_menu["id"], $dataPermissions_ids) ? Menu::where('code', $all_menu["code"])->with('menus')->get() : false;

        }

        return response()->json(['data' => $resultat]);
    }
}
