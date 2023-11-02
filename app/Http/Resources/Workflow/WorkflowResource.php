<?php

namespace App\Http\Resources\Workflow;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkflowResource extends JsonResource
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
            'profil_lfr'=>$this->profil_lfr,
            'profil_len'=>$this->profil_len,
            'depart_id'=>$this->depart_id,
            'depart_lfr'=>$this->depart_lfr,
            'depart_len'=>$this->depart_len,
            'service_id'=>$this->service_id,
            'service_lfr'=>$this->service_lfr,
            'service_len'=>$this->service_len,
            'utilisateur'=>$this->utilisateur,
            'etat'=> intval($this->etat),
            'created_user'=>$this->created_user,
            'updated_user'=>$this->updated_user,
            'deleted_user'=>$this->deleted_user,
            'created_at'=>(new \DateTime($this->created_at))->format('d/m/Y H:i:s'),
            'updated_at'=>$this->updated_at!==null ? (new \DateTime($this->updated_at))->format('d/m/Y H:i:s') : null,
            'deleted_at'=> $this->deleted_at!==null ? (new \DateTime($this->deleted_at))->format('d/m/Y H:i:s') : null ,
        ];
    }
}
