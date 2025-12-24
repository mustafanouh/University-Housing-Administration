<?php

namespace App\Http\Resources\open;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Unit;

class StorageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            "unit" => UnitResource::make(Unit::find($this->unit_id)),
            "itemName" => $this->item_name,
            "quantity" => $this->quantity,
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at
        ];
    }
}
