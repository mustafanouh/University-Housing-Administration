<?php

namespace App\Http\Resources\open;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentTinyResource extends JsonResource
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
            "fullName" => $this->first_name . ' ' . $this->last_name,
            "specialization" => $this->specialization,
            "identification" => $this->identification_code
        ];
    }
}
