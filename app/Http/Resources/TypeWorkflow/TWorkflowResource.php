<?php

namespace App\Http\Resources\TypeWorkflow;

use Illuminate\Http\Resources\Json\JsonResource;

class TWorkflowResource extends JsonResource
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
            'libelle_fr'=>$this->libelle_fr,
            'libelle_en'=>$this->libelle_en,
            'code'=>$this->code,
            'statut'=> intval($this->statut),
            'created_user'=>$this->created_user,
            'updated_user'=>$this->updated_user,
            'deleted_user'=>$this->deleted_user,
            'created_at'=>(new \DateTime($this->created_at))->format('d/m/Y H:i:s'),
            'updated_at'=>$this->updated_at!==null ? (new \DateTime($this->updated_at))->format('d/m/Y H:i:s') : null,
            'deleted_at'=> $this->deleted_at!==null ? (new \DateTime($this->deleted_at))->format('d/m/Y H:i:s') : null ,
        ];
    }
}
