<?php

namespace App\Http\Resources\open;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Student;

class HousingRequestResource extends JsonResource
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
            "id" => $this->id,
            "createdAt" => $this->created_at,
            "signedBy" => StudentTinyResource::make($this->load("student1")->student1),
            "roommate1" => StudentTinyResource::make($this->load("student2")->student2),
            "roommate2" => StudentTinyResource::make($this->load("student3")->student3),
            "roommate3" => StudentTinyResource::make($this->load("student4")->student4)
        ];
    }
}
