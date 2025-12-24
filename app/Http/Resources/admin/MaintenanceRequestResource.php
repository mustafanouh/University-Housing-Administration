<?php

namespace App\Http\Resources\admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Employee;

use App\Http\Resources\global\UnitManagerResource;

class MaintenanceRequestResource extends JsonResource
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
            "unitId" => $this->unit_id,
            "unitName" => $this->unit_name,
            "roomId" => $this->room_id,
            "unitManager" => $this->when($this->unit_manager_id, function () {
                return EmployeeResource::make(Employee::find($this->unit_manager_id));
            }),
            "agreed" => $this->agreed,
            "description" => $this->description
        ];
    }
}
