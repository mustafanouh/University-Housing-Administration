<?php

namespace App\Http\Resources\open;

use App\Http\Resources\accountant\MaintenanceRequestResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\MaintenanceRequest;
use App\Models\Treasury;

class MaintenanceResource extends JsonResource
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
            "maintenanceRequest" => MaintenanceRequestResource::make(MaintenanceRequest::find($this->maintenance_request_id)),
            "treasury" => TreasuryResource::make(Treasury::find($this->treasury_id)),
            "description" => $this->description,
            "status" => $this->status,
            "notes" => $this->notes,
            "totalCost" => $this->total_cost,
            "startDate" => $this->start_date,
            "finishDate" => $this->finish_date,
            "createdAt" => $this->created_at,
            "updatedAt" =>$this->updated_at
        ];
    }
}
