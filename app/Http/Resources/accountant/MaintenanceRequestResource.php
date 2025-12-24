<?php

namespace App\Http\Resources\accountant;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Unit;
use App\Models\Room;
use App\Models\Employee;

use App\Http\Resources\open\UnitResource;
use App\Http\Resources\open\RoomResource;
use App\Http\Resources\open\EmployeeResource;

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
            "unit" => UnitResource::make(Unit::find($this->unit_id)),
            "room" => RoomResource::make(Room::find($this->room_id)),
            "unitManager" => EmployeeResource::make(Employee::find($this->unit_manager_id)),
            "cost" => $this->cost,
            "funded" => $this->funded,
            "description" => $this->description,
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at
        ];
    }
}
