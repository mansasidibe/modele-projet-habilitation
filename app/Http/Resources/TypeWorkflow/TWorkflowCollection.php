<?php

namespace App\Http\Resources\TypeWorkflow;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TWorkflowCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data'=>$this->collection
        ];
    }
}
