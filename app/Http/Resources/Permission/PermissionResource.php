<?php

namespace App\Http\Resources\Permission;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Profil;
use App\Models\Menu;
use App\Models\Action;

class PermissionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'profil_id'=>$this->profil_id,
            'lib_profil_fr'=>Profil::find($this->profil_id)->libelle_fr ?? '',
            'lib_profil_en'=>Profil::find($this->profil_id)->libelle_en ?? '',
            'menu_id'=>$this->menu_id,
            'lib_menu_fr'=>Menu::find($this->menu_id)->libelle_fr ?? '',
            'lib_menu_en'=>Menu::find($this->menu_id)->libelle_en ?? '',
            'action_id'=>$this->action_id,
            'lib_action_fr'=>Action::find($this->action_id)->libelle_fr ?? '',
            'lib_action_en'=>Action::find($this->action_id)->libelle_en ?? '',
            'created_user'=>$this->created_user,
            'updated_user'=>$this->updated_user,
            'deleted_user'=>$this->deleted_user,
            'created_at'=>(new \DateTime($this->created_at))->format('d/m/Y H:i:s'),
            'updated_at'=>$this->updated_at!==null ? (new \DateTime($this->updated_at))->format('d/m/Y H:i:s') : null,
            'deleted_at'=> $this->deleted_at!==null ? (new \DateTime($this->deleted_at))->format('d/m/Y H:i:s') : null ,
        ];;
    }
}
