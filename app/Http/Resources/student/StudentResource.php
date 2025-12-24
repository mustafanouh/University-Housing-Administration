<?php

namespace App\Http\Resources\student;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Http\Resources\open\UnitResource;

use App\Http\Resources\open\RoomResource;

class StudentResource extends JsonResource
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
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "country" => $this->country,
            "mobile" => $this->mobile,
            "email" => $this->email,
            "identification" => $this->identification_code,
            "specialization" => $this->specialization,
            "yearOfStudy" => $this->year_of_study,
            "room" => RoomResource::make($this->whenLoaded("room")),
            "unit" => UnitResource::make($this->whenLoaded("room.unit"))
        ];
    }
}
